<template>
  <!-- 待分期--个人详情 -->
  <div class="detail_p">
    <div class="body">
      <!-- 用户基本信息 -->
      <div class="tit">
        <img src="../../assets/img/user_basic_info.png" alt="">
      </div>
      <div class="basic_info"></div>
      <!-- 车险投保信息 -->
      <div class="tit">
        <img src="../../assets/img/car_msg.png" alt="">
      </div>
      <!-- 图片信息 -->
      <div class="tit">
        <img src="../../assets/img/img_info.png" alt="">
      </div>
      <div class="btn">
        <button class="save">保存</button>
        <span style="padding: 0 115px;"></span>
        <button>返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailP',
  data () {
    return {
    }
  },
  mounted () {},
  methods: {
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
    .pic {
      overflow: hidden;
      padding-top: 40px;
      padding-bottom: 80px;
      figure {
        // height: 200px;
        // width: 50%;
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
}
</style>
