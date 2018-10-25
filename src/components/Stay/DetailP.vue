<template>
  <!-- 待分期--个人详情 -->
  <div class="detail_p" id="ss">
    <div class="body">
      <PersonDetail :tableList="data"/>
      <div class="btn">
        <button class="save" @click="dialogFormVisible = true">付款</button>
        <span style="padding: 0 115px;"></span>
        <button @click="$router.go(-1)">返回</button>
      </div>
    </div>
    <!-- 支付弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="713px">
      <template>
        <div class="header">
          <h2>
            <span>支付信息</span>
          </h2>
          <span>分期总额：{{firstQ.countnum}}</span>
          <span>首期：{{firstQ.firstpaynum}}</span>
          <span>分期数：{{obj.stages}}</span>
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
            <el-button class="code" @click="getCode">获取验证码<span v-show="second">{{ count }}s</span></el-button>
            <el-checkbox v-model="radio"><a :href="textUrl" target="_blank">《车险代扣授权协议》</a></el-checkbox>
          </template>
        </el-form-item>
        <el-alert
          :title="text.msg"
          :type="text.type"
          close-text="知道了"
          v-if="text.msg"
          @close="hello">
        </el-alert>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pay" v-loading.fullscreen.lock="fullscreenLoading">确认支付</el-button>
        <el-button @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PersonDetail from '../common/PersonDetail'
export default {
  name: 'DetailP',
  data () {
    return {
      fullscreenLoading: false,
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
      data: {},
      textUrl: '',
      radio: false,
      firstQ: {},
      obj: {},
      text: {
        msg: '',
        type: ''
      }
    }
  },
  mounted () {
    this.getData()
    this.$fetch('/login/resource/show', {type: 3}).then(res => {
      if (res.code === 0) {
        this.textUrl = res.data.fileurl
      } else {
        this.$message(res.msg)
      }
    })
  },
  methods: {
    // 支付
    pay () {
      if (this.radio === false) {
        this.text = ({type: 'warning', msg: '请先阅读并同意车险代扣授权协议'})
      } else if (this.ruleForm.code === '' || this.ruleForm.code === undefined) {
        this.text = ({type: 'warning', msg: '请输入验证码'})
      } else {
        document.getElementById('ss').style.zIndex = 10
        this.fullscreenLoading = true
        this.$fetch('/fd/pay/firstPay', {
          orderId: this.data.order.orderId,
          code: this.ruleForm.code
        }).then(res => {
          this.fullscreenLoading = false
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.$message({type: 'success', message: res.msg})
            this.$router.push({path: '/StayByStage'})
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 获取数据
    getData () {
      this.$fetch('/fd/insure/selectDetail', {
        id: this.$route.query.id,
        type: 1
      }).then(res => {
        // console.log(res)
        this.data = res.data.result
        this.ruleForm = res.data.result.customer
        this.firstQ = res.data.result.order
        this.obj = res.data.result.obj
        if (res.code !== 0) {
          this.text = ({type: 'error', msg: res.msg})
          // this.$message.error(res.msg)
        }
      })
    },
    // 获取验证码
    getCode () {
      if (this.ruleForm.customerName === '') {
        this.text = ({type: 'warning', msg: '姓名不能为空'})
      } else if (this.ruleForm.customerIdcard === '') {
        this.text = ({type: 'warning', msg: '身份证不能为空'})
      } else if (this.ruleForm.card === '' || this.ruleForm.card === undefined) {
        this.text = ({type: 'warning', msg: '银行卡号不能为空'})
      } else if (this.ruleForm.customerPhone === '') {
        this.text = ({type: 'warning', msg: '手机号不能为空'})
      } else {
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
            if (res.code === 0) {
              this.text = ({type: 'success', msg: res.msg})
            } else {
              // this.$message.error(res.msg)
              this.text = ({type: 'error', msg: res.msg})
            }
          })
        }
      }
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
    },
    // 关闭提醒回调
    hello () {
      this.text = {}
    }
  },
  deactivated () {
    this.$destroy()
  },
  components: {
    PersonDetail
  }
}
</script>

<style lang="less" scoped>
.detail_p {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 99999;
  .body {
    width: 1074px;
    margin: 0 auto;
    padding-top: 50px;
    .basic_info {
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
  }
  .el-dialog {
    .el-input {
      width: 85%;
    }
   .header {
      position: absolute;
      top: 0;
      left: 0;
      background:#2E92FF;
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 18px;
      }
      h2 {
        padding-left: 10px;
        span {
          font-size:18px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:white;
        }
      }
      span {
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:white;
        margin-right: 10px;
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
      width: 125px;
    }
    .code {
      background: #2E92FF;
      color: #fff;
    }
  }
}
</style>
