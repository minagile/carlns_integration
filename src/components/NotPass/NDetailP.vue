<template>
  <!-- 未通过--个人详情 -->
  <div class="n_detail_p">
    <!-- 未通过--个人详情 -->
    <div class="no-through">
      <div v-if="data.error">{{ data.error[0].errorMsg }}</div>
    </div>
    <div class="zujian">
      <PersonDetail :tableList="data"/>
    </div>
    <div class="btn">
      <button class="save" @click="$router.go(-1)">确定</button>
      <span style="padding: 0 115px;"></span>
      <button @click="$router.go(-1)">返回</button>
    </div>
    <!-- 支付弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="713px">
      <template>
        <div class="header">
          <span>支付信息</span>
        </div>
      </template>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item label="姓名：" prop="customerName" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.customerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="customerIdcard" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.customerIdcard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="card" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.card" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="customerPhone" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.customerPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="code" :label-width="formLabelWidth">
          <template>
            <input v-model="ruleForm.code">
            <el-button class="code" @click="getCode">获取验证码<span v-show="second">{{count}}s</span></el-button>
            <el-radio v-model="ruleForm.code" label="1">《车险服务协议》</el-radio>
            <el-radio label="2">《代扣授权协议》</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pay">确认支付</el-button>
        <el-button @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PersonDetail from '../common/PersonDetail'
export default {
  name: 'NDetailP',
  data () {
    return {
      dialogFormVisible: false,
      ruleForm: {
        customerName: '',
        customerIdcard: '',
        customerPhone: '',
        card: '',
        code: ''
      },
      rules: {
        customerName: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        customerIdcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        card: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请输入银行卡号', trigger: 'blur' }
        ],
        customerPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      formLabelWidth: '140px',
      count: 60,
      clock: '',
      second: false,
      data: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    isShowBox (e) {
      document.getElementById('show').style.display = 'block'
    },
    isShowBox2 (e) {
      document.getElementById('show').style.display = 'none'
    },
    getData () {
      this.$fetch('/fd/insure/selectDetail', {
        id: this.$route.query.id,
        type: 1
      }).then(res => {
        // console.log(res)
        this.data = res.data.result
        this.ruleForm = res.data.result.customer
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取验证码
    getCode () {
      if (this.second === false) {
        this.second = true
        this.countDown()
        this.$post('/fd/pay/verifyFirst', {
          orderId: this.data.order.orderId,
          name: this.ruleForm.customerName,
          idCard: this.ruleForm.customerIdcard,
          bankCard: this.ruleForm.card,
          phone: this.ruleForm.customerPhone
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$message({type: 'success', message: res.msg})
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 支付
    pay () {
      this.dialogFormVisible = false
      // this.$fetch('/fd/pay/firstPay', {
      //   orderId: this.data.order.orderId,
      //   code: this.ruleForm.code
      // }).then(res => {
      //   // console.log(res)
      //   if (res.code === 0) {
      //     this.$message({type: 'success', message: res.msg})
      //     this.$router.push({name: 'HomePage'})
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // })
    },
    // 倒计时
    countDown () {
      this.clock = window.setInterval(() => {
        this.count--
        if (this.count < 1) {
          clearInterval(this.clock)
          this.second = false
        }
      }, 1000)
    }
  },
  components: {
    PersonDetail
  }
}
</script>

<style lang="less" scoped>
.n_detail_p {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 5;
  .no-through {
    width:995px;
    height:60px;
    line-height:60px;
    background:rgba(243,247,255,1);
    border:1px solid rgba(68,123,237,1);
    border-radius:5px;
    font-size:18px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,150,0,1);
    text-align: center;
    margin: 43px auto 0;
  }
  .top {
    width: 990px;
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
    z-index: 1;
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
      // z-index: 999;
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
  .zujian {
    position: relative;
    padding-top: 50px;
  }
  .btn {
    text-align: center;
    padding-top: 100px;
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
      background: #447BED;
      color: #fff;
      width: 100%;
      height: 40px;
      line-height: 40px;
      img {
        vertical-align:  middle;
        padding: 0 10px;
      }
      span {
        font-size: 18px;
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
