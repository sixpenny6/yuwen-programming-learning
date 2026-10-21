import React, { useState, useEffect, useRef } from 'react';

interface NavSection {
  title: string;
  startIndex: number;
  endIndex: number;
  isExpanded?: boolean;
}

interface SidebarProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
  slides: Array<{ section: string }>;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentSlide, 
  totalSlides, 
  onNavigate,
  slides 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // 自动展开当前页面所在的section
  useEffect(() => {
    const navSections = buildNavStructure();
    const currentSection = navSections.find(
      section => currentSlide >= section.startIndex && currentSlide <= section.endIndex
    );
    if (currentSection) {
      setExpandedSections(prev => new Set([...prev, currentSection.title]));
    }
  }, [currentSlide]);

  // 自动滚动到当前活动项
  useEffect(() => {
    if (activeItemRef.current && !isCollapsed) {
      activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentSlide, isCollapsed]);

  // 构建导航结构
  const buildNavStructure = (): NavSection[] => {
    const sections: NavSection[] = [];
    let currentSection: NavSection | null = null;

    slides.forEach((slide, index) => {
      const section = slide.section;
      
      // 判断是否是主要板块（阶段）
      const isMainSection = 
        section === '封面' ||
        section === '总览' ||
        section.startsWith('阶段') ||
        section === '自由探索' ||
        section === '实战练习' ||
        section === '总结';

      if (isMainSection) {
        // 结束当前section
        if (currentSection) {
          currentSection.endIndex = index - 1;
          sections.push(currentSection);
        }
        // 开始新section
        currentSection = {
          title: section,
          startIndex: index,
          endIndex: index,
          isExpanded: expandedSections.has(section)
        };
      } else if (currentSection) {
        // 属于当前section的子页面
        currentSection.endIndex = index;
      }
    });

    // 添加最后一个section
    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  };

  const navSections = buildNavStructure();

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  const getSectionIcon = (title: string): string => {
    if (title === '封面') return '🏠';
    if (title === '总览') return '🗺️';
    if (title.includes('识字') || title.includes('阶段一')) return '📚';
    if (title.includes('组词') || title.includes('阶段二')) return '🔤';
    if (title.includes('造句') || title.includes('阶段三')) return '✍️';
    if (title.includes('写作') || title.includes('阶段四')) return '📝';
    if (title === '自由探索') return '🔬';
    if (title === '实战练习') return '💪';
    if (title === '总结') return '🎓';
    return '📄';
  };

  if (isCollapsed) {
    return (
      <div className="fixed left-0 top-0 h-full w-16 bg-white border-r border-slate-200 shadow-lg z-30 flex flex-col items-center py-6 transition-all duration-300">
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors flex items-center justify-center mb-4 shadow-sm"
          title="展开导航"
        >
          <span className="text-xl">→</span>
        </button>
        <div className="flex-1 flex flex-col gap-2 items-center overflow-y-auto scrollbar-hide">
          {navSections.map((section, idx) => {
            const isActive = currentSlide >= section.startIndex && currentSlide <= section.endIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(section.startIndex);
                  setIsCollapsed(false);
                }}
                className={`w-10 h-10 rounded-lg transition-all flex items-center justify-center ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg scale-110'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:scale-105'
                }`}
                title={section.title}
              >
                <span className="text-lg">{getSectionIcon(section.title)}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 shadow-lg z-30 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100 shrink-0 bg-gradient-to-r from-indigo-50 to-white">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>📑</span>
          <span>目录导航</span>
        </h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors flex items-center justify-center shadow-sm"
          title="收起导航"
        >
          <span className="text-sm">←</span>
        </button>
      </div>

      {/* Progress */}
      <div className="px-6 py-4 border-b border-slate-100 shrink-0">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>进度</span>
          <span>{currentSlide + 1} / {totalSlides}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        {navSections.map((section, sectionIdx) => {
          const isActive = currentSlide >= section.startIndex && currentSlide <= section.endIndex;
          const hasSubPages = section.endIndex > section.startIndex;
          const isExpanded = expandedSections.has(section.title);

          return (
            <div key={sectionIdx} className="mb-2">
              {/* Section Title */}
              <button
                ref={isActive && !hasSubPages ? activeItemRef : null}
                onClick={() => {
                  if (hasSubPages) {
                    toggleSection(section.title);
                  } else {
                    onNavigate(section.startIndex);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left shadow-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:scale-[1.01] hover:shadow-md'
                }`}
              >
                <span className="text-xl shrink-0">{getSectionIcon(section.title)}</span>
                <span className="flex-1 font-medium text-base truncate">{section.title}</span>
                {hasSubPages && (
                  <span className={`text-sm transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                    ▶
                  </span>
                )}
              </button>

              {/* Sub Pages */}
              {hasSubPages && isExpanded && (
                <div className="ml-8 mt-1 space-y-1 animate-fade-in">
                  {slides.slice(section.startIndex, section.endIndex + 1).map((slide, idx) => {
                    const slideIndex = section.startIndex + idx;
                    if (idx === 0) return null; // Skip the main section page itself
                    
                    const isCurrentSlide = currentSlide === slideIndex;
                    
                    return (
                      <button
                        key={slideIndex}
                        ref={isCurrentSlide ? activeItemRef : null}
                        onClick={() => onNavigate(slideIndex)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                          isCurrentSlide
                            ? 'bg-indigo-100 text-indigo-700 font-medium shadow-sm scale-[1.02]'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate block">{slide.section}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
