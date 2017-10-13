<template>
  <div class="editor2" @click="hidecontextmenu">
    <div style="display:none">2017.9.20-1347</div>
	  <div class="header">
	  	<a class="ed-back" @click='gotoHome'>
	  		<i class="el-icon-d-arrow-left"></i>返回
	  	</a>
	  	<div class="top-mad">
          <a class="checkTpl" @click="checkTpl(1)"><i class="fa fa-reorder mr5"></i>模板</a>
	  			<a class="ser" target="_blank" href="http://pwt.zoosnet.net/LR/Chatpre.aspx?id=PWT85081952&amp;lng=cn">客服</a>
	  			<a class="man" @click='back'>管理</a>
	  			<a class="hel" @click="help">帮助</a>
	  	</div>
	  	<div class="top-right">
	  			<span @click="save(1)">保存</span>
	  			<!-- <span @click="preview" v-if='is_preview'>预览</span> -->
          <a target="_blank" @click="previewBlank" ref="preview">预览</a>
	  			<span class="rel" @click='releaseBtn'>发布</span>
	  	</div>
	  </div>
    <ListBar></ListBar>
    <Stage></Stage>
    <ToolBar :tipPanel="panel"></ToolBar>
	  <div class="modal" v-if="showModal"></div>
    <div class="mask"  v-show="showHelp">
      <!-- 提示1 -->
      <div class="step-1" v-show="tip==1">
        <div class="ed-addPage vd-bg pos-a vd-box-sizing pos-r dis-flex">
          <div class="ed-addPage-btn-1 dis-flex-1"><i class="el-icon-plus"></i>&nbsp;&nbsp;新建页面</div>
          <div class="ed-addPage-up-btn"><i class="el-icon-caret-top"></i></div>
        </div>
        <div class="tip">
          <a href="javascript:void(0);" class="prev"></a>
          <a href="javascript:void(0);" class="next" @click="changeTip(2)"></a>
        </div>
      </div>

      <!-- 提示2 -->
      <div class="step-2" v-show="tip==2">
        <div class="tip">
          <a href="javascript:void(0);" class="prev" @click="changeTip(1)"></a>
          <a href="javascript:void(0);" class="next" @click="changeTip(3)"></a>
        </div>
      </div>

      <!-- 提示3 -->
      <div class="step-3" v-show="tip==3">
        <div class="top-mad">
  	  			<a class="man">管理</a>
  	  	</div>
        <div class="tip">
          <a href="javascript:void(0);" class="prev" @click="changeTip(2)"></a>
          <a href="javascript:void(0);" class="next" @click="changeTip(4)"></a>
        </div>
      </div>

      <!-- 提示4 -->
      <div class="step-4" v-show="tip==4">
        <div class="top-mad">
  	  			<a class="ser">客服</a>
  	  	</div>
        <div class="tip">
          <a href="javascript:void(0);" class="start" @click="hideHelp"></a>
        </div>
      </div>

      <a href="javascript:void(0);" class="close" @click="hideHelp"></a>
    </div>
    <div class="disabled" v-show="tip==2"></div>

    <div class="preview_dialog" v-show="previewVisible" @click.stop="previewVisible=false">
      <div class="dialog_phone">
        <div class="dialog_content" >
          <iframe :src="previewUrl" id="preview" name="preview"></iframe>
        </div>
      </div>
    </div>
    <div class="checkTpl_dialog"  v-if="is_checkTpl">
      <checkTpls  @checkTpl="checkTpl"></checkTpls>
    </div>
  </div>
</template>

