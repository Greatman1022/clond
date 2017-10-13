<template>
<!--注册-->
<div id="register" class="register">
  <div class="rb_title">用户注册</div>
  <div class="rb_center">
  	<div class="lb_error" v-show='iserror==true'>{{ errors }}<i></i></div>
    <div class="lb_accountNumber">
      <input type="text" placeholder="请输入手机号" @click='dumpInput' name='mobile' id='mobile' v-model='testmobile'/>
    </div>
    <div class="lb_password">
      <input type="password" placeholder="请输入登录密码" @click='dumpInput' name='password' id='password' v-model='testpassword' />
    </div>
    <div class="rb_verificationCode">
      <input name='code' type="text" id='code' @click='dumpInput' v-model='testcode' placeholder="请输入验证码">
    	<v-code ref="btn" @click.native='send' :disabled="disabled" :second="60"></v-code>
    </div>
    <div class="lb_keepLanding clearfix">
      <label>
        <b :class="{'lb_k_chooseN' : isChecked == false}"></b>
        <p>同意《微尘服务使用协议》</p>
        <input type='checkbox' :checked='isChecked == true' @click='checkedChoose' />
      </label>
    </div>
    <div class="lb_loginButton">
      <input type="button" value="立即注册" @click='check'>
    </div>
    <div class="lb_noAccount">已有账号?
      <a href="javascript:void(0)" @click='returnto2'>马上登录</a>
    </div>
  </div>
</div>
<!--注册-->
</template>

<script>
import vCode from '../common/vcode'
export default {
  name: 'register',
  components: {
    vCode
  },
  data () {
    return {
      isChecked: true,
      disabled: false,
      iserror: false,
      errors: '',
      testmobile: '',
      testpassword: '',
      testcode: ''
    }
  },
  created: function () {
    // this.$store.commit('CHANGENAV', false)
    this.$store.commit('CHANGEREG', 0)
  },
  watch: {
    testmobile: function () {
      let _tel = this.testmobile.trim()
      if (!_tel) {
        this.errors = '请输入用户帐号!'
        this.iserror = true
        return false
      }
      this.iserror = false
      this.errors = ''
    },
    testpassword: function () {
      let _password = this.testpassword.trim()
      if (!_password) {
        this.errors = '请输入登录密码!'
        this.iserror = true
        return false
      }
      this.iserror = false
      this.errors = ''
    }
  },
  methods: {
    returnto2: function () {
      this.$store.commit('CHANGESTATE', 1)
    },
    send: function () {
      this.disabled = true
      setTimeout(this.sended, 1000)
    },
    sended: function () {
      this.$refs.btn.run()
      this.disabled = false
    },
    dumpInput: function () {
      this.errors = ''
      this.iserror = false
    },
    check: function () {
      let testPhone = /^1[34578]\d{9}$/
      let tel = this.testmobile.trim()
      let password = this.testpassword.trim()
      let code = this.testcode.trim()
      if (!tel) {
        this.errors = '请输入用户帐号!'
        this.iserror = true
        return false
      } else if (!testPhone.test(tel)) {
        this.errors = '您输入的手机号不正确!'
        this.iserror = true
        return false
      }
      if (!password) {
        this.errors = '请输入登录密码!'
        this.iserror = true
        return false
      }
      if (!code) {
        this.errors = '请输入验证码!'
        this.iserror = true
        return false
      }
      if (!this.isChecked) {
        this.errors = '请勾选微尘服务使用协议!'
        this.iserror = true
        return false
      }
      this.iserror = false
      this.errors = ''
      // this.$store.commit('CHANGENAV', true)
      // this.$store.commit('CHANGEREG', 1)
    },
    checkedChoose: function () {
      this.isChecked = !this.isChecked
    }
  }
}
</script>

<style scoped>
.register{
}
.rb_title{ 
  font-size:18px; 
  color:#666; 
  text-align:center; 
  height:56px; 
  line-height:56px; 
  padding-top:4px; 
  border-bottom:#18ccc0 4px solid;
}
.rb_center{ 
  position:relative; 
  overflow:hidden;
}
.rb_verificationCode {
  position: relative;
  text-align: center;
  margin: 25px auto 0;
  width: 311px;
  transition: all 0.5s;
}
.rb_verificationCode input[type=text]{ 
  line-height:44px; 
  padding-left:24px;
  padding-right: 120px;
  width:165px; 
  border:#e2e1e2 1px solid; 
  border-radius:4px; 
  height:44px; 
  font-size:16px; 
  transition:all 0.5s;
}
.rb_verificationCode input[type=text]:focus{ 
  border:#18ccc0 1px solid; 
  box-shadow: 0 0 8px rgba(122,208,202,.105); 
  -moz-box-shadow: 0 0 8px rgba(122,208,202,.5); 
  -webkit-box-shadow: 0 0 8px rgba(122,208,202,3);
}
.rb_verificationCode button{ 
  width:104px!important; 
  height:44px!important;
}
.rb_center div.sendIng button{ 
  background:#e2e1e2;
}

.lb_accountNumber,.lb_password{ 
  transition:all 0.3s; 
  text-align:center; 
  padding-top:30px;
}
.lb_accountNumber input,.lb_password input{ 
  line-height:44px; 
  padding-left:14px; 
  border:#e2e1e2 1px solid; 
  border-radius:4px; 
  width:287px; 
  height:44px; 
  font-size:16px; 
  transition:all 0.5s;
}
.lb_accountNumber input:focus,.lb_password input:focus{ 
  border:#18ccc0 1px solid; 
  box-shadow: 0 0 8px rgba(122,208,202,.105); 
  -moz-box-shadow: 0 0 8px rgba(122,208,202,.5); 
  -webkit-box-shadow: 0 0 8px rgba(122,208,202,3);
}
.lb_keepLanding{
  padding-left:22px;
  margin: 16px 0;
}
.lb_keepLanding label{ 
  color:#999; 
  cursor:pointer;
  display: inline-block;
  float: left;
  position: relative;
}
.lb_keepLanding label b{ 
  display:block; 
  width:12px; 
  height:20px; 
  float:left;
  background:url(~assets/images/icon/choose.png) center center no-repeat;
}
.lb_keepLanding label b.lb_k_chooseN{ 
  background:url(~assets/images/icon/choose_N.png) center center no-repeat;
}
.lb_keepLanding label p{ 
  margin-left:6px; 
  float:left; 
  font-size:14px;
}
.lb_keepLanding input{
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.lb_loginButton{ 
  text-align:center;
}
.lb_loginButton input{ 
  cursor:pointer;  
  border:none; 
  font-size:18px; 
  color:white; 
  background:#18ccc0; 
  width:313px; 
  height:48px; 
  border-radius:4px;
}
.lb_noAccount{ 
  width:313px; 
  font-size:14px; 
  text-align:right; 
  height:42px; 
  line-height:42px; 
  color:#666;
}
.lb_noAccount a{ 
  color:#18ccc0; 
  transition:all 0.5s;
}
.lb_noAccount a:hover{ 
  color:#01baae;
}
.lb_error{ 
  transition:all 0.3s; 
  height:36px; 
  line-height:36px; 
  font-size:14px; 
  color:#666; 
  background:#d5f1f1; 
  width:100%;
  text-indent:42px;
  margin-bottom: -20px;
}
.lb_error i{ 
  cursor:pointer; 
  display:blcok; 
  width:16px; 
  height:36px; 
  position:absolute; 
  left:20px; 
  background:url(~assets/images/icon/error.png) center center no-repeat; 
}
</style>
