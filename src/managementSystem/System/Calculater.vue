<template>
  <div class="calculater">
    <div class="tit">
      <!-- <h1>计算器</h1> -->
      <button class="add" @click="add">添加</button>
    </div>
    <div class="content">
      <table id="list_table" >
        <tr v-for="(item, index) in list" :key="index">
          <td>
            <span>类型:</span>
            <span class="radio">
              <input type="radio" :name="index" value="1" checked @change="choose('1', item)">交强险
              <input type="radio" :name="index" value="2" @change="choose('2', item)">商业险
            </span>
          </td>
          <td v-if="item.type === '1'"><span>交强险:</span><input type="text" v-model="item.sali"></td>
          <td v-if="item.type === '2'"><span>商业险:</span><input type="text" v-model="item.commercials"></td>
          <td><span>首付时间:</span><input type="date" v-model="item.time"></td>
          <td><span>查询时间:</span><input type="date" v-model="endtime"></td>
        </tr>
      </table>
    </div>
    <div class="views">
      <div class="right">
        <p>显示区：</p>
        <div>
          <table id="tableRes">
            <tr>
              <th>总收入</th>
              <th>盈利</th>
              <th>本金</th>
              <th>我方垫付</th>
            </tr>
            <tr v-for="(o, i) in datalist" :key="i">
              <td>{{ o.sf }}</td>
              <td>{{ o.yl }}</td>
              <td>{{ o.bj }}</td>
              <td>{{ o.jf }}</td>
            </tr>
          </table>
          <div id="xianshi"></div>
        </div>
      </div>
    </div>
    <div class="btn">
      <button class="find" @click="getData">查询</button>
    </div>
  </div>
</template>

<script>
import { Req } from '../../assets/js/http.js'
export default {
  name: 'Calculater',
  data () {
    return {
      type: '1',
      shangye: 0,
      jiaoqiang: 0,
      chechuan: 0,
      time: '',
      qishu: 12,
      endtime: '',
      data: {},
      number: 0,
      tableList: [],
      list: [
        {
          type: '1',
          commercials: 0,
          sali: 0,
          time: '',
          endTime: ''
        }
      ],
      listNum: 0,
      es: [],
      datalist: []
    }
  },
  methods: {
    // 添加按钮
    add () {
      var data = {
        type: '1',
        commercials: 0,
        sali: 0,
        time: '',
        endTime: ''
      }
      this.list.push(data)
    },
    choose (value, item) {
      item.type = value
    },
    getData () {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].endTime = this.endtime
      }
      let config = {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'token': sessionStorage.getItem('token')
        }
      }
      // this.$post('/interestRate/calculators', this.list, {'contentType': 'application/json; charset=UTF-8'}).then(res => {
      this.$http.post(Req + '/interestRate/calculators', JSON.stringify(this.list), config).then(res => {
        if (res.data.code === 0) {
          var div = ''
          this.datalist = res.data.data1
          div += '<p><span style="font-weight:bold;">统计商业险： </span>' + res.data.data2.commercials + '</p>' + '<br/>'
          div += '<p><span style="font-weight:bold;">统计交强险： </span>' + JSON.stringify(res.data.data2.sali) + '</p>' + '<br/>'
          div += '<p><span style="font-weight:bold;">总计： </span>' + JSON.stringify(res.data.data2.total) + '</p>' + '<br/>'
          document.getElementById('xianshi').innerHTML = div
        } else {
          this.$message(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.calculater {
  position: absolute;
  background: #ffffff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 20px;
  padding-top:0;
  overflow: auto;
  box-sizing: border-box;
}
#list_table tr:nth-child(2n){
  background: rgba(129, 199, 212, 0.4);
}
tr {
  height: 50px;
  /* border-bottom: 1px solid #999999; */
  background: rgba(129, 162, 212, 0.4);
  color: #434343;
}
td {
  padding: 0 20px;
}
#list_table input[tpye='text'] {
  margin-left: 10px;
  border: none;
  height: 100%;
  /* background: none; */
}
#list_table {
  border-collapse: collapse;
  border: none;
}
.add {
  margin-top: 20px;
  width: 100px;
  height: 40px;
  margin-bottom:10px;
  border: none;
  background: #1E88A8;
  color: white;
  box-shadow: 2px 2px 5px #999999;
  display: block;
}
.btn {
  width: 890px;
  display: flex;
  justify-content: space-around;
}
h1 {
  margin-bottom: 20px;
  text-align: center;
}
.right {
  height: 100%;
}
#xianshi {
  padding: 10px;
}
#xianshi p {
  display: inline-block;
  margin: 5px;
  font-size: 15px;
}
#xianshi span {
  font-weight: 600;
  font-size: 18px;
}
.btn .find {
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 50px;
  margin-top: 20px;
  color: white;
  background: #8EC3D3;
}
.content {
  display: inline-block;
  height: 75%;
  overflow: auto;
  background: white;
  /* margin-top: 120px; */
}
.views {
  vertical-align:top;
  display: inline-block;
  margin-top: -21px;
}
#tableRes {
  border-collapse: collapse;
}
.tit {
  /* position: fixed; */
  background: none;
  width: 100%;
}
th {
  width: 100px;
}
::-webkit-scrollbar {/*隐藏滚轮*/
  display: none;
  }
</style>