<script>
function onbeforeunload (event) {
  event.returnValue = '我在这写点东西...'
}
import cDefault from './config/cDefault.js'
import baseSenior from './config/baseSenior.js'
import API from '../../fetch/api.js'
import userInfo from '../../store/modules/common'
import api from '../../fetch/api.js'
import CommonJs from '@/assets/js/editorUntil'
import ListBar from './ListBar'
import Stage from './Stage'
import ToolBar from './ToolBar.vue'
import BaseTpl from './config/baseTpl'   //宁波个人中心缺失配置
import BaseTpl2 from './config/baseTpl2'   //北分缺失配置
import checkTpls from './tpl/checkTpl'
export default {
  name: 'editor2',
  data () {
    return {
      appid: '', // 小程序
      baseAppName: '',
      sampleAppid: '',
      tempId: '',
      showHelp: false,
      tip: 1,
      panel: '',
      codeVersion: null,
      previewVisible: false,
      previewUrl: '',
      is_preview: false,
      tab: 0,
      preview: '',
      websocket: null,
      is_checkTpl: false // 模板替换dialog显示状态
    }
  },
  components: {
    ListBar: ListBar,
    Stage: Stage,
    ToolBar: ToolBar,
    cDefault: cDefault,
    baseSenior: baseSenior,
    checkTpls: checkTpls
  },
  created () {
    let that = this
    let websocket = require('@/assets/js/websocket-lib')
    websocket.default.wslib.websocket({
      url: 'ws://cloud.vdongchina.com/websocket',
      heartbeattime: 500000
    })
  },
  mounted () {
    window.addEventListener('beforeunload', onbeforeunload)
    this.$store.commit('cDefault', cDefault.pConf)
    this.$store.commit('baseSenior', baseSenior.baseSenior)
    this.appid = this.$route.params.appid
    this.preview = '/preview/' + this.appid
    this.$store.state.upConfigTime = new Date().getTime()
    const vdPrefix = this.$vdPrefix.appServer   //全局配置
    Object.keys(vdPrefix).forEach((item,index)=>{ //复制全局对象
       this.$root[item]= vdPrefix[item]
    })
    api.getGuardServer({
      appid: this.appid
    }).then(res => {
      this.codeVersion = res.success
      this.$root.upAppid = this.appid
      if (res.success) {
        this.$root.appid = this.appid
        this.is_preview = true
        this.$store.commit('rootAppid', this.appid)
      } else {
        this.is_preview = false
        // this.$root.appid = 'sample-flashbuy'
        // this.$store.commit('rootAppid', 'sample-flashbuy')
      }
      api.getConfig({      // 获取模板数据
        appid: this.appid
      }).then(res => {
        let userId = res.customerApp.userId
        api.getperMission({userId: userId}).then(res => { if (res.modulePermission) { this.$store.commit('getperMission', res.modulePermission.moduleList) } })
        var obj = JSON.parse(res.customerApp.config || '{}')
        this.sampleAppid = obj.sampleAppid
        this.$root.sampleAppid = obj.sampleAppid // 获取对应默认数据
        this.baseAppName = obj.baseAppName
        this.$store.commit('getSampleAppid', obj.sampleAppid)
        this.$store.commit('getCityIdentify', [res.customerApp.temp.identify,res.customerApp.temp.devLanguage])// 区分北京和宁波模板值(后者为最新的判断 PHP和java 区分)
        // this.$store.commit('getCityIdentify', res.customerApp.temp.identify)
        this.$store.commit('getTemp', res.customerApp.temp)
        var pagesVal = obj.pages || [{
          pageName: 'index',
          title: '首页',
          children: []
        }]
        if (res.customerApp.temp.identify != 'cloud_shop') {
          pagesVal = this.hasCenter(pagesVal)
          pagesVal = this.hasCommunity(pagesVal)
        }else{
          pagesVal = this.hasPersonal(pagesVal)
          pagesVal = this.hasClasstify(pagesVal)
          pagesVal = this.hasShopCart(pagesVal)
//          pagesVal = this.hasDetail(pagesVal)
        }

        this.$store.commit('newTest', pagesVal)
        if (!this.is_preview) { // 预设数据
          this.$root.appid = 'sample-' + this.sampleAppid
          this.$store.commit('rootAppid', this.$root.appid)
        }
      })
    })
  },
  computed: {
    showModal () {
      return this.$store.state.showModal
    }
  },
  beforeDestroy () {
    this.$store.commit('resetState')
    clearInterval(this.query)
    clearInterval(this.query2)
    window.removeEventListener('beforeunload', onbeforeunload)
  },
  methods: {
    hasCenter (newApps) {     // 判断个人中心页面存在和赋值
      for (let i = 0; i < newApps.length; i++) {
        if (newApps[i].pageName == 'personCenter') {
            // console.log("3333=>",this.deepFill(BaseTpl.baseTpl,newApps[i]))
          newApps[i] = this.deepCopy(this.deepFill(BaseTpl.baseTpl[0], newApps[i]))
            // console.log(JSON.stringify(newApps[i]))
          return newApps
        }
      }
      return newApps.concat(BaseTpl.baseTpl[0])
    },
    hasCommunity (newApps) {
      for (let i = 0; i < newApps.length; i++) {
        if (newApps[i].pageName == 'community') {
          newApps[i] = this.deepCopy(this.deepFill(BaseTpl.baseTpl[1], newApps[i]))
          return newApps
        }
      }
      return newApps.concat(BaseTpl.baseTpl[1])
    },
    hasClasstify(newApps) {     // 判断北分分类页面存在和赋值
      for(let i=0;i<newApps.length;i++) {
        if(newApps[i].pageName == 'classlist'){
          newApps[i]=this.deepCopy(this.deepFill(BaseTpl2.baseTpl2[0],newApps[i]))
          return newApps
        }
      }
      return newApps.concat(BaseTpl2.baseTpl2)
    },
    hasShopCart(newApps) {     // 判断北分购物车页面存在和赋值
      for(let i=0;i<newApps.length;i++) {
        if(newApps[i].pageName == 'shopcart'){
          newApps[i]=this.deepCopy(this.deepFill(BaseTpl2.baseTpl2[1],newApps[i]))
          return newApps
        }
      }
      return newApps.concat(BaseTpl2.baseTpl2)
    },
    hasPersonal(newApps) {     // 判断北分个人中心存在和赋值
      for (let  i = 0; i < newApps.length; i++) {
        if(newApps[i].pageName == 'personal'){
//          console.log(11111+this.deepFill(BaseTpl2.baseTpl2,newApps[i]))
          newApps[i]=this.deepCopy(this.deepFill(BaseTpl2.baseTpl2[2],newApps[i]))
          return newApps
        }
      }
      return newApps.concat(BaseTpl2.baseTpl2)
    },
    hasDetail(newApps) {      // 判断北分商品详情页面存在和赋值
      for (let  i = 0; i < newApps.length; i++) {
        if(newApps[i].pageName == 'goods'){
          newApps[i]=this.deepCopy(this.deepFill(BaseTpl2.baseTpl2[3],newApps[i]))
          return newApps
        }
      }
      return newApps.concat(BaseTpl2.baseTpl2)
    },
    hidecontextmenu () {
      this.$store.commit('changeContextmenu', false)
    },
    onbeforeunload_handler () {
      var warning = '确认退出?'
      return warning
    },
    gotoHome () {   // 返回
      // this.$store.commit('CHANGENAV', true)
      this.is_save(() => {
        let _role = userInfo.state.userInfo.data && userInfo.state.userInfo.data.role ? userInfo.state.userInfo.data.role : 'apper'
        if (_role === 'ROLE_APPUI' || _role === 'ROLE_UI' || _role === 'ROLE_ADMIN') {
          this.$router.push({
            name: 'platTempManage'
          })
        } else {
          this.$router.push({
            name: 'miniprograms'
          })
        }
      })
    },
    releaseBtn () { // 发布
      this.is_save(() => {
        this.$router.push({
          name: 'backstagemanage',
          params: {
            appid: this.appid,
            tab: this.tab
          }
        })
      })
    },
    deepFill (source, data) { // 填充
      for (var item in source) {
        if (source[item].com == 'nav') {
          break
        }
        if (typeof data[item] === 'undefined') {
          data[item] = typeof source[item] === 'object' ? (source[item].constructor == Object ? this.deepFill(source[item], {}) : this.deepFill(source[item], [])) : source[item]
        } else if (typeof source[item] === 'object') {
          if(this.$store.state.cityIdentify!='cloud_shop'){
            typeof source[item].title != 'undefined'&&(data[item].title=source[item].title)
          }
          // typeof source[item].title
          this.deepFill(source[item], data[item])
        }
      }
      return data
    },
    deepCopy (source) {
      // 对象数组深拷贝
      var sourceCopy = source instanceof Array ? [] : {}
      for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item]) : source[item]
      }
      return sourceCopy
    },
    is_save (fn) {
      this.$confirm('您是否保存所有的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '正在保存..'
        })
        this.save(1)
        fn()
      }).catch(() => {
        fn()
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    filterData (type = 0, tpl_arr) {  // 过滤数据  type==8判断模板替换
      var arr = {}
      arr.baseAppName = this.baseAppName
      arr.sampleAppid = this.sampleAppid
      arr.appid = this.appid
      // var newApps = CommonJs.editorLocalStorage.backt()
      var newApps = type == 8 ? tpl_arr : this.$store.state.newApps
      var pages = this.deepCopy(newApps)
      if (type != 8) {
        for (var i = 0; i < pages.length; i++) {
          pages[i]['onShareAppMessage'] = {
            title: pages[i].title,
            path: `/${pages[i].pageName}/${pages[i].pageName}`
          }
          for (var n = 0; n < pages[i].children.length; n++) {   // 文本修复
            delete pages[i].children[n].editorConfig
            pages[i].children[n].com == 'text' && !pages[i].children[n].items.text.match(/<\/([a-z])+([0-9]?)>$/) && (pages[i].children[n].items.text = '<p>' + pages[i].children[n].items.text + '</p>')
            if (pages[i].children[n].com == 'freePanel') {
              for (var l = 0; l < pages[i].children[n].children.length; l++) {
                delete pages[i].children[n].children[l].editorConfig
                pages[i].children[n].children[l].com == 'text' && !pages[i].children[n].children[l].items.text.match(/<\/([a-z])+([0-9]?)>$/) && (pages[i].children[n].children[l].items.text = '<p>' + pages[i].children[n].children[l].items.text + '</p>')
              }
            }
          }
        }
      }
      arr.pages = pages
      if (pages.length == 0) {
        return false
      }
      return arr
    },
    save (Type = 0, tpl_arr, checkingId) {  // type ==8 模板替换
      var arr = Type != 8 ? this.filterData() : this.filterData(8, tpl_arr)
      if (typeof arr === 'boolean') {
        this.$message({
          type: 'warning',
          message: '数据异常,请返回上一层'
        })
      } else {
        arr = JSON.stringify(arr)
        arr = arr.replace(/<font/g, '<span').replace(/<\/font>/g, '</span>')
        var vd_data = {
          appid: this.appid,
          config: arr
        }
        Type == 8 && (vd_data.tempId = checkingId)
        API.UpdateConfig(vd_data)
          .then(res => {
            if (res.success && Type) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              Type == 8 && location.reload()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          })
      }
    },
    help () {
      this.showHelp = true
      this.tip = 1
    },
    hideHelp () {
      this.showHelp = false
    },
    changeTip (step) {
      this.tip = step
      if (step == 2) {
        this.$store.commit('showPanel')
        this.panel = 'showPanel'
      } else {
        this.$store.commit('hidePanel')
        this.panel = ''
      }
    },
    back () {
      this.$router.push({
        name: 'backstagemanage',
        params: {
          appid: this.appid,
          tab: 0
        }
      })
    },
    previewBlank (e) {
      this.$confirm('您是否保存所有的数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '正在保存..'
        })
        this.save(1)
        // this.$refs.preview.setAttribute('href',this.preview)
        window.open(this.preview)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
        window.open(this.preview)
      })
    },

    checkTpl (type) {
      var h = this.$createElement
      if (type == 1) { // 打开
        this.is_checkTpl = true
      } else {
        this.is_checkTpl = false
        // type==3&&//模板取消
      }
      typeof type === 'object' && type[0] == 4 && (window.removeEventListener('beforeunload', onbeforeunload), this.save(8, type[1], type[2]))
    }
  }
}
document.onkeydown = function (e) {
  var code, type
  if (!e) {
    var e = window.event
  }
  if (e.keyCode) {
    code = e.keyCode
  } else if (e.which) {
    code = e.which
  }
  type = event.srcElement.type
  if (type !== undefined && (code == 8) && ((type != 'number' && type != 'text' && type != 'textarea' && type != 'password') || event.srcElement.readOnly == true)) {
    event.keyCode = 0
    event.returnValue = false
  }
  return true
}
if (typeof window.event === 'undefined') {
  document.onkeypress = function (e) {
    var type = e.target.localName.toLowerCase()
    var code = e.keyCode
    if ((code != 8 && code != 13) ||
      (type == 'input' && code != 13) ||
      (type == 'textarea')
      (type == 'submit' && code == 13)) {
      return true
    } else {
      return false
    }
  }
}
</script>
<style scoped>
.modal{
  position: fixed;
  width: 100%;
  background: rgba(0,0,0,.3);
  top: 0;
  bottom:0;
  left: 0;
  z-index: 960;
}

