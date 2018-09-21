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
      <el-table :data="tableData" :show-header="false" style="width: 100%" :row-style="{'height': '94px'}">
        <el-table-column width="60">
          <template slot-scope="scope">
            <div class="index">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="企业名称：锦上有限公司">
          <template slot-scope="scope">
            <div>企业名称：{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="企业名称：锦上有限公司">
          <template slot-scope="scope">
            <div>姓名：{{ scope.row.personName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="car_nameplate" label="车牌号：浙XXXXXX">
          <template slot-scope="scope">
            <div>批次：{{ scope.row.carNum }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态：">
          <template slot-scope="scope">
            <div style="color: #4B86FF">状态：退保中</div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="120">
          <template slot-scope="scope">
            <el-button type="primary" round plain size="small" @click="$router.push({name: 'ADetailC'})">查看详情</el-button>
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
      tabNum: 1
    }
  },
  mounted () {
    this.getData(this.tabNum)
  },
  methods: {
    getData (status) {
      this.$fetch('/fd/index/findSurrenderIng', {status: status}).then(res => {
        console.log(res)
        this.tableData = res
      })
    },
    tab (num) {
      this.tabNum = num
      this.getData(num)
    }
  },
  filters: {
    time (data) {
      return data.split(' ')[0].replace('-', '.').replace('-', '.')
    }
  }
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
