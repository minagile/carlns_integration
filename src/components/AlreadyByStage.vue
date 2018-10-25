<template>
  <!-- 已分期 -->
  <div class="already_by_stage">
    <!-- 已分期 -->
    <router-view></router-view>
    <header>
      <el-button type="info" :class="{active: 1 == tabNum}" @click="tab(1)">全部显示</el-button>
      <el-button type="info" :class="{active: 2 == tabNum}" @click="tab(2)">显示个人</el-button>
      <el-button type="info" :class="{active: 3 == tabNum}" @click="tab(3)">显示企业</el-button>
    </header>
    <div class="con">
      <el-table :data="tableData1" :show-header="false" style="width: 100%" :row-style="{'height': '94px'}">
        <el-table-column width="60">
          <template slot-scope="scope">
            <div class="index">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="企业名称：锦上有限公司">
          <template slot-scope="scope">
            <div v-if="scope.row.type === '1'">姓名：{{ scope.row.name }}</div>
            <div v-if="scope.row.type === '2'">企业名称：{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="car_nameplate" label="车牌号：浙XXXXXX">
          <template slot-scope="scope">
            <div v-if="scope.row.type === '1' && scope.row.car_type ===  1  ">车辆合格证：{{ scope.row.car_nameplate }}</div>
            <div v-if="scope.row.type === '1' && scope.row.car_type ===  2">车牌号：{{ scope.row.car_nameplate }}</div>
            <div v-if="scope.row.type ===  '2'">批次：{{ scope.row.car_batch }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="insure_amount" label="分期金额：5600">
          <template slot-scope="scope">
            <div>分期金额：{{ scope.row.insure_amount }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="insure_stages" label="分期期数：12">
          <template slot-scope="scope">
            <div>分期期数：{{ scope.row.insure_stages }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态：">
          <template slot-scope="scope">
            <div style="color: #4B86FF">状态：已分期</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="create_time" label="时间：2018.6.16">
          <template slot-scope="scope">
            <div>时间：{{ scope.row.create_time | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="120">
          <template slot-scope="scope">
            <el-button type="primary" round plain size="small" v-if="scope.row.type === '1'" @click="$router.push({name: 'ADetailP', query: {id: scope.row.id}})">查看详情</el-button>
            <el-button type="primary" round plain size="small" v-if="scope.row.type === '2'" @click="$router.push({name: 'ADetailC', query: {id: scope.row.id, batch: scope.row.car_batch}})">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlreadyByStage',
  data () {
    return {
      tableData: [],
      tabNum: 1,
      tableData1: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$fetch('/fd/index/countWork', {status: 3}).then(res => {
        this.tableData = res
        this.tableData1 = res
        console.log(this.tableData)
      })
    },
    tab (num) {
      this.tabNum = num
      this.tableData1 = []
      if (num === 3) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].type === '2') {
            this.tableData1.push(this.tableData[i])
          }
        }
      } else if (num === 2) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].type === '1') {
            this.tableData1.push(this.tableData[i])
          }
        }
      } else {
        this.tableData1 = this.tableData
      }
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
.already_by_stage {
  margin-top: 20px;
  height: 97%;
  // background: #fff;
  position: relative;
  header {
    background: #fff;
    // height: 110px;
    padding: 30px 0 30px 25px;
    .active {
      background: #4B86FF;
      border-color: #4B86FF;
    }
  }
  .con {
    background: #fff;
    margin-top: 20px;
    height: 86%;
    .el-button+.el-button {
      margin: 0;
    }
    .el-button--primary.is-plain {
      background: #fff;
      border-color: #4B86FF;
      color: #4B86FF;
    }
    .el-button--primary.is-plain:hover {
      background: #4B86FF;
      border-color: #4B86FF;
      color: #fff;
    }
    .el-table {
      font-size:17px;
      font-family:MicrosoftYaHei;
      color:rgba(51,51,51,1);
    }
    .index {
      width:26px;
      height:26px;
      background:rgba(68,123,237,1);
      border-radius:50%;
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:bold;
      color:rgba(255,255,255,1);
      text-align: center;
      line-height: 26px;
      margin: 0 auto;
    }
  }
}
</style>
