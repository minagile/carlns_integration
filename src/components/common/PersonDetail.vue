<template>
  <!-- 个人详情 -->
  <div class="person_detail">
    <div class="body">
      <!-- 用户基本信息 -->
      <div class="tit">
        <img src="../../assets/img/user_basic_info.png" alt="">
      </div>
      <div class="basic_info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="peoplename">
            <el-input v-model="ruleForm.peoplename" placeholder="请输入负责人姓名" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
          </el-form-item>
          <el-form-item label="车架号：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
          </el-form-item>
          <el-form-item label="车辆合格证：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 车险投保信息 -->
      <div class="tit">
        <img src="../../assets/img/car_msg.png" alt="">
      </div>
      <div class="info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="商业险：" prop="peoplename">
            <el-input v-model="ruleForm.peoplename" placeholder="请输入负责人姓名" disabled></el-input>
          </el-form-item>
          <el-form-item label="交强险：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
          </el-form-item>
          <el-form-item label="车船税：" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
          </el-form-item>
          <el-form-item label="选择保单：" prop="name">
            <template>
              <el-button size="mini" plain>一年保单</el-button>
              <el-button size="mini" plain>三年保单</el-button>
              <span class="dai">
                <span>是否有车贷：</span>
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio>
              </span>
            </template>
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
      <!-- 图片信息 -->
      <div class="tit">
        <img src="../../assets/img/img_info.png" alt="">
      </div>
      <PicShow />
    </div>
  </div>
</template>

<script>
import PicShow from './PicShow'
export default {
  name: 'PersonDetail',
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
  methods: {
  },
  components: {
    PicShow
  }
}
</script>

<style lang="less" scoped>
.person_detail {
  .body {
    width: 1074px;
    margin: 0 auto;
    // padding-top: 50px;
    .basic_info {
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
