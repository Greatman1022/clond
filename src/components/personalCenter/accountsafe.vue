<template>
  <div id="acsafe" class='acsafe'>
    <div class="pd_s_phone">
      <div class="phone_title">
        <span v-for='(item, index) in bindNav' :key="index" :class='{"current": currentIndex == index}' @click='bindStyle(index)'>{{item}}</span>
      </div>
      <div class='phone_bind' v-show='currentIndex == 0'>
        <div class="pd_sp_binding" v-if='isModified'>
          <span>手机号码</span>
          <div v-if='userMess.mobile'>
            <em>{{userMess.mobile}}</em>
            <button class="pd_spb_modify" type="button" @click='modify'>修改</button>
          </div>
          <div v-else>
            <em class='redColor'>未绑定</em>
            <button class="pd_spb_binding" type="button" @click='binding'>绑定</button>
          </div> 
        </div>
        <div class="pd_sp_edit">
          <div v-if='isShow'>
            <ul class="pd_spe_one">
              <h3>验证原手机后才可安全修改手机</h3>
              <li>
                <span>验证码</span>
                <div id='vcode' class='vcode'>
                  <input name='newpassword' type="text" placeholder="请输入验证码" 
                    v-model="verification"
                    >
                  <v-code ref="btn" 
                    @click.native='send' 
                    :disabled="disabled" 
                    :second="60"></v-code>
                </div>
                <p class="tip" 
                  v-if='codeTip' 
                  :class='{"pd_sp_tip2": isCodeTip == 1, "pd_sp_tip3": isCodeTip == 2}'
                  >{{ codeTip }}</p>
              </li>
              <li>
                <span>&nbsp;</span>
                <button class="btns ei_b_baocun" type="button" @click='goModify'>确定</button>
              </li>
            </ul>
          </div>
          <ul class="pd_spe_two" v-if='isModify'>
              <li>
                <span>手机号码</span>
                <input type="text" placeholder="请输入手机号码" v-model='newPhone'>
                <p class="tip" v-if='phoneError' :class='{"pd_sp_tip2": isPhoneTip == 1, "pd_sp_tip3": isPhoneTip == 2}'>{{ phoneError }}</p>
              </li>
              <li>
                <span>验证码</span>
                <div class='vcode'>
                  <input name='vcode' type="text" placeholder="请输入验证码" v-model='phonecode'>
                  <v-code ref="btn2" @click.native='send2' :disabled="disabled2" :second="60"></v-code>
                </div>                             
                <p class="tip" v-if='codeError' :class='{"pd_sp_tip2": isPhoneTip == 1, "pd_sp_tip3": isPhoneTip == 2}'>{{ codeError }}</p>
              </li>
              <li>
                <span>&nbsp;</span>
                <button class="btns ei_b_baocun" type="button" @click='modifyPhone'>保存</button>
                <button class="btns ei_b_quxiao" type="button" @click='cancelModify'>取消</button>
              </li>
          </ul>
        </div>
      </div>
      <div class='wx_bind' v-show='currentIndex == 1'>
        <div class='wx_binding'>
          <img v-show='!userMess.openid && isovertime === false' :src='wxCode'>
          <!-- <div id="login_container" v-if='!userMess.openid'></div> -->
          <div v-show='userMess.openid && isovertime === false'>绑定成功！</div>
          <div v-show='!userMess.openid && isovertime === true'>超时未绑定，关闭绑定页面，若要绑定请重新打开页面，避免页面停留一直刷新请求导致微信接口调用上限</div>
        </div>
      </div>
    </div>
    <div class="pd_s_password">
      <div class="pd_sp_title">密码修改</div>
      <ul>
        <li>
          <span>原密码</span>
          <input type="password" placeholder="请输入您的登录密码"
            v-model="oldPassword">
          <p class="tip" v-if='oldTip' :class='{"pd_sp_tip2": isPasswordTip == 1, "pd_sp_tip3": isPasswordTip == 2}'>{{ oldTip }}</p>
        </li>
        <li>
          <span>新密码</span>
          <input type="password" placeholder="请输入您新的登录密码"
            v-model="newPassword">
          <p class="tip" v-if='newTip' :class='{"pd_sp_tip2": isPasswordTip == 1, "pd_sp_tip3": isPasswordTip == 2}'>{{ newTip }}</p>
        </li>
        <li>
          <span>重复密码</span>
          <input type="password" placeholder="请重复您新的登录密码"
            v-model="passwordAgain">
          <p class="tip" v-if='againTip' :class='{"pd_sp_tip2": isPasswordTip == 1, "pd_sp_tip3": isPasswordTip == 2}'>{{ againTip }}</p>
        </li>
        <li><span>&nbsp;</span><button type="button" @click='modifyPass'>保存</button></li>
      </ul>
    </div>

    <div class="pd_s_password" v-if='userMess.role === "ROLE_APPER"'>
      <div class="pd_sp_title">修改登录帐号</div>
      <ul>
        <li>
          <span>登录帐号</span>
          <input type="text" placeholder="请输入新的登录帐号" v-model="newUsername">
          <p class="tip" v-if='usernameTip' :class='{"pd_sp_tip2": isUsernameTip == 1}'>{{ usernameTip }}</p>
        </li>
        <li><span>&nbsp;</span><button type="button" @click='modifyUsername'>保存</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../fetch/api'
