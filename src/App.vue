<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <MainCom></MainCom>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MainCom from "@/components/MainCom";

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MainCom
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
*{
  margin: 0;
  padding: 0;
}
</style>
