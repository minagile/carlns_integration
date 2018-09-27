<template>
  <div class="Tips">
    <div class="body" v-if="jump">
      <header>
        <p>您的信息已提交我们会再2个工作日内审核，</p>
        <p>审核成功会以短信方式告知</p>
      </header>
      <div class="con">
        <h2>请准备好以下材料:</h2>
        <div class="box">
          <p>1、营业执照及银行开户行许可证（复印件加盖公章）</p>
          <p>2、法人身份证（复印件加盖公章）</p>
          <p>3、负责人身份证（复印件加盖公章）</p>
          <p>4、代理商合作协议（加盖公章）</p>
        </div>
      </div>
      <div class="con">
        <h2>邮寄至：</h2>
        <div class="box">
          <p>上海市虹口区大连路1053号C座305-306室</p>
          <p>联系人：王先生</p>
          <p>电 话：021-65033858</p>
        </div>
      </div>
      <div class="footer">
        <button @click="countDown">确 定</button>
      </div>
    </div>
    <div class="jump" v-if="!jump">
      <img src="../../assets/img/success.png" alt="">
      <p>提交成功，{{ total }}S后自动跳转到登录页</p>
      <button @click="router">快速回到登录页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  data () {
    return {
      jump: true,
      total: 5,
      clock: ''
    }
  },
  methods: {
    router () {
      this.$router.push('/')
      clearInterval(this.clock)
    },
    countDown () {
      this.jump = false
      this.clock = window.setInterval(() => {
        this.total--
        if (this.total < 1) {
          clearInterval(this.clock)
          this.$router.push('/')
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.Tips {
  min-height: 100%;
  background: #5783ff;
  .body {
    width: 1050px;
    background: #fff;
    margin: 0 auto;
    height: 100%;
    // padding-left: 150px;
    box-shadow:0 14px 16px 10px rgba(0,0,0,0.35);
  }
  header {
    padding: 30px 0;
    width: 760px;
    margin: 0 auto;
    p {
      line-height: 50px;
      font-size: 30px;
      color: #447BED;
    }
  }
  .con {
    width: 760px;
    margin: 0 auto 40px;
    h2 {
      padding-bottom: 20px;
      color: #333;
      font-size: 30px;
    }
    .box {
      width:758px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      box-shadow:4px 3px 9px rgba(0,0,0,0.55);
      padding: 20px 22px;
      p {
        line-height: 60px;
        font-size: 20px;
        color: #333;
      }
    }
  }
  .footer {
    text-align: center;
    width: 760px;
    margin: 0 auto;
    button {
      width: 210px;
      height: 57px;
      line-height: 57px;
      border: 0;
      border-radius: 57px;
      margin-bottom: 25px;
      font-size:20px;
      font-family:PingFang-SC-Bold;
      font-weight: 600;
      color:rgba(254,254,254,1);
      background: linear-gradient(left, #4e8fff, #5cc5ff);
      outline: none;
    }
  }
  .jump {
    text-align: center;
    img {
      padding-top: 240px;
    }
    p {
      color: #fff;
      font-size: 30px;
      padding: 80px 0;
    }
    button {
      width:252px;
      height:60px;
      background:rgba(255,255,255,1);
      border-radius:30px;
      font-size:24px;
      font-family:PingFang-SC-Bold;
      // font-weight:bold;
      color:rgba(68,123,237,1);
      border: 0;
      outline: none;
    }
  }
}
</style>
