<template>
  <!-- 未通过--企业详情 -->
  <div class="cen_detail_c">
    <div class="table">
      <!-- <div class="errormsg">
        <span><img src="../../assets/img/danger.png" style="margin: 5px 30px 0 0;">{{ error.errormsg }}</span>
      </div> -->
      <el-table :data="tableData" style="width: 1127px;margin: 0 auto;" >
        <el-table-column prop="carvin" label="车架号" width="180" align="center"></el-table-column>
        <el-table-column prop="nameplate" label="车辆合格证/车牌号" width="180" align="center"></el-table-column>
        <el-table-column prop="commercial" label="商业险" align="center"></el-table-column>
        <el-table-column prop="cartaffic" label="交强险" align="center"></el-table-column>
        <el-table-column prop="carboat" label="车船税" align="center"></el-table-column>
        <el-table-column prop="age" label="保单" align="center"></el-table-column>
        <el-table-column prop="stages" label="月付期数" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div style="color: #4B86FF">退保中</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 客户基本信息 -->
    <div class="basic">
      <div class="tit">
        <img src="../../assets/img/user_basic_info.png" alt="">
      </div>
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
    <!-- 图片信息 -->
    <div class="pic">
      <div class="tit">
        <img src="../../assets/img/img_info.png" alt="">
      </div>
      <PicShow :imgList="ruleForm" :from="'企业待审核'"/>
    </div>
    <div class="btn">
      <button @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>

<script>
import PicShow from '../common/PicShow'
export default {
  name: 'CenDetailC',
  data () {
    return {
      ruleForm: {
        name: '',
        peoplename: '',
        phone: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        peoplename: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      tableData: [],
      error: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      // /ad/insure/select
      this.$fetch('/fd/insure/selectDetail', {
        id: this.$route.query.id,
        batch: this.$route.query.batch,
        type: '2'
      }).then(res => {
        console.log(res.data.result)
        this.tableData = res.data.result.obj
        this.error = res.data.result.error
        this.ruleForm = res.data.result.company
      })
    }
  },
  deactivated () {
    this.$destroy()
  },
  components: {
    PicShow
  }
}
</script>

<style lang="less" scoped>
.cen_detail_c {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  min-height: 100%;
  z-index: 99999;
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 13px;
  }
  .table {
    padding: 33px 0 50px;
    border-bottom: 10px solid #E0E0E0;
    table {
      border-collapse: collapse;
      margin: 0 auto;
      width: 1240px;
      tr {
        background: #4B86FF;
        line-height: 46px;
        color: #fff;
        text-align: center;
      }
    }
    .errormsg {
      width:1062px;
      height:60px;
      background:rgba(243,247,255,1);
      border:1px solid rgba(68,123,237,1);
      border-radius:5px;
      margin: 0 auto 40px;
      font-size:18px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,150,0,1);
      text-align: center;
      line-height: 60px;
    }
  }
  .basic {
    width: 1080px;
    margin: 38px auto 0;
    .tit {
      margin-bottom: 10px;
    }
  }
  .pic {
    width: 1080px;
    margin: 20px auto 0;
  }
  .btn {
    text-align: center;
    padding-top: 50px;
    button {
      width: 210px;
      height: 57px;
      line-height: 57px;
      border: 0;
      border-radius: 57px;
      margin-bottom: 40px;
      font-size: 20px;
      font-family: PingFang-SC-Bold;
      font-weight: 600;
      color:#666;
      outline: none;
      background: #ccc;
      &.save {
        background: linear-gradient(left, #4e8fff, #5cc5ff);
        color: #fff;
      }
    }
  }
}
</style>
