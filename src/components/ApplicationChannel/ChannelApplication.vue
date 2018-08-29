<template>
  <div class="ChannelApplication">
    <div class="body">
      <h2>欢迎来到渠道代理申请</h2>
      <div class="basic">
        <div class="tit">
          <img src="../../assets/img/white_msg.png" alt="">
        </div>
        <div class="input">
          <i>*</i>
          <span>企业名称：</span>
          <input type="text" placeholder="请输入企业名称">
        </div>
        <div class="input">
          <i>*</i>
          <span>企业名称：</span>
          <input type="text" placeholder="请输入企业名称">
        </div>
        <div class="input">
          <i>*</i>
          <span>企业名称：</span>
          <input type="text" placeholder="请输入企业名称">
        </div>
        <div class="input">
          <i>*</i>
          <span>企业名称：</span>
          <input type="text" placeholder="请输入企业名称">
        </div>
      </div>
      <div class="basic pic">
        <div class="tit">
          <img src="../../assets/img/upload_pic_txt.png" alt="">
        </div>
        <div class="con">
          <figure>
            <div class="text"><span>营业执照：</span></div>
            <div class="right">
              <div class="box">
                <img src="../../assets/img/uploadpic.png" alt="">
                <a>点击上传</a>
                <input type="file">
              </div>
              <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
            </div>
          </figure>
          <figure>
            <div class="text"><span>代理商合作协议：</span></div>
            <div class="right">
              <div class="box">
                <img src="../../assets/img/uploadpic.png" alt="">
                <a>点击上传</a>
                <input type="file">
              </div>
              <button>下载</button>
              <p>请先下载代理合作协议，签字后以PDF格式上传</p>
            </div>
          </figure>
          <figure>
            <div class="text"><span>法人身份证：</span></div>
            <div class="right">
              <div class="box">
                <img src="../../assets/img/uploadpic.png" alt="">
                <a>请上传身份证正面</a>
                <input type="file">
              </div>
              <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
            </div>
          </figure>
          <figure>
            <div class="text"><span></span></div>
            <div class="right">
              <div class="box">
                <img src="../../assets/img/uploadpic.png" alt="">
                <a>请上传身份证反面</a>
                <input type="file">
              </div>
              <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
            </div>
          </figure>
        </div>
      </div>
      <div class="footer">
        <button @click="$router.push('/Tips')">提 交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChannelApplication',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
.ChannelApplication {
  min-height: 100%;
  background: #5783ff;
  .body {
    width: 1050px;
    background: #fff;
    margin: 0 auto;
    height: 100%;
    padding-left: 150px;
    box-shadow:0 14px 16px 10px rgba(0,0,0,0.35);
  }
  h2 {
    line-height: 100px;
    font-size: 34px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(44,44,44,1);
  }
  .basic {
    .tit {
      margin-top: 20px;
      img {
        width: 179px;
      }
    }
    .input {
      width:797px;
      height:38px;
      line-height:38px;
      border:1px solid rgba(160,160,160,1);
      border-radius:19px;
      overflow: hidden;
      margin-top: 25px;
      margin-left: 25px;
      i {
        font-style: normal;
        color: red;
        padding: 0 5px 0 10px;
      }
      input {
        width: 670px;
        line-height:38px;
        outline: none;
        border: 0;
      }
    }
  }
  .pic {
    margin-top: 30px;
    .con {
      width: 820px;
      // height: 400px;
      padding-top: 20px;
      overflow: hidden;
      figure {
        height: 200px;
        width: 50%;
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
          }
        }
        .right {
          float: left;
          width: 270px;
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
          button {
            width:50px;
            height:26px;
            background:rgba(68,96,237,1);
            border-radius:5px;
            border: 0;
            color: #fff;
            position: absolute;
            right: 15px;
            bottom: 65px;
            outline: none;
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
  .footer {
    text-align: center;
    width:797px;
    margin-left: 25px;
    margin-top: 20px;
    button {
      width: 210px;
      height: 57px;
      line-height: 57px;
      border: 0;
      border-radius: 57px;
      margin-bottom: 40px;
      font-size:20px;
      font-family:PingFang-SC-Bold;
      font-weight: 600;
      color:rgba(254,254,254,1);
      background: linear-gradient(left, #4e8fff, #5cc5ff);
      outline: none;
    }
  }
}
</style>
