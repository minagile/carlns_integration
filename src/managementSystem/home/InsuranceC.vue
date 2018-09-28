<template>
  <!-- 退保-企业 -->
  <div class="insurance_c">
    <header>
      <div class="tabline" @click="payDetail" v-show="$route.query.tuibao !== true">
        <li>本期待还总计：56236元</li>
        <li>还款期数：第2期</li>
        <li>还款时间：2018.6.4</li>
        <li>查看还款详情</li>
      </div>
      <el-table :data="tableData" style="width: 1127px;">
        <el-table-column prop="carvin" label="车架号" width="180" align="center"></el-table-column>
        <el-table-column prop="nameplate" label="车辆合格证/车牌号" width="180" align="center"></el-table-column>
        <el-table-column prop="commercial" label="商业险" align="center"></el-table-column>
        <el-table-column prop="cartaffic" label="交强险" align="center"></el-table-column>
        <el-table-column prop="carboat" label="车船税" align="center"></el-table-column>
        <el-table-column prop="age" label="保单" align="center"></el-table-column>
        <el-table-column prop="stages" label="月付期数" align="center"></el-table-column>
      </el-table>
    </header>
    <div class="con">
      <div class="box">
        <div class="tit">
          <img src="../../assets/mImg/usermsg.png" alt="">
        </div>
        <div class="msg">
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
            <!-- <el-form-item label="联系地址：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item> -->
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/user_msg.png" alt="">
        </div>
        <div class="pic">
          <PicShow :imgList="ruleForm" :from="'企业待审核'"/>
        </div>
        <div class="btn">
          <button class="p" @click="exit" v-show="$route.query.tuibao !== true">退保</button>
          <button class="p" v-show="$route.query.tuibao === true" @click="$router.go(-1)">确定</button>
          <button @click="$router.go(-1)">取消</button>
        </div>
      </div>
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
            <span v-if="data.stagesState !== 2">{{ data.stagesCutoff }}</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">{{ data.stagesCutoff }}</span>
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
            <button v-if="data.stagesState !== 2" class="sure" @click="changeStates(data.stagesId)">确定还款</button>
            <button v-if="data.stagesState === 2" style="color: #999999;">已还款</button>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PicShow from '../../components/common/PicShow'
export default {
  name: 'InsuranceC',
  data () {
    return {
      tableData: [],
      ruleForm: {
        companyName: '',
        legalPersonName: '',
        companyTel: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        peoplename: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      data: {},
      detailList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 确认付款并修改状态
    changeStates (id) {
      this.$confirm('是否确认还款', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/fd/insure/uploadStages', {stagesId: id}).then(res => {
          if (res.code === 0) {
            this.payDetail()
            this.$message({
              type: 'success',
              message: '还款成功!'
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确定还款'
        })
      })
    },
    // 付款详情
    payDetail () {
      this.$fetch('/fd/insure/selectStagesDetail', {
        orderId: this.data.orderId
      }).then(res => {
        if (res.code === 0) {
          // console.log(res.data)
          this.detailList = res.data
          this.dialogFormVisible = true
        }
      })
    },
    // 退保按钮
    exit () {
      this.$confirm('是否需要退保', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/ad/insure/surrender', {
          type: '2',
          id: this.$route.query.id,
          batch: this.$route.query.batch
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '退保成功!'
            })
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退保'
        })
      })
    },
    getData () {
      // /ad/insure/select
      this.$fetch('/ad/insure/select', {
        id: this.$route.query.id,
        batch: this.$route.query.batch,
        type: '2'
      }).then(res => {
        if (res.code === 0) {
          this.data = res.data.result.order
          this.tableData = res.data.result.obj
          this.ruleForm = res.data.result.company
        } else {
          this.$message(res.msg)
          this.$router.back(-1)
        }
      })
    }
  },
  components: {
    PicShow
  },
  deactivated () {
    this.$destroy()
  },
  filters: {
    upToCase (data) {
      if (data === 1) return '一'
      if (data === 3) return '三'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.insurance_c {
  padding: 0 20px 20px;
  background: #E0E0E0;
  header {
    min-height: 100px;
    background: #fff;
    margin-bottom: 10px;
    padding-top: 50px;
    .tabline {
      width:1164px;
      height:60px;
      line-height:60px;
      background:rgba(255,243,207,1);
      border:1px solid rgba(255,193,7,1);
      opacity:0.98;
      border-radius:5px;
      margin: 0 auto 73px;
      display: flex;
      justify-content: space-around;
      cursor: pointer;
      li {
        font-size:18px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(82,41,9,1);
      }
    }
    .el-table {
      margin: 0 auto;
      padding-bottom: 20px;
    }
  }
  .con {
    background: #fff;
    padding-top: 40px;
    .box {
      width: 1080px;
      margin: 0 auto;
      .msg {
        margin: 25px 0;
      }
    }
    .btn {
      text-align: center;
      padding-bottom: 138px;
      margin-top: 75px;
      button {
        width: 209px;
        height: 57px;
        border-radius: 57px;
        background: #ccc;
        font-size:18px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(122,122,122,1);
      }
      .p {
        background: #282828;
        color: #fff;
        margin-right: 300px;
      }
    }
  }
  .el-dialog {
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
