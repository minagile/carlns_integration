<template>
  <!-- 待分期--企业详情 -->
  <div class="detail_c">
    <div class="body">
      <!-- 上传付款信息 -->
      <div class="tit">
        <img src="../../assets/img/pay_msg.png" alt="">
      </div>
      <div class="payment_info">
        <div class="schedule">
          <span>付款计划表：</span>
          <div class="upload_box">
            <img src="../../assets/img/uploadpic.png" alt="">
            <a>请上传图片</a>
            <div class="img_show"></div>
            <input type="file" @change="fileImage($event, 1)" accept="image/jpeg,image/x-png,image/gif" />
          </div>
          <button>下载</button>
          <p>请先下载付款计划表，盖章后以图片形式上传</p>
          <p class="gey">支持jpg、jpeg、png等格式，体积在5M以下 </p>
        </div>
        <div class="schedule">
          <span>付款凭证：</span>
          <div class="upload_box">
            <img src="../../assets/img/uploadpic.png" alt="">
            <a>请上传图片</a>
            <div class="img_show"></div>
            <input type="file" @change="fileImage($event, 2)" accept="image/jpeg,image/x-png,image/gif" />
          </div>
          <p>请上传付款凭证</p>
          <p class="gey">支持jpg、jpeg、png等格式，体积在5M以下 </p>
        </div>
      </div>
      <!-- 填写基本信息 -->
      <div class="tit">
        <img src="../../assets/img/white_msg.png" alt="">
      </div>
      <div class="basic">
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
      <div class="tit">
        <img src="../../assets/img/img_info.png" alt="">
      </div>
      <div class="pic">
        <PicShow :imgList="ruleForm" :from="'企业待审核'"/>
      </div>
      <!-- 车险投保信息 -->
      <div class="tit">
        <img src="../../assets/img/car_msg.png" alt="">
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="carvin" label="车架号" width="180" align="center"></el-table-column>
        <el-table-column prop="nameplate" label="车辆合格证/车牌号" width="180" align="center"></el-table-column>
        <el-table-column prop="commercial" label="商业险" align="center"></el-table-column>
        <el-table-column prop="cartaffic" label="交强险" align="center"></el-table-column>
        <el-table-column prop="carboat" label="车船税" align="center"></el-table-column>
        <el-table-column prop="age" label="保单" align="center"></el-table-column>
        <el-table-column prop="stages" label="月付期数" align="center"></el-table-column>
      </el-table>
      <div class="btn">
        <button class="save" @click="save">保存</button>
        <span style="padding: 0 115px;"></span>
        <button @click="$router.go(-1)">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import PicShow from '../../components/common/PicShow'
export default {
  name: 'DetailC',
  data () {
    return {
      ruleForm: {
        companyName: '',
        legalPersonName: '',
        companyTel: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        legalPersonName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        companyTel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      },
      tableData: [],
      companyPlan: '',
      payBill: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    save () {
      this.$post('/fd/insure/upload', {
        companyId: this.$route.query.id,
        batch: this.$route.query.batch,
        companyPlan: this.companyPlan,
        payBill: this.payBill
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          res.$message({type: 'success', message: '成功'})
          this.$router.go(-1)
        } else {
          this.$message(res.msg)
        }
      })
    },
    getData () {
      this.$fetch('/fd/insure/selectDetail', {
        id: this.$route.query.id,
        batch: this.$route.query.batch,
        type: '2'
      }).then(res => {
        console.log(res.data)
        this.tableData = res.data.result.obj
        this.ruleForm = res.data.result.company
      })
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
            if (i === 1) {
              that.companyPlan = file
            } else {
              that.payBill = file
            }
          }
        }
      }
    }
  },
  components: {
    PicShow
  }
}
</script>

<style lang="less" scoped>
.detail_c {
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
    .payment_info {
      margin: 33px 0 44px 51px;
      width: 1023px;
      height: 303px;
      background: rgba(255,255,255,1);
      border: 1px solid rgba(75,134,255,1);
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      .schedule {
        width: 252px;
        position: relative;
        padding: 50px 0 0 90px;
        span {
          position: absolute;
          right: 200px;
        }
        .upload_box {
          text-align: center;
          width: 142px;
          height: 142px;
          margin: 0 auto;
          border: 1px solid rgba(170,170,170,1);
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          img {
            display: block;
            margin: 29px auto 41px;
          }
          a {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: rgba(46,146,255,1);
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
        button {
          width: 50px;
          height: 26px;
          background: rgba(68,96,237,1);
          border-radius: 5px;
          color: #fff;
          position: absolute;
          top: 164px;
          right: 0;
        }
        p {
          text-align: center;
          line-height: 30px;
          font-size: 12px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(46,146,255,1);
          &.gey {
            color: #666666;
          }
        }
      }
    }
    .basic {
      padding: 25px 0 20px 0;
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
    .pic {
      overflow: hidden;
      padding-top: 40px;
      padding-bottom: 80px;
      figure {
        // height: 200px;
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
          width: 268px;
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
            background-image: url(../../assets/img/uploadpic.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
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
</style>
