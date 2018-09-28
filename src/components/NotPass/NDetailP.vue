<template>
  <!-- 未通过--个人详情 -->
  <div class="n_detail_p" v-loading="fullscreenLoading">
    <!-- 未通过--个人详情 -->
    <div class="no-through">
      <div v-if="data.error">
        <img src="../../assets/mImg/danger.png" alt="">
        <span>{{ data.error.errorStates | status }},{{ data.error.errorMsg }}</span>
      </div>
    </div>
    <div class="zujian">
      <!-- 用户基本信息 -->
      <div class="tit">
        <img src="../../assets/img/user_basic_info.png" alt="">
      </div>
      <div class="basic_info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="customerName">
            <el-input v-model="ruleForm.customerName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="customerIdcard">
            <el-input v-model="ruleForm.customerIdcard" ></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="customerPhone">
            <el-input v-model="ruleForm.customerPhone" ></el-input>
          </el-form-item>
          <el-form-item label="车架号：" prop="carvin">
            <el-input v-model="ruleForm.carvin" ></el-input>
          </el-form-item>
          <el-form-item :label="ruleForm.type === 1 ? '车辆合格证：' : '车牌号：'" prop="nameplate">
            <el-input v-model="ruleForm.nameplate" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 车险投保信息 -->
      <div class="tit">
        <img src="../../assets/img/car_msg.png" alt="">
      </div>
      <div class="info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="商业险：" prop="commercial">
            <el-input v-model="ruleForm.commercial"></el-input>
          </el-form-item>
          <el-form-item label="交强险：" prop="cartaffic">
            <el-input v-model="ruleForm.cartaffic" ></el-input>
          </el-form-item>
          <el-form-item label="车船税：" prop="carboat">
            <el-input v-model="ruleForm.carboat" ></el-input>
          </el-form-item>
          <el-form-item label="选择保单：" prop="age">
            <template>
              <el-button size="mini" plain :class="{active: 1 == ruleForm.age}" @click="ageTab(1)">一年保单</el-button>
              <el-button size="mini" plain :class="{active: 3 == ruleForm.age}" @click="ageTab(3)">三年保单</el-button>
              <span class="dai" v-if="ruleForm.age === 3">
                <span>是否有车贷：</span>
                <el-radio v-model="ruleForm.state" :label="2">是</el-radio>
                <el-radio v-model="ruleForm.state" :label="1">否</el-radio>
              </span>
            </template>
          </el-form-item>
          <el-form-item label="月付期数：" prop="name">
            <el-select v-model="ruleForm.stages" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <div class="qishu">{{ruleForm.stages}}</div> -->
          </el-form-item>
        </el-form>
      </div>
      <!-- 图片信息 -->
      <div class="tit">
        <img src="../../assets/img/img_info.png" alt="">
      </div>
      <div class="pic">
        <figure>
          <div class="text"><span>缴费通知单：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>点击上传</a>
              <div class="img_show" :style="{'backgroundImage': 'url(' + ruleForm.pay + ')'}"></div>
              <input type="file" @change="fileImage($event, 1)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
        <figure>
          <div class="text"><span>购车发票：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>点击上传</a>
              <div class="img_show" :style="{'backgroundImage': 'url(' + ruleForm.invoice + ')'}"></div>
              <input type="file" @change="fileImage($event, 2)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
        <figure v-if="ruleForm.type === 2">
          <div class="text"><span>机动车行驶证：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>点击上传</a>
              <div class="img_show" :style="{'backgroundImage': 'url(' + ruleForm.license + ')'}"></div>
              <input type="file" @change="fileImage($event, 3)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
        <figure>
          <div class="text"><span>身份证正面：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>请上传身份证正面</a>
              <div class="img_show" :style="{'backgroundImage': 'url(' + ruleForm.customerIdcardUp + ')'}"></div>
              <input type="file" @change="fileImage($event, 4)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
        <figure>
          <div class="text"><span>身份证反面：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>请上传身份证反面</a>
              <div class="img_show" :style="{'backgroundImage': 'url(' + ruleForm.customerIdcardDown + ')'}"></div>
              <input type="file" @change="fileImage($event, 5)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
      </div>
    </div>
    <div class="btn">
      <button class="save" @click="submit">确定</button>
      <span style="padding: 0 115px;"></span>
      <button @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>

