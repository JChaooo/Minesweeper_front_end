<template>
  <div id="checkerBoardCom">
    <div class="leftOptions">
      <p class="optionsText">难度选择</p>
      <button class="selectedBut1" @click="initMine(5)">半年</button>
      <button class="selectedBut2" @click="initMine(10)">一年</button>
      <button class="selectedBut3" @click="initMine(20)">一年半</button>
      <button class="selectedBut4" @click="initMine(30)">两年</button>
      <button class="selectedBut5" @click="initMine(40)">两年半</button>
    </div>
    <ChessCom :mine-index-arr="mineIndexArr" :flag="flag" :uncertain="uncertain" :com-key="comKey"
              :theme-color="themeColor" :difficulty="difficulty"></ChessCom>
    <div class="rightOptions">
      <p class="optionsText">⭐</p>
      <button>游戏记录</button>
      <button>规则说明</button>
      <button @click="changeFlag('flag')">🚩</button>
      <button @click="changeFlag('uncertain')">❓</button>
    </div>
  </div>
</template>

<script>
import ChessCom from "@/components/ChessCom";
import liangNianBan from '../static/audio/liangnianban.mp3'

export default {
  components: {
    ChessCom,
  },
  name: "CheckerBoardCom",
  data() {
    return {
      mineIndexArr: [],
      flag: false,
      uncertain: false,
      comKey: 0,
      butColor: {
        // but1: 'rgba(244,193,209,0.35)',
        // but2: 'rgba(223,249,251,0.35)',
        // but3: 'rgba(165,216,255,0.35)',
        // but4: 'rgba(255,243,191,0.35)',
        // but5: 'rgba(248,249,250,0.35)'
        but1: '#f4c1d18f',
        but2: 'rgba(201,207,193,0.56)',
        but3: 'rgba(162,210,226,0.56)',
        but4: 'rgba(234,216,154,0.56)',
        but5: 'rgba(139,163,199,0.56)'
      },
      themeColor: '#f4c1d18f',
      difficulty: '练习生🏀🐓请选择难度'
    }
  },
  methods: {
    // 初始化地雷
    // mines:地雷的数量（5，10，20，30，40）
    initMine(mines) {
      // 防止用户重复点击选择难度
      if (this.comKey === mines) {
        return
      }
      // 选中后切换样式
      switch (mines) {
        case 5: {
          this.themeColor = this.butColor.but1
          this.difficulty = "半年"
          break
        }
        case 10: {
          this.themeColor = this.butColor.but2
          this.difficulty = "一年"
          break
        }
        case 20: {
          this.themeColor = this.butColor.but3
          this.difficulty = "一年半"
          break
        }
        case 30: {
          this.themeColor = this.butColor.but4
          this.difficulty = "两年"
          break
        }
        case 40: {
          this.themeColor = this.butColor.but5
          this.difficulty = "两年半"
          break
        }
      }
      console.log("选择状态：", this.butColor)
      // 动态改变传给子组件的key，方便刷新子组件
      this.comKey = mines;
      // 置空数组，弹出初始化数组时生成的空元素
      this.mineIndexArr = []
      let x, y = 0;
      for (let i = 0; i < mines; i++) {
        // 棋盘时20*20布局，坐标取0-19；
        x = Math.floor(Math.random() * 20);
        y = Math.floor(Math.random() * 20);
        this.mineIndexArr.push([x, y]);
      }
      // 如果选的两年半难度，那么播放音效
      if (mines === 40) {
        const audio = new Audio(liangNianBan);
        audio.play();
      }
      console.log("生成的炸弹位置是：", this.mineIndexArr)
      // this.$emit("changeMines", this.mineIndexArr);
    },
    changeFlag(from) {
      if (from === 'flag') {
        this.flag = !this.flag
        this.uncertain = false
      }
      if (from === 'uncertain') {
        this.uncertain = !this.uncertain
        this.flag = false
      }
    }
  }
}
</script>

<style scoped>
#checkerBoardCom {
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
}

.leftOptions, .rightOptions {
  width: 5vw;
  height: 45vw;
}

.leftOptions {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

button {
  width: 100%;
  height: 5%;
  background-color: #f4c1d18f;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: bolder;
  /*border-radius: .5rem;*/
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  transition: .5s;
  margin: 1vh auto 0;
}

.selectedBut1 {
  background-color: v-bind(butColor.but1);
}

.selectedBut2 {
  background-color: v-bind(butColor.but2);
}

.selectedBut3 {
  background-color: v-bind(butColor.but3);
}

.selectedBut4 {
  background-color: v-bind(butColor.but4);
}

.selectedBut5 {
  background-color: v-bind(butColor.but5);
}

.rightOptions > button {
  border-radius: 0 1rem 1rem 0;
}

.optionsText {
  color: #00b9ff;
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 3vh;
}

button:hover {
  background-color: #e83333;
}
</style>