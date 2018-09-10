<template>
  <!-- 系统 -->
  <div class="system">
    <header>
      <button v-for="(data, index) in list" :key="index" :class="{active: index == num}" @click="tab(index)">{{ data }}</button>
    </header>
    <div class="con">
      <button>添加</button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'System',
  data () {
    return {
      list: ['短信模板', '更改合作协议', '权限分配'],
      num: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    tab (index) {
      this.num = index
    }
  }
}
</script>

<style lang="less" scoped>
.system {
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
    height: calc(100% - 164px);
    padding: 34px 100px 0;
    button {
      width: 80px;
      height: 32px;
      background:rgba(40,40,40,1);
      border-radius:5px;
      color: #fff;
    }
  }
}
</style>
