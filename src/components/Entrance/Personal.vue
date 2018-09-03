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
          <el-form-item label="姓名：" prop="peoplename">
            <el-input v-model="ruleForm.peoplename" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <div class="choose">
            <div class="license p">
              <el-radio v-model="radio" label="1">车辆合格证：</el-radio>
              <el-input size="mini" v-model="ruleForm.name" placeholder="请输入您的合格证号"></el-input>
            </div>
            <div class="carnumber p">
              <el-radio v-model="radio" label="2">车牌号：</el-radio>
              <el-input size="mini" v-model="ruleForm.name" placeholder="请输入您的车牌号" disabled></el-input>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 车险投保信息 -->
    <div class="con">
      <div class="tit">
        <img src="../../assets/img/upload_pic_txt.png" alt="">
      </div>
      <div class="info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="peoplename">
            <el-input v-model="ruleForm.peoplename" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="选择保单：" prop="name">
            <el-radio-group v-model="ruleForm.name" size="small">
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
        </el-form>
      </div>
    </div>
    <!-- 上传图片信息 -->
    <div class="con">
      <div class="tit">
        <img src="../../assets/img/car_msg.png" alt="">
      </div>
      <div class="pic">
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
        <figure>
          <div class="text"><span>身份证正面：</span></div>
          <div class="right">
            <div class="box">
              <img src="../../assets/img/uploadpic.png" alt="">
              <a>请上传身份证正面</a>
              <input type="file">
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
              <input type="file">
            </div>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
      </div>
    </div>
   <footer>
      <button>保存</button>
   </footer>
  </div>
</template>

<script>
export default {
  name: 'Personal',
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
      }
    }
  },
  mounted () {},
  methods: {}
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
}
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
</style>
