<template>
  <!-- 申请入口 -->
  <div class="application_entrance">
    <router-view></router-view>
    <a class="enter" @click="change('Enterprise')"  >
      <img src="../assets/img/enterprise.png" alt="企业用户">
    </a>
    <a class="enter" @click="change('Personal')" >
      <img src="../assets/img/personal.png" alt="个人用户">
    </a>
  </div>
</template>

<script>
export default {
  name: 'ApplicationEntrance',
  data () {
    return {
      router: '企业用户'
    }
  },
  methods: {
    change (data) {
      this.$router.push({name: data})
    }
  }
}
</script>

<style lang="less" scoped>
.application_entrance {
  margin-top: 20px;
  height: 97%;
  background: #fff;
  display: flex;
  justify-content: space-around;
  position: relative;
  .enter {
    margin-top: 300px;
  }
}
</style>
