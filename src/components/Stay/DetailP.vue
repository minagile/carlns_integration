<template>
  <!-- 待分期--个人详情 -->
  <div class="detail_p">
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
            <el-button class="code" @click="getCode">获取验证码<span v-show="second">{{ count }}s</span></el-button>
            <el-checkbox v-model="radio"><a :href="textUrl" target="_blank">《车险代扣授权协议》</a></el-checkbox>
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
  name: 'DetailP',
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
      data: {},
      textUrl: '',
      radio: false
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
        this.$message('请先阅读并同意车险代扣授权协议')
      } else if (this.ruleForm.code === '' || this.ruleForm.code === undefined) {
        this.$message('请输入验证码')
      } else {
        this.dialogFormVisible = false
        this.$fetch('/fd/pay/firstPay', {
          orderId: this.data.order.orderId,
          code: this.ruleForm.code
        }).then(res => {
          if (res.code === 0) {
            this.$message({type: 'success', message: res.msg})
            this.$router.push({name: 'HomePage'})
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
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取验证码
    getCode () {
      if (this.ruleForm.customerName === '') {
        this.$message.error('姓名不能为空')
      } else if (this.ruleForm.customerIdcard === '') {
        this.$message.error('身份证不能为空')
      } else if (this.ruleForm.card === '' || this.ruleForm.card === undefined) {
        this.$message.error('银行卡号不能为空')
      } else if (this.ruleForm.customerPhone === '') {
        this.$message.error('手机号不能为空')
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
              this.$message({type: 'success', message: res.msg})
            } else {
              this.$message.error(res.msg)
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
      background: #2E92FF;
      text-indent: 10px;
      color: #fff;
      width: 100%;
      height: 40px;
      line-height: 40px;
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
      width: 125px;
    }
    .code {
      background: #ccc;
      color: #fff;
    }
  }
}
</style>
