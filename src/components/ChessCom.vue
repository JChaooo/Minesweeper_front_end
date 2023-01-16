<template>
  <div class="boardCard" :key="comKey">
    <div class="text">
      <div class="optionText">{{ difficulty }}<br>{{ result }}</div>
    </div>
    <div class="rows" v-for="(row,rowIndex) in openChessArr" :key="rowIndex">
      <div class="cols" v-for="(chess,colIndex) in row" :key="colIndex"
           :class="showWhat(chess)"
           @click="open(chess,rowIndex,colIndex)" :id="rowIndex+''+ colIndex">
        <p v-if="chess.isMine!==0&&chess.isMine!==-1&&chess.isOpen">{{ chess.isMine }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import jiJiao from '../static/audio/jijiao.mp3'
import ji from '../static/audio/ji.mp3'
import niMenHuiLeTa from '../static/audio/nimenhuiletadeyisheng.mp3'
import zhiYinNiTaiMei from '../static/audio/zhiyinnitaimei.mp3'
import niGanMa from '../static/audio/niganmahahayo.mp3'
import {request} from "@/request/request";
import store from "@/store";


const audio = new Audio();
Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

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
    // 是组件id，也是游戏难度（地雷数量）
    comKey: {
      type: Number,
      default: 0
    },
    themeColor: {
      type: String,
      default: '#f4c1d18f'
    },
    difficulty: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 棋盘大小
      checkerBoard: 20,
      // 原始数据，只包含普通棋子和炸弹（0和-1）
      chessArr: [[]],
      // 展示给用户的数据，包含所有信息（0，-1，1，2）
      openChessArr: [[]],
      mineIndexArr_No_Repeat: [[]],
      result: "",
      isWin: false
    }
  },
  methods: {
    // 保存游戏记录
    saveCheckerBoardData() {
      request.save({
        id: 0,
        user_id: store.state.user.id,
        date: new Date().Format("yyyy-MM-dd HH:mm:ss"),
        rows: this.checkerBoard,
        cols: this.checkerBoard,
        mine_count: this.comKey,
        mine_index: this.mineIndexArr_No_Repeat,
        is_win: this.isWin
      }).then((res) => {
        console.log("初始化棋盘返回的数据", res)
      }).catch((err) => {
        console.log("初始化棋盘出错", err);
      })
    },
    // 初始化棋局
    initChess() {
      // 初始化二维数组
      this.chessArr = new Array(this.checkerBoard).fill(0).map(() =>
          new Array(this.checkerBoard).fill(0)
      )

      //把炸弹放到数组中
      // 去除坐标重叠的炸弹，不然数字显示会有bug
      const removeRepeat = (arr) => {
        const obj = {};
        arr.forEach(item => !obj[item.toString()] && (obj[item.toString()] = item));
        return Object.values(obj);
      }
      this.mineIndexArr_No_Repeat = removeRepeat(this.mineIndexArr)
      let x, y;
      this.mineIndexArr_No_Repeat.forEach((mine) => {
        x = mine[0];
        y = mine[1];
        this.chessArr[x][y] = -1;

        let x_min = x > 0;
        let x_max = x < this.checkerBoard - 1;
        let y_min = y > 0;
        let y_max = y < this.checkerBoard - 1;
        let arr = this.chessArr;
        //初始化地雷周围的格子
        if (x_min && y_min && arr[x - 1][y - 1] !== -1) {
          arr[x - 1][y - 1] += 1;
        }
        if (x_min && arr[x - 1][y] !== -1) {
          arr[x - 1][y] += 1;
        }
        if (x_min && y_max && arr[x - 1][y + 1] !== -1) {
          arr[x - 1][y + 1] += 1;
        }
        if (y_min && arr[x][y - 1] !== -1) {
          arr[x][y - 1] += 1;
        }
        if (y_max && arr[x][y + 1] !== -1) {
          arr[x][y + 1] += 1;
        }
        if (x_max && y_min && arr[x + 1][y - 1] !== -1) {
          arr[x + 1][y - 1] += 1;
        }
        if (x_max && arr[x + 1][y] !== -1) {
          arr[x + 1][y] += 1;
        }
        if (x_max && y_max && arr[x + 1][y + 1] !== -1) {
          arr[x + 1][y + 1] += 1;
        }
      })

      // 初始化前台数组
      this.openChessArr = new Array(this.checkerBoard).fill(0).map(() =>
          new Array(this.checkerBoard).fill(0).map(() => new Object({isOpen: false, isMine: 0}))
      )
      this.chessArr.forEach((item, rowIndex) => {
        item.forEach((value, colIndex) => {
          this.openChessArr[rowIndex][colIndex].isMine = value
        })
      })
    },
    // 动态的返回棋子的class
    showWhat(chess) {
      if (chess.isOpen) {
        if (chess.isMine === -1) {
          return 'mine'
        }
        if (chess.isMine === 0) {
          return 'open'
        }
        return 'around_count'
      } else {
        return 'noOpen'
      }
    },
    // 翻开棋子
    open(chess, rowIndex, colIndex) {
      let chessId = rowIndex + '' + colIndex;
      // 如果此时是用户的标记操作，则直接返回
      if (this.flag || this.uncertain) {
        if (this.flag) {
          // js动态修改class，拼接的class前面有一个空格，不然会和原本的类名接到一起产生错误
          document.getElementById(chessId).className += " flag"
          this.playAudio(jiJiao)
        }
        if (this.uncertain) {
          document.getElementById(chessId).className += " uncertain"
          this.playAudio(niGanMa)
        }
        return
      }

      // 播放音效
      if (chess.isMine === -1) {
        this.playAudio(niMenHuiLeTa)
        this.openAll()
        this.result = "You lose!"
        this.isWin = false
        this.saveCheckerBoardData()
      } else {
        if (chess.isOpen) return;
        this.playAudio(ji)
        // 连级展开其他棋子
        this.oneByOne(rowIndex, colIndex)
        // 判断输赢
        this.calcWinOrLose()
      }
    },
    // 连级展开格子
    oneByOne(x, y) {
      let arr = this.openChessArr;
      let xLen = this.checkerBoard;
      let yLen = this.checkerBoard;
      if (x < 0 || x >= xLen || y < 0 || y >= yLen || arr[x][y]?.isOpen) {
        return
      } else {
        arr[x][y].isOpen = true
      }
      if (arr[x][y]?.isMine === 0) {
        this.oneByOne(x - 1, y)
        this.oneByOne(x, y - 1)
        this.oneByOne(x, y + 1)
        this.oneByOne(x + 1, y)
      }

    },
    playAudio(src) {
      audio.pause();
      audio.src = src
      audio.play();
    },
    // 计算输赢
    calcWinOrLose() {
      let count = 0;
      this.openChessArr.forEach(itemArr => {
        itemArr.forEach(item => {
          if (!item.isOpen) {
            count++;
          }
        })
      })
      if (count === this.mineIndexArr_No_Repeat.length) {
        this.result = "You Win!"
        this.isWin = true
        this.saveCheckerBoardData()
        this.playAudio(zhiYinNiTaiMei)
        this.openAll()
      }
    },
    // 分出胜负时展开所有格子
    openAll() {
      this.openChessArr.forEach((itemArr) => {
        itemArr.forEach(item => {
          item.isOpen = true
        })
      })
    }
  },
  watch: {
    // 监听mineIndexArr的变化，变化后执行函数
    mineIndexArr(newVal) {
      console.log("新值：", newVal)
      this.initChess();
    },
    comKey() {
      this.result = ''
    }
  }
}
</script>

