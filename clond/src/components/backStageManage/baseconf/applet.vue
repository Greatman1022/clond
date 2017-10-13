<template>
    <div id='applet'>
      <div class='bc_block'>
      <h2>小程序信息</h2>
      <div class='bc_item'>
        <p class='p_line'>
          <i class='icon'></i>
          <span>微信小程序绑定</span>
        </p>
        <ul>
          <li>
            <label>
              <span>小程序名称：</span>
              <input type='text' placeholder="请输入小程序名称" v-model='miniApp.nickName' />
            </label>
          </li>
          <li>
            <label>
              <span>APPID：</span>
              <input type='text' placeholder="请输入APPID" v-model='miniApp.appid' />
            </label>
          </li>
          <li>
            <label>
              <span>APPSecret：</span>
              <input type='text' placeholder="请输入APPSecret" v-model='miniApp.appSecret' />
            </label>
          </li>
          <li>
            <span>&nbsp;</span>
            <input type='button' value='保存' @click='bindApplet' />
          </li>
        </ul>
      </div>

      <div class='bc_item'>
        <p class='p_line'>
          <i class='icon'></i>
          <span>小程序商户配置信息</span>
        </p>
        <ul>
          <li>
            <label>
              <span>微信支付商户号：</span>
              <input type='text' placeholder="请输入微信支付商户号" v-model='miniMchId' :disabled='miniMDisabled' />
            </label>
          </li>
          <li>
            <label>
              <span>支付API密钥：</span>
              <input type='text' placeholder="请输入支付API密钥" v-model='miniPayKey' :disabled='miniPDisabled' />
            </label>
          </li>
          <li>
            <span>支付证书：</span>
            <em class='clientshow'>{{miniClient}}</em>
            <el-upload class="fileload" accept='.p12' :action="'http://cloud'+ test +'.vdongchina.com/basic/config/certif?bindAppid='+miniApp.appid" name='apiclientCertFile' :disabled='miniADisabled' :show-file-list='false' :on-success='minicertifSuccess' :class='{"btndisabled": miniADisabled==true}'>
              <el-button>上传文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传.p12文件，且不超过500kb</div>
            </el-upload>
          </li>
          <li>
            <span>&nbsp;</span>
            <input type='button' value='保存' :disabled='btnMDisabled' @click='miniConfigModify' :class='{"nosave": btnMDisabled==true}' />
          </li>
        </ul>
      </div>

      <p class='retip'>已上传的代码请移至微信公众平台
        <a href='https://mp.weixin.qq.com/' target="_blank" class="mp-wx">https://mp.weixin.qq.com/</a>
      </p>
      <div class='bc_item'>
        <div class='p_line'>
          <i class='icon'></i>
          <span>上传小程序代码</span>
          <div class='redColor loadtip'>
            <em v-if='statusShow == 2'>版本号：{{versionShow}}</em>
            <em v-if='statusShow == -1'>发布失败原因：{{reasonShow}}</em>
            <em v-if='statusShow == -1'>发布状态：发布失败</em>
            <em v-if='statusShow == 2'>发布状态：发布成功</em>
          </div>
        </div>
        <ul v-if='!waitingDisplay'>
          <li>
            <label>
              <span>小程序版本号：</span>
              <input type='text' placeholder="请输入小程序版本号" v-model='versionNum' />
            </label>
          </li>
          <li>
            <label>
              <span>说明：</span>
              <input type='text' placeholder="请输入说明，说明不得超过20字符" v-model='dmexplain' />
            </label>
          </li>
          <li>
            <span>&nbsp;</span>
            <input type='button' value='点击上传' @click='clickUpload' />
            <v-playvideo srcUrl="http://assets.vdongchina.com/%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E5%8F%91%E5%B8%83%E5%B0%8F%E7%A8%8B%E5%BA%8F.mp4" playText="什么时候发布小程序"></v-playvideo>
            <p class='tip tipVn'>{{vnError}}</p>
          </li>
        </ul>
        <div class='uploadWaiting' v-else>
          <img src="~assets/images/icon/waiting_icon.png" />
          <p>你的项目正在部署中，预计时长5分钟，如需上传新代码，请5分钟后再次上传...</p>
        </div>
      </div>
    </div>
    <el-dialog title="上传成功" :visible.sync="dialogSuccessVisible" size="xs" custom-class="dialog-theme2">
        <span>您的代码已成功上传至微信公众平台，请前往公众平台提交审核或获取体验二维码！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveUploadVisible">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="信息" :show-close='false' :visible.sync="saveSuccessVisible" size="xs" custom-class="dialog-theme2 message">
        <p class='tc fz18'>保存成功!</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveSuccessBtn">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="信息" :show-close='false' :visible.sync="secondSaveVisible" size="xs" custom-class="dialog-theme2 message">
        <p class='tc fz18'>小程序绑定账号每六个月修改一次，下次修改时间：2018-02-11 09:19:11</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="secondSaveBtn">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="信息" :show-close='false' :visible.sync="bindAppletVisible" size="xs" custom-class="dialog-theme2">
        <span>这是您在最近6个月内第二次修改小程序appid了，6个月内最多只能修改2次小程序appid，确定修改么？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setBindApplet">确 定</el-button>
          <el-button @click="cancelbindApplet">取消</el-button>
        </span>
      </el-dialog>
      <el-dialog title="绑定失败" :show-close='false' :visible.sync="loadFailVisible" size="xs" custom-class="dialog-theme2 message">
        <p class='tc fz18'>必须授权公众号绑定！!</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveLoadFailBtn">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="上传代码失败" :visible.sync="buyTemplateVisible" size="xs" custom-class="dialog-theme2 message">
        <p class='tc fz18'>您还没有购买此模板，无法上传代码</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveBuyTemplate">立即购买</el-button>
        </span>
      </el-dialog>
      <el-dialog :show-close='false' :visible.sync="dialogUploadVisible" class='verifyIdentity' @close='closeDialog' @open='uploadDialog'>
        <div class='ewm_item'>
          <em class='ltj'></em>
          <em class='rtj'></em>
          <em class='lbj'></em>
          <em class='rbj'></em>
          <img :src='uploadEwm'>
        </div>
        <p>{{ conUpload }}</p>
      </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../../../fetch/api.js'