import vCode from 'components/common/vcode'
export default {
  name: 'acsafe',
  components: {
    vCode
  },
  data () {
    return {
      isShow: false,
      disabled: false,
      disabled2: false,
      bindNav: ['手机绑定', '微信绑定'],
      currentIndex: 0,
      // mobile: '',  //造的假数据 18767136845 15378796535
      isModify: false, // 修改手机号和绑定时出现的模块的状态默认为false不显示，代验证码验证原手机后方可显示
      isModified: true, // 手机号修改前和未绑定前的状态默认为true显示
      verification: '',  // 修改前获取的验证码
      codeTip: '',  // 验证码填写错误提示
      isCodeTip: '', // 验证码填写错误提示的class显示控制
      // 修改密码
      isPasswordTip: '', // 修改密码时的错误提示class
      oldPassword: '', // 原密码
      newPassword: '', // 新密码
      passwordAgain: '', // 新密码再次输入
      oldTip: '', // 原密码错误信息
      newTip: '', // 新密码错误信息
      againTip: '', // 新密码再次输入错误信息
      // 修改或者绑定手机
      phoneError: '',
      codeError: '',
      newPhone: '', // 修改后的手机号码
      phonecode: '', // 修改后获取的验证码
      isPhoneTip: '', // 修改时的错误提示class
      newUsername: null,
      usernameTip: null,
      isUsernameTip: 0,
      wxCode: '', //二维码图片
      isovertime: false //二维码是否超时
    }
  },
  computed: {
    ...mapGetters({
      userMess: 'getUserMess'
    })
  },
  methods: {
    wxLogin () {
      let _this = this
      var websocket = null;//websocket对象
      var interval = null;//定时器对象
      var count = 0;//记录刷新次数
      //打开绑定页面时获取一次
      createQrcode();
      //定时刷新二维码并保持websocket的链接，间隔一分钟
      interval = setInterval(function(){
        //记录刷新次数
        count++;
        //关闭上次的websocket
        if(websocket!=null){
          websocket.close();
        }
        //重新连接websocket获取二维码
        createQrcode();
        //加上加载时一次，共五次，清除定时器，关闭websocket，关闭绑定窗口
        if(count == 4){
          window.clearInterval(interval);
          //$("#bind_qrcode").remove();
          //$("body").html("超时未绑定，关闭绑定页面，若要绑定请重新打开页面，避免页面停留一直刷新请求导致微信接口调用上限");
        }
      }, 60000);


      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
      window.onbeforeunload = function (){
        if(websocket != null){
          websocket.close();
        }
        if(interval != null){
          window.clearInterval(interval);
        }
      }

      //获取公众号带参数二维码
      function createQrcode(){

        //判断当前浏览器是否支持WebSocket  
        if ('WebSocket' in window){
          //新建WebSocket
          websocket = new WebSocket("ws://cloud.vdongchina.com/websocket");
          
          //连接发生错误的回调方法  
          websocket.onerror = function () { };
          
          //连接成功建立的回调方法
          websocket.onopen = function (event) { };

          //接收到消息的回调方法，返回消息皆为json格式字符串  
          websocket.onmessage = function (event) {
            var obj = eval('(' + event.data + ')');
            console.log(obj);
            if(obj.sessionId != undefined){
              //通过sessionId生成带参临时登录二维码
              api.createqrcode ({sessionId:obj.sessionId}).then(res => {
                if(res.success){
                  console.log(res.qrcodeUrl)
                  _this.wxCode = res.qrcodeUrl
                }
              })
            }else if(obj.success){
              websocket.close(); //授权成功，关闭WebSocket连接
              window.clearInterval(interval); //清除定时器
              //开始后续处理，将绑定信息同步到当前登录用户信息，以便前端展示
              api.synch ().then(res => {
                if(res.success){
                  console.log("账号绑定微信成功！后续前端处理");
                }
              })
            }else{
              console.log(obj.message);
            }
          }
        }else{
          alert('Not support websocket')
        }
      }
    },
    modifyUsername () {
      if (!this.newUsername) {
        this.isUsernameTip = 1
        this.usernameTip = '请输入登录帐号'
        return false
      }

      this.isUsernameTip = 0
      this.usernameTip = null
      api.usernameUpdate({
          username: this.newUsername
        }).then(res => {
          if (res.success) {
            this.$message.success('修改登录帐号成功')
          } else {
            this.$message.error('修改登录帐号失败')
          }
      })
    },
    bindStyle (index) {
      this.currentIndex = index
      if(this.currentIndex === 1) {
        this.wxLogin()
      }
    },
    binding () {
      this.isModify = true
      this.isModified = false
      this.newPhone = ''
      this.phonecode = ''
      this.isPhoneTip = ''
      this.phoneError = ''
      this.isCodeTip = ''
      this.codeError = ''
    },
    modifyPhone () {
      let testPhone = /^1[34578]\d{9}$/
      if (!this.newPhone) {
        this.isPhoneTip = 1
        this.phoneError = '请输入手机号码'
        return false
      }
      if (!testPhone.test(this.newPhone)) {
        this.isPhoneTip = 2
        this.phoneError = '手机号码格式错误'
        return false
      }
      this.phoneError = ''
      api.verificationCode({mobile: this.newPhone, code: this.phonecode}).then(res => {
        if(res.message === '请输入手机短信验证码') {
          this.isPhoneTip = 1
          this.codeError = '请输入验证码'
        } else if (res.message === '验证码不存在或已失效') {
          this.isPhoneTip = 2
          this.codeError = '验证码不存在'
        } else if (res.message === '该手机号已被其他账号绑定') {
          this.isPhoneTip = 2
          this.codeError = '"该手机号已被其他账号绑定"'
        } else {
          this.isPhoneTip = ''
          this.codeError = ''
          this.userMess.mobile = this.newPhone
          this.isModify = false
          this.isModified = true
        }
      })
    },
    cancelModify () {
      this.isModified = true
      this.isModify = false
    },
    modify () {
      this.isShow = true
    },
    goModify () {
      api.verificationCode({mobile: this.userMess.mobile, code: this.verification}).then(res => {
        if (res.message === '请输入手机短信验证码') {
          this.isCodeTip = 1
          this.codeTip = '请输入验证码'
          return false
        } else if (res.message === '验证码不存在或已失效') {
          this.isCodeTip = 2
          this.codeTip = '验证码不存在'
          return false
        } else {
          this.isCodeTip = ''
          this.codeTip = ''
          this.isShow = false
          this.isModify = true
          this.isModified = false
          this.newPhone = ''
          this.phonecode = ''
          this.isPhoneTip = ''
          this.phoneError = ''
          this.isCodeTip = ''
          this.codeError = ''
          this.verification = ''
        }
      })
    },
    modifyPass () {
      if (!this.oldPassword) {
        this.isPasswordTip = 1
        this.oldTip = '请输入原密码'
        return false
      }
      this.oldTip = ''
      if (!this.newPassword) {
        this.isPasswordTip = 1
        this.newTip = '请输入新密码'
        return false
      }
      if (this.oldPassword === this.newPassword) {
        this.isPasswordTip = 1
        this.newTip = '新密码不能和原密码相同'
        return false
      }
      this.newTip = ''
      if (this.passwordAgain !== this.newPassword) {
        this.isPasswordTip = 1
        this.againTip = '两次输入的密码不一致'
        return false
      }
      this.againTip = ''
      api.modifyPassword({userId: this.userMess.id, password: this.oldPassword, newPassword: this.newPassword}).then(res => {
        if (res.message === '原密码输入错误') {
          this.isPasswordTip = 2
          this.oldTip = '原密码输入错误'
          return false
        } else {
          this.isPasswordTip = ''
          this.oldPassword = ''
          this.newPassword = ''
          this.passwordAgain = ''
          this.$message.success('修改成功')
        }
      })
      
    },
    send () {
      this.disabled = true
      setTimeout(this.sended, 1000)
    },
    sended () {
      this.$refs.btn.run()
      this.disabled = false
      api.getCode({mobile: this.userMess.mobile}).then(res => {
        console.log(res)
      })
    },
    send2 () {
      this.isPhoneTip = ''
      this.codeError = ''
      api.getCode({mobile: this.newPhone}).then(res => {
        console.log(res)
        if (res.message === '手机号不能为空') {
          alert('手机号不能为空!')
          return false
        }
        if (res.message === '手机号不正确，请重新输入!') {
          alert('手机号不正确，请重新输入!')
          return false
        }
        if (this.newPhone === this.userMess.mobile) {
          alert('与现在号码一样！')
          return false
        }
        this.disabled2 = true
        setTimeout(this.sended2, 1000)
      })
    },
    sended2 () {
      this.$refs.btn2.run()
      this.disabled2 = false
    }
  }
}
</script>

