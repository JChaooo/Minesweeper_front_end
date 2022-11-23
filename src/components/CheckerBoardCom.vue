<template>
  <div id="checkerBoardCom">
    <div class="leftOptions">
      <p class="optionsText">难度选择</p>
      <button>半年</button>
      <button>一年</button>
      <button>一年半</button>
      <button>两年</button>
      <button>两年半</button>
    </div>
    <ChessCom></ChessCom>
    <div class="rightOptions">
      <p class="optionsText">⭐</p>
      <button>游戏记录</button>
      <button>规则说明</button>
      <button>🚩</button>
      <button>❓</button>
    </div>
  </div>
</template>

<script>
import ChessCom from "@/components/ChessCom";

export default {
  components: {
    ChessCom
  },
  name: "CheckerBoardCom"
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