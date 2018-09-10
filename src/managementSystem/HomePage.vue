<template>
  <div class="home">
    <TopTab />
    <div class="con">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopTab from './common/TopTab'
export default {
  name: 'HomePage',
  data () {
    return {}
  },
  components: {
    TopTab
  }
}
</script>

<style lang="less" scoped>
.home {
  background: #E0E0E0;
  height: 100%;
  .con {
    height: calc(100% - 60px);
  }
}
</style>
