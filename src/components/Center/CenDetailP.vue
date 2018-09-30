<template>
  <!-- 未通过--个人详情 -->
  <div class="cen_detail_p">
    <!-- 未通过--个人详情 -->
    <!-- <div class="no-through">
      <div><img src="../../assets/img/danger.png" style="margin: 5px 30px 0 0;">审核未通过原因：图片不清晰，身份证正反面不清晰</div>
    </div> -->
    <div class="zujian">
      <PersonDetail :tableList="data"/>
    </div>
    <div class="btn">
      <!-- <button class="save" @click="$router.go(-1)">确定</button>
      <span style="padding: 0 115px;"></span> -->
      <button @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>

<script>
import PersonDetail from '../common/PersonDetail'
export default {
  name: 'CenDetailP',
  data () {
    return {
      dialogFormVisible: false,
      data: {}
    }
  },
  deactivated () {
    this.$destroy()
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$fetch('/fd/insure/selectDetail', {
        id: this.$route.query.id,
        type: 1
      }).then(res => {
        // console.log(res.data.result)
        this.data = res.data.result
        this.ruleForm = res.data.result.customer
        if (res.code !== 0) {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {
    PersonDetail
  }
}
</script>

<style lang="less" scoped>
.cen_detail_p {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 5;
  .no-through {
    width:995px;
    height:60px;
    line-height:60px;
    background:rgba(243,247,255,1);
    border:1px solid rgba(68,123,237,1);
    border-radius:5px;
    font-size:18px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,150,0,1);
    text-align: center;
    margin: 43px auto 0;
  }
  .top {
    width: 990px;
    padding: 0 10px;
    height: 60px;
    line-height:60px;
    background:rgba(243,247,255,1);
    border:1px solid rgba(68,123,237,1);
    opacity:0.98;
    border-radius:5px;
    margin: 44px auto 0;
    display: flex;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
    z-index: 1;
    li {
      img {
        vertical-align:middle;
      }
      span {
        padding: 0 5px;
        font-size: 18px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(68,123,237,1);
      }
    }
    .list {
      position: absolute;
      width:100%;
      height:674px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(238,238,238,1);
      box-shadow:0px 5px 5px rgba(0,0,0,0.35);
      top: 61px;
      left: 0;
      display: none;
      // z-index: 999;
      header {
        width:100%;
        height:53px;
        line-height:53px;
        background:rgba(223,235,255,1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2 {
          padding-left: 10px;
          img {
            vertical-align: middle;
          }
          span {
            font-size:18px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(68,123,237,1);
          }
        }
        span {
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(68,123,237,1);
        }
        button {
          margin-right: 10px;
          width:50px;
          height:20px;
          background:rgba(255,255,255,1);
          border-radius:10px;
          color: #2E92FF;
        }
      }
      .stages {
        max-height: 600px;
        overflow-y: scroll;
        padding: 20px 0;
        ul {
          float: left;
          width: 25%;
          text-align: center;
          li {
            line-height: 40px;
            font-size: 14px;
            &:first-of-type {
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .zujian {
    position: relative;
    padding-top: 50px;
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
  .el-dialog {
    .el-input {
      width: 90%;
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      background: #447BED;
      color: #fff;
      width: 100%;
      height: 40px;
      line-height: 40px;
      img {
        vertical-align:  middle;
        padding: 0 10px;
      }
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
      width: 100px;
    }
    .code {
      background: #ccc;
      color: #fff;
    }
    .el-radio+.el-radio {
      margin: 0;
    }
  }
}
</style>
