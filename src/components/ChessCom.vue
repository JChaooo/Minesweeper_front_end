<template>
  <div class="boardCard" :key="comKey">
    <!--    <div class="test" v-bind:key="index" v-for="(item,index) in checkerBoard*checkerBoard">-->
    <!--    </div>-->
    <div :id="index" class="defaultStyle" :key="index" v-for="(item,index) in  openChessArr" :class="showWhat(item)"
         @click="open(item,index)">
    </div>
  </div>
</template>

<script>
import jiJiao from '../static/audio/jijiao.mp3'
import ji from '../static/audio/ji.mp3'
// import liangNianBan from '../static/audio/liangnianban.mp3'
import niMenHuiLeTa from '../static/audio/nimenhuiletadeyisheng.mp3'
// import zhiYinNiTaiMei from '../static/audio/zhiyinnitaimei.mp3'
import niGanMa from '../static/audio/niganmahahayo.mp3'

export default {
  name: "ChessCom",
  props: {
    // 炸弹位置
    mineIndexArr: {
      type: Array,
      default: () => [[]]
    },
    // 标记用户是否选中插旗、问号
    flag: {
      type: Boolean,
      default: false
    },
    uncertain: {
      type: Boolean,
      default: false
    },
    comKey: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 棋盘大小
      checkerBoard: 20,
      // 原始数据，只包含普通棋子和炸弹（0和-1）
      chessArr: [[]],
      // 展示给用户的数据，包含所有信息（0，-1，1，2）
      openChessArr: new Array(400),
    }
  },
  methods: {
    // 初始化棋局
    // 0 代表未打开普通棋子，-1代表未打开炸弹，1代表已打开普通棋子，2代表已打开的炸弹
    initChess() {
      // 初始化二维数组
      this.chessArr = new Array(this.checkerBoard).fill(0).map(() =>
          new Array(this.checkerBoard).fill(0)
      )

      //把炸弹放到数组中
      let x, y;
      this.mineIndexArr.forEach((mine) => {
        x = mine[0];
        y = mine[1];
        this.chessArr[x][y] = -1
      })
      console.log("初始化后的棋局：", this.chessArr)

      // 更新渲染数据
      this.openChessArr = [];
      this.chessArr.forEach(chess => {
        chess.forEach(item => {
          this.openChessArr.push(item)
        })
      })
      this.$forceUpdate
      console.log("arr:", this.openChessArr)
    },
    // 动态的返回棋子的class
    showWhat(chess) {
      // 0 代表未打开普通棋子，-1代表未打开炸弹，1代表已打开普通棋子，2代表已打开的炸弹
      console.log("chess:", chess)
      if (chess === 1) {
        return 'open'
      } else if (chess === 0 || chess === -1) {
        return 'noOpen'
      } else if (chess === 2) {
        return 'mine'
      }
    },
    // 翻开棋子
    open(chess, index) {
      // 如果此时是用户的标记操作，则直接返回
      if (this.flag || this.uncertain) {
        if (this.flag) {
          // js动态修改class，拼接的class前面有一个空格，不然会和原本的类名接到一起产生错误
          document.getElementById(index).className += " flag"
          this.playAudio(jiJiao)
        }
        if (this.uncertain) {
          document.getElementById(index).className += " uncertain"
          this.playAudio(niGanMa)
        }
        return
      }

      // 改变棋子的翻开状态
      if (chess === 0) {
        this.openChessArr[index] = 1
        this.playAudio(ji)
      }
      if (chess === -1) {
        this.openChessArr[index] = 2
        this.playAudio(niMenHuiLeTa)
      }
    },
    playAudio(src) {
      const audio = new Audio(src);
      audio.play();
    }
  },
  watch: {
    // 监听mineIndexArr的变化，变化后执行函数
    mineIndexArr(newVal) {
      console.log("新值：", newVal)
      this.initChess();
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
  grid-template-columns: repeat(v-bind(checkerBoard), calc(30vw / v-bind(checkerBoard)));
  grid-template-rows:  repeat(v-bind(checkerBoard), calc(30vw / v-bind(checkerBoard)));
  padding-top: 5vw;
}

.defaultStyle {
  /*background-color: #d5b0bd8a;*/
  margin: 1px;
  border-radius: .2rem;
}

.noOpen, .open, .mine, .flag, .uncertain {
  background-size: cover;
  background-repeat: repeat-x;
  background-position: center;
}

.noOpen {
  background-color: #d5b0bd8a;
  background-image: url("../assets/lanqiu.png");
}

.open {
  background-color: #42b983;
}

.mine {
  background-color: #5858f8;
  background-image: url("../assets/ji.png");
}

.flag {
  background-image: url("../assets/qizi.png");
}

.uncertain {
  background-image: url("../assets/wenhao.png");
}
</style>