export interface LearningStateQuestion {
  id: number;
  category: string;
  text: string;
}

export interface LearningStateResult {
  level: string;
  range: string;
  description: string;
  learningAdvice: string;
  taskAdvice: string;
  companionshipAdvice: string;
}

export const learningStateQuestions: LearningStateQuestion[] = [
  // 情緒穩定 (Emotional Stability)
  {
    id: 1,
    category: '情緒穩定',
    text: '當我遇到學習上的困難，我能夠保持平靜，不會輕易放棄。',
  },
  {
    id: 2,
    category: '情緒穩定',
    text: '即使今天心情不太好，我還是能夠讓自己投入學習一小段時間。',
  },
  {
    id: 3,
    category: '情緒穩定',
    text: '當我犯了錯誤，我能夠調整心情，繼續嘗試，而不是久久陷在沮喪裡。',
  },

  // 學習動機 (Learning Motivation)
  {
    id: 4,
    category: '學習動機',
    text: '最近我對想學的事物感到好奇，很想深入了解。',
  },
  {
    id: 5,
    category: '學習動機',
    text: '我能夠為自己找到學習的理由，不需要別人一直催促。',
  },
  {
    id: 6,
    category: '學習動機',
    text: '當我想到學習某件事之後能帶來的好處，就會覺得有動力繼續下去。',
  },

  // 專注程度 (Focus/Concentration)
  {
    id: 7,
    category: '專注程度',
    text: '我可以在不受干擾的情況下，持續專注於一件事超過 15 分鐘。',
  },
  {
    id: 8,
    category: '專注程度',
    text: '當我發現自己分心了，我能夠把注意力拉回來，繼續手邊的任務。',
  },
  {
    id: 9,
    category: '專注程度',
    text: '最近我的睡眠和體力狀況，足以支撐我好好思考和學習。',
  },

  // 自我接納 (Self-Acceptance)
  {
    id: 10,
    category: '自我接納',
    text: '我能夠接受自己目前還有不擅長的地方，不會因此覺得自己很差。',
  },
  {
    id: 11,
    category: '自我接納',
    text: '就算今天表現不如預期，我也能告訴自己：「下次再試試看」。',
  },
  {
    id: 12,
    category: '自我接納',
    text: '當別人比我進步更快，我可以坦然面對，不會感到強烈的挫敗或嫉妒。',
  },

  // 對外互動意願 (Willingness to Interact)
  {
    id: 13,
    category: '對外互動意願',
    text: '最近我願意向別人提問，或分享我正在學習的事情。',
  },
  {
    id: 14,
    category: '對外互動意願',
    text: '我不介意讓他人看見我學習的過程，包括還沒學好的部分。',
  },
  {
    id: 15,
    category: '對外互動意願',
    text: '我願意和別人一起討論或合作，共同探索我感興趣的主題。',
  },
];

export const scaleLabels: string[] = [
  '很不同意',
  '不同意',
  '普通',
  '同意',
  '很同意',
];

export const resultLevels: LearningStateResult[] = [
  {
    level: '需要休息',
    range: '15–29',
    description:
      '你目前的學習狀態比較低落，身心可能正在承受較大的壓力或疲憊。這並不是你的問題，每個人都會有這樣的時刻。現在最重要的事，是給自己充分的休息與喘息空間。',
    learningAdvice:
      '暫時放下對「學會多少」的要求。如果想學點什麼，就挑一件你覺得輕鬆、有趣的小事，純粹讓自己享受探索的感覺就好。',
    taskAdvice:
      '避免長時間或高強度的學習任務。把目標縮小到「今天只做一件小事」，完成了就算成功。',
    companionshipAdvice:
      '如果可以，找一個信任的人陪你說說話，或只是安靜地待在一起。不需要談學習，單純感受有人同在，就很有幫助。',
  },
  {
    level: '重新整理中',
    range: '30–42',
    description:
      '你正處於一個調整與沉澱的階段。也許剛度過一段辛苦的時期，或者感覺有些茫然，不確定下一步該怎麼走。這樣的狀態其實是一種自我保護，讓你有機會慢下來，重新找到方向。',
    learningAdvice:
      '與其逼自己硬撐，不如花時間整理「我到底對什麼感興趣」。可以回顧過去學過讓你覺得有意思的東西，或者隨意嘗試幾件新事物，看看有什麼能點燃一點好奇心。',
    taskAdvice:
      '選擇結構清楚、步驟簡單的任務，每次完成一小步就給自己肯定。不用擔心效率，建立節奏比衝刺更重要。',
    companionshipAdvice:
      '找一個能耐心傾聽的夥伴或引導者，讓你有機會說出自己的感受和困惑。被好好接納的感覺，能幫助你慢慢找回動力。',
  },
  {
    level: '穩定起步',
    range: '43–54',
    description:
      '你目前的狀態算是穩定，雖然不是最高峰，但有基本的能量可以開始嘗試。你可能偶爾還是會猶豫或卡住，但整體來說已經準備好踏出一步了。',
    learningAdvice:
      '選擇你有一定把握，但也有一點點挑戰性的事情來學。太簡單會無聊，太難會挫折，在舒適圈的邊緣最容易有成就感。',
    taskAdvice:
      '把任務分成幾個明確的小步驟，一次完成一步。每完成一個階段，都停下來記錄一下自己做到了什麼，這樣有助於累積自信。',
    companionshipAdvice:
      '和有相近學習目標的人一起進行，互相打氣、分享進度，比一個人悶頭學更能維持動力。',
  },
  {
    level: '正在展開',
    range: '55–65',
    description:
      '你目前的學習狀態相當不錯！你有足夠的動力和專注力，也對自己有一定程度的接納。這是一個很適合往前推進的時機，可以嘗試更有深度或更有挑戰的事情。',
    learningAdvice:
      '可以嘗試設定一個稍微有野心的學習目標，並規劃達成的步驟。你現在的狀態足以支持你持續深入，不只是點到為止。',
    taskAdvice:
      '可以接受稍微複雜一些的任務，也可以試著安排較長的學習時段。遇到卡關不要急，給自己思考和消化的時間。',
    companionshipAdvice:
      '這個階段很適合找一個可以一起討論、互相挑戰想法的夥伴。有良好的對話對象，能讓你的思考更深入，學習更有趣。',
  },
  {
    level: '主動投入',
    range: '66–75',
    description:
      '你目前的學習狀態非常好！你充滿好奇心、動力十足，也有能力長時間專注，並且對自己抱有正向的態度。這是一個很棒的時機，可以盡情探索你感興趣的事物。',
    learningAdvice:
      '盡情投入你感興趣的領域，不要給自己太多限制。這個階段很適合做深度探究、接觸新領域，甚至把學到的東西整理成作品或分享給他人。',
    taskAdvice:
      '你有能力挑戰難度較高的任務，也可以同時進行幾個不同的學習方向。記得偶爾停下來回顧自己的進展，享受成長的成就感。',
    companionshipAdvice:
      '現在的你很適合扮演引導或分享的角色——把你學到的東西教給別人，或帶著他人一起探索，這樣不只幫助了別人，也能讓你的學習更加深化。',
  },
];

export function getResultLevel(totalScore: number): LearningStateResult {
  if (totalScore <= 29) return resultLevels[0];
  if (totalScore <= 42) return resultLevels[1];
  if (totalScore <= 54) return resultLevels[2];
  if (totalScore <= 65) return resultLevels[3];
  return resultLevels[4];
}
