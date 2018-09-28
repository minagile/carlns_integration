<template>
  <!-- 申请入口-个人 -->
  <div class="personal">
    <!-- 填写基本信息 -->
    <div class="con">
      <div class="tit">
        <img src="../../assets/img/white_msg.png" alt="">
      </div>
      <div class="msg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idNumber">
            <el-input v-model="ruleForm.idNumber" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="车架号：" prop="carVin">
            <el-input v-model="ruleForm.carVin" placeholder="请输入车架号"></el-input>
          </el-form-item>
          <div class="choose">
            <div class="license p">
              <el-radio v-model="ruleForm.type" label="1" @change="changeCarNumber($event)">车辆合格证：</el-radio>
              <el-input size="mini" v-model="ruleForm.carNameplate" placeholder="请输入您的合格证号" id="hege" ></el-input>
            </div>
            <div class="carnumber p">
              <el-radio v-model="ruleForm.type" label="2" @change="changeCarNumber($event)">车牌号：</el-radio>
              <el-input size="mini" v-model="ruleForm.carNameplate" placeholder="请输入您的车牌号" id="chepai"></el-input>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 车险投保信息 -->
    <div class="con">
      <div class="tit">
        <img src="../../assets/img/car_msg.png" alt="">
      </div>
      <div class="info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="商业险：" prop="insureCommercial">
            <el-input v-model="ruleForm.insureCommercial" placeholder="请输入商业险"></el-input>
          </el-form-item>
          <el-form-item label="交强险：" prop="insureFic">
            <el-input v-model="ruleForm.insureFic" placeholder="请输入交强险"></el-input>
          </el-form-item>
          <el-form-item label="车船税：" prop="insureCarBoatTax">
            <el-input v-model="ruleForm.insureCarBoatTax" placeholder="请输入车船税"></el-input>
          </el-form-item>
          <el-form-item label="选择保单：">
            <template>
              <el-button size="mini" plain @click="baodan(1)">一年保单</el-button>
              <el-button size="mini" plain @click="baodan(3)">三年保单</el-button>
              <span class="dai" style="margin-left: 20px;color: #606266;" v-show="isInsure">
                <span>是否有车贷：</span>
                <el-radio v-model="ruleForm.state" label="2">是</el-radio>
                <el-radio v-model="ruleForm.state" label="1">否</el-radio>
              </span>
            </template>
          </el-form-item>
          <el-form-item label="月付期数：">
            <el-select v-model="ruleForm.insureStages" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 上传图片信息 -->
    <div class="con">
      <div class="tit">
        <img src="../../assets/img/upload_pic_txt.png" alt="">
      </div>
      <div class="pic">
        <figure>
          <div class="text"><span>缴费通知单：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>点击上传</a>
              <div class="img_show"></div>
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
              <div class="img_show"></div>
              <input type="file" @change="fileImage($event, 2)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
        <figure v-if="ruleForm.type === '2'">
          <div class="text"><span>机动车行驶证：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>点击上传</a>
              <div class="img_show"></div>
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
              <div class="img_show"></div>
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
              <div class="img_show"></div>
              <input type="file" @change="fileImage($event, 5)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
      </div>
    </div>
   <footer>
      <button @click="save">保存</button>
   </footer>
  </div>
</template>

