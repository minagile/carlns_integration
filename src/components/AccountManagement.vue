<template>
  <!-- 账号管理 -->
  <div class="account_management">
    <header>
      <p>添加子账号</p>
      <el-form :inline="true" ref="form" :model="form" label-width="180px">
        <el-form-item label="登录账号：">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码：">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button size="mini" class="sub" @click="addAccount">确定</el-button>
        <el-button size="mini" @click="cancel">取消</el-button>
      </div>
    </header>
    <div class="con">
      <p>已有子账号</p>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="userPhone" label="登录账号" width="180" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
          <el-table-column label="子账号状态" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.userState === 1">有效</div>
              <div v-if="scope.row.userState === 2">无效</div>
            </template>
          </el-table-column>
          <el-table-column label=" 操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
              <el-button type="text" @click="open6(scope.row.id)">删除</el-button>
              <!-- <el-button type="text">初始化密码</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑账号" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form1">
        <el-form-item label="用户名："  prop="userName" :label-width="formLabelWidth">
          <el-input v-model="form1.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码："  prop="password" :label-width="formLabelWidth">
          <el-input v-model="form1.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="是否禁用："  prop="userState" :label-width="formLabelWidth">
          <el-radio-group v-model="form1.userState">
            <el-radio :label="2" value="是">是</el-radio>
            <el-radio :label="1" value="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountManagement',
  data () {
    return {
      form: {
        'username': '',
        'password': '',
        'name': ''
      },
      tableData: [],
      dialogFormVisible: false,
      form1: {
        userName: '',
        password: '',
        userPhone: '',
        userState: 1
      },
      formLabelWidth: '100px'
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    cancel () {
      this.form = {
        'username': '',
        'password': '',
        'name': ''
      }
    },
    subEdit () {
      if (this.form1.password === '') {
        this.$message({
          type: 'error',
          message: '密码不能为空'
        })
      } else if (this.form1.userName === '') {
        this.$message({
          type: 'error',
          message: '用户名不能为空'
        })
      } else {
        this.$post('/fd/RAM/updateRAM', {
          id: this.form1.id,
          password: this.form1.password,
          name: this.form1.userName,
          stop: this.form1.userState
        }).then(res => {
          if (res.code === 0) {
            this.getData()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }
    },
    edit (id) {
      this.dialogFormVisible = true
      this.$fetch('/fd/RAM/showRAM', {id: id}).then(res => {
        this.form1 = res.data
      })
    },
    getData () {
      this.$fetch('/fd/RAM/showRAM').then(res => {
        this.tableData = res.data
      })
    },
    // 添加账号
    addAccount () {
      if (this.form.password === '') {
        this.$message({
          type: 'error',
          message: '密码不能为空'
        })
      } else if (this.form.username === '') {
        this.$message({
          type: 'error',
          message: '用户名不能为空'
        })
      } else if (this.form.name === '') {
        this.$message({
          type: 'error',
          message: '账号不能为空'
        })
      } else {
        this.$post('/fd/RAM/addRAM', this.form).then(res => {
          if (res.code === 0) {
            this.getData()
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.form = {
              'username': '',
              'password': '',
              'name': ''
            }
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }
    },
    // 删除确认
    open6 (id) {
      this.$confirm('确定要删除此项？', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        this.$fetch('/fd/RAM/removeRAM', {id: id}).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.getData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.account_management {
  margin-top: 20px;
  height: 97%;
  // background: #fff;
  position: relative;
  header {
    background: #fff;
    height: 297px;
    // padding: 30px 0 30px 25px;
    p {
      padding: 50px 0;
      text-indent: 60px;
      font-size:24px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(102,102,102,1);
    }
    .btn {
      text-align: center;
      padding-top: 30px;
      button {
        background:rgba(181,181,181,1);
        border-radius:5px;
        font-size:12px;
        font-family:PingFang-SC-Medium;
        color:rgba(255,255,255,1);
        margin: 0 55px;
      }
      .sub {
        background:rgba(68,96,237,1);
        border-radius:5px;
        font-size:12px;
        font-family:PingFang-SC-Medium;
        color:rgba(255,255,255,1);
      }
    }
    .el-input {
      width:260px;
    }
  }
  .con {
    background: #fff;
    margin-top: 20px;
    height: calc(100% - 317px);
    p {
      padding: 50px 0;
      text-indent: 60px;
      font-size:24px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(102,102,102,1);
    }
    .table {
      width: 80%;
      margin: 0 auto;
      min-width: 900px;
    }
  }
}
</style>
