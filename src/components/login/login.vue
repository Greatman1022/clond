<template>
  <div id='login' class="login">
    <h2 v-if='num == 0'>{{ navtits[0] }}</h2>
    <h2 v-if='num == 1'>{{ navtits[1] }}</h2>
    <h2 v-if='num == 2'>{{ navtits[2] }}</h2>
    <ul>
      <li v-show='num == 0'>
        <div class="lb_code" v-loading.body="wxLoading" element-loading-customClass="wx-loading">
          <div id="login_container" class="login-container">
            <img :src="wxLoginQrcode" id="login_qrcode" class="login-qrcode">
            <div class="login-error" v-if="loginError"> 超时未登录，关闭登录页面，若要登录请重新打开登录页面 </div>
            <div class="login-default-tip" v-else>
              <p class="login-txt">请使用微信扫描二维码登录</p>
              <p class="">“微尘cloud”</p>
            </div>
          </div>
        </div>
      </li>
      <li v-show="num == 1">
        <div class="lb_error" v-show='iserror==true'>{{ errors }}
          <i></i>
        </div>
        <div class="lb_accountNumber">
          <input type="text" placeholder="请输入手机号" @click='dumpInput' name='mobile' id='mobile' v-model='username' @keyup.enter='login' />
        </div>
        <div class="lb_password">
          <input type="password" placeholder="请输入登录密码" @click='dumpInput' name='password' id='password' v-model='password' @keyup.enter='login' />
        </div>
        <div class="lb_keepLanding clearfix">
          <!-- <label>
                <b :class="{'lb_k_chooseN' : isChecked == false}"></b>
                <p>5天内自动登录</p>
                <input type='checkbox' :checked='isChecked == true' @click='checkedChoose' />
              </label> -->
          <button @click="openForgetPass">忘记密码</button>
        </div>
        <div class="lb_loginButton">
          <!-- <button type="submit" @click='check'>登　录</button> -->
          <button @click='login'>登　录</button>
        </div>
        <!-- <div class="lb_noAccount">还没有账号?
              <a href="javascript:void(0)" @click='returnto'>立即注册</a>
            </div> -->
      </li>
      <li v-show="num == 2">
        <div class="lb_error" v-show='isCodeError == true'>{{ codeError }}
          <i></i>
        </div>
        
        <div class='lb_accountNumber'>
          <div class="lb_phonecode">
            <input name='vcode' type="text" placeholder="请输入手机号码" v-model='phoneNumber'>
            <v-code ref="btnPhoneCode" @click.native='getPhoneCode' :disabled="phoneCodeDisabled" :second="60"></v-code>
          </div>
        </div>
        <div class="lb_password">
          <input type="text" placeholder="请输入验证码" name='password' v-model='phoneCode' />
        </div>
        <div class="lb_keepLanding clearfix">
          <button>为了您的账号安全，请绑定手机号码</button>
        </div>
        <div class="lb_loginButton">
          <button @click='modifyPhone'>保  存</button>
        </div>
      </li>
    </ul>
    <div class="lb_tips" v-if="num != 2">
      <a href="javascript:void(0)" @click="changeLoginPanel(0)" :class='{"active": num == 0}'>请使用微信扫码登录</a>/
      <a href="javascript:void(0)" @click="changeLoginPanel(1)" :class='{"active": num == 1}'>或使用账号密码登录</a>
    </div>
  </div>
</template>

