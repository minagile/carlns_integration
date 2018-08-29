<template>
  <div class="hello">
    <el-container>
      <el-aside width="200px">
        <SideBar @getNav="getNav" @getNavLink="getNavLink"/>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-d-arrow-right">
            <el-breadcrumb-item v-for="(list, index) in currentList" :key="index" :to="{ path: currentListLink[index] }">{{ list }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div style="float:right;">
            <el-button type="text">
              <img src="../assets/img/per.png" alt="">
              用户名
            </el-button>
            <el-button type="text" @click="$router.push('/Login')">
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
      currentListLink: []
    }
  },
  mounted () {
  },
  methods: {
    getNavLink (data) {
      this.currentListLink[0] = data
    },
    getNav (data) {
      this.currentList[0] = data
    }
  },
  components: {
    SideBar,
    HomePage
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
