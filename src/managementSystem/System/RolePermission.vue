<template>
  <!-- 系统--角色权限 -->
  <div class="role_permission">
    <div class="manage" v-show="detail">
      <div class="button">
        <el-button @click="add">+ 添加角色</el-button>
        <!-- <el-button>删除</el-button> -->
      </div>
      <el-table :data="tableData" height="95%" style="width: 100%">
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column label="权限管理" align="center">
          <template slot-scope="scope">
            <button class="edit" @click="manage(scope.row.roleId, scope.row.roleName)">权限设置</button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <button class="edit" @click="edit(scope.row.roleId)">编辑</button>
            <button class="edit" @click="del(scope.row.roleId)">删除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 权限分配 -->
    <el-dialog :visible.sync="rolepermission" width="90%" :modal-append-to-body="false">
      <div class="manage right">
        <p v-if="name">角色：{{ name }}</p>
        <div class="button r">
          <el-button @click="addsure">确定</el-button>
          <el-button @click="rolepermission = false">返回</el-button>
        </div>
        <el-table :data="manageTable" height="98%" style="width: 100%">
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
    </el-dialog>
    <!-- 添加 -->
    <el-dialog :visible.sync="dialogFormVisible" width="770px" :modal-append-to-body="false">
      <template>
        <div class="header">
          <span>{{ title }}</span>
        </div>
      </template>
      <el-form :model="form" :rules="rule" ref="form">
        <el-form-item label="角色名称：" prop="user" label-width="190px">
          <el-input v-model="form.user" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-button v-if="title === '添加角色'" size="mini" class="quanxian" @click="manage('')">权限设置</el-button>
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
  name: 'RolePermission',
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
      },
      title: '添加角色',
      id: '',
      name: '',
      detail: true,
      manageTable: [],
      arr: [],
      rolepermission: false,
      roleId: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 添加角色-权限设置-确定按钮
    addsure () {
      if (this.id === '') {
        this.rolepermission = false
      } else {
        // console.log(this.arr)
        this.sure()
        this.rolepermission = false
        // POST /ad/role/updateRole
        // this.$post('/ad/role/updateRole', {
        //   id: this.id,
        //   name: this.form.user
        // }).then(res => {
        //   console.log(res)
        //   // if (res) {}
        // })
      }
    },
    add () {
      this.dialogFormVisible = true
      this.title = '添加角色'
      this.form = {
        user: '',
        phone: '',
        psd: '',
        con: ''
      }
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
        roleId: this.id
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
    manage (id, name) {
      this.rolepermission = true
      this.id = id
      this.name = name
      // console.log(id)
      // 获取权限列表
      this.$fetch('/ad/limit/findByAdminId', {roleId: id}).then(res => {
        // console.log(res)
        this.manageTable = res
      })
      // 获取选中权限的id
      this.$fetch('/ad/limit/selectByAdminId', {roleId: id}).then(res => {
        res.data.forEach(v => {
          this.arr.push(v.adauthId)
        })
      })
      // console.log(this.arr)
    },
    // 修改角色名字
    edit (id) {
      this.title = '编辑角色'
      this.dialogFormVisible = true
      this.id = id
      this.$post('/ad/role/findById', {id: id}).then(res => {
        // console.log(res)
        this.form.user = res.data.roleName
        this.roleId = res.data.roleId
        // this.form.phone = res.data.adminPhone
      })
    },
    // 删除
    del (id) {
      // console.log(id)
      // POST /ad/manager/findByRoleId
      this.$post('/ad/manager/findByRoleId', {
        roleId: id
      }).then(response => {
        // console.log(response)
        var str = ''
        if (response.code === 0) {
          this.$message(response.msg)
        } else {
          this.$message(response.msg)
          str = response.msg + ','
        }
        const h = this.$createElement
        let that = this
        // this.$confirm(str + '是否删除角色', {
        this.$confirm(h('p', null, [
          h('span', { style: 'color: red' }, str),
          h('span', null, '是否删除角色')
        ]), {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          that.$post('/ad/role/deleteRole', {
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
      })
    },
    // 添加账号
    addMessage () {
      // console.log(this.arr)
      if (this.form.user === '') {
        this.$message.error('角色名称不为空')
      } else {
        if (this.title === '编辑角色') {
          this.$post('/ad/role/updateRole', {
            id: this.id,
            name: this.form.user
          }).then(res => {
            // console.log(res)
            if (res.code === 0) {
              this.dialogFormVisible = false
              this.getData()
              this.$message.success(res.msg)
            } else {
              this.$message(res.msg)
            }
          })
        } else {
          let ids = ''
          this.arr.forEach(v => {
            ids += v + ','
          })
          this.$post('/ad/role/createRole', {
            name: this.form.user,
            fundIds: ids
          }).then(res => {
            // console.log(res)
            if (res.code === 0) {
              this.dialogFormVisible = false
              this.getData()
              this.$message.success(res.msg)
            } else {
              this.$message(res.msg)
            }
          })
        }
      }
      // } else {
      //   this.$post('/ad/manager/add', {
      //     name: this.form.user,
      //     username: this.form.phone,
      //     password: this.form.psd
      //   }).then(res => {
      //     // console.log(res)
      //     if (res.code === 0) {
      //       this.dialogFormVisible = false
      //       this.getData()
      //     }
      //   })
      // }
    },
    getData () {
      // /ad/manager/findAll
      this.$fetch('/ad/role/findAll').then(res => {
        // console.log(res)
        this.tableData = res.data
        // console.log(this.tableData)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.role_permission {
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
    &.right {
      padding: 0;
      margin-top: -20px;
      height: 500px;
    }
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
    .quanxian {
      float: right;
      margin-right: 150px;
      border:1px solid rgba(40,40,40,1);
      color: rgba(40,40,40,1);
      &:hover {
        color: #fff;
        background: rgba(40,40,40,1);
      }
    }
    .el-form {
      overflow: hidden;
      min-height: 300px;
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
        &:hover {
          color: rgba(40,40,40,1);
          background: #fff;
        }
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
