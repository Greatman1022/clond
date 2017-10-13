<template>
  <div class="header">
    <div class="publicTop">
      <div class="frameWidth clearfix">
        <div class="logo" v-if='!getUserInfo || menu_list[0].policy.indexOf(getUserInfo.role) < 0'>
          <router-link v-if="getUserInfo" :to='menu_list[0].url'></router-link>
        </div>
        <div class="navi" v-if="isNav && showNav">
          <ul>
            <li v-for='(item, index) in menu_list' :key="index" v-if='!getUserInfo || item.policy.indexOf(getUserInfo.role) < 0'>
              <router-link :to='item.url'>
                  {{item.txt}}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="userOrLogin">
          <!--未登陆-->
          <!-- <div class="uol_register" v-if='isReg==0'>还没有账号？
            <a href="#" @click='returntoreg'>立即注册</a>
          </div>  -->
          <a href="javascript:;" class='btn-login' @click="login" v-if='!getUserInfo'>登录</a>
          <el-dropdown v-else-if='getReg==1' trigger="click">
            <span class="el-dropdown-link">
              <img :src="getUserInfo.headimgurl">
              <em class="u-name">{{ getUserInfo.showName }}</em><i class="el-icon-caret-bottom el-icon--right uol_u_arrow"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="getUserInfo.role == 'ROLE_UI' || getUserInfo.role == 'ROLE_APPUI'">
                <router-link to='/platmanage/temp'>模板管理</router-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="editable ? editable && (getUserInfo.role == 'ROLE_AGENT' || getUserInfo.role == 'ROLE_APPER' || getUserInfo.role === 'ROLE_TEST'): (getUserInfo.role === 'ROLE_APPER' || getUserInfo.role === 'ROLE_TEST')">
                <router-link to='/personalcenter'>个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="editable ? editable && (getUserInfo.role === 'ROLE_APPER' || getUserInfo.role === 'ROLE_TEST') : (getUserInfo.role === 'ROLE_APPER' || getUserInfo.role === 'ROLE_TEST')">
                <router-link to='/miniprograms'>我的小程序</router-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="getUserInfo.role === 'ROLE_ADMIN'">
                <router-link to='/platmanage'>平台管理</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="javascript:;" @click="logout">退出登录</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link to='/miniprograms' class='backto' v-if='getReg==2'>
            返回
          </router-link>
        </div>
      </div>
    </div>

    <el-dialog ref='logindialog' v-model='loginVisible' size='sm' custom-class="dialog-login" :before-close="closeLoginDialog">
      <v-login ref="login"></v-login>
    </el-dialog>

    <el-dialog ref='forgetpassdialog' v-model='forgetPassVisible' size='sm' :before-close='closeForgetPass'>
      <div class='ui-title'>
        <span>修改密码</span>
      </div>
      <div class='content'>
        <div class='editInfo'>
          <h3>确保您的手机在身边，进行手机号码验证更改密码。</h3>
          <div class='ei_group first clearfix'>
            <span class='tr'>手机号码</span>
            <input type='text' placeholder='请输入您的手机号' @click='dumpInputTel' @keyup.enter='checkData' name='mobile' id='mobile' v-model='mobile'/>
          </div>
          <p class='tip error passtip' v-show='iserrorTel==true'>{{errorsTel}}</p>
          <div class='ei_group clearfix vcode'>
            <span class='tr'>验证码</span>
            <input type='text' placeholder='请输入您的验证码' @click='dumpInputCode' @keyup.enter='checkData' name='code' v-model='verificationCode' />
            <v-code ref='btn' @click.native='send' :disabled='disabled' :second='60'></v-code>
          </div>
          <p class='tip warning passtip' v-show='iserrorCode==true'>{{errorsCode}}</p>
          <div class='ei_group clearfix'>
            <span class='tr'>新密码</span>
            <input type='password' placeholder='请输入您的新密码' @click='dumpInputPassword' @keyup.enter='checkData' name='password' v-model='newPassword'>
          </div>
          <p class='tip error passtip' v-show='iserrorPassword==true'>{{errorsPassword}}</p>
          <div class='ei_button ei_button_lg ei_mt25'>
            <button class='ei_b_baocun ei_b_lg' type='button' @click='checkData'>绑定</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vLogin from 'components/login/login'
