<template lang="pug">
.q-pa-md
  .ui.container(v-show = "step == -1 || step == 0")
    .slide(v-show = "step == -1")
      #start
        .row
          h2.ui.header 整體型與分析型學習風格

          p 每個人在學習新知識時，都有不同的理解方式與思維模式。
          p 有些人喜歡先看到整體的輪廓，有些人則偏好從細節開始理解。

          p 整體型與分析型學習風格是由
            a(href="https://en.wikipedia.org/wiki/Learning_styles" target="_blank" rel="noopener noreferrer") 認知心理學
            | 研究發現的兩種不同的學習偏好模式。這個分類幫助我們了解：

          ul
            li.flex.flex-row.flex-start-center
              | 🎁 整體型學習者 - 先以格式塔(完形)的方式理解，後熟悉小階梯(步驟)
            li.flex.flex-row.flex-start-center
              | 🛝 分析型學習者 - 先以小階梯(步驟)的方式理解，後建立格式塔(完形)

        q-separator

        .row
          p 整體型學習者喜歡：
          ul
            li 先了解整體概念和目標
            li 看到大圖景和關聯性
            li 跳躍式思考，不拘泥於順序
            li 喜歡創意和創新
        .row
          p 分析型學習者偏好：
          ul
            li 按步驟循序漸進地學習
            li 注重細節和邏輯順序
            li 系統性地建立知識結構
            li 喜歡明確的指導和規則

          p 本站的整體型與分析型自我測驗，請根據你的學習習慣，選擇最符合你的選項。
          p 測驗結果將會告訴你，你最擅長的學習思維模式，以及如何提升你的學習效率。

          p 對於孩子，可以由家長帶領孩子一起測驗，將題目中的例子改成孩子熟悉的例子，並且由家長陪同孩子一起討論測驗結果。

          p 這兩種學習風格各有優勢，了解自己的偏好可以幫助你選擇更適合的學習方法。

          p 本站由
            a(href="https://www.alearn.org.tw" target="_blank" rel="noopener noreferrer") 自主學習促進會
            | 開發，並公開在
            a(href="https://github.com/3dw/diverse" target="_blank" rel="noopener noreferrer") GitHub
            | 上，歡迎聯絡我們，提供意見。

        .row
          q-btn(size="xl", @click = "step=0", color="secondary") 開始測驗

  .ui.form.slide.container(v-show="step == 0")
      .ui.segment.repeated-item(v-for="(q, idx) in questions")
        .flex.flex-row.flex-start-center
          h2.ui.dividing.header {{idx + 1}}. {{q.t}} (可複選)
          q-btn(
            round
            flat
            color="primary"
            icon="volume_up"
            @click="speakText(`${idx + 1}. ${q.t}`)"
            size="sm"
            class="q-ml-sm"
          )
        br
        .field
          .list(v-for="(c,index) in q.cs")
            .item.flex.flex-row.flex-start-center
              q-checkbox(
                v-model="q.checked[index]"
                :label="c"
                size="lg"
              )
              q-btn(
                round
                flat
                color="primary"
                icon="volume_up"
                @click="speakText(c)"
                size="sm"
                class="q-ml-sm"
              )

      br

      q-btn(color="secondary", size="xl", tabindex="0" @click="step = 1") 看結果!
      .ui.attached.segment

  #resault.ui.segment.slide2(v-show="step == 1")
      h4.ui.header
        i.purple.puzzle.icon
        | 測驗結果：你是一名「{{getFinal()}}」優勢的學習者!!
        q-separator
        .sub.header {{getNum()}}
      p(v-html = "getAdvice()")
      q-btn.print-hide(color="secondary", size="xl", tabindex="0" @click="step = -1") 再來一次!
      q-btn.print-hide(color="primary", size="xl", tabindex="0" @click="print()") 列印結果
</template>