import vPlayvideo from 'components/common/playVideo'
export default {
  name: 'applet',
  components: {
    vPlayvideo
  },
  data() {
    return {
      appid: null,
      versionNum: '',
      dmexplain: '',
      dialogUploadVisible: false,
      dialogSuccessVisible: false,
      vnError: '',
      uploadEwm: '',
      conUpload: '',
      apiclientCertFile: '',
      codeVersionid: '',
      identical: false,
      getState: '',
      //getQrState: '',
      waitingDisplay: false,
      isChoosed: false,
      isLand: false,
      loadStatus: '', // 定时检查上传状态
      versionShow: '', // 最新上传的版本号
      reasonShow: '', // 上传失败原因
      statusShow: '', // 上传状态,
      buyTemplateVisible: false,
      test: ''
    }
  },
  created() {
    this.test = window.location.hostname.indexOf('-test') >= 0 ? '-test' : ''
    this.appid = this.$route.params.appid
    this.$store.dispatch('setAppDetail', {appid: this.appid})
    this.getUploadStatus()
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo',
      miniApp: 'getMiniApp',
      checkDisabled: 'getCheckDisabled',
      miniMDisabled: 'getMiniMDisabled',
      miniPDisabled: 'getMiniPDisabled',
      miniADisabled: 'getMiniADisabled',
      btnMDisabled: 'getBtnMDisabled',
      wxMDisabled: 'getWxMDisabled',
      wxPDisabled: 'getWxPDisabled',
      wxADisabled: 'getWxADisabled',
      btnWDisabled: 'getBtnWDisabled',
      saveSuccessVisible: 'getSaveSuccessVisible',
      loadFailVisible: 'getLoadFailVisible',
      bindAppletVisible: 'getBindAppletVisible',
      secondSaveVisible: 'getSecondSaveVisible',
      appDetail: 'getAppDetail'
    }),
    miniMchId: {
      get() {
        return this.$store.getters.getMiniMchId
      },
      set(value) {
        this.$store.commit('UPDATEMCHID', value)
      }
    },
    miniPayKey: {
      get() {
        return this.$store.getters.getMiniPayKey
      },
      set(value) {
        this.$store.commit('UPDATEPAYKEY', value)
      }
    },
    miniClient: {
      get() {
        return this.$store.getters.getMiniClient
      },
      set(value) {
        this.$store.commit('UPDATECLIENT', value)
      }
    }
  },
  methods: {
    saveLoadFailBtn() {
      this.$store.commit('GETLOADFAILVISIBLE', false)
    },
    saveBuyTemplate() {
      api.payManner().then(res => {
        if (res.payManner === 'money') {
          this.$router.push({ name: 'pay', params: { appid: this.appid } })
          // console.log('请用支付宝支付')
          this.$store.commit('GETAGENTPAY', false)
        }
        if (res.payManner === 'deduct') {
          this.$router.push({ name: 'pay', params: { appid: this.appid } })
          this.$store.commit('GETAGENTPAY', true)
        }
      })
      //this.$router.push({name: 'pay', params: { appid: this.appid}})
    },
    saveSuccessBtn() {
      this.$store.commit('GETSAVESUCCESSVISIBLE', false)
    },
    getUploadStatus() {
      //this.loadStatus = setInterval(function () {
      api.getVersionUploadStatus({ appid: this.appid }).then(res => {
        //console.log(res)
        if (res.codeVersion) {
          this.versionShow = res.codeVersion.version
          this.reasonShow = res.codeVersion.reason,
            this.statusShow = res.codeVersion.status
        }
      })
      //}, 5000)
    },
    closeDialog() {
      clearInterval(this.getState)
      //clearInterval(this.getQrState)
    },
    minicertifSuccess(res, file) {
      this.miniClient = file.name
    },
    getWalogin() {     // 获取登录二维码
      api.getWalogin({
        userId: this.userInfo.data.id
      }).then(res => {
        //clearInterval(this.getQrState)
        this.conUpload = '扫一扫登录微信开发者工具'
        this.uploadEwm = res.data
        let _this = this
        this.getState = setInterval(function() {
          api.getQueryLoginScanState({
            userId: _this.userInfo.data.id
          }).then(res => {
            console.log(res)
            console.log(res.state)
            if (res.state === 1) {
              _this.isLand = true
              clearInterval(_this.getState)
              _this.getCommitQrCode()
            }
          })
        }, 1000)
      })
    },
    getCommitQrCode() { // 获取上传代码确认二维码
      api.getCommitQrCode({ userId: this.userInfo.data.id, appId: this.appDetail.miniAppid }).then(res => {
        console.log(res)
        console.log(this.isLand)
        if (res.errcode === 40013) {
          this.uploadEwm = ''
          this.conUpload = '您的appid无效！'
          return false
        }
        if (res.errcode < 0 && this.isLand === false) {
          this.getWalogin()
          return false
        }
        if (res.errcode < 0 && this.isLand === true) {
          this.uploadEwm = ''
          this.conUpload = '您没有开发者权限！'
          this.isLand = false
          return false
        }
        if (res.errcode > 0) {
          this.getWalogin()
          return false
        } else {
          // clearInterval(this.getQrState)
          // this.uploadEwm = 'data:image/jpg;base64,' + res.data
          // this.conUpload = '扫一扫上传小程序代码'
          // let $this = this
          // this.getQrState = setInterval(function(){
          //   api.getQueryQrCodeState({
          //     userId: $this.userInfo.data.id, 
          //     appId: $this.appDetail.miniAppid
          //   }).then(res => {
          //     console.log(res)
          //     if(res.qrcode_state === 1) {
          //       $this.uploadEwm = ''
          //       $this.conUpload = 'uuid 错误'
          //     }
          //     if(res.qrcode_state === 2) {
          //       $this.getCommitQrCode()
          //     }
          //     if (res.qrcode_state === 5) {
          //       clearInterval($this.getQrState)
          //       $this.getPublish()
          //     }
          //   })
          // }, 1000)
          this.getPublish()
        }

      })
    },
    getPublish() { //发布
      api.getPublish(
        this.userInfo.data.id,
        this.appDetail.appid,
        this.appDetail.miniAppid,
        this.codeVersionid,
        this.versionNum,
        this.dmexplain,
        this.appDetail.config
      ).then(res => {
        if (res.errcode === 1) {
          this.getWalogin()
        } else if (res.errcode === 2) {
          this.getCommitQrCode()
        } else {
          console.log(res)
          this.versionNum = '',
            this.dmexplain = '',
            this.dialogUploadVisible = false
          this.dialogSuccessVisible = true
        }
      })
    },
    saveUploadVisible() {
      this.dialogSuccessVisible = false

      this.waitingDisplay = true
      this.versionShow = ''
      this.reasonShow = ''
      this.statusShow = ''

      let $this = this
      this.loadStatus = setInterval(function() {
        api.getVersionUploadStatus({ appid: $this.appid }).then(res => {
          console.log(res.codeVersion)
          if (res.codeVersion) {
            if (res.codeVersion.status === 2 || res.codeVersion.status === -1) {
              $this.waitingDisplay = false
              clearInterval($this.loadStatus)
            }
            $this.versionShow = res.codeVersion.version
            $this.reasonShow = res.codeVersion.reason,
              $this.statusShow = res.codeVersion.status
          } else {
            console.log('无版本号生成！')
            clearInterval($this.loadStatus)
          }
        })
      }, 5000)
    },
    clickUpload() {
      if (!this.versionNum) {
        this.vnError = '请输入版本号'
        return false
      }
      this.vnError = ''
      if (!this.dmexplain) {
        this.vnError = '请输入说明文字'
        return false
      }
      // if(!this.appDetail.miniAppid) {
      //   this.vnError = '请绑定小程序'
      //   return false
      // }
      if (!this.appDetail.isBuy) {
        this.buyTemplateVisible = true
        // this.vnError = '请先购买模板'
        return false
      }
      clearInterval(this.getState)
      // clearInterval(this.getQrState)
      this.dialogUploadVisible = true
    },
    uploadDialog() { /* 上传代码 */
      api.codeUpload({
        appid: this.appDetail.appid,
        config: this.appDetail.config,
        version: this.versionNum,
        explain: this.dmexplain
      }).then(res => {
        console.log(res)
        this.getCommitQrCode()
        this.codeVersionid = res.codeVersionId
      })
    },

    // setIsChoosed() { // 选择小程序是否有同样配置
    //   this.isChoosed = !this.isChoosed
    //   this.$store.commit('GETISCHOOSED', this.isChoosed)
    //   if (this.isChoosed) {
    //     this.identical = true
    //   } else {
    //     this.identical = false
    //   }
    // },


    miniConfigModify() { /* 小程序商户配置信息修改 */
      this.$store.dispatch('setMiniConfigModify', {
        appid: this.appDetail.appid,
        bindAppid: this.miniApp.appid,
        mchId: this.miniMchId,
        payKey: this.miniPayKey,
        identical: this.identical
      })
    },

    /* 绑定小程序 */
    bindApplet() {
      if (!this.miniApp.nickName) {
        alert('小程序名称不能为空！')
        return false
      }
      if (!this.miniApp.appid) {
        alert('APPID不能为空！')
        return false
      }
      if (!this.miniApp.appSecret) {
        alert('APPSecret不能为空！')
        return false
      }

      this.$store.dispatch('saveBindApplet', {
        appid: this.appDetail.appid,
        nickName: this.miniApp.nickName,
        miniAppid: this.miniApp.appid,
        appSecret: this.miniApp.appSecret
      })
    },
    setBindApplet() {
      this.$store.dispatch('setBindApplet', {
        appid: this.appDetail.appid,
        nickName: this.miniApp.nickName,
        miniAppid: this.miniApp.appid,
        appSecret: this.miniApp.appSecret
      })
    },
    cancelbindApplet() {
      this.$store.commit('GETBINDAPPLETVISIBLE', false)
      this.$store.dispatch('setAppDetail', { appid: this.appid })
    },
    secondSaveBtn() {
      this.$store.commit('GETSECONDSAVEVISIBLE', false)
    }
  },
  watch: {
  }
}
</script>
<style scoped>
.uploadWaiting {
  background-color: #f2f8f7;
  text-align: center;
  padding: 55px 0 50px;
  margin-bottom: 16px;
}

