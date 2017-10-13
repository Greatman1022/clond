<template>
  <div class="components vd-box-sizing">
    <div class="tabs">
      <span :class="{on:curTab==0}" @click="changeTab(0)">通用</span>
      <span :class="{on:curTab==1}" @click="changeTab(1)" v-if="advancedCpt&&advancedCpt.length>0">高级</span>
    </div>
    <div class="vd-el-tabs__content vd-box-sizing">
      <!-- 高级组件 -->
      <div class="components-1" v-show="curTab==1">
        <ul>
          <li v-for="(item,index) in advancedCpt" :class="{active:active2==index}" :key="index" :index="index" @click="changeCom(index,item)" @dblclick="sure(index,item,$event)" :data-type="item" v-if="item!='prolists'&&item!='goodslistnew'"></li>
        </ul>
      </div>
      <!-- 通用组件 -->
      <div class="components-2" v-show="curTab==0">
        <div class="section" v-for="(obj,key,index) in Coms" :key="index" v-if="obj.data.length>0 && obj.hidden.indexOf(cityIdentify) < 0">
          <h3 v-if="(key === 'test' && userInfo.data.role === 'ROLE_TEST' || userInfo.data.role === 'ROLE_UI' || userInfo.data.role === 'ROLE_APPUI' || userInfo.data.role === 'ROLE_ADMIN') || key !== 'test'">{{obj.name}}</h3>
          <ul v-if="(key === 'test' && userInfo.data.role === 'ROLE_TEST' || userInfo.data.role === 'ROLE_UI' || userInfo.data.role === 'ROLE_APPUI' || userInfo.data.role === 'ROLE_ADMIN') || key !== 'test'">
            <li v-for="(item,index) in obj.data" :class="{active:active1==key+'*'+index}" :key="index" :index="index" @click="changeCom(key+'*'+index,item.com)" @dblclick="sure(key+'*'+index,item.com,$event)" :data-type="item.com" v-if="item.hidden!=cityIdentify">
              <span>{{item.comName}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="compBtnDiv">
      <div class="compBtns">
        <el-button type="primary" @click="sure" class="vd-primary-color">确定</el-button>
        <el-button @click="cancel" class="vd-primary-color">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import '@/assets/jquery-ui.min.css'
export default {
  data () {
    return {
      active1: null,
      active2: null,
      activeCom: null,
      curTab: '0',
      curPanel: 0,
      sampleAppid: this.$root.sampleAppid,
      userInfo: null,
      users: ['huangjun']
    }
  },
  props: {
    index: {
      default: 0,
      type: Number
    }
  },
  computed: {
    Coms () {
      if (this.$store.state.moduleList) {
        return this.hasCom(this.$store.state.cDefault)
      } else {
        return this.$store.state.cDefault
      }
    },

    Coms1: {
      get () {
        return this.$store.state.Coms
      },
      set (value) {
        this.$store.commit('sort', value)
      }
    },
    advancedCpt () {  // 高级组件
      var newApps = this.$store.state.newApps
      var curPage = this.$store.state.curPage
      var advancedCpt = this.$store.state.moduleList ? this.hasCom(newApps[curPage]['advancedCpt']) : newApps[curPage]['advancedCpt']
      var baseSenior = this.$store.state.moduleList ? this.hasCom(this.$store.state.baseSenior) : this.$store.state.baseSenior
      return advancedCpt.concat(baseSenior)
    },
    moduleList () {
      return this.$store.state.moduleList
    },
    cityIdentify () {
      return this.$store.state.cityIdentify
    }
  },
  created () {
    this.userInfo = this.$store.getters.getUserInfo
    console.log(this.userInfo)
  },
  methods: {
    hasCom (source) {
      var sourceCopy = source instanceof Array ? [] : {}
      if (source instanceof Array) {
        source.forEach((item, index) => {
          for (var i in this.moduleList) {
            if (this.moduleList[i].moduleCom == item) {
              sourceCopy.push(item)
            }
          }
        })
      } else {
        Object.keys(source).forEach((key, index) => {
          var arrTwo = []
          for (var n in source[key].data) {
            for (let i in this.moduleList) {
              if (source[key].data[n].com == this.moduleList[i].moduleCom) {
                arrTwo.push(source[key].data[n])
              }
            }
          }
          source[key].data = arrTwo
        })
        sourceCopy = source
      }
      return sourceCopy
    },
    changeCom: function (index, values) {
      if (this.curTab === '0') { // 普通
        this.active1 = index
      }
      if (this.curTab === '1') {
        this.active2 = index
      }
      this.activeCom = values
    },
    changeTab (index) {
      this.active1 = null
      this.active2 = null
      this.activeCom = null
      this.curTab = index
    },
    sure: function (index = '', values = '', e) {
      let isDblclick = !!e   // 是否双击
      if (index != '' && typeof index !== 'object') {
        this.changeCom(index, values)
      }
      var count = 0,count1 = 0
      let Coms = this.$store.state.Coms
      this.Coms1.forEach(function(item,idx){
        if(item.com == 'community'){
          count++
        }
        if(item.com == 'posted'){
          count1++
        }
      })
      // 判断是否添加过通用导航
      if (this.activeCom === 'indexNav') {
        for (let i = 0, len = Coms.length; i < len; i++) {
          let item = Coms[i]
          if (item.com === 'indexNav') {
            this.$message({
              message: '您已经添加过通用导航',
              type: 'warning'
            })
            return
          }
        }
      }
      // 判断是否添加过专用导航
      if (this.activeCom === 'fournav') {
        for (let i = 0, len = Coms.length; i < len; i++) {
          let item = Coms[i]
          if (item.com === 'fournav') {
            this.$message({
              message: '您已经添加过专用导航',
              type: 'warning'
            })
            return
          }
        }
      }

      // 判断是否添加过分销
      if (this.activeCom === 'distribution') {
        for (let i = 0, len = Coms.length; i < len; i++) {
          let item = Coms[i]
          if (item.com === 'distribution') {
            this.$message({
              message: '您已经添加过分销',
              type: 'warning'
            })
            return
          }
        }
      }

      // 判断是否添加过优惠券
      if (this.activeCom === 'Discount') {
        for (let i = 0, len = Coms.length; i < len; i++) {
          let item = Coms[i]
          if (item.com === 'Discount') {
            this.$message({
              message: '您已经添加过优惠券',
              type: 'warning'
            })
            return
          }
        }
      }
      if (this.activeCom === 'nav') {
        for (let i = 0, len = Coms.length; i < len; i++) {
          let item = Coms[i]
          if (item.com === 'nav') {
            this.$message({
              message: '您已经添加过导航',
              type: 'warning'
            })
            return
          }
        }
      }

      var judeAddindex = ''
      if (this.curTab === '0') {
        judeAddindex = this.active1
      }
      if (this.curTab === '1') {
        judeAddindex = this.active2
      }
      var xtype = this.activeCom
      if (xtype) {
        if (this.judeAdd(judeAddindex)) {
          //社区组件添加时，同时添加评论组件
          if(xtype == "community" && count == 0 && count1 == 0){
            var t1 = require('./assets/posted')
            t1 = t1['posted'] ? t1['posted'] : t1
            this.$store.commit('sure',{
              com:'posted',
              editorConfig: t1.editorConfig,
              obj: this,
              isDblclick: isDblclick,
              confirm: false
            })
          }
          var t = require('./assets/' + xtype)
          t = t[xtype] ? t[xtype] : t
          this.$store.commit('sure', {
            com: this.activeCom,
            editorConfig: t.editorConfig,
            obj: this,
            isDblclick: isDblclick,
            confirm: false
          })
        } else {
          this.$confirm('该组件不能添加到自由组件中(PS:目前支持图片和文本组件。点击“确定”会加在该组件后面)', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var t = require('./assets/' + xtype)
            t = t[xtype] ? t[xtype] : t
            this.$store.commit('sure', {
              com: this.activeCom,
              editorConfig: t.editorConfig,
              obj: this,
              isDblclick: isDblclick,
              confirm: true
            })
          })
        }
      } else {
        this.$message({
          message: '请选择您所需的组件来进行添加',
          type: 'warning'
        })
      }
    },
    judeAdd (index) { // 判断该组件是不是能在这模块中添加
      let cindex = this.$store.state.cindex
      if (typeof cindex === 'number' && this.$store.state.Coms[cindex].com == 'freePanel') {
        if (this.curTab === '0') {
          return this.Coms[index.split('*')[0]].data[index.split('*')[1]].specialShow == this.$store.state.Coms[cindex].com
        } else {
          return false
        }
      } else {
        return true
      }
    },
    cancel: function () {
      this.$store.commit('cancel')
    },
    tab: function (tab, event) {
      this.active1 = null,
        this.active2 = null,
        this.activeCom = null
      this.curTab = tab.index
    },
    panel (index) {
      this.curPanel = index
    }
  }
}
</script>
<style scoped>
.tabs {
  display: flex;
  height: 60px;
  border-bottom: 1px solid #cfcfcf;
  box-sizing: border-box;
  background: #ffffff;
}