<style scoped>
.phone_bind{
  padding-top: 15px;
}
.phone_title span{
  color: #666;
  line-height: 16px;
  display: inline-block;
  cursor: pointer;
}
.phone_title span:first-child{
  border-right: 1px solid #68686a;
  padding-right: 6px;
  margin-right: 6px;
}
.phone_title span:hover,.phone_title span.current{
  color: #18ccc0;
}
.wx_bind .wx_binding{
  padding-top: 15px;
  overflow: hidden;
}
.wx_bind .wx_binding #login_container{
  height: 290px;
}
.edit-enter-active, .edit-leave-active {
  transition: opacity .5s
}
.edit-enter, .edit-leave-active {
  opacity: 0
}
.acsafe{
  width:96%;
  margin: 0 auto;
}
.pd_sp_title{ 
  color:#18ccc0;
  line-height:40px;
}
.pd_sp_binding{ 
  padding:16px 0px;
  overflow: hidden;
}
.pd_sp_binding span{ 
  float:left; 
  display:block; 
  line-height:28px;
  width:80px;
  color:#666;
}
.pd_sp_binding em{ 
  color:#666; 
  font-weight:bold;
  display: inline-block;
  text-align:left; 
  float:left; 
  line-height:28px;
}
.pd_sp_binding button{ 
  line-height:28px; 
  font-size:14px; 
  transition:all 0.5s; 
  margin-left:10px; 
  width:48px; 
  border-radius:4px; 
  float:left;
  color:#fff; 
  background:#18ccc0; 
}
.pd_sp_binding button:hover{ 
  box-shadow:0 0 8px #999; 
  -moz-box-shadow: 0 0 8px #999; 
  -webkit-box-shadow: 0 0 8px #999;
}
.pd_sp_edit ul li{ 
  height:40px;
  line-height:40px; 
  padding:10px 0;
}
.pd_sp_edit ul li span{ 
  display:block; 
  float:left; 
  height:40px; 
  line-height:40px; 
  width:56px; 
  text-align:right; 
  color:#666;
}
.pd_sp_edit ul li input[type=text]{ 
  transition:all 0.5s; 
  margin-left:24px; 
  line-height:38px; 
  float:left; 
  height:38px; 
  border:#dddddd 1px solid; 
  border-radius:4px; 
  text-indent:10px; 
  width:250px;
}
.pd_sp_edit ul li input[type=text]:focus{ 
  border:#18ccc0 1px solid; 
  box-shadow: 0 0 8px rgba(122,208,202,.105); 
  -moz-box-shadow: 0 0 8px rgba(122,208,202,.5); 
  -webkit-box-shadow: 0 0 8px rgba(122,208,202,3);
}
.pd_sp_edit ul li .vcode{
  float: left;
  position: relative;
}
.pd_sp_edit ul li p{ 
  width:500px; 
  margin-left:10px; 
  float:left; 
  height:40px; 
  line-height:40px; 
  text-indent:20px; 
  color:#bbbbbb;
}
.pd_sp_edit ul li button.btns{ 
  border:#18ccc0 1px solid; 
  line-height:28px; 
  font-size:14px; 
  float:left; 
  margin-left:24px; 
  transition:all 0.5s; 
  border-radius:4px; 
  cursor:pointer; 
  color:#fff; 
  background:#18ccc0;
  width: 65px;
}
.pd_sp_edit ul li button.btns:hover{ 
  box-shadow:0 0 8px #999; 
  -moz-box-shadow: 0 0 8px #999; 
  -webkit-box-shadow: 0 0 8px #999;
}
.pd_sp_edit ul li.sendIng input[type=button]{ 
  background:#e2e1e2;
}
.pd_spe_one h3{ 
  background:url(~assets/images/icon/shield.png) 78px 12px no-repeat; 
  color:#666; 
  height:40px; 
  line-height:40px; 
  text-indent:95px;
  font-size: 14px;
}