.mask{
  position: fixed;
  width: 100%;
  background: rgba(0,0,0,.65);
  top: 0;
  bottom:0;
  left: 0;
  z-index: 100000;
}

.editor2{
	height: 100%;
	overflow:hidden;
}
.header{
	height: 59px;
	width: 100%;
	background:#fff;
	position: absolute;
	top: 0;
	z-index: 959;
	border-bottom: 1px solid #ddd;
	}
.top-mad{
	width: 350px;
	position: absolute;
	top:0;
	left: 50%;
  margin-left: -175px;
	/*-webkit-transform: translateX(-50%);
  transform: translateX(-50%);*/
	line-height: 60px;
	display: flex;
	text-align: center;
}
.top-mad a{
	flex: 1;
	padding-left: 20px;
  color: #333;
}
.top-mad .ser{
	background: url(../../../static/img/icon-kefu-s.png) no-repeat;
	background-position: 20px 22px;
}
.top-mad .man{
	background: url(../../../static/img/icon-manage.png) no-repeat;
		background-position: 20px 22px;
}
.top-mad .hel{
	background: url(../../../static/img/icon-help.png) no-repeat;
		background-position: 20px 22px;
}
.top-right{
	position: absolute;
	top: 0;
	right: 10px;
	height: 60px;
}
.top-right:after{
	height: 0;
	clear: both;
	content: '';
	overflow: hidden;
	visibility: hidden;
	display: block;
}
.top-right span,.top-right a{
  float: left;
	width: 78px;
	height: 30px;
	border: solid 1px #18ccc0;
	text-align: center;
	margin-right: 20px;
	line-height: 30px;
	border-radius:4px ;
	margin-top: 15px;
	color: #18ccc0;
	cursor: pointer;
}
.top-right .rel{
	background: #18ccc0  url(../../../static/img/icon-public.png) no-repeat;
	background-position:10px 8px ;
	color: #FFFFFF;
	padding-left: 12px;
	width: 66px;

}
.ed-back{
	line-height: 60px;
}
.ed-back{
	margin-left: 20px;

}
.ed-back i{
	margin-right: 10px;
}
.close{
  display: inline-block;
  height: 48px;
  width: 48px;
  background: url(../../../static/img/h-close.png) no-repeat;
  position: absolute;
  right: 78px;
  bottom: 58px;
}
.mask .ed-addPage{
  width: 239px;
}