<script>
import api from '../../fetch/api'
import vCode from 'components/common/vcode'
export default {
  name: 'login',
  components: {
    vCode
  },
  data () {
    return {
      isChecked: false,
      // num: 0,
      navtits: ['微信扫码登录', '账户密码登录', '补充信息'],
      iserror: false,
      errors: '',
      username: '',
      password: '',
      wxLoading: false,
      wx: null,
      wxLoginQrcode: null,
      interval: null,
      count: 0,
      websocket: null,
      loginError: false,
      isCodeError: false,
      codeError: null,
      phoneCode: null,
      phoneNumber: null,
      phoneCodeDisabled: false,
      loginUser: null
    }
  },
  created: function () {
    this.setLoginInterval()
    this.wxLogin()
  },
  computed: {
    num: {
      get () {
        return this.$store.getters.getTypeNum
      }
    }
  },
  watch: {
    username: function () {
      let _tel = this.username.trim()
      if (!_tel) {
        this.errors = '请输入用户帐号!'
        this.iserror = true
        return false
      }
      this.iserror = false
      this.errors = ''
    },
    password: function () {
      let _password = this.password.trim()
      if (!_password) {
        this.errors = '请输入登录密码!'
        this.iserror = true
        return false
      }
      this.iserror = false
      this.errors = ''
    }
  },
  mounted () {
    this.wxLoading = true
  },
  methods: {
    getPhoneCode () {
      let phonereg = /^1[34578]\d{9}$/
      this.isCodeError = false
      this.codeError = ''

      if (!this.phoneNumber) {
        this.codeError = '手机号不能为空!'
        this.isCodeError = true
        return false
      }
      if (!phonereg.test(this.phoneNumber)) {
        this.codeError = '请输入有效的手机号码!'
        this.isCodeError = true
        return false
      }
      api.getCode({mobile: this.phoneNumber}).then(res => {
        if (res.message === '手机号不能为空') {
          this.codeError = '手机号不能为空!'
          this.isCodeError = true
          return false
        }
        if (res.message === '手机号不正确，请重新输入!') {
          this.codeError = '手机号不正确，请重新输入!'
          this.isCodeError = true
          return false
        }
        this.phoneCodeDisabled = true
        setTimeout(this.setPhoneCode, 1000)
      })
    },
    setPhoneCode () {
      this.$refs.btnPhoneCode.run()
      this.phoneCodeDisabled = false
    },
    modifyPhone () {
      let testPhone = /^1[34578]\d{9}$/
      this.isCodeError = false
      this.codeError = ''
      if (!this.phoneNumber) {
        this.isCodeError = true
        this.codeError = '请输入手机号码'
        return false
      }
      if (!testPhone.test(this.phoneNumber)) {
        this.isCodeError = true
        this.codeError = '手机号码格式错误'
        return false
      }
      if (!this.phoneCode) {
        this.isCodeError = true
        this.codeError = '请输入验证码'
        return false
      }
      let _this = this
      api.verificationCode({mobile: _this.phoneNumber, code: _this.phoneCode}).then(res => {
        if (res.message === '请输入手机短信验证码') {
          _this.isCodeError = true
          _this.codeError = '请输入验证码'
        } else if (res.message === '验证码不存在或已失效') {
          _this.isCodeError = true
          _this.codeError = '验证码不存在'
        } else if (res.message === '该手机号已被其他账号绑定') {
          _this.isCodeError = true
          _this.codeError = '该手机号已被其他账号绑定'
        } else {
          _this.isPhoneTip = ''
          _this.codeError = ''
          _this.getUserAppid()
        }
      })
    },

    setLoginInterval () {
      let _this = this
      this.interval = setInterval(function () {
        _this.count++
        if (_this.websocket != null) {
          _this.websocket.close()
        }
        _this.wxLogin()
        if (_this.count == 4) {
          window.clearInterval(_this.interval)
          _this.wxLoginQrcode = ''
          _this.loginError = true
        }
      }, 60000)
    },

    wxLogin () {
      let _this = this
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://cloud.vdongchina.com/websocket')
        this.websocket.onerror = function () { }
        this.websocket.onopen = function (event) { }
        this.websocket.onmessage = function (event) {
          var obj = eval('(' + event.data + ')')
          if (obj.sessionId != undefined) {
            api.wxCreateQrcode({ sessionId: obj.sessionId }).then(res => {
              if (res.success) {
                _this.wxLoading = false
                _this.wxLoginQrcode = res.qrcodeUrl
              }
            })
          } else if (obj.success && obj.token) {
            _this.websocket.close()
            window.clearInterval(_this.interval)
            api.wxBasicLogin({ token: obj.token }).then(res => {
              if (res.success) {
                _this.wxLoading = false
                _this.getUserInfo()
              }
            })
          } else {
            _this.wxLoading = false
            this.$message.error(obj.message)
          }
        }
      } else {
        this.$message.error('浏览器不支持websocket')
      }
    },
    changeLoginPanel (type) {
      this.wxLoading = false
      this.$store.commit('TYPENUM', type)
      if (!type) {
        this.wxLogin()
      }
    },
    returnto: function () {
      this.$store.commit('CHANGESTATE', 2)
    },
    dumpInput: function () {
      this.errors = ''
      this.iserror = false
    },
    login: function () {
      let _this = this
      if (this.checkData()) {
        api.login({ username: this.username, password: this.password }).then(res => {
          if (res.success) {
            _this.getUserInfo()
          } else {
            _this.errors = res.message
            _this.iserror = true
          }
        })
      }
    },

    getUserInfo () {
      let _this = this
      api.userInfo().then(res => {
        _this.userData = res
        if (!res.loginUser.mobile) {
          this.$store.commit('TYPENUM', 2)
        } else {
          _this.getUserAppid()
        }
      }).catch((err) => {
        console.info('development...')
      })
    },

    getUserAppid () {
      let _this = this
      api.getUserAppid().then(res2 => {
        if (res2.success) {
          window.location.href = window.location.href.replace('cloud', 'gw') + res2.appid + '/guard/mgt/page'
        } else {
          if (_this.userData.success) {
            _this.$store.dispatch('setUserInfo', { user: _this.userData.loginUser, remember: _this.isChecked })
            if (_this.userData.loginUser.role === 'ROLE_ADMIN') {
              _this.$router.push('/platmanage')
            } else if (_this.userData.loginUser.role === 'ROLE_UI' || _this.userData.loginUser.role === 'ROLE_APPUI') {
              _this.$router.push('/platmanage/temp')
            } else if (_this.userData.loginUser.role === 'ROLE_AGENT') {
              _this.$router.push('/personalcenter')
            } else if (window.location.pathname.indexOf('editor') > 0) {
              ;
            } else {
              _this.$router.push({ name: 'newmake' })
            }
            // _this.$store.commit('CHANGENAV', true)
            _this.$store.commit('CHANGEREG', 1)
            _this.$store.commit('LOGINDIALOG', false)
          }
        }
      })
    },
    checkData: function () {
      // let testPhone = /^1[34578]\d{9}$/
      let tel = this.username.trim()
      let password = this.password.trim()
      if (!tel) {
        this.errors = '请输入用户帐号!'
        this.iserror = true
        return false
      }
      if (!password) {
        this.errors = '请输入登录密码!'
        this.iserror = true
        return false
      }
      this.iserror = false
      this.errors = ''
      return true
    },
    openForgetPass: function () {
      let _this = this
      setTimeout(function () {
        _this.$store.commit('LOGINDIALOG', false)
      }, 500)
      this.$store.commit('FORGETPASSVISIBLE', true)
    },
    checkedChoose: function () {
      this.isChecked = !this.isChecked
    }
  },
  beforeDestroy () {
    if (this.websocket != null) {
      this.websocket.close()
    }
    if (this.interval != null) {
      window.clearInterval(this.interval)
    }
  }
}
</script>

