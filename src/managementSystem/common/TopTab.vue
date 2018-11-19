<template>
  <div class="top">
    <div class="tab">
      <ul id="quanbu">
        <li v-for="(data, index) in list" :key="index" :class="{active: index == num}" @click="tab(index)" @mousemove="tabmove(index, $event)" @mouseleave="onleave">
          <a>{{ data }}</a>
        </li>
        <div class="tuibao position" id="tuibao" v-show="retreats" @mouseleave="leave">
          <div class="li" @click="tuibao(1)"><a>退保中</a></div>
          <div class="li" @click="tuibao(2)"><a>已退保</a></div>
        </div>
        <!-- 全部渠道 -->
        <!-- <div class="all position" v-show="all" @mouseleave="leave"> -->
        <div class="all position" v-show="ceshi"  @mouseleave="onleave">
          <div class="area">
            <div class="l">
              <span style="margin-left: 30px;">选择区域：</span>
              <el-cascader
                :options="options1"
                @change="handleItemChange1"
                :props="props"
                size="small">
              </el-cascader>
              省
              <el-cascader
                :options="options2"
                @change="handleItemChange2"
                :props="props"
                size="small">
              </el-cascader>
              市
              <el-cascader
                :options="options3"
                @change="handleItemChange3"
                :props="props"
                size="small">
              </el-cascader>
              县/区
            </div>
            <div class="r">
              <el-input
                placeholder="请输入你要搜索的内容"
                suffix-icon="el-icon-search"
                v-model="input6"
                @change="search"
                size="small">
              </el-input>
            </div>
          </div>
          <li v-for="o in qudaoList" :key="o.channelId"><a @click="channel(o.channelId)">{{ o.channelName }}</a></li>
        </div>
      </ul>
    </div>
    <!-- 个人 -->
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../../assets/mImg/user.png" alt="">
          {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <span @click="out"><el-dropdown-item><img src="../../assets/mImg/out.png" alt="" style="width:20px">退出登录</el-dropdown-item></span>
          <span @click="changePwd"><el-dropdown-item><img src="../../assets/img/changePwd1.png" alt="" style="width:20px">修改密码</el-dropdown-item></span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码弹窗 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="450px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录密码:" prop="oldPwd">
            <el-input v-model="ruleForm.oldPwd" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <div class="fenye1">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
          </div>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TopTab',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateOldpwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登录密码'))
      } else if (value !== sessionStorage.getItem('password')) {
        callback(new Error('登录密码错误'))
      } else {
        callback()
      }
    }
    return {
      ceshi: false,
      // list: ['全部渠道', '待付款', '已分期', '退保中心', '渠道', '系统'],
      // listLink: ['AllChannels', 'Obligations', 'Amortized', 'Surrender', 'Trench', 'System'],
      list: ['全部渠道'],
      listLink: ['AllChannels'],
      num: 0,
      retreats: false,
      all: false,
      qudaoList: [],
      name: '',
      activeIndex: '1',
      activeIndex2: '1',
      dialogVisible: false,
      ruleForm: {
        oldPwd: '',
        pass: '',
        checkPass: '',
        id: ''
      },
      batch: null,
      rules: {
        oldPwd: [
          { required: true, validator: validateOldpwd, trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      options1: [],
      options2: [],
      options3: [],
      props: {
        value: 'id',
        // label: 'index',
        children: 'cities'
      },
      shengStr: '',
      shengStr2: '',
      shengStr3: '',
      input6: ''
    }
  },
  mounted () {
    // 权限获取
    let permissionData = JSON.parse(sessionStorage.getItem('permission'))
    permissionData.forEach(v => {
      if (v === '待付款') {
        this.list.splice(1, 0, v)
        this.listLink.splice(1, 0, 'Obligations')
      }
      if (v === '已分期') {
        this.list.push(v)
        this.listLink.push('Amortized')
      }
      if (v === '退保中心') {
        this.list.push(v)
        this.listLink.push('Surrender')
      }
      if (v === '渠道') {
        this.list.push(v)
        this.listLink.push('Trench')
      }
      if (v === '系统') {
        this.list.push(v)
        this.listLink.push('System')
      }
    })
    let path = this.$router.history.current.fullPath
    this.listLink.forEach((v, k) => {
      if (path.split('/')[2] === v) {
        this.num = k
      }
    })
    this.name = sessionStorage.getItem('username')
    this.$post('/ad/channel/findAll').then(res => {
      this.qudaoList = res.data.channel
    })
    // 获取省级
    this.$fetch('/ad/index/getProvinceInfo').then(res => {
      res.data.forEach((v, k) => {
        this.options1.push({label: v.name, id: v.id})
      })
    })
  },
  methods: {
    onleave (e) {
      var left = document.getElementById('quanbu').offsetLeft + 5
      if (e.clientY >= 180 || e.clientX <= left || e.clientX >= left + 968) {
        this.ceshi = false
      }
    },
    search () {
      this.$emit('search', this.input6)
    },
    // 选择地区
    // handleItemChange (val) {
    //   setTimeout(_ => {
    //     // 选择省
    //     if (val.length === 1) {
    //       this.$post('/ad/index/getCityInfo', {id: val[0]}).then(res => {
    //         this.options2.forEach((m, n) => {
    //           if (m.id === val[0]) {
    //             m.cities = []
    //             res.data.forEach((x, y) => {
    //               m.cities.push({label: x.name, id: x.id, cities: []})
    //             })
    //           }
    //         })
    //       })
    //     } else {
    //       // 选择区/市
    //       this.$post('/ad/index/getCityInfo', {id: val[1]}).then(res => {
    //         this.options2.forEach((m, n) => {
    //           if (m.id === val[0]) {
    //             m.cities.forEach((x, y) => {
    //               if (x.id === val[1]) {
    //                 x.cities = []
    //                 res.data.forEach((a, b) => {
    //                   x.cities.push({label: a.name, id: a.id})
    //                 })
    //               }
    //             })
    //           }
    //         })
    //       })
    //     }
    //   }, 300)
    // },
    // 选择省
    handleItemChange1 (val) {
      // console.log(val)
      setTimeout(_ => {
        this.options1.forEach(v => {
          if (v.id === val[0]) {
            this.shengStr = v.label
          }
        })
        this.$post('/ad/channel/findAll', {
          address: this.shengStr
        }).then(res => {
          this.qudaoList = res.data.channel
        })
        this.$emit('province', this.shengStr)
        this.$post('/ad/index/getCityInfo', {id: val[0]}).then(res => {
          // console.log(res.data)
          this.options2 = []
          res.data.forEach((x, y) => {
            this.options2.push({label: x.name, id: x.id})
          })
        })
      })
    },
    // 选择市
    handleItemChange2 (val) {
      setTimeout(_ => {
        this.options2.forEach(v => {
          if (v.id === val[0]) {
            this.shengStr2 = v.label
          }
        })
        this.$post('/ad/channel/findAll', {
          address: this.shengStr + this.shengStr2
        }).then(res => {
          this.qudaoList = res.data.channel
        })
        this.$emit('city', this.shengStr + this.shengStr2)
        this.$post('/ad/index/getCityInfo', {id: val[0]}).then(res => {
          // console.log(res.data)
          this.options3 = []
          res.data.forEach((x, y) => {
            this.options3.push({label: x.name, id: x.id})
          })
        })
      })
    },
    // 选择区
    handleItemChange3 (val) {
      // console.log(val)
      this.options3.forEach(v => {
        if (v.id === val[0]) {
          this.shengStr3 = v.label
        }
      })
      this.$post('/ad/channel/findAll', {
        address: this.shengStr + this.shengStr2 + this.shengStr3
      }).then(res => {
        this.qudaoList = res.data.channel
      })
      this.$emit('region', this.shengStr + this.shengStr2 + this.shengStr3)
      // console.log(this.shengStr)
    },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
      if (key === '4-1') {
        this.$router.push({name: 'Surrender', query: {qqq: 1}})
      } else if (key === '4-2') {
        this.$router.push({name: 'Surrender', query: {qqq: 2}})
      } else {
        this.$router.push({name: this.listLink[key - 1]})
      }
    },
    // 退出登录
    out () {
      this.$fetch('/login/logout').then(res => {
        if (res.code === 0) {
          sessionStorage.clear()
          this.$router.push({name: 'MLogin'})
        } else {
          this.$message(res.msg)
        }
      })
    },
    tuibao (data) {
      if (data === 1) {
        this.$router.push({name: 'Surrender'})
      } else {
        this.$router.push({name: 'SurrenderA'})
      }
    },
    leave (e) {
      // console.log(e)
      this.all = false
      this.retreats = false
      // console.log(this.list.indexOf('退保中心'))
    },
    channel (id) {
      this.ceshi = false
      this.$emit('channelId', id)
    },
    tabmove (i, e) {
      if (i === 0) {
        this.all = true
        this.retreats = false
        this.ceshi = true
      } else if (i === this.list.indexOf('退保中心')) {
        this.retreats = true
        this.all = false
        this.ceshi = false
        document.getElementById('tuibao').style.left = e.target.offsetLeft + 'px'
      } else {
        this.all = false
        this.retreats = false
        this.ceshi = false
      }
    },
    tab (index) {
      this.num = index
      this.$router.push({name: this.listLink[index]})
    },
    changePwd () {
      this.dialogVisible = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post('/ad/manager/changePW', {
            'oldPass': this.ruleForm.oldPwd,
            'newPass': this.ruleForm.pass
          }).then(res => {
            if (res.code === 0) {
              this.$message({type: 'success', message: res.msg})
              this.forget = true
            } else {
              this.$message(res.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  height: 60px;
  line-height: 60px;
  background:rgba(255,193,7,1);
  box-shadow:0px 0px 10px rgba(4,0,0,0.06);
  display: flex;
  justify-content: center;
  min-width: 1170px;
  .el-cascader {
    width: 100px;
  }
  .el-submenu.is-active .el-menu-item.is-active {
    background-color: #282828 !important;
    border-bottom-color: #282828 !important;
  }
  .el-menu-item.is-active {
    background-color: #282828 !important;
    border-bottom-color: #282828 !important;
  }
  .tab {
    height: 60px;
    width: 90%;
    display: flex;
    justify-content: center;
    ul {
      position: relative;
      .position {
        position: absolute;
        background:rgba(255,255,255,1);
        box-shadow: 0px 0px 4px rgba(0,0,0,0.35);
        z-index: 99;
        top: 60px;
      }
      .tuibao {
        position: absolute;
        top: 60px;
        left: 387px;
        width:134px;
        height:100px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(0,0,0,0.35);
        .li {
          cursor: pointer;
          line-height: 50px;
          text-indent: 20px;
          &:hover {
            background: #FFD100;
          }
        }
      }
      .all {
        left: 5px;
        width: 968px;
        min-height: 120px;
        background:rgba(255,255,255,1);
        border-radius: 5px;
        box-shadow: 0px 0px 4px rgba(0,0,0,0.35);
        .area {
          overflow: hidden;
          padding-right: 20px;
        }
        .l {
          float: left;
        }
        .r {
          float: right;
        }
        li {
          padding: 0;
          border-right: 1px solid #8F8F8F;
          height: 24px;
          margin: 15px 0;
          &:nth-of-type(7n) {
            border: 0;
          }
        }
        a {
          min-width:56px;
          padding: 0;
          height:28px;
          line-height:28px;
          text-align: center;
          font-size: 14px;
          border-radius:5px;
          margin: 0 40px;
          &:hover {
            background:rgba(255,209,0,1);
            color: #333;
          }
        }
      }
    }
    li {
      float: left;
      height: 60px;
      padding: 0 10px;
      a {
        display: block;
        line-height: 60px;
        padding: 0 26px;
        cursor: pointer;
        &:hover {
          background: #282828;
          color: rgba(255,193,7,1);
        }
      }
      &.active a {
        background: #282828;
        color: rgba(255,193,7,1);
      }
    }
  }
  .user {
    min-width: 240px;
    position: absolute;
    right: 0;
    top: 0;
    a {
      padding: 0 10px;
    }
    img {
      vertical-align: middle;
      margin: 0;
    }
  }
}
img {
  vertical-align: text-bottom;
  margin-right: 10px;
}
.el-dialog__header {
  background: #FFD100!important;
}
</style>
