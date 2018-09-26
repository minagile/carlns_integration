<template>
  <!-- 系统--权限分配 -->
  <div class="jurisdiction">
    <div class="manage" v-show="detail">
      <div class="button">
        <el-button @click="dialogFormVisible = true, title = '添加账号'">+ 添加账号</el-button>
        <el-button>删除</el-button>
      </div>
      <el-table :data="tableData" height="95%" style="width: 100%">
        <el-table-column prop="phone" label="账号"></el-table-column>
        <el-table-column label="权限管理" align="center">
          <template slot-scope="scope">
            <button class="edit" @click="manage(scope.row.id)">权限管理</button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <button class="edit" @click="edit(scope.row.id)">编辑</button>
            <button class="edit" @click="del(scope.row.id)">删除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 权限分配 -->
    <div class="manage" v-show="!detail">
      <p>账号：{{ name }}</p>
      <div class="button r">
        <el-button @click="sure">确定</el-button>
        <el-button @click="detail = true">返回</el-button>
      </div>
      <el-table :data="manageTable" height="95%" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.object" :show-header="false" style="width: 100%">
              <el-table-column prop="name"></el-table-column>
              <el-table-column>
                <template slot-scope="prop">
                  <div v-if="prop.row.fp">
                    <el-checkbox v-if="prop.row.fp[0] === null" disabled></el-checkbox>
                    <el-checkbox v-if="prop.row.fp[0]" v-model="prop.row.fp[0][0].status" @change="checkBox(prop.row.fp[0][0].id, $event)"></el-checkbox>
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="prop">
                  <div v-if="prop.row.fp">
                    <el-checkbox v-if="prop.row.fp[1] === null" disabled></el-checkbox>
                    <el-checkbox v-if="prop.row.fp[1]" v-model="prop.row.fp[1][0].status" @change="checkBox(prop.row.fp[1][0].id, $event)"></el-checkbox>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="功能"></el-table-column>
        <el-table-column label="查看">
          <template slot-scope="prop">
            <div v-if="prop.row.fpl">
              <el-checkbox v-if="prop.row.fpl[0] === null" disabled></el-checkbox>
              <el-checkbox v-if="prop.row.fpl[0]" v-model="prop.row.fpl[0][0].status" @change="checkBox(prop.row.fpl[0][0].id, $event)"></el-checkbox>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="prop">
            <div v-if="prop.row.fpl">
              <el-checkbox v-if="prop.row.fpl[1] === null" disabled></el-checkbox>
              <el-checkbox v-if="prop.row.fpl[1]" v-model="prop.row.fpl[1][0].status" @change="checkBox(prop.row.fpl[1][0].id, $event)"></el-checkbox>
            </div>
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
        <el-form-item label="账号：" prop="user" label-width="190px">
          <el-input v-model="form.user" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" label-width="190px">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="psd" label-width="190px">
          <el-input v-model="form.psd" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="con" label-width="190px">
          <el-input v-model="form.con" type="password" auto-complete="off"></el-input>
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
  name: 'Jurisdiction',
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        user: '',
        phone: '',
        psd: '',
        con: ''
      },
      rule: {
        user: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        psd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        con: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      },
      title: '添加账号',
      id: '',
      name: '',
      detail: true,
      manageTable: [],
      arr: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
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
        console.log(res)
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.detail = true
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
        this.form.user = res.data.adminName
        this.form.phone = res.data.adminPhone
      })
    },
    // 删除
    del (id) {
      let that = this
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
    },
    // 添加账号
    addMessage () {
      if (this.form.user === '') {
        this.$message.error('账号不为空')
      } else if (this.form.phone === '') {
        this.$message.error('手机号不为空')
      } else if (this.form.psd === '') {
        this.$message.error('密码不为空')
      } else if (this.form.psd === this.form.con) {
        if (this.title === '编辑账号') {
          this.$fetch('/ad/manager/update', {
            name: this.form.user,
            username: this.form.phone,
            password: this.form.psd,
            id: this.id
          }).then(res => {
            // console.log(res)
            if (res.code === 0) {
              this.dialogFormVisible = false
              this.getData()
            }
          })
        } else {
          this.$post('/ad/manager/add', {
            name: this.form.user,
            username: this.form.phone,
            password: this.form.psd
          }).then(res => {
            // console.log(res)
            if (res.code === 0) {
              this.dialogFormVisible = false
              this.getData()
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
      })
    }
  }
}
</script>

<style lang="less" scoped>
.jurisdiction {
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
