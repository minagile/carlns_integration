<template>
  <!-- 侧边栏 -->
  <div class="side_bar">
    <ul>
      <li>
        <a :class="{active:1 == num}"  @click="tab(1)">
          <img src="../../assets/img/home_page.png" alt="">
          <span slot="title">首页</span>
        </a>
      </li>
      <li>
        <a :class="{active:2 == num}"  @click="tab(2)">
          <img src="../../assets/img/application_entrance.png" alt="">
          <span slot="title">申请入口</span>
        </a>
      </li>
      <li>
        <a :class="{active:3 == num}"  @click="tab(3)">
          <img src="../../assets/img/wait_staging.png" alt="">
          <span slot="title">待分期</span>
        </a>
      </li>
      <li>
        <a :class="{active:4 == num}"  @click="tab(4)">
          <img src="../../assets/img/staging.png" alt="">
          <span slot="title">已分期</span>
        </a>
      </li>
      <li>
        <a :class="{active:5 == num}"  @click="tab(5)">
          <img src="../../assets/img/notpass.png" alt="">
          <span slot="title">未通过</span>
        </a>
      </li>
      <li>
        <a :class="{active:6 == num}"  @click="tab(6)">
          <img src="../../assets/img/retreats.png" alt="">
          <span slot="title">退保中心</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      num: 1,
      list: ['/HomePage', '/ApplicationEntrance'],
      list2: ['首页', '申请入口', '待分期', '已分期', '未通过', '退保中心'],
      navArr: []
    }
  },
  mounted () {
    let path = this.$router.history.current.fullPath
    // console.log(path)
    this.list.forEach((v, k) => {
      if (path.split('/')[1] === v.split('/')[1]) {
        this.num = k + 1
        this.$emit('getNavLink', this.list[k].split('/')[1])
      }
    })
  },
  methods: {
    tab (index) {
      this.num = index
      this.$router.push(this.list[this.num - 1])
      this.$emit('getNavLink', this.list[this.num - 1].split('/')[1])
    }
  }
}
</script>

<style lang="less" scoped>
.side_bar  {
  height: 100%;
  ul {
    height: 100%;
    background: #447BED;
    color: #fff;
    width: 90%;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.652);
    li {
      color: rgb(255, 255, 255);
      padding-top: 20px;
      cursor: pointer;
      -webkit-transition: border-color .3s,background-color .3s,color .3s;
      transition: border-color .3s,background-color .3s,color .3s;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      a {
        // margin-top: 20px;
        display: block;
        line-height: 60px;
        height: 60px;
        padding: 0 20px 0 30px;
        color: #fff;
        font-size: 14px;
        img {
          vertical-align: middle;
          padding-right: 10px;
        }
        &:hover {
          background: #3066D7;
        }
        &.active {
          background: #3066D7;
        }
      }
      &:first-of-type{
        padding-top: 60px;
      }
    }
  }
}
</style>
