<template>
  <!-- 渠道管理 -->
  <div class="channel_management">
    <!-- 渠道管理 -->
    <router-view></router-view>
    <header>
      <el-button type="primary" @click="$router.push({name: 'ChannelApplication'})">+ 新增渠道</el-button>
    </header>
    <div class="con">
      <el-table :data="tableData" :show-header="false" style="width: 100%" :row-style="{'height': '94px'}">
        <el-table-column width="60">
          <template slot-scope="scope">
            <div class="index">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="address" label="地址"></el-table-column>
        <el-table-column align="center" prop="address" label="地址"></el-table-column>
        <el-table-column align="center" prop="address" label="地址"></el-table-column>
        <el-table-column align="center" prop="address" label="地址"></el-table-column>
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
  name: 'ChannelManagement',
  data () {
    return {
      tableData: [{
        date: '企业名称：锦上有限公司',
        name: '车牌号：浙XXXXXX',
        address: '分期金额：5600'
      }]
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.channel_management {
  margin-top: 20px;
  height: 97%;
  // background: #fff;
  position: relative;
  header {
    background: #fff;
    // height: 110px;
    padding: 30px 0 30px 25px;
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
