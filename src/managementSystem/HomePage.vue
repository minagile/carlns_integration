<template>
  <div class="home">
    <TopTab @channelId="channelId" />
    <div class="con">
      <router-view :channelId="channel_id"></router-view>
    </div>
  </div>
</template>

<script>
import TopTab from './common/TopTab'
export default {
  name: 'HomePage',
  data () {
    return {
      channel_id: '1'
    }
  },
  methods: {
    channelId (id) {
      this.channel_id = id
    }
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
