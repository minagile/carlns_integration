<template>
  <!-- 系统--账号管理 -->
  <div class="manage_account">
    <div class="manage" v-show="detail">
      <div class="button">
        <el-button @click="add">+ 添加账号</el-button>
        <!-- <el-button>删除</el-button> -->
      </div>
      <el-table :data="tableData" height="95%" style="width: 100%">
        <el-table-column prop="phone" label="账号"></el-table-column>
        <!-- <el-table-column prop="phone" label="密码"></el-table-column> -->
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <!-- <el-table-column label="权限管理" align="center">
          <template slot-scope="scope">
            <button class="edit" @click="manage(scope.row.id)">权限管理</button>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <button class="edit" @click="edit(scope.row.id)">编辑</button>
            <button class="edit" @click="del(scope.row.id, scope.row.type)">删除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加 -->
    <el-dialog :visible.sync="dialogFormVisible" width="770px" :modal-append-to-body="false">
      <template>
        <div class="header">
          <span>{{ title }}</span>
        </div>
      </template>
      <el-form :model="form" :rules="rule" ref="form">
        <el-form-item label="账号：" prop="name" label-width="190px">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" label-width="190px">
          <el-input v-model="form.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="psd" label-width="190px">
          <el-input v-model="form.psd" type="password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="con" label-width="190px">
          <el-input v-model="form.con" type="password" auto-complete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="选择角色：" prop="username" label-width="190px">
          <el-select v-model="form.roleId" placeholder="请选择角色" @change="changeselect">
            <el-option v-for="(o, i) in roleList" :key="i" :label="o.roleName" :value="o.roleId"></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
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
  name: 'ManageAccount',
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        phone: '',
        psd: '',
        con: '',
        roleId: ''
      },
      rule: {
        // user: [
        //   { required: true, message: '请输入账号', trigger: 'blur' }
        // ],
        phone: [
          { message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][0-9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
        // psd: [
        //   { required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        // con: [
        //   { required: true, message: '请确认密码', trigger: 'blur' }
        // ]
      },
      title: '添加账号',
      id: '',
      name: '',
      detail: true,
      manageTable: [],
      arr: [],
      roleList: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    changeselect (valhe) {
      // console.log(valhe)
    },
    add () {
      this.dialogFormVisible = true
      this.title = '添加账号'
      this.form = {
        user: '',
        phone: '',
        psd: '',
        con: ''
      }
      // GET /ad/role/findAll
      this.$fetch('/ad/role/findAll').then(res => {
        // console.log(res)
        this.roleList = res.data
      })
    },
    // 选择
    checkBox (id, status) {
      // console.log(id, status)
      if (status === true) {
        this.arr.push(id)
      } else {
        this.arr.forEach((v, k) => {
          if (v === id) {
            this.arr.splice(k, 1)
          }
        })
      }
      // console.log(this.arr)
    },
    // 权限设置-确定修改
    sure () {
      let ids = ''
      this.arr.forEach(v => {
        ids += v + ','
      })
      // console.log(ids)
      this.$post('/ad/limit/updatePermission', {
        fundIds: ids,
        adminId: this.id
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.detail = true
        } else {
          this.$message(res.msg)
        }
      })
    },
    // 权限管理
    manage (id) {
      this.detail = false
      this.id = id
      this.$fetch('/ad/limit/findByAdminId', {adminId: id}).then(res => {
        this.manageTable = res
      })
      this.$fetch('/ad/limit/selectByAdminId', {adminId: id}).then(res => {
        res.data.forEach(v => {
          this.arr.push(v.adauthId)
        })
      })
    },
    // 编辑账号
    edit (id) {
      this.title = '编辑账号'
      this.dialogFormVisible = true
      this.id = id
      this.$fetch('/ad/manager/findById', {id: id}).then(res => {
        this.form.name = res.data.adminName
        this.form.phone = res.data.adminPhone
        this.form.roleId = res.data.roleId
      })
      this.$fetch('/ad/role/findAll').then(res => {
        // console.log(res)
        this.roleList = res.data
      })
    },
    // 删除
    del (id, type) {
      let that = this
      if (type === 5) {
        const h = this.$createElement
        this.$notify({
          title: '警告',
          message: h('i', {style: 'color: teal'}, '这是超级管理员，不可删除！'),
          type: 'warning'
        })
      } else {
        this.$confirm('是否删除账号', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          that.$fetch('/ad/manager/remove', {
            id: id
          }).then(res => {
            if (res.code === 0) {
              this.getData()
              this.$message({
                type: 'success',
                message: '删除成功'
              })
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
      }
    },
    // 添加.编辑账号
    addMessage () {
      if (this.form.name === '') {
        this.$message.error('账号不为空')
      } else if (this.form.username === '') {
        this.$message.error('手机号不为空')
      } else if (this.form.psd === '') {
        this.$message.error('密码不为空')
      } else if (this.form.psd === this.form.con) {
        if (this.title === '编辑账号') {
          var data1 = {
            name: this.form.name,
            username: this.form.phone,
            password: this.form.psd,
            roleId: this.form.roleId,
            id: this.id
          }
          this.$post('/ad/manager/update', data1).then(res => {
            // console.log(res)
            if (res.code === 0) {
              this.dialogFormVisible = false
              this.getData()
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          var data = {
            name: this.form.name,
            phone: this.form.phone,
            password: this.form.psd,
            roleId: this.form.roleId
          }
          // console.log(data)
          this.$post('/ad/manager/add', data).then(res => {
            // console.log(res)
            if (res.code === 0) {
              this.dialogFormVisible = false
              this.getData()
              this.$message.success('添加成功')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      } else {
        this.$message.error('两次输入不一致')
      }
    },
    getData () {
      // /ad/manager/findAll
      this.$fetch('/ad/manager/findAll').then(res => {
        // console.log(res)
        this.tableData = res.data
        console.log(this.tableData)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.manage_account {
  position: absolute;
  background: #ffffff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  .manage {
    background: #fff;
    padding: 34px 100px 0;
    height: calc(100% - 34px);
    overflow: hidden;
    button {
      // width: 80px;
      // height: 32px;
      background:rgba(40,40,40,1);
      border-radius:5px;
      color: #fff;
    }
    p {
      float: left;
      line-height: 40px;
      font-size: 18px;
    }
    .r {float: right;}
    .edit {
      width:90px;
      height:30px;
      border:1px solid rgba(40,40,40,1);
      border-radius:15px;
      background: #fff;
      color: rgba(40,40,40,1);
      &:hover {
        background: rgba(40,40,40,1);
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
    .el-select {width: 405px;}
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
