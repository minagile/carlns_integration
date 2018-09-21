<template>
  <!-- 系统--权限分配 -->
  <div class="jurisdiction">
    <div class="manage">
      <div class="button">
        <el-button>+ 添加账号</el-button>
        <el-button>删除</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="messageName" label="标题" width="120"></el-table-column>
        <el-table-column prop="messageText" label="内容" width="600"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <div></div>
          </template>
        </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <div></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <button class="edit">编辑</button>
            <button class="edit">删除</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加 -->
    <!-- <el-dialog :visible.sync="dialogFormVisible" width="770px">
      <template>
        <div class="header">
          <span>添加账号</span>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item label="账号：" :label-width="formLabelWidth">
          <el-input v-model="form.messageName" auto-complete="off" placeholder="请输入短信标题"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="sub" type="primary" @click="addMessage">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: 'Jurisdiction',
  data () {
    return {
      tableData: []
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
    button {
      // width: 80px;
      // height: 32px;
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
