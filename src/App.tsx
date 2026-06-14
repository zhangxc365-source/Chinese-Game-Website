/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { INITIAL_GAMES_DATA } from './data';
import { Game } from './types';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GamePlayerModal from './components/GamePlayerModal';
import LucideIcon from './components/LucideIcon';
import { motion } from 'motion/react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Extract unique categories (voice, vocab, grammar, characters)
  const categoriesList = useMemo(() => {
    return INITIAL_GAMES_DATA.map(group => group.category);
  }, []);

  // Flattened games list for continuous pagination across the 12 games in the player
  const allGamesList = useMemo(() => {
    const list: { game: Game; category: string }[] = [];
    INITIAL_GAMES_DATA.forEach(group => {
      group.games.forEach(g => {
        list.push({ game: g, category: group.category });
      });
    });
    return list;
  }, []);

  // Determine current playing game's category
  const selectedGameCategory = useMemo(() => {
    if (!selectedGame) return '';
    const match = allGamesList.find(item => item.game.id === selectedGame.id);
    return match ? match.category : '';
  }, [selectedGame, allGamesList]);

  // Pagination switching handlers
  const handlePlayNext = () => {
    if (!selectedGame) return;
    const currentIndex = allGamesList.findIndex(item => item.game.id === selectedGame.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % allGamesList.length;
      setSelectedGame(allGamesList[nextIndex].game);
    }
  };

  const handlePlayPrev = () => {
    if (!selectedGame) return;
    const currentIndex = allGamesList.findIndex(item => item.game.id === selectedGame.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + allGamesList.length) % allGamesList.length;
      setSelectedGame(allGamesList[prevIndex].game);
    }
  };

  // Filter game data based on search queries list
  const isSearchActive = searchQuery.trim() !== '';

  const matchedGames = useMemo(() => {
    if (!isSearchActive) return [];
    const query = searchQuery.trim().toLowerCase();
    
    const results: { game: Game; category: string }[] = [];
    INITIAL_GAMES_DATA.forEach(group => {
      group.games.forEach(game => {
        if (
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query) ||
          game.details.objective.toLowerCase().includes(query) ||
          game.details.skills.some(skill => skill.toLowerCase().includes(query))
        ) {
          results.push({ game, category: group.category });
        }
      });
    });
    return results;
  }, [searchQuery, isSearchActive]);

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    // Smooth scroll anchor helpers while selecting
    if (category !== '全部') {
      const targetElement = document.getElementById(`category-section-${category}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 font-sans antialiased flex flex-col">
      {/* Search & Navigation Bar */}
      <Header
        categories={categoriesList}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Body */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="space-y-12">
          {/* Case B1: Showcase Search View */}
          {isSearchActive ? (
            <motion.div
              id="search-results-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between border-b pb-4 border-slate-200">
                <div>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-slate-800">
                    搜索有关 “<span className="text-slate-600 font-semibold">{searchQuery}</span>” 的结果
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">跨越 4 个大门类筛选，支持匹配标题、玩法目标及熟练技能</p>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 font-mono text-sm font-semibold rounded-lg">
                  共找到 {matchedGames.length} 款匹配产品
                </span>
              </div>

              {matchedGames.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-12">
                  {matchedGames.map(({ game, category }) => (
                    <div key={game.id} className="w-full sm:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] max-w-md">
                      <GameCard
                        game={game}
                        categoryName={category}
                        onSelect={() => setSelectedGame(game)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* Emptystate View */
                <div className="py-20 text-center space-y-3 bg-[#FAF9F5] border border-dashed rounded-3xl p-6 select-none">
                  <span className="text-5xl block">🔍</span>
                  <h4 className="text-base font-bold text-slate-500">未找到任何符合标准的研学游戏</h4>
                  <p className="text-sm text-slate-400 max-w-xs mx-auto">请更换关键词再次在输入框检索，如：‘声调’、‘成语’、‘诗词’ 或 ‘偏旁’。</p>
                  <button
                    id="reset-search-prompt"
                    onClick={() => setSearchQuery('')}
                    className="px-5 py-2.5 border rounded-xl text-sm bg-white text-slate-600 hover:bg-slate-50 font-semibold shadow-sm mt-3 focus:outline-none"
                  >
                    清空搜索过滤器
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Case B2: Normal view grouping categories in longitudinal sections */
            <div className="space-y-12">
              {INITIAL_GAMES_DATA.map(group => {
                const isFilteredOut = activeCategory !== '全部' && activeCategory !== group.category;
                
                if (isFilteredOut) return null;
 
                return (
                  <section
                    key={group.category}
                    id={`category-section-${group.category}`}
                    className="space-y-5 scroll-mt-24"
                  >
                    {/* Section heading */}
                    <div className="border-b pb-3 border-slate-200">
                       <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-7 rounded-full ${
                          group.category === '语音' ? 'bg-[#8C6D3F]' :
                          group.category === '词汇' ? 'bg-[#547354]' :
                          group.category === '语法' ? 'bg-[#6D548C]' :
                          'bg-[#4A6B82]'
                        }`} />
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                          {group.category}关卡
                        </h3>
                      </div>
                    </div>

                    {/* Game Card Grids - Clean flexbox wrap for centering overflow cards */}
                    <div className="flex flex-wrap justify-center gap-12">
                      {group.games.map(game => (
                        <div key={game.id} className="w-full sm:w-[calc(50%-24px)] lg:w-[calc(33.333%-32px)] max-w-md">
                          <GameCard
                            game={game}
                            categoryName={group.category}
                            onSelect={() => setSelectedGame(game)}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Immserive Live Active Game Pod Modal Player (自行调整比例) */}
      {selectedGame && (
        <GamePlayerModal
          game={selectedGame}
          categoryName={selectedGameCategory}
          onClose={() => setSelectedGame(null)}
          onNext={handlePlayNext}
          onPrev={handlePlayPrev}
        />
      )}

      {/* Exquisite Footer */}
      <footer className="mt-20 py-8 bg-white border-t border-[#F0F0F3] text-center text-sm text-slate-400 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="text-sm font-medium text-slate-500">© 2026 汉语游戏岛小游戏聚合生态</p>
          <div className="flex items-center justify-center gap-3 text-slate-400 font-medium">
            <span>语音</span>
            <span className="bullet">·</span>
            <span>词汇</span>
            <span className="bullet">·</span>
            <span>语法</span>
            <span className="bullet">·</span>
            <span>汉字</span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono uppercase mt-1">
            Built for premium cognitive training & elegant experiences
          </p>
        </div>
      </footer>
    </div>
  );
}
