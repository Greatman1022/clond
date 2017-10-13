<template>
<div id='loginWrap' class='login-wrap'>
  <!--<v-head></v-head>-->
  <div class='title'>
    <div class='title-info'>
    微动天下推出的第二代小程序可视化生成工具，<br />
    集成小程序组件、在线进行小程序的UI设计、后台管理、实时更新，无需任何后续开发
    </div>
    <div class='btn-group'>
      <button type='button' class='btn-trial' @click='freeTrial'>免费试用</button>
    </div>
    <span class='titleAnim titleAnim1'></span>
    <span class='titleAnim titleAnim2'></span>
    <span class='titleAnim titleAnim3'></span>
    <span class='titleAnim titleAnim4'></span>
    <span class='titleAnim titleAnim5'></span>
    <span class='titleAnim titleAnim6'></span>
  </div>
  <div class='pagewrap'>
    <div class='page_1'>
      <div class='bwrap'>
        <div class='editor'>
          <div class='defskin'> </div>
          <div class='wmask'></div>
        </div>
      </div>
      <div class='editor_bg'>
        <div class='bgwz_bg'></div>
        <div class='bser_bg'></div>
        <div class='wave_area'>
          <img src='~assets/images/login/wave1.png' class='wave' backward='' id='wave1'>
        </div>
        <div class='wave_area second'>
          <img src='~assets/images/login/wave1.png' class='wave opposite' backward='' id='wave2'>
        </div>
      </div>
    </div>
    <div class='page_2'>
      <div class='fixbg'>
        <ul class='tree-list'>
          <li>
            <span class='t-img t1'></span>
            <span class='t-txt'>集成小程序组件</span>
          </li>
          <li>
            <span class='t-img t2'></span>
            <span class='t-txt'>WXML/CSS可视化设置</span>
          </li>
          <li>
            <span class='t-img t3'></span>
            <span class='t-txt'>Liquid流式布局</span>
          </li>
          <li>
            <span class='t-img t4'></span>
            <span class='t-txt'>多页面随意添加</span>
          </li>
          <li>
            <span class='t-img t5'></span>
            <span class='t-txt'>自定义交互事件</span>
          </li>

          <li>
            <span class='t-img t6'></span>
            <span class='t-txt'>一键提交审核小程序</span>
          </li>
          <li>
            <span class='t-img t7'></span>
            <span class='t-txt'>板块行业一一对应</span>
          </li>
          <li>
            <span class='t-img t8'></span>
            <span class='t-txt'>小程序服务同步设置</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
