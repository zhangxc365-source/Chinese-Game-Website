import { Game } from '../types';
import LucideIcon from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';

interface GameIframeViewProps {
  game: Game;
  onExit: () => void;
}

export default function GameIframeView({ game, onExit }: GameIframeViewProps) {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('正在加载游戏库与资源包...');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'gameover' | 'victory'>('intro');
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);

  // Audio Context for direct frequency synthesis of Pinyin tones
  const audioContextRef = useRef<AudioContext | null>(null);

  // Persist high scores using localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`high-score-${game.id}`);
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, [game.id]);

  // Loading simulation
  useEffect(() => {
    setLoading(true);
    setGameState('intro');
    setScore(0);

    const stages = [
      '正在调优低饱和度莫兰迪视觉图层...',
      '正在连接云端词典语义模型...',
      '正在初始化互动机制与计时器...',
      '汉字聚合端已加载就绪！'
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setLoadingText(stages[currentStage]);
        currentStage++;
      } else {
        setLoading(false);
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [game.id]);

  const updateHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem(`high-score-${game.id}`, newScore.toString());
    }
  };

  // Safe sound synthesizer using Web Audio API (No files required!)
  const playPulse = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine') => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Context is not supported or blocked by user gesture.', e);
    }
  };

  // Play specialized acoustic tones for Chinese phonics:
  const playToneSound = (pitch: number, toneIndex: number) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const duration = 0.6;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);

      // Pitch sweep rules for 4 Chinese tones:
      if (toneIndex === 1) {
        // Flat high: keep pitch steady
        osc.frequency.setValueAtTime(pitch * 1.2, ctx.currentTime);
      } else if (toneIndex === 2) {
        // Rising: pitch goes up
        osc.frequency.setValueAtTime(pitch * 0.9, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.35, ctx.currentTime + duration);
      } else if (toneIndex === 3) {
        // Dipping: down, then back up
        osc.frequency.setValueAtTime(pitch * 1.1, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(pitch * 0.75, ctx.currentTime + duration * 0.4);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.15, ctx.currentTime + duration);
      } else if (toneIndex === 4) {
        // Falling: pitch drops sharply
        osc.frequency.setValueAtTime(pitch * 1.3, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.75, ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn(e);
    }
  };

  // Win/Correct audio fx
  const playSuccessSound = () => {
    playPulse(523.25, 0.1, 'sine'); // C5
    setTimeout(() => playPulse(659.25, 0.15, 'sine'), 80); // E5
  };

  // Error audio fx
  const playFailSound = () => {
    playPulse(180, 0.25, 'triangle'); // Low buzz
  };

  const triggerFeedback = (isCorrect: boolean, text: string) => {
    if (isCorrect) {
      playSuccessSound();
    } else {
      playFailSound();
    }
    setFeedback({ text, isCorrect });
    setTimeout(() => setFeedback(null), 1200);
  };

  /* ==============================================================
     GAME STATES & LOGIC FOR ALL 12 GAMES
     ============================================================== */

  // GAME 1: 声调大作战 (pinyin-1)
  const [pinyin1Round, setPinyin1Round] = useState(0);
  const pinyin1Questions = [
    { pinyin: 'ma', character: '妈 (mā)', correctTone: 1, pitch: 261 },
    { pinyin: 'yu', character: '鱼 (yú)', correctTone: 2, pitch: 293 },
    { pinyin: 'ma', character: '马 (mǎ)', correctTone: 3, pitch: 261 },
    { pinyin: 'ba', character: '爸 (bà)', correctTone: 4, pitch: 220 },
    { pinyin: 'ren', character: '人 (rén)', correctTone: 2, pitch: 329 },
    { pinyin: 'hao', character: '好 (hǎo)', correctTone: 3, pitch: 349 }
  ];

  const handlePinyin1Answer = (selectedTone: number) => {
    const q = pinyin1Questions[pinyin1Round];
    if (selectedTone === q.correctTone) {
      setScore(s => {
        const next = s + 100;
        updateHighScore(next);
        return next;
      });
      triggerFeedback(true, `答对啦！"${q.character}" 读第 ${q.correctTone} 声`);
    } else {
      triggerFeedback(false, `真遗憾！应该是第 ${q.correctTone} 声哦`);
    }

    if (pinyin1Round < pinyin1Questions.length - 1) {
      setPinyin1Round(prev => prev + 1);
    } else {
      setTimeout(() => setGameState('victory'), 1000);
    }
  };

  // GAME 2: 拼音对对碰 (pinyin-2)
  const [pinyin2Selected, setPinyin2Selected] = useState<{ initials: string | null; finals: string | null }>({ initials: null, finals: null });
  const pinyin2Initials = ['zh', 'g', 'x', 'sh'];
  const pinyin2Finals = ['ong', 'uanguo', 'iang', 'uang'];
  const pinyin2Solutions: Record<string, { result: string; word: string }> = {
    'zh-ong': { result: 'zhōng', word: '中 (中国)' },
    'g-uanguo': { result: 'guāng', word: '全 (苹果 - wait! g-uang=guāng 广)' },
    'x-iang': { result: 'xiāng', word: '香 (香蕉)' },
    'sh-uang': { result: 'shuāng', word: '双 (双手)' }
  };

  const handlePinyin2Select = (type: 'initials' | 'finals', val: string) => {
    playPulse(440, 0.05);
    const updated = { ...pinyin2Selected, [type]: val };
    setPinyin2Selected(updated);

    if (updated.initials && updated.finals) {
      const matchKey = `${updated.initials}-${updated.finals}`;
      if (pinyin2Solutions[matchKey]) {
        const sol = pinyin2Solutions[matchKey];
        setScore(s => {
          const next = s + 150;
          updateHighScore(next);
          return next;
        });
        triggerFeedback(true, `成功配对！ ${updated.initials} + ${updated.finals} = ${sol.result} 【${sol.word}】`);
      } else {
        triggerFeedback(false, '组合未拼通哦，再换个组合试试！');
      }
      setPinyin2Selected({ initials: null, finals: null });
    }
  };

  // GAME 3: 绕口令达人 (pinyin-3)
  const [pinyin3TwisterIdx, setPinyin3TwisterIdx] = useState(0);
  const pinyin3Questions = [
    { text: "四是四，十是十。十四是十四，四十是四十。谁分得清十四和四十，就来试一试。", hint: "重点测试平舌音 [s] 与翘舌音 [sh] " },
    { text: "八面标兵奔北坡，炮兵并排北坡跑。炮兵怕把标兵碰，标兵怕碰炮兵炮。", hint: "双唇爆破音 [b] [p] 的流利转换" },
    { text: "红凤凰，黄凤凰，粉红凤凰花凤凰。", hint: "唇齿音 [f] 与舌尖后音 [h] " }
  ];

  // GAME 4: 抢大鹅学词 (vocab-1)
  const [gooseX, setGooseX] = useState(10);
  const [gooseDir, setGooseDir] = useState(1); // 1 = right, -1 = left
  const [vocabOptionIndex, setVocabOptionIndex] = useState(0);

  const vocabQuestions = [
    { word: '豁然开朗', options: ['形容狭窄阴暗', '形容突然明白，开阔明亮', '形容心情极度悲哀'], correctIdx: 1 },
    { word: '悠然自得', options: ['形容神态悠闲，心情舒适', '形容手忙脚乱，急躁不安', '为了追求名利不择手段'], correctIdx: 0 },
    { word: '一丝不苟', options: ['行为不检点，轻浮放荡', '形容做事极其细致认真', '连一根稻草都不肯放过'], correctIdx: 1 }
  ];

  // Goose moving animation loop
  useEffect(() => {
    if (game.id === 'vocab-1' && gameState === 'playing') {
      const interval = setInterval(() => {
        setGooseX(prev => {
          let next = prev + gooseDir * 2;
          if (next >= 85) {
            setGooseDir(-1);
            return 85;
          }
          if (next <= 5) {
            setGooseDir(1);
            return 5;
          }
          return next;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [game.id, gameState, gooseDir]);

  const handleGooseAnswer = (selectedIdx: number) => {
    const q = vocabQuestions[vocabOptionIndex];
    if (selectedIdx === q.correctIdx) {
      setScore(s => {
        const next = s + 120;
        updateHighScore(next);
        return next;
      });
      triggerFeedback(true, `抓到大鹅啦！释义正确。`);
    } else {
      triggerFeedback(false, `点错了！大鹅叼着释义气球逃跑了`);
    }

    if (vocabOptionIndex < vocabQuestions.length - 1) {
      setVocabOptionIndex(prev => prev + 1);
    } else {
      setTimeout(() => setGameState('victory'), 1000);
    }
  };

  // GAME 5: 青蛙跳跳乐 (vocab-2)
  const [frogRound, setFrogRound] = useState(0);
  const frogQuestions = [
    { target: '请找出 “精致” 的 [近义词]', options: ['粗糙', '精美', '精明'], correctIdx: 1 },
    { target: '请找出 “慷慨” 的 [反义词]', options: ['大方', '吝啬', '豪爽'], correctIdx: 1 },
    { target: '请找出 “豁达” 的 [近义词]', options: ['开朗', '懦弱', '狭隘'], correctIdx: 0 }
  ];

  const handleFrogLeap = (idx: number) => {
    const q = frogQuestions[frogRound];
    if (idx === q.correctIdx) {
      setScore(s => {
        const next = s + 100;
        updateHighScore(next);
        return next;
      });
      triggerFeedback(true, '青蛙平稳起跳，落在了安全荷叶上！🐸');
    } else {
      triggerFeedback(false, '扑通！青蛙落水了，重新爬上叶子。🐸');
    }

    if (frogRound < frogQuestions.length - 1) {
      setFrogRound(prev => prev + 1);
    } else {
      setTimeout(() => setGameState('victory'), 1000);
    }
  };

  // GAME 6: 词语接龙赛 (vocab-3)
  const [solitaireRound, setSolitaireRound] = useState(0);
  const solitaireRounds = [
    { systemWord: '万事如意', options: ['意气风发', '名列前茅', '天道酬勤'], correctIdx: 0, nextSystem: '发扬光大' },
    { systemWord: '发扬光大', options: ['白璧无瑕', '大言不惭', '心不在焉'], correctIdx: 1, nextSystem: '惭愧不已' }
  ];

  const handleSolitaireSelect = (idx: number) => {
    const q = solitaireRounds[solitaireRound];
    if (idx === q.correctIdx) {
      setScore(s => {
        const next = s + 150;
        updateHighScore(next);
        return next;
      });
      triggerFeedback(true, `精彩接龙！意气相通。`);
      if (solitaireRound < solitaireRounds.length - 1) {
        setSolitaireRound(prev => prev + 1);
      } else {
        setTimeout(() => setGameState('victory'), 800);
      }
    } else {
      triggerFeedback(false, '首尾接不上哦，无法通过词典守卫！');
    }
  };

  // GAME 7: 句子排排队 (grammar-1)
  const [sentenceRound, setSentenceRound] = useState(0);
  const sentenceQuestions = [
    {
      words: ['在', '小华', '公园', '画画', '悄悄地'],
      correctOrder: ['小华', '悄悄地', '在', '公园', '画画'],
      targetMsg: '组装主谓宾及修饰句式'
    },
    {
      words: ['苹果', '把', '妹妹', '吃了', '整整一个'],
      correctOrder: ['妹妹', '把', '整整一个', '苹果', '吃了'],
      targetMsg: '练习“把”字句式'
    }
  ];
  const [arrangedWords, setArrangedWords] = useState<string[]>([]);

  useEffect(() => {
    if (game.id === 'grammar-1' && gameState === 'playing') {
      setArrangedWords([]);
    }
  }, [sentenceRound, game.id, gameState]);

  const toggleSentenceWord = (word: string) => {
    playPulse(380, 0.05);
    if (arrangedWords.includes(word)) {
      setArrangedWords(prev => prev.filter(w => w !== word));
    } else {
      setArrangedWords(prev => [...prev, word]);
    }
  };

  const checkSentenceResult = () => {
    const q = sentenceQuestions[sentenceRound];
    const isCorrect = JSON.stringify(arrangedWords) === JSON.stringify(q.correctOrder);
    if (isCorrect) {
      setScore(s => {
        const next = s + 150;
        updateHighScore(next);
        return next;
      });
      triggerFeedback(true, `拼凑完美！句子："${arrangedWords.join('')}"`);
      if (sentenceRound < sentenceQuestions.length - 1) {
        setSentenceRound(prev => prev + 1);
      } else {
        setTimeout(() => setGameState('victory'), 1000);
      }
    } else {
      triggerFeedback(false, '句子序列读起来不太顺畅，理清主谓宾次序重试！');
      setArrangedWords([]);
    }
  };

  // GAME 8: 错别字找茬 (grammar-2)
  const [typoRound, setTypoRound] = useState(0);
  const typoQuestions = [
    {
      text: '今天天气非常阳光，我和妈妈“在”次来到海滩，开心极了。',
      answers: ['在'],
      correctVal: '再',
      desc: '“再次” 表示副词重复，应采用“再”。'
    },
    {
      text: '老师对我说，这个深奥的科学问“题”我们需要仔细“辨”论。',
      answers: ['辨'],
      correctVal: '辩',
      desc: '用语言争论谓之“辩论”，言字旁。'
    }
  ];

  const handleTypoClick = (word: string) => {
    const q = typoQuestions[typoRound];
    if (q.answers.includes(word)) {
      setScore(s => {
        const next = s + 200;
        updateHighScore(next);
        return next;
      });
      triggerFeedback(true, `慧眼如炬！"${word}" 错啦，改写为 "${q.correctVal}"。${q.desc}`);
      if (typoRound < typoQuestions.length - 1) {
        setTypoRound(prev => prev + 1);
      } else {
        setTimeout(() => setGameState('victory'), 1000);
      }
    } else {
      triggerFeedback(false, `别点错！"${word}" 是正确的字形哦。`);
    }
  };

  // GAME 9: 语法连连看 (grammar-3)
  const [grammarSelection, setGrammarSelection] = useState<{ left: string | null; right: string | null }>({ left: null, right: null });
  const grammarPairs: Record<string, string> = {
    '虽然...': '...但是天气变冷了',
    '不管...': '...我们都应该坚持到底',
    '既然...': '...你就应该认真把它做完'
  };

  const handleGrammarPair = (type: 'left' | 'right', item: string) => {
    playPulse(400, 0.05);
    const updated = { ...grammarSelection, [type]: item };
    setGrammarSelection(updated);

    if (updated.left && updated.right) {
      if (grammarPairs[updated.left] === updated.right) {
        setScore(s => {
          const next = s + 100;
          updateHighScore(next);
          return next;
        });
        triggerFeedback(true, `成功接通语法电路！连线合理。`);
      } else {
        triggerFeedback(false, '句意转折语法不合，关联失败！');
      }
      setGrammarSelection({ left: null, right: null });
    }
  };

  // GAME 10: 诗词拼写王 (character-1)
  const [poetryRound, setPoetryRound] = useState(0);
  const poetryQuestions = [
    { verse: '春风又◯江南岸，明月何时照我还。', options: ['走', '绿', '红', '来'], correct: '绿', translation: '王安石《泊船瓜洲》中的经典诗眼。' },
    { verse: '随风潜入夜，◯物细无声。', options: ['下', '洗', '润', '听'], correct: '润', translation: '杜甫《春夜喜雨》，潜移默化滋润万物。' }
  ];

  const handlePoetryAnswer = (ans: string) => {
    const q = poetryQuestions[poetryRound];
    if (ans === q.correct) {
      setScore(s => {
        const next = s + 150;
        updateHighScore(next);
        return next;
      });
      triggerFeedback(true, `妙哉！春分墨染，填入“${ans}”字。 ${q.translation}`);
      if (poetryRound < poetryQuestions.length - 1) {
        setPoetryRound(prev => prev + 1);
      } else {
        setTimeout(() => setGameState('victory'), 1000);
      }
    } else {
      triggerFeedback(false, '诗行不顺，去多借读唐诗三百首哦！');
    }
  };

  // GAME 11: 偏旁部首组合 (character-2)
  const [radicalSelection, setRadicalSelection] = useState<{ radical1: string | null; radical2: string | null }>({ radical1: null, radical2: null });
  const radicalMap: Record<string, string> = {
    '氵-可': '河 (河流)',
    '木-对': '树 (大树)',
    '门-口': '问 (提问)',
    '彳-亍': '行 (行人)'
  };

  const handleRadicalJoin = (type: 'r1' | 'r2', val: string) => {
    playPulse(350, 0.05);
    const updated = {
      radical1: type === 'r1' ? val : radicalSelection.radical1,
      radical2: type === 'r2' ? val : radicalSelection.radical2
    };
    setRadicalSelection(updated);

    if (updated.radical1 && updated.radical2) {
      const composeKey = `${updated.radical1}-${updated.radical2}`;
      if (radicalMap[composeKey]) {
        setScore(s => {
          const next = s + 100;
          updateHighScore(next);
          return next;
        });
        triggerFeedback(true, `成功契合金漆字形： ${updated.radical1} + ${updated.radical2} = ${radicalMap[composeKey]}`);
      } else {
        triggerFeedback(false, '不能组成常见的规范汉字，重新选取搭档！');
      }
      setRadicalSelection({ radical1: null, radical2: null });
    }
  };

  // GAME 12: 汉字演变记 (character-3)
  const [evolutionIdx, setEvolutionIdx] = useState(0);
  const evolutionRounds = [
    { pictograph: '☀️', originName: '象形甲骨文 (一轮圆日之中带有黑点)', options: ['日', '月', '水', '火'], correct: '日' },
    { pictograph: '🌊', originName: '甲骨古川 (波纹流动勾勒出起伏水势)', options: ['山', '木', '水', '土'], correct: '水' }
  ];

  const handleEvolutionSelect = (ans: string) => {
    const q = evolutionRounds[evolutionIdx];
    if (ans === q.correct) {
      setScore(s => {
        const next = s + 150;
        updateHighScore(next);
        return next;
      });
      triggerFeedback(true, `跨越千载契合历史！"${q.pictograph}" 自然之变正是现代的 "${ans}" 字。`);
      if (evolutionIdx < evolutionRounds.length - 1) {
        setEvolutionIdx(prev => prev + 1);
      } else {
        setTimeout(() => setGameState('victory'), 1000);
      }
    } else {
      triggerFeedback(false, '领悟发生偏失，请再次阅览古代刻文。');
    }
  };

  const handleStartGame = () => {
    playPulse(520, 0.1, 'square');
    setGameState('playing');
    setScore(0);
    setPinyin1Round(0);
    setPinyin2Selected({ initials: null, finals: null });
    setPinyin3TwisterIdx(0);
    setVocabOptionIndex(0);
    setFrogRound(0);
    setSolitaireRound(0);
    setSentenceRound(0);
    setTypoRound(0);
    setGrammarSelection({ left: null, right: null });
    setPoetryRound(0);
    setRadicalSelection({ radical1: null, radical2: null });
    setEvolutionIdx(0);
  };

  return (
    <div id="game-console-layout" className="w-full max-w-4xl mx-auto flex flex-col h-full min-h-[580px] bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
      {/* Simulation Cabinet Header */}
      <div className="bg-[#FAF9F6] border-b border-light-slate-100 py-3 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            id="exit-game-btn"
            onClick={onExit}
            className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-500 hover:text-slate-900 transition-colors focus:outline-none"
            title="退出当前游戏"
          >
            <LucideIcon name="X" size={16} />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-[13.5px] font-bold text-slate-800">{game.title}</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400 capitalize">Simulated Web Console v1.2</span>
          </div>
        </div>

        {/* Dynamic Score display */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block block-leading">HIGH SCORE</span>
            <span className="text-sm font-mono font-bold text-slate-600 block block-leading pr-1">{highScore}</span>
          </div>
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl text-emerald-400 font-mono text-[15px] font-extrabold flex items-center gap-1.5 shadow-inner">
            <span className="text-[10px] text-emerald-500/80">SCORE:</span>
            <span>{String(score).padStart(4, '0')}</span>
          </div>
        </div>
      </div>

      {/* Main Sandbox Screen Container */}
      <div className="relative flex-grow flex items-center justify-center p-6 bg-[#FAF9F5] select-none min-h-[440px]">
        {/* Floating Absolute Feedback Alert */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              className={`absolute top-4 z-40 px-5 py-2.5 rounded-2xl shadow-md border text-xs font-medium ${feedback.isCorrect ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          /* Loading Sandbox State */
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-9 h-9 rounded-full border-3 border-slate-200 border-t-slate-700 animate-spin" />
            <div className="text-center">
              <p className="text-[12px] font-medium text-slate-400 font-sans">{loadingText}</p>
              <p className="text-[10px] text-slate-300 font-mono mt-1">INITIALIZING COGNITIVE RUNTIME</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            {/* ====== CASE: INTRO PAGE ====== */}
            {gameState === 'intro' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md p-6 space-y-5"
              >
                <div className={`mx-auto w-16 h-16 rounded-3xl ${game.colorTheme.bg} flex items-center justify-center border ${game.colorTheme.border} opacity-85 shadow`}>
                  <LucideIcon name={game.iconName} size={30} className={game.colorTheme.text} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{game.title}</h3>
                  <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">{game.description}</p>
                </div>
                <div className="p-3 bg-white border border-slate-100 rounded-2xl text-[11px] text-slate-400 text-left space-y-1 font-sans">
                  <div className="flex items-center gap-1 text-slate-600 font-bold mb-1">
                    <LucideIcon name="Info" size={11} />
                    <span>本关研习点</span>
                  </div>
                  {game.details.skills.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <button
                  id="start-session-btn"
                  onClick={handleStartGame}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-medium text-[13.5px] transition-all hover:scale-102 flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:outline-none"
                >
                  <LucideIcon name="Play" size={14} className="fill-white" />
                  <span>开始进入互动模块</span>
                </button>
              </motion.div>
            )}

            {/* ====== CASE: PLAYING ====== */}
            {gameState === 'playing' && (
              <div className="w-full max-w-lg">
                
                {/* 1. pinyin-1: 声调大作战 */}
                {game.id === 'pinyin-1' && (
                  <div className="space-y-6 text-center">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#8C6D3F]/70 mb-2 block">
                        LISTEN AND CHOOSE TONE
                      </span>
                      <div className="flex items-center justify-center gap-4 mt-1">
                        <button
                          id="replay-aud-pinyin1"
                          onClick={() => playToneSound(pinyin1Questions[pinyin1Round].pitch, pinyin1Questions[pinyin1Round].correctTone)}
                          className="p-3 rounded-full bg-orange-50 hover:bg-orange-100 text-[#8C6D3F] border border-orange-100/50 transition-all cursor-pointer shadow-sm group-hover:scale-105"
                        >
                          <LucideIcon name="Volume2" size={24} />
                        </button>
                        <span className="text-3xl font-extrabold text-slate-700 tracking-wide font-mono">
                          {pinyin1Questions[pinyin1Round].pinyin}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">提示字：{pinyin1Questions[pinyin1Round].character.split(' ')[0]}</p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map(tone => {
                        const symbols = ['', 'ˉ (平声)', 'ˊ (升声)', 'ˇ (拐弯)', 'ˋ (降声)'];
                        return (
                          <button
                            key={tone}
                            id={`pinyin1-tone-${tone}-btn`}
                            onClick={() => handlePinyin1Answer(tone)}
                            className="p-4 rounded-2xl bg-white border border-[#EBEBEF] hover:border-orange-200 hover:bg-[#FDFBF7] text-slate-700 hover:text-[#8C6D3F] font-bold text-sm transition-all focus:outline-none shadow-sm"
                          >
                            第 {tone} 声 {symbols[tone]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. pinyin-2: 拼音对对碰 */}
                {game.id === 'pinyin-2' && (
                  <div className="space-y-6">
                    <div className="text-center bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                      <span className="text-[11px] text-slate-400 font-medium">请点击一个声母然后再点击一个韵母进行组合：</span>
                      <div className="mt-3 flex justify-center items-center gap-4">
                        <div className={`px-4 py-2.5 rounded-xl border text-base font-bold font-mono transition-all ${pinyin2Selected.initials ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-400 border-slate-100 border-dashed'}`}>
                          {pinyin2Selected.initials || '声母'}
                        </div>
                        <span className="text-slate-300 font-mono">+</span>
                        <div className={`px-4 py-2.5 rounded-xl border text-base font-bold font-mono transition-all ${pinyin2Selected.finals ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-400 border-slate-100 border-dashed'}`}>
                          {pinyin2Selected.finals || '韵母'}
                        </div>
                      </div>
                      <div className="mt-2.5 text-[11px] text-slate-400">可以拼出的规范音节：zhōng (中), xiāng (香), guāng (广/光), shuāng (双)</div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      {/* Initials section */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-purple-700 tracking-wider block">1. 选择声母 (Initials)</span>
                        <div className="grid grid-cols-2 gap-2">
                          {pinyin2Initials.map(p => (
                            <button
                              key={p}
                              id={`pinyin2-ini-${p}`}
                              onClick={() => handlePinyin2Select('initials', p)}
                              className={`p-3 rounded-xl border transition-all text-sm font-mono font-bold ${pinyin2Selected.initials === p ? 'bg-purple-600 text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Finals section */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-indigo-700 tracking-wider block">2. 选择韵母 (Finals)</span>
                        <div className="grid grid-cols-2 gap-2">
                          {pinyin2Finals.map(f => (
                            <button
                              key={f}
                              id={`pinyin2-fin-${f}`}
                              onClick={() => handlePinyin2Select('finals', f)}
                              className={`p-3 rounded-xl border transition-all text-xs font-mono font-bold ${pinyin2Selected.finals === f ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
                            >
                              -{f}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. pinyin-3: 绕口令达人 */}
                {game.id === 'pinyin-3' && (
                  <div className="space-y-5 text-center">
                    <div className="bg-white border p-6 rounded-3xl space-y-4 shadow-sm">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-600">Speech Practice Deck</span>
                      <p className="text-base font-semibold text-slate-800 leading-relaxed max-w-sm mx-auto bg-slate-50 p-4 rounded-xl border">
                        {pinyin3Questions[pinyin3TwisterIdx].text}
                      </p>
                      <p className="text-[11px] text-sky-600 bg-sky-50 px-2.5 py-1 rounded inline-block">
                        {pinyin3Questions[pinyin3TwisterIdx].hint}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        id="pinyin3-record-stim"
                        onClick={() => {
                          playSuccessSound();
                          setScore(s => {
                            const next = s + 200;
                            updateHighScore(next);
                            return next;
                          });
                          triggerFeedback(true, '系统识别中... 发音流利度 98%！非常准！');
                          if (pinyin3TwisterIdx < pinyin3Questions.length - 1) {
                            setPinyin3TwisterIdx(p => p + 1);
                          } else {
                            setTimeout(() => setGameState('victory'), 1000);
                          }
                        }}
                        className="p-4 rounded-2xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <LucideIcon name="Mic" size={16} />
                        <span>点击开始大声朗读 (模拟录音)</span>
                      </button>

                      <button
                        id="pinyin3-read-next"
                        onClick={() => {
                          playPulse(300, 0.05);
                          if (pinyin3TwisterIdx < pinyin3Questions.length - 1) {
                            setPinyin3TwisterIdx(p => p + 1);
                          } else {
                            setGameState('victory');
                          }
                        }}
                        className="py-2.5 text-[12px] text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all"
                      >
                        跳过，读下一首
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. vocab-1: 抢大鹅学词 */}
                {game.id === 'vocab-1' && (
                  <div className="space-y-6">
                    <div className="bg-white border rounded-3xl p-5 shadow-sm text-center">
                      <span className="text-[11px] text-emerald-600 font-bold block mb-1">【目标词汇库】</span>
                      <h4 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                        {vocabQuestions[vocabOptionIndex].word}
                      </h4>
                    </div>

                    {/* Moving Goose Visual */}
                    <div className="relative h-20 bg-[#F0EEEA] border border-dashed rounded-2xl overflow-hidden mb-2">
                      <div
                        className="absolute top-2 flex flex-col items-center justify-center transition-all duration-700"
                        style={{ left: `${gooseX}%` }}
                      >
                        <span className="text-3xl animate-bounce">🪿</span>
                        <span className="px-1.5 py-0.2 bg-white text-[9px] shadow-sm font-semibold rounded text-slate-600 border">抢释义在大鹅这！</span>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {vocabQuestions[vocabOptionIndex].options.map((option, idx) => (
                        <button
                          key={idx}
                          id={`vocab1-opt-${idx}`}
                          onClick={() => handleGooseAnswer(idx)}
                          className="w-full text-left p-4 rounded-2xl bg-white border hover:border-emerald-200 hover:bg-[#F7FCF7] text-slate-700 hover:text-emerald-800 text-[13px] font-semibold transition-all shadow-sm"
                        >
                          <span className="font-mono text-emerald-500 mr-2">选项 {idx + 1}.</span> {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. vocab-2: 青蛙跳跳乐 */}
                {game.id === 'vocab-2' && (
                  <div className="space-y-6 text-center">
                    <div className="bg-white border rounded-3xl p-4 shadow-sm">
                      <p className="text-[11px] uppercase tracking-wider font-bold text-coral-600 inline-block mb-1">FROG ADVENTURE</p>
                      <h4 className="text-xl font-extrabold text-slate-800">{frogQuestions[frogRound].target}</h4>
                    </div>

                    {/* Lake Illustration */}
                    <div className="h-28 bg-[#E6F3FA] rounded-2.5xl border flex items-center justify-around p-4 relative overflow-hidden">
                      {/* Water waves */}
                      <div className="absolute inset-x-0 bottom-0 h-4 bg-sky-200/60" />
                      
                      {frogQuestions[frogRound].options.map((opt, idx) => (
                        <button
                          key={idx}
                          id={`vocab2-opt-${idx}`}
                          onClick={() => handleFrogLeap(idx)}
                          className="relative flex flex-col items-center group cursor-pointer focus:outline-none"
                        >
                          {/* Lily pad */}
                          <div className="w-16 h-16 rounded-full bg-emerald-400 group-hover:bg-emerald-500 flex items-center justify-center border-b-4 border-emerald-600 shadow transition-all duration-200">
                            <span className="text-xs font-bold text-white px-1 text-center leading-tight">{opt}</span>
                          </div>
                          {idx === frogQuestions[frogRound].correctIdx && (
                            <span className="text-lg absolute -top-4 animate-bounce">🐸</span>
                          )}
                        </button>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-snug">点击符合题目要求的荷叶，青蛙就会跳上它哦！</p>
                  </div>
                )}

                {/* 6. vocab-3: 词语接龙赛 */}
                {game.id === 'vocab-3' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Instructor block */}
                      <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col justify-between">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold font-mono">电脑学士出招</span>
                        <div className="my-4">
                          <h4 className="text-lg font-bold tracking-wide text-amber-200">
                            {solitaireRounds[solitaireRound].systemWord}
                          </h4>
                          <span className="text-[10px] text-slate-400 block mt-1">
                            尾字拼音：{solitaireRounds[solitaireRound].systemWord.at(-1) === '意' ? 'yì' : 'dà'}
                          </span>
                        </div>
                        <span className="text-[9.5px] text-slate-500 font-serif">“老夫这关，尔等能否接应得来？”</span>
                      </div>

                      {/* Info and scoring */}
                      <div className="bg-white border p-4 rounded-2xl flex flex-col justify-between">
                        <div className="space-y-1">
                          <h5 className="text-[11px] uppercase tracking-wider font-bold text-indigo-600 font-mono">接词规则</h5>
                          <p className="text-[12px] text-slate-500 leading-normal">
                            请在右边卡片里挑选能与“{solitaireRounds[solitaireRound].systemWord.at(-1)}”字首尾音节配对的成语。
                          </p>
                        </div>
                        <div className="text-[11px] text-emerald-600 bg-emerald-50 p-2 border border-emerald-100 rounded">
                          谐音或同字承接即可胜出！
                        </div>
                      </div>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2">
                      {solitaireRounds[solitaireRound].options.map((opt, idx) => (
                        <button
                          key={idx}
                          id={`vocab3-opt-${idx}`}
                          onClick={() => handleSolitaireSelect(idx)}
                          className="w-full text-left p-3.5 rounded-xl border bg-white hover:bg-indigo-50/50 hover:border-indigo-200 text-slate-700 hover:text-indigo-800 text-[13px] font-semibold transition-all shadow-sm"
                        >
                          接：<span className="text-indigo-600 font-mono font-bold mr-1.5">{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. grammar-1: 句子排排队 */}
                {game.id === 'grammar-1' && (
                  <div className="space-y-6">
                    <div className="bg-white border rounded-3xl p-5 shadow-sm space-y-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#547354] font-bold block">
                        句子重组架 ({sentenceQuestions[sentenceRound].targetMsg})
                      </span>
                      
                      {/* Active Arranged View */}
                      <div className="min-h-12 bg-slate-50 rounded-2xl p-3 border-2 border-dashed border-[#DFE7DF] flex flex-wrap gap-2 items-center justify-center">
                        {arrangedWords.length === 0 ? (
                          <span className="text-slate-400 text-xs font-medium">请点击下方词块，在此拼出正确句子</span>
                        ) : (
                          arrangedWords.map((word, idx) => (
                            <span
                              key={idx}
                              onClick={() => toggleSentenceWord(word)}
                              className="px-3.5 py-1.5 bg-[#EBF1EB] text-[#2D422D] rounded-xl text-sm font-semibold border border-[#CDE1CD] cursor-pointer hover:bg-red-50 hover:text-red-700 hover:border-red-200 shadow-sm transition-all"
                              title="点击移除词块"
                            >
                              {word}
                            </span>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Options pieces */}
                    <div className="space-y-2 text-center">
                      <span className="text-[11px] text-slate-400 block mb-1">备选词板块：</span>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {sentenceQuestions[sentenceRound].words.map((word, idx) => {
                          const isUsed = arrangedWords.includes(word);
                          return (
                            <button
                              key={idx}
                              id={`grammar1-word-${idx}`}
                              disabled={isUsed}
                              onClick={() => toggleSentenceWord(word)}
                              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${isUsed ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed shadow-none' : 'bg-white text-slate-700 border-slate-200 hover:border-[#547354] hover:bg-slate-50 cursor-pointer shadow-sm'}`}
                            >
                              {word}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      id="grammar1-submit-seq"
                      disabled={arrangedWords.length === 0}
                      onClick={checkSentenceResult}
                      className="w-full py-3.5 rounded-2xl bg-[#547354] text-white font-medium hover:bg-[#435B43] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LucideIcon name="CheckCircle2" size={14} />
                      <span>发车排队检查</span>
                    </button>
                  </div>
                )}

                {/* 8. grammar-2: 错别字找茬 */}
                {game.id === 'grammar-2' && (
                  <div className="space-y-6">
                    <div className="bg-white border border-slate-150 p-6 rounded-3xl space-y-4 shadow-sm">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-amber-700 block">
                        查找高阶易混字过失（点击带双引号字符中的错字纠正它）
                      </span>
                      
                      <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl leading-relaxed text-[15px] font-sans text-slate-700 tracking-wide text-center">
                        {typoQuestions[typoRound].text.split(/(“[^”]+”)/).map((part, index) => {
                          if (part.startsWith('“') && part.endsWith('”')) {
                            const word = part.slice(1, -1);
                            return (
                              <button
                                key={index}
                                id={`grammar2-typotoken-${index}`}
                                onClick={() => handleTypoClick(word)}
                                className="mx-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-[#8C6D3F] border border-amber-200 rounded-lg font-bold transition-all animate-pulse"
                              >
                                {word}
                              </button>
                            );
                          }
                          return <span key={index}>{part}</span>;
                        })}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 text-center">找出不合句意的字符，用放大镜点击它来恢复手稿卷章！</p>
                  </div>
                )}

                {/* 9. grammar-3: 语法连连看 */}
                {game.id === 'grammar-3' && (
                  <div className="space-y-6">
                    <div className="bg-white border rounded-3xl p-5 shadow-sm text-center">
                      <p className="text-[11px] text-purple-700 font-semibold mb-1">请选取左侧的语法前置关联词，然后连线右侧合理的后置句尾：</p>
                      <div className="mt-3 flex justify-center items-center gap-4">
                        <div className={`px-3 py-2 rounded-xl border text-xs font-semibold ${grammarSelection.left ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-400 border-slate-100 border-dashed'}`}>
                          {grammarSelection.left || '主句首词'}
                        </div>
                        <span className="text-slate-300">⚡</span>
                        <div className={`px-3 py-2 rounded-xl border text-xs font-semibold ${grammarSelection.right ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-slate-50 text-slate-400 border-slate-100 border-dashed'}`}>
                          {grammarSelection.right ? (grammarSelection.right.slice(0, 10) + '...') : '从句尾段'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      {/* Left list */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-purple-700 block text-center">前件关联 (Left)</span>
                        <div className="flex flex-col gap-2">
                          {Object.keys(grammarPairs).map(left => (
                            <button
                              key={left}
                              id={`grammar3-left-${left}`}
                              onClick={() => handleGrammarPair('left', left)}
                              className={`p-3 text-xs font-bold rounded-xl border text-left transition-all ${grammarSelection.left === left ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                            >
                              {left}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right list */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-indigo-700 block text-center">续尾匹配 (Right)</span>
                        <div className="flex flex-col gap-2">
                          {Object.values(grammarPairs).map(right => (
                            <button
                              key={right}
                              id={`grammar3-right-${right}`}
                              onClick={() => handleGrammarPair('right', right)}
                              className={`p-3 text-xs rounded-xl border text-left transition-all ${grammarSelection.right === right ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                            >
                              {right}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. character-1: 诗词拼写王 */}
                {game.id === 'character-1' && (
                  <div className="space-y-6 text-center">
                    <div className="bg-white border border-[#DEE7EE] p-6 rounded-3xl space-y-4 shadow-sm bg-gradient-to-br from-white to-[#F2F7FA]">
                      <span className="text-[10px] font-bold text-sky-600 tracking-wider">唐宋山水行卷</span>
                      <h4 className="text-xl font-bold text-slate-800 font-serif leading-relaxed tracking-wider">
                        “ {poetryQuestions[poetryRound].verse} ”
                      </h4>
                      <p className="text-[11.5px] text-slate-400">请选择正确的字把缺失的诗眼补齐：</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2.5">
                      {poetryQuestions[poetryRound].options.map(opt => (
                        <button
                          key={opt}
                          id={`character1-opt-${opt}`}
                          onClick={() => handlePoetryAnswer(opt)}
                          className="p-3.5 rounded-xl border bg-white hover:bg-sky-50 text-slate-800 font-bold hover:text-sky-800 text-base font-serif transition-all focus:outline-none shadow-sm cursor-pointer hover:border-sky-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 11. character-2: 偏旁部首组合 */}
                {game.id === 'character-2' && (
                  <div className="space-y-6">
                    <div className="bg-white border rounded-3xl p-4 shadow-sm text-center">
                      <span className="text-[11px] text-slate-400">融合榫卯结构的偏旁部件，点击熔合：</span>
                      <div className="mt-3 flex justify-center items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl border text-xl font-bold flex items-center justify-center transition-all ${radicalSelection.radical1 ? 'bg-orange-100 text-orange-700 border-orange-200 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-100 border-dashed'}`}>
                          {radicalSelection.radical1 || '?'}
                        </div>
                        <span className="text-slate-300 font-mono">+</span>
                        <div className={`w-12 h-12 rounded-xl border text-xl font-bold flex items-center justify-center transition-all ${radicalSelection.radical2 ? 'bg-orange-100 text-orange-700 border-orange-200 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-100 border-dashed'}`}>
                          {radicalSelection.radical2 || '?'}
                        </div>
                      </div>
                      <div className="mt-3 text-[11px] text-slate-400">可用配对: 氵 + 可 = 河 | 木 + 对 = 树 | 门 + 口 = 问</div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      {/* Radical 1 choice */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-orange-700 block text-center">1. 选择偏旁 (Left)</span>
                        <div className="grid grid-cols-2 gap-2">
                          {['氵', '木', '门', '彳'].map(r1 => (
                            <button
                              key={r1}
                              id={`character2-r1-${r1}`}
                              onClick={() => handleRadicalJoin('r1', r1)}
                              className={`p-3.5 rounded-xl border font-bold text-base transition-all ${radicalSelection.radical1 === r1 ? 'bg-orange-600 text-white border-orange-600' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
                            >
                              {r1}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Radical 2 choice */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-orange-700 block text-center">2. 选择部件 (Right)</span>
                        <div className="grid grid-cols-2 gap-2">
                          {['可', '对', '口', '亍'].map(r2 => (
                            <button
                              key={r2}
                              id={`character2-r2-${r2}`}
                              onClick={() => handleRadicalJoin('r2', r2)}
                              className={`p-3.5 rounded-xl border font-bold text-base transition-all ${radicalSelection.radical2 === r2 ? 'bg-orange-600 text-white border-orange-600' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
                            >
                              {r2}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 12. character-3: 汉字演变记 */}
                {game.id === 'character-3' && (
                  <div className="space-y-6 text-center">
                    <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">甲骨象形图识变</span>
                      <div className="text-5xl my-4 py-2 bg-slate-50/50 rounded-2xl border inline-block px-10 border-dashed border-slate-200">
                        {evolutionRounds[evolutionIdx].pictograph}
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-slate-700">{evolutionRounds[evolutionIdx].originName}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">请推测这反映了现代简化汉字里的哪一个：</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {evolutionRounds[evolutionIdx].options.map(opt => (
                        <button
                          key={opt}
                          id={`character3-opt-${opt}`}
                          onClick={() => handleEvolutionSelect(opt)}
                          className="p-4 rounded-xl border bg-white hover:bg-slate-100 text-slate-800 font-bold hover:text-slate-900 text-lg transition-all focus:outline-none shadow-sm"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ====== CASE: VICTORY SCREEN ====== */}
            {gameState === 'victory' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-sm p-6 space-y-5"
              >
                <div className="text-5xl animate-bounce">🏆</div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800">研习圆满达成！</h3>
                  <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">
                    恭喜您，顺利通关本次拼音与国学研习，完成全部关卡并获得高额熟练分！
                  </p>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex justify-around text-center">
                  <div>
                    <span className="text-[10px] text-emerald-600 block font-bold">最终本轮得分</span>
                    <span className="text-xl font-bold font-mono text-emerald-800">{score}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-600 block font-bold">历史最高纪录</span>
                    <span className="text-xl font-bold font-mono text-emerald-800">{highScore}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    id="play-again-btn"
                    onClick={handleStartGame}
                    className="flex-1 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-[13px] transition-all cursor-pointer shadow flex items-center justify-center gap-1.5"
                  >
                    <LucideIcon name="RotateCcw" size={13} />
                    <span>再次研玩</span>
                  </button>
                  <button
                    id="victory-exit-btn"
                    onClick={onExit}
                    className="px-5 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium text-[13px] transition-all"
                  >
                    <span>退出返回</span>
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        )}
      </div>

      {/* Simulator Footer controls */}
      <div className="bg-[#FAF9F6] border-t border-slate-100 py-3.5 px-6 flex items-center justify-between text-xs text-slate-400 font-sans">
        <span className="flex items-center gap-1.5">
          <LucideIcon name="BookOpen" size={12} />
          认知素养：{game.details.skills.slice(0, 2).join(' · ')}
        </span>
        <button
          id="tab-redirect"
          onClick={() => window.open(game.url || '#', '_blank')}
          className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>在新窗口极速启动</span>
          <LucideIcon name="ExternalLink" size={11} />
        </button>
      </div>
    </div>
  );
}
