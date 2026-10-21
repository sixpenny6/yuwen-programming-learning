import React, { useLayoutEffect, useRef, useState } from "react";

interface AutoFitScaleProps {
  children: React.ReactNode;
  isScrollable?: boolean;
  baseWidth?: number;
  baseHeight?: number;
}

// The scaled canvas has an equally sized layout placeholder. Measuring the real
// content, rather than a fixed 1080px frame, keeps its last button reachable.
export const AutoFitScale: React.FC<AutoFitScaleProps> = ({
  children,
  isScrollable = false,
  baseWidth = 1920,
  baseHeight = 1080,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, width: baseWidth, height: baseHeight, minHeight: baseHeight });

  useLayoutEffect(() => {
    let animationFrame = 0;
    let disposed = false;
    const measure = () => {
      const viewport = viewportRef.current;
      const canvas = canvasRef.current;
      if (!viewport || !canvas || !viewport.clientWidth || !viewport.clientHeight) return;
      const availableWidth = viewport.clientWidth;
      const availableHeight = viewport.clientHeight;
      // A small window uses a narrower logical canvas and vertical scrolling,
      // instead of shrinking the entire lesson to an unreadable miniature.
      const scale = isScrollable
        ? Math.min(1, Math.max(0.75, availableWidth / 1000))
        : Math.min(1, Math.max(0.65, Math.min(availableWidth / baseWidth, availableHeight / baseHeight)));
      const width = Math.min(baseWidth, availableWidth / scale);
      const minHeight = availableHeight / scale;
      const height = Math.max(minHeight, canvas.scrollHeight, canvas.offsetHeight);
      setFit(previous =>
        Math.abs(previous.scale - scale) < 0.0001 && Math.abs(previous.width - width) < 0.5 &&
        Math.abs(previous.minHeight - minHeight) < 0.5 && Math.abs(previous.height - height) < 0.5
          ? previous : { scale, width, height, minHeight });
    };
    const schedule = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(measure);
    };
    measure();
    const observer = new ResizeObserver(schedule);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (canvasRef.current) observer.observe(canvasRef.current);
    window.addEventListener("resize", schedule);
    void document.fonts?.ready.then(() => { if (!disposed) schedule(); });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", schedule);
    };
  }, [baseWidth, baseHeight, isScrollable]);

  return (
    <div ref={viewportRef} className="course-viewport w-full h-full relative" tabIndex={0} aria-label="课程内容" data-layout-mode={isScrollable ? "flow" : "presentation"}>
      <div className="course-frame" style={{ width: fit.width * fit.scale, height: fit.height * fit.scale }}>
        <div ref={canvasRef} className="course-canvas" data-course-scale={fit.scale}
          style={{ width: fit.width, minHeight: fit.minHeight, transform: `scale(${fit.scale})`, "--course-min-height": `${fit.minHeight}px` } as React.CSSProperties}>
          {children}
        </div>
      </div>
    </div>
  );
};