<!-- 
  <div class='login-footer'>
    <div class='copyright'>
      <a href='http://www.vdongchina.com/'>浙江微动天下信息技术有限公司</a> 版权所有 浙ICP备16000559号-3 Copyright©2017 cloud.vdongchina.com. All rights reserved
    </div>
  </div> -->

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import vLogin from 'components/login/login'
import vHead from 'components/header/header'
import vCode from 'components/common/vcode'
import api from '../fetch/api'
export default {
  name: 'login',
  components: {
    vLogin,
    vHead,
    vCode
  },
  data () {
    return {
      swiperOption: {
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        loop: true
      },
      testTel: '', // 手机号码
      iserrorTel: false,
      errorsTel: '',
      testCode: '', // 验证码
      iserrorCode: false,
      errorsCode: '',
      disabled: false,
      testPassword: '', // 密码
      iserrorPassword: false,
      errorsPassword: ''
    }
  },
  mounted () {
    // 滚动监听
    window.addEventListener('scroll', () => {
      let clearBrwserSkin
      let scrollTop = document.querySelector('body').scrollTop
      let page1 = document.querySelector('.page_1')
      if (page1 && scrollTop + 250 >= page1.getBoundingClientRect().top) {
        if (page1.classList.toString().indexOf('addAnimation') < 0) {
          clearTimeout(clearBrwserSkin)
        }
        page1.classList.add('addAnimation')
      }
      if (page1 && scrollTop + 250 <  page1.getBoundingClientRect().top) {
        page1.classList.remove('addAnimation')
        clearTimeout(clearBrwserSkin)
      }
    })
    // 背景滚动
    window.addEventListener('resize', initWave)
    function initWave () {
      if (document.querySelector('.page_1')) {
        let _w = document.querySelector('body').clientWidth
        let wave1W = 7694 / _w * 100 - 100
        let wave2W = 7680 / _w * 100 - 100
        let wave1 = document.querySelector('#wave1')
        let wave2 = document.querySelector('#wave2')

        wave1.style.maxWidth =  wave1W + 100 + '%'
        wave2.style.maxWidth =  wave2W + 100 + '%'
        startWave(wave1W, '#wave1')
        startWave(wave2W, '#wave2')
      }
    }
    function startWave (a, b) {
      function c (b) {
        let g
        f += h
        k ? g = -a + f : g = 0 - f
        e.style.marginLeft = g + '%'
        f > a && (f = 0)
        requestAnimationFrame(c)
      }
      let h = a / 15 / 60
      let e = document.querySelector(b)
      let k = void 0 !== e.getAttribute('forward')
      let f = 0
      b = 0
      k ? (b = -a, e.style.marginLeft = b + '%') : b = 0
      requestAnimationFrame(c)
    }

    document.querySelector('.page_1') && initWave()
  },
  methods: {
    freeTrial: function () {
      let _this = this
      api.userInfo().then(res => {
        if (res.success) {
          _this.$router.push({name: 'newmake'})
          _this.$store.commit('CHANGENAV', true)
          _this.$store.commit('CHANGEREG', 1)
          _this.$store.commit('LOGINDIALOG', false)
        } else {
          this.$store.commit('LOGINDIALOG', true)
        }
      }).catch((err) => {
        console.info('development...')
        this.$store.commit('LOGINDIALOG', true)
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
      this.testTel = ''
      this.iserrorCode = false
      this.errorsCode = ''
      this.testCode = ''
      this.iserrorPassword = false
      this.errorsPassword = ''
      this.testPassword = ''
    },
    check: function () {
      let testPhone = /^1[34578]\d{9}$/
      let telVal = this.testTel.trim()
      let codeVal = this.testCode.trim()
      let passwordVal = this.testPassword.trim()
      if (!telVal) {
        this.errorsTel = '请输入您的手机号!'
        this.iserrorTel = true
        return false
      } else if (!testPhone.test(telVal)) {
        this.errorsTel = '您输入的手机号不正确!'
        this.iserrorTel = true
        return false
      }
      if (!codeVal) {
        this.errorsCode = '请输入您的验证码'
        this.iserrorCode = true
        return false
      } else if (codeVal !== '123456') {
        this.errorsCode = '验证码错误'
        this.iserrorCode = true
        return false
      }
      if (!passwordVal) {
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
      this.$store.commit('FORGETPASSVISIBLE', false)
    },
    send: function () {
      this.disabled = true
      setTimeout(this.sended, 1000)
    },
    sended: function () {
      this.$refs.btn.run()
      this.disabled = false
    },
  },
  computed: {
    ...mapGetters({
      forgetPassVisible: 'getForgetPassVisible'
    })
  },
  created () {
    // this.$store.commit('CHANGENAV', false)
  }
}
</script>

<style scoped>
.l-bg{background-color: #fff;}
.login-wrap{position:relative;overflow:hidden;background-color: #fff;}
.login-header{position:relative;height:80px;min-width:800px;max-width: 1100px;margin: 0 auto;}
.logo{margin:0;padding:0;top:15px;background:url(~assets/images/logo.png) no-repeat;width:195px;height:55px;position:absolute;left: 0;font-size:0}
.btn-login{position: absolute; right: 0; top: 18px; border-radius: 5px; border: 1px solid #18ccc0; padding: 6px 26px; color: #18ccc0; background-color: #fff;}
.btn-login:hover{background-color: rgba(24,204,192, .15)};
.title{background:url(~assets/images/login/title.png) no-repeat;width:657px;height:310px;margin:121px auto 0;position:relative;}
.title-info{text-align:center;padding-top:190px;color:#aaa;font-size:14px;line-height:32px}
.btn-trial{float:left;width:304px;height:130px;margin-top:10px;background:url(~assets/images/login/btn_login.png) 0 0 no-repeat;margin-right:15px;margin-left:168px;text-decoration:none;color:#888;font-size:0}
.titleAnim{position:absolute;display:block;}
.titleAnim1{top:-90px;right:-228px;width:160px;height:160px;background:url(~assets/images/login/circl_top.png) center center no-repeat;background-size:cover;animation:ripple 2s infinite alternate;-moz-animation:ripple 2s infinite alternate;-webkit-animation:ripple 2s infinite alternate;-o-animation:ripple 2s infinite alternate}
@keyframes ripple{0%{opacity:0}
100%{opacity:1}
}
.titleAnim2{left:-225px;top:280px;width:313px;height:350px;background:url(~assets/images/login/circl_left.png) center center no-repeat}
.titleAnim3{right:-210px;top:320px;width:300px;height:300px;background:url(~assets/images/login/circl_right.png) center center no-repeat}
.titleAnim4{background:url(~assets/images/login/circl_shadow.png) center center no-repeat;width:355px;height:355px;left:-535px;top:-120px;background-size:cover;animation:ripple 3s infinite alternate;-moz-animation:ripple 3s infinite alternate;-webkit-animation:ripple 3s infinite alternate;-o-animation:ripple 3s infinite alternate}
.titleAnim5{right:-310px;top:0;width:180px;height:120px;background:url(~assets/images/login/line.png) center center no-repeat;z-index:-2;animation:moveAnim 6s infinite;-moz-animation:moveAnim 6s infinite;-webkit-animation:moveAnim 6s infinite;-o-animation:moveAnim 6s infinite}
@keyframes moveAnim{0%{opacity:0}
10%{opacity:.3}
40%{opacity:1}
90%{opacity:.3}
100%{opacity:0;right:250px;top:480px}
}
.titleAnim6{right:200px;top:-80px;width:180px;height:120px;background:url(~assets/images/login/line.png) center center no-repeat;z-index:-2;animation:moveLine 8s infinite;-moz-animation:moveLine 8s infinite;-webkit-animation:moveLine 8s infinite;-o-animation:moveLine 8s infinite}
@keyframes moveLine{0%{opacity:0}
10%{opacity:.3}
40%{opacity:1}
90%{opacity:.3}
100%{opacity:0;right:1260px;top:790px}
}
.page_1{position:relative;overflow:hidden;width:100%}
.bwrap{width:100%;z-index:20;position:relative;top:0;-webkit-transform:translateY(0) translate3d(0,0,0);-ms-transform:translateY(0) translate3d(0,0,0);-moz-transform:translateY(0) translate3d(0,0,0);transform:translateY(0) translate3d(0,0,0);-webkit-transition:-webkit-transform .85s ease-in-out;-ms-transition:-ms-transform .85s ease-in-out;-moz-transition:-ms-transform .85s ease-in-out;transition:transform .85s ease-in-out}
.addAnimation .bwrap{position:absolute;-webkit-transform:translateY(688px) translate3d(0,0,0);-ms-transform:translateY(688px) translate3d(0,0,0);-moz-transform:translateY(688px) translate3d(0,0,0);transform:translateY(688px) translate3d(0,0,0)}
.editor{width:916px;height:518px;left:50%;margin-left:-457px;-webkit-transform:perspective(875px) rotateX(25deg) translate3d(0,0,0);-ms-transform:perspective(875px) rotateX(25deg) translate3d(0,0,0);-moz-transform:perspective(875px) rotateX(25deg) translate3d(0,0,0);transform:perspective(875px) rotateX(25deg) translate3d(0,0,0);position:absolute;-webkit-transition:-webkit-transform .85s .05s linear;-ms-transition:-ms-transform .85s .05s linear;-moz-transition:-ms-transform .85s .05s linear;transition:transform .85s .05s linear}
.addAnimation .editor{-webkit-transform:perspective(875px) rotateX(0) translate3d(0,0,0);-moz-transform:perspective(875px) rotateX(0) translate3d(0,0,0);transform:perspective(875px) rotateX(0) translate3d(0,0,0)}
.defskin{text-indent:-99999px;display:none;width:100%;height:100%;position:absolute;top:0;left:0;border-radius:5px;background:url(~assets/images/login/editor.png) center center no-repeat;background-size:cover;display:block}
.wmask{position:absolute;bottom:0;width:100%;height:250px;background:linear-gradient(top,rgba(255,255,255,0) 0,rgba(255,255,255,1) 80%,rgba(255,255,255,1) 100%);background:-o-linear-gradient(top,rgba(255,255,255,0) 0,rgba(255,255,255,1) 80%,rgba(255,255,255,1) 100%);background:linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,1) 80%,rgba(255,255,255,1) 100%);-webkit-transition:all .7s;-moz-transition:all .7s;-ms-transition:all .7s;transition:all .7s}
.addAnimation .topmask,.addAnimation .wmask{opacity:0}
.editor_bg{margin-top:478px}
.addAnimation .bgwz_bg,.addAnimation .bser_bg{opacity:1}
.bgwz_bg{height:396px;opacity:0;position:relative;background:url(~assets/images/login/ebg.png) no-repeat center;margin-left:90px;-webkit-transition:all .75s;-ms-transition:all .75s;-moz-transition:all .75s;transition:all .75s}
.bser_bg{width:1000px;height:887px;background:url(~assets/images/login/mac.png) no-repeat center;margin:-225px auto 0;z-index:15;position:relative;opacity:0;-webkit-transition:all .95s;-ms-transition:all .95s;-moz-transition:all .95s;transition:all .95s}
.addAnimation .bgwz_bg,.addAnimation .bser_bg{opacity:1}
.page_2{position:relative}
.fixbg{width:100%;height:725px}
.tree-list{width:1100px;margin:100px auto}
.tree-list li{display:inline-block;width:206px;margin:24px 30.5px;text-align:center;margin-bottom:130px}
.tree-list .t-img{background:url(~assets/images/login/tree.png) no-repeat;width:146px;height:130px;display:block;margin:0 auto}
.tree-list .t1{background-position:-48px -55px}
.tree-list .t2{background-position:-350px -55px}
.tree-list .t3{background-position:-650px -55px}
.tree-list .t4{background-position:-950px -54px}
.tree-list .t5{background-position:-48px -360px}
.tree-list .t6{background-position:-350px -360px}
.tree-list .t7{background-position:-650px -360px}
.tree-list .t8{background-position:-950px -360px}
.tree-list .t-txt{font-size:18px}
.login-footer{background-color:#f0f2f1;padding:40px 0}
.login-footer .copyright,.login-footer .links{width:700px;margin:0 auto;color:#afafaf;font-size:12px;text-align:center;line-height:24px}
.login-footer .links li{display:inline-block;position:relative;padding:0 10px}
.login-footer .links li::after{content:'';width:1px;height:10px;background-color:#afafaf;position:absolute;right:0;top:5px;z-index:9}
.login-footer .links li:last-child::after{display:none}
.login-footer a{color:#afafaf}
.login-footer a:hover{text-decoration:underline}
.wave_area{left:0;max-width:100%;overflow:hidden;position:absolute;bottom:0;z-index:1}
.wave_area .second{bottom:0;z-index:2}
.wave.opposite{-webkit-transform:rotateY(180deg);-ms-transform:rotateY(180deg);-o-transform:rotateY(180deg);transform:rotateY(180deg)}
</style>
