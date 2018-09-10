<template>
  <!-- 待分期 -->
  <div class="stay_by_stage">
    <router-view></router-view>
    <header>
      <el-button type="primary">全部显示</el-button>
      <el-button type="info">显示企业</el-button>
      <el-button type="info">显示个人</el-button>
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
        <el-table-column align="center" width="360">
          <template slot-scope="scope">
            <el-button type="primary" round plain size="small" @click="$router.push({name: 'DetailP'})">查看详情</el-button>
            <el-button type="primary" round plain size="small" @click="$router.push({name: 'DetailC'})">上传付款计划表</el-button>
            <el-button type="primary" round plain size="small">上传付款凭证</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StayByStage',
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
  methods: {
  }
}
</script>

<style lang="less" scoped>
.stay_by_stage {
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
  }
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
</style>
