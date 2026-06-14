import LucideIcon from './LucideIcon';
import React from 'react';

interface HeaderProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6E6EB] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-5 gap-5">
          
          {/* Left Block: App Logo / Branding */}
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FAF9F5] to-[#EBF1EB] border border-[#DFE7DF] shadow-sm flex items-center justify-center text-slate-700">
              <LucideIcon name="Sparkles" size={24} className="text-[#547354] animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight flex items-center gap-2 font-sans">
                汉语游戏岛
              </h1>
            </div>
          </div>

          {/* Center Block: Filter category pills (Larger version) */}
          <nav className="flex items-center overflow-x-auto scroller-hidden gap-2 pb-1 lg:pb-0 select-none">
            <button
              id="category-tab-all"
              onClick={() => onSelectCategory('全部')}
              className={`px-6 py-3 rounded-full text-lg md:text-xl font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-sm border ${
                activeCategory === '全部'
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-[#FAF9F6] text-slate-500 hover:text-slate-800 hover:bg-[#F2EDF7]/50 border-[#ECECEF]'
              }`}
            >
              全部游戏
            </button>
            {categories.map(category => {
              const isActive = activeCategory === category;
              
              // Custom pastel colors to reflect status
              const colorMappings: Record<string, string> = {
                '语音': isActive ? 'bg-[#8C6D3F] border-[#816439] text-white shadow-sm' : 'hover:bg-[#F7F4EB]/90 hover:text-[#8C6D3F] border-[#EADABF]/40',
                '词汇': isActive ? 'bg-[#547354] border-[#4b674b] text-white shadow-sm' : 'hover:bg-[#EBF1EB]/90 hover:text-[#547354] border-[#CDE1CD]/40',
                '语法': isActive ? 'bg-[#6D548C] border-[#614a7d] text-white shadow-sm' : 'hover:bg-[#F2EDF7]/90 hover:text-[#6D548C] border-[#DCCBEB]/40',
                '汉字': isActive ? 'bg-[#4A6B82] border-[#3f5c71] text-white shadow-sm' : 'hover:bg-[#EBF2F7]/90 hover:text-[#4A6B82] border-[#CCE0F0]/40'
              };

              return (
                <button
                  key={category}
                  id={`category-tab-${category}`}
                  onClick={() => onSelectCategory(category)}
                  className={`px-6 py-3 rounded-full text-lg md:text-xl font-bold tracking-wide transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? `${colorMappings[category]}`
                      : `bg-[#FAF9F6] text-slate-500 border-[#ECECEF] ${colorMappings[category]}`
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </nav>

          {/* Right Block: Pure real-time fuzzy Search bar (Larger & wider) */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
              <LucideIcon name="Search" size={16} />
            </div>
            <input
              id="game-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="搜寻拼音、词汇、成语诗词游戏..."
              className="w-full pl-10 pr-9 py-3 rounded-2xl bg-[#F4F4F7] border border-transparent text-slate-800 placeholder-slate-400 text-[14.5px] md:text-[15px] focus:bg-white focus:border-slate-300 focus:ring-1 focus:ring-slate-100 focus:outline-none transition-all duration-200 shadow-inner"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <LucideIcon name="X" size={15} />
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
