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
          <el-form-item label="企业名称：" prop="name">
            <el-select v-model="value8" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人姓名：" prop="peoplename">
            <el-input v-model="ruleForm.peoplename" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
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
              <input type="file" @change="fileImage($event)" accept="image/jpeg,image/x-png,image/gif" />
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
              <input type="file" @change="fileImage($event)" accept="image/jpeg,image/x-png,image/gif" />
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
              <input type="file" @change="fileImage($event)" accept="image/jpeg,image/x-png,image/gif" />
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
          <div class="bigbox"></div>
        </div>
        <button class="save">保存</button>
        <span style="padding: 0 115px;"></span>
        <button>返回</button>
      </div>
      <!-- 单辆投保 -->
      <div class="single" v-show="singleShow">
        <el-form :model="form" :rules="rules" ref="form" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="车架号：" prop="name">
            <el-input v-model="form.name" placeholder="请输入车架号"></el-input>
          </el-form-item>
          <div class="choose">
            <div class="license p">
              <el-radio v-model="radio" label="1">车辆合格证：</el-radio>
              <el-input size="mini" v-model="form.name" placeholder="请输入您的合格证号"></el-input>
            </div>
            <div class="carnumber p">
              <el-radio v-model="radio" label="2">车牌号：</el-radio>
              <el-input size="mini" v-model="form.name" placeholder="请输入您的车牌号" disabled></el-input>
            </div>
          </div>
          <el-form-item label="商业险：" prop="name">
            <el-input v-model="form.name" placeholder="请输入商业险"></el-input>
          </el-form-item>
          <el-form-item label="交强险：" prop="name">
            <el-input v-model="form.name" placeholder="请输入交强险"></el-input>
          </el-form-item>
          <el-form-item label="车船税：" prop="name">
            <el-input v-model="form.name" placeholder="请输入车船税"></el-input>
          </el-form-item>
          <el-form-item label="选择保单：" prop="name">
            <el-radio-group v-model="form.name" size="small">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="月付期数：" prop="name">
            <el-select v-model="value8" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <div class="pic">
            <figure>
              <div class="text"><span>缴费通知单：</span></div>
              <div class="right">
                <div class="box">
                  <img src="../../assets/img/uploadpic.png" alt="">
                  <a>点击上传</a>
                  <input type="file">
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
                  <input type="file">
                </div>
                <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
              </div>
            </figure>
            <figure>
              <div class="text"><span>机动车行驶证：</span></div>
              <div class="right">
                <div class="box">
                  <img src="../../assets/img/uploadpic.png" alt="">
                  <a>点击上传</a>
                  <input type="file">
                </div>
                <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
              </div>
            </figure>
          </div> -->
        </el-form>
        <button class="save">保存</button>
        <span style="padding: 0 115px;"></span>
        <button>返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Enterprise',
  data () {
    return {
      radio: '1',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value8: '',
      ruleForm: {
        name: '',
        peoplename: '',
        phone: ''
      },
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        peoplename: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      formrules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      batchShow: false,
      singleShow: false,
      active: 'none'
    }
  },
  methods: {
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
    fileImage (e) {
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
