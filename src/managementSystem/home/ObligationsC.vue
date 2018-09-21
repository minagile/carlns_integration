<template>
  <!-- 待审核-企业 -->
  <div class="obligations_c">
    <header>
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
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/user_msg.png" alt="">
        </div>
        <div class="pic">
          <PicShow  :imgList="ruleForm" :from="'企业待审核'"/>
        </div>
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
  name: 'ObligationsC',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      ruleForm: {
        name: '',
        peoplename: '',
        phone: ''
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
        name: ''
      },
      labelList: ['资料有误', '车辆有误', '图片模糊'],
      num: 0,
      file: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    commit () {
      if (this.file) {
        this.dialogFormVisible = false
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': sessionStorage.getItem('token')
          }
        }
        var formData = new FormData()
        formData.append('id', this.$route.query.id)
        formData.append('type', 2)
        formData.append('batch', this.$route.query.batch)
        formData.append('uploadBill', this.file)
        this.$http.post(Req + '/ad/insure/uploadBill', formData, config).then(res => {
          if (res.body.code === 101) {
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
        type: '2',
        batch: this.$route.query.batch
      }).then(res => {
        if (res.code === 0) {
          // console.log(res.data.result)
          this.tableData = res.data.result.obj
          this.ruleForm = res.data.result.company
        } else {
          this.$message(res.msg)
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
  components: {
    PicShow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.obligations_c {
  padding: 0 20px 20px;
  background: #E0E0E0;
  header {
    min-height: 150px;
    background: #fff;
    margin-bottom: 10px;
    padding-top: 50px;
    .el-table {
      margin: 0 auto 0;
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