.tabs span {
  flex: 1;
  height: 100%;
  line-height: 55px;
  text-align: center;
  font-size: 14px;
  color: #333;
  border-top: 5px solid transparent;
  box-sizing: border-box;
  transition: all 0.3s;
  cursor: pointer;
}

.tabs span.on {
  border-top: 5px solid #18ccc0;
}

.tabs span:last-child {
  border-left: 1px solid #cfcfcf;
}

.components {
  height: 100%;padding-bottom:30px;
  overflow: hidden;
}

.components .el-tabs__content {
  overflow-y: auto;
  overflow-x: hidden;
}

.vd-el-tabs__content {
  background: #f1f1f1;
}

.components-1 li {
  display: inline-block;
  font-size: 16px;
  color: #000;
  text-align: center;
  line-height: 100px;
  margin: 10px 0;
  width: 334px;
  -webkit-box-shadow: 0 0 15px 3px rgba(202, 211, 213, 0.6);
  -moz-box-shadow: 0 0 15px 3px rgba(202, 211, 213, 0.6);
  box-shadow: 0 0 15px 3px rgba(202, 211, 213, 0.6);
}

.components-1 {
  height: 100%;
  overflow-y: auto;
}

.components-1 ul {
  padding: 15px 0 15px 15px;
}

.components ul {
  font-size: 0;
  text-align: left;
}

