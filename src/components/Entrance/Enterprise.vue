<template>
  <!-- 申请入口-企业 -->
  <div class="enterprise">
    <!-- 填写基本信息 -->
    <div class="con">
      <div class="tit">
        <img src="../../assets/img/white_msg.png" alt="">
      </div>
      <div class="msg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="企业名称：" prop="companyName">
            <el-select v-model="ruleForm.companyName" filterable placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人姓名：" prop="legalPersonName">
            <el-input v-model="ruleForm.legalPersonName" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入联系方式"></el-input>
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
          <div class="text"><span>营业执照：</span></div>
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
          <div class="text"><span>法人身份证：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>请上传身份证正面</a>
              <div class="img_show"></div>
              <input type="file" @change="fileImage($event, 2)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
        <figure>
          <div class="text"><span>法人身份证：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>请上传身份证反面</a>
              <div class="img_show"></div>
              <input type="file" @change="fileImage($event, 3)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
      </div>
    </div>
    <!-- 车险投保信息 -->
    <div class="con">
      <div class="tit">
        <img src="../../assets/img/car_msg.png" alt="">
      </div>
      <div class="car">
        <button :class="{active:'batch' === active}" @click="toubao('batch')">批量投保</button>
        <span style="padding: 0 62px;"></span>
        <button :class="{active:'single' === active}" @click="toubao('single')">单辆投保</button>
      </div>
      <!-- 批量投保 -->
      <div class="batch" v-show="batchShow">
        <div class="import">
          <div class="bigbox">
            <img src="../../assets/img/uploadpic.png" alt="">
            <a>批量导入</a>
            <p>请先下载表格模板，录入数据后上传</p>
            <div class="img_show" v-if="batchInsure">{{ batchInsure.name }}</div>
            <input type="file" @change="fileUpload($event)">
            <button @click="download">下载</button>
          </div>
        </div>
        <button class="save" @click="saveMsg">保存</button>
        <span style="padding: 0 115px;"></span>
        <button @click="$router.push({name: 'ApplicationEntrance'})">返回</button>
      </div>
      <!-- 单辆投保 -->
      <div class="single" v-show="singleShow">
        <el-form :model="form" :rules="formrules" ref="form" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="车架号：" prop="carVin">
            <el-input v-model="form.carVin" placeholder="请输入车架号"></el-input>
          </el-form-item>
          <div class="choose">
            <div class="license p">
              <el-radio v-model="form.type"  label="1" @change="changeCarNumber($event)">车辆合格证：</el-radio>
              <el-input size="mini" v-model="form.carNameplate" placeholder="请输入您的合格证号" id="hege"></el-input>
            </div>
            <div class="carnumber p">
              <el-radio v-model="form.type" label="2" @change="changeCarNumber($event)">车牌号：</el-radio>
              <el-input size="mini" v-model="form.carNameplate" placeholder="请输入您的车牌号" id="chepai"></el-input>
            </div>
          </div>
          <el-form-item label="商业险：" prop="insureCommercial">
            <el-input v-model="form.insureCommercial" placeholder="请输入商业险"></el-input>
          </el-form-item>
          <el-form-item label="交强险：" prop="insureFic">
            <el-input v-model="form.insureFic" placeholder="请输入交强险"></el-input>
          </el-form-item>
          <el-form-item label="车船税：" prop="insureCarBoatTax">
            <el-input v-model="form.insureCarBoatTax" placeholder="请输入车船税"></el-input>
          </el-form-item>
          <el-form-item label="选择保单：" prop="insureAge">
            <template slot-scope="scope">
              <div>
                <el-button size="mini" plain class="baodanBtn" :class="{active: 1 === num}" @click="baodan(1)">一年保单</el-button>
                <el-button size="mini" plain class="baodanBtn" :class="{active: 3 === num}" @click="baodan(3)">三年保单</el-button>
              </div>
            </template>
          </el-form-item>
          <el-form-item label="月付期数：" prop="insureStages">
            <el-select v-model="form.insureStages" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <button class="save" @click="saveMsg">保存</button>
        <span style="padding: 0 115px;"></span>
        <button @click="$router.push({name: 'ApplicationEntrance'})">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Req } from '../../assets/js/http.js'
