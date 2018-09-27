<template>
  <!-- 首页 -->
  <div class="home_page">
    <el-row :gutter="14">
      <el-col :span="4" v-for="(o, i) in msgList" :key="i">
        <div class="grid-content bg-purple">
          <img :src="o.imgSrc" alt="">
          <span>{{ o.text }}</span>
          <i v-if="msgNum.length > 0">{{ msgNum[i].newCount }}</i>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- 待审核 -->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <img src="../assets/img/lock.png" alt="">
            <span>待审核</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-d-arrow-right"></el-button>
          </div>
          <div v-for="(o, i) in list1" :key="i" class="text item">
            <p class="name">
              <span v-if="o.type === '1'">姓名：{{ o.name }}</span>
              <span v-if="o.type === '2'">企业：{{ o.name }}</span>
            </p>
            <p>
              <span v-if="o.car_type ===  1">车牌：{{ o.car_nameplate }}</span>
              <span v-if="o.car_type ===  2">批次：{{ o.car_batch }}</span>
              <span>分期金额：{{ o.insure_amount }}</span>
              <span>分期期数：{{ o.insure_stages }}</span>
              <span>时间：{{ o.create_time | time }}</span>
            </p>
          </div>
        </el-card>
      </el-col>

      <!-- 待付款 -->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <img src="../assets/img/sh.png" alt="">
            <span>待付款</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-d-arrow-right"></el-button>
          </div>
          <div v-for="(o, i) in list2" :key="i" class="text item">
            <p class="name">
              <span v-if="o.type === '1'">姓名：{{ o.name }}</span>
              <span v-if="o.type === '2'">企业：{{ o.name }}</span>
              <el-button v-if="o.type === '1'" size="mini" type="primary" plain round @click="$router.push({name: 'DetailP', query: {id: o.id}})">付款</el-button>
              <el-button v-if="o.type === '2'" size="mini" type="primary" plain round @click="$router.push({name: 'DetailC', query: {id: o.id, batch: o.car_batch}})">付款</el-button>
            </p>
            <p>
              <span v-if="o.car_type ===  1">车牌：{{ o.car_nameplate }}</span>
              <span v-if="o.car_type ===  2">批次：{{ o.car_batch }}</span>
              <span>分期金额：{{ o.insure_amount }}</span>
              <span>分期期数：{{ o.insure_stages }}</span>
              <span>时间：{{ o.create_time | time }}</span>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- 投保中 -->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <img src="../assets/img/fq-sf.png" alt="">
            <span>投保中</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-d-arrow-right"></el-button>
          </div>
          <div v-for="(o, i) in list3" :key="i" class="text item">
            <p class="name">
              <span v-if="o.type === '1'">姓名：{{ o.name }}</span>
              <span v-if="o.type === '2'">企业：{{ o.name }}</span>
              <el-button size="mini" type="primary" plain round @click="payDetail(o.order_id, o.id, o.type, o.car_batch)">还款计划表</el-button>
            </p>
            <p>
              <span v-if="o.car_type ===  1">车牌：{{ o.car_nameplate }}</span>
              <span v-if="o.car_type ===  2">批次：{{ o.car_batch }}</span>
              <span>分期金额：{{ o.insure_amount }}</span>
              <span>分期期数：{{ o.insure_stages }}</span>
              <span>时间：{{ o.create_time | time }}</span>
            </p>
          </div>
        </el-card>
      </el-col>

      <!-- 日程 -->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <img src="../assets/img/rc.png" alt="">
            <span>日程</span>
          </div>
          <vue-event-calendar :events="demoEvents"></vue-event-calendar>
        </el-card>
      </el-col>
    </el-row>

    <!-- 还款计划表 -->
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="915px">
      <template>
        <div class="header" v-if="data.obj">
          <h2>
            <!-- <img src="../../assets/img/order_msg.png" alt=""> -->
            <span>还款计划表</span>
          </h2>
          <span>公司：{{ data.company.companyName }}</span>
          <span>分期金额：{{ data.order.countnum }}</span>
          <span>分期期数：{{ data.obj[0].stages }}</span>
          <button>{{ data.obj[0].age | upToCase }}年期</button>
        </div>
      </template>
      <div class="stages">
        <ul>
          <li>期数</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">第{{ index + 1 }}期</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">第{{ index + 1 }}期</span>
          </li>
        </ul>
        <ul>
          <li>还款时间</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">{{ data.stagesCutoff | timeChange }}</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">{{ data.stagesCutoff | timeChange }}</span>
          </li>
        </ul>
        <ul>
          <li>还款金额</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">{{ data.stagesPrice }}</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">{{ data.stagesPrice }}</span>
          </li>
        </ul>
        <ul>
          <li>到账金额</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">{{ data.stagesPrice }}</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">{{ data.stagesPrice }}</span>
          </li>
        </ul>
        <ul>
          <li>还款状态</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2" >未还款</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">已还款</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import img1 from '../assets/img/rc_1.png'
