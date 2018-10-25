<template>
  <!-- 已分期--企业详情 -->
  <div class="a_detail_c">
    <div class="top">
      <p>
        <span style="visibility: hidden">保费总计：{{ data.countnum }}</span>
        <button @click="payDetail">付款详情</button>
      </p>
      <div class="tabline">
        <div><img src="../../assets/img/clock_time.png" alt="">保费总计:{{ data.countnum }}</div>
        <div><img src="../../assets/img/bagP.png" alt="">首期总计:{{ data.firstpaynum }}</div>
        <div><img src="../../assets/img/order_msg.png" alt="">渠道总计:{{ data.channelpaynum }}</div>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 1127px;margin: 0 auto;" >
        <el-table-column prop="carvin" label="车架号" width="180" align="center"></el-table-column>
        <el-table-column prop="nameplate" label="车辆合格证/车牌号" width="180" align="center"></el-table-column>
        <el-table-column prop="commercial" label="商业险" align="center"></el-table-column>
        <el-table-column prop="cartaffic" label="交强险" align="center"></el-table-column>
        <el-table-column prop="carboat" label="车船税" align="center"></el-table-column>
        <el-table-column prop="age" label="保单" align="center"></el-table-column>
        <el-table-column prop="stages" label="月付期数" align="center"></el-table-column>
        <!-- <el-table-column prop="stages" label="期数" align="center"></el-table-column>
        <el-table-column prop="stages" label="本期待还" align="center"></el-table-column> -->
      </el-table>
    </div>
    <!-- 客户基本信息 -->
    <div class="basic">
      <div class="tit">
        <img src="../../assets/img/user_basic_info.png" alt="">
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
        <el-form-item label="企业名称：" prop="companyName">
          <el-input v-model="ruleForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名：" prop="legalPersonName">
          <el-input v-model="ruleForm.legalPersonName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="companyTel">
          <el-input v-model="ruleForm.companyTel"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 图片信息 -->
    <div class="pic">
      <div class="tit">
        <img src="../../assets/img/img_info.png" alt="">
      </div>
      <PicShow :imgList="ruleForm" :from="'企业待审核'"/>
    </div>
    <div class="btn">
      <button class="save" @click="$router.go(-1)">确定</button>
      <span style="padding: 0 115px;"></span>
      <button @click="$router.go(-1)">返回</button>
    </div>
    <!-- 分期详情 -->
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="915px">
      <template>
        <div class="header">
          <h2>
            <img src="../../assets/img/order_msg.png" alt="">
            <span>分期详情</span>
          </h2>
          <span>公司：{{ ruleForm.legalPersonName }}</span>
          <span>分期金额：{{ data.countnum }}</span>
          <span v-if="tableData.length > 0">分期期数：{{ tableData[0].stages }}</span>
          <button v-if="tableData.length > 0">{{ tableData[0].age | upToCase }}年期</button>
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
          <li>还款状态</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2" style="color:#2E92FF;">待还款</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">已还款</span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PicShow from '../common/PicShow'
export default {
  name: 'ADetailC',
  data () {
    return {
      ruleForm: {
        name: '',
        peoplename: '',
        phone: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        peoplename: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      tableData: [],
      error: '',
      dialogFormVisible: false,
      data: {},
      detailList: []
    }
  },
  mounted () {
    this.getData()
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    payDetail () {
      this.$fetch('/fd/insure/selectStagesDetail', {
        orderId: this.data.orderId
      }).then(res => {
        if (res.code === 0) {
          this.detailList = res.data
          this.dialogFormVisible = true
        }
      })
    },
    getData () {
      // /ad/insure/select
      this.$fetch('/fd/insure/selectDetail', {
        id: this.$route.query.id,
        batch: this.$route.query.batch,
        type: '2'
      }).then(res => {
        // console.log(res.data)
        this.data = res.data.result.order
        this.tableData = res.data.result.obj
        if (res.data.result.error) {
          this.error = res.data.result.error[0].errorMsg
        }
        this.ruleForm = res.data.result.company
      })
    }
  },
  components: {
    PicShow
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '.' + zero(date.getMonth() + 1) + '.' + zero(date.getDate())
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

<style lang="less" scoped>
.a_detail_c {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 99999;
  .top {
    width:1200px;
    height: 173px;
    margin: 0 auto;
    p {
      // width:186px;
      // height:21px;
      line-height: 70px;
      font-size:20px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(68,123,237,1);
      button {
        width:119px;
        height:36px;
        line-height:36px;
        border:1px solid rgba(75,134,255,1);
        border-radius:16px;
        float: right;
        margin-top: 20px;
        background: #fff;
        font-size:20px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(75,134,255,1);
      }
    }
    .tabline {
      width:1200px;
      height:50px;
      line-height:50px;
      background:rgba(243,247,255,1);
      border:1px solid rgba(68,123,237,1);
      opacity: 0.98;
      border-radius:5px;
      font-size: 16px;
      // margin: 0 auto;
      color: #447BED;
      display: flex;
      justify-content: space-around;
      img {
        vertical-align: middle;
        padding-right: 10px;
      }
    }
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 13px;
  }
  .table {
    padding: 33px 0 50px;
    border-bottom: 10px solid #E0E0E0;
    table {
      border-collapse: collapse;
      margin: 0 auto;
      width: 1240px;
      tr {
        background: #4B86FF;
        line-height: 46px;
        color: #fff;
        text-align: center;
      }
    }
    .errormsg {
      width:1062px;
      height:60px;
      background:rgba(243,247,255,1);
      border:1px solid rgba(68,123,237,1);
      border-radius:5px;
      margin: 0 auto 40px;
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,150,0,1);
      text-align: center;
      line-height: 60px;
    }
  }
  .basic {
    width: 1080px;
    margin: 38px auto 0;
    .tit {
      margin-bottom: 10px;
    }
  }
  .pic {
    width: 1080px;
    margin: 20px auto 0;
  }
  .btn {
    text-align: center;
    padding-top: 50px;
    button {
      width: 210px;
      height: 57px;
      line-height: 57px;
      border: 0;
      border-radius: 57px;
      margin-bottom: 40px;
      font-size: 20px;
      font-family: PingFang-SC-Bold;
      font-weight: 600;
      color:#666;
      outline: none;
      background: #ccc;
      &.save {
        background: linear-gradient(left, #4e8fff, #5cc5ff);
        color: #fff;
      }
    }
  }
  .el-dialog {
    .el-input {
      width: 90%;
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      background:rgba(223,235,255,1);
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
        line-height:20px;
        background:rgba(255,255,255,1);
        border-radius:10px;
        color: #2E92FF;
        text-indent: 0;
      }
    }
    .stages {
      max-height: 400px;
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
    input {
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100px;
    }
    .code {
      background: #ccc;
      color: #fff;
    }
    .el-radio+.el-radio {
      margin: 0;
    }
  }
}
</style>
