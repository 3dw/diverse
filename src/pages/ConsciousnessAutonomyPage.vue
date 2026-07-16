<template lang="pug">
.q-pa-md.autonomy-page
  //- Intro screen
  .slide.print-hide(v-show="step === 'intro'")
    .row.intro-header.q-mb-md.items-center.q-col-gutter-sm
      .col-auto
        img.intro-illust(
          :src="heroSvg"
          alt="意識自主：從螢幕通知中回收注意力"
          width="160"
          height="80"
        )
      .col
        h2.q-my-none {{ intro.title }}
    .row
      p(v-for="(p, i) in intro.paragraphs" :key="i") {{ p }}
    .row.q-mt-sm
      p.text-caption.text-grey-7
        | 計分方式：
        strong O
        |  總是如此 = 6 分；
        strong A
        |  大都如此 = 2 分；
        strong X
        |  很少如此 = 0 分。
        br
        | 共 25 題，五個面向各自的滿分為 30 分，總共滿分 150 分。
    .row.q-mt-md
      q-btn(size="xl" color="indigo" @click="startQuiz") 開始測驗

  //- Quiz screen
  .slide.print-hide(v-show="step === 'quiz'")
    .q-mb-md
      .text-subtitle1.q-mb-xs 第 {{ currentIndex + 1 }} 題，共 {{ questions.length }} 題
      q-linear-progress(
        :value="(currentIndex + 1) / questions.length"
        color="indigo"
        rounded
        size="10px"
      )

    q-card.q-mb-lg(flat bordered v-if="currentQuestion")
      q-card-section
        .text-caption.text-indigo.q-mb-xs {{ currentQuestion.category }}
        .text-h6.q-mb-md {{ currentIndex + 1 }}. {{ currentQuestion.text }}
        .column.q-gutter-sm
          q-btn(
            v-for="opt in options"
            :key="opt.key"
            :outline="answers[currentIndex] !== opt.key"
            :color="answers[currentIndex] === opt.key ? 'indigo' : 'blue-grey-7'"
            :label="opt.key + '　' + opt.label"
            unelevated
            align="left"
            class="full-width answer-btn"
            @click="selectAnswer(opt.key)"
          )

    .row.q-gutter-sm.justify-between
      q-btn(
        v-if="currentIndex > 0"
        flat
        color="grey"
        icon="arrow_back"
        label="上一題"
        @click="prevQuestion"
      )
      q-space
      q-btn(
        v-if="currentIndex < questions.length - 1"
        :disable="answers[currentIndex] === undefined"
        color="indigo"
        icon-right="arrow_forward"
        label="下一題"
        @click="nextQuestion"
      )
      q-btn(
        v-if="currentIndex === questions.length - 1"
        :disable="!allAnswered"
        :color="allAnswered ? 'deep-orange' : 'grey-6'"
        icon-right="check"
        label="查看結果"
        size="lg"
        @click="showResult"
      )

    .q-mt-sm.text-caption.text-grey-6(
      v-if="!allAnswered && currentIndex === questions.length - 1"
    )
      | 請確保所有題目都已作答，才能查看結果。

  //- Result / printable report
  #autonomy-result.slide.result-slide(v-show="step === 'result'")
    .report-sheet
      .report-header
        .row.items-center.q-gutter-sm.no-wrap
          img.report-illust(
            :src="heroSvg"
            alt=""
            width="88"
            height="44"
          )
          .col
            h2.report-title.q-my-none 意識自主大作戰｜自我測驗報告
            .report-meta.text-caption.text-grey-7
              | 作答日期：{{ reportDate }}　｜　總分 {{ totalScore }} / {{ totalMax }} 分

      .report-summary.q-mb-md
        .text-overline 綜合狀態
        .text-h5.text-weight-bold(:class="'text-' + overallLevel.color")
          | {{ overallLevel.level }}
        .text-body2.text-grey-8.q-mt-xs
          | 五個面向各滿分 30 分。20 分以上為優良，15 分以上為良好，10～14 分為尚可，低於 10 分為待改善。

      .category-grid
        .category-card(
          v-for="cat in categoryResults"
          :key="cat.key"
        )
          .cat-title {{ cat.title }}
          .cat-score
            span.score-num(:class="'text-' + cat.level.color") {{ cat.score }}
            span.score-max / {{ cat.maxScore }}
          .cat-level(:class="'text-' + cat.level.color") {{ cat.level.level }}
          q-linear-progress.q-mt-sm(
            :value="cat.score / cat.maxScore"
            :color="cat.level.color"
            track-color="grey-3"
            rounded
            size="8px"
          )
          .cat-desc.text-caption.text-grey-7.q-mt-sm {{ cat.description }}

      .report-legend.q-mt-md.text-caption.text-grey-7
        | 計分：O（總是如此）= 6　A（大都如此）= 2　X（很少如此）= 0

      .report-disclaimer.text-caption.text-grey-6.q-mt-md
        | 本報告為自我反思參考，結果僅供個人觀察意識自主現況，不具備醫療或臨床診斷效力。

    .result-buttons.print-hide.q-mt-md.q-mb-md
      q-btn(color="primary" size="lg" icon="print" @click="print") 列印／輸出 PDF
      q-btn(color="indigo" size="lg" outline @click="restart") 重新測驗
