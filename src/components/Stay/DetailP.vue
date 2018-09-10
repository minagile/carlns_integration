<template>
  <!-- 待分期--个人详情 -->
  <div class="detail_p">
    <div class="body">
      <PersonDetail/>
      <div class="btn">
        <button class="save">保存</button>
        <span style="padding: 0 115px;"></span>
        <button>返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import PersonDetail from '../common/PersonDetail'
export default {
  name: 'DetailP',
  data () {
    return {
    }
  },
  mounted () {},
  methods: {
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
}
</style>
