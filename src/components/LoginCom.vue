<template>
  <div id="loginCom" v-if="isClose">
    <div id="diaLog">
      <div class="loginCard">
        <p class="diaLogText">Ikun通行证</p>
        <input type="text" name="username" id="userName" v-model="user.userName">
        <input type="password" name="password" id="password" v-model="user.password">
        <button class="joinBut" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios"
import {api} from "@/request/http";

export default {
  name: "LoginCom",
  data() {
    return {
      isClose: true,
      user: {
        "id": "",
        "userName": "",
        "password": ""
      },
    }
  },
  methods: {
    closeLoginDiaLog() {
      this.isClose = false
    },
    login() {
      console.log(this.user.userName)
      console.log(this.user.password)
      this.user.id = -1
      console.log(JSON.stringify(this.user))
      api({
        method: 'post',
        url: '/api/login',
        data: this.user
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err);
      })

      this.closeLoginDiaLog()
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

.loginCard {
  margin: 0 auto;
  width: 20vw;
  height: 15vw;
  background-color: #ffa4c459;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.diaLogText {
  color: #00b1f5;
  font-size: 2rem;
  font-weight: bolder;
}

.joinBut {
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

.joinBut:hover {
  background-color: #e83333;
}

#userName, #password {
  width: 50%;
  height: 30px;
  margin: 0 auto;
  border-radius: .5rem;
  border: none;
  /*border-bottom: 1px solid rebeccapurple;*/
  padding: 0 5px 0 5px;
  color: #5858f8;
  caret: #5858f8;
  font-size: medium;
  font-weight: bolder;
  outline: none;
  background-color: #f4c1d1;
}

#userName {

}

#password {

}
</style>