</template>

<script>
import {
  autonomyIntroduction,
  autonomyOptions,
  consciousnessAutonomyQuestions,
  computeCategoryScores,
  getCategoryLevel,
  TOTAL_MAX_SCORE,
} from 'src/data/consciousnessAutonomyQuestions';

export default {
  name: 'ConsciousnessAutonomyPage',
  data() {
    return {
      step: 'intro', // 'intro' | 'quiz' | 'result'
      intro: autonomyIntroduction,
      heroSvg: '/consciousness-autonomy.svg',
      questions: consciousnessAutonomyQuestions,
      options: autonomyOptions,
      answers: [], // 'O' | 'A' | 'X'
      currentIndex: 0,
      categoryResults: [],
      totalScore: 0,
      totalMax: TOTAL_MAX_SCORE,
      reportDate: '',
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null;
    },
    allAnswered() {
      return (
        this.answers.length === this.questions.length &&
        this.answers.every((a) => a === 'O' || a === 'A' || a === 'X')
      );
    },
    overallLevel() {
      if (!this.categoryResults.length) {
        return { level: '—', color: 'grey' };
      }
      const avg =
        this.categoryResults.reduce((s, c) => s + c.score, 0) /
        this.categoryResults.length;
      return getCategoryLevel(Math.round(avg));
    },
  },
  methods: {
    startQuiz() {
      this.answers = new Array(this.questions.length).fill(undefined);
      this.currentIndex = 0;
      this.step = 'quiz';
    },
    selectAnswer(value) {
      const updated = [...this.answers];
      updated[this.currentIndex] = value;
      this.answers = updated;
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      }
    },
    prevQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    showResult() {
      if (!this.allAnswered) return;
      this.categoryResults = computeCategoryScores(
        this.questions,
        this.answers
      );
      this.totalScore = this.categoryResults.reduce((s, c) => s + c.score, 0);
      const now = new Date();
      this.reportDate = `${now.getFullYear()}/${
        now.getMonth() + 1
      }/${now.getDate()}`;
      this.step = 'result';
      this.$nextTick(() => {
        const el = document.getElementById('autonomy-result');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    },
    print() {
      this.$emit('closeDrawer');
      setTimeout(() => {
        window.print();
      }, 300);
    },
    restart() {
      this.answers = [];
      this.currentIndex = 0;
      this.categoryResults = [];
      this.totalScore = 0;
      this.reportDate = '';
      this.step = 'intro';
    },
  },
};
</script>

<style scoped>
p {
  font-size: 17px;
  line-height: 1.7;
}

.text-h6 {
  line-height: 1.5;
}

.slide {
  max-width: 720px;
  margin: 0 auto;
}

.intro-illust {
  display: block;
  width: 160px;
  height: auto;
  max-width: 42vw;
  border-radius: 10px;
}

.report-illust {
  display: block;
  width: 88px;
  height: auto;
  border-radius: 6px;
  flex-shrink: 0;
}

.answer-btn {
  min-height: 48px;
  justify-content: flex-start;
}

.report-sheet {
  background: #fff;
}

.report-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.4;
}

.report-summary {
  padding: 12px 0 4px;
  border-bottom: 1px solid #e0e0e0;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-top: 16px;
}

.category-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px 16px;
}

.cat-title {
  font-weight: 700;
  font-size: 1.05rem;
}

.cat-score {
  margin-top: 6px;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.score-num {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
}

.score-max {
  color: #757575;
  font-size: 0.95rem;
}

.cat-level {
  font-weight: 700;
  margin-top: 2px;
}

.result-buttons {
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
}

@media (min-width: 600px) {
  .category-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 599px) {
  .intro-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .intro-illust {
    max-width: 100%;
  }

  .result-buttons {
    flex-direction: column;
  }
}

/* —— Print / PDF (A4-like) —— */
@media print {
  .print-hide {
    display: none !important;
  }

  .autonomy-page {
    padding: 0 !important;
  }

  .result-slide,
  .slide {
    max-width: none;
    margin: 0;
  }

  .report-sheet {
    width: 100%;
    color: #000;
  }

  .report-title {
    font-size: 18pt;
  }

  .report-illust {
    width: 64px;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .category-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10pt;
    margin-top: 10pt;
  }

  .category-card {
    border: 1px solid #999;
    border-radius: 0;
    padding: 8pt 10pt;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .score-num {
    font-size: 16pt;
  }

  .report-disclaimer {
    margin-top: 12pt;
    font-size: 8pt;
  }
}
</style>

<style>
/* Global print chrome (header/footer/drawer) + A4 page box */
@media print {
  @page {
    size: A4;
    margin: 14mm 16mm;
  }

  .print-hide {
    display: none !important;
  }

  body {
    background: #fff !important;
  }

  .q-header,
  .q-drawer,
  .q-footer,
  .q-page-container > .q-drawer {
    display: none !important;
  }

  .q-page-container {
    padding-top: 0 !important;
    padding-left: 0 !important;
  }

  .q-layout,
  .q-page {
    min-height: 0 !important;
    height: auto !important;
  }
}
</style>
