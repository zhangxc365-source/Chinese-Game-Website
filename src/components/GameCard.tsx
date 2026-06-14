import { Game } from '../types';
import LucideIcon from './LucideIcon';
import GamePreviewMockup from './GamePreviewMockup';
import { motion } from 'motion/react';
import React from 'react';
import { saveImage, getImage, deleteImage } from '../dbHelper';

interface GameCardProps {
  key?: string | number;
  game: Game;
  categoryName: string;
  onSelect: () => void;
}

export default function GameCard({ game, categoryName, onSelect }: GameCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [displayImg, setDisplayImg] = React.useState(game.img);
  const [isCustomized, setIsCustomized] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    // Check if there's any legacy image in localStorage to migrate
    const legacy = localStorage.getItem(`gameImg_${game.id}`);
    if (legacy) {
      if (active) {
        setDisplayImg(legacy);
        setIsCustomized(true);
      }
      
      // Migrate legacy image to IndexedDB in background, then clean up localStorage
      saveImage(game.id, legacy)
        .then(() => {
          localStorage.removeItem(`gameImg_${game.id}`);
        })
        .catch(err => {
          console.warn("Background migration to IndexedDB failed:", err);
        });
    } else {
      // Normal retrieval from IndexedDB
      getImage(game.id)
        .then((saved) => {
          if (!active) return;
          if (saved) {
            setDisplayImg(saved);
            setIsCustomized(true);
          } else {
            setDisplayImg(game.img);
            setIsCustomized(false);
          }
        })
        .catch((err) => {
          console.error("Failed to query IndexedDB:", err);
          if (active) {
            setDisplayImg(game.img);
            setIsCustomized(false);
          }
        });
    }

    // Synchronize updates across lists
    const handleSync = () => {
      getImage(game.id).then((saved) => {
        if (!active) return;
        if (saved) {
          setDisplayImg(saved);
          setIsCustomized(true);
        } else {
          setDisplayImg(game.img);
          setIsCustomized(false);
        }
      });
    };

    window.addEventListener('game-image-changed', handleSync);

    return () => {
      active = false;
      window.removeEventListener('game-image-changed', handleSync);
    };
  }, [game.id, game.img]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Reset imageLoaded to false first so that the new image triggers fade-in when fully loaded
        setImageLoaded(false);
        saveImage(game.id, base64String)
          .then(() => {
            setDisplayImg(base64String);
            setIsCustomized(true);
            window.dispatchEvent(new Event('game-image-changed'));
          })
          .catch((error) => {
            console.error("IndexedDB write failed:", error);
            alert("保存封面失败，请尝试刷新页面并换一张稍微小一些的图片。");
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setImageLoaded(false);
    deleteImage(game.id)
      .then(() => {
        setDisplayImg(game.img);
        setIsCustomized(false);
        window.dispatchEvent(new Event('game-image-changed'));
      })
      .catch((error) => {
        console.error("IndexedDB reset failed:", error);
      });
  };

  // Elegant Morandi difficulty colors
  const difficultyBadges = {
    '容易': 'bg-emerald-50 text-emerald-700/90 border border-emerald-100',
    '普通': 'bg-amber-50 text-amber-700/90 border border-amber-100',
    '挑战': 'bg-rose-50 text-rose-700/80 border border-rose-100',
    '极富挑战': 'bg-rose-50 text-rose-700/80 border border-rose-100'
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect();
  };

  return (
    <motion.div
      id={`game-card-${game.id}`}
      role="button"
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col h-full rounded-2xl bg-white border border-[#EBEBF0] overflow-hidden hover:border-slate-300 transition-all duration-300 ease-out hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Upper Area: Game Screenshot Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-50 select-none">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
            <LucideIcon name={game.iconName} size={24} className="text-slate-300" />
          </div>
        )}
        <img
          src={displayImg}
          alt={game.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105 transition-transform duration-500 ease-out`}
        />

        {/* Real-time image customization controls on hover */}
        <div 
          onClick={(e) => e.stopPropagation()} 
          className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2"
        >
          <label 
            className="p-2 rounded-xl bg-white/95 hover:bg-white text-slate-700 shadow-md cursor-pointer transition-all border border-slate-200/50 flex items-center justify-center hover:scale-105" 
            title="上传自定义封面图片"
          >
            <LucideIcon name="Camera" size={15} />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />
          </label>
          {isCustomized && (
            <button
              onClick={handleResetImage}
              className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-md transition-all border border-transparent flex items-center justify-center hover:scale-105"
              title="重置为默认封面图片"
            >
              <LucideIcon name="RotateCcw" size={15} className="text-white" />
            </button>
          )}
        </div>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-20 flex gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium tracking-wide bg-white/95 backdrop-blur-md text-slate-700 shadow-sm border border-slate-100">
            {categoryName}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium tracking-wide shadow-sm backdrop-blur-md ${difficultyBadges[game.difficulty] || ''}`}>
            {game.difficulty}
          </span>
        </div>
      </div>

      {/* Downward Text Area */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white z-10 text-center">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight group-hover:text-slate-950 transition-colors duration-200 py-2">
            {game.title}
          </h3>
        </div>
 
        {/* Hover accent action bar */}
        <div className="mt-4 pt-3 border-t border-dashed border-[#F0F0F5] flex items-center justify-end text-slate-400 group-hover:text-slate-700 transition-colors duration-300">
          <div className="flex items-center gap-1.5 text-lg sm:text-xl font-bold group-hover:translate-x-1 transition-transform duration-300 text-slate-600 group-hover:text-slate-900">
            <span>开始游戏</span>
            <LucideIcon name="ChevronRight" size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