export default {
  name: 'Enterprise',
  data () {
    return {
      radio: '1',
      option: [{
        value: '12',
        label: '12'
      }],
      options: [{
        value: '12',
        label: '12'
      }],
      ruleForm: {
        companyName: '',
        legalPersonName: '',
        tel: '',
        companyLicenseUrl: '',
        legalPersonUp: '',
        legalPersonDown: '',
        insureType: '1'
      },
      form: {
        carVin: '',
        type: '1',
        carNameplate: '',
        insureCommercial: '',
        insureFic: '',
        insureCarBoatTax: '',
        insureAge: '1',
        insureStages: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        legalPersonName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      formrules: {
        carVin: [
          { required: true, message: '请输入车架号', trigger: 'blur' },
          { pattern: /[A-Za-z0-9]+/, message: '请勿输入中文与符号', trigger: 'blur' }
        ],
        insureCommercial: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入金额', trigger: 'blur' }
        ],
        insureFic: [
          { pattern: /^[0-9]+$/, message: '请输入金额', trigger: 'blur' }
        ],
        insureCarBoatTax: [
          { pattern: /^[0-9]+$/, message: '请输入金额', trigger: 'blur' }
        ]
      },
      batchShow: false,
      singleShow: false,
      active: 'none',
      num: 1,
      batchInsure: ''
    }
  },
  methods: {
    fileUpload (e) {
      var file = e.target.files[0]
      if (file.name.split('.')[1] !== 'xls' && file.name.split('.')[1] !== 'xlsx') {
        this.$message({
          type: 'info',
          message: '请上传.xls/.xlsx'
        })
      } else {
        this.batchInsure = file
      }
    },
    download () {
      this.$fetch('/login/resource/show', {
        type: '4'
      }).then(res => {
        // console.log(res)
        window.open(res.data.fileurl)
      })
    },
    changeCarNumber (num) {
      this.form.carNameplate = ''
      if (num === '1') {
        document.getElementById('hege').disabled = false
        document.getElementById('chepai').disabled = true
      } else {
        // console.log(document.getElementById('chepai'))
        document.getElementById('hege').disabled = true
        document.getElementById('chepai').disabled = false
      }
    },
    saveMsg () {
      if (this.ruleForm.companyName === '') {
        this.$message.error('企业姓名不能为空')
      } else if (this.ruleForm.legalPersonName === '') {
        this.$message.error('法人姓名不能为空')
      } else if (this.ruleForm.tel === '') {
        this.$message.error('联系方式不能为空')
      } else if (this.ruleForm.companyLicenseUrl === '') {
        this.$message.error('请上传营业执照')
      } else if (this.ruleForm.legalPersonUp === '') {
        this.$message.error('请上传身份证正面')
      } else if (this.ruleForm.legalPersonDown === '') {
        this.$message.error('请上传身份证反面')
      } else {
        // console.log(this.ruleForm)
        // console.log(this.form)
        var formData = new FormData()
        formData.append('companyName', this.ruleForm.companyName)
        formData.append('legalPersonName', this.ruleForm.legalPersonName)
        formData.append('tel', this.ruleForm.tel)
        formData.append('companyLicenseUrl', this.ruleForm.companyLicenseUrl)
        formData.append('legalPersonUp', this.ruleForm.legalPersonUp)
        formData.append('legalPersonDown', this.ruleForm.legalPersonDown)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': sessionStorage.getItem('token')
          }
        }
        if (this.batchShow === true) {
          // 批量
          formData.append('insureType', '2')
          formData.append('batchInsure', this.batchInsure)
        } else {
          formData.append('insureType', '1')
          if (this.form.carVin === '') {
            this.$message.error('车架号不能为空')
          } else if (this.form.carNameplate === '') {
            this.$message.error('合格证或车牌号不能为空')
          } else if (this.form.insureCommercial === '') {
            this.$message.error('商业险不能为空')
          } else {
            formData.append('carVin', this.form.carVin)
            formData.append('type', this.form.type)
            formData.append('carNameplate', this.form.carNameplate)
            formData.append('insureCommercial', this.form.insureCommercial)
            formData.append('insureFic', this.form.insureFic)
            formData.append('insureCarBoatTax', this.form.insureCarBoatTax)
            formData.append('insureAge', this.form.insureAge)
            formData.append('insureStages', this.form.insureStages)
          }
        }
        this.$http.post(Req + '/fd/insure/insertCompany', formData, config).then(res => {
          // console.log(res)
          if (res.body.code === 101) {
            this.$router.push({
              path: '/Login',
              querry: { redirect: this.$router.currentRoute.fullPath }
            })
          } else if (JSON.parse(res.body.msg).code === 0) {
            this.$message(JSON.parse(res.body.msg).msg)
            this.$router.push({name: 'HomePage'})
          } else {
            // console.log(JSON.parse(res.body.msg))
            this.$message.error(JSON.parse(res.body.msg).msg)
          }
        })
      }
    },
    baodan (num) {
      this.num = num
      this.form.insureAge = num
      if (num === 3) {
        this.options = [{
          value: '12',
          label: '12'
        },
        {
          value: '18',
          label: '18'
        },
        {
          value: '24',
          label: '24'
        }]
      } else {
        this.options = [{
          value: '12',
          label: '12'
        }]
      }
    },
    // 判断是批量还是单个
    toubao (data) {
      this.active = data
      if (data === 'batch') {
        this.batchShow = true
        this.singleShow = false
      } else {
        this.batchShow = false
        this.singleShow = true
      }
    },
    // 上传图片
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
            if (i === 1) {
              that.ruleForm.companyLicenseUrl = file
            }
            if (i === 2) {
              that.ruleForm.legalPersonUp = file
            }
            if (i === 3) {
              that.ruleForm.legalPersonDown = file
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.enterprise {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  .con {
    width: 1085px;
    margin: 0 auto;
    background: #fff;
    .tit {
      padding-top: 40px;
    }
    .msg {
      // padding-left: 67px;
      padding-top: 10px;
      .el-select {
        width: 100%;
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
    .car {
      text-align: center;
      margin: 20px 0 0;
      button {
        width:208px;
        height:36px;
        border:1px solid rgba(102,102,102,1);
        border-radius:18px;
        background: #fff;
        font-size:18px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(102,102,102,1);
        &:hover {
          background:rgba(75,134,255,1);
          color: #fff;
          border:1px solid rgba(75,134,255,1);
        }
        &.active {
          background:rgba(75,134,255,1);
          color: #fff;
          border:1px solid rgba(75,134,255,1);
        }
      }
    }
  }
}
.batch {
  text-align: center;
  .import {
    width: 600px;
    margin: 133px auto;
    .bigbox {
      width:577px;
      height:312px;
      border:1px solid rgba(62,125,255,1);
      border-radius:20px;
      position: relative;
      img {
        display: block;
        width: 116px;
        margin: 88px auto 32px;
      }
      a {
        font-size:18px;
        font-family:MicrosoftYaHei;
        font-weight:bold;
        color:rgba(102,102,102,1);
      }
      p {
        font-size: 14px;
        color: #333;
        line-height: 50px;
      }
      button {
        position: absolute;
        width:50px;
        height:26px;
        line-height:26px;
        background:rgba(68,96,237,1);
        border-radius:5px;
        font-size:12px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        right: -70px;
        bottom: 10px;
        margin: 0;
      }
      .img_show {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        // opacity: 0;
      }
      input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        top: 0;
        left: 0;
        cursor: pointer;
      }
    }
  }
}
.single {
  .el-form {
    text-align: left;
    padding-top: 50px;
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
    .baodanBtn {
      width:95px;
      height:32px;
      line-height:16px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(238,238,238,1);
      border-radius:3px;
      font-size:16px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin: 0;
      &.active {
        border-color: #2E92FF;
      }
    }
  }
}
.batch, .single {
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
    background: #ccc;
    &.save {
      background: linear-gradient(left, #4e8fff, #5cc5ff);
      color: #fff;
    }
  }
}
</style>