import img2 from '../assets/img/upload.png'
import img3 from '../assets/img/waitfq.png'
import img4 from '../assets/img/pag.png'
import img5 from '../assets/img/time.png'
export default {
  name: 'HomePage',
  data () {
    return {
      demoEvents: [{
        date: '2018/9/15',
        title: 'eat',
        desc: 'longlonglong description'
      },
      {
        date: '2018/9/12',
        title: 'this is a title'
      }],
      list1: [],
      list2: [],
      list3: [],
      dialogFormVisible: false,
      detailList: [],
      data: {},
      msgList: [
        {
          imgSrc: img1,
          text: '信息待审核'
        },
        {
          imgSrc: img2,
          text: '待上传信息'
        },
        {
          imgSrc: img3,
          text: '分期待付款'
        },
        {
          imgSrc: img4,
          text: '逾期款'
        },
        {
          imgSrc: img5,
          text: '本月待还'
        }
      ],
      msgNum: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$fetch('/fd/index/selectCountByNewsFd').then(res => {
        // console.log(res)
        this.msgNum = res.data
      })
      this.$fetch('/fd/index/countWork', {
        status: '1'
      }).then(res => {
        // console.log(res)
        this.list1 = res
      })
      this.$fetch('/fd/index/countWork', {
        status: '2'
      }).then(res => {
        // console.log(res)
        this.list2 = res
      })
      this.$fetch('/fd/index/countWork', {
        status: '3'
      }).then(res => {
        // console.log(res)
        this.list3 = res
      })
    },
    // 付款计划表弹窗
    payDetail (id, did, type, batch) {
      // console.log(did)
      this.$fetch('/fd/insure/selectDetail', {
        id: did,
        batch: batch,
        type: type
      }).then(res => {
        // console.log(res.data)
        this.data = res.data.result
      })
      this.$fetch('/fd/insure/selectStagesDetail', {
        orderId: id
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.detailList = res.data
          this.dialogFormVisible = true
        } else {
          this.$message(res.msg)
        }
      })
    }
  },
  components: {
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '.' + zero(date.getMonth() + 1) + '.' + zero(date.getDate())
    },
    time (data) {
      return data.split(' ')[0].replace('-', '.').replace('-', '.')
    },
    upToCase (data) {
      if (data === 1) return '一'
      if (data === 3) return '三'
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home_page {
  .el-col-4 {
    width: 20%;
    .grid-content {
      border-radius: 10px;
      min-height: 36px;
      height: 93px;
      line-height: 93px;
      img {
        vertical-align: middle;
        margin-left: 5%;
        margin-right: 5%;
        width: 50px;
      }
      i {
        font-style: normal;
        // display: inline-block;
        width: 27px;
        height: 27px;
        line-height: 27px;
        background:rgba(255,193,7,1);
        border-radius:50%;
        color: #fff;
        text-align: center;
        margin-right: 6%;
        margin-top: 33px;
        float: right;
      }
    }
  }
  .el-row {
    margin-top: 23px;
    margin-bottom: 20px;
    margin-right: 13px !important;
    min-width: 1050px;
  }
  .el-col {
    border-radius: 10px;
  }
  .bg-purple-dark {
    background: #fff;
  }
  .bg-purple {
    background: #fff;
  }
  .grid-content {
    border-radius: 10px;
    min-height: 36px;
    height: 633px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-card {
    height: 633px;
    border-radius: 10px;
    img {
      vertical-align: middle;
    }
    button {
      color: #666;
    }
    .text {
      height: 80px;
      border-bottom: 1px solid rgba(236,236,236,1);
      padding-left: 30px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        background:rgba(135,180,255,0.15);
        p {
          span {
            color: #628EFF;
          }
        }
      }
      p {
        &.name {
          line-height: 50px;
          font-weight: 600;
          button {
            margin-top: 10px;
            height: 30px;
            background: #fff;
            border-color: #2E92FF;
          }
        }
        display: flex;
        padding-right: 20px;
        justify-content: space-between;
        line-height: 30px;
      }
    }
  }
  .el-dialog {
    z-index: 999999999;
    .el-input {
      width: 90%;
    }
    .el-form-item {
      button {
        background:rgba(255,255,255,1);
        border:1px solid rgba(238,238,238,1);
        border-radius:3px;
        color: #333333;
        margin: 0 16px;
      }
      button.active {
        border:1px solid rgba(40,40,40,1);
      }
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      background: #DFEBFF;
      color: #447BED;
      text-indent: 35px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        vertical-align:  middle;
        padding: 0 10px;
      }
      span {
        font-size: 18px;
      }
      h2 {
        padding-left: 10px;
        img {
          vertical-align: middle;
        }
        span {
          font-size:18px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:#2E92FF;
        }
      }
      span {
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:#2E92FF;
      }
      button {
        margin-right: 10px;
        width:50px;
        height:20px;
        background: #ffffff;;
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
        width: 20%;
        text-align: center;
        button {
          width:72px;
          height:26px;
          background:rgba(224,224,224,1);
          border-radius:13px;
          color: #666666;
        }
        .sure {
          width:72px;
          height:26px;
          background:rgba(40,40,40,1);
          border-radius:13px;
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
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
    .dialog-footer {
      text-align: center;
      .btn {
        width:85px;
        height:40px;
        border:1px solid rgba(0,0,0,1);
        border-radius:5px;
        color: #282828;
      }
      .button {
        width:85px;
        height:40px;
        background:rgba(40,40,40,1);
        border-radius:5px;
        color: #fff;
        margin-left: 160px;
      }
    }
  }
}
</style>
