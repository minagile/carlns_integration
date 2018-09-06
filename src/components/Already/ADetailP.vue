<template>
  <!-- 已分期--个人详情 -->
  <div class="a_detail_p">
    <!-- 已分期--个人详情 -->
    <div class="table">
      <div class="top" @mouseenter="isShowBox" @mouseleave="isShowBox2">
        <li>
          <img src="../../assets/img/calendar.png" />
          <span>还款期数：第二期</span>
        </li>
        <li>
          <img src="../../assets/img/money_package.png" />
          <span>本期待还：500</span>
        </li>
        <li>
          <img src="../../assets/img/clock_time.png" />
          <span>还款时间：2018.6.4</span>
        </li>
        <li>
          <img src="../../assets/img/order_msg.png" />
          <span>分期详情</span>
        </li>
        <div class="list" id="show">
          <header>
            <h2>
              <img src="../../assets/img/order_msg.png" alt="">
              <span>分期详情</span>
            </h2>
            <span>姓名：恶趣味</span>
            <span>车牌：请问</span>
            <span>分期金额：123</span>
            <span>分期期数：12</span>
            <button>一年期</button>
          </header>
          <div class="stages">
            <ul>
              <li>期数</li>
              <!-- <li v-for="(data, index) in data" :key="index">{{data.periods}}</li> -->
            </ul>
            <ul>
              <li>还款时间</li>
              <!-- <li v-for="(data, index) in data" :key="index">{{data.rtime | formateDate2}}</li> -->
            </ul>
            <ul>
              <li>还款金额</li>
              <!-- <li v-for="(data, index) in data" :key="index">{{data.rmoney}}</li> -->
            </ul>
            <ul>
              <li>还款状态</li>
              <!-- <li v-for="(data, index) in data" :key="index">{{data.status | statusFilter}}</li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ADetailP',
  data () {
    return {
    }
  },
  methods: {
    isShowBox (e) {
      document.getElementById('show').style.display = 'block'
    },
    isShowBox2 (e) {
      document.getElementById('show').style.display = 'none'
    }
  }
}
</script>

<style lang="less" scoped>
.a_detail_p {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 99999;
  .top {
    width:990px;
    padding: 0 10px;
    height: 60px;
    line-height:60px;
    background:rgba(243,247,255,1);
    border:1px solid rgba(68,123,237,1);
    opacity:0.98;
    border-radius:5px;
    margin: 44px auto 0;
    display: flex;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
    li {
      img {
        vertical-align:middle;
      }
      span {
        padding: 0 5px;
        font-size: 18px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(68,123,237,1);
      }
    }
    .list {
      position: absolute;
      width:100%;
      height:674px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(238,238,238,1);
      box-shadow:0px 5px 5px rgba(0,0,0,0.35);
      top: 61px;
      left: 0;
      display: none;
      header {
        width:100%;
        height:53px;
        line-height:53px;
        background:rgba(223,235,255,1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2 {
          padding-left: 10px;
          img {
            vertical-align: middle;
          }
          span {
            font-size:18px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(68,123,237,1);
          }
        }
        span {
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(68,123,237,1);
        }
        button {
          margin-right: 10px;
          width:50px;
          height:20px;
          background:rgba(255,255,255,1);
          border-radius:10px;
          color: #2E92FF;
        }
      }
      .stages {
        max-height: 600px;
        overflow-y: scroll;
        padding: 20px 0;
        ul {
          float: left;
          width: 25%;
          text-align: center;
          li {
            line-height: 40px;
            font-size: 14px;
            &:first-of-type {
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
