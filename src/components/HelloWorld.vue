<template>
  <div class="hello">
    <el-container>
      <el-aside width="200px">
        <SideBar @getNavLink="getNavLink"/>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-d-arrow-right">
            <el-breadcrumb-item v-for="(list, index) in currentListLink" :key="index" :to="{ name: list }">{{ list | breadcrumb }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div style="float:right;">
            <!-- <el-button type="text">
              <img src="../assets/img/per.png" alt="">
              {{ username }}
            </el-button>
            <el-button type="text" @click="loginout">
              <img src="../assets/img/loginout.png" alt="">
              退出登录
            </el-button> -->
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="../assets/img/per.png" alt="">
                {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <span @click="loginout"><el-dropdown-item><img src="../assets/img/loginout.png" alt="">退出登录</el-dropdown-item></span>
                <span @click="changePwd"><el-dropdown-item><img src="../assets/img/changePwd.png" alt="" style="width:20px">修改密码</el-dropdown-item></span>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 修改密码弹窗 -->
    <el-dialog
      :show-close = false
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="450px">
      <template>
        <div class="header">
          <h2>
            <span>修改密码</span>
          </h2>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录密码:" prop="oldPwd">
            <el-input v-model="ruleForm.oldPwd" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <div class="fenye1">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
          </div>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import HomePage from './HomePage'
import SideBar from './common/SideBar'
export default {
  name: 'HelloWorld',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateOldpwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登录密码'))
      } else if (value !== sessionStorage.getItem('pwd')) {
        callback(new Error('登录密码错误'))
      } else {
        callback()
      }
    }
    return {
      currentList: [],
      currentListLink: [],
      username: '',
      dialogVisible: false,
      ruleForm: {
        oldPwd: '',
        pass: '',
        checkPass: '',
        id: ''
      },
      rules: {
        oldPwd: [
          { required: true, validator: validateOldpwd, trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  // 获取路由信息
  beforeRouteUpdate (to, from, next) {
    let arr = to.path.split('/')
    arr.splice(0, 1)
    this.currentList = arr
    this.currentListLink = arr
    next()
  },
  mounted () {
    // 用户名展示
    this.username = sessionStorage.getItem('username')
  },
  methods: {
    // 侧边栏切换时面包屑导航的展示
    getNavLink (data) {
      this.currentListLink[0] = data
    },
    loginout () {
      sessionStorage.clear()
      this.$router.push('/')
    },
    changePwd () {
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post('/fd/RAM/changePW', {
            'oldPass': this.ruleForm.oldPwd,
            'newPass': this.ruleForm.pass
          }).then(res => {
            if (res.code === 0) {
              this.$message({type: 'success', message: res.msg})
              this.forget = true
            } else {
              this.$message(res.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  },
  components: {
    SideBar,
    HomePage
  },
  filters: {
    // 面包屑导航
    breadcrumb (data) {
      if (data === 'HomePage') return '首页'
      if (data === 'ApplicationEntrance') return '申请入口'
      if (data === 'Enterprise') return '企业用户'
      if (data === 'Personal') return '个人用户'
      if (data === 'StayByStage') return '待分期'
      if (data === 'DetailC') return '企业详情查看'
      if (data === 'DetailP') return '个人详情查看'
      if (data === 'ADetailC') return '企业详情查看'
      if (data === 'ADetailP') return '个人详情查看'
      if (data === 'NDetailC') return '企业详情查看'
      if (data === 'NDetailP') return '个人详情查看'
      if (data === 'CenDetailC') return '企业详情查看'
      if (data === 'CenDetailP') return '个人详情查看'
      if (data === 'AlreadyByStage') return '已分期'
      if (data === 'NotThrough') return '未通过'
      if (data === 'RetreatCenter') return '退保中心'
      if (data === 'DecisionSupport') return '决策支持'
      if (data === 'AccountManagement') return '账号管理'
      return data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
  .header {
      position: absolute;
      top: 0;
      left: 0;
      background: #4C87FF;
      color: white;
      text-indent: 35px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 18px;
      }
      h2 {
        padding-left: 10px;
        img {
          vertical-align: middle;
        }
        span {
          font-size:18px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:white;
        }
      }
    }
  height: 100%;
  background: #e4e4e4;
  .el-container {
    height: 100%;
    width: 100%;
  }
  .el-header {
    height: 58px;
    line-height: 58px;
    background: rgba(255, 255, 255, 1);
    .el-breadcrumb {
      line-height: 58px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      float: left;
      .is-link {
        font-weight: 400;
      }
    }
    .el-dropdown {
      font-size: 16px;
      color: #4C87FF;
      img {
        vertical-align: text-bottom;
        margin: 0;
      }
    }
  }
  .el-main {
    padding: 0;
    height: 100%;
    .el-col-4 {
      width: 20%;
      .grid-content {
        border-radius: 10px;
        min-height: 36px;
        height: 93px;
        line-height: 93px;
        img {
          vertical-align: middle;
          margin-left: 5%;
          margin-right: 5%;
          width: 50px;
        }
        i {
          font-style: normal;
          // display: inline-block;
          width: 27px;
          height: 27px;
          line-height: 27px;
          background: rgba(255, 193, 7, 1);
          border-radius: 50%;
          color: #fff;
          text-align: center;
          margin-right: 6%;
          margin-top: 33px;
          float: right;
        }
      }
    }
    .el-row {
      margin-top: 23px;
      margin-bottom: 20px;
      margin-right: 13px !important;
      min-width: 1050px;
    }
    .el-col {
      border-radius: 10px;
    }
    .bg-purple-dark {
      background: #fff;
    }
    .bg-purple {
      background: #fff;
    }
    .grid-content {
      border-radius: 10px;
      min-height: 36px;
      height: 633px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }
}
img {
  vertical-align: text-bottom;
  margin-right: 10px;
}
.el-form {
  margin-right: 31px;
}
.fenye1 {
  text-align: right;
}
</style>