.pd_s_password{
  margin-top:16px; 
  border-top:#cccccc 1px solid; 
  padding-top:10px;
}
.pd_s_password ul{ 
  padding-bottom:30px;
}
.pd_s_password ul li{ 
  height:40px; 
  line-height:40px; 
  padding:10px 0;
}
.pd_s_password ul li span{ 
  display:block; 
  float:left; 
  height:40px; 
  line-height:40px; 
  width:56px; 
  text-align:right; 
  color:#666;
}
.pd_s_password ul li input[type=text]{ 
  transition:all 0.5s; 
  margin-left:24px; 
  line-height:38px; 
  float:left; 
  height:38px; 
  border:#dddddd 1px solid; 
  border-radius:4px; 
  text-indent:10px; 
  width:250px;
}
.pd_s_password ul li input[type=password]{ 
  transition:all 0.5s; 
  margin-left:24px; 
  line-height:38px; 
  float:left; 
  height:38px; 
  border:#dddddd 1px solid; 
  border-radius:4px; 
  text-indent:10px; 
  width:250px;
}
.pd_s_password ul li input[type=password].error{
  border-color: #f00;
}
.pd_s_password ul li p{ 
  width:500px; 
  margin-left:10px; 
  float:left; 
  height:40px; 
  line-height:40px; 
  text-indent:20px; 
  color:#bbbbbb;
}
.pd_s_password ul li button{ 
  line-height:28px; 
  font-size:14px;
  float:left;
  margin-left:24px; 
  transition:all 0.5s; 
  width:65px; 
  border-radius:4px; 
  float:left; 
  cursor:pointer; 
  height:28px; 
  color:#fff; 
  background:#18ccc0; 
}
.pd_s_password ul li button:hover{ 
  box-shadow:0 0 8px #999; 
  -moz-box-shadow: 0 0 8px #999; 
  -webkit-box-shadow: 0 0 8px #999;
}
.pd_sp_tip1{ 
  background:url(~assets/images/icon/binggo.png) left center no-repeat;
}
.pd_sp_tip2{ 
  background:url(~assets/images/icon/tanhao.png) left center no-repeat;
}
.pd_sp_tip3{ 
  background:url(~assets/images/icon/x.png) left center no-repeat;
}
.pd_s_password ul li input[type=text]:focus,.pd_s_password ul li input[type=password]:focus{ 
  border:#18ccc0 1px solid; 
  box-shadow: 0 0 8px rgba(122,208,202,.105); 
  -moz-box-shadow: 0 0 8px rgba(122,208,202,.5); 
  -webkit-box-shadow: 0 0 8px rgba(122,208,202,3);
}
</style>
