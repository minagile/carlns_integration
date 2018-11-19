<template>
  <div class="home">
    <TopTab @channelId="channelId" @province="province" @city="city" @region="region" @search="search"/>
    <div class="con">
      <!-- <keep-alive> -->
        <router-view :channelId="channel_id" :address="address" :search="ssss" ref="mychild"></router-view>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import TopTab from './common/TopTab'
export default {
  name: 'HomePage',
  data () {
    return {
      channel_id: '1',
      address: '',
      ssss: ''
    }
  },
  methods: {
    channelId (id) {
      this.channel_id = id
      this.$refs.mychild.changedMonth(new Date().getMonth() + '/' + new Date().getFullYear())
    },
    province (data) {
      this.address = data
    },
    city (data) {
      this.address = data
    },
    region (data) {
      this.address = data
    },
    search (data) {
      this.ssss = data
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
