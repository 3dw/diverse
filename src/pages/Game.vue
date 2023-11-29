<template lang="pug">
.q-pa-md
  h4(v-if="!msg") 學習風格猜猜看
  h4(v-else) {{msg}}
  .heading(v-if="step > -1") 連勝: {{wins}} 連勝
  q-btn(size="xl", v-show="step == -1" @click="step = 0; reset()") 按此開始遊戲
  .row(v-if="step > -1")
    .col.left
      h6 假想情境：
      p {{myQ.t}}
      h6 學習方法：
      p.light {{myQ.cs[idx]}}
    .col.right
      h6 這樣的方法，屬於什麼學習風格呢？
      ul
        li(v-for = "(vark, index) in myQ.rs")
          q-btn(size="xl", color="primary",  @click="guess(index)" v-bind:class = "show[vark].c")
            q-icon(:name = "show[vark].i")
            | {{show[vark].t}}
</template>

<script>
export default {
  name: 'PlayGame',
  props: ['qs'],
  data() {
    return {
      msg: '',
      wins: 0,
      step: -1,
      a: 0,
      idx: 0,
      myQ: {},
      show: {
        v: { t: '視覺', c: 'orange', i: 'face' },
        a: { t: '聽覺', c: 'purple', i: 'phone' },
        r: { t: '閱讀', c: 'blue', i: 'edit' },
        k: { t: '實作', c: 'red', i: 'pan_tool' },
      },
    };
  },
  methods: {
    reset() {
      this.a = Math.floor(Math.random() * this.qs.length);
      this.myQ = this.qs[this.a];
      this.idx = Math.floor(Math.random() * 4);
    },
    guess(index) {
      if (this.idx === index) {
        this.win();
      } else {
        this.loose();
      }
    },
    win() {
      this.msg = '你猜對了，真厲害';
      this.wins++;
      this.reset();
    },
    loose() {
      this.msg = '你猜錯了，沒關係，再接再勵';
      this.wins = 0;
      this.reset();
    },
  },
};
</script>

<style scoped="">
p {
  font-size: 18px;
}

.light {
  background-color: gold;
}

.col.left {
  border-right: 3px solid #ccc;
  padding-right: 0.5em;
}

.col.right {
  padding-left: 1em;
}
</style>
