<template>
  <div id="checkerBoardCom">
    <div class="leftOptions">
      <p class="optionsText">难度选择</p>
      <button @click="initMine(5)">半年</button>
      <button @click="initMine(10)">一年</button>
      <button @click="initMine(20)">一年半</button>
      <button @click="initMine(30)">两年</button>
      <button @click="initMine(40)">两年半</button>
    </div>
    <ChessCom :mine-index-arr="mineIndexArr" :flag="flag" :uncertain="uncertain" :com-key="comKey"></ChessCom>
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

export default {
  components: {
    ChessCom,
  },
  data() {
    return {
      mineIndexArr: [],
      flag: false,
      uncertain: false,
      comKey: 0
    }
  },
  name: "CheckerBoardCom",
  methods: {
    // 初始化地雷
    // mines:地雷的数量（5，10，20，30，40）
    initMine(mines) {
      // 动态改变传给子组件的key，方便刷新子组件
      this.comKey=mines;
      // 置空数组，弹出初始化数组时生成的空元素
      this.mineIndexArr = []
      let x, y = 0;
      for (let i = 0; i < mines; i++) {
        // 棋盘时20*20布局，坐标取0-19；
        x = Math.floor(Math.random() * 20);
        y = Math.floor(Math.random() * 20);
        this.mineIndexArr.push([x, y]);
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

.rightOptions > button {
  border-radius: 0 1rem 1rem 0;
}

.optionsText {
  color: #057ca9;
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 3vh;
}

button:hover {
  background-color: #e83333;
}
</style>