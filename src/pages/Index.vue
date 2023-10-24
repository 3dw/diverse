<template lang="pug">
.q-pa-md
  .ui.container(v-show = "step == -1 || step == 0")
    .slide(v-show = "step == -1")
      #start
        h3 學習風格自我測驗
        q-btn(size="xl", @click = "step=0") 按此開始測驗

  .ui.form.slide.container(v-show="step == 0")
      .ui.segment.repeated-item(v-for="(q, idx) in qs")
        h5.ui.dividing.header {{idx}}. {{q.t}} (可複選)
        br
        .field
          .list(v-for="(c,index) in q.cs")
            .item
              .ui.toggle.checkbox
                input(type="checkbox" v-model = "q.checked[index]")
                label {{c}}

      br

      q-btn(color="primary", size="xl", tabindex="0" @click="step = 1") 看結果!
      .ui.attached.segment

  #resault.ui.segment.slide2(v-show="step == 1")
      h1.ui.header
          i.purple.puzzle.icon
          | 測驗結果：你是一名「{{getFinal()}}」優勢的學習者!!
          .sub.header {{getNum()}}
      p(v-html = "getAdvice()")
      a.ui.huge.green.button(@click="step = -1") 再來一次!
</template>

<script>

export default {
  name: 'StyleTest',
  props: ['qs'],
  data () {
    return {
      step: -1
    }
  },
  methods: {
    countVARK: function () {
      var ans, i, l, vark
      ans = {}
      i = 0
      while (i < ['v', 'a', 'r', 'k'].length) {
        l = this.qs.filter(fn$).length
        vark = ['v', 'a', 'r', 'k'][i]
        ans[vark] = l
        i++
      }
      return ans
      function fn$ (q) {
        var j
        j = 0
        while (j < [0, 1, 2, 3].length) {
          if (q.rs[j] === ['v', 'a', 'r', 'k'][i] && q.checked[j]) {
            return true
          }
          j++
        }
      }
    },
    getNum: function () {
      var vark, names, ans, i$, len$, t
      vark = ['v', 'a', 'r', 'k']
      names = ['視覺', '聽覺', '閱讀', '實作']
      ans = []
      for (i$ = 0, len$ = vark.length; i$ < len$; ++i$) {
        t = vark[i$]
        ans.push(names[i$] + ':' + this.countVARK()[t])
      }
      return ans.join(' ')
    },
    getFinal: function () {
      var vark, titles, ans, i$, len$, t
      vark = ['v', 'a', 'r', 'k']
      titles = {
        v: '視覺',
        a: '聽覺',
        r: '閱讀',
        k: '操作'
      }
      ans = []
      for (i$ = 0, len$ = vark.length; i$ < len$; ++i$) {
        t = vark[i$]
        if (this.countVARK()[t] > 9) {
          ans.push(titles[t])
        }
      }
      if (ans.length === 0) {
        ans = ['正在試探自己']
      }
      return ans.join('+')
    },
    getAdvice: function () {
      var vark, ans, maxADV, minADV, i$, len$, t, res
      vark = ['v', 'a', 'r', 'k']
      ans = []
      maxADV = {
        v: '你具有視覺學習的優勢。視覺優勢的人，通常擅於看圖表、做圖形的設計與資訊整理。<br/>你的筆記本應該充滿你自己的圖鴨和圖象式筆記吧？太雜亂的顏色與空間，可能會打亂你的思考、降低學習效率，最好在一個視覺單純的環境下學習。',
        a: '你具有聽覺、對話學習的優勢。聽覺、對話優勢的人，通常也比較人際取向，喜歡在討論的過程中學習，喜歡與人合作，而不是每個人各做各的。<br/>在一般的講述課堂，單向的聽講也是可以差強人意地學會新知，更喜歡合作討論的氣氛，以及有來有往的互動。如果不能發問就會不舒服。因此，有學習夥伴和可以提問的老師或討論區是很重要的。</p>',
        r: '你具有閱讀學習的優勢。閱讀學習是少數完全不依賴真人互動的學習方式。對你而言，好的學習材料非常重要。如果能擅用圖書館和網路，你將能以自己的步調學到很多。<br/>如果遇到不好的材料，可能會消耗你的心力，讓你事倍功半，因此，當初學一門領域時，若能找到視野又深又廣的人，請他推薦真正好的學習材料給你，會更有效率。',
        k: '你具有實作學習的優勢。實作優勢的人，通常都有驚人的創造潛力，只是在一般的單向講述課堂中，難以發揮。<br/>你適合在家中弄一塊小工作區，動手拆裝各種裝置的小零件，實作出一些作品，把學到的知識製成模型。你也適合在實作課堂中，透過邊做邊學的方式學習新知。<br/>紙跟筆對你是不夠用的，最好找到其他的學習工具，例如棋子、紙牌、方塊、模型、電腦程式等等。'
      }
      minADV = {
        v: '你目前還不大擅長視覺學習。遇到圖象與圖表時，試著用你擅長的能力，例如聽覺、閱讀和實作，去分析它們吧！',
        a: '你目前還不大擅長聽覺與對話的學習。如果很多知識用聽的不易理解，試著靠閱讀、圖象與實作，來學會它吧！',
        r: '你目前還不大擅長閱讀。如果很多知識用讀的不易理解，那麼試著把它們唸出來、或轉換成圖象、動作來理解吧！<br/>大部份的自學知識都以閱讀為主，因此你可能需要一些擅長閱讀的學習夥伴，以及願意回答你問題的老師，才不會因為閱讀上的困難而被卡住。',
        k: '你目前還不大擅長實作學習。試著把你學到的知識，拿來創作一些作品吧！'
      }
      for (i$ = 0, len$ = vark.length; i$ < len$; ++i$) {
        t = vark[i$]
        res = this.countVARK()
        if (res[t] > 9) {
          ans.push(maxADV[t])
        }
        if (res[t] < 6) {
          ans.push(minADV[t])
        }
      }
      return ans.join('<br/><br/>')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p, label {
  font-size: 20px !important;
  line-height: 1.618 !important;
  text-align: left;
}

.list .item {
  text-align: left;
  font-size: 20px;
}

.hello {
  background-color: #ffc;
}

.ui.container, .slide {
}

input {
  margin: 0 .5em;
}

</style>
