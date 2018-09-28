<template>
  <div class="ChannelApplication">
    <div class="body">
      <h2>欢迎来到渠道代理申请</h2>
      <div class="basic">
        <div class="tit">
          <img src="../../assets/img/white_msg.png" alt="">
        </div>
        <div class="input">
          <i>*</i>
          <span>企业名称：</span>
          <input type="text" placeholder="请输入企业名称" v-model="msg.channelName" @blur="phoneNumber">
        </div>
        <div class="input">
          <i>*</i>
          <span>法人姓名：</span>
          <input type="text" placeholder="请输入法人姓名" v-model="msg.channelUserName" @blur="phoneNumber">
        </div>
        <div class="input">
          <i>*</i>
          <span>经营地址：</span>
          <input type="text" placeholder="请输入经营地址" v-model="msg.address" @blur="phoneNumber">
        </div>
        <div class="input">
          <i>*</i>
          <span>联系方式：</span>
          <input type="text" placeholder="请输入联系方式" v-model="msg.channelUserPhone" @blur="phoneNumber">
          <!-- <input type="text" placeholder="请输入联系方式" v-model="msg.channelUserPhone"> -->
        </div>
      </div>
      <div class="basic pic">
        <div class="tit">
          <img src="../../assets/img/upload_pic_txt.png" alt="">
        </div>
        <div class="con">
          <figure>
            <div class="text"><span>营业执照：</span></div>
            <div class="right">
              <div class="box">
                <img src="../../assets/img/uploadpic.png" alt="">
                <a>点击上传</a>
                <div class="img_show"></div>
                <input type="file" @change="fileImage($event, 1)" accept="image/jpeg,image/x-png,image/gif">
              </div>
              <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
            </div>
          </figure>
          <figure>
            <div class="text"><span>代理商合作协议：</span></div>
            <div class="right">
              <div class="box">
                <img src="../../assets/img/uploadpic.png" alt="">
                <a>点击上传</a>
                <div class="img_show">{{ pdfName }}</div>
                <input type="file" @change="filePdf($event)" accept=".pdf">
              </div>
              <button @click="down">下载</button>
              <p>请先下载代理合作协议，签字后以PDF格式上传</p>
            </div>
          </figure>
          <figure>
            <div class="text"><span>法人身份证：</span></div>
            <div class="right">
              <div class="box">
                <img src="../../assets/img/uploadpic.png" alt="">
                <a>请上传身份证正面</a>
                <div class="img_show"></div>
                <input type="file" @change="fileImage($event, 3)" accept="image/jpeg,image/x-png,image/gif">
              </div>
              <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
            </div>
          </figure>
          <figure>
            <div class="text"><span></span></div>
            <div class="right">
              <div class="box">
                <img src="../../assets/img/uploadpic.png" alt="">
                <a>请上传身份证反面</a>
                <div class="img_show"></div>
                <input type="file" @change="fileImage($event, 4)" accept="image/jpeg,image/x-png,image/gif">
              </div>
              <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
            </div>
          </figure>
        </div>
      </div>
      <div class="footer">
        <button @click="submit">提 交</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Req } from '../../assets/js/http.js'
