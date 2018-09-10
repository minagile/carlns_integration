<template>
  <div class="top">
    <div class="tab">
      <ul>
        <li v-for="(data, index) in list" :key="index" :class="{active: index == num}" @click="tab(index)" @mousemove="tabmove(index)">
          <a>{{ data }}</a>
        </li>
        <div class="tuibao" v-show="retreats">
          <div class="li"><a>退保中</a></div>
          <div class="li"><a>已退保</a></div>
        </div>
      </ul>
    </div>
    <div class="user">
      <a>
        <img src="../../assets/mImg/user.png" alt="">
        用户名
      </a>
      <a>
        <img src="../../assets/mImg/out.png" alt="">
        退出登录
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopTab',
  data () {
    return {
      list: ['全部渠道', '待付款', '已分期', '退保中心', '渠道', '报表', '系统'],
      listLink: ['全部渠道', '待付款', '已分期', '退保中心', '渠道', '报表', 'System'],
      num: 0,
      retreats: false
    }
  },
  methods: {
    tabmove (i) {
      // console.log(i)
      if (i === 3) {
        this.retreats = true
      } else {
        this.retreats = false
      }
    },
    tab (index) {
      this.num = index
      this.$router.push({name: this.listLink[index]})
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  height: 60px;
  line-height: 60px;
  background:rgba(255,193,7,1);
  box-shadow:0px 0px 10px rgba(4,0,0,0.06);
  display: flex;
  justify-content: center;
  min-width: 1170px;
  .tab {
    height: 60px;
    width: 90%;
    display: flex;
    justify-content: center;
    ul {
      position: relative;
      .tuibao {
        position: absolute;
        top: 60px;
        left: 387px;
        width:134px;
        height:100px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(0,0,0,0.35);
        .li {
          cursor: pointer;
          line-height: 50px;
          text-indent: 20px;
          &:hover {
            background: #FFD100;
          }
        }
      }
    }
    li {
      float: left;
      height: 60px;
      padding: 0 10px;
      a {
        display: block;
        line-height: 60px;
        padding: 0 26px;
        cursor: pointer;
        &:hover {
          background: #282828;
          color: rgba(255,193,7,1);
        }
      }
      &.active a {
        background: #282828;
        color: rgba(255,193,7,1);
      }
    }
  }
  .user {
    width: 240px;
    a {
      padding: 0 10px;
    }
    img {
      vertical-align: middle;
    }
  }
}
</style>
