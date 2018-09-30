<template>
  <!-- 未通过--企业详情 -->
  <div class="n_detail_c" v-loading="fullscreenLoading">
    <div class="table">
      <div class="errormsg" v-if="$route.query.route === 'nothrough'">
        <img src="../../assets/mImg/danger.png" alt="">
        <span>{{ error.errorStates | status }},{{ error.errorMsg }}</span>
      </div>
      <el-table :data="tableData" style="width: 1127px;margin: 0 auto;" >
        <el-table-column prop="carvin" label="车架号(可修改)" width="180" align="center">
          <template slot-scope="scope">
            <input class="nopass_change" type="text" v-model="scope.row.carvin">
          </template>
        </el-table-column>
        <el-table-column prop="nameplate" label="车辆合格证/车牌号(可修改)" width="200" align="center">
          <template slot-scope="scope">
            <input class="nopass_change" type="text" v-model="scope.row.nameplate">
          </template>
        </el-table-column>
        <el-table-column prop="commercial" label="商业险" align="center"></el-table-column>
        <el-table-column prop="cartaffic" label="交强险" align="center"></el-table-column>
        <el-table-column prop="carboat" label="车船税" align="center"></el-table-column>
        <el-table-column prop="age" label="保单" align="center"></el-table-column>
        <el-table-column prop="stages" label="月付期数" align="center"></el-table-column>
        <el-table-column label="状态" align="center" v-if="$route.query.route === 'nothrough'">
          <template slot-scope="scope">
            <div style="color: #4B86FF">未通过</div>
          </template>
        </el-table-column>
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
      <div class="picmsg">
        <figure>
          <div class="text"><span>营业执照：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>点击上传</a>
              <div class="img_show" :style="{'backgroundImage': 'url(' + ruleForm.companyLicenseUrl + ')'}"></div>
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
              <div class="img_show" :style="{'backgroundImage': 'url(' + ruleForm.legalPersonUp + ')'}"></div>
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
              <div class="img_show" :style="{'backgroundImage': 'url(' + ruleForm.legalPersonDown + ')'}"></div>
              <input type="file" @change="fileImage($event, 3)" accept="image/jpeg,image/x-png,image/gif" />
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
      </div>
      <!-- <PicShow :imgList="ruleForm" :from="'企业待审核'"/> -->
    </div>
    <div class="btn">
      <button class="save" @click="submit">提交</button>
      <span style="padding: 0 115px;"></span>
      <button @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>

<script>
import PicShow from '../common/PicShow'
import { Req } from '../../assets/js/http.js'
export default {
  name: 'NDetailC',
  data () {
    return {
      ruleForm: {
        companyName: '',
        legalPersonName: '',
        companyTel: '',
        companyLicenseUrl: '',
        legalPersonUp: '',
        legalPersonDown: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        legalPersonName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        companyTel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^[1][0-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      tableData: [],
      error: '',
      fullscreenLoading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    submit () {
      this.fullscreenLoading = true
      var arrList = []
      this.tableData.forEach(v => {
        arrList.push({carId: v.carId, carVin: v.carvin, nameplate: v.nameplate, type: v.type})
      })
      var formData = new FormData()
      formData.append('carBatch', this.error.errorBatch)
      formData.append('companyId', this.ruleForm.companyId)
      formData.append('companyName', this.ruleForm.companyName)
      formData.append('legalPersonName', this.ruleForm.legalPersonName)
      formData.append('tel', this.ruleForm.companyTel)
      formData.append('companyLicenseUrl', this.ruleForm.companyLicenseUrl)
      formData.append('legalPersonUp', this.ruleForm.legalPersonUp)
      formData.append('legalPersonDown', this.ruleForm.legalPersonDown)
      formData.append('cars', JSON.stringify(arrList))
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': sessionStorage.getItem('token')
        }
      }
      this.$http.post(Req + '/fd/insure/updateCompany', formData, config).then(res => {
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
    // 获取详情信息
    getData () {
      this.$fetch('/fd/insure/selectDetail', {
        id: this.$route.query.id,
        batch: this.$route.query.batch,
        type: '2'
      }).then(res => {
        // console.log(res.data.result)
        if (res.code === 0) {
          this.tableData = res.data.result.obj
          this.error = res.data.result.error[0]
          this.ruleForm = res.data.result.company
        } else {
          this.$message(res.msg)
          this.$router.back(-1)
        }
      })
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
  },
  deactivated () {
    this.$destroy()
  },
  components: {
    PicShow
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
.n_detail_c {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 99999;
  .nopass_change {
    display: block;
    border: 0;
    text-align: center;
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
    .picmsg {
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
}
</style>