.components-2 {
  height: 100%;
  overflow-y: auto;
  padding-top: 30px;
}

.components-2 ul {
  padding: 5px 0;
}

.components-2 .section {
  margin: 0 18px;
}

.components-2 li {
  display: inline-block;
  font-size: 16px;
  color: #000;
  text-align: center;
  width: 25%;
  height: 82px;
  vertical-align: top;
  margin-bottom: 10px;
  cursor: pointer;
}

.components-2 li.active {
  background: #fff;
}

.components-2 li:hover {
  background: #fff;
}

.components-2 li:before {
  content: "";
  width: 28px;
  height: 28px;
  display: block;
  margin: 15px auto 8px;
}

.components-2 li:after,
.components-2 li span {
  font-size: 14px;
  color: #666;
  display: block;
  height: 25px;
  line-height: 25px;
}

.section h3 {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #666;
  border-top: 1px solid #aaa;

  cursor: pointer;
}

.section h3:before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  vertical-align: top;
  background: url(../../../../static/img/arrow.png) center no-repeat;
  margin-left: 4px;
  margin-right: 9px;
  margin-top: 11px;
  transition: all 0.3s;
}

.section h3.on:before {
  transform: rotate(90deg);
}

.components li[data-type="text"]:before {
  background: url(../../../../static/img/icon-text.png) center no-repeat;
}

