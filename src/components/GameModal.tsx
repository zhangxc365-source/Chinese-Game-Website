import { Game } from '../types';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface GameModalProps {
  game: Game | null;
  categoryName: string;
  isOpen: boolean;
  onClose: () => void;
  onPlayEmbedded: (game: Game) => void;
  onPlayInNewTab: (game: Game) => void;
}

export default function GameModal({
  game,
  categoryName,
  isOpen,
  onClose,
  onPlayEmbedded,
  onPlayInNewTab
}: GameModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!game) return null;

  const difficultyLabels = {
    '容易': 'text-emerald-700 bg-emerald-50 border-emerald-100',
    '普通': 'text-amber-700 bg-amber-50 border-amber-100',
    '极富挑战': 'text-rose-700 bg-rose-50 border-rose-100'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="game-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="game-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#42424A]/45 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            id="game-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_24px_50px_rgba(0,0,0,0.08)] border border-[#EAEAEC] overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header image with close button */}
            <div className="relative aspect-[21/9] w-full bg-slate-100 overflow-hidden select-none">
              <div className={`absolute inset-0 flex items-center justify-center ${game.colorTheme.bg} ${imageLoaded && !imageError ? 'opacity-0 z-0' : 'opacity-100 z-10'}`}>
                <LucideIcon name={game.iconName} size={48} className={game.colorTheme.text} />
              </div>

              {!imageError && (
                <img
                  src={game.img}
                  alt={game.title}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  placeholder="https://via.placeholder.com/300x180"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              )}

              {/* Gradient Scrim */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent z-15" />

              {/* Top Bar on image */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  id="close-modal-btn"
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-white/40"
                  title="关闭窗口"
                >
                  <LucideIcon name="X" size={18} />
                </button>
              </div>

              {/* Float category and title in image */}
              <div className="absolute bottom-4 left-6 z-20 text-white">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-widest font-semibold uppercase bg-white/25 backdrop-blur-md border border-white/20">
                  {categoryName}分类游戏
                </span>
                <h2 className="text-xl md:text-2xl font-bold mt-1.5 drop-shadow-sm flex items-center gap-2">
                  {game.title}
                </h2>
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
              {/* Introduction Text / Objective */}
              <div>
                <p className="text-[15px] font-medium text-slate-800 leading-snug">
                  {game.description}
                </p>
                <div className="mt-3.5 flex items-start gap-2.5 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl">
                  <span className="mt-0.5 text-blue-500/80 bg-blue-50 p-1.5 rounded-lg flex items-center justify-center">
                    <LucideIcon name="Info" size={14} className="text-blue-500" />
                  </span>
                  <div>
                    <h4 className="text-[12.5px] font-semibold text-slate-700">研习目标 (Objective)</h4>
                    <p className="text-[12.5px] text-slate-500 mt-0.5 leading-relaxed">{game.details.objective}</p>
                  </div>
                </div>
              </div>

              {/* Skill and Attributes Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Stats */}
                <div className="space-y-3">
                  <h4 className="text-[13px] font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                    <LucideIcon name="Sliders" size={14} className="text-slate-400" />
                    关卡参数 (Parameters)
                  </h4>
                  <div className="space-y-2 text-[12.5px]">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <LucideIcon name="TrendingUp" size={13} />
                        挑战难度
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${difficultyLabels[game.difficulty]}`}>
                        {game.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <LucideIcon name="Star" size={13} />
                        玩家好评
                      </span>
                      <span className="font-mono font-semibold text-slate-700 flex items-center gap-1">
                        ⭐️ {game.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <LucideIcon name="Users" size={13} />
                        研习人次
                      </span>
                      <span className="font-mono text-slate-700">
                        {game.playCount.toLocaleString()} 课时次
                      </span>
                    </div>
                  </div>
                </div>

                {/* Training Skills */}
                <div className="space-y-3">
                  <h4 className="text-[13px] font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                    <LucideIcon name="Award" size={14} className="text-slate-400" />
                    训练提升 (Skills Focused)
                  </h4>
                  <div className="flex flex-col gap-2">
                    {game.details.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 bg-[#F6F6F9] px-3.5 py-1.8 rounded-xl border border-[#EEEEEF]">
                        <LucideIcon name="CheckCircle2" size={12} className="text-[#6D8C6D]" />
                        <span className="text-[12.5px] font-medium text-slate-600">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Operational Guide */}
              <div className="p-4 bg-[#FAF9F5] border border-[#F4EFE6] rounded-2xl block space-y-2.5">
                <h4 className="text-[13.5px] font-bold text-[#8C6D3F] flex items-center gap-1.5">
                  <LucideIcon name="BookOpen" size={14} className="text-[#8C6D3F]/80" />
                  操作指南 (Operational Guide)
                </h4>
                <div className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line space-y-1">
                  {game.details.guide}
                </div>
              </div>
            </div>

            {/* Footer Buttons - Rich Interactions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              {/* Play Embedded button */}
              <button
                id="play-embedded-btn"
                onClick={() => onPlayEmbedded(game)}
                className="flex-1 px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-900 hover:bg-slate-850 text-white font-medium text-[14px] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <div className="p-1 rounded bg-white/20 text-white leading-none">
                  <LucideIcon name="Gamepad2" size={14} />
                </div>
                <span>在当前页运行 (原卡片体验)</span>
              </button>

              {/* Play In New Tab button */}
              <button
                id="play-newtab-btn"
                onClick={() => onPlayInNewTab(game)}
                className="px-5 py-3.5 border border-[#CECED5] rounded-2xl bg-white hover:bg-slate-55 text-slate-700 font-medium text-[14px] hover:text-slate-900 shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>新标签打开链接</span>
                <LucideIcon name="ExternalLink" size={14} className="text-slate-400" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
