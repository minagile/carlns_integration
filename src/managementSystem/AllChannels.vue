<template>
  <!-- 首页 -->
  <div class="all_channels">
    <div class="top" @mouseout="moveout($event)">
      <el-row :gutter="14">
        <el-col :span="4" v-for="(data, i) in list" :key="i" >
          <div class="grid-content bg-purple width" @mouseover="shiftIn(i)">
            <img :src="data.imgSrc" alt="">
            <span>{{ data.text }}</span>
            <i v-if="headerList.length > 0">{{ headerList[i].newCount }}</i>
          </div>
        </el-col>
      </el-row>

      <!-- 消息展示 -->
      <div class="move" id="move" v-show="moveShow" @mousemove="mousemove">
        <header>
          <img src="../assets/mImg/msg.png" alt="">
          <span>通知中心</span>
        </header>
        <p v-for="(o, i) in messageList" :key="i" @click="jump(o)">
          <a v-if="o.newState === 1" @click="statusChange(o.newId)"><span class="newsWidth">{{ o.newText }}</span><span>{{ o.createTime | time2 }}</span></a>
          <a v-if="o.newState === 2" style="color:#B6B6B6;"><span class="newsWidth">{{ o.newText }}</span><span>{{ o.createTime | time2 }}</span></a>
        </p>
      </div>
    </div>

    <el-row :gutter="20">
      <!-- 投保待审核 -->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <img src="../assets/img/lock.png" alt="">
            <span>投保待审核</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-d-arrow-right"></el-button>
          </div>
          <div class="list_scroll">
            <div v-for="(o, i) in list1" :key="i" class="text item">
              <p class="name">
                <span v-if="o.type === '1'">姓名：{{ o.name }}</span>
                <span v-if="o.type === '2'">企业：{{ o.name }}</span>
                <span v-if="o.type === '3'">渠道：{{ o.name }}</span>
                <el-button size="mini" type="primary" v-if="o.type === '2'" plain round @click="$router.push({name: 'AuditC', query: {batch: o.car_batch, id: o.id}})">通过审核</el-button>
                <el-button size="mini" type="primary" v-if="o.type === '1'" plain round @click="$router.push({name: 'AuditP', query: {id: o.id}})">通过审核</el-button>
              </p>
              <p v-if="o.type !== '3'">
                <span v-if="o.type ===  '1'">
                  <span v-if="o.car_type === 2">车牌：{{ o.car_nameplate }}</span>
                  <span v-if="o.car_type === 1">车架号：{{ o.car_nameplate }}</span>
                </span>
                <span v-if="o.type ===  '2'">批次：{{ o.car_batch }}</span>
                <span>分期金额：{{ o.insure_amount }}</span>
                <span>分期期数：{{ o.insure_stages }}</span>
                <span>时间：{{ o.create_time }}</span>
              </p>
              <p v-if="o.type === '3'">
                <span>法人姓名：{{ o.user_name }}</span>
                <span>联系方式：{{ o.user_phone }}</span>
                <span>时间：{{ o.create_time }}</span>
              </p>
            </div>
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
          <div class="list_scroll">
            <div v-for="(o, i) in list2" :key="i" class="text item">
              <p class="name">
                <span v-if="o.type === '1'">姓名：{{ o.name }}</span>
                <span v-if="o.type === '2'">企业：{{ o.name }}</span>
                <el-button size="mini" type="primary" plain round v-if="o.type === '1'" @click="$router.push({name: 'ObligationsP', query: {id: o.id}})">确认付款</el-button>
                <el-button size="mini" type="primary" plain round v-if="o.type === '2'" @click="$router.push({name: 'ObligationsC', query: {batch: o.car_batch, id: o.id}})">确认付款</el-button>
              </p>
              <p>
                <span v-if="o.type ===  '1'">
                  <span v-if="o.car_type === 2">车牌：{{ o.car_nameplate }}</span>
                  <span v-if="o.car_type === 1">车架号：{{ o.car_nameplate }}</span>
                </span>
                <span v-if="o.type ===  '2'">批次：{{ o.car_batch }}</span>
                <span>分期金额：{{ o.insure_amount }}</span>
                <span>分期期数：{{ o.insure_stages }}</span>
                <span>时间：{{ o.create_time | time }}</span>
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- 已承保 -->
      <el-col :span="12">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <img src="../assets/img/fq-sf.png" alt="">
            <span>已承保</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-d-arrow-right"></el-button>
          </div>
          <div class="list_scroll">
            <div v-for="(o, i) in list3" :key="i" class="text item">
              <p class="name">
                <span v-if="o.type === '1'">姓名：{{ o.name }}</span>
                <span v-if="o.type === '2'">企业：{{ o.name }}</span>
                <el-button size="mini" type="primary" plain round @click="payDetail(o.order_id)">还款计划表</el-button>
              </p>
              <p>
                <span v-if="o.type ===  '1'">
                  <span v-if="o.car_type === 2">车牌：{{ o.car_nameplate }}</span>
                  <span v-if="o.car_type === 1">车架号：{{ o.car_nameplate }}</span>
                </span>
                <span v-if="o.type ===  '2'">批次：{{ o.car_batch }}</span>
                <span>分期金额：{{ o.insure_amount }}</span>
                <span>分期期数：{{ o.insure_stages }}</span>
                <span>时间：{{ o.create_time | time }}</span>
              </p>
            </div>
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
          <vue-event-calendar :events="demoEvents" @month-changed="changedMonth($event)"></vue-event-calendar>
        </el-card>
      </el-col>
    </el-row>

    <!-- 还款计划表 -->
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="915px">
      <template>
        <div class="header">
          <h2>
            <span>还款计划表</span>
          </h2>
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
        <!-- <ul>
          <li>到账金额</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">{{ data.stagesPrice }}</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">{{ data.stagesPrice }}</span>
          </li>
        </ul> -->
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
  name: 'AllChannels',
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
      headerList: [],
      list: [
        {
          imgSrc: img1,
          text: '渠道待审核'
        },
        {
          imgSrc: img2,
          text: '企业待分期'
        },
        {
          imgSrc: img3,
          text: '个人待分期'
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
      data: 0,
      messageList: [],
      moveShow: false,
      dialogFormVisible: false,
      detailList: []
    }
  },
  mounted () {
    this.getData(this.channelId)
    this.changedMonth(new Date().getMonth() + '/' + new Date().getFullYear())
    // console.log(this.search)
  },
  deactivated () {
    this.$destroy()
  },
  watch: {
    channelId (val) {
      this.getData(val)
    },
    address (val) {
      this.address = val
      // console.log(val)
      this.getData()
    },
    search (val) {
      this.search = val
      // console.log(val)
      this.getData()
    }
  },
  methods: {
    // 日程
    changedMonth (e) {
      this.$fetch('/ad/report/showSchedule', {
        'datetime': e,
        'channelId': this.channelId
      }).then(res => {
        this.demoEvents = res.data
      })
    },
    // 消息跳转
    jump (o, i) {
      // console.log(o, this.data)
      if (this.data === 0) {
        this.$router.push({name: 'ChannelDetail', query: {id: o.channelId, look: 1}})
      } else if (this.data === 1) {
        this.$router.push({name: 'ObligationsC', query: {id: o.companyId, batch: o.batch}})
      } else if (this.data === 2) {
        this.$router.push({name: 'ObligationsP', query: {id: o.customerId, msg: 1}})
      }
    },
    // 付款计划表弹窗
    payDetail (id) {
      this.$fetch('/ad/insure/selectStagesDetail', {
        orderId: id
      }).then(res => {
        if (res.code === 0) {
          this.detailList = res.data
          this.dialogFormVisible = true
        } else {
          this.$message(res.msg)
        }
      })
    },
    // 修改消息状态 已读未读
    statusChange (id) {
      this.$post('/ad/news/changeNews', {newId: id}).then(res => {})
    },
    mousemove () {
      this.moveShow = true
    },
    moveout (e) {
      this.moveShow = false
    },
    // 鼠标移入通知中心展示
    shiftIn (e) {
      let permissionData = JSON.parse(sessionStorage.getItem('permission'))
      permissionData.forEach(v => {
        if (v === '渠道待审核') {
          if (e === 0) this.moveShow = true
        }
        if (v === '待上传信息') {
          if (e === 1) this.moveShow = true
        }
        if (v === '分期待付款') {
          if (e === 2) this.moveShow = true
        }
        if (v === '逾期款') {
          if (e === 3) this.moveShow = true
        }
        if (v === '本月待还') {
          if (e === 4) this.moveShow = true
        }
      })
      if (this.data !== e) {
        this.data = e
        if (this.data === 4) {
          document.getElementById('move').style.left = document.body.clientWidth - 621 + 'px'
        } else {
          document.getElementById('move').style.left = 20 + (document.body.clientWidth - 40) / 5 * e + 'px'
        }
        this.$fetch('/ad/news/selectNewAdByType', {
          newsType: this.data + 1
        }).then(res => {
          this.messageList = res.data
        })
      } else if (e === 0) {
        this.$fetch('/ad/news/selectNewAdByType', {
          newsType: 1
        }).then(res => {
          this.messageList = res.data
        })
      }
    },
    getData (data) {
      // 待审核
      // this.$fetch('/ad/index/countWorkAdAudit', {
      //   'channelId': data
      // }).then(res => {
      //   this.list1 = res
      //   if (res.code === 101) {
      //     this.$message({
      //       message: res.msg,
      //       type: 'info'
      //     })
      //   }
      // })
      this.$fetch('/ad/index/countWork', {
        'status': '1',
        'channelId': data,
        'address': this.address,
        'search': this.search
      }).then(res => {
        this.list1 = res
        if (res.code === 101) {
          this.$message({
            message: res.msg,
            type: 'info'
          })
        }
      })
      // 待付款
      this.$fetch('/ad/index/countWork', {
        'status': '2',
        'channelId': data,
        'address': this.address,
        'search': this.search
      }).then(res => {
        this.list2 = res
        if (res.code === 101) {
          this.$message({
            message: res.msg,
            type: 'info'
          })
        }
      })
      // 投保中
      this.$fetch('/ad/index/countWork', {
        'status': '3',
        'channelId': data,
        'address': this.address,
        'search': this.search
      }).then(res => {
        this.list3 = res
        if (res.code === 101) {
          this.$message({
            message: res.msg,
            type: 'info'
          })
        }
      })
      // 消息
      this.$fetch('/ad/news/selectCountByNewType').then(res => {
        this.headerList = res.data
      })
    }
  },
  components: {
  },
  props: {
    channelId: {
      type: String,
      default () {
        return '1'
      }
    },
    address: {
      type: String,
      default () {
        return ''
      }
    },
    search: {
      type: String,
      default () {
        return ''
      }
    }
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '.' + zero(date.getMonth() + 1) + '.' + zero(date.getDate())
    },
    time (data) {
      return data.split(' ')[0].replace('-', '.').replace('-', '.')
    },
    time2 (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate()) + ' ' + date.getHours() + ':' + zero(date.getMinutes())
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
.all_channels {
  background: #E0E0E0;
  padding-bottom: 10px;
  .list_scroll {
    height: 575px;
    overflow: scroll;
  }
  .el-col-4 {
    width: 20%;
    cursor: pointer;
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
    margin-left: 13px !important;
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
        // background:rgba(135,180,255,0.15);
        p {
          span {
            color: #5E93FF;
          }
        }
      }
      p {
        &.name {
          line-height: 50px;
          color: #000;
          // font-weight: 600;
          button {
            margin-top: 10px;
            height: 30px;
            background: #fff;
            border-color: #4B86FF;
            color: #4B86FF;
          }
        }
        display: flex;
        padding-right: 20px;
        justify-content: space-between;
        line-height: 30px;
        color: #666;
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
      background: #FFC107;
      color: #282828;
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
          color:#61432D;
        }
      }
      span {
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:#61432D;
      }
      button {
        margin-right: 10px;
        width:50px;
        height:20px;
        background:rgba(40,40,40,1);
        border-radius:10px;
        color: #fff;
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
.all_channels .top {
  position: relative;
  .move {
    position: absolute;
    width:621px;
    height:323px;
    background:rgba(255,255,255,1);
    border-radius:5px;
    box-shadow:5px 10px 6px rgba(0,0,0,0.11);
    z-index: 9999;
    top: 94px;
    left: 20px;
    line-height: 65px;
    overflow: auto;
    header {
      height: 65px;
      border-bottom: 1px solid #E6E6E6;
      img {
        vertical-align: middle;
        padding: 0 10px;
      }
    }
    p {
      height: 65px;
      border-bottom: 1px solid #E6E6E6;
      color: #333;
      text-indent: 34px;
      cursor: pointer;
      .newsWidth {
        display: block;
        float: left;
        width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      span {
        float: right;
        padding-right: 11px;
      }
      &:hover {
        background: #FFC107;
      }
    }
  }
}
</style>
