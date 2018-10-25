<template>
  <!-- 系统--更该协议 -->
  <div class="change_file">
    <div class="con">
      <el-table :data="tableData" height="100%" style="width: 100%">
        <el-table-column prop="resourceName" label="协议名称"></el-table-column>
        <el-table-column prop="resourceName" label="内容" width="400"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <div>{{ scope.row.resourceState | type }}</div>
          </template>
        </el-table-column>
        <el-table-column label="最近一次修改时间">
          <template slot-scope="scope">
            <div>{{ scope.row.updateTime | timeChange }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <button class="edit" @click="edit(scope.row.resourceId, scope.row)">替换</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 替换合作协议 -->
    <el-dialog :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="770px">
      <template>
        <div class="header">
          <span>替换合作协议</span>
        </div>
      </template>
      <div class="box">
        <p>现有《{{ filesShow }}》<el-button size="small" @click="look">查看</el-button></p>
        <p>点击下图中的上传按钮上传新的合作协议：</p>
        <div class="upload">
          <img src="../../assets/mImg/upload.png" alt="">
          <a>点击上传{{resourceType === 1 ? '图片' : 'PDF'}}</a>
          <input type="file" @change="upfile" :accept="resourceType === 1 ? 'image/*' : '.pdf'">
          <span style="position: absolute;top:0;left:0;">{{ file.name }}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="sub" type="primary" @click="addMessage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Req } from '../../assets/js/http.js'
export default {
  name: 'ChangeFile',
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      idList: {},
      file: '',
      filesShow: '',
      resourceType: 1
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    upfile (e) {
      this.file = e.target.files[0]
    },
    look () {
      window.open(this.idList.resourceUrl)
    },
    addMessage () {
      var formData = new FormData()
      formData.append('file', this.file)
      formData.append('id', this.idList.resourceId)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': sessionStorage.getItem('token')
        }
      }
      this.$http.post(Req + '/ad/resource/update', formData, config).then(res => {
        // console.log(res)
        if (res.body.code === 102) {
          this.$router.push({
            path: '/MLogin',
            querry: { redirect: this.$router.currentRoute.fullPath }
            // 从哪个页面跳转
          })
        } else if (res.body.code === 0) {
          this.$message(res.body.msg)
          // this.$router.push({name: 'HomePage'})
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.body.msg)
        }
      })
    },
    getData () {
      this.$fetch('/ad/resource/showFiles').then(res => {
        this.tableData = res.data
      })
    },
    edit (id, data) {
      this.idList = data
      this.filesShow = data.resourceName
      this.dialogFormVisible = true
      this.resourceType = data.resourceType
      // this.$post('/ad/resource/update', {
      //   file
      // }).then(res => {
      //   console.log(res)
      // })
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
      return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate()) + ' ' + date.getHours() + ':' + zero(date.getMinutes())
    }
  }
}
function zero (data) {
  if (data < 10) return '0' + data
  return data
}
</script>

<style lang="less" scoped>
.change_file {
  position: absolute;
  background: #ffffff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  .con {
    padding: 40px 100px 0;
    height: calc(100% - 40px);
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
    .box {
      width:342px;
      margin: 0 auto;
      p {
        line-height: 40px;
        button {
          float: right;
          width:60px;
          height:32px;
          border:1px solid rgba(40,40,40,1);
          border-radius:5px;
          &:hover {
            background: #282828;
            color: #fff;
          }
        }
      }
      .upload {
        width:342px;
        height:186px;
        border: 1px solid #ccc;
        border-radius: 10px;
        text-align: center;
        position: relative;
        img {
          padding-top: 50px;
        }
        a {
          display: block;
          padding-top: 23px;
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(40,40,40,1);
        }
        input {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          cursor: pointer;
          opacity: 0;
        }
      }
    }
  }
}
</style>
