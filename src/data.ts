import { CategoryGroup } from './types';

export const INITIAL_GAMES_DATA: CategoryGroup[] = [
  {
    category: "语音",
    games: [
      {
        id: "pinyin-1",
        title: "口语炸弹",
        img: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/speaking-bomb/",
        description: "紧张刺激的口语对抗！在炸弹引爆之前，快速准确地大声朗读出汉字词句。",
        difficulty: "挑战",
        playCount: 16800,
        rating: 4.8,
        iconName: "Volume2",
        colorTheme: {
          bg: "bg-[#F7F4EB]", 
          border: "border-[#EFEBE4]",
          text: "text-[#8C6D3F]",
          accent: "bg-[#F0E6D2]",
          badge: "text-[#6E5531] bg-[#F5ECDC] border-[#EADABF]",
          darkText: "text-[#5C4524]",
          iconBg: "bg-[#F3EADA]"
        },
        details: {
          objective: "在炸弹自引爆倒计时结束前大声拼读指定词句，考验拼音纯熟度与紧急状况反应力。",
          guide: "1. 游戏开始后，屏幕中央将出现倒计时与要朗读的词句。\n2. 点击大声拼读按钮，根据正确的声母、韵母及声调顺畅读完。\n3. 快速高质地拼读可增加冷却值，让炸弹处于安全待引爆态！",
          skills: ["普通话发音流利度", "汉语声韵快速拼读", "瞬时口语抗压表达"]
        }
      },
      {
        id: "pinyin-2",
        title: "拼音狙击手",
        img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/pinyin-sniper/",
        description: "化身狙击精英，听音辨符！在纷至沓来的拼音标靶中快速锁定击中正确的目标。",
        difficulty: "普通",
        playCount: 22400,
        rating: 4.7,
        iconName: "Sparkles",
        colorTheme: {
          bg: "bg-[#F2EDF7]", 
          border: "border-[#E7E0F0]",
          text: "text-[#6D548C]",
          accent: "bg-[#E6DBF2]",
          badge: "text-[#553E73] bg-[#EFEBFA] border-[#DCCBEB]",
          darkText: "text-[#473063]",
          iconBg: "bg-[#ECE1F5]"
        },
        details: {
          objective: "听取音频提示，在令人目不暇接的下落拼音中精准点击符合声韵母发音规则的狙击标靶。",
          guide: "1. 仔细听取系统发出的汉语拼音音频。\n2. 观察从天而降的各种干扰拼音飞行标靶，找到与读音一致的那个。\n3. 点击锁定该标记进行精准狙击，连续命中还能获得狂热射击加速器！",
          skills: ["拼音音形快速映射", "高频听音定位精度", "眼脑协调狙击反应"]
        }
      },
      {
        id: "pinyin-3",
        title: "音调飞行员",
        img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/tone-pilot/",
        description: "跟随声调曲线起伏波澜！操控滑翔动力艇，搜集天空中隐藏的元音音标星章。",
        difficulty: "普通",
        playCount: 14200,
        rating: 4.9,
        iconName: "Mic",
        colorTheme: {
          bg: "bg-[#EBF2F7]", 
          border: "border-[#DEE7EE]",
          text: "text-[#4A6B82]",
          accent: "bg-[#D6E3EE]",
          badge: "text-[#365166] bg-[#E6EFF7] border-[#CCE0F0]",
          darkText: "text-[#283E50]",
          iconBg: "bg-[#DDE9F2]"
        },
        details: {
          objective: "通过精准判断中文平声、升声、拐弯与降声四个声调的轨迹起伏，完美控制飞行路线搜集目标星徽。",
          guide: "1. 屏幕中将持续飘过拼音元音，并携带对应的四大声调曲线。\n2. 点击按键调节飞行平铺仰角，使飞机沿着目标声调声流的波动路线平滑掠过。\n3. 完美切中声调的高低变化点即可取得完美巡航风速！",
          skills: ["调类音高声线知觉", "空间声调轨迹拟合", "声调四声图景记忆"]
        }
      }
    ]
  },
  {
    category: "词汇",
    games: [
      {
        id: "vocab-1",
        title: "单词连连看",
        img: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/Triple-match-up/",
        description: "展现极致的词汇三消眼力！在立体格盘寻找并匹配相符主题的汉语词汇卡。",
        difficulty: "普通",
        playCount: 19500,
        rating: 4.6,
        iconName: "Award",
        colorTheme: {
          bg: "bg-[#EBF1EB]", 
          border: "border-[#DFE7DF]",
          text: "text-[#547354]",
          accent: "bg-[#D6E6D6]",
          badge: "text-[#3D573D] bg-[#E7F3E7] border-[#CDE1CD]",
          darkText: "text-[#2D422D]",
          iconBg: "bg-[#D9EADA]"
        },
        details: {
          objective: "在限时内，连续选中并消除三张同类意象、主题或者互为近反义关系的精彩中文词汇小卡。",
          guide: "1. 面板上有堆叠参差不齐的词汇积木卡片。\n2. 寻找能归在同一个主题（如“春夜景观”、“心胸狭小”、“豪情壮丽”）下的三个有关词语。\n3. 送入暂存栏若成功凑成同组三消，多重词理瞬间迸消并归零得分！",
          skills: ["主题词汇关联思维", "视觉类群检索效率", "近义词组极速辨析"]
        }
      },
      {
        id: "vocab-2",
        title: "超市大搜索",
        img: "https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/supermarket-sweep/",
        description: "按照购物车提供的词类清单，在闹哄哄的货物字海中极速翻查并拖入对应字词卡。",
        difficulty: "挑战",
        playCount: 17200,
        rating: 4.8,
        iconName: "Compass",
        colorTheme: {
          bg: "bg-[#F9ECE7]", 
          border: "border-[#EFE1DB]",
          text: "text-[#8C5D4E]",
          accent: "bg-[#F2DAD0]",
          badge: "text-[#6E4234] bg-[#F7EAE3] border-[#EBCEBF]",
          darkText: "text-[#543024]",
          iconBg: "bg-[#F3DDD5]"
        },
        details: {
          objective: "梳理琳琅满目的货架词群，将散架和丢乱的词语正确分类到对应的容器推车中。",
          guide: "1. 画面给出不同的分类指示牌（例如：食物类词、自然物候词、抽象感觉词）。\n2. 拖拽、抛掷传送带或货物架掠过的词源，放置属于对应类别的容器中。\n3. 快速整理可开启特卖限时狂欢时间，获取大额代金金币！",
          skills: ["词汇范畴规范分类", "语义极速抽象概括", "生活场景应用广度"]
        }
      },
      {
        id: "vocab-3",
        title: "词汇大师",
        img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/Vocabulary-master/",
        description: "高维度的中华词语奥林匹克考验！通过层层释义选择与逻辑判断，冲击词圣王座。",
        difficulty: "挑战",
        playCount: 23100,
        rating: 4.9,
        iconName: "Workflow",
        colorTheme: {
          bg: "bg-[#F4F4F6]", 
          border: "border-[#ECECEF]",
          text: "text-[#5E6472]",
          accent: "bg-[#E4E6EB]",
          badge: "text-[#474C59] bg-[#ECEEF2] border-[#D3D7E0]",
          darkText: "text-[#333742]",
          iconBg: "bg-[#ECECEF]"
        },
        details: {
          objective: "解决包含古汉释义、繁复生词、俗语俗典以及形声意近词的高难度交互填空，夺魁大师称号。",
          guide: "1. 观察并理解系统给出的繁杂古典文书片段或谜面解释。\n2. 点击匹配那个能发挥精妙语意作用的准确词眼。\n3. 连续完成长连击并达成满血答对，开启终极金漆荣誉殿堂！",
          skills: ["高级汉词综合消化", "俗语熟语记忆积淀", "语义融会深度调用"]
        }
      }
    ]
  },
  {
    category: "语法",
    games: [
      {
        id: "grammar-1",
        title: "句子修理厂",
        img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/sentence-repair-shop/",
        description: "校准病句，对调颠倒的主谓宾！拖拽、置换残存组件让破碎句子重获通顺表达。",
        difficulty: "挑战",
        playCount: 15400,
        rating: 4.6,
        iconName: "Shuffle",
        colorTheme: {
          bg: "bg-[#EBF1EB]", 
          border: "border-[#DFE7DF]",
          text: "text-[#547354]",
          accent: "bg-[#D6E6D6]",
          badge: "text-[#3D573D] bg-[#E7F3E7] border-[#CDE1CD]",
          darkText: "text-[#2D422D]",
          iconBg: "bg-[#D9EADA]"
        },
        details: {
          objective: "调正逻辑失准或修饰语位置错谬的混乱句子卡槽，理清汉语句子骨架语法脉络。",
          guide: "1. 传送带会运送出残损、颠倒的语句零件包。\n2. 点击并交换词序（如定语置于主语前，补语合理归位等），使长难句读起来朗朗上口、逻辑无缺。\n3. 点击‘试车检验’，通顺完美后，即可喷洒火花完成修筑！",
          skills: ["汉语句型构造理智", "修辞搭配语序规范", "病句诊读快速纠偏"]
        }
      },
      {
        id: "grammar-2",
        title: "语法拔河赛",
        img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/grammar-tug-of-war/",
        description: "在文字阵营的拉锯对抗中，急速连词造句，用完美关联能量助己方队伍拔得头筹。",
        difficulty: "挑战",
        playCount: 19100,
        rating: 4.8,
        iconName: "Search",
        colorTheme: {
          bg: "bg-[#F7F4EB]", 
          border: "border-[#EFEBE4]",
          text: "text-[#8C6D3F]",
          accent: "bg-[#F0E6D2]",
          badge: "text-[#6E5531] bg-[#F5ECDC] border-[#EADABF]",
          darkText: "text-[#5C4524]",
          iconBg: "bg-[#F3EADA]"
        },
        details: {
          objective: "在激烈的拔河进程中，飞速比对并点击那个能使关联复句保持绝对平衡且含义通畅的最佳连词。",
          guide: "1. 拔河红线随着局势而颤动，并浮现一道条件复句填空题。\n2. 屏幕下方呈现两款对应方向的关联词（如：尽管...还是... vs 所以...因为...）。\n3. 点击最通顺合理的关联词蓄能发力，把对方拉回安全网以内！",
          skills: ["句群因果递进判断", "快速语感反差匹配", "连贯思想流畅判定"]
        }
      },
      {
        id: "grammar-3",
        title: "语法工程师",
        img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/Grammar-engineer/",
        description: "严丝合缝扣装高塔齿轮！精妙配对主从句结构、嵌套成分以支撑大厦永乐不倒。",
        difficulty: "普通",
        playCount: 13900,
        rating: 4.7,
        iconName: "Link",
        colorTheme: {
          bg: "bg-[#F2EDF7]", 
          border: "border-[#E7E0F0]",
          text: "text-[#6D548C]",
          accent: "bg-[#E6DBF2]",
          badge: "text-[#553E73] bg-[#EFEBFA] border-[#DCCBEB]",
          darkText: "text-[#473063]",
          iconBg: "bg-[#ECE1F5]"
        },
        details: {
          objective: "像编排机床图纸般完美排布多重复合判定句、条件约束和关联钢夹，成功衔接大型长结构语段。",
          guide: "1. 提取右侧大骨料钢架上的各项关联连词及语义卡槽。\n2. 连接并咬合各种复合限定短语（双重否定、让步主句及转折限定短语）。\n3. 通过坚固抗拉力试压测试，筑成中文语法通天柱梁！",
          skills: ["长难嵌套复句解构", "条件概率逻辑完备", "句意精炼闭环连接"]
        }
      }
    ]
  },
  {
    category: "汉字",
    games: [
      {
        id: "character-1",
        title: "汉字书写五子棋",
        img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/writing-omok/",
        description: "在国风古韵棋盘一决高下！手写汉字一展风采，唯有笔画笔顺正确的棋子方能行棋合围。",
        difficulty: "挑战",
        playCount: 24700,
        rating: 4.9,
        iconName: "PenTool",
        colorTheme: {
          bg: "bg-[#EBF2F7]", 
          border: "border-[#DEE7EE]",
          text: "text-[#4A6B82]",
          accent: "bg-[#D6E3EE]",
          badge: "text-[#365166] bg-[#E6EFF7] border-[#CCE0F0]",
          darkText: "text-[#283E50]",
          iconBg: "bg-[#DDE9F2]"
        },
        details: {
          objective: "执掌笔端黑白子，落棋时精准手写或选择对应指定偏旁字符的首尾笔顺，联珠五子斩获胜利。",
          guide: "1. 国风古色五子棋格上，落子位置将要求挑战一笔特写或某一字的规范笔画数。\n2. 在书写或判定板处画出该汉字或拼齐偏旁部首，符合书法轨迹规则时棋子即刻落地生根。\n3. 堵截对方的五子连珠，顺畅布下你的包围战略奇门阵！",
          skills: ["古风行墨笔顺轨迹", "五子格空间大局布局", "国学运笔比例记忆"]
        }
      },
      {
        id: "character-2",
        title: "汉字拼图王",
        img: "https://images.unsplash.com/photo-1515462277126-270d878326e5?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/character-puzzle-king/",
        description: "摔散的偏旁需要你妙手回春！拼凑合龙、拖拽咬合各形部首以还原精致中文美字。",
        difficulty: "普通",
        playCount: 20500,
        rating: 4.8,
        iconName: "Puzzle",
        colorTheme: {
          bg: "bg-[#F9ECE7]", 
          border: "border-[#EFE1DB]",
          text: "text-[#8C5D4E]",
          accent: "bg-[#F2DAD0]",
          badge: "text-[#6E4234] bg-[#F7EAE3] border-[#EBCEBF]",
          darkText: "text-[#543024]",
          iconBg: "bg-[#F3DDD5]"
        },
        details: {
          objective: "理解上百对汉字偏旁部首（如‘氵’‘辶’‘阝’及其主体部件）的位置及大小分布，完美拼接复原汉字的原始美态。",
          guide: "1. 关卡会呈现一片片形态扭曲或被分割的异形偏旁部首散件。\n2. 旋转并滑动部件，将它们拼接复原装入底色中元格，并拼装出标准的间架比率汉字。\n3. 重归完美的汉字将散落耀目光屑，并纳入汉字风物百词大典！",
          skills: ["偏旁部首间架结构心像", "几何位置平移匹配", "汉字形体对角对称感知"]
        }
      },
      {
        id: "character-3",
        title: "汉字找不同",
        img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80",
        url: "https://zhangxc365-source.github.io/The-Odd-One-Out/",
        description: "眼力大比拼！在排山倒海的相似形近汉字阵中，极限狙击那只极其狡黠的越狱错别字。",
        difficulty: "容易",
        playCount: 21900,
        rating: 4.9,
        iconName: "History",
        colorTheme: {
          bg: "bg-[#F4F4F6]", 
          border: "border-[#ECECEF]",
          text: "text-[#5E6472]",
          accent: "bg-[#E4E6EB]",
          badge: "text-[#474C59] bg-[#ECEEF2] border-[#D3D7E0]",
          darkText: "text-[#333742]",
          iconBg: "bg-[#ECECEF]"
        },
        details: {
          objective: "要在布满相似字汇（如在密集无缝的【己】海中挑选独一无二的【已】或【巳】）中快速指认不合群的一员。",
          guide: "1. 展现一幅密密麻麻的千字图矩阵板，时间进度条正在持续扣减。\n2. 用鹰眼掠过每一行笔触，发现极其微细的笔痕差错（如短横、出头或笔画长短）。\n3. 快速点击找出的异端错字予以粉碎净化，不断升级以冲击世界反应力巅峰纪录！",
          skills: ["形近字视知觉精细比对", "图像视觉噪点快速过滤", "极限瞬时注意力高聚焦"]
        }
      }
    ]
  }
];
