<template>
  <div class="top">
    <div class="tab">
      <ul>
        <li v-for="(data, index) in list" :key="index" :class="{active: index == num}" @click="tab(index)" @mousemove="tabmove(index, $event)">
          <a>{{ data }}</a>
        </li>
        <div class="tuibao position" id="tuibao" v-show="retreats" @mouseleave="leave">
          <div class="li" @click="tuibao(1)"><a>退保中</a></div>
          <div class="li" @click="tuibao(2)"><a>已退保</a></div>
        </div>
        <div class="all position" v-show="all" @mouseleave="leave">
          <li v-for="o in qudaoList" :key="o.channelId"><a @click="channel(o.channelId)">{{ o.channelName }}</a></li>
        </div>
        <!-- <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#FFC107"
          text-color="#282828"
          active-text-color="#FFC107">
          <el-menu-item index="1"><a>全部渠道</a></el-menu-item>
          <el-menu-item index="2"><a>待付款</a></el-menu-item>
          <el-menu-item index="3"><a>已分期</a></el-menu-item>
          <el-submenu index="4">
            <template slot="title">退保中心</template>
            <el-menu-item index="4-1">退保中</el-menu-item>
            <el-menu-item index="4-2">已退保</el-menu-item>
          </el-submenu>
          <el-menu-item index="5"><a>渠道</a></el-menu-item>
          <el-menu-item index="6"><a>报表</a></el-menu-item>
          <el-menu-item index="7"><a>系统</a></el-menu-item>
        </el-menu> -->
      </ul>
    </div>
    <div class="user">
      <a>
        <img src="../../assets/mImg/user.png" alt="">
        {{ name }}
      </a>
      <a @click="out">
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
      // list: ['全部渠道', '待付款', '已分期', '退保中心', '渠道', '系统'],
      // listLink: ['AllChannels', 'Obligations', 'Amortized', 'Surrender', 'Trench', 'System'],
      list: ['全部渠道'],
      listLink: ['AllChannels'],
      num: 0,
      retreats: false,
      all: false,
      qudaoList: [],
      name: '',
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  mounted () {
    let permissionData = JSON.parse(sessionStorage.getItem('permission'))
    permissionData.forEach(v => {
      if (v === '待付款') {
        this.list.push(v)
        this.listLink.push('Obligations')
      }
      if (v === '已分期') {
        this.list.push(v)
        this.listLink.push('Amortized')
      }
      if (v === '退保中心') {
        this.list.push(v)
        this.listLink.push('Surrender')
      }
      if (v === '渠道') {
        this.list.push(v)
        this.listLink.push('Trench')
      }
      if (v === '系统') {
        this.list.push(v)
        this.listLink.push('System')
      }
    })
    let path = this.$router.history.current.fullPath
    this.listLink.forEach((v, k) => {
      if (path.split('/')[2] === v) {
        this.num = k
      }
    })
    this.name = sessionStorage.getItem('username')
    this.$fetch('/ad/channel/findAll').then(res => {
      this.qudaoList = res.data.channel
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
      if (key === '4-1') {
        this.$router.push({name: 'Surrender', query: {qqq: 1}})
      } else if (key === '4-2') {
        this.$router.push({name: 'Surrender', query: {qqq: 2}})
      } else {
        this.$router.push({name: this.listLink[key - 1]})
      }
    },
    // 退出登录
    out () {
      this.$fetch('/login/logout').then(res => {
        if (res.code === 0) {
          sessionStorage.clear()
          this.$router.push({name: 'MLogin'})
        } else {
          this.$message(res.msg)
        }
      })
    },
    tuibao (data) {
      if (data === 1) {
        this.$router.push({name: 'Surrender'})
      } else {
        this.$router.push({name: 'SurrenderA'})
      }
    },
    leave (e) {
      this.all = false
      this.retreats = false
      // console.log(this.list.indexOf('退保中心'))
    },
    channel (id) {
      this.$emit('channelId', id)
    },
    tabmove (i, e) {
      if (i === 0) {
        this.all = true
        this.retreats = false
      } else if (i === this.list.indexOf('退保中心')) {
        this.retreats = true
        this.all = false
        document.getElementById('tuibao').style.left = e.target.offsetLeft + 'px'
      } else {
        this.all = false
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
  .el-submenu.is-active .el-menu-item.is-active {
    background-color: #282828 !important;
    border-bottom-color: #282828 !important;
  }
  .el-menu-item.is-active {
    background-color: #282828 !important;
    border-bottom-color: #282828 !important;
  }
  .tab {
    height: 60px;
    width: 90%;
    display: flex;
    justify-content: center;
    ul {
      position: relative;
      .position {
        position: absolute;
        background:rgba(255,255,255,1);
        box-shadow: 0px 0px 4px rgba(0,0,0,0.35);
        z-index: 99;
        top: 60px;
      }
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
      .all {
        left: 5px;
        width: 968px;
        height: 120px;
        background:rgba(255,255,255,1);
        border-radius: 5px;
        box-shadow: 0px 0px 4px rgba(0,0,0,0.35);
        li {
          padding: 0;
          border-right: 1px solid #8F8F8F;
          height: 24px;
          margin: 15px 0;
          &:nth-of-type(7n) {
            border: 0;
          }
        }
        a {
          width:56px;
          padding: 0;
          height:28px;
          line-height:28px;
          text-align: center;
          font-size: 14px;
          border-radius:5px;
          margin: 0 40px;
          &:hover {
            background:rgba(255,209,0,1);
            color: #333;
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
    min-width: 240px;
    position: absolute;
    right: 0;
    top: 0;
    a {
      padding: 0 10px;
    }
    img {
      vertical-align: middle;
    }
  }
}
</style>
