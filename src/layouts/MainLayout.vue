<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="print-hide">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> 學習風格自我測驗 </q-toolbar-title>

        <q-btn flat dense round icon="qr_code_2" @click="showQrCode = true">
          <q-tooltip>QR Code</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item class="big" to="/">
          <q-icon name="pan_tool" />
          VARK 學習風格測驗
        </q-item>
        <q-item class="big" to="/whole-reduct">
          <q-icon name="psychology" />
          整體型與分析型測驗
        </q-item>
        <q-item class="big" to="/game">
          <q-icon name="gamepad" />
          學習風格小遊戲
        </q-item>

        <q-separator />

        <q-item class="big" href="https://www.alearn.org.tw" target="_blank">
          <q-icon name="school" />
          自主學習促進會
        </q-item>
        <q-item
          class="big"
          href="https://www.github.com/3dw/diverse"
          target="_blank"
        >
          <q-icon name="code" />
          本站為開源專案
        </q-item>
      </q-list>
    </q-drawer>

    <q-dialog v-model="showQrCode">
      <q-card class="q-pa-md" style="text-align: center">
        <q-card-section>
          <div class="text-h6">掃描 QR Code 開啟本站</div>
        </q-card-section>
        <q-card-section>
          <vue-qr :text="siteUrl" :size="300" :margin="10" />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="關閉" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view :qs="qs" @closeDrawer="closeDrawer" />
    </q-page-container>

    <q-footer class="print-hide bg-grey-2 text-grey-7">
      <div
        style="
          text-align: center;
          padding: 12px 16px;
          font-size: 13px;
          line-height: 1.6;
        "
      >
        <span>本站所有內容以</span>
        <a
          href="https://creativecommons.org/publicdomain/zero/1.0/deed.zh-hant"
          target="_blank"
          rel="noopener noreferrer"
          style="color: #1976d2; text-decoration: none; font-weight: bold"
          >CC0 公共領域貢獻宣告</a
        >
        <span>釋出，您可以自由使用。</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import VueQr from 'vue-qr';