import vCode from 'components/common/vcode'
import api from '../../fetch/api'
export default {
  name: 'header',
  components: {
    vLogin,
    vCode
  },
  props: [],
  data () {
    return {
      menu_list: [
        {
          txt: '新建',
          url: '/newmake',
          name: 'newmake',
          policy: ['ROLE_AGENT', 'ROLE_ADMIN', 'ROLE_UI', 'ROLE_APPUI']
        },
        {
          txt: '我的小程序',
          url: '/miniprograms',
          name: 'miniprograms',
          policy: ['ROLE_AGENT', 'ROLE_ADMIN', 'ROLE_UI', 'ROLE_APPUI']
        },
        /* {
          name: '本地服务商',
          url: '/localfacilitator'
        },
        {
          name: '产品介绍',
          url: '/productpre'
        }, */
        {
          txt: '个人中心',
          url: '/personalcenter',
          name: 'personalcenter',
          policy: ['ROLE_ADMIN', 'ROLE_UI', 'ROLE_APPUI']
        },
        {
          txt: '注册小程序/公众号',
          url: '/registAgent',
          name: 'registAgent',
          policy: ['ROLE_AGENT', 'ROLE_ADMIN', 'ROLE_UI', 'ROLE_APPUI']
        }
      ],
      isActive: 0,
      mobile: '', // 手机号码
      iserrorTel: false,
      errorsTel: '',
      verificationCode: '', // 验证码
      iserrorCode: false,
      errorsCode: '',
      disabled: false,
      newPassword: '', // 密码
      iserrorPassword: false,
      errorsPassword: '',
      editable: true
    }
  },
  created () {
    api.getUserAppid().then(res2 => {
      if (res2.success) {
        this.editable = false
      } else {
        this.editable = true
      }
    })
  },
  methods: {
    login: function () {
      this.$store.commit('LOGINDIALOG', true)
    },
    returntoreg: function () {
      this.$store.commit('CHANGEREG', 2)
      this.$store.commit('CHANGESTATE', 2)
    },
    logout: function () {
      api.loginOut().then(res => {
        this.clearCookie()
        this.$store.dispatch('setUserInfo', {user: '', remember: false})
        this.$router.push({name: 'login'})
      })
    },
    clearCookie () {
      api.clearCookie().then(res => {
        console.info('删除 GW cookie成功')
      })
      document.cookie = 'SESSION=;path=/;domain=cloud.vdongchina.com;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      document.cookie = 'JSESSIONID=;path=/;domain=cloud.vdongchina.com;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    },
    closeLoginDialog: function () {
      this.$store.commit('TYPENUM', 0)
      this.$store.commit('LOGINDIALOG', false)
      api.userInfo().then(res => {
        if (res.success) {
          api.loginOut().then(res => {
            console.log(res)
          })
        }
      }).catch((err) => {
        console.info('development...')
      })
      
    },
    dumpInputTel: function () {
      this.errorsTel = ''
      this.iserrorTel = false
    },
    dumpInputCode: function () {
      this.errorsCode = ''
      this.iserrorCode = false
    },
    dumpInputPassword: function () {
      this.errorsPassword = ''
      this.iserrorPassword = false
    },
    closeForgetPass: function () {
      this.$store.commit('FORGETPASSVISIBLE', false)
      this.iserrorTel = false
      this.errorsTel = ''
      this.mobile = ''
      this.iserrorCode = false
      this.errorsCode = ''
      this.verificationCode = ''
      this.iserrorPassword = false
      this.errorsPassword = ''
      this.newPassword = ''
    },
    checkData: function () {
      let testPhone = /^1[34578]\d{9}$/
      // let telVal = this.mobile
      // let codeVal = this.verificationCode
      // let passwordVal = this.newPassword
      let _data = {
        mobile: this.mobile,
        code: this.verificationCode,
        newPassword: this.newPassword
      }
      if (!_data.mobile) {
        this.errorsTel = '请输入您的手机号!'
        this.iserrorTel = true
        return false
      } else if (!testPhone.test(_data.mobile)) {
        this.errorsTel = '您输入的手机号不正确!'
        this.iserrorTel = true
        return false
      }

      if (!_data.code) {
        this.errorsCode = '请输入您的验证码'
        this.iserrorCode = true
        return false
      }

      if (!_data.newPassword) {
        this.errorsPassword = '请输入您的密码!'
        this.iserrorPassword = true
        return false
      }

      this.iserrorTel = false
      this.iserrorCode = false
      this.iserrorPassword = false
      this.errorsTel = ''
      this.errorsCode = ''
      this.errorsPassword = ''
      api.forgetPassword(_data).then(res => {
        if (res.success) {
          this.$message.success('找回密码成功')
          this.$store.commit('FORGETPASSVISIBLE', false)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    send: function () {
      if (this.mobile) {
        this.disabled = true
        setTimeout(this.sended, 1000)
      } else {
        this.errorsTel = '请输入您的手机号!'
        this.iserrorTel = true
      }
    },
    sended: function () {
      this.$refs.btn.run()
      this.disabled = false
      api.getBasicCode({mobile: this.mobile}).then(res => {
        console.log(res)
      })
    }
  },
  computed: {
    ...mapGetters({
      isNav: 'getNav',
      getReg: 'getReg',
      showNav: 'getShowNav',
      forgetPassVisible: 'getForgetPassVisible'
    }),
    loginVisible: {
      get () {
        return this.$store.state.common.loginDialog
      },
      set (newValue) {
        return this.$store.state.common.loginDialog
      }
    },
    getUserInfo () {
      let _this = this
      let _userInfo = this.$store.state.common.userInfo
      if (_userInfo) {
        return _userInfo.data
      } else {
        api.userInfo().then(res => {
          if (res.success) {
            _this.$store.dispatch('setUserInfo', {user: res.loginUser, remember: false})
            return res.loginUser
          } else {
            _this.$router.push({name: 'login'})
          }
        }).catch((err) => {
          console.info('development...')
        })
      }
    }
  }
}
</script>

<style scoped>
.publicTop {
  background:#fff;
}
.logo{
  float:left;
  padding:9px 0;
  width: 102px;
  height: 42px;
  background: url(~assets/images/logo.png) 100% no-repeat;
}
.logo a{
  width:100%;
  height:100%;
  display: block;
}
.navi{
  float:left;
  padding-left:76px;
}
.navi ul{
  float: left;
}
.navi ul li{
  display: inline-block;
  float: left;
}
.navi ul li:last-child{
  margin-left: 325px;
}
.navi ul li:first-child{
  margin-left: 0;
}
.navi ul li a{
  display: inline-block;
  height:55px;
  line-height:55px;
  width:126px;
  border-top:transparent 5px solid;
  font-size:14px;
  color:#666;
  text-align:center;
  transition:all 0.5s;
}
.navi ul li a.router-link-exact-active{
  border-top:#18ccc0 5px solid;
  color:#18ccc0;
}
.navi ul li a.router-link-exact-active:hover{
  color:#01baae;
}
.userOrLogin{
  float:right;
  height: 60px;
  overflow: hidden;
}
.uol_register{
  color:#666;
  font-size:17px;
  line-height:60px;
  height:60px;
  padding-right: 115px;
}
.uol_register a{
  color:#18ccc0;
  transition:all 0.5s;
}
.uol_register a:hover{
  color:#01baae;
}
.el-dropdown-link{
  cursor: pointer;
  display: inline-block;
  padding: 8px 0;
  overflow: hidden;
  line-height: 44px;
}
.el-dropdown-link img{
  margin-right:10px;
  border-radius:100%;
  width:42px;
  height: 42px;
  float: left;
  border:#cbcbcb 1px solid;
}
.el-dropdown-link em,.el-dropdown-link i{
  float: left;
}
.uol_u_arrow{
  width:13px;
  height:44px;
  background:url(~assets/images/icon/arrow.png) center center no-repeat;
}
.el-icon-caret-bottom:before{
  content: '';
}
.el-dropdown-menu{
  margin-top:-6px!important;
  margin-bottom: 0!important;
  width: 150px!important;
  border:none!important;
  padding: 0!important;
  text-align: center;
}
.el-dropdown-menu__item{
  line-height: 40px!important;
  padding: 0!important;
}
.el-dropdown-menu__item:hover{
  background-color: #ececec!important;
}
.el-dropdown-menu__item a{
  display: inline-block;
  width: 100%;
}
.backto{
  background-color: #18ccc0;
  border-radius: 30px;
  display: inline-block;
  width: 96px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
}
.btn-login{
  margin-top: 18px;
  border-radius: 5px;
  border: 1px solid #18ccc0;
  padding: 6px 26px;
  color: #18ccc0;
  background-color: #fff;
  line-height: 60px;
}
.btn-login:hover{background-color: rgba(24,204,192, .15);};
.vcode{position: relative;}
.btn-vcode{height: 44px;}
.passtip{height: 26px !important; line-height: 26px !important;}
.u-name{max-width: 110px;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;}
</style>
