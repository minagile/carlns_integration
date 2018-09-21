<template>
  <!-- 首页 -->
  <div class="home_page">
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../assets/img/rc_1.png" alt="">
          <span>信息待审核</span>
          <i>4</i>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../assets/img/upload.png" alt="">
          <span>待上传信息</span>
          <i>4</i>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../assets/img/waitfq.png" alt="">
          <span>分期待付款</span>
          <i>4</i>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../assets/img/pag.png" alt="">
          <span>逾期款</span>
          <i>4</i>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../assets/img/time.png" alt="">
          <span>本月待还</span>
          <i>4</i>
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
              <el-button size="mini" type="primary" plain round @click="$router.push({name: 'DetailP', query: {id: o.id}})">付款</el-button>
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
              <el-button size="mini" type="primary" plain round>还款计划表</el-button>
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
  </div>
</template>

<script>
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
      list3: []
    }
  },
  mounted () {
    this.$fetch('/fd/index/countWork', {
      status: '1'
    }).then(res => {
      console.log(res)
      this.list1 = res
    })
    this.$fetch('/fd/index/countWork', {
      status: '2'
    }).then(res => {
      console.log(res)
      this.list2 = res
    })
    this.$fetch('/fd/index/countWork', {
      status: '3'
    }).then(res => {
      console.log(res)
      this.list3 = res
    })
  },
  methods: {
  },
  components: {
  },
  filters: {
    time (data) {
      return data.split(' ')[0].replace('-', '.').replace('-', '.')
    }
  }
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
}
</style>
