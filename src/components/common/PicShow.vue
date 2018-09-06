<template>
  <div class="pic_show">
    <div class="pic">
      <figure v-for="(item, index) in list" :key="index">
        <div class="text"><span>{{ item }}</span></div>
        <div class="right">
          <div class="box"></div>
          <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
        </div>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PicShow',
  data () {
    return {
      list: ['缴费通知单：', '购车发票：', '机动车行驶证：', '身份证正面：', '身份证反面：']
    }
  }
}
</script>

<style lang="less" scoped>
.pic_show {
  .pic {
    overflow: hidden;
    // padding-top: 40px;
    padding-bottom: 20px;
    figure {
      // height: 200px;
      // width: 50%;
      padding-top: 30px;
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
          font-size: 14px;
          color: #606266;
        }
      }
      .right {
        float: left;
        width: 268px;
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
          background-image: url(../../assets/img/uploadpic.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
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
</style>
