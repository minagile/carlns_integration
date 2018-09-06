<template>
  <!-- 已分期--企业详情 -->
  <div class="a_detail_c">
    <div class="table">
      <table>
        <tr>
          <td>车架号</td>
          <td>车架号</td>
          <td>车架号</td>
          <td>车架号</td>
          <td>车架号</td>
          <td>车架号</td>
          <td>车架号</td>
          <td>车架号</td>
          <td>车架号</td>
        </tr>
      </table>
    </div>
    <!-- 客户基本信息 -->
    <div class="basic">
      <div class="tit">
        <img src="../../assets/img/user_basic_info.png" alt="">
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
        <el-form-item label="姓名：" prop="peoplename">
          <el-input v-model="ruleForm.peoplename" placeholder="请输入负责人姓名" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入联系方式" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 图片信息 -->
    <div class="pic">
      <div class="tit">
        <img src="../../assets/img/img_info.png" alt="">
      </div>
      <PicShow/>
    </div>
    <div class="btn">
      <button class="save">确定</button>
      <span style="padding: 0 115px;"></span>
      <button @click="$router.push({name: 'AlreadyByStage'})">返回</button>
    </div>
  </div>
</template>

<script>
import PicShow from '../common/PicShow'
export default {
  name: 'ADetailC',
  data () {
    return {
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
  components: {
    PicShow
  }
}
</script>

<style lang="less" scoped>
.a_detail_c {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 99999;
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