<script>
export default {
  name: 'WholeReductTest',
  data() {
    return {
      step: -1,
      questions: [
        {
          t: '當你學習一個新的主題時，你比較喜歡：',
          cs: [
            '先了解這個主題的整體概念和目標',
            '從基礎概念開始，一步一步地學習',
            '看到這個主題與其他知識的關聯性',
            '按照教科書的順序，逐章逐節地學習',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '在解決問題時，你通常會：',
          cs: [
            '先嘗試理解問題的整體脈絡',
            '將問題分解成小步驟來解決',
            '跳躍式思考，不拘泥於順序',
            '按照標準的程序和方法來處理',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '當你閱讀一本書時，你比較喜歡：',
          cs: [
            '先快速瀏覽目錄和章節大綱',
            '從第一頁開始，按順序閱讀',
            '跳著讀，先看感興趣的章節',
            '仔細閱讀每一段，確保理解後再繼續',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '在學習新技能時，你比較偏好：',
          cs: [
            '先看到完整的成品或結果',
            '從基本動作開始練習',
            '了解整個流程和目標',
            '按照教練的指示，一步一步來',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '當你遇到複雜的概念時，你會：',
          cs: [
            '試圖找到一個簡單的比喻來理解',
            '將概念分解成更小的部分',
            '尋找與已知知識的相似之處',
            '仔細分析每個細節和定義',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '在學習數學時，你比較喜歡：',
          cs: [
            '先了解公式的意義和用途',
            '從簡單的例題開始練習',
            '看到數學與現實生活的關聯',
            '按照教科書的順序，逐步學習',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '當你學習語言時，你會：',
          cs: [
            '先學習常用的句子和表達',
            '從字母和發音開始',
            '嘗試理解語言的整體結構',
            '按照語法規則，系統地學習',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '在學習科學概念時，你比較偏好：',
          cs: [
            '先看到實驗的結果和現象',
            '從理論基礎開始理解',
            '了解科學發現的歷史背景',
            '按照邏輯順序，逐步建立概念',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '當你學習使用新軟體時，你會：',
          cs: [
            '先嘗試各種功能，了解能做什麼',
            '按照使用手冊，一步一步學習',
            '尋找軟體的整體設計理念',
            '仔細閱讀說明書的每個細節',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '在學習歷史時，你比較喜歡：',
          cs: [
            '先了解歷史事件的背景和影響',
            '按照時間順序，逐個事件學習',
            '看到歷史與現代的關聯',
            '仔細分析每個歷史事件的細節',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '當你學習藝術時，你會：',
          cs: [
            '先欣賞完整的作品',
            '從基本技巧開始練習',
            '了解藝術家的創作理念',
            '按照技法要求，逐步練習',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '在學習音樂時，你比較偏好：',
          cs: [
            '先聽完整的曲子',
            '從基本音符開始練習',
            '了解音樂的整體結構',
            '按照樂譜，逐小節練習',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '當你學習烹飪時，你會：',
          cs: [
            '先看到成品的樣子',
            '從基本刀工開始練習',
            '了解烹飪的整體流程',
            '按照食譜，逐步操作',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '在學習運動技能時，你比較喜歡：',
          cs: [
            '先看到完整的動作示範',
            '從基本姿勢開始練習',
            '了解運動的整體目標',
            '按照教練的指示，逐步練習',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
        {
          t: '當你學習寫作時，你會：',
          cs: [
            '先構思整體的結構和主題',
            '從第一段開始寫起',
            '先寫大綱，再填充內容',
            '按照寫作規則，逐步完成',
          ],
          checked: [false, false, false, false],
          rs: ['w', 'r', 'w', 'r'],
        },
      ],
    };
  },
  methods: {
    print() {
      this.$emit('closeDrawer');
      setTimeout(() => {
        window.print();
      }, 500);
    },
    countWholeReduct: function () {
      var ans, i, l, type;
      ans = {};
      i = 0;
      while (i < ['w', 'r'].length) {
        l = this.questions.filter(fn$).length;
        type = ['w', 'r'][i];
        ans[type] = l;
        i++;
      }
      return ans;
      function fn$(q) {
        var j;
        j = 0;
        while (j < [0, 1, 2, 3].length) {
          if (q.rs[j] === ['w', 'r'][i] && q.checked[j]) {
            return true;
          }
          j++;
        }
      }
    },
    getNum: function () {
      var types, names, ans, i$, len$, t;
      types = ['w', 'r'];
      names = ['整體型', '分析型'];
      ans = [];
      for (i$ = 0, len$ = types.length; i$ < len$; ++i$) {
        t = types[i$];
        ans.push(names[i$] + ':' + this.countWholeReduct()[t]);
      }
      return ans.join(' ');
    },
    getFinal: function () {
      var types, titles, ans, i$, len$, t;
      types = ['w', 'r'];
      titles = {
        w: '整體型',
        r: '分析型',
      };
      ans = [];
      for (i$ = 0, len$ = types.length; i$ < len$; ++i$) {
        t = types[i$];
        if (this.countWholeReduct()[t] > 7) {
          ans.push(titles[t]);
        }
      }
      if (ans.length === 0) {
        ans = ['平衡型'];
      }
      return ans.join('+');
    },
    getAdvice: function () {
      var types, ans, maxADV, minADV, i$, len$, t, res;
      types = ['w', 'r'];
      ans = [];
      maxADV = {
        w: '你具有整體型學習的優勢。整體型學習者擅長先看到大圖景，理解整體概念和關聯性。<br/>你的學習建議：<br/>• 在學習新主題前，先瀏覽整體架構和目標<br/>• 尋找知識之間的關聯性和模式<br/>• 使用思維導圖來整理知識<br/>• 嘗試跳躍式學習，不拘泥於順序<br/>• 注重創意和創新思維',
        r: '你具有分析型學習的優勢。分析型學習者擅長按步驟學習，注重細節和邏輯順序。<br/>你的學習建議：<br/>• 按照邏輯順序，逐步建立知識結構<br/>• 注重基礎概念和定義<br/>• 使用清單和檢查表來組織學習<br/>• 仔細分析每個細節<br/>• 建立系統性的學習方法',
      };
      minADV = {
        w: '你目前還不大擅長整體型學習。建議：<br/>• 嘗試在學習前先了解整體目標<br/>• 尋找知識之間的關聯性<br/>• 使用視覺化工具來整理思維<br/>• 練習跳躍式思考',
        r: '你目前還不大擅長分析型學習。建議：<br/>• 嘗試按步驟學習<br/>• 注重基礎概念<br/>• 使用清單來組織學習<br/>• 練習系統性思維',
      };
      for (i$ = 0, len$ = types.length; i$ < len$; ++i$) {
        t = types[i$];
        res = this.countWholeReduct();
        if (res[t] > 7) {
          ans.push(maxADV[t]);
        }
        if (res[t] < 4) {
          ans.push(minADV[t]);
        }
      }
      return ans.join('<br/><br/>');
    },
    speakText(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      window.speechSynthesis.speak(utterance);
    },
  },
};
</script>

<style scoped>
p,
li,
label {
  font-size: 18px !important;
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

input {
  margin: 0 0.5em;
}

.flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-start-center {
  align-items: center;
}
</style>
