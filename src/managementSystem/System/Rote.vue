<template>
  <!-- 系统--费率模板 -->
  <div class="rote">
    <header>
      <el-button size="small" class="left" :class="{active: 1 == board}" @click="tab(1)">个人模板</el-button>
      <el-button size="small" class="left" :class="{active: 2 == board}" @click="tab(2)">企业模板</el-button>
      <el-button class="r"  @click="add">新建模板</el-button>
    </header>
    <div class="con">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="是否为默认" align="center" width="90">
          <template slot-scope="scope">
            <div>
              <img v-if="scope.row.templateState === 0" src="../../assets/mImg/mo.png" alt="">
              <img v-if="scope.row.templateState === 1" src="../../assets/mImg/checked.png" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="templateName" label="模板名称"></el-table-column>
        <el-table-column label="首付比例">
          <template slot-scope="scope">
            <div>{{ scope.row.downPayment }}</div>
          </template>
        </el-table-column>
        <el-table-column label="平台服务费率">
          <template slot-scope="scope">
            <div>{{ scope.row.fee }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="twelveFee" label="12期服务费率"></el-table-column>
        <el-table-column prop="eighteenFee" label="18期服务费率"></el-table-column>
        <el-table-column prop="twentyFourFee" label="24期服务费率"></el-table-column>
        <el-table-column prop="thirtySixFee" label="36期服务费率"></el-table-column>
        <el-table-column prop="ifDownPayment" label="是否付首期"></el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <button class="edit" @click="edit(scope.row.templateId)">编辑</button>
            <button class="edit" @click="del(scope.row.templateId)">删除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模板创建 -->
    <el-dialog :visible.sync="dialogFormVisible" width="770px" :modal-append-to-body="false">
      <template>
        <div class="header">
          <span>新增{{name}}费率</span>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item label="模板名称：" :label-width="formLabelWidth">
          <el-input v-model="form.templateName" auto-complete="off" placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="首付比例：" :label-width="formLabelWidth">
          <el-input v-model="form.downPayment" placeholder="请输入首付比例"></el-input>
        </el-form-item>
        <el-form-item label="平台服务率：" :label-width="formLabelWidth">
          <el-input v-model="form.fee" auto-complete="off" placeholder="请输入平台服务率"></el-input>
        </el-form-item>
        <el-form-item label="12期服务费率:" :label-width="formLabelWidth">
          <el-input v-model="form.twelveFee" auto-complete="off"  placeholder="请输入12期服务费率"></el-input>
        </el-form-item>
        <el-form-item label="18期服务费率:" :label-width="formLabelWidth">
          <el-input v-model="form.eighteenFee" auto-complete="off"  placeholder="请输入18期服务费率"></el-input>
        </el-form-item>
        <el-form-item label="24期服务费率:" :label-width="formLabelWidth">
          <el-input v-model="form.twentyFourFee" auto-complete="off"  placeholder="请输入24期服务费率"></el-input>
        </el-form-item>
        <el-form-item label="36期服务费率:" :label-width="formLabelWidth">
          <el-input v-model="form.thirtySixFee" auto-complete="off"  placeholder="请输入36期服务费率"></el-input>
        </el-form-item>
        <el-form-item label="是否首付：" :label-width="formLabelWidth">
          <el-radio v-model="form.ifDownPayment" :label="1">是</el-radio>
          <el-radio v-model="form.ifDownPayment" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否为默认模板：" :label-width="formLabelWidth">
          <el-radio v-model="form.templateState" :label="1" @change="changestate">是</el-radio>
          <el-radio v-model="form.templateState" :label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="sub" type="primary" @click="addMessage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Rote',
  data () {
    return {
      tableData: [],
      board: 1,
      dialogFormVisible: false,
      form: {
        'templateName': '',
        'downPayment': '',
        'fee': '',
        'twelveFee': '',
        'eighteenFee': '',
        'twentyFourFee': '',
        'thirtySixFee': '',
        'ifDownPayment': 0,
        'templateState': 0
      },
      formLabelWidth: '170px',
      addOrEdit: 1,
      name: '个人'
    }
  },
  mounted () {
    this.getData('selectPTemplate')
  },
  methods: {
    changestate () {
      this.$confirm('是否将其修改为默认模板', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '默认模板选择成功'
        })
      }).catch(() => {
        this.form.templateState = 0
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    getData (data) {
      this.$fetch('/template/' + data).then(res => {
        // console.log(res)
        this.tableData = res
      })
    },
    // 添加
    add () {
      this.dialogFormVisible = true
      this.addOrEdit = 1
      this.form = {
        'templateName': '',
        'downPayment': '',
        'fee': '',
        'twelveFee': '',
        'eighteenFee': '',
        'twentyFourFee': '',
        'thirtySixFee': '',
        'ifDownPayment': 0,
        'templateState': 0
      }
    },
    addMessage () {
      this.form.ifPAndC = this.board
      if (this.addOrEdit === 1) {
        // 添加模板
        this.$post('/template/insertTemplate', this.form).then(res => {
          if (res.code === 0) {
            this.$message({type: 'success', message: '创建模板成功'})
            this.dialogFormVisible = false
            if (this.board === 1) {
              this.getData('selectPTemplate')
            } else {
              this.getData('selectCTemplate')
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        // 修改模板
        this.$put('/template/updateTemplate', this.form).then(res => {
          if (res.code === 0) {
            this.$message({type: 'success', message: '修改模板成功'})
            this.dialogFormVisible = false
            if (this.board === 1) {
              this.getData('selectPTemplate')
            } else {
              this.getData('selectCTemplate')
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 编辑
    edit (id) {
      this.dialogFormVisible = true
      // console.log(id)
      this.addOrEdit = 2
      this.$fetch('/template/selectById', {id: id}).then(res => {
        // console.log(res)
        this.form = res
      })
    },
    // 删除
    del (id) {
      this.$confirm('确定要删除此项？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$post('/template/deleteTemplate', {'id': id}).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            if (this.board === 1) {
              this.getData('selectPTemplate')
            } else {
              this.getData('selectCTemplate')
            }
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
    // 切换
    tab (i) {
      this.board = i
      if (i === 1) {
        this.getData('selectPTemplate')
        this.name = '个人'
      } else {
        this.getData('selectCTemplate')
        this.name = '企业'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rote {
  position: absolute;
  background: #ffffff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  header {
    height: 83px;
    padding: 0 100px 0;
    .left {
      margin-top: 35px;
    }
    .left:hover, .active {
      background:rgba(255,148,148,1);
      color: #fff;
      border-color: rgba(255,148,148,1);
    }
    .r {
      float: right;
      margin-top: 25px;
      margin-right: 10px;
      width:100px;
      height:42px;
      background:rgba(222,222,222,1);
      border-radius:5px;
      &:hover {
        background:rgba(40,40,40,1);
        color: #fff;
      }
    }
  }
  .con {
    padding: 0 100px;
    .edit {
      width:90px;
      height:30px;
      border:1px solid rgba(40,40,40,1);
      border-radius:15px;
      background: #fff;
      &:hover {
        background:rgba(40,40,40,1);
        color: #fff;
      }
    }
  }
  .el-dialog {
    .el-input, .el-textarea {
      width: 405px;
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      background: #FFC107;
      text-indent: 10px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size:18px;
      font-family:MicrosoftYaHei-Bold;
      font-weight:bold;
      color:rgba(40,40,40,1);
      span {
        font-size: 18px;
      }
    }
    .dialog-footer {
      text-align: center;
      button {
        width:85px;
        height:40px;
        border:1px solid rgba(40,40,40,1);
        border-radius:5px;
      }
      .sub {
        width:85px;
        height:40px;
        background:rgba(40,40,40,1);
        border-radius:5px;
        margin-left: 160px;
      }
    }
  }
}
</style>
