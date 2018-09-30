<template>
  <!-- 退保中心 -->
  <div class="retreat_center">
    <!-- 退保中心 -->
    <router-view></router-view>
    <header>
      <el-button type="info" :class="{active: 1 == tabNum}" @click="tab(1)">全部显示</el-button>
      <el-button type="info" :class="{active: 2 == tabNum}" @click="tab(2)">显示企业</el-button>
      <el-button type="info" :class="{active: 3 == tabNum}" @click="tab(3)">显示个人</el-button>
    </header>
    <div class="con">
      <!-- <el-table :data="tableData" :row-class-name="getRowClass" :show-header="false" style="width: 100%" :row-style="{'height': '94px'}">
        <el-table-column width="60">
          <template slot-scope="scope">
            <div class="index">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props" v-if="props.row.list">
            <el-table :data="props.row.list" :show-header="false" style="width: 100%">
              <el-table-column prop="car_nameplate">
                <template slot-scope="scope">
                  <div>车牌号：{{ scope.row.carNameplate }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="car_nameplate">
                <template slot-scope="scope">
                  <div>分期金额：{{ scope.row.insureAmount }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="car_nameplate">
                <template slot-scope="scope">
                  <div>分期期数：{{ scope.row.insureStages }}</div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div>还款期数：{{ scope.row.insureNum }}</div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="状态：">
                <template slot-scope="scope">
                  <div style="color: #4B86FF">状态：未通过</div>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template slot-scope="scope">
                  <div>时间：未通过</div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 2">企业名称：{{ scope.row.name }}({{ scope.row.carNum }}辆)</div>
            <div v-if="scope.row.type === 1">姓名：{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="car_nameplate">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1 && scope.row.carType === 1">合格证：{{ scope.row.carNameplate }}</div>
            <div v-if="scope.row.type === 1 && scope.row.carType === 2">车牌号：{{ scope.row.carNameplate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="car_nameplate">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 2">法人：{{ scope.row.personName }}</div>
            <div v-if="scope.row.type === 1">分期金额：{{ scope.row.insureAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="car_nameplate">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1">分期期数：{{ scope.row.insureStages }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态：">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 2">联系电话：{{ scope.row.phone }}</div>
            <div v-if="scope.row.type === 1" style="color: #4B86FF">状态：未通过</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1">时间：{{ scope.row.createTime | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="120">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.type === 2" round plain size="small" @click="$router.push({name: 'CenDetailC', query: {id: scope.row.id, batch: scope.row.batch}})">查看详情</el-button>
            <el-button type="primary" v-if="scope.row.type === 1" round plain size="small" @click="$router.push({name: 'CenDetailP', query: {id: scope.row.id}})">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <el-table :data="tableData" :show-header="false" style="width: 100%" :row-style="{'height': '94px'}">
        <el-table-column width="60">
          <template slot-scope="scope">
            <div class="index">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1">姓名：{{ scope.row.name }}</div>
            <div v-if="scope.row.type === 2">企业名称：{{ scope.row.name }}({{ scope.row.carNum }}辆)</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1 && scope.row.carType ===  1">车辆合格证：{{ scope.row.carNameplate }}</div>
            <div v-if="scope.row.type === 1 && scope.row.carType ===  2">车牌号：{{ scope.row.carNameplate }}</div>
            <div v-if="scope.row.type === 2">批次：{{ scope.row.batch }}</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div>分期金额：{{ scope.row.insureAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div>分期期数：{{ scope.row.insureStages }}</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div style="color: #4B86FF">状态：退保中</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <div>时间：{{ scope.row.createTime | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="140">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.type === 2" round plain size="small" @click="$router.push({name: 'CenDetailC', query: {id: scope.row.id, batch: scope.row.batch}})">查看详情</el-button>
            <el-button type="primary" v-if="scope.row.type === 1" round plain size="small" @click="$router.push({name: 'CenDetailP', query: {id: scope.row.id}})">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RetreatCenter',
  data () {
    return {
      tableData: [],
      tabNum: 1,
      activeNames: ['1']
    }
  },
  mounted () {
    this.getData(this.tabNum)
  },
  methods: {
    getRowClass ({row, index}) {
      if (!row.list) {
        return 'row-expand-cover'
      }
    },
    getData (status) {
      this.$fetch('/fd/index/findSurrenderIng', {status: status}).then(res => {
        // console.log(res)
        this.tableData = res
      })
    },
    tab (num) {
      this.tabNum = num
      this.getData(num)
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
.retreat_center {
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