.uploadWaiting p {
  line-height: 50px;
  color: #999;
}
.bc_block h2 span {
  font-weight: normal;
}

.bc_item {
  border-bottom: 1px dashed #e2e2e2;
  padding-top: 16px;
  line-height: 15px;
}

.bc_item .p_line {
  clear: both;
  padding-bottom: 16px;
}

.bc_item .p_line i.icon {
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 6px solid transparent;
  border-left: 10px solid #ddd;
  border-bottom: 6px solid transparent;
  margin: 1px 10px 0 0;
}


.bc_item .p_line a {
  color: #0088cc;
  float: right;
}

.bc_item .p_line em {
  color: #aaa;
  float: right;
}

.bc_item ul {
  overflow: hidden;
}

.bc_item ul li {
  width: 100%;
  padding-bottom: 20px;
  float: left;
}

.bc_item ul li span {
  width: 196px;
  display: inline-block;
  text-align: right;
  font-size: 14px;
  float: left;
  line-height: 40px;
}

.bc_item ul li label {
  float: left;
  display: inline-block;
  overflow: hidden;
  font-size: 0;
}

.bc_item ul li label input {
  line-height: 38px;
  width: 228px;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 10px;
  font-size: 14px;
}

.fileload {
  display: inline-block;
  position: relative;
  float: left;
}