.components li[data-type="video"]:before {
  background: url(../../../../static/img/icon-video.png) center no-repeat;
}

.components li[data-type="picture"]:before {
  background: url(../../../../static/img/icon-picture.png) center no-repeat;
}

.components li[data-type="slider"]:before {
  background: url(../../../../static/img/icon-swiper.png) center no-repeat;
}

.components li[data-type="specialSlider"]:before {
  background: url(../../../../static/img/icon-swiper.png) center no-repeat;
}

.components li[data-type="kefu"]:before {
  background: url(../../../../static/img/icon-kefu.png) center no-repeat;
}

.components li[data-type="classification"]:before {
  background: url(../../../../static/img/icon-list.png) center no-repeat;
}

.components li[data-type="swiperpic"]:before {
  background: url(../../../../static/img/icon-snav.png) center no-repeat;
}

.components li[data-type="nav"]:before {
  background: url(../../../../static/img/icon-nav.png) no-repeat;
}

.components-2 li[data-type="prolists"]:before {
  background: url(../../../../static/img/icon-glist.png) center no-repeat;
}

.components-2 li[data-type="newProlists"]:before {
  background: url(../../../../static/img/icon-glist.png) center no-repeat;
}



/************************** 北分 通用组件图标 ******************************/

.components-2 li[data-type="goodslistnew"]:before {
  background: url(../../../../static/img/icon-glist.png) center no-repeat;
}
.components li[data-type="help"]:before {
  background: url(../../../../static/img/icon-kefu.png) center no-repeat;
}
.components li[data-type="searchBox"]:before {
  background: url(../../../../static/img/search.png) center no-repeat;
}
.components li[data-type="indexNav"]:before {
  background: url(../../../../static/img/icon-nav.png) no-repeat;
}
/*.components-2 li[data-type="newProlists2"]:before {
  background: url(../../../../static/img/icon-glist.png) center no-repeat;
}
.components li[data-type="merchant"]:before {
  background: url(../../../../static/img/StoreInfo.png) no-repeat;
}*/

/*侧边导航商品列表图标*/

.components-2 li[data-type="prolistsSide"]:before {
  background: url(../../../../static/img/icon-glist-2.png) center no-repeat;
}

.components-2 li[data-type="bespeak"]:before {
  background: url(../../../../static/img/icon-yuyue.png) center no-repeat;
}

.components li[data-type="makeCall"]:before {
  background: url(../../../../static/img/icon-call.png) center no-repeat;
}

.components li[data-type="setMap"]:before {
  background: url(../../../../static/img/icon-map.png) center no-repeat;
}

.components li[data-type="search"]:before {
  background: url(../../../../static/img/search.png) center no-repeat;
}


.components li[data-type="GoodsPriceBar"] {
  height: 92px;
  background: url(../../../../static/img/prod-goods.png) no-repeat;
}

.components li[data-type="GoodsBottomBar"] {
  height: 92px;
  background: url(../../../../static/img/prod-goodsbottombar.png) no-repeat;
}

.components-1 li[data-type="prolists"] {
  height: 230px;
  background: url(../../../../static/img/prod-prolists.png) no-repeat;
}

.components li[data-type="GoodsInfo"] {
  height: 147px;
  background: url(../../../../static/img/prod-goodsinfo.png) no-repeat;
}

.components li[data-type="GoodsSlider"] {
  height: 213px;
  background: url(../../../../static/img/prod-slider.png) no-repeat;
}

