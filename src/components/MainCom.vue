<template>
  <div id="mainCom">
    <DiaLog></DiaLog>
    <LoginCom></LoginCom>
    <CheckerBoardCom></CheckerBoardCom>
  </div>
</template>

<script>
import DiaLog from "@/components/DiaLog";
import LoginCom from "@/components/LoginCom";
import CheckerBoardCom from "@/components/CheckerBoardCom";

export default {
  name: "MainCom",
  components: {
    DiaLog,
    LoginCom,
    CheckerBoardCom
  }
}
</script>

<style scoped>
#mainCom {
  width: 100vw;
  height: 100vh;
  background-color: #2c3e50;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-repeat: repeat-x;
  background-position: center;
}
</style>