<style scoped>
.login {
  height: 400px;
  position: relative;
}

.login h2 {
  width: 100%;
  font-size: 18px;
  color: #666;
  line-height: 60px;
  text-align: center;
  border-bottom: #18ccc0 2px solid;
}

.login ul li {
  position: relative;
  overflow: hidden;
}

.lb_accountNumber,
.lb_password {
  transition: all 0.3s;
  text-align: center;
  padding-top: 30px;
}

.lb_accountNumber input,
.lb_password input {
  line-height: 44px;
  padding-left: 14px;
  border: #e2e1e2 1px solid;
  border-radius: 4px;
  width: 287px;
  height: 44px;
  font-size: 16px;
  transition: all 0.5s;
}

.lb_accountNumber input:focus,
.lb_password input:focus {
  border: #18ccc0 1px solid;
  box-shadow: 0 0 8px rgba(122, 208, 202, .105);
  -moz-box-shadow: 0 0 8px rgba(122, 208, 202, .5);
  -webkit-box-shadow: 0 0 8px rgba(122, 208, 202, 3);
}

.lb_keepLanding {
  padding-left: 22px;
  margin: 16px 0;
}

.lb_keepLanding label {
  color: #999;
  cursor: pointer;
  display: inline-block;
  float: left;
}

.lb_keepLanding label b {
  display: block;
  width: 12px;
  height: 20px;
  float: left;
  position: relative;
  background: url(~assets/images/icon/choose.png) center center no-repeat;
}

