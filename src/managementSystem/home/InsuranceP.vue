<template>
  <!-- 退保-个人 -->
  <div class="insurance_p">
    <div class="con">
      <div class="body">
        <header @click="payDetail"  v-show="$route.query.tuibao !== true">
          <div class="itm">
            <img src="../../assets/mImg/moneybag.png" alt="">
            <span>状态：已分期，可查看还款详情</span>
          </div>
          <div class="itm">
            <img src="../../assets/mImg/time.png" alt="">
            <span>提交时间：{{ ruleForm.customer.updateTime | timeChange }}</span>
          </div>
        </header>
        <div class="tit">
          <img src="../../assets/mImg/user_msg.png" alt="">
        </div>
        <div class="msg">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="姓名：" prop="customerName">
              <el-input v-model="ruleForm.customer.customerName"></el-input>
            </el-form-item>
            <el-form-item label="身份证号：" prop="customerIdcard">
              <el-input v-model="ruleForm.customer.customerIdcard"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="customerPhone">
              <el-input v-model="ruleForm.customer.customerPhone"></el-input>
            </el-form-item>
            <el-form-item label="车架号：" prop="carvin">
              <el-input v-model="ruleForm.obj.carvin"></el-input>
            </el-form-item>
            <el-form-item :label="ruleForm.obj.type === 1 ? '车辆合格证：' : '车牌号：'" prop="nameplate">
              <el-input v-model="ruleForm.obj.nameplate"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/toubao.png" alt="">
        </div>
        <div class="msg">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="商业险：" prop="commercial">
              <el-input v-model="ruleForm.obj.commercial"></el-input>
            </el-form-item>
            <el-form-item label="交强险：" prop="cartaffic">
              <el-input v-model="ruleForm.obj.cartaffic"></el-input>
            </el-form-item>
            <el-form-item label="车船税：" prop="carboat">
              <el-input v-model="ruleForm.obj.carboat"></el-input>
            </el-form-item>
            <el-form-item label="选择保单：" prop="age">
              <el-button :class="{active: 1 == ruleForm.obj.age}">一年保单</el-button>
              <el-button :class="{active: 3 == ruleForm.obj.age}">三年保单</el-button>
              <el-button type="text" v-if="ruleForm.obj.age === 3">是否有车贷：
                <el-radio v-model="ruleForm.obj.state" :label="2">是</el-radio>
                <el-radio v-model="ruleForm.obj.state" :label="1">否</el-radio>
              </el-button>
            </el-form-item>
            <el-form-item label="月付期数：" prop="phone">
              <el-button class="active">{{ruleForm.obj.stages}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/picmsg.png" alt="">
        </div>
        <PicShow :imgList="ruleForm" :from="'个人审核'" />
        <div class="btn">
          <button class="p" @click="exit"  v-show="$route.query.tuibao !== true">退保</button>
          <button @click="$router.go(-1)">取消</button>
        </div>
      </div>
    </div>
    <!-- 分期详情 -->
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="915px">
      <template>
        <div class="header">
          <h2>
            <img src="../../assets/mImg/package.png" alt="">
            <span>分期详情</span>
          </h2>
          <span>姓名：{{ ruleForm.customer.customerName }}</span>
          <span v-if="ruleForm.order">分期金额：{{ ruleForm.order.countnum }}</span>
          <span>分期期数：{{ ruleForm.obj.stages }}</span>
          <button>{{ ruleForm.obj.age | upToCase }}年期</button>
        </div>
      </template>
      <div class="stages">
        <ul>
          <li>期数</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">第{{ index + 1 }}期</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">第{{ index + 1 }}期</span>
          </li>
        </ul>
        <ul>
          <li>还款时间</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">{{ data.stagesCutoff | timeChange }}</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">{{ data.stagesCutoff | timeChange }}</span>
          </li>
        </ul>
        <ul>
          <li>还款金额</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">{{ data.stagesPrice }}</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">{{ data.stagesPrice }}</span>
          </li>
        </ul>
        <ul>
          <li>到账金额</li>
          <li v-for="(data, index) in detailList" :key="index">
            <span v-if="data.stagesState !== 2">{{ data.stagesPrice }}</span>
            <span v-if="data.stagesState === 2" style="color: #999999;">{{ data.stagesPrice }}</span>
          </li>
        </ul>
        <ul>
          <li>还款状态</li>
          <li v-for="(data, index) in detailList" :key="index">
            <button v-if="data.stagesState !== 2" class="sure">未还款</button>
            <button v-if="data.stagesState === 2" style="color: #999999;">已还款</button>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PicShow from '../../components/common/PicShow'
export default {
  name: 'insurance_p',
  data () {
    return {
      ruleForm: {
        customer: {},
        obj: {}
      },
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        peoplename: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      form: {
        msg: '',
        errStates: 1
      },
      labelList: ['资料有误', '图片模糊', '车辆有误'],
      num: 0,
      baodan: 1,
      radio: '1',
      detailList: [],
      data: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 付款详情
    payDetail () {
      this.dialogFormVisible = true
      this.$fetch('/ad/insure/selectStagesDetail', {
        orderId: this.data.orderId
      }).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.detailList = res.data
          this.dialogFormVisible = true
        }
      })
    },
    exit () {
      var that = this
      this.$confirm('是否需要退保', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        that.$post('/ad/insure/surrender', {
          type: '1',
          id: this.$route.query.id
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '退保成功!'
            })
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    tab (i) {
      this.num = i
      this.form.errStates = i + 1
    },
    getData () {
      this.$fetch('/ad/insure/select', {
        id: this.$route.query.id,
        type: '1'
      }).then(res => {
        if (res.code === 0) {
          this.data = res.data.result.order
          this.ruleForm = res.data.result
        } else {
          this.$message(res.msg)
          this.$router.back(-1)
        }
      })
    }
  },
  components: {
    PicShow
  },
  deactivated () {
    this.$destroy()
  },
  filters: {
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '.' + zero(date.getMonth() + 1) + '.' + zero(date.getDate())
    },
    upToCase (data) {
      if (data === 1) return '一'
      if (data === 3) return '三'
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.insurance_p {
   padding: 0 20px 20px;
  background: #E0E0E0;
  .con {
    background: #fff;
    .body {
      width: 1080px;
      margin: 0 auto;
      padding-top: 52px;
      header {
        width:1013px;
        height:60px;
        line-height:60px;
        background:rgba(255,243,207,1);
        border:1px solid rgba(255,193,7,1);
        opacity:0.98;
        margin-left: 67px;
        margin-bottom: 59px;
        border-radius:5px;
        display: flex;
        justify-content: space-around;
        cursor: pointer;
        img {
          vertical-align: middle;
        }
      }
      .msg {
        padding: 28px 0;
        button {
          width: 87px;
        }
        .active {
          background:rgba(255,255,255,1);
          border:1px solid rgba(46,146,255,1);
          border-radius:3px;
        }
      }
      .btn {
        text-align: center;
        padding-bottom: 138px;
        margin-top: 75px;
        button {
          width: 209px;
          height: 57px;
          border-radius: 57px;
          background: #ccc;
          font-size:18px;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color:rgba(122,122,122,1);
        }
        .p {
          background: #282828;
          color: #fff;
          margin-right: 300px;
        }
      }
    }
  }
  .el-dialog {
    .el-input {
      width: 90%;
    }
    .el-form-item {
      button {
        background:rgba(255,255,255,1);
        border:1px solid rgba(238,238,238,1);
        border-radius:3px;
        color: #333333;
        margin: 0 16px;
      }
      button.active {
        border:1px solid rgba(40,40,40,1);
      }
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      background: #FFC107;
      color: #282828;
      text-indent: 35px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        vertical-align:  middle;
        padding: 0 10px;
      }
      span {
        font-size: 18px;
      }
      h2 {
        padding-left: 10px;
        img {
          vertical-align: middle;
        }
        span {
          font-size:18px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:#61432D;
        }
      }
      span {
        font-size:12px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:#61432D;
      }
      button {
        margin-right: 10px;
        width:50px;
        height:20px;
        line-height:20px;
        background:rgba(40,40,40,1);
        border-radius:20px;
        color: #fff;
        // padding: 5px 10px;
        text-indent: 0;
      }
    }
    .stages {
      max-height: 600px;
      overflow-y: scroll;
      padding: 20px 0;
      ul {
        float: left;
        width: 20%;
        text-align: center;
        button {
          width:72px;
          height:26px;
          line-height:26px;
          background:rgba(224,224,224,1);
          border-radius:13px;
          color: #666666;
        }
        .sure {
          width:72px;
          height:26px;
          background:rgba(40,40,40,1);
          border-radius:13px;
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
        li {
          line-height: 40px;
          font-size: 14px;
          &:first-of-type {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
    .dialog-footer {
      text-align: center;
      .btn {
        width:85px;
        height:40px;
        border:1px solid rgba(0,0,0,1);
        border-radius:5px;
        color: #282828;
      }
      .button {
        width:85px;
        height:40px;
        background:rgba(40,40,40,1);
        border-radius:5px;
        color: #fff;
        margin-left: 160px;
      }
    }
  }
}
</style>