export default {
  name: 'MainLayout',
  components: { VueQr },
  data() {
    return {
      leftDrawerOpen: false,
      showQrCode: false,
      siteUrl: 'https://diverse.tw',
      qs: [
        {
          t: '你拿到一款從來沒玩過的桌遊，你比較喜歡怎麼學規則？',
          cs: [
            '自己讀規則書',
            '直接開始玩，邊玩邊學',
            '看盒子上或說明書裡的圖解',
            '請別人口頭解釋給你聽',
          ],
          checked: [false, false, false, false],
          rs: ['r', 'k', 'v', 'a'],
        },
        {
          t: '你要學做一道新料理（例如煎蛋或做三明治），你會：',
          cs: [
            '直接動手試試看',
            '先讀食譜的文字步驟',
            '看食譜上的步驟圖片',
            '請家人或朋友口頭告訴你怎麼做',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'r', 'v', 'a'],
        },
        {
          t: '親戚第一次來你家，想了解附近有什麼好玩的地方，你會：',
          cs: [
            '帶他們到附近實際走一圈',
            '給他們看附近的地圖或照片',
            '寫一份附近景點介紹給他們',
            '口頭跟他們說有哪些好去處',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'v', 'r', 'a'],
        },
        {
          t: '你喜歡的手機遊戲，最好要有：',
          cs: [
            '很多可以動手操作的互動關卡',
            '生動的配音和語音提示',
            '詳細的文字說明和攻略',
            '精美的畫面和漂亮的視覺效果',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'a', 'r', 'v'],
        },
        {
          t: '你想幫家人準備一個生日驚喜，你會：',
          cs: [
            '問朋友或其他家人有什麼好點子',
            '根據自己的感覺直接開始準備',
            '上網看別人做過什麼驚喜的照片或影片',
            '查網路文章找各種慶生創意',
          ],
          checked: [false, false, false, false],
          rs: ['a', 'k', 'v', 'r'],
        },
        {
          t: '你要選一件新衣服，除了價格外，什麼最影響你的決定？',
          cs: [
            '顏色和款式好不好看',
            '標籤上的材質說明',
            '朋友或店員的推薦意見',
            '穿上去的感覺舒不舒服',
          ],
          checked: [false, false, false, false],
          rs: ['v', 'r', 'a', 'k'],
        },
        {
          t: '你在超商看到一款從沒試過的新口味零食，你會怎麼決定買不買？',
          cs: [
            '看包裝上的文字說明和成份',
            '問旁邊的朋友或家人好不好吃',
            '直接買來嚐嚐看',
            '看包裝的圖片和外觀設計',
          ],
          checked: [false, false, false, false],
          rs: ['r', 'a', 'k', 'v'],
        },
        {
          t: '朋友第一次來你家，你要告訴他怎麼走，你會：',
          cs: [
            '直接去路口等他、接他',
            '傳訊息寫出一步一步怎麼走',
            '打電話邊說邊帶他走過來',
            '傳地圖截圖給他',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'r', 'a', 'v'],
        },
        {
          t: '你剛拿到一個新玩具或新設備（例如遙控車或相機），你想搞清楚怎麼用，你喜歡：',
          cs: [
            '先讀說明書的文字說明',
            '直接按按看，邊摸索邊學',
            '看說明書上的圖解',
            '請別人講給你聽，或看有人說明的影片',
          ],
          checked: [false, false, false, false],
          rs: ['r', 'k', 'v', 'a'],
        },
        {
          t: '你要選一部電影或影集來看，除了類型外，什麼最影響你的選擇？',
          cs: [
            '朋友大力推薦',
            '閱讀劇情介紹和評分',
            '之前看過類似的，感覺不錯',
            '海報和預告片的畫面很吸引人',
          ],
          checked: [false, false, false, false],
          rs: ['a', 'r', 'k', 'v'],
        },
        {
          t: '你要向班上同學介紹你的暑假見聞，你會：',
          cs: [
            '帶東西來讓大家摸或試玩',
            '生動地口頭說故事給大家聽',
            '準備文字說明讓大家閱讀',
            '展示照片或影片給大家看',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'a', 'r', 'v'],
        },
        {
          t: '你明天要在班上做一個三分鐘的口頭報告，你如何準備？',
          cs: [
            '大聲練習說幾次，記住口頭重點',
            '帶東西去讓大家親眼看或親手摸',
            '製作圖片或簡報輔助展示',
            '寫好完整的講稿，熟讀後再說',
          ],
          checked: [false, false, false, false],
          rs: ['a', 'k', 'v', 'r'],
        },
        {
          t: '你的手機壞掉了，去維修店，你希望店員怎麼告訴你問題在哪？',
          cs: [
            '讓你自己按按看，直接感受哪裡有問題',
            '用圖示或螢幕截圖指給你看',
            '口頭向你解釋問題和修法',
            '給你一張說明單子讓你帶回去讀',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'v', 'a', 'r'],
        },
        {
          t: '你參加一個興趣社團（例如科學社、美術社），你最喜歡哪種活動方式？',
          cs: [
            '親手操作，做實驗或動手創作',
            '大家一起討論和分享想法',
            '看精彩的影片或圖片示範',
            '讀相關書籍或資料自己研究',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'a', 'v', 'r'],
        },
        {
          t: '你突然想不起一首歌的歌名，只記得個大概，你會：',
          cs: [
            '試著把旋律哼出來，或用手打節奏',
            '試著在腦中回想歌詞或MV的畫面',
            '上網打關鍵字搜尋',
            '哼給朋友聽，看他知不知道',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'v', 'r', 'a'],
        },
        {
          t: '你做完這份測驗，你最希望用什麼方式看到你的結果？',
          cs: [
            '用你答過的題目舉例，說明你的傾向',
            '用詳細的文字說明你的風格特質',
            '有人口頭向你解說你的結果',
            '用圖表顯示你各方面的得分',
          ],
          checked: [false, false, false, false],
          rs: ['k', 'r', 'a', 'v'],
        },
      ],
    };
  },
  methods: {
    closeDrawer() {
      this.leftDrawerOpen = false;
    },
  },
};
</script>

<style type="text/css">
.big {
  font-size: 22px;
}
</style>
