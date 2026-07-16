export type AutonomyAnswer = 'O' | 'A' | 'X';

export interface AutonomyQuestion {
  id: number;
  category: string;
  text: string;
}

export interface AutonomyOption {
  key: AutonomyAnswer;
  label: string;
  score: number;
}

export interface AutonomyCategoryMeta {
  key: string;
  title: string;
  description: string;
}

export interface AutonomyLevel {
  level: string;
  minScore: number;
  color: string;
}

export const autonomyIntroduction = {
  title: '意識自主大作戰',
  paragraphs: [
    '在3C產品與寄生式AI、合成親密關係大量攫取我們的注意力的時代，我們要如何回收自己的注意力、重建真實的人際關係以及意識自主呢？',
    '來做一下以下的測驗，看看你目前的狀態吧！',
  ],
};

export const autonomyOptions: AutonomyOption[] = [
  { key: 'O', label: '總是如此 (80%~100%)', score: 6 },
  { key: 'A', label: '大都如此 (60%~80%)', score: 2 },
  { key: 'X', label: '很少如此 (0%~60%)', score: 0 },
];

export const autonomyScoreMap: Record<AutonomyAnswer, number> = {
  O: 6,
  A: 2,
  X: 0,
};

export const CATEGORY_MAX_SCORE = 30;
export const TOTAL_MAX_SCORE = 150;

export const autonomyCategories: AutonomyCategoryMeta[] = [
  {
    key: '入睡相關',
    title: '入睡相關',
    description: '睡前與夜間對螢幕、通訊與上網的界限設定。',
  },
  {
    key: '清醒相關',
    title: '清醒相關',
    description: '睡眠充足、清晨運動／冥想，以及起床後的上網界限。',
  },
  {
    key: '平時意識自主',
    title: '平時意識自主',
    description: '日常螢幕使用目標、灰階設定與近端資訊整理習慣。',
  },
  {
    key: '脫離AI寄生',
    title: '脫離AI寄生',
    description: '關閉個人化推薦與聲音通知，選擇可遷徙的社交平台。',
  },
  {
    key: '數位公共性',
    title: '數位公共性',
    description: '參與公民科技、共筆協作，以及優先使用開源專案。',
  },
];

/** 各面向評等：20↑優良、15↑良好、10–14尚可、<10待改善 */
export const autonomyLevels: AutonomyLevel[] = [
  { level: '優良', minScore: 20, color: 'teal' },
  { level: '良好', minScore: 15, color: 'primary' },
  { level: '尚可', minScore: 10, color: 'orange' },
  { level: '待改善', minScore: 0, color: 'negative' },
];

export const consciousnessAutonomyQuestions: AutonomyQuestion[] = [
  // 入睡相關
  {
    id: 1,
    category: '入睡相關',
    text: '我有在睡前設定明確的時間(至少半小時)不上網',
  },
  {
    id: 2,
    category: '入睡相關',
    text: '我有在睡前設定較長的時間(至少二小時)不上網',
  },
  {
    id: 3,
    category: '入睡相關',
    text: '我有定時在睡前將3C螢幕自動調成全灰階',
  },
  {
    id: 4,
    category: '入睡相關',
    text: '我有定時在睡前限制通訊App使之無法開啟',
  },
  {
    id: 5,
    category: '入睡相關',
    text: '我半夜起床不上網',
  },

  // 清醒相關
  {
    id: 6,
    category: '清醒相關',
    text: '我有睡足至少六個小時才起床',
  },
  {
    id: 7,
    category: '清醒相關',
    text: '我定時在清晨限制通訊App使之無法開啟',
  },
  {
    id: 8,
    category: '清醒相關',
    text: '我早上起床設定明確的時間(至少半小時)不上網',
  },
  {
    id: 9,
    category: '清醒相關',
    text: '我早上有至少半小時的運動習慣',
  },
  {
    id: 10,
    category: '清醒相關',
    text: '我早上起來的第一件事是運動或冥想',
  },

  // 平時意識自主
  {
    id: 11,
    category: '平時意識自主',
    text: '我在非工作時，將3C螢幕調成至少半灰階',
  },
  {
    id: 12,
    category: '平時意識自主',
    text: '我在打開螢幕前，會先設定好這次打開螢幕的主要目標，達成就關螢幕',
  },
  {
    id: 13,
    category: '平時意識自主',
    text: '我會有系統的整理電腦桌面',
  },
  {
    id: 14,
    category: '平時意識自主',
    text: '我會有系統的整理瀏覽器書籤',
  },
  {
    id: 15,
    category: '平時意識自主',
    text: '我會使用Obsidian等近端資訊管理軟體',
  },

  // 脫離AI寄生
  {
    id: 16,
    category: '脫離AI寄生',
    text: '我有關掉觀影平台(如YouTube)的個人化推薦',
  },
  {
    id: 17,
    category: '脫離AI寄生',
    text: '我有關掉社交平台(如Facebook, IG, Threads)的個人化推薦',
  },
  {
    id: 18,
    category: '脫離AI寄生',
    text: '我有關掉搜尋引擎(如Google)的個人化推薦',
  },
  {
    id: 19,
    category: '脫離AI寄生',
    text: '我有關掉通訊軟體(如Signal, Line)的聲音通知',
  },
  {
    id: 20,
    category: '脫離AI寄生',
    text: '我使用可遷徙的社交平台(如Bluesky, Mastodon, g0v.social)代替不可遷徙的社交平台(如Facebook, IG, Threads)',
  },

  // 數位公共性
  {
    id: 21,
    category: '數位公共性',
    text: '我會參與公民科技公版(如g0v的slack頻道)的討論',
  },
  {
    id: 22,
    category: '數位公共性',
    text: '我會使用共筆文件系統(如HackMD, Google Docs)與他人討論',
  },
  {
    id: 23,
    category: '數位公共性',
    text: '我會使用共筆文件系統(如HackMD, Google Docs)與他人協作',
  },
  {
    id: 24,
    category: '數位公共性',
    text: '我在使用類似功能軟體時，會優先使用開源(原始碼公開)的專案',
  },
  {
    id: 25,
    category: '數位公共性',
    text: '我會在開源平台(如Github, Gitlab)與他人協作',
  },
];

export function getCategoryLevel(score: number): AutonomyLevel {
  for (const level of autonomyLevels) {
    if (score >= level.minScore) return level;
  }
  return autonomyLevels[autonomyLevels.length - 1];
}

export function getOptionScore(
  answer: AutonomyAnswer | undefined | null
): number {
  if (!answer) return 0;
  return autonomyScoreMap[answer] ?? 0;
}

export interface CategoryScoreResult {
  key: string;
  title: string;
  description: string;
  score: number;
  maxScore: number;
  level: AutonomyLevel;
}

export function computeCategoryScores(
  questions: AutonomyQuestion[],
  answers: (AutonomyAnswer | undefined)[]
): CategoryScoreResult[] {
  return autonomyCategories.map((cat) => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (q.category === cat.key) {
        score += getOptionScore(answers[idx]);
      }
    });
    return {
      key: cat.key,
      title: cat.title,
      description: cat.description,
      score,
      maxScore: CATEGORY_MAX_SCORE,
      level: getCategoryLevel(score),
    };
  });
}
