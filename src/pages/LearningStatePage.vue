<template lang="pug">
.q-pa-md
  //- Intro screen
  .slide(v-show="step === 'intro'")
    .row.q-mb-md
      h2.q-my-none 學習狀態自我檢視
    .row
      p 學習不只是方法的問題，更和你當下的狀態密切相關。
      p 這份自我檢視幫助你觀察自己在「情緒穩定」、「學習動機」、「專注程度」、「自我接納」與「對外互動意願」五個面向的現況。
      p 共 15 題，每題選擇最符合你目前感受的選項，沒有對錯之分，如實作答即可。
    .row.q-mt-md
      q-btn(size="xl" color="teal" @click="startQuiz") 開始檢視

  //- Quiz screen
  .slide(v-show="step === 'quiz'")
    .q-mb-md
      .text-subtitle1.q-mb-xs 第 {{ currentIndex + 1 }} 題，共 {{ questions.length }} 題
      q-linear-progress(
        :value="(currentIndex + 1) / questions.length"
        color="teal"
        rounded
        size="10px"
      )

    q-card.q-mb-lg(flat bordered v-if="currentQuestion")
      q-card-section
        .text-caption.text-teal.q-mb-xs {{ currentQuestion.category }}
        .text-h6.q-mb-md {{ currentIndex + 1 }}. {{ currentQuestion.text }}
        .row.q-col-gutter-sm.justify-center
          .col-auto(v-for="(label, idx) in scaleLabels" :key="idx")
            q-btn(
              :outline="answers[currentIndex] !== idx + 1"
              :color="answers[currentIndex] === idx + 1 ? 'teal' : 'grey'"
              @click="selectAnswer(idx + 1)"
              unelevated
              :label="(idx + 1).toString()"
              style="min-width: 48px"
            )
        .row.q-mt-sm.justify-between.text-caption.text-grey-7
          span 很不同意
          span 普通
          span 很同意

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
        color="teal"
        icon-right="arrow_forward"
        label="下一題"
        @click="nextQuestion"
      )
      q-btn(
        v-if="currentIndex === questions.length - 1"
        :disable="!allAnswered"
        color="deep-orange"
        icon-right="check"
        label="查看結果"
        size="lg"
        @click="showResult"
      )

    .q-mt-sm.text-caption.text-grey-6(v-if="!allAnswered && currentIndex === questions.length - 1")
      | 請確保所有題目都已作答，才能查看結果。

  //- Result screen
  #learning-state-result.slide(v-show="step === 'result'")
    .row.q-mb-sm
      h2.q-my-none 檢視結果

    q-card.q-mb-md(flat bordered)
      q-card-section
        .text-overline.text-teal 你目前的學習狀態
        .text-h4.text-weight-bold.text-teal.q-mb-xs {{ result ? result.level : '' }}
        .text-caption.text-grey-7 總分：{{ totalScore }} 分（滿分 75 分，各題 1–5 分）

    q-card.q-mb-md(flat bordered)
      q-card-section
        .text-subtitle1.text-weight-bold.q-mb-sm 狀態說明
        p {{ result ? result.description : '' }}

    q-card.q-mb-md(flat bordered)
      q-card-section
        .text-subtitle1.text-weight-bold.q-mb-sm 學習方式建議
        p {{ result ? result.learningAdvice : '' }}

    q-card.q-mb-md(flat bordered)
      q-card-section
        .text-subtitle1.text-weight-bold.q-mb-sm 任務規模建議
        p {{ result ? result.taskAdvice : '' }}

    q-card.q-mb-md(flat bordered)
      q-card-section
        .text-subtitle1.text-weight-bold.q-mb-sm 陪伴與互動建議
        p {{ result ? result.companionshipAdvice : '' }}

    .row.q-mb-md
      q-btn(color="teal" size="lg" @click="restart") 重新檢視

    q-separator.q-my-md

    .text-caption.text-grey-6.q-mt-sm
      | ⚠️ 免責聲明：本工具為教育性質之自我反思參考，結果僅供個人學習狀態的初步觀察，不具備任何醫療、心理診斷或臨床評估效力。如有心理健康方面的困擾，請尋求專業人員協助。
</template>

<script>
import {
  learningStateQuestions,
  scaleLabels,
  getResultLevel,
} from 'src/data/learningStateQuestions';

export default {
  name: 'LearningStatePage',
  data() {
    return {
      step: 'intro', // 'intro' | 'quiz' | 'result'
      questions: learningStateQuestions,
      scaleLabels,
      answers: [], // array of numbers 1–5, indexed by question order
      currentIndex: 0,
      result: null,
      totalScore: 0,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null;
    },
    allAnswered() {
      return (
        this.answers.length === this.questions.length &&
        this.answers.every((a) => a !== undefined && a !== null)
      );
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
      this.totalScore = this.answers.reduce((sum, v) => sum + (v || 0), 0);
      this.result = getResultLevel(this.totalScore);
      this.step = 'result';
      this.$nextTick(() => {
        const el = document.getElementById('learning-state-result');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    },
    restart() {
      this.answers = [];
      this.currentIndex = 0;
      this.result = null;
      this.totalScore = 0;
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
  max-width: 680px;
  margin: 0 auto;
}
</style>
