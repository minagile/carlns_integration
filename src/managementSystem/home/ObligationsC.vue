<template>
  <!-- 待审核-企业 -->
  <div class="obligations_c">
    <header>
      <el-table :data="tableData" style="width: 1127px;">
        <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
      </el-table>
    </header>
    <div class="con">
      <div class="box">
        <div class="tit">
          <img src="../../assets/mImg/usermsg.png" alt="">
        </div>
        <div class="msg">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="企业名称：" prop="peoplename">
              <el-input v-model="ruleForm.peoplename" disabled></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系地址：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/user_msg.png" alt="">
        </div>
        <div class="pic">
          <PicShow/>
        </div>
        <div class="btn">
          <button class="p" @click="dialogFormVisible = true">确定付款</button>
          <button>返回</button>
        </div>
      </div>
    </div>
    <!-- 弹窗-上传付款计划表 -->
    <el-dialog :show-close="false" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="770px">
      <template>
        <div class="header">
          <span>上传付款计划表</span>
        </div>
      </template>
      <div class="upload">
        <img src="../../assets/mImg/upload.png" alt="">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn" @click="dialogFormVisible = false">取消</el-button>
        <el-button class="button" @click="dialogFormVisible = false">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PicShow from '../../components/common/PicShow'
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
      num: 0
    }
  },
  methods: {
    tab (i) {
      this.num = i
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
    height: 390px;
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
