<template>
  <!-- 渠道详情 -->
  <div class="channel_detail">
    <div class="header">
      <div class="tit">
        <img src="../../assets/mImg/usermsg.png" alt="">
      </div>
      <div class="msg">
          <el-form :model="ruleForm" size="mini" label-width="167px" class="demo-ruleForm">
            <el-form-item label="企业名称：" prop="channelName">
              <el-input v-model="ruleForm.channelName"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" prop="channelUserName">
              <el-input v-model="ruleForm.channelUserName"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="channelUserPhone">
              <el-input v-model="ruleForm.channelUserPhone"></el-input>
            </el-form-item>
            <el-form-item label="联系地址：" prop="channelAddress">
              <el-input v-model="ruleForm.channelAddress"></el-input>
            </el-form-item>
          </el-form>
        </div>
      <div class="tit">
        <img src="../../assets/mImg/picmsg.png" alt="">
      </div>
      <div class="pic">
        <figure>
          <div class="text"><span>营业执照：</span></div>
          <div class="right">
            <a class="box" :style="{'backgroundImage': 'url(' + ruleForm.channelLicenseUrl + ')'}" :href="ruleForm.channelLicenseUrl" target="_blank"></a>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
        <figure>
          <div class="text"><span>代理商合作协议：</span></div>
          <div class="right">
            <a class="box" style="background-image: url(../../assets/mImg/download.png)"></a>
            <button @click="download">下载</button>
          </div>
        </figure>
        <figure>
          <div class="text"><span>法人身份证正面：</span></div>
          <div class="right">
            <a class="box" :style="{'backgroundImage': 'url(' + ruleForm.channelIdcardUp + ')'}" :href="ruleForm.channelIdcardUp" target="_blank"></a>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
        <figure>
          <div class="text"><span>法人身份证反面：</span></div>
          <div class="right">
            <a class="box" :style="{'backgroundImage': 'url(' + ruleForm.channelIdcardDown + ')'}" :href="ruleForm.channelIdcardDown" target="_blank"></a>
            <p>支持jpg、jpeg、png等格式，体积在5M以下 </p>
          </div>
        </figure>
      </div>
      <div class="btn">
        <button v-if="$route.query.look === 1" class="p" @click="dialogFormVisible = true">提交</button>
        <button @click="$router.back(-1)">取消</button>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog :show-close="false" :visible.sync="dialogFormVisible" :modal-append-to-body="false" width="770px">
      <template>
        <div class="header">
          <span>渠道通过审核</span>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item label="个人费率：" label-width="170px">
          <el-select v-model="form.p">
            <el-option v-for="(o, i) in form.person" :key="i" :label="o.templateName" :value="o.templateId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业费率：" label-width="170px">
          <el-select v-model="form.c">
            <el-option v-for="(o, i) in form.componay" :key="i" :label="o.templateName" :value="o.templateId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn" @click="dialogFormVisible = false">取消</el-button>
        <el-button class="button" @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ChannelDetail',
  data () {
    return {
      ruleForm: {
        channelName: '',
        channelUserName: '',
        channelUserPhone: '',
        channelAddress: '',
        channelProtocolUrl: '',
        channelIdcardUp: '',
        channelIdcardDown: ''
      },
      dialogFormVisible: false,
      form: {
        c: '',
        p: ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    submit () {
      if (this.form.c === '') {
        this.$message('选择企业模板费率')
      } else if (this.form.p === '') {
        this.$message('选择个人模板费率')
      } else {
        this.$post('/ad/channel/update', {
          id: this.$route.query.id,
          cusTemplateId: this.form.p,
          comTemplateId: this.form.c,
          state: 1
        }).then(res => {
          if (res.code === 0) {
            this.$router.push({name: 'Trench'})
            this.$message({type: 'success', message: '操作成功'})
          } else {
            this.$message(res.msg)
          }
        })
      }
    },
    download () {
      window.open(this.ruleForm.channelProtocolUrl)
    },
    getData () {
      this.$fetch('/ad/channel/select', {id: this.$route.query.id}).then(res => {
        console.log(res)
        this.ruleForm = res.data.channel
        this.$fetch('/template/selectCTemplate').then(res => {
          console.log(res)
          this.form.componay = res
        })
        this.$fetch('/template/selectPTemplate').then(res => {
          console.log(res)
          this.form.person = res
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel_detail {
  background: #fff;
  height: 100%;
  .header {
    width: 1080px;
    margin: 0 auto;
    .msg {
      padding-top: 20px;
    }
    .tit {
      padding-top: 50px;
    }
  }
  .pic {
    overflow: hidden;
    // padding-top: 40px;
    padding-bottom: 20px;
    figure {
      height: 200px;
      width: 50%;
      padding-top: 30px;
      float: left;
      .text {
        float: left;
        width: 150px;
        height: 100%;
        span {
          position: relative;
          display: block;
          width: 180px;
          text-align: right;
          font-size: 14px;
          color: #606266;
        }
      }
      .right {
        float: left;
        width: 300px;
        height: 100%;
        position: relative;
        button {
          width:85px;
          height:40px;
          background:rgba(192,222,255,1);
          border-radius:5px;
          color:rgba(254,254,254,1);
          position: absolute;
          bottom: 60px;
          right: 0;
        }
        .box {
          width:142px;
          height:142px;
          border:1px solid rgba(170,170,170,1);
          border-radius:10px;
          margin-left: 50px;
          text-align: center;
          position: relative;
          overflow: hidden;
          display: block;
          background-image: url(../../assets/mImg/download.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          img {
            display: block;
            width: 56px;
            margin: 30px auto;
          }
          a {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color:rgba(46,146,255,1);
          }
          input {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
          }
        }
        p {
          font-size:12px;
          line-height: 30px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
      }
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
  .el-dialog {
    .el-input {
      width: 90%;
    }
    .el-form-item {
      margin-bottom: 70px;
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
        background: #fff;
        padding: 0;
        margin-top: 0;
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
