<template>
  <!-- 待分期--个人详情 -->
  <div class="detail_p">
    <div class="body">
      <PersonDetail/>
      <div class="btn">
        <button class="save" @click="dialogFormVisible = true">付款</button>
        <span style="padding: 0 115px;"></span>
        <button>返回</button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="713px">
      <template>
        <div class="header">
          <span>支付信息</span>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号：" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" :label-width="formLabelWidth">
          <template>
            <input v-model="form.name">
            <el-button class="code" @click="getCode">获取验证码<span v-show="second">{{count}}s</span></el-button>
            <el-radio v-model="form.name" label="1">备选项</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确认支付</el-button>
        <el-button @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PersonDetail from '../common/PersonDetail'
export default {
  name: 'DetailP',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '140px',
      count: 60,
      clock: '',
      second: false
    }
  },
  mounted () {},
  methods: {
    getCode () {
      if (this.second === false) {
        this.second = true
        this.countDown()
      }
    },
    countDown () {
      this.clock = window.setInterval(() => {
        this.count--
        if (this.count < 1) {
          clearInterval(this.clock)
          this.second = false
        }
      }, 1000)
    }
  },
  components: {
    PersonDetail
  }
}
</script>

<style lang="less" scoped>
.detail_p {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 99999;
  .body {
    width: 1074px;
    margin: 0 auto;
    padding-top: 50px;
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
  }
  .el-dialog {
    .el-input {
      width: 85%;
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      background: #2E92FF;
      text-indent: 10px;
      color: #fff;
      width: 100%;
      height: 40px;
      line-height: 40px;
      span {
        font-size: 18px;
      }
    }
    input {
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 125px;
    }
    .code {
      background: #ccc;
      color: #fff;
    }
  }
}
</style>