<script>
import PersonDetail from '../common/PersonDetail'
import { Req } from '../../assets/js/http.js'
export default {
  name: 'NDetailP',
  data () {
    return {
      radio: '1',
      options: [{
        value: '12'
      }],
      value8: '',
      ruleForm: {
        customerName: '',
        customerIdcard: '',
        customerPhone: '',
        carvin: '',
        nameplate: '',
        commercial: '',
        cartaffic: '',
        carboat: '',
        age: 1,
        stages: 12,
        state: 2
      },
      rules: {
        customerName: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        customerIdcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        customerPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^[1][0-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        carvin: [
          { required: true, message: '请输入车架号', trigger: 'blur' },
          { pattern: /[A-Za-z0-9]+/, message: '请勿输入中文与符号', trigger: 'blur' }
        ],
        commercial: [
          { required: true, message: '请输入商业险', trigger: 'blur' },
          { pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/, message: '请输入金额', trigger: 'blur' }
        ],
        cartaffic: [
          { pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/, message: '请输入金额', trigger: 'blur' }
        ],
        carboat: [
          { pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/, message: '请输入金额', trigger: 'blur' }
        ]
      },
      data: {},
      fullscreenLoading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    ageTab (i) {
      this.ruleForm.age = i
    },
    submit () {
      this.fullscreenLoading = true
      var formData = new FormData()
      formData.append('carId', this.ruleForm.carId)
      formData.append('username', this.ruleForm.customerName)
      formData.append('idNumber', this.ruleForm.customerIdcard)
      formData.append('tel', this.ruleForm.customerPhone)
      formData.append('carVin', this.ruleForm.carvin)
      formData.append('type', this.ruleForm.type)
      formData.append('carNameplate', this.ruleForm.nameplate)
      formData.append('insureCommercial', this.ruleForm.commercial)
      formData.append('insureFic', this.ruleForm.cartaffic)
      formData.append('insureCarBoatTax', this.ruleForm.carboat)
      formData.append('insureAge', this.ruleForm.age)
      formData.append('state', this.ruleForm.state)
      formData.append('insureStages', this.ruleForm.stages)
      formData.append('carPayBillUrl', this.ruleForm.pay)
      formData.append('carInvoiceUrl', this.ruleForm.invoice)
      formData.append('license', this.ruleForm.license)
      formData.append('personUp', this.ruleForm.customerIdcardUp)
      formData.append('personDown', this.ruleForm.customerIdcardDown)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': sessionStorage.getItem('token')
        }
      }
      this.$http.post(Req + '/fd/insure/updateCustomer', formData, config).then(res => {
        this.fullscreenLoading = false
        if (res.body.code === 102) {
          this.$router.push({
            path: '/MLogin',
            querry: { redirect: this.$router.currentRoute.fullPath }
          })
        } else if (res.body.code === 0) {
          this.$message(res.body.msg)
          this.$router.push({name: 'HomePage'})
        } else {
          this.$message.error(res.body.msg)
        }
      })
    },
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
        console.log(res.data.result)
        if (res.code === 0) {
          this.data = res.data.result
          // this.ruleForm = res.data.result
          this.ruleForm = {
            carId: res.data.result.obj.carId,
            customerName: res.data.result.customer.customerName,
            customerIdcard: res.data.result.customer.customerIdcard,
            customerPhone: res.data.result.customer.customerPhone,
            carvin: res.data.result.obj.carvin,
            type: res.data.result.obj.type,
            nameplate: res.data.result.obj.nameplate,
            commercial: res.data.result.obj.commercial,
            cartaffic: res.data.result.obj.cartaffic,
            carboat: res.data.result.obj.carboat,
            age: res.data.result.obj.age,
            state: res.data.result.obj.state,
            stages: res.data.result.obj.stages,
            pay: res.data.result.obj.pay,
            invoice: res.data.result.obj.invoice,
            license: res.data.result.obj.license,
            customerIdcardUp: res.data.result.customer.customerIdcardUp,
            customerIdcardDown: res.data.result.customer.customerIdcardDown
          }
          if (this.ruleForm.age === 3) {
            this.options = [{value: '12'}, {value: '18'}, {value: '24'}, {value: '36'}]
          } else {
            this.options = [{value: '12'}]
          }
        } else {
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
    },
    fileImage (e, i) {
      var that = this
      var file = e.target.files[0]
      if (file.name.split('.')[1] !== 'png' && file.name.split('.')[1] !== 'gif' && file.name.split('.')[1] !== 'jpg' && file.name.split('.')[1] !== 'jpeg' && file.name.split('.')[1] !== 'bmp' && file.name.split('.')[1] !== 'pdf') {
        this.$message({
          type: 'info',
          message: '请上传图片'
        })
      } else {
        var imgSize = file.size / 1024
        if (imgSize > 5 * 1024) {
          this.$message({
            type: 'info',
            message: '请上传大小不要超过5M的图片'
          })
        } else {
          var reader = new FileReader()
          reader.readAsDataURL(file) // 读出 base64
          reader.onloadend = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
            var dataURL = reader.result
            var avatar = dataURL
            e.target.previousElementSibling.style.backgroundImage = 'url(' + avatar + ')'
            // console.log(i)
            if (i === 1) {
              that.ruleForm.pay = file
            }
            if (i === 2) {
              that.ruleForm.invoice = file
            }
            if (i === 3) {
              that.ruleForm.license = file
            }
            if (i === 4) {
              that.ruleForm.customerIdcardUp = file
            }
            if (i === 5) {
              that.ruleForm.customerIdcardDown = file
            }
          }
        }
      }
    }
  },
  deactivated () {
    this.$destroy()
  },
  components: {
    PersonDetail
  },
  filters: {
    status (data) {
      if (data === '1') return '资料有误'
      if (data === '2') return '图片模糊'
      if (data === '3') return '车辆有误'
    }
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
    width: 1085px;
    margin: 0 auto;
    .info {
      .active {
        border-color: #4e8fff;
      }
      .qishu {
        width:87px;
        height:28px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(46,146,255,1);
        border-radius:3px;
        text-align: center;
      }
    }
    .pic {
      overflow: hidden;
      padding-top: 50px;
      figure {
        height: 200px;
        // width: 50%;
        float: left;
        .text {
          float: left;
          width: 90px;
          height: 100%;
          span {
            position: relative;
            display: block;
            width: 130px;
            text-align: right;
            font-size: 14px;
            color: #606266;
          }
        }
        .right {
          float: left;
          width: 270px;
          height: 100%;
          position: relative;
          .box {
            width:142px;
            height:142px;
            border:1px solid rgba(170,170,170,1);
            border-radius:10px;
            margin-left: 50px;
            text-align: center;
            position: relative;
            overflow: hidden;
            img {
              display: block;
              width: 56px;
              margin: 30px auto;
            }
            a {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color:rgba(46,146,255,1);
            }
            .img_show {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-size: cover;
            }
            input {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              opacity: 0;
              cursor: pointer;
            }
          }
          p {
            font-size:12px;
            line-height: 30px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
          }
        }
      }
    }
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
