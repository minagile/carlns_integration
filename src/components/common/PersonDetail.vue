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
          <el-form-item label="姓名：" prop="customerName">
            <el-input v-model="ruleForm.customer.customerName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="customerIdcard">
            <el-input v-model="ruleForm.customer.customerIdcard" ></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="customerPhone">
            <el-input v-model="ruleForm.customer.customerPhone" ></el-input>
          </el-form-item>
          <el-form-item :label="ruleForm.obj.type === 1 ? '合格证号：' : '车架号：'" prop="carvin">
            <el-input v-model="ruleForm.obj.carvin" ></el-input>
          </el-form-item>
          <el-form-item :label="ruleForm.obj.type === 1 ? '车辆合格证：' : '车牌号：'" prop="nameplate">
            <el-input v-model="ruleForm.obj.nameplate" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 车险投保信息 -->
      <div class="tit">
        <img src="../../assets/img/car_msg.png" alt="">
      </div>
      <div class="info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
          <el-form-item label="商业险：" prop="commercial">
            <el-input v-model="ruleForm.obj.commercial"></el-input>
          </el-form-item>
          <el-form-item label="交强险：" prop="cartaffic">
            <el-input v-model="ruleForm.obj.cartaffic" ></el-input>
          </el-form-item>
          <el-form-item label="车船税：" prop="carboat">
            <el-input v-model="ruleForm.obj.carboat" ></el-input>
          </el-form-item>
          <el-form-item label="选择保单：" prop="age">
            <template>
              <el-button size="mini" plain :class="{active: 1 == ruleForm.obj.age}">一年保单</el-button>
              <el-button size="mini" plain :class="{active: 3 == ruleForm.obj.age}">三年保单</el-button>
              <span class="dai" v-if="ruleForm.obj.age === 3">
                <span>是否有车贷：</span>
                <el-radio v-model="ruleForm.obj.state" :label="2">是</el-radio>
                <el-radio v-model="ruleForm.obj.state" :label="1">否</el-radio>
              </span>
            </template>
          </el-form-item>
          <el-form-item label="月付期数：" prop="name">
            <div class="qishu">{{ruleForm.obj.stages}}</div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 图片信息 -->
      <div class="tit">
        <img src="../../assets/img/img_info.png" alt="">
      </div>
      <PicShow :imgList="tableList" :from="'查看详情'"/>
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
        customer: {
          customerName: '',
          customerIdcard: '',
          customerPhone: ''
        },
        obj: {
          carvin: '',
          nameplate: '',
          commercial: '',
          cartaffic: '',
          carboat: '',
          age: 1,
          stages: 12,
          state: 2
        }
      },
      rules: {
      }
    }
  },
  mounted () {
  },
  watch: {
    tableList (val) {
      this.ruleForm = val
    }
  },
  methods: {
  },
  components: {
    PicShow
  },
  props: {
    tableList: {
      type: Object,
      default () {
        return {}
      }
    }
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
.info {
  .active {
    border-color: #4e8fff;
  }
  .qishu {
    width:87px;
    height:28px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(46,146,255,1);
    border-radius:3px;
    text-align: center;
  }
}
</style>
