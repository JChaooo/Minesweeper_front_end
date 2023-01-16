<template>
  <div id="recordCom">
    <div class="records_title">
      <div class="date titleClass">游戏时间</div>
      <div class="mine_count titleClass">游戏难度</div>
      <div class="isWin titleClass">游戏胜负</div>
      <div class="action titleClass">操作</div>
    </div>
    <div v-for="(record,index) in recordArr()" :key="index" class="record">
      <div class="date">{{ record.date }}</div>
      <div class="mine_count">{{ getOption(record.mine_count) }}</div>
      <div class="isWin isWinSelf" :class="{winColor:record.is_win}">{{ record.is_win ? 'Win' : 'Lose' }}</div>
      <div class="action actionSelf" @click="deleteRecord(record.id,index)">删除</div>
    </div>
    <div class="test"></div>
  </div>
</template>

<script>

import {request} from "@/request/request";
import store from "@/store";

export default {
  name: "RecordCom",
  props: {
    themeColor: {
      type: String,
      default: '#f4c1d18f'
    }
  },
  created() {

  },
  data() {
    return {
      recordArr: () => {
        return store.state.records
      }
    }
  },
  methods: {
    getOption(mine_count) {
      if (mine_count <= 20) {
        return '半年'
      } else if (mine_count <= 30) {
        return '一年'
      } else if (mine_count <= 40) {
        return '一年半'
      } else if (mine_count <= 50) {
        return '两年'
      } else if (mine_count <= 60) {
        return '两年半'
      }
    },
    deleteRecord(id, index) {
      store.state.records.splice(index, 1)
      request.delRecord(id).then(res => {
        // alert("删除成功")
        console.log(res)
      }).catch(err => {
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
#recordCom {
  margin: 0 auto;
  width: 29vw;
  height: 85vh;
  background-color: v-bind(themeColor);
  border-radius: 1rem;
  padding: 2.5vw .5vw;
}

.records_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.record {
  margin-bottom: .3vw;
  border-radius: 5px;
  background-color: #f4c1d1;
  display: flex;
  justify-content: space-between;
  color: dimgray;
  font-weight: bold;
  height: 1.5vw;
}
.date,.mine_count,.isWin,.action{
  line-height: 1.5vw;
}
.date {
  flex: 2;
}

.mine_count {
  flex: 1;
}

.isWin {
  flex: 1;
}

.action {
  flex: 1;
}
.titleClass{
  color: #ffffff;
  font-weight: bold;
}
.isWinSelf {
  color: red;
  font-weight: bolder;
}

.actionSelf {
  color: #7878df;
}
.actionSelf:hover{
  cursor: pointer;
}

.winColor {
  color: #42b983;
}
</style>