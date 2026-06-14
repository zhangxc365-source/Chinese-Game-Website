/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../types';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

interface GamePlayerModalProps {
  game: Game | null;
  onClose: () => void;
  categoryName: string;
  onNext?: () => void;
  onPrev?: () => void;
}

type AspectRatioPreset = '16/9' | '4/3' | '1/1' | '9/16' | 'adaptive';

export default function GamePlayerModal({
  game,
  onClose,
  categoryName,
  onNext,
  onPrev,
}: GamePlayerModalProps) {
  if (!game) return null;

  const [aspectRatio, setAspectRatio] = useState<AspectRatioPreset>('16/9');
  const [zoomScale, setZoomScale] = useState<number>(100); // 75% to 125%
  const [iframeLoaded, setIframeLoaded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  // Reset iframe loading state when game changes
  useEffect(() => {
    setIframeLoaded(false);
  }, [game]);

  // Adjust aspect ratio based on the game's native design (for optimal defaults)
  useEffect(() => {
    if (game.id === 'character-1' || game.id === 'character-2') {
      // Boards and puzzle are squareish
      setAspectRatio('1/1');
    } else if (game.id === 'grammar-1' || game.id === 'vocab-3') {
      // Cards and consoles look beautiful in 4:3
      setAspectRatio('4/3');
    } else {
      setAspectRatio('16/9');
    }
    setZoomScale(100);
  }, [game]);

  const handleToggleFullscreen = () => {
    if (!iframeContainerRef.current) return;

    if (!document.fullscreenElement) {
      iframeContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Determine classes for ratios
  const getRatioClass = () => {
    if (aspectRatio === '16/9') return 'aspect-[16/9] w-full';
    if (aspectRatio === '4/3') return 'aspect-[4/3] max-w-4xl mx-auto w-full';
    if (aspectRatio === '1/1') return 'aspect-[1/1] max-w-2xl mx-auto w-full';
    if (aspectRatio === '9/16') return 'aspect-[9/16] max-w-md mx-auto w-full';
    return 'h-[650px] w-full'; // Adaptive filled
  };

  return (
    <AnimatePresence>
      <div 
        id="game-player-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto block select-none"
      >
        {/* Main Modal container */}
        <motion.div
          id="game-player-inner-card"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="bg-white rounded-3xl w-full max-w-7xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden border border-[#E2E2E9] flex flex-col md:flex-row h-[90vh] md:h-[85vh] max-h-[850px]"
        >
          {/* LEFT COLUMN: THE REAL-TIME ADJUSTABLE IFRAME ENGINE */}
          <div className="flex-grow bg-[#F8FAFC] flex flex-col h-full relative border-r border-[#EDEDF2]">
            {/* Player Control Top bar */}
            <div className="px-5 py-3.5 bg-white border-b border-[#F0F0F5] flex items-center justify-between gap-4 shrink-0">
              {/* Title & Game branding */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${game.colorTheme.iconBg}`}>
                  <LucideIcon name={game.iconName} size={18} className={game.colorTheme.text} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
                    {game.title}
                    <span className="text-xs font-semibold tracking-wide bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 uppercase">
                      {categoryName}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    云端研学游戏服务器连接正常
                  </p>
                </div>
              </div>

              {/* LIVE PROPORTION CONTROLLER (自行调整比例) */}
              <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <span className="text-xs font-semibold text-slate-400 px-2 uppercase tracking-wider font-mono">比例:</span>
                <button
                  onClick={() => setAspectRatio('16/9')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    aspectRatio === '16/9'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="16:9 宽屏黄金比"
                >
                  16:9
                </button>
                <button
                  onClick={() => setAspectRatio('4/3')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    aspectRatio === '4/3'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="4:3 标准显示比"
                >
                  4:3
                </button>
                <button
                  onClick={() => setAspectRatio('1/1')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    aspectRatio === '1/1'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="1:1 正方网格比"
                >
                  1:1
                </button>
                <button
                  onClick={() => setAspectRatio('9/16')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    aspectRatio === '9/16'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="9:16 移动端竖屏"
                >
                  9:16
                </button>
                <button
                  onClick={() => setAspectRatio('adaptive')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    aspectRatio === 'adaptive'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="随容器自适应填充"
                >
                  满屏
                </button>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleFullscreen}
                  className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                  title="全屏畅游"
                >
                  <LucideIcon name={isFullscreen ? 'Minimize' : 'Maximize'} size={16} />
                </button>
                <button
                  onClick={() => {
                    const iframe = document.getElementById(`game-iframe-${game.id}`) as HTMLIFrameElement;
                    if (iframe) iframe.src = iframe.src;
                    setIframeLoaded(false);
                  }}
                  className="p-2 text-slate-400 hover:text-[#547354] bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                  title="重新加载关卡"
                >
                  <LucideIcon name="RotateCw" size={16} />
                </button>
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors sm:inline-flex hidden"
                  title="在新窗口中独立试玩"
                >
                  <LucideIcon name="ExternalLink" size={16} />
                </a>
              </div>
            </div>

            {/* Mobile Proportion Selector Sub-Bar */}
            <div className="lg:hidden px-4 py-2 bg-slate-50 border-b border-[#F0F0F5] flex items-center justify-between text-sm gap-2 shrink-0">
              <span className="text-slate-500 font-semibold shrink-0">调整画幅比例:</span>
              <div className="flex gap-1 overflow-x-auto select-none no-scrollbar">
                {(['16/9', '4/3', '1/1', '9/16', 'adaptive'] as AspectRatioPreset[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setAspectRatio(p)}
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      aspectRatio === p ? 'bg-slate-800 text-white' : 'bg-white border text-slate-500'
                    }`}
                  >
                    {p === 'adaptive' ? '自适应' : p}
                  </button>
                ))}
              </div>
            </div>

            {/* IFRAME ENVELOPE STAGE WITH ZOOM/SCALE CONTROLS */}
            <div className="flex-grow p-4 sm:p-6 overflow-auto flex items-center justify-center relative">
              
              {/* Central Zoom & Scale slider on Stage */}
              <div className="absolute top-2 right-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm border px-3 py-1.5 rounded-full shadow-sm text-xs text-slate-600 font-medium animate-none">
                <LucideIcon name="ZoomOut" size={12} className="text-slate-400" />
                <input
                  type="range"
                  min="60"
                  max="125"
                  step="5"
                  value={zoomScale}
                  onChange={(e) => setZoomScale(Number(e.target.value))}
                  className="w-16 accent-slate-700 cursor-pointer h-1 bg-slate-200 rounded-full appearance-none.zoom-slider"
                  title="无级变焦缩放 (CSS Zoom Slider)"
                />
                <LucideIcon name="ZoomIn" size={12} className="text-slate-400" />
                <span className="font-mono bg-slate-100 rounded px-1.5 py-0.2 font-semibold tracking-tighter">
                  {zoomScale}%
                </span>
                {zoomScale !== 100 && (
                  <button 
                    onClick={() => setZoomScale(100)} 
                    className="text-slate-700 hover:text-slate-900 border-l border-slate-200 pl-1.5 font-bold"
                  >
                    重置
                  </button>
                )}
              </div>

              {/* Iframe stage wrappers */}
              <div 
                ref={iframeContainerRef}
                className={`relative shadow-2xl rounded-2xl border border-slate-300/80 bg-white overflow-hidden transition-all duration-300 ${getRatioClass()}`}
                style={{
                  transform: `scale(${zoomScale / 100})`,
                  transformOrigin: 'center center',
                  maxHeight: '100%',
                }}
              >
                {/* Loader Indicator spinner */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/95 z-30 space-y-4">
                    <div className="relative flex items-center justify-center">
                      <span className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-slate-700 animate-spin" />
                      <span className="absolute text-2xl animate-pulse">🏝️</span>
                    </div>
                    <div className="text-center px-4">
                      <h4 className="text-base font-bold text-slate-800">正在进入汉语研学游戏舱...</h4>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">同步加载多媒体音频、键盘监听及交互脚本</p>
                    </div>
                  </div>
                )}

                <iframe
                  id={`game-iframe-${game.id}`}
                  src={game.url}
                  className="w-full h-full border-0 select-none"
                  allow="autoplay; camera; microphone; geolocation"
                  referrerPolicy="no-referrer"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MANUAL SIDEBAR HUD & CONTROLS */}
          <div className="w-full md:w-80 shrink-0 h-full flex flex-col bg-white overflow-y-auto">
            
            {/* Game Card Header Card info */}
            <div className="p-6 border-b border-[#F0F0F5] relative bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 z-0" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  {/* Category badging */}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${game.colorTheme.badge}`}>
                    {categoryName}分类
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{game.title}</h2>
              </div>
            </div>

            {/* Simple spacer to balance the flex layout */}
            <div className="flex-grow bg-slate-50/20" />

            {/* Quick-play Footer navigative bar */}
            <div className="p-6 border-t border-[#F0F0F5] bg-slate-50 flex items-center justify-between shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={onPrev}
                  className="p-2 border rounded-xl text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 shadow-sm transition-all text-sm flex items-center gap-1 font-semibold"
                  title="上一个系列关卡"
                >
                  <LucideIcon name="ChevronLeft" size={14} />
                  <span>上一关</span>
                </button>
                <button
                  onClick={onNext}
                  className="p-2 border rounded-xl text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 shadow-sm transition-all text-sm flex items-center gap-1 font-semibold"
                  title="下一个系列关卡"
                >
                  <span>下一关</span>
                  <LucideIcon name="ChevronRight" size={14} />
                </button>
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-950 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-1"
              >
                <span>关闭返回</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
