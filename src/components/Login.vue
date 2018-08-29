<template>
  <div class="login">
    <el-card class="box-card" :body-style="{ padding: '50px 57px 0 53px' }">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px;font-family:PingFang-SC-Regular;">欢迎登录</span>
      </div>
      <div class="text item">
        <p>账号</p>
        <input type="text">
        <p>密码</p>
        <input type="text" name="" id="">
        <button @click="$router.push('/HomePage')">登 录</button>
        <p class="last">
          <a>忘记密码？</a>
          <a class="l" href="/#/ChannelApplication">点我进行渠道代理申请</a>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-image: url(../assets/img/bg.png);
  // background-size: 100% 100%;
  background-position: center center;
  // background-size: contain;
  position: relative;
  .el-card {
    width:452px;
    height:504px;
    background:rgba(67,119,227,1);
    opacity:0.91;
    border-radius:10px;
    box-shadow:9px 10px 13px rgba(0,0,0,0.55);
    border: 0;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -330px;
    margin-left: -226px;
    p {
      line-height: 34px;
      text-indent: 24px;
      font-size: 14px;
      &.last {
        padding-top: 35px;
        a {
          float: left;
          cursor: pointer;
          &:hover {
            color: blue;
            text-decoration: underline;
          }
          &.l {
            float: right;
            margin-right: 20px;
          }
        }
      }
    }
    input {
      width:342px;
      height:48px;
      background:rgba(232,232,234,1);
      opacity:0.32;
      border-radius:24px;
      border: 0;
      display: block;
      outline: none;
      text-indent: 30px;
    }
    button {
      width:342px;
      margin-top: 30px;
      height:48px;
      background:rgba(248,155,130,1);
      border-radius:24px;
      border: 0;
      font-size:22px;
      font-family:PingFang-SC-Regular;
      font-weight: 500;
      color:rgba(255,255,255,1);
      transition: 1s;
      cursor: pointer;
      outline: none;
      &:hover {
        transition: 1s;
        background: rgb(255, 139, 107);
      }
    }
  }
}
</style>
