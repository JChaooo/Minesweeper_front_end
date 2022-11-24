<template>
  <div id="mainCom">
    <router-view></router-view>
  </div>
</template>

<script>

import router from "@/router";

export default {
  name: "MainCom",
  created() {
    router.push("/dialog")
  },
  components: {
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