.fileload em {
  border: 1px solid #ddd;
  display: block;
  width: 98px;
  line-height: 38px;
  border-radius: 3px;
  text-align: center;
  font-style: normal;
}

.fileload input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 40px;
  cursor: pointer;
  opacity: 0;
}

input[type='button'] {
  background-color: #18ccc0;
  border-radius: 3px;
  border: none;
  width: 94px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
}

p.retip {
  padding: 0 8px;
  line-height: 43px;
  text-indent: 25px;
  background: url(~assets/images/icon/icon_notes.png) center left 8px no-repeat #f5f5f5;
  margin-top: 20px;
  color: #666;
}

p.retip a {
  color: #333;
}

.bc_item .tip {
  font-size: 14px;
  color: #f00;
}

.verifyIdentity p {
  text-align: center;
  border: 1px solid #cccccc;
  line-height: 40px;
  font-size: 16px;
  letter-spacing: 6px;
  margin-top: 20px;
}

.ewm_item {
  position: relative;
  padding: 5px;
  height: 280px;
}

.ewm_item img {
  width: 280px;
  height: 280px;
}

.ewm_item em {
  position: absolute;
  width: 36px;
  height: 36px;
}

.ltj {
  top: 0px;
  left: 0px;
  border-left: 2px solid #ccc;
  border-top: 2px solid #ccc;
}

.rtj {
  top: 0px;
  right: 0px;
  border-right: 2px solid #ccc;
  border-top: 2px solid #ccc;
}

.lbj {
  bottom: 0px;
  left: 0px;
  border-left: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
}

.rbj {
  bottom: 0px;
  right: 0px;
  border-right: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
}

em.clientshow {
  position: relative;
  top: 10px;
  left: -80px;
}

.nosave {
  background-color: #ccc!important;
  cursor: auto!important;
}

.mp-wx {
  color: blue !important;
  text-decoration: underline;
}

.loadtip {
  display: inline-block;
  margin-left: 50px;
}

.bc_item .p_line .loadtip em {
  color: #f85f5f;
  float: none;
  margin-left: 50px;
}
</style>
