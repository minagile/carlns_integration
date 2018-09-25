<template>
  <!-- 已分期 -->
  <div class="amortized">
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
        <el-table-column prop="name" label="企业名称：锦上有限公司">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 1">姓名：{{ scope.row.name }}</div>
            <div v-if="scope.row.type === 2">企业名称：{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="car_nameplate" label="车牌号：浙XXXXXX">
          <template slot-scope="scope">
            <div v-if="scope.row.carType ===  1">车牌号：{{ scope.row.carNameplate }}</div>
            <div v-if="scope.row.carType ===  2">批次：{{ scope.row.batch }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="insureAmount" label="分期金额：5600">
          <template slot-scope="scope">
            <div>分期金额：{{ scope.row.insureAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="insureStages" label="分期期数：12">
          <template slot-scope="scope">
            <div>分期期数：{{ scope.row.insureStages }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态：">
          <template slot-scope="scope">
            <div style="color: #FF9C00;">状态：客户已付款</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="时间：2018.6.16">
          <template slot-scope="scope">
            <div>时间：{{ scope.row.createTime | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="primary" round plain v-if="scope.row.type === 2" size="small" @click="$router.push({name: 'InsuranceC', query: {id: scope.row.id, batch: scope.row.batch}})">退保</el-button>
            <el-button type="primary" round plain v-if="scope.row.type === 1" size="small" @click="$router.push({name: 'InsuranceP', query: {id: scope.row.id}})">退保</el-button>
            <!-- <el-button type="primary" round plain size="small">查看详情</el-button> -->
            <!-- <el-button type="primary" round plain size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Amortized',
  data () {
    return {
      list: ['全部显示', '显示个人', '显示企业'],
      num: 0,
      tableData: [],
      dialogFormVisible: false,
      form: {
        'messageName': '',
        'messageText': '',
        'messageType': '',
        'messageTitle': '',
        'messageCode': '',
        'messageParams': '',
        'messageState': 2
      },
      formLabelWidth: '170px',
      addOrEdit: 'add'
    }
  },
  mounted () {
    this.getData(this.num + 1)
  },
  methods: {
    getData (num) {
      this.$fetch('/ad/index/selectSurrenderByStagesFd', {
        'status': num
      }).then(res => {
        // console.log(res.data.surrenderVO)
        this.tableData = res.data.surrenderVO
        if (res.code === 101) {
          this.$message({
            message: res.msg,
            type: 'info'
          })
        }
      })
    },
    tab (index) {
      this.num = index
      this.getData(this.num + 1)
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
.amortized {
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
