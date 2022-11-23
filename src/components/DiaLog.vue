<template>
  <div id="diaLog" v-if="isClose">
    <div class="diaLogCard">
      <p class="diaLogText">你最好真的是<br> IKun</p>
      <button class="joinBut" @click="closeDiaLog">开始练习</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiaLog",
  data() {
    return {
      isClose:true
    }
  },
  methods:{
    closeDiaLog(){
        this.isClose=false
    }
  }
}
</script>

<style scoped>
#diaLog {
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

.diaLogCard {
  margin: 0 auto;
  width: 20vw;
  height: 15vw;
  background-color: #ffa4c459;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.diaLogText{
  color: #00b1f5;
  font-size: 2rem;
  font-weight: bolder;
}
.joinBut{
  margin: 0 auto;
  width: 7rem;
  height: 3rem;
  background-color: #3e3ee5;
  color: white;
  border: none;
  font-weight: bolder;
  border-radius: .5rem;
  transition: .5s;
}
.joinBut:hover{
  background-color: #e83333;
}
</style>