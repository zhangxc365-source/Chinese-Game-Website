/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import LucideIcon from './LucideIcon';
import { motion } from 'motion/react';

interface MockupProps {
  gameId: string;
}

export default function GamePreviewMockup({ gameId }: MockupProps) {
  switch (gameId) {
    case 'pinyin-1': // 口语炸弹 (speaking-bomb)
      return (
        <div className="absolute inset-0 bg-[#FFFDF9] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans">
          {/* Top Indicators */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-400">
            <span className="font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">SCORE: 240</span>
            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[70%] h-full bg-amber-500 rounded-full animate-pulse" />
            </div>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="w-2 h-2 rounded-full bg-slate-200" />
            </div>
          </div>

          {/* Central Bomb */}
          <div className="relative flex flex-col items-center justify-center my-1.5">
            {/* Spark & Fuse */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-amber-800 rotate-12 origin-bottom relative">
                <span className="absolute -top-1 -left-1 text-[10px] animate-bounce text-amber-500">✨</span>
              </div>
            </div>
            
            {/* Charcoal Bomb Ball */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#333] to-[#111] shadow-xl flex items-center justify-center relative border-4 border-slate-700">
              {/* Highlight card */}
              <div className="w-14 h-14 bg-white rounded-xl shadow-inner border border-slate-100 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">八</span>
                <span className="text-[10px] font-mono font-semibold text-slate-400">bā</span>
              </div>
            </div>
          </div>

          {/* Listening Pill */}
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>正在聆听 LISTENING</span>
          </div>

          {/* Bottom options */}
          <div className="w-full grid grid-cols-3 gap-1 mt-1 text-[9px] shrink-0 font-medium">
            <div className="p-1 px-1.5 bg-[#4F46E5] text-white rounded text-center flex flex-col items-center justify-center shadow-sm">
              <span className="font-mono text-[8px] opacity-90">PINYIN</span>
              <span className="font-bold">拼音卡</span>
            </div>
            <div className="p-1 px-1.5 bg-rose-400 text-white rounded text-center flex flex-col items-center justify-center shadow-sm">
              <span className="font-mono text-[8px] opacity-90">EXTINGUISH</span>
              <span className="font-bold">灭火器</span>
            </div>
            <div className="p-1 px-1.5 bg-slate-400 text-white rounded text-center flex flex-col items-center justify-center shadow-sm">
              <span className="font-mono text-[8px] opacity-90">SKIP</span>
              <span className="font-bold">跳过</span>
            </div>
          </div>
        </div>
      );

    case 'pinyin-2': // 拼音狙击手 (pinyin-sniper)
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4F0FC] via-[#E2F7FD] to-[#D9FAEB] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans">
          {/* Top Score */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-500">
            <span className="font-mono font-bold bg-white/70 px-2 py-0.5 rounded-full backdrop-blur-sm">TARGET: YCT Level 1</span>
            <span className="font-mono font-bold bg-slate-800 text-white px-2 py-0.5 rounded-md">SCORE: 010</span>
          </div>

          {/* Balloon canvas */}
          <div className="relative w-full flex-grow flex items-center justify-around my-2">
            {/* Balloons floating */}
            <div className="absolute bottom-2 left-3 flex flex-col items-center animate-bounce duration-1000">
              <div className="w-8 h-10 rounded-full bg-[#FF7D8C] text-white flex items-center justify-center text-[11px] font-bold shadow-md">国</div>
              <div className="w-px h-6 bg-slate-300" />
            </div>

            {/* Glowing headphone emitter in Center */}
            <div className="z-10 w-16 h-16 rounded-full bg-yellow-400/30 flex items-center justify-center border-2 border-yellow-400/95 animate-pulse">
              <div className="w-11 h-11 rounded-full bg-yellow-400 text-yellow-950 flex flex-col items-center justify-center shadow-md">
                <LucideIcon name="Volume2" size={16} />
                <span className="text-[7px] font-bold leading-none tracking-tighter mt-1">CLICK</span>
              </div>
            </div>

            <div className="absolute top-1 right-2 flex flex-col items-center animate-bounce duration-700">
              <div className="w-8 h-10 rounded-full bg-[#4ADE80] text-emerald-950 flex items-center justify-center text-[10px] font-bold shadow-md">学校</div>
              <div className="w-px h-6 bg-slate-300" />
            </div>

            <div className="absolute bottom-0 right-10 flex flex-col items-center animate-bounce duration-1500">
              <div className="w-8 h-10 rounded-full bg-[#A78BFA] text-purple-950 flex items-center justify-center text-[10px] font-bold shadow-md">苹果</div>
              <div className="w-px h-6 bg-slate-300" />
            </div>
          </div>

          {/* Weapons layout menu at bottom */}
          <div className="w-full grid grid-cols-3 gap-1 mt-1 text-[8px] shrink-0">
            <div className="py-1 border border-yellow-300 bg-yellow-50 rounded flex flex-col items-center justify-center font-bold text-yellow-800">
              <span>HINT 提示卡</span>
              <span className="text-[7px] text-slate-400">1/1</span>
            </div>
            <div className="py-1 border border-slate-200 bg-white rounded flex flex-col items-center justify-center font-bold text-slate-500">
              <span>SCOPE 倍镜</span>
              <span className="text-[7px] text-slate-300">0/1</span>
            </div>
            <div className="py-1 border border-sky-200 bg-sky-50 rounded flex flex-col items-center justify-center font-bold text-sky-700">
              <span>FREEZE 冰冻</span>
              <span className="text-[7px] text-slate-300">0/0</span>
            </div>
          </div>
        </div>
      );

    case 'pinyin-3': // 音调飞行员 (tone-pilot)
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#7DD3FC] via-[#38BDF8] to-[#0284C7] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans">
          {/* Status HUD marquee */}
          <div className="w-full flex justify-between items-center text-[9px] text-white">
            <span className="font-mono bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">✈️ TONE PILOT</span>
            <div className="flex gap-1">
              <span className="text-rose-500">❤️</span>
              <span className="text-rose-500">❤️</span>
              <span className="text-rose-500">❤️</span>
            </div>
          </div>

          {/* Central plane flying card */}
          <div className="relative w-full flex-grow flex items-center justify-center my-1.5">
            {/* Side combo track */}
            <div className="absolute left-1 bottom-1 text-[8px] bg-sky-900/40 text-sky-100 rounded p-1 backdrop-blur-sm">
              <span className="block opacity-75">STREAK: 03</span>
              <span className="font-bold font-mono text-yellow-300">x1.0</span>
            </div>

            {/* Jet pilot card in cloud */}
            <div className="relative p-2.5 bg-white/95 rounded-2xl border-2 border-cyan-300 shadow-xl flex flex-col items-center justify-center w-28 text-center animate-pulse">
              <span className="text-2xl font-bold text-slate-800">四</span>
              <span className="text-[10px] font-mono mt-0.5 font-bold text-sky-500">si</span>
            </div>

            {/* High alt cloud */}
            <div className="absolute right-2 top-0 text-[18px] opacity-40 animate-pulse">☁️</div>
          </div>

          {/* Pilot tone trigger inputs */}
          <div className="w-full grid grid-cols-5 gap-1 shrink-0 font-medium">
            <div className="p-1 rounded bg-[#64748B] text-white text-center flex flex-col items-center justify-center cursor-pointer shadow">
              <span className="text-[8px] select-none scale-90 leading-none">0声</span>
              <span className="font-bold text-[11px] leading-tight">Neutral</span>
            </div>
            <div className="p-1 rounded bg-[#3B82F6] text-white text-center flex flex-col items-center justify-center cursor-pointer shadow">
              <span className="text-[8px] select-none scale-90 leading-none">1声</span>
              <span className="font-bold text-[11px] leading-tight">—</span>
            </div>
            <div className="p-1 rounded bg-[#10B981] text-white text-center flex flex-col items-center justify-center cursor-pointer shadow">
              <span className="text-[8px] select-none scale-90 leading-none">2声</span>
              <span className="font-bold text-[11px] leading-tight">/</span>
            </div>
            <div className="p-1 rounded bg-[#F59E0B] text-white text-center flex flex-col items-center justify-center cursor-pointer shadow">
              <span className="text-[8px] select-none scale-90 leading-none">3声</span>
              <span className="font-bold text-[11px] leading-tight">∨</span>
            </div>
            <div className="p-1 rounded bg-[#EF4444] text-white text-center flex flex-col items-center justify-center cursor-pointer shadow">
              <span className="text-[8px] select-none scale-90 leading-none">4声</span>
              <span className="font-bold text-[11px] leading-tight">\</span>
            </div>
          </div>
        </div>
      );

    case 'vocab-1': // 单词连连看 (Triple-match-up)
      return (
        <div className="absolute inset-0 bg-[#E2ECE9] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans">
          {/* Info gauge */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-500 font-semibold border-b border-teal-100/50 pb-1 shrink-0">
            <span>SET: 0 / 8</span>
            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[10%] h-full bg-emerald-500" />
            </div>
            <span>⏱️ 1:54</span>
          </div>

          {/* Cards heap matching sheep match */}
          <div className="relative w-full flex-grow my-1 flex items-center justify-center overflow-hidden">
            {/* Card Solitaire Piles overlapping */}
            <div className="absolute -translate-x-4 -rotate-6 w-11 h-14 bg-white/90 border-2 border-slate-700/80 rounded-lg shadow flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold text-indigo-950 font-mono">one</span>
            </div>
            <div className="absolute translate-x-4 rotate-12 w-11 h-14 bg-white border-2 border-slate-700 rounded-lg shadow-md flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-indigo-950">yi</span>
            </div>
            <div className="absolute -translate-y-4 w-11 h-14 bg-slate-300 border-2 border-slate-500 rounded-lg shadow flex flex-col items-center justify-center text-slate-500 font-bold text-[9px]">
              six
            </div>
            <div className="absolute translate-y-3 -translate-x-1 rotate-3 w-11 h-14 bg-white border-2 border-slate-800 rounded-lg shadow-lg flex flex-col items-center justify-center">
              <span className="text-sm font-black text-indigo-900">一</span>
            </div>
          </div>

          {/* Match brackets */}
          <div className="w-full flex gap-1.5 items-center justify-center bg-slate-900/5 border border-slate-950/10 p-1.5 rounded-xl shrink-0">
            {/* 6 matching compartments */}
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="w-6 h-8 rounded border border-dashed border-slate-400 bg-white/40" />
            ))}
          </div>

          {/* Interactive capsule buttons */}
          <div className="w-full grid grid-cols-3 gap-1 mt-1 text-[8px] font-bold shrink-0 text-slate-800">
            <div className="p-1 px-1.5 bg-[#FBBF24] border border-[#D97706] rounded-xl text-center shadow-sm">
               🔄 乱序 (0)
            </div>
            <div className="p-1 px-1.5 bg-[#C084FC] border border-[#9333EA] rounded-xl text-center shadow-sm text-white">
               📤 移出 (0)
            </div>
            <div className="p-1 px-1.5 bg-[#4ADE80] border border-[#16A34A] rounded-xl text-center shadow-sm">
               ✨ 自动 (0)
            </div>
          </div>
        </div>
      );

    case 'vocab-2': // 超市大搜索 (supermarket-sweep)
      return (
        <div className="absolute inset-0 bg-[#E0F2FE] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans">
          {/* Score, Header sign */}
          <div className="w-full flex justify-between items-center text-[9px] text-sky-900">
            <span className="font-bold bg-sky-200/50 px-2 py-0.5 rounded">SCORE: 0</span>
            <span className="font-bold text-[10px] bg-amber-500 text-white border border-amber-600 px-2.5 py-0.5 rounded-md shadow-sm">ANIMALS</span>
            <span className="font-mono text-emerald-700 font-bold bg-emerald-100 rounded-full px-2 py-0.5">⏱️ 1:27</span>
          </div>

          {/* Multi items shelves layout */}
          <div className="w-full border-t border-b border-sky-200 p-2 my-1 flex flex-col justify-around bg-sky-100/55 flex-grow">
            {/* Shelf Row 1 */}
            <div className="flex justify-around items-end bg-sky-200/40 h-8 rounded border-b border-sky-300 relative pt-1">
              <span className="text-xl filter drop-shadow hover:scale-110 transition-transform">🐱</span>
              <span className="text-xl filter drop-shadow hover:scale-110 transition-transform">🐶</span>
              <span className="text-xl filter drop-shadow hover:scale-110 transition-transform">🐠</span>
              <span className="text-xl filter drop-shadow hover:scale-110 transition-transform">🐦</span>
            </div>
          </div>

          {/* Shopping cart overlay and controller hand claws */}
          <div className="w-full bg-[#38BDF8] rounded-xl border border-sky-300 p-2 flex flex-col items-center shrink-0 shadow-lg text-white font-semibold text-[10px] relative">
            <div className="w-14 h-5 border border-white/60 bg-white/20 rounded mx-auto flex items-center justify-center mb-0.5">
               🛒 购物车
            </div>
            <span className="text-[7px] text-sky-100 tracking-wide uppercase scale-90">Place animal words here</span>
            <div className="absolute -bottom-1 flex justify-between w-11/12 text-[14px]">
              <span className="animate-pulse">✊</span>
              <span className="animate-pulse">✊</span>
            </div>
          </div>
        </div>
      );

    case 'vocab-3': // 词汇大师 (Vocabulary-master)
      return (
        <div className="absolute inset-0 bg-[#FFFCE8] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans border-2 border-yellow-200">
          {/* Top Panel */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-500 font-bold">
            <span className="font-mono bg-[#EFEBE4] px-1.5 py-0.5 rounded">SCORE: 25</span>
            <span className="text-slate-400 font-serif">Vocabulary Master</span>
            <span className="font-mono bg-rose-100 text-rose-700 rounded px-1.5 py-0.5">❤️ 100%</span>
          </div>

          {/* Central Question Display */}
          <div className="w-full p-2.5 my-1.5 bg-white border border-slate-200 rounded-xl shadow-inner text-center flex flex-col items-center justify-center relative">
            <span className="text-[#3B82F6] text-xs font-mono font-bold leading-normal">[shí]</span>
            <span className="text-3xl font-extrabold text-slate-800 leading-tight mt-0.5">+</span>
          </div>

          {/* Word Category buckets */}
          <div className="w-full grid grid-cols-4 gap-1 select-none text-[8px] font-bold text-center shrink-0">
            <div className="p-1 px-[2px] bg-rose-50 border border-rose-200 rounded text-rose-800 flex flex-col items-center justify-center">
              <span>⚖️ 量词</span>
              <span className="scale-[0.8] leading-none opacity-80 mt-0.5">MEASURE</span>
            </div>
            <div className="p-1 px-[2px] bg-purple-50 border border-purple-200 rounded text-purple-800 flex flex-col items-center justify-center">
              <span>📅 时间</span>
              <span className="scale-[0.8] leading-none opacity-80 mt-0.5">TIME</span>
            </div>
            <div className="p-1 px-[2px] bg-green-50 border border-green-200 rounded text-green-800 flex flex-col items-center justify-center">
              <span>#️⃣ 数字</span>
              <span className="scale-[0.8] leading-none opacity-80 mt-0.5">NUMBERS</span>
            </div>
            <div className="p-1 px-[2px] bg-amber-50 border border-amber-200 rounded text-amber-800 flex flex-col items-center justify-center">
              <span>📖 学习</span>
              <span className="scale-[0.8] leading-none opacity-80 mt-0.5">STUDY</span>
            </div>
          </div>

          {/* Bottom Bag buffs */}
          <div className="w-full flex gap-1 items-center justify-center scale-90 shrink-0 text-[8px] mt-1">
            <span className="px-1.5 py-0.5 bg-orange-50 border border-dashed border-orange-300 text-orange-700 rounded-md">❄️ Get 0/1</span>
            <span className="px-1.5 py-0.5 bg-orange-50 border border-dashed border-orange-300 text-orange-700 rounded-md">👁️ Get 0/1</span>
            <span className="px-1.5 py-0.5 bg-orange-50 border border-dashed border-orange-300 text-orange-700 rounded-md">✨ Get 0/1</span>
          </div>
        </div>
      );

    case 'grammar-1': // 句子修理厂 (sentence-repair-shop)
      return (
        <div className="absolute inset-0 bg-[#FBF9F4] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans border-t-4 border-emerald-600">
          {/* Top Panel Info */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-400 shrink-0">
            <span>🔧 REPAIR MACHINE</span>
            <span className="font-mono bg-emerald-50 text-emerald-800 border border-emerald-100 rounded px-1.5 py-0.5">LEVEL 1-2</span>
            <span>⏱️ 1:48</span>
          </div>

          {/* Central Target Board */}
          <div className="w-full bg-[#1E293B] border border-slate-700 p-2.5 my-1 rounded-xl shadow-lg relative flex flex-col justify-center flex-grow">
            <span className="text-[7px] text-orange-300 font-black tracking-widest block text-center uppercase leading-none mb-1">TARGET TRANS</span>
            <span className="text-white text-[12px] font-bold text-center leading-normal italic">
              "Does she know the teacher?"
            </span>
          </div>

          {/* Grid target placement boxes with dashed lines */}
          <div className="w-full grid grid-cols-4 gap-2 my-1 shrink-0">
            {[1, 2, 3, 4].map((box) => (
              <div key={box} className="aspect-square rounded border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 flex items-center justify-center text-[10px] text-slate-300 font-bold">
                {box}
              </div>
            ))}
          </div>

          {/* Word options to repair drag slider */}
          <div className="w-full grid grid-cols-4 gap-1 mt-1 text-[10px] font-bold shrink-0">
            <div className="py-2.5 bg-white border-2 border-slate-700 hover:bg-slate-50 rounded-xl text-center shadow-md leading-none">
              <span className="block text-[6px] text-slate-400 font-mono tracking-wide leading-none pb-0.5">lǎoshī</span>
              <span className="text-slate-800">老师</span>
            </div>
            <div className="py-2.5 bg-white border-2 border-slate-700 hover:bg-slate-50 rounded-xl text-center shadow-md leading-none">
              <span className="block text-[6px] text-slate-400 font-mono tracking-wide leading-none pb-0.5">rènshi</span>
              <span className="text-slate-800">认识</span>
            </div>
            <div className="py-2.5 bg-white border-2 border-slate-700 hover:bg-slate-50 rounded-xl text-center shadow-md leading-none">
              <span className="block text-[6px] text-slate-400 font-mono tracking-wide leading-none pb-0.5">tā</span>
              <span className="text-slate-800">她</span>
            </div>
            <div className="py-2.5 bg-white border-2 border-slate-700 hover:bg-slate-50 rounded-xl text-center shadow-md leading-none">
              <span className="block text-[6px] text-slate-400 font-mono tracking-wide leading-none pb-0.5">ma</span>
              <span className="text-slate-800">吗</span>
            </div>
          </div>
        </div>
      );

    case 'grammar-2': // 语法拔河赛 (grammar-tug-of-war)
      return (
        <div className="absolute inset-0 bg-[#EDFAED] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans border-b-4 border-green-500">
          {/* Top Panel Header */}
          <div className="w-full flex justify-between items-center text-[8px] text-slate-500 shrink-0">
            <span className="font-bold bg-green-200/50 px-1.5 py-0.5 rounded text-emerald-800">GRAMMAR TUG-OF-WAR</span>
            <span className="text-rose-500">❤️❤️❤️</span>
          </div>

          {/* Central Target Board */}
          <div className="w-full bg-white border border-green-100 p-2 my-1.5 rounded-xl shadow-inner text-center flex flex-col justify-center flex-grow">
            <span className="text-[12px] font-bold text-slate-800 leading-normal">
              我可以 [ ? ] 蛋糕 [ ? ] 吗?
            </span>
            <span className="text-[8px] text-slate-400 italic mt-0.5">"Can I eat cake?"</span>
          </div>

          {/* Tug of war rope */}
          <div className="w-full bg-emerald-500/10 border border-dashed border-emerald-300 p-2.5 rounded-xl my-1 relative shrink-0">
            {/* Center horizontal line */}
            <div className="w-full h-[3px] bg-[#654321] rounded" />
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-1 h-5 bg-rose-600 rounded" />
            {/* Left Cat team (YOU) */}
            <div className="absolute left-2 top-1 scale-110 flex items-center gap-1">
              <span className="text-[14px] bg-slate-900 border border-slate-700 text-white rounded-full p-0.5">🐱</span> 
            </div>
            <span className="absolute left-7 top-1.5 text-[8px] text-slate-400">YOU</span>
            {/* Right Dog Robot team */}
            <div className="absolute right-2 top-1 scale-110 flex items-center gap-1">
              <span className="text-[14px] bg-orange-100 border border-orange-300 rounded-full p-0.5">🤖</span>
            </div>
             <span className="absolute right-7 top-1.5 text-[8px] text-slate-400">ROBOT</span>
          </div>

          {/* Connective grammar tokens options */}
          <div className="w-full grid grid-cols-4 gap-1 mt-1 text-[10px] font-bold shrink-0">
            <button className="py-2 bg-white border-2 border-emerald-500 hover:bg-emerald-50 rounded-xl text-center text-emerald-900 shadow-sm leading-none">
              <span className="block text-[6px] text-slate-400 font-mono tracking-wide leading-none pb-0.5">qù</span>
              <span>去</span>
            </button>
            <button className="py-2 bg-white border-2 border-emerald-500 hover:bg-emerald-50 rounded-xl text-center text-emerald-900 shadow-sm leading-none">
              <span className="block text-[6px] text-slate-400 font-mono tracking-wide leading-none pb-0.5">chī</span>
              <span>吃</span>
            </button>
            <button className="py-2 bg-white border-2 border-emerald-500 hover:bg-emerald-50 rounded-xl text-center text-emerald-900 shadow-sm leading-none">
              <span className="block text-[6px] text-slate-400 font-mono tracking-wide leading-none pb-0.5">hē</span>
              <span>喝</span>
            </button>
            <button className="py-2 bg-white border-2 border-emerald-500 hover:bg-emerald-50 rounded-xl text-center text-emerald-900 shadow-sm leading-none">
              <span className="block text-[6px] text-slate-400 font-mono tracking-wide leading-none pb-0.5">kàn</span>
              <span>看</span>
            </button>
          </div>
        </div>
      );

    case 'grammar-3': // 语法工程师 (Grammar-engineer)
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans text-slate-200">
          {/* Top dark HUD controller */}
          <div className="w-full bg-slate-800 border border-slate-700/80 px-2 py-1 rounded-lg flex justify-between items-center text-[8px] shrink-0 font-medium">
            <span className="font-bold text-[#FBBF24]">🏭 语法工程师</span>
            <div className="w-14 h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div className="w-[60%] h-full bg-[#10B981]" />
            </div>
            <span className="font-mono text-red-400">🚨 RUST: 01</span>
          </div>

          {/* Central isometric pipe canvas */}
          <div className="relative w-full flex-grow my-1 border border-slate-800 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center p-2.5">
            {/* Draw isometric wireframe tubes/ducts pipelines */}
            <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative w-full h-full flex flex-col justify-around text-slate-600 text-xs">
              <div className="border border-slate-800/80 p-1.5 py-1 text-center bg-slate-900/90 rounded text-[9px] text-[#A78BFA] border-l-4 border-l-purple-500 font-black">
                 定语从句管道
              </div>
              {/* Complex pipe intersection lines */}
              <div className="w-full flex justify-between text-[6px] text-slate-400 font-mono relative py-1 shrink-0">
                <span className="p-1 px-1.5 bg-indigo-950 text-indigo-400 rounded-md border border-indigo-900 font-extrabold uppercase">ST-1 ERROR</span>
                <span className="p-1 px-1.5 bg-rose-950 text-rose-400 rounded-md border border-rose-900 font-extrabold uppercase animate-pulse">ST-2 FAULT</span>
                <span className="p-1 px-1.5 bg-indigo-950 text-indigo-400 rounded-md border border-indigo-900 font-extrabold uppercase">ST-3 CLEAR</span>
              </div>
              <div className="border border-slate-800/80 p-1.5 py-1 text-center bg-slate-900/90 rounded text-[9px] text-[#2DD4BF] border-l-4 border-l-teal-500 font-black">
                 双重否定控制阀
              </div>
            </div>
          </div>

          {/* Control bar buttons */}
          <div className="w-full grid grid-cols-2 gap-1 select-none text-[8px] font-bold text-center shrink-0">
            <div className="p-1.5 bg-indigo-600 rounded text-white cursor-pointer hover:bg-indigo-500">
               🎛️ 结构修理 ST
            </div>
            <div className="p-1.5 bg-emerald-600 rounded text-white cursor-pointer hover:bg-emerald-500">
               🛡️ 应力排气 COV
            </div>
          </div>
        </div>
      );

    case 'character-1': // 汉字书写五子棋 (writing-omok)
      return (
        <div className="absolute inset-0 bg-[#FAF7EE] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans border border-[#DCD3BE] rounded-2xl shadow-inner text-slate-800">
          {/* Top Header */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-400 border-b border-[#EADAB2]/40 pb-1 shrink-0 font-medium">
            <span>♟️ 汉字书写五子棋</span>
            <span className="font-mono text-amber-800 font-bold bg-[#F4ECDC] px-2 py-0.5 rounded-full">YCT 2</span>
            <span>⏱️ 1:24</span>
          </div>

          {/* Go board grid sheet layout */}
          <div className="relative w-full flex-grow my-1 border-2 border-[#8C6D3F]/30 bg-[#F5ECDC] rounded-xl flex flex-col justify-around p-2.5 shadow-inner">
            {/* Rows of board grids with dots */}
            <div className="grid grid-cols-4 gap-0.5 justify-items-center opacity-70 mb-1">
              {[1, 2, 3, 4].map(col => (
                <div key={col} className="w-5 h-5 border border-[#8C6D3F]/20 flex items-center justify-center text-[8px] bg-white/40" />
              ))}
            </div>
            
            {/* Placed stones center layout */}
            <div className="flex justify-around items-center absolute inset-0 pt-3 px-5">
              {/* White stone */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-slate-200 border border-slate-300 shadow-md flex items-center justify-center text-[10px] font-black text-slate-800">
                人
              </div>
              {/* Black stroke center focus stone */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-950 shadow-md flex items-center justify-center text-[10px] font-black text-white">
                木
              </div>
              {/* White stone */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white to-slate-200 border border-slate-300 shadow-md flex items-center justify-center text-[10px] font-black text-slate-800">
                口
              </div>
            </div>
          </div>

          {/* Action limits badges */}
          <div className="w-full flex justify-between items-center text-[8px] font-bold text-slate-500 shrink-0">
            <span className="px-2 py-0.5 bg-white/70 border border-[#DCD3BE] rounded text-[#8C6D3F] shadow-sm">💡 EARN HINT</span>
            <span className="px-2 py-0.5 bg-white/70 border border-[#DCD3BE] rounded text-[#8C6D3F] shadow-sm">⚡ EARN SKIP</span>
          </div>
        </div>
      );

    case 'character-2': // 汉字拼图王 (character-puzzle-king)
      return (
        <div className="absolute inset-0 bg-[#FCFAF5] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans">
          {/* Top Info */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-400 border-b border-orange-100 pb-1 shrink-0 font-medium">
            <span>🧩 汉字拼图王</span>
            <span className="font-mono bg-orange-50 text-orange-800 border border-orange-100 rounded px-1.5 py-0.5">LEVEL 3</span>
            <span>MATCH: 92%</span>
          </div>

          {/* Canvas sheet showing "拼图画布" and stroke slots */}
          <div className="w-full flex-grow my-1.5 bg-white border border-slate-100 shadow-sm rounded-xl flex flex-col justify-center items-center relative">
            <div className="flex gap-2 relative">
              {/* Grid 1: 你 */}
              <div className="w-14 h-14 border border-slate-300 relative flex items-center justify-center bg-[#FAF9F5]/70 rounded-lg">
                <span className="text-3xl font-black text-slate-200 absolute">你</span>
                {/* Dragged component overlay */}
                <span className="text-3xl font-black text-slate-800 z-10">亻</span>
              </div>
              {/* Grid 2: 好 */}
              <div className="w-14 h-14 border border-slate-300 relative flex items-center justify-center bg-[#FAF9F5]/70 rounded-lg">
                <span className="text-3xl font-black text-slate-200 absolute">好</span>
                {/* Dragged components pieces overlay */}
                <span className="text-3xl font-black text-[#8C5D4E] z-10 select-none">女</span>
              </div>
            </div>
            <span className="text-[7px] text-[#A4A4AB] mt-1 italic tracking-widest uppercase scale-95 leading-none">Drag radicals to fit canvas</span>
          </div>

          {/* Draggable bottom drawer */}
          <div className="w-full grid grid-cols-4 gap-1 p-1 bg-amber-500/5 rounded-xl border border-amber-500/10 shrink-0 text-center text-xs font-semibold select-none text-slate-800">
            <div className="p-1 px-[2px] bg-white rounded border border-slate-200 shadow-sm font-bold text-center">氵</div>
            <div className="p-1 px-[2px] bg-white rounded border border-slate-200 shadow-sm font-bold text-center">辶</div>
            <div className="p-1 px-[2px] bg-white rounded border border-slate-200 shadow-sm font-bold text-center">子</div>
            <div className="p-1 px-[2px] bg-white rounded border border-slate-200 shadow-sm font-bold text-center animate-pulse">尔</div>
          </div>
        </div>
      );

    case 'character-3': // 汉字找不同 (The-Odd-One-Out)
      return (
        <div className="absolute inset-0 bg-[#F4F4F6] flex flex-col items-center justify-between p-3 select-none overflow-hidden font-sans border-b-4 border-[#5E6472]">
          {/* Top HUD Panel */}
          <div className="w-full flex justify-between items-center text-[9px] text-slate-500 shrink-0">
            <span className="font-mono bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">⌛ 26s</span>
            <span className="font-bold flex gap-0.5">👁️ 见 vs 贝</span>
            <span className="font-mono bg-slate-800 text-white font-bold px-1.5 py-0.5 rounded">SCORE: 080</span>
          </div>

          {/* Central Target character */}
          <div className="w-full text-center py-1 mt-1 shrink-0">
            <span className="text-[9px] text-[#5D5D62] font-black uppercase leading-none block">TARGET CHAR</span>
            <span className="inline-block px-3 py-1 mt-0.5 text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm">
              见 (jiàn - SEE)
            </span>
          </div>

          {/* 4x4 matrix of "贝" characters, with one single "见" character highlighted */}
          <div className="w-11/12 grid grid-cols-4 gap-1.5 p-2 bg-gradient-to-br from-amber-200/5 to-amber-200/20 rounded-xl my-1 border border-slate-300/60 scale-95 flex-grow justify-around">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="aspect-square bg-white border border-slate-200 rounded shadow-sm text-[12px] font-black text-slate-800 flex justify-center items-center hover:bg-slate-50">
                贝
              </div>
            ))}
            {/* Highlighted correct answer '见' */}
            <div className="aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100/40 border-2 border-emerald-500/80 rounded shadow-sm text-[12px] font-black text-emerald-950 flex justify-center items-center cursor-pointer relative overflow-hidden animate-pulse">
              见
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-tl rotate-45 select-none" />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
