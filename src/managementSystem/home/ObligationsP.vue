<template>
  <!-- 待付款-个人 -->
  <div class="obligations_p">
    <div class="con">
      <div class="body">
        <header>
          <div class="itm">
            <img src="../../assets/mImg/moneybag.png" alt="">
            <span>状态：123123</span>
          </div>
          <div class="itm">
            <img src="../../assets/mImg/time.png" alt="">
            <span>提交时间：123123</span>
          </div>
        </header>
        <div class="tit">
          <img src="../../assets/mImg/user_msg.png" alt="">
        </div>
        <div class="msg">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="姓名：" prop="peoplename">
              <el-input v-model="ruleForm.peoplename" disabled></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="车架号：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="车辆合格证:" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/toubao.png" alt="">
        </div>
        <div class="msg">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="商业险：" prop="peoplename">
              <el-input v-model="ruleForm.peoplename" disabled></el-input>
            </el-form-item>
            <el-form-item label="交强险：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="车船税：" prop="phone">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="选择保单：" prop="phone">
              <el-button :class="{active: 1 == baodan}">一年保单</el-button>
              <el-button :class="{active: 3 == baodan}">三年保单</el-button>
              <el-button type="text">是否有车贷：
                <el-radio v-model="radio" label="2">是</el-radio>
                <el-radio v-model="radio" label="1">否</el-radio>
              </el-button>
            </el-form-item>
            <el-form-item label="月付期数：" prop="phone">
              <el-button class="active">12</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/picmsg.png" alt="">
        </div>
        <PicShow />
        <div class="btn">
          <button class="p" @click="dialogFormVisible = true">确定付款</button>
          <button>返回</button>
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
  name: 'ObligationsP',
  data () {
    return {
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
      baodan: 1,
      radio: '1'
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
