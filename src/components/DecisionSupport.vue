<template>
  <!-- 决策支持 -->
  <div class="decision_support">
    <header>
      决策支持
    </header>
    <div class="con"></div>
  </div>
</template>

<script>
export default {
  name: 'DecisionSupport',
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.decision_support {
  margin-top: 20px;
  height: 97%;
  // background: #fff;
  position: relative;
  header {
    background: #fff;
    // height: 110px;
    padding: 30px 0 30px 25px;
  }
  .con {
    background: #fff;
    margin-top: 20px;
    height: 86%;
  }
}
</style>
