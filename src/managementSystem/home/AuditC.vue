<template>
  <!-- 待审核-企业 -->
  <div class="audit_c">
    <header>
      <el-table :data="tableData" style="width: 1127px;" @cell-click="handleSelectionChange">
        <el-table-column prop="carvin" label="车架号" width="180" align="center"></el-table-column>
        <el-table-column prop="nameplate" label="车辆合格证/车牌号" width="180" align="center"></el-table-column>
        <el-table-column prop="commercial" label="商业险" align="center"></el-table-column>
        <el-table-column prop="cartaffic" label="交强险" align="center"></el-table-column>
        <el-table-column prop="carboat" label="车船税" align="center"></el-table-column>
        <el-table-column prop="age" label="保单" align="center"></el-table-column>
        <el-table-column prop="stages" label="月付期数" align="center"></el-table-column>
        <el-table-column label="审核不通过" align="center">
          <template slot-scope="scope">
            <div class="check">
              <img src="../../assets/mImg/circle.png" alt="">
              <!-- <img src="../../assets/mImg/delete.png" alt=""> -->
              <input type="checkbox">
            </div>
          </template>
        </el-table-column>
      </el-table>
    </header>
    <div class="con">
      <div class="box">
        <div class="tit">
          <img src="../../assets/mImg/usermsg.png" alt="">
        </div>
        <div class="msg">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="企业名称：" prop="companyName">
              <el-input v-model="ruleForm.companyName"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" prop="legalPersonName">
              <el-input v-model="ruleForm.legalPersonName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="companyTel">
              <el-input v-model="ruleForm.companyTel"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tit">
          <img src="../../assets/mImg/user_msg.png" alt="">
        </div>
        <div class="pic">
          <PicShow :imgList="ruleForm" :from="'企业待审核'"/>
        </div>
        <div class="btn">
          <button class="p" @click="pass('pass')">通过审核</button>
          <button @click="pass('notpass')">审核不通过</button>
        </div>
      </div>
    </div>
    <!-- 弹窗-审核不通过 -->
    <el-dialog :show-close="false" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="770px">
      <template>
        <div class="header">
          <span>审核不通过</span>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item label="审核不通过原因：" label-width="140px">
          <el-button v-for="(o, index) in labelList" :key="index"  :class="{active:index == num}" @click="tab(index)">{{ o }}</el-button>
        </el-form-item>
        <el-form-item label="备注：" label-width="70px">
          <el-input type="textarea" v-model="form.msg"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn" @click="dialogFormVisible = false">取消</el-button>
        <el-button class="button" @click="commit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PicShow from '../../components/common/PicShow'
export default {
  name: 'AuditC',
  data () {
    return {
      tableData: [],
      ruleForm: {
        companyName: '',
        legalPersonName: '',
        companyTel: ''
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
      arr: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleSelectionChange (row, column, cell, event) {
      if (event.target.checked === true) {
        this.arr.push(row.carId)
      } else {
        this.arr.forEach((v, k) => {
          if (row.carId === v) {
            this.arr.splice(k, 1)
          }
        })
      }
    },
    commit () {
      // console.log(this.arr)
      var ids = ''
      this.arr.forEach(v => {
        ids += v + ','
      })
      this.$post('/ad/insure/update', {
        id: this.$route.query.id,
        type: 2,
        batch: this.$route.query.batch,
        state: 0,
        errStates: this.form.errStates,
        ids: ids,
        msg: this.form.msg
      }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message({type: 'success', message: '成功'})
          this.dialogFormVisible = false
          this.$router.push({name: 'AllChannels'})
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    pass (str) {
      if (str === 'notpass') {
        this.dialogFormVisible = true
      } else {
        this.$post('/ad/insure/update', {
          id: this.$route.query.id,
          type: 2,
          batch: this.$route.query.batch,
          state: 1
        }).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$message({type: 'success', message: '成功'})
            this.$router.push({name: 'AllChannels'})
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    tab (i) {
      this.num = i
      this.form.errStates = i + 1
    },
    getData () {
      // /ad/insure/select
      this.$fetch('/ad/insure/select', {
        id: this.$route.query.id,
        batch: this.$route.query.batch,
        type: '2'
      }).then(res => {
        // console.log(res.data)
        this.tableData = res.data.result.obj
        this.ruleForm = res.data.result.company
      })
    }
  },
  components: {
    PicShow
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.audit_c {
  padding: 0 20px 20px;
  background: #E0E0E0;
  header {
    min-height: 100px;
    background: #fff;
    margin-bottom: 10px;
    padding-top: 50px;
    .el-table {
      margin: 0 auto 0;
      .check {
        position: relative;
        input {
          position: absolute;
          top: 0;
          left: calc(50% - 15px);
          background: #FFC107;
          width: 30px;
          height: 30px;
          // opacity: 0.6;
          cursor: pointer;
        }
      }
    }
  }
  .con {
    background: #fff;
    padding-top: 40px;
    .box {
      width: 1080px;
      margin: 0 auto;
      .msg {
        margin: 25px 0;
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
      height: 40px;
      line-height: 40px;
      img {
        vertical-align:  middle;
        padding: 0 10px;
      }
      span {
        font-size: 18px;
        font-weight: bold;
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