<style scoped>
.boardCard {
  margin: 0 auto;
  width: 30vw;
  height: 85vh;
  background-color: v-bind(themeColor);
  border-radius: 1rem;
  padding-top: 2.5vw;
  padding-bottom: 2.5vw;
  /*border: 1px solid red;*/

}

.text {
  height: 15vh;
  font-weight: bolder;
  color: white;
}

.optionText {
  font-size: 3rem;
}

/*.grid {*/
/*  !*.rows {*!*/
/*  display: grid;*/
/*  grid-template-columns: repeat(v-bind(checkerBoard), calc(30vw / v-bind(checkerBoard)));*/
/*  !*grid-template-rows:  repeat(v-bind(checkerBoard), calc(30vw / v-bind(checkerBoard)));*!*/
/*}*/

.rows {
  display: flex;
}

.cols {
  width: 1.5vw;
  height: 1.5vw;
  margin: 1px;
  border-radius: .2rem;
  border: 1px solid white;
  text-align: center;
}

.cols p {
  color: wheat;
  line-height: 1.5vw;
  font-weight: bolder;
}

.noOpen, .open, .mine, .flag, .uncertain {
  background-size: cover;
  background-repeat: repeat-x;
  background-position: center;
}

.noOpen {
  background-color: v-bind(themeColor);
  /*background-image: url("../assets/lanqiu.png");*/
}

.open {
  background-color: rgba(150, 255, 174, 0.58);
}

.around_count {
  background-color: rgba(251, 58, 146, 0.05);
}

.mine {
  background-color: rgba(88, 88, 248, 0.58);
  background-image: url("../assets/ji.png");
}

.flag {
  background-image: url("../assets/qizi.png");
}

.uncertain {
  background-image: url("../assets/wenhao.png");
}
</style>