.components li[data-type="freePanel"] {
  height: 289px;
  background: url(../../../../static/img/prod-freePanel.png) no-repeat;
}
/* 美业组件 */
.components li[data-type="builderinfo"]:before {
  background: url(../../../../static/img/prod-builderinfo.png) no-repeat;
}
.components li[data-type="StoreInfo"]:before {
  background: url(../../../../static/img/StoreInfo.png) no-repeat;
}
.components li[data-type="goodsedit"]:before {
  background: url(../../../../static/img/goodsedit.png) no-repeat;
}
.components li[data-type="Servicemore"]:before {
  background: url(../../../../static/img/Servicemore.png) no-repeat;
}
.components li[data-type="community"]:before {
  background: url(../../../../static/img/community.png) no-repeat;
}

/****************************北分首页组件***********************************/

.components li[data-type="SliderBar"] {
  height: 200px;
  background: url(../../../../static/img/slider_bar.png) no-repeat;
}

/*.components li[data-type="indexNav"] {*/
  /*height: 92px;*/
  /*background: url(../../../../static/img/index_nav.png) no-repeat;*/
/*}*/

.components li[data-type="pinmiao"]{
  height: 154px;
  background: url(../../../../static/img/pin_miao.png) no-repeat;
}

.components li[data-type="head"] {
  height: 190px;
  background: url(../../../../static/img/head.png) no-repeat;
}

.components li[data-type="sliderSearch"] {
  height: 247px;
  background: url(../../../../static/img/sliderSearch.png) no-repeat;
}



.components li[data-type="nearshop"] {
  height: 50px;
  background: url(../../../../static/img/prod-nearshop.jpg) no-repeat;
}

.components li[data-type="fournav"] {
  width: 330px;
  height: 100px;
  background: url(../../../../static/img/fournav.png) no-repeat;
}

/*************  添加高级组件隐藏分销和优惠券   **************/
.components li[data-type="Discount"] {
  width: 330px;
  height: 100px;
  background: url(../../../../static/img/Discount.png) no-repeat;
}
.components li[data-type="distribution"] {
  width: 330px;
  height: 100px;
  background: url(../../../../static/img/fenxiao.png) no-repeat;
}

.components-1 li.active {
  -webkit-box-shadow: 0 0 15px 3px rgba(202, 211, 213, 1);
  -moz-box-shadow: 0 0 15px 3px rgba(202, 211, 213, 1);
  box-shadow: 0 0 15px 3px rgba(202, 211, 213, 1);
}

/****************************北分 分类页面组件***********************************/
/*.components li[data-type="searchBox"]{
  width: 330px;
  height: 80px;
  background: pink;
}
.components li[data-type="searchBox"]:after{
  content: '搜索组件';
  text-align: center;
}
.components li[data-type="classlist"]{
  width: 330px;
  height: 120px;
  background: yellowgreen;
}
.components li[data-type="classlist"]:after{
  content: '分类列表组件';
  text-align: center;
}
.components li[data-type="goodslist"]{
  width: 330px;
  height: 150px;
  background: hotpink;
}
.components li[data-type="goodslist"]:after{
  content: '商品列表组件';
  text-align: center;
}*/


.compBtnDiv {
  position: fixed;
  height: 60px;
  width: 365px;
  bottom: 0;
  right: 0;
  background-color: #fff;
}

.compBtns {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.vd-el-tabs__content {
  border-left: 0!important;
  border-right: 0!important;
  height: calc(100% - 60px);
}

.el-tabs--border-card {
  border-top: 0!important;
}

.vd-primary-color {
  background: #18ccc0;
  border: solid 1px #18ccc0;
  color: #fff;
}

.vd-primary-color:hover {
  background: #1be6d8;
  border: solid 1px #1be6d8;
}

.vd-d .is-active {
  color: #18ccc0 !important;
}



/*.components li[data-type="MemberCard"]:after{
  content: "会员卡组件";
  text-align: center;
}
.components li[data-type="ServiceItemsList"]:after{
  content: "服务项目列表组件";
  text-align: center;
}
.components li[data-type="GoodsDetail"]:after{
  content: "商品信息";
  text-align: center;
}*/
</style>
