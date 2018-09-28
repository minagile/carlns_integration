<template>
  <!-- 待付款-个人 -->
  <div class="obligations_p">
    <div class="con">
      <div class="body">
        <header>
          <div class="itm">
            <img src="../../assets/mImg/moneybag.png" alt="">
            <span>状态：客户已付款</span>
          </div>
          <div class="itm">
            <img src="../../assets/mImg/time.png" alt="">
            <span>提交时间：{{ ruleForm.customer.updateTime | timeChange }}</span>
          </div>
        </header>
        <div class="tit">
          <img src="../../assets/mImg/user_msg.png" alt="">
        </div>
        <div class="msg">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="姓名：" prop="customerName">
              <el-input v-model="ruleForm.customer.customerName"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="customerIdcard">
              <el-input v-model="ruleForm.customer.customerIdcard"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="customerPhone">
              <el-input v-model="ruleForm.customer.customerPhone"></el-input>
            </el-form-item>
            <el-form-item label="车架号：" prop="carvin">
              <el-input v-model="ruleForm.obj.carvin"></el-input>
            </el-form-item>
            <el-form-item :label="ruleForm.obj.type === 1 ? '车辆合格证：' : '车牌号：'" prop="nameplate">
              <el-input v-model="ruleForm.obj.nameplate"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/toubao.png" alt="">
        </div>
        <div class="msg">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="商业险：" prop="commercial">
              <el-input v-model="ruleForm.obj.commercial"></el-input>
            </el-form-item>
            <el-form-item label="交强险：" prop="cartaffic">
              <el-input v-model="ruleForm.obj.cartaffic"></el-input>
            </el-form-item>
            <el-form-item label="车船税：" prop="carboat">
              <el-input v-model="ruleForm.obj.carboat"></el-input>
            </el-form-item>
            <el-form-item label="选择保单：" prop="age">
              <el-button :class="{active: 1 == ruleForm.obj.age}">一年保单</el-button>
              <el-button :class="{active: 3 == ruleForm.obj.age}">三年保单</el-button>
              <el-button type="text" v-if="ruleForm.obj.age === 3">是否有车贷：
                <el-radio v-model="ruleForm.obj.state" :label="2">是</el-radio>
                <el-radio v-model="ruleForm.obj.state" :label="1">否</el-radio>
              </el-button>
            </el-form-item>
            <el-form-item label="月付期数：" prop="phone">
              <el-button class="active">{{ruleForm.obj.stages}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/picmsg.png" alt="">
        </div>
        <PicShow  :imgList="ruleForm" :from="'个人审核'" />
        <div class="btn">
          <button class="p" @click="dialogFormVisible = true">确定付款</button>
          <button @click="$router.go(-1)">返回</button>
        </div>
      </div>
    </div>
    <!-- 弹窗-上传付款凭证 -->
    <el-dialog :show-close="false" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="770px">
      <template>
        <div class="header">
          <span>上传付款凭证</span>
        </div>
      </template>
      <div class="upload">
        <img src="../../assets/mImg/upload.png" alt="">
        <p>点击上传</p>
        <div class="imgShow"></div>
        <input type="file" @change="fileUpload($event)">
      </div>
      <p>付款计划表的格式为PDF/JPG、PNG</p>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn" @click="dialogFormVisible = false">取消</el-button>
        <el-button class="button" @click="commit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PicShow from '../../components/common/PicShow'
import { Req } from '../../assets/js/http.js'
export default {
  name: 'ObligationsP',
  data () {
    return {
      ruleForm: {
        customer: {},
        obj: {}
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
      form: {
        msg: '',
        errStates: 1
      },
      labelList: ['资料有误', '车辆有误', '图片模糊'],
      num: 0,
      baodan: 1,
      radio: '1',
      file: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    commit () {
      this.dialogFormVisible = false
      // /ad/insure/uploadBill 上传付款凭证
      if (this.file) {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': sessionStorage.getItem('token')
          }
        }
        var formData = new FormData()
        formData.append('id', this.$route.query.id)
        formData.append('type', 1)
        formData.append('uploadBill', this.file)
        this.$http.post(Req + '/ad/insure/uploadBill', formData, config).then(res => {
          if (res.body.code === 102) {
            this.$router.push({
              path: '/MLogin',
              querry: { redirect: this.$router.currentRoute.fullPath }
              // 从哪个页面跳转
            })
          } else if (res.body.code === 0) {
            this.$message(res.body.msg)
            this.$router.push({name: 'AllChannels'})
          } else {
            this.$message.error(res.body.msg)
          }
        })
      } else {
        this.$message.error('请上传图片')
      }
    },
    tab (i) {
      this.num = i
    },
    getData () {
      this.$fetch('/ad/insure/select', {
        id: this.$route.query.id,
        type: '1'
      }).then(res => {
        if (res.code === 0) {
          this.ruleForm = res.data.result
        } else {
          this.$message(res.msg)
          this.$router.back(-1)
        }
      })
    },
    fileUpload (e) {
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
            that.file = file
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
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    },
    time (data) {
      return data.split(' ')[0].replace('-', '.').replace('-', '.')
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.obligations_p {
   padding: 0 20px 20px;
  background: #E0E0E0;
  .con {
    background: #fff;
    .body {
      width: 1080px;
      margin: 0 auto;
      padding-top: 52px;
      header {
        width:1013px;
        height:60px;
        line-height:60px;
        background:rgba(255,243,207,1);
        border:1px solid rgba(255,193,7,1);
        opacity:0.98;
        margin-left: 67px;
        margin-bottom: 59px;
        border-radius:5px;
        display: flex;
        justify-content: space-around;
        img {
          vertical-align: middle;
        }
      }
      .msg {
        padding: 28px 0;
        button {
          width: 87px;
        }
        .active {
          background:rgba(255,255,255,1);
          border:1px solid rgba(46,146,255,1);
          border-radius:3px;
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
      height: 40px;
      line-height: 40px;
      img {
        vertical-align:  middle;
        padding: 0 10px;
      }
      span {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .upload {
      width:342px;
      height:186px;
      border: 1px solid #ccc;
      border-radius: 6px;
      text-align: center;
      margin: 54px auto 0;
      position: relative;
      img {
        vertical-align: middle;
        margin-top: 60px;
      }
      p {
        padding-top: 20px;
      }
      .imgShow {
        background-size: 100% 100%;
      }
      input, .imgShow {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        cursor: pointer;
      }
      input {
        opacity: 0;
      }
    }
    p {
      text-align: center;
      padding-top: 15px;
    }
    .dialog-footer {
      margin-top: 60px;
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
