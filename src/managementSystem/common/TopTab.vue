<template>
  <div class="top">
    <div class="tab">
      <ul>
        <li v-for="(data, index) in list" :key="index" :class="{active: index == num}" @click="tab(index)" @mousemove="tabmove(index)">
          <a>{{ data }}</a>
        </li>
        <div class="tuibao position" v-show="retreats">
          <div class="li"><a>退保中</a></div>
          <div class="li"><a>已退保</a></div>
        </div>
        <div class="all position" v-show="all">
          <li v-for="o in qudaoList" :key="o.channelId"><a @click="channel(o.channelId)">{{ o.channelName }}</a></li>
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
      listLink: ['AllChannels', 'Obligations', 'Amortized', 'Surrender', 'Trench', 'Port', 'System'],
      num: 0,
      retreats: false,
      all: false,
      qudaoList: []
    }
  },
  mounted () {
    this.$fetch('/ad/channel/findAll').then(res => {
      // console.log(res)
      this.qudaoList = res.data.channel
    })
  },
  methods: {
    channel (id) {
      this.$emit('channelId', id)
      // this.$router.push({
      //   name: 'AllChannels',
      //   query: {id: id}
      // })
    },
    tabmove (i) {
      if (i === 0) {
        this.all = true
        this.retreats = false
      } else if (i === 3) {
        this.retreats = true
        this.all = false
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