export default {
  name: 'ChannelApplication',
  data () {
    return {
      msg: {
        channelName: '',
        channelUserName: '',
        address: '',
        channelUserPhone: '',
        channelIdCardUp: {},
        channelIdCardDown: {},
        channelLicenseUrl: {},
        channelProtocolUrl: {}
      },
      pdfName: ''
    }
  },
  mounted () {
  },
  methods: {
    down () {
      this.$fetch('/login/resource/show', {
        type: '1'
      }).then(res => {
        // console.log(res.data.fileurl)
        window.open(res.data.fileurl)
      })
    },
    submit () {
      if (this.msg.channelLicenseUrl.__ob__) {
        this.$message({
          type: 'error',
          message: '请先上传营业执照'
        })
      } else if (this.msg.channelProtocolUrl.__ob__) {
        this.$message({
          type: 'error',
          message: '请先上传代理商合作协议'
        })
      } else if (this.msg.channelIdCardUp.__ob__) {
        this.$message({
          type: 'error',
          message: '请先上传身份证'
        })
      } else if (this.msg.channelIdCardDown.__ob__) {
        this.$message({
          type: 'error',
          message: '请先上传身份证'
        })
      } else {
        var formData = new FormData()
        formData.append('channelName', this.msg.channelName)
        formData.append('channelUserName', this.msg.channelUserName)
        formData.append('channelUserPhone', this.msg.channelUserPhone)
        formData.append('address', this.msg.address)
        formData.append('channelIdCardUp', this.msg.channelIdCardUp)
        formData.append('channelIdCardDown', this.msg.channelIdCardDown)
        formData.append('channelLicenseUrl', this.msg.channelLicenseUrl)
        formData.append('channelProtocolUrl', this.msg.channelProtocolUrl)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$http.post(Req + '/fd/channel/insert', formData, config).then(res => {
          if (res.body.code === 0) {
            this.$router.push('/Tips')
          } else {
            this.$message({
              type: 'info',
              message: res.body.msg
            })
          }
        })
      }
    },
    filePdf (e) {
      var filepdf = e.target.files[0]
      if (filepdf.name.split('.')[1] === 'pdf') {
        var imgSize = filepdf.size / 1024
        if (imgSize > 3 * 1024) {
          this.$message({
            type: 'info',
            message: '请上传大小不要超过3M的文件'
          })
        } else {
          this.pdfName = filepdf.name
          this.msg.channelProtocolUrl = filepdf
          // console.log(filepdf)
          // e.target.parentNode.children[0].src = '../../assets/img/upload.png'
          // console.log(e.target.parentNode.children[0])
        }
      } else {
        this.$message({
          type: 'info',
          message: '请上传pdf格式的文件'
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
            // console.log(i)
            // console.log(avatar)
            e.target.previousElementSibling.style.backgroundImage = 'url(' + avatar + ')'
            if (i === 1) {
              that.msg.channelLicenseUrl = file
            }
            if (i === 3) {
              that.msg.channelIdCardUp = file
            }
            if (i === 4) {
              that.msg.channelIdCardDown = file
            }
          }
        }
      }
    },
    // 电话号码验证
    phoneNumber (event) {
      if (event.target.value === '') {
        event.target.parentNode.style.borderColor = 'red'
        this.$message({
          type: 'error',
          message: event.target.previousElementSibling.innerText + '不能为空'
        })
      } else {
        event.target.parentNode.style.borderColor = '#a0a0a0'
        if (this.msg.channelUserPhone !== '') {
          var myreg = /^[1][0-9][0-9]{9}$/
          if (!myreg.test(this.msg.channelUserPhone)) {
            event.target.parentNode.style.borderColor = 'red'
            this.$message({
              type: 'error',
              message: '手机号输入不正确'
            })
          }
        }
      }
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.ChannelApplication {
  min-height: 100%;
  background: #5783ff;
  .body {
    width: 1050px;
    background: #fff;
    margin: 0 auto;
    height: 100%;
    padding-left: 150px;
    box-shadow:0 14px 16px 10px rgba(0,0,0,0.35);
  }
  h2 {
    line-height: 100px;
    font-size: 34px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(44,44,44,1);
  }
  .basic {
    .tit {
      margin-top: 20px;
      img {
        width: 179px;
      }
    }
    .input {
      width:797px;
      height:38px;
      line-height:38px;
      border:1px solid rgba(160,160,160,1);
      border-radius:19px;
      overflow: hidden;
      margin-top: 25px;
      margin-left: 25px;
      i {
        font-style: normal;
        color: red;
        padding: 0 5px 0 10px;
      }
      input {
        width: 670px;
        line-height:38px;
        outline: none;
        border: 0;
      }
    }
  }
  .pic {
    margin-top: 30px;
    .con {
      width: 820px;
      // height: 400px;
      padding-top: 20px;
      overflow: hidden;
      figure {
        height: 200px;
        width: 50%;
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
          button {
            width:50px;
            height:26px;
            background:rgba(68,96,237,1);
            border-radius:5px;
            border: 0;
            color: #fff;
            position: absolute;
            right: 15px;
            bottom: 65px;
            outline: none;
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
  .footer {
    text-align: center;
    width:797px;
    margin-left: 25px;
    margin-top: 20px;
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
      color:rgba(254,254,254,1);
      background: linear-gradient(left, #4e8fff, #5cc5ff);
      outline: none;
    }
  }
}
</style>
