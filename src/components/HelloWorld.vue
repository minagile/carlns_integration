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
            <el-button type="text">
              <img src="../assets/img/per.png" alt="">
              {{ username }}
            </el-button>
            <el-button type="text" @click="loginout">
              <img src="../assets/img/loginout.png" alt="">
              退出登录
            </el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomePage from './HomePage'
import SideBar from './common/SideBar'
export default {
  name: 'HelloWorld',
  data () {
    return {
      currentList: [],
      currentListLink: [],
      username: ''
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
    // this.$get('/fd/company/selectCompany').then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    // 侧边栏切换时面包屑导航的展示
    getNavLink (data) {
      this.currentListLink[0] = data
    },
    loginout () {
      sessionStorage.clear()
      this.$router.push('/Login')
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
      if (data === 'AlreadyByStage') return '已分期'
      if (data === 'NotThrough') return '未通过'
      if (data === 'RetreatCenter') return '退保中心'
      return data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
  height: 100%;
  background: #e4e4e4;
  .el-container {
    height: 100%;
    width: 100%;
  }
  .el-header {
    height: 58px;
    line-height: 58px;
    background:rgba(255,255,255,1);
    .el-breadcrumb {
      line-height: 58px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color:rgba(102,102,102,1);
      float: left;
      .is-link {
        font-weight: 400;
      }
    }
    .el-button {
      font-size: 16px;
      img {
        vertical-align: middle;
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
          background:rgba(255,193,7,1);
          border-radius:50%;
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
</style>
