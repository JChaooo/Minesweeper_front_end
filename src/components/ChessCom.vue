<template>
  <div class="boardCard">
    <div class="test" v-bind:key="index" v-for="(item,index) in 400">
      <!--      {{ index }}-->
    </div>
  </div>
</template>

<script>
export default {
  name: "ChessCom",
  data() {
    return {
      chessData: 20
    }
  }
}
</script>

<style scoped>
.boardCard {
  margin: 0 auto;
  width: 30vw;
  height: 45vw;
  background-color: #ffa4c459;
  border-radius: 1rem;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: space-around;*/
  display: grid;
  grid-template-columns: repeat(v-bind(chessData), calc(30vw / v-bind(chessData)));
  grid-template-rows:  repeat(v-bind(chessData), calc(30vw / v-bind(chessData)));
  padding-top: 5vw;
}

.test {
  background-color: #d5b0bd8a;
  margin: 1px;
  border-radius: .2rem;
}
</style>