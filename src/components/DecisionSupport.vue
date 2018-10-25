<template>
  <!-- 决策支持 -->
  <div class="decision_support">
    <header>
      <div class="time">
        <span>选择时间：</span>
        <el-button size="small" v-for="(item, index) in dateList" :key="index" :class="{actived:index == num2}" @click="tableTab(index)">{{ item }}</el-button>
      </div>
      <div class="date">
        <span>日期：</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange($event)"
          size="small"
          format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div class="area">
        <span>选择区域：</span>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </header>
    <div class="con">
      <div class="tableTab">
        <el-button size="small" v-for="(item, index) in tableList" :key="index" :class="{actived:index == num}" @click="tableTab1(index)">{{ item }}</el-button>
      </div>
      <div id="main1" style="width: 100%;height:80%;background: #fff;margin: 0 auto;"></div>
    </div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
  name: 'DecisionSupport',
  data () {
    return {
      date: '',
      date1: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',
      tableList: ['销售额', '净收入', '销售数量'],
      dateList: ['近一周', '近一月', '一季度', '近一年'],
      num2: 0,
      num: 0
    }
  },
  mounted () {
    this.charts()
  },
  methods: {
    dateChange (data) {
      // var val = data[0].getFullYear() + '-' + (data[0].getMonth() + 1) + '-' + data[0].getDate() + '~' + data[1].getFullYear() + '-' + (data[1].getMonth() + 1) + '-' + data[1].getDate()
      // console.log(val)
    },
    tableTab (index) {
      this.num2 = index
      // console.log(index)
    },
    tableTab1 (index, changetab) {
      this.num = index
    },
    charts () {
      var myChart2 = echarts.init(document.getElementById('main1'))
      myChart2.setOption({
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            // data : this.Data.x,
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
            name: '空置率(%)',
            nameGap: 30,
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '空置房屋',
            type: 'bar',
            stack: '总量',
            barWidth: '50px',
            data: [10, 52, 200, 334, 390, 330, 220],
            // data: this.Data.y,
            label: {
              show: true
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#87e5da', '#92a4c0', '#f4adad', '#e58cdb', '#d0efb5', '#eb7878', '#2f3e75', '#f3e595', '#eda1c1', '#fab2ac', '#bee4d2', '#d7f8f7']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }, true)
    }
  }
}
</script>

<style lang="less" scoped>
.decision_support {
  margin-top: 20px;
  height: 97%;
  // background: #fff;
  position: relative;
  header {
    background: #fff;
    height: 166px;
    padding: 20px 0 0 0;
    .time {
      float: left;
      padding: 20px 0 20px 30px;
      button:hover {
        background: #F0788F;
        color: #fff;
        border-color: #F0788F;
      }
      .actived {
        background: #F0788F;
        color: #fff;
        outline: none;
        border-color: #F0788F;
      }
    }
    .date {
      float: left;
      padding: 20px 50px;
    }
    .area {
      clear: both;
      padding: 20px 0 20px 30px;
    }
    .el-date-editor .el-range-separator {
      padding: 0 10px;
    }
  }
  .con {
    background: #fff;
    margin-top: 20px;
    height: calc(100% - 206px);
    .tableTab {
      padding-left: 38px;
      padding-top: 16px;
    }
    .tableTab button:hover {
      background: #F0788F;
      color: #fff;
      border-color: #F0788F;
    }
    .tableTab .actived {
      background: #F0788F;
      color: #fff;
      border-color: #F0788F;
    }
  }
}
</style>
