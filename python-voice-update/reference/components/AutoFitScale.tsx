import React, { useState, useEffect, useRef } from 'react';

interface AutoFitScaleProps {
  children: React.ReactNode;
  isScrollable?: boolean;
  baseWidth?: number;
  baseHeight?: number;
}

export const AutoFitScale: React.FC<AutoFitScaleProps> = ({ 
  children, 
  isScrollable = false,
  baseWidth = 1920, 
  baseHeight = 1080
}) => {
  const [scale, setScale] = useState(1);
  const [isFlowMode, setIsFlowMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const parent = containerRef.current;
      const availableWidth = parent.clientWidth;
      const availableHeight = parent.clientHeight;

      // 只有明确需要滚动的页面才进入流动模式
      // 其他所有页面都使用缩放模式，确保内容完整显示在屏幕内
      const shouldFlow = isScrollable;
      setIsFlowMode(shouldFlow);

      if (shouldFlow) {
        setScale(1); // 流动模式不缩放
        return;
      }

      // --- 缩放模式：适应所有屏幕尺寸（包括笔记本）---
      const scaleX = availableWidth / baseWidth;
      const scaleY = availableHeight / baseHeight;
      // 取较小值确保内容完整显示，同时限制最大缩放为1（不放大）
      setScale(Math.min(scaleX, scaleY, 1));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [baseWidth, baseHeight, isScrollable]);

  return (
    <div 
      ref={containerRef}
      className={`
        w-full h-full relative 
        ${isFlowMode
            ? 'overflow-y-auto overflow-x-hidden flex flex-col items-center scroll-smooth' // 允许滚动
            : 'overflow-hidden flex items-center justify-center' // 锁定居中
        }
      `}
    >
      <div
        ref={contentRef}
        style={{
          width: isFlowMode ? '100%' : `${baseWidth}px`,
          height: isFlowMode ? 'auto' : `${baseHeight}px`,
          minHeight: isFlowMode ? '100%' : undefined, // 确保高度撑满
          
          transform: isFlowMode ? 'none' : `scale(${scale})`,
          transformOrigin: 'center center',
        }}
        // 增加 py-10 确保流动模式下上下有呼吸感
        className={`shrink-0 bg-transparent transition-transform duration-200 ease-out box-border origin-top ${isFlowMode ? 'py-10' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};