<script>
import { Req } from '../../assets/js/http.js'
export default {
  name: 'Personal',
  data () {
    return {
      options: [{
        value: '12'
      }],
      ruleForm: {
        username: '',
        idNumber: '',
        tel: '',
        carVin: '',
        type: '1',
        carNameplate: '',
        insureCommercial: '',
        insureFic: '',
        insureCarBoatTax: '',
        insureAge: '1',
        insureStages: '',
        state: '1'
      },
      rules: {
        username: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^[1][0-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        carVin: [
          { required: true, message: '请输入车架号', trigger: 'blur' },
          { pattern: /[A-Za-z0-9]+/, message: '请勿输入中文与符号', trigger: 'blur' }
        ],
        insureCommercial: [
          { required: true, message: '请输入商业险', trigger: 'blur' },
          { pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/, message: '请输入金额', trigger: 'blur' }
        ],
        insureFic: [
          { pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/, message: '请输入金额', trigger: 'blur' }
        ],
        insureCarBoatTax: [
          { pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/, message: '请输入金额', trigger: 'blur' }
        ]
      },
      isInsure: false
    }
  },
  mounted () {},
  methods: {
    changeCarNumber (num) {
      this.ruleForm.carNameplate = ''
      if (num === '1') {
        document.getElementById('hege').disabled = false
        document.getElementById('chepai').disabled = true
      } else {
        // console.log(document.getElementById('chepai'))
        document.getElementById('hege').disabled = true
        document.getElementById('chepai').disabled = false
      }
    },
    baodan (val) {
      if (val === 3) {
        this.isInsure = true
        this.ruleForm.insureAge = val
        this.options = [{value: '12'}, {value: '18'}, {value: '24'}, {value: '36'}]
      } else {
        this.isInsure = false
        this.ruleForm.insureAge = val
        this.ruleForm.state = '1'
        this.options = [{value: '12'}]
      }
    },
    save () {
      if (this.ruleForm.username === '') {
        this.$message.error('负责人姓名不能为空')
      } else if (this.ruleForm.idNumber === '') {
        this.$message.error('身份证号不能为空')
      } else if (this.ruleForm.tel === '') {
        this.$message.error('联系方式不能为空')
      } else if (this.ruleForm.carVin === '') {
        this.$message.error('车架号不能为空')
      } else if (this.ruleForm.insureCommercial === '') {
        this.$message.error('商业险不能为空')
      } else if (this.ruleForm.carPayBillUrl === '') {
        this.$message.error('请上传缴费通知单')
      } else if (this.ruleForm.personUp === '') {
        this.$message.error('请上传身份证正面')
      } else if (this.ruleForm.personDown === '') {
        this.$message.error('请上传身份证反面')
      } else {
        var formData = new FormData()
        formData.append('username', this.ruleForm.username)
        formData.append('idNumber', this.ruleForm.idNumber)
        formData.append('tel', this.ruleForm.tel)
        formData.append('carVin', this.ruleForm.carVin)
        formData.append('type', this.ruleForm.type)
        formData.append('carNameplate', this.ruleForm.carNameplate)
        formData.append('insureCommercial', this.ruleForm.insureCommercial)
        formData.append('insureFic', this.ruleForm.insureFic)
        formData.append('insureCarBoatTax', this.ruleForm.insureCarBoatTax)
        formData.append('insureAge', this.ruleForm.insureAge)
        formData.append('state', this.ruleForm.state)
        formData.append('insureStages', this.ruleForm.insureStages)
        formData.append('carPayBillUrl', this.ruleForm.carPayBillUrl)
        formData.append('personUp', this.ruleForm.personUp)
        formData.append('personDown', this.ruleForm.personDown)
        if (this.ruleForm.type === '1') {
          if (this.ruleForm.carInvoiceUrl === '') {
            this.$message.error('请上传购车发票')
          } else {
            formData.append('carInvoiceUrl', this.ruleForm.carInvoiceUrl)
          }
        } else {
          if (this.ruleForm.license === '') {
            this.$message.error('请上传机动车行驶证')
          } else {
            formData.append('license', this.ruleForm.license)
            formData.append('carInvoiceUrl', this.ruleForm.carInvoiceUrl)
          }
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': sessionStorage.getItem('token')
          }
        }
        this.$http.post(Req + '/fd/insure/insert', formData, config).then(res => {
          if (res.body.code === 101) {
            this.$router.push({
              path: '/',
              querry: { redirect: this.$router.currentRoute.fullPath }
              // 从哪个页面跳转
            })
          } else if (res.body.code === 0) {
            this.$message(res.body.msg)
            this.$router.push({name: 'HomePage'})
          } else {
            this.$message.error(res.body.msg)
          }
        })
      }
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
              that.ruleForm.carPayBillUrl = file
            }
            if (i === 2) {
              that.ruleForm.carInvoiceUrl = file
            }
            if (i === 3) {
              that.ruleForm.license = file
            }
            if (i === 4) {
              that.ruleForm.personUp = file
            }
            if (i === 5) {
              that.ruleForm.personDown = file
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.personal {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  .info {
  }
  .con {
    width: 1085px;
    margin: 0 auto;
    background: #fff;
    .tit {
      padding-top: 40px;
    }
    .msg {
      .el-form {
        text-align: left;
        padding-top: 10px;
        .choose {
          overflow: hidden;
          .p {
            margin-bottom: 18px;
            position: relative;
            .el-radio {
              text-align: right;
              font-size: 14px;
              color: #606266;
              line-height: 40px;
              padding: 0 12px 0 0;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              position: absolute;
              top: 0;
              line-height: 28px;
              right: 918px;
            }
            .el-input {
              // float: left;
              margin-left: 167px;
              width: 918px;
            }
          }
        }
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
}
footer {
  text-align: center;
  button {
    width: 210px;
    height: 57px;
    line-height: 57px;
    border: 0;
    border-radius: 57px;
    margin-bottom: 40px;
    font-size:20px;
    font-family:PingFang-SC-Bold;
    font-weight: 600;
    color:#666;
    outline: none;
    background: linear-gradient(left, #4e8fff, #5cc5ff);
    color: #fff;
  }
}
</style>
