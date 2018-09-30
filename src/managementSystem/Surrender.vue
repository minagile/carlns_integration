<template>
  <!-- 退保中心 -->
  <div class="surrender">
    <router-view></router-view>
    <header>
      <button v-for="(data, index) in list" :key="index" :class="{active: index == num}" @click="tab(index)">{{ data }}</button>
    </header>
    <div class="con">
      <!-- 个人 -->
      <el-table :data="tableData" v-if="num === 2 || num === 0" style="width: 100%" :show-header="false">
        <el-table-column width="60">
          <template slot-scope="scope">
            <div class="index">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1">姓名：{{ scope.row.name }}</div>
            <div v-if="scope.row.type === 2">企业名称：{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.type ===  1 && scope.row.carType === 1">车牌号：{{ scope.row.carNameplate }}</div>
            <div v-if="scope.row.type ===  1 && scope.row.carType === 2">车架号：{{ scope.row.carNameplate }}</div>
            <div v-if="scope.row.type ===  2">批次：{{ scope.row.batch }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <div>分期金额：{{ scope.row.insureAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <div>分期期数：{{ scope.row.insureStages }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <div style="color: #FF9C00;">状态：退保中</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <div>时间：{{ scope.row.createTime | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="primary" round plain size="small" @click="sure(scope.row.id, scope.row.type, scope.row.batch, scope.row.orderId)">确认退保</el-button>
            <el-button type="primary" round plain size="small" @click="cancel(scope.row.id, scope.row.type, scope.row.batch, scope.row.orderId)">取消退保</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" v-if="num === 1" style="width: 100%" :show-header="false">
        <el-table-column width="60">
          <template slot-scope="scope">
            <div class="index">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name">
          <template slot-scope="scope">
            <div>企业名称：{{ scope.row.name }}({{ scope.row.carNum }}辆)</div>
          </template>
        </el-table-column>
        <el-table-column prop="name">
          <template slot-scope="scope">
            <div>法人：{{ scope.row.personName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="car_nameplate">
          <template slot-scope="scope">
            <div>联系方式：{{ scope.row.phone }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="primary" round plain size="small" @click="sure(scope.row.id, scope.row.type, scope.row.batch, scope.row.orderId)">确认退保</el-button>
            <el-button type="primary" round plain size="small" @click="cancel(scope.row.id, scope.row.type, scope.row.batch, scope.row.orderId)">取消退保</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Surrender',
  data () {
    return {
      list: ['显示全部', '显示企业', '显示个人'],
      num: 0,
      tableData: []
    }
  },
  mounted () {
    this.getData(this.num + 1)
  },
  methods: {
    // 取消退保
    cancel (id, type, batch, orderId) {
      this.$confirm('是否取消退保', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/ad/index/cancelInsure', {
          type: type,
          id: id,
          carBatch: batch,
          orderId: orderId
        }).then(res => {
          if (res.code === 0) {
            this.getData(this.num + 1)
            this.$message({
              type: 'success',
              message: '取消退保'
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退保'
        })
      })
    },
    // 确认退保
    sure (id, type, batch, orderId) {
      this.$confirm('是否确认退保', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/ad/index/sureInsure', {
          type: type,
          id: id,
          carBatch: batch,
          orderId: orderId
        }).then(res => {
          if (res.code === 0) {
            this.getData(this.num + 1)
            this.$message({
              type: 'success',
              message: '退保成功!'
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确定退保'
        })
      })
    },
    getData (data) {
      this.$fetch('/ad/index/findSurrenderIng', {
        status: data
      }).then(res => {
        // console.log(res.data)
        this.tableData = res.data
      })
    },
    tab (index) {
      this.num = index
      this.getData(index + 1)
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
.surrender {
  padding: 0 20px 20px;
  height: calc(100% - 20px);
  header {
    background: #fff;
    height: 110px;
    line-height: 110px;
    button {
      width:100px;
      height:42px;
      line-height:42px;
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
