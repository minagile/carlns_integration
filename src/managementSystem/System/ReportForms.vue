<template>
  <!-- 报表 -->
  <div class="report_forms">
    <div class="topbar">
      <span>选择时间：</span>
      <el-button size="small" :class="{active: allnum === 0}" @click="all">全部</el-button>
      <el-date-picker
        v-model="value5"
        type="year"
        size="small"
        @change="chooseDate('year', value5)"
        placeholder="选择年">
      </el-date-picker>
      <el-date-picker
        v-model="value4"
        type="month"
        size="small"
        @change="chooseDate('month', value4)"
        placeholder="选择月">
      </el-date-picker>
      <el-date-picker
        v-model="value1"
        type="date"
        size="small"
        @change="chooseDate('date', value1)"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="tab">
      <el-button size="small" v-for="(o, i) in list" :key="i" :class="{active: num === i}" @click="tab(i)">{{ o }}</el-button>
      <div class="change_table">
        <el-button class="le" size="small" :class="{active: tableNum === 1}" @click="changeTable(1)">图表</el-button>
        <el-button class="ri" size="small" :class="{active: tableNum === 2}" @click="changeTable(2)">表格</el-button>
      </div>
    </div>
    <div v-show="tableNum === 1" id="main" style="width: 100%;height:500px;background: #fff;margin: 0 auto;"></div>
    <div v-show="tableNum === 2" class="table" style="width: 80%;margin: 0 auto;">
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="commerce" label="商业险"></el-table-column>
        <el-table-column prop="synthesize" label="综合险"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'ReportForms',
  data () {
    return {
      value5: '',
      value4: '',
      value1: '',
      num: 0,
      x: '年',
      list: ['已收入', '盈利', '本金', '我方垫付'],
      arr: {
        commerce: {
          srs: [],
          yls: [],
          bjs: [],
          dfs: []
        },
        synthesize: {
          srs: [],
          yls: [],
          bjs: [],
          dfs: []
        },
        year: []
      },
      pieData: [],
      type: '',
      allnum: 0,
      tableNum: 1,
      tableData: []
    }
  },
  mounted () {
    // /ad/report/findAll
    // 全部数据
    // this.pieCahrts()
    this.$fetch('/ad/report/findAll').then(res => {
      this.dealData(res.data)
    })
    // /ad/report/findByTime
  },
  methods: {
    changeTable (i) {
      this.tableNum = i
    },
    all () {
      this.num = 0
      this.type = ''
      this.allnum = 0
      this.$fetch('/ad/report/findAll').then(res => {
        this.dealData(res.data)
      })
    },
    dealData (data) {
      this.arr = {
        commerce: {
          srs: [],
          yls: [],
          bjs: [],
          dfs: []
        },
        synthesize: {
          srs: [],
          yls: [],
          bjs: [],
          dfs: []
        },
        year: []
      }
      data.forEach(v => {
        this.arr.year.push(v.year)
        this.arr.commerce.srs.push(v.commerce.srs)
        this.arr.commerce.yls.push(v.commerce.yls)
        this.arr.commerce.bjs.push(v.commerce.bjs)
        this.arr.commerce.dfs.push(v.commerce.dfs)
        this.arr.synthesize.srs.push(v.synthesize.srz)
        this.arr.synthesize.yls.push(v.synthesize.ylz)
        this.arr.synthesize.bjs.push(v.synthesize.bjz)
        this.arr.synthesize.dfs.push(v.synthesize.dfz)
      })
      this.chartsTwo(this.arr, this.arr.commerce.srs, this.arr.synthesize.srs)
      this.tableData = []
      this.arr.year.forEach((v, k) => {
        this.tableData.push({time: v, commerce: this.arr.commerce.srs[k], synthesize: this.arr.synthesize.srs[k]})
      })
    },
    // 选择时间
    chooseDate (type, value) {
      // console.log(type, value)
      if (value === null) {
        // 日期被清空
        if (type === 'date') {
          if (this.value4) {
            this.$fetch('/ad/report/findByTime', {type: 2, endTime: this.value4.getFullYear() + '-' + zero(this.value4.getMonth() + 1)}).then(res => {
              if (res.code === 0) {
                this.dealData(res.data)
              } else {
                this.$message(res.msg)
              }
            })
          } else if (this.value5) {
            this.$fetch('/ad/report/findByTime', {type: 1, endTime: this.value5.getFullYear()}).then(res => {
              if (res.code === 0) {
                this.dealData(res.data)
              } else {
                this.$message(res.msg)
              }
            })
          } else {
            this.all()
          }
        } else if (type === 'month') {
          if (this.value5) {
            this.$fetch('/ad/report/findByTime', {type: 1, endTime: this.value5.getFullYear()}).then(res => {
              if (res.code === 0) {
                this.dealData(res.data)
              } else {
                this.$message(res.msg)
              }
            })
          } else {
            this.all()
          }
        } else {
          this.all()
        }
      } else {
        this.num = 0
        this.type = type
        this.allnum = 1
        if (type === 'year') {
          this.x = '月'
          this.$fetch('/ad/report/findByTime', {type: 1, endTime: value.getFullYear()}).then(res => {
            // console.log(res.data)
            if (res.code === 0) {
              this.dealData(res.data)
            } else {
              this.$message(res.msg)
            }
          })
        }
        if (type === 'month') {
          this.x = '日'
          this.$fetch('/ad/report/findByTime', {type: 2, endTime: value.getFullYear() + '-' + zero(value.getMonth() + 1)}).then(res => {
            // console.log(res.data)
            if (res.code === 0) {
              this.dealData(res.data)
              // this.dealData(res.data[0].list)
            } else {
              this.$message(res.msg)
            }
          })
        }
        if (type === 'date') {
          this.$fetch('/ad/report/findByTime', {type: 3, endTime: value.getFullYear() + '-' + zero(value.getMonth() + 1) + '-' + zero(value.getDate())}).then(res => {
            // console.log(res.data)
            if (res.code === 0) {
              this.pieData = {
                srs: [{value: res.data[0].commerce.srs, name: '商业险'}, {value: res.data[0].synthesize.srz, name: '综合险'}],
                yls: [{value: res.data[0].commerce.yls, name: '商业险'}, {value: res.data[0].synthesize.ylz, name: '综合险'}],
                bjs: [{value: res.data[0].commerce.bjs, name: '商业险'}, {value: res.data[0].synthesize.bjz, name: '综合险'}],
                dfs: [{value: res.data[0].commerce.dfs, name: '商业险'}, {value: res.data[0].synthesize.dfz, name: '综合险'}]
              }
              // console.log(this.pieData)
              this.pieCahrts(this.pieData.srs)
              this.tableData = [{
                time: this.value1.getFullYear() + '-' + zero(this.value1.getMonth() + 1) + '-' + zero(this.value1.getDate()),
                commerce: this.pieData.srs[0].value,
                synthesize: this.pieData.srs[1].value
              }]
            } else {
              this.$message(res.msg)
            }
          })
        }
      }
    },
    tab (i) {
      this.tableData = []
      this.num = i
      if (this.type === 'date') {
        if (i === 0) {
          this.pieCahrts(this.pieData.srs)
          this.tableData = [{
            time: this.value1.getFullYear() + '-' + zero(this.value1.getMonth() + 1) + '-' + zero(this.value1.getDate()),
            commerce: this.pieData.srs[0].value,
            synthesize: this.pieData.srs[1].value
          }]
        } else if (i === 1) {
          this.pieCahrts(this.pieData.yls)
          this.tableData = [{
            time: this.value1.getFullYear() + '-' + zero(this.value1.getMonth() + 1) + '-' + zero(this.value1.getDate()),
            commerce: this.pieData.yls[0].value,
            synthesize: this.pieData.yls[1].value
          }]
        } else if (i === 2) {
          this.pieCahrts(this.pieData.bjs)
          this.tableData = [{
            time: this.value1.getFullYear() + '-' + zero(this.value1.getMonth() + 1) + '-' + zero(this.value1.getDate()),
            commerce: this.pieData.bjs[0].value,
            synthesize: this.pieData.bjs[1].value
          }]
        } else {
          this.pieCahrts(this.pieData.dfs)
          this.tableData = [{
            time: this.value1.getFullYear() + '-' + zero(this.value1.getMonth() + 1) + '-' + zero(this.value1.getDate()),
            commerce: this.pieData.dfs[0].value,
            synthesize: this.pieData.dfs[1].value
          }]
        }
      } else {
        if (i === 0) {
          this.chartsTwo(this.arr, this.arr.commerce.srs, this.arr.synthesize.srs)
          this.arr.year.forEach((v, k) => {
            this.tableData.push({time: v, commerce: this.arr.commerce.srs[k], synthesize: this.arr.synthesize.srs[k]})
          })
        } else if (i === 1) {
          this.chartsTwo(this.arr, this.arr.commerce.yls, this.arr.synthesize.yls)
          this.arr.year.forEach((v, k) => {
            this.tableData.push({time: v, commerce: this.arr.commerce.yls[k], synthesize: this.arr.synthesize.yls[k]})
          })
        } else if (i === 2) {
          this.chartsTwo(this.arr, this.arr.commerce.bjs, this.arr.synthesize.bjs)
          this.arr.year.forEach((v, k) => {
            this.tableData.push({time: v, commerce: this.arr.commerce.bjs[k], synthesize: this.arr.synthesize.bjs[k]})
          })
        } else {
          this.chartsTwo(this.arr, this.arr.commerce.dfs, this.arr.synthesize.dfs)
          this.arr.year.forEach((v, k) => {
            this.tableData.push({time: v, commerce: this.arr.commerce.dfs[k], synthesize: this.arr.synthesize.dfs[k]})
          })
        }
      }
    },
    // 柱状图
    chartsTwo (data, data1, data2) {
      // console.log(data)
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#eb7878', '#f3e595'],
        legend: {
          show: true,
          type: 'plain',
          right: '10%',
          bottom: '30%',
          orient: 'vertical',
          data: ['商业险', '综合险']
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '18%',
          height: '60%',
          width: '64%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: this.x,
            data: data.year,
            axisTick: {
              alignWithLabel: true,
              show: false,
              interval: 0
            },
            axisLabel: {
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额',
            nameGap: 30,
            axisTick: {
              alignWithLabel: true,
              show: false,
              interval: 0
            },
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '商业险',
            type: 'bar',
            // stack: '总量',
            barWidth: '20px',
            data: data1,
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '综合险',
            type: 'bar',
            // stack: '总量',
            barWidth: '20px',
            data: data2,
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      }, true)
    },
    // 饼状图
    pieCahrts (data) {
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#eb7878', '#f3e595'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          show: true,
          type: 'plain',
          right: '20%',
          // bottom: '30%',
          orient: 'vertical',
          data: ['商业险', '综合险']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: data,
            label: {
              position: 'inside',
              formatter: '{b}: {d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }, true)
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<style lang="less" scoped>
.report_forms {
  position: absolute;
  background: #ffffff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  .topbar {
    padding: 30px;
    .el-input {
      margin-right: 30px;
    }
  }
  .all {
    margin-right: 30px;
    width: 80px;
    height: 32px;
    line-height: 32px;
    background:rgba(240,120,143,1);
    border-radius:1px;
    color: #fff;
    border-radius: 2px;
  }
  .el-button {
    margin-right: 30px;
  }
  .active {
    background: rgba(240,120,143,1);
    color: #fff;
    border-color: rgba(240,120,143,1);
  }
  .el-button:hover {
    background: rgba(240,120,143,1);
    color: #fff;
    border-color: rgba(240,120,143,1);
  }
  .tab {
    padding-left: 30px;
    margin-bottom: 20px;
    .change_table {
      float: right;
      margin-right: 100px;
      .el-button {
        margin: 0;
      }
      .le {
        border-right: 0;
        margin-right: -5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .ri {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .el-button.active {
        background-color:rgba(240,120,143,1);
      }
    }
  }
  .table {
    height: calc(100% - 150px);
  }
  .el-table {
  }
}
</style>
