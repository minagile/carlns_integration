<template>
  <!-- 渠道 -->
  <div class="trench">
    <router-view></router-view>
    <header>
      <button v-for="(data, index) in list" :key="index" :class="{active: index == num}" @click="tab(index)">{{ data }}</button>
    </header>
    <div class="con">
      <el-table :data="tableData" style="width: 100%" :show-header="false">
        <el-table-column width="60">
          <template slot-scope="scope">
            <div class="index">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="channelName">
          <template slot-scope="scope">
            <div>企业名称：{{ scope.row.channelName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="channelUserName">
          <template slot-scope="scope">
            <div>负责人姓名：{{ scope.row.channelUserName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="channelAddress">
          <template slot-scope="scope">
            <div>经营地址：{{ scope.row.channelAddress }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="insure_stages">
          <template slot-scope="scope">
            <div>联系方式：{{ scope.row.channelUserPhone }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time">
          <template slot-scope="scope">
            <div>时间：{{ scope.row.createTime | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="primary" v-if="num === 1" round plain size="small" @click="$router.push({name: 'ChannelDetail', query: {id: scope.row.channelId, look: 1}})">通过审核</el-button>
            <el-button type="primary" v-if="num === 1" round plain size="small" @click="notpass(scope.row.channelId)">不通过审核</el-button>
            <el-button type="primary" v-if="num !== 1" round plain size="small" @click="$router.push({name: 'ChannelDetail', query: {id: scope.row.channelId}})">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Trench',
  data () {
    return {
      list: ['未通过', '待审核', '已通过'],
      num: 0,
      tableData: []
    }
  },
  mounted () {
    this.getData(this.num)
  },
  methods: {
    notpass (id) {
      this.$prompt('请输入审核不通过原因', '审核不通过', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showInput: true
      }).then(({ value }) => {
        this.$post('/ad/channel/update', {
          id: id,
          state: 0,
          msg: value
        }).then(res => {
          if (res.code === 0) {
            this.$message({type: 'success', message: '操作成功'})
          } else {
            this.$message(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    getData (data) {
      this.$fetch('/ad/channel/selectBySate', {
        channelState: data
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.channel
        } else {
          if (res.code === 1005) {
            this.tableData = []
          }
          // this.$message({type: 'info', message: res.msg})
        }
      })
    },
    tab (index) {
      this.num = index
      this.getData(this.num)
    }
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    },
    time (data) {
      return data.split(' ')[0].replace('-', '.').replace('-', '.')
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<style lang="less" scoped>
.trench {
  padding: 0 20px 20px;
  height: calc(100% - 20px);
  header {
    background: #fff;
    height: 110px;
    line-height: 110px;
    button {
      width:100px;
      height:42px;
      background:#DEDEDE;
      border-radius:5px;
      color:#666666;
      margin: 0 0 0 45px;
      &.active {
        background:rgba(40,40,40,1);
        color: #fff;
      }
    }
  }
  .con {
    background: #fff;
    margin-top: 20px;
    height: calc(100% - 130px);
    // padding: 34px 100px 0;
    position: relative;
    button {
      width:90px;
      height:30px;
      border:1px solid rgba(40,40,40,1);
      border-radius:15px;
      background: #fff;
      color: rgba(40,40,40,1);
      &:hover {
        background: rgba(40,40,40,1);
        color: #fff;
      }
    }
    .index {
      width:26px;
      height:26px;
      background:#282828;
      border-radius:50%;
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(255,255,255,1);
      text-align: center;
      line-height: 26px;
      margin: 0 auto;
    }
    .edit {
      width:90px;
      height:30px;
      border:1px solid rgba(40,40,40,1);
      border-radius:15px;
      background: #fff;
      color: rgba(40,40,40,1);
      &:hover {
        background: rgba(40,40,40,1);
        color: #fff;
      }
    }
  }
}
</style>