.lb_keepLanding label b.lb_k_chooseN {
  background: url(~assets/images/icon/choose_N.png) center center no-repeat;
}

.lb_keepLanding label p {
  margin-left: 6px;
  float: left;
  font-size: 14px;
}

.lb_keepLanding input {
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.lb_keepLanding button {
  float: right;
  margin-right: 23px;
  color: #18ccc0;
  font-size: 14px;
  transition: all 0.5s;
  background: none;
}

.lb_keepLanding button:hover {
  color: #01baae;
}

.lb_loginButton {
  text-align: center;
  margin-bottom: 12px;
}

.lb_loginButton button {
  cursor: pointer;
  border: none;
  font-size: 18px;
  color: white;
  background: #18ccc0;
  width: 313px;
  height: 48px;
  border-radius: 4px;
}

.lb_noAccount {
  width: 313px;
  font-size: 14px;
  text-align: right;
  height: 42px;
  line-height: 42px;
  color: #666;
}

.lb_noAccount a {
  color: #18ccc0;
  transition: all 0.5s;
}

.lb_noAccount a:hover {
  color: #01baae;
}

.lb_error {
  transition: all 0.3s;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #666;
  background: #d5f1f1;
  width: 100%;
  text-indent: 42px;
  margin-bottom: -20px;
}

.lb_error i {
  cursor: pointer;
  display: block;
  width: 16px;
  height: 36px;
  position: absolute;
  left: 20px;
  top: 0;
  background: url(~assets/images/icon/error.png) center center no-repeat;
}

.lb_code {
  width: 300px;
  background: white;
  height: 280px;
  margin: 10px auto 0;
}

.lb_code #login_container iframe {
  width: 230px !important;
  height: 300px !important;
}

.lb_code img {
  width: 100%;
  height: 100%;
}

.lb_tips {
  line-height: 42px;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.lb_tips a {
  color: #666;
}

.lb_tips a.active {
  color: #18ccc0;
  transition: all 0.5s;
}

.login-container {
  text-align: center;
  margin-top: 20px;
}

.login-qrcode {
  width: 220px !important;
  height: 220px !important;
  border: 1px solid #ddd;
}

.login-default-tip {
  padding: 10px 14px;
  text-align: center;
}

.login-default-tip p {
  font-size: 13px;
}

.login-error {
  width: 220px;
  font-size: 13px;
  padding: 10px 14px;
  text-align: center;
  color: #f00;
  margin: 0 auto;
}
.lb_phonecode{
  position: relative;
  width: 303px;
  margin: 0 auto;
}
.lb_phonecode .btn-vcode{
  top: 1px;
  height: 44px;
  width: 95px;
}
</style>
