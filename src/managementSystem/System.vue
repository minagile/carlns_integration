<template>
  <!-- 系统 -->
  <div class="system">
    <header>
      <button v-for="(data, index) in list" :key="index" :class="{active: index == num}" @click="tab(index)">{{ data }}</button>
    </header>
    <div class="con">
      <router-view></router-view>
      <button @click="add">添加</button>
      <el-table :data="tableData" height="95%" style="width: 100%">
        <el-table-column label="是否为默认" align="center" width="90">
          <template slot-scope="scope">
            <div>
              <img v-if="scope.row.messageState === 2" src="../assets/mImg/mo.png" alt="">
              <img v-if="scope.row.messageState === 1" src="../assets/mImg/checked.png" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="messageName" label="标题" width="120"></el-table-column>
        <el-table-column prop="messageText" label="内容" width="600"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <div>{{ scope.row.messageType | type }}</div>
          </template>
        </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <div>{{ scope.row.createTime | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <button class="edit" @click="edit(scope.row.messageId)">编辑</button>
            <button class="edit" @click="del(scope.row.messageId)">删除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 短信添加 -->
    <el-dialog :visible.sync="dialogFormVisible" width="770px">
      <template>
        <div class="header">
          <span>短信模板</span>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item label="短信标题：" :label-width="formLabelWidth">
          <el-input v-model="form.messageName" auto-complete="off" placeholder="请输入短信标题"></el-input>
        </el-form-item>
        <el-form-item label="短信内容：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.messageText" placeholder="请输入短信内容"></el-input>
        </el-form-item>
        <el-form-item label="类型：" :label-width="formLabelWidth">
          <el-select v-model="form.messageType" placeholder="请选择短信类型">
            <el-option label="渠道验证" :value="1"></el-option>
            <el-option label="渠道申请通过" :value="2"></el-option>
            <el-option label="渠道申请未通过" :value="3"></el-option>
            <el-option label="个人车险到期" :value="4"></el-option>
            <el-option label="企业车险到期" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签名：" :label-width="formLabelWidth">
          <el-input v-model="form.messageTitle" auto-complete="off" placeholder="请输入签名"></el-input>
        </el-form-item>
        <el-form-item label="模板CODE：" :label-width="formLabelWidth">
          <el-input v-model="form.messageCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数：" :label-width="formLabelWidth">
          <el-input v-model="form.messageParams" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认发送模板：" :label-width="formLabelWidth">
          <el-radio v-model="form.messageState" :label="1">是</el-radio>
          <el-radio v-model="form.messageState" :label="2">否</el-radio>
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
  name: 'System',
  data () {
    return {
      // list: ['短信模板', '更改协议', '权限分配', '日志', '费率模板'],
      // listHref: ['System', 'ChangeFile', 'Jurisdiction', 'Journal', 'Rote'],
      list: [],
      listHref: [],
      num: 0,
      tableData: [],
      dialogFormVisible: false,
      form: {
        'messageName': '',
        'messageText': '',
        'messageType': '',
        'messageTitle': '',
        'messageCode': '',
        'messageParams': '',
        'messageState': 2
      },
      formLabelWidth: '170px',
      addOrEdit: 'add'
    }
  },
  mounted () {
    let permissionData = JSON.parse(sessionStorage.getItem('permission'))
    permissionData.forEach(v => {
      if (v === '短信模板') {
        this.list.push(v)
        this.listHref.push('System')
      }
      if (v === '更改协议') {
        this.list.push(v)
        this.listHref.push('ChangeFile')
      }
      if (v === '权限分配') {
        this.list.push(v)
        this.listHref.push('Jurisdiction')
      }
      if (v === '日志') {
        this.list.push(v)
        this.listHref.push('Journal')
      }
      if (v === '费率模板') {
        this.list.push(v)
        this.listHref.push('Rote')
      }
    })
    let path = this.$router.history.current.fullPath
    // console.log(path.split('/').reverse()[0])
    this.listHref.forEach((v, k) => {
      if (path.split('/').reverse()[0] === v) {
        this.num = k
      }
    })
    this.getData()
  },
  methods: {
    // 删除
    del (id) {
      // console.log(id)
      this.$confirm('确定要删除此项？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$fetch('/ad/message/delete', {'messageId': id}).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getData()
          } else {
            this.$message(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add () {
      this.dialogFormVisible = true
      this.addOrEdit = 'add'
      this.form = {
        'messageName': '',
        'messageText': '',
        'messageType': '',
        'messageTitle': '',
        'messageCode': '',
        'messageParams': '',
        'messageState': 2
      }
    },
    // 修改
    edit (id) {
      this.$fetch('/ad/message/selectMessageById', {'messageId': id}).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.dialogFormVisible = true
          this.addOrEdit = 'edit'
          this.form = res.data.message
        }
      })
    },
    // 添加短信
    addMessage () {
      if (this.addOrEdit === 'add') {
        this.$post('/ad/message/insert', this.form).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getData()
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      } else {
        this.$post('/ad/message/changeMessage', this.form).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getData()
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }
    },
    // 获取短信列表数据
    getData () {
      this.$fetch('/ad/message/selectAllMessage').then(res => {
        // console.log(res)
        this.tableData = res.data
      })
    },
    tab (index) {
      this.num = index
      this.$router.push({name: this.listHref[index]})
    }
  },
  filters: {
    type (data) {
      if (data === 1) return '渠道验证'
      if (data === 2) return '渠道申请通过'
      if (data === 3) return '渠道申请未通过'
      if (data === 4) return '个人车险到期'
      if (data === 5) return '企业车险到期'
      return '此状态未知'
    },
    timeChange (data) {
      let date = new Date(data)
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate())
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<style lang="less" scoped>
.system {
  padding: 0 20px 20px;
  height: calc(100% - 20px);
  header {
    background: #fff;
    height: 110px;
    line-height: 110px;
    button {
      width:100px;
      height:42px;
      line-height:42px;
      background:#DEDEDE;
      border-radius:5px;
      color:#666666;
      margin: 0 0 0 45px;
      &.active {
        background:rgba(40,40,40,1);
        color: #fff;
      }
    }
  }
  .con {
    background: #fff;
    margin-top: 20px;
    height: calc(100% - 164px);
    padding: 34px 100px 0;
    position: relative;
    button {
      width: 80px;
      height: 32px;
      background:rgba(40,40,40,1);
      border-radius:5px;
      color: #fff;
    }
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
