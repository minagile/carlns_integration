<template>
  <!-- 系统--日志 -->
  <div class="journal">
    <header>
      <div class="choose">
        <span>选择时间：</span>
        <button v-for="i in 4" :key="i" :class="{active: i == num}" @click="tab(i)">{{ list[i - 1] }}</button>
      </div>
    </header>
    <section>
      <el-table :data="tableData" height="100%" style="width: 100%">
        <el-table-column prop="phone" label="账号"></el-table-column>
        <el-table-column prop="phone" label="姓名"></el-table-column>
        <el-table-column prop="logTime" label="时间"></el-table-column>
        <el-table-column prop="methodName" label="操作"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Journal',
  data () {
    return {
      num: 1,
      list: ['近三天', '近一周', '半个月', '一个月'],
      tableData: []
    }
  },
  mounted () {
    this.getData(this.num)
  },
  methods: {
    getData (status) {
      // GET /ad/logs/selectLogs
      this.$fetch('/ad/logs/selectLogs', {
        state: status
      }).then(res => {
        // console.log(res)
        this.tableData = res.data
      })
    },
    tab (i) {
      this.num = i
      this.getData(this.num)
    }
  }
}
</script>

<style lang="less" scoped>
.journal {
  position: absolute;
  background: #ffffff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  header {
    height: 115px;
    line-height: 115px;
    border-bottom: 20px solid rgba(240,240,240,1);
    .choose {
      padding-left: 80px;
    }
    button {
      width:80px;
      height:32px;
      border:1px solid rgba(217,217,217,1);
      border-radius:2px;
      background: #fff;
      margin-right: 30px;
      &.active {
        background:rgba(255,148,148,1);
        color: #fff;
      }
    }
  }
  section {
    padding: 23px 80px 0;
    height: calc(100% - 158px);
    .el-table {
      height: 100%;
    }
  }
}
</style>