.step-1 .tip{
  width: 589px;
  height: 127px;
  background: url(../../../static/img/tip-1.png) no-repeat;
  position: absolute;
  left: 144px;
  bottom: 106px;
}
.step-2 .tip{
  width: 512px;
  height: 254px;
  background: url(../../../static/img/tip-2.png) no-repeat;
  position: absolute;
  left: 50%;
  margin-left: -56px;
  top: 337px;
}
.step-3 .tip{
  width: 480px;
  height: 208px;
  background: url(../../../static/img/tip-3.png) no-repeat;
  position: absolute;
  left: 50%;
  top: 100px;
  margin-left: -390px;
}
.step-4 .tip{
  width: 365px;
  height: 264px;
  background: url(../../../static/img/tip-4.png) no-repeat;
  position: absolute;
  left: 50%;
  top: 100px;
  margin-left: -215px;
}
.tip a{
  display: inline-block;
  width: 125px;
  height: 53px;
  border-radius: 53px;
  position: absolute;
}
.step-1 .tip .prev{
  left: 238px;
  top: 46px;
}
.step-1 .tip .next{
  left: 463px;
  top: 46px;
}
.step-2 .tip .prev{
  left: 0;
  bottom: 0;
}
.step-2 .tip .next{
  left: 224px;
  bottom: 0;
}
.step-3 .tip .prev{
  left: 0;
  bottom: 0;
}
.step-3 .tip .next{
  left: 224px;
  bottom: 0;
}
.step-3 .top-mad{
  background: #fff;
  width: 100px;
  margin-left: -50px;
}
.step-4 .tip .start{
  left: 120px;
  bottom: 0;
}
.step-4 .top-mad{
  background: #fff;
  width: 100px;
}
.disabled{
  width: 300px;
  height: 100%;
  position: fixed;
  z-index: 1000002;
  top: 0;
  right: 0;
  background: transparent;
}
.preview_dialog{
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0,0,0,0.5);
  top: 0;
  left: 0;
  z-index: 9999;
}
.dialog_phone{
  width: 426px;
  height: 768px;
  position: relative;
  top: 50%;
  left: 50%;
  margin-top: -384px;
  margin-left: -213px;
  background:url(../../../static/img/iphone.png) center no-repeat;
}
.dialog_content{
  position: absolute;
  width: 375px;
  height: 600px;
  left: 50%;
  top: 67px;
  margin-left:-187px;
  background: #fff;
}
iframe{
  height: 100%;
  width: 100%;
}
.checkTpl_dialog{
  position: fixed;
  width: 1000px;
  top:50%;
  left:50%;
  background-color: #FFFFFF;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index:1999;
}
</style>
