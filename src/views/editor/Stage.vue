<template>
  <div class="phone-box dis-flex" @contextmenu.prevent="contextmenuBlank($event)">
    <div class="phone-box-tit" :style="{'background-color':phoneBoxTitStyle.navigationBarBackgroundColor,'color':phoneBoxTitStyle.navigationBarTextStyle}">
    	{{phoneBoxTitStyle.title}}
    </div>
    <div class="stage dis-flex-1" :class="exclusiveGoods" :style="{'padding-bottom':offsetHeight+'px'}">
      <v-scrollbar ref="barStage" >
        <draggable class="list-group srcoll" element="div" v-model="Coms" @start="isDragging=true" @end="dragend" v-if="Coms.length>0">
            <div :class="{selected:cindex==index}" v-for="(item,index) in Coms" @click="handler(index,item)" @contextmenu.prevent.stop="contextmenu(index,item,$event,item.com)" class="vd-component" v-if="item.com!='GoodsBottomBar' && item.com!='nav' && item.com!='kefu' && item.com!='distribution' && item.com!='fournav' && item.com!='posted'&&item.com!='help'">
              <div class="a1 vd-box-sizing" style="position:absolute;width:100%;height:100%;z-index:111;top:0;left:0;" :class="{selected1:cindex==index}" v-if= "item.com!='freePanel'"></div>
              <div v-if="item.com =='freePanel'&&item.children.length==0" class="freePanelTips">自由面板</div>
              <container :item="item" :index="index" :curPage="curPage"></container>
            </div>
        </draggable>
      </v-scrollbar>

      <div class="GoodsBottomBarCss" v-for="(item,index) in Coms"  v-if="exclusiveGoods && item.com=='GoodsBottomBar'">
        <div :class="{selected:cindex==index}" style="height:51px"  @click="handler(index,item)" @contextmenu.prevent.stop="contextmenu(index,item,$event,item.com)" class="vd-component">
          <div class="a1 vd-box-sizing" style="position:absolute;width:100%;height:100%;z-index:111;top:0;left:0;" :class="{selected1:cindex==index}"></div>
          <container :item="item" :index="index"></container>
        </div>
      </div>

      <div class="navCss" :class="item.items.fixed" v-for="(item,index) in Coms" v-if="item.com=='nav'">
        <div :class="{selected:cindex==index}" @click="handler(index,item)" @contextmenu.prevent.stop="contextmenu(index,item,$event,item.com)" class="vd-component">
          <div class="a1 vd-box-sizing" style="position:absolute;width:100%;height:100%;z-index:111;top:0;left:0;" :class="{selected1:cindex==index}"></div>
          <container :item="item" :index="index"></container>
        </div>
      </div>

      <div class="kefuCss">
        <div :class="{selected:cindex==index}" v-for="(item,index) in Coms" @click="handler(index,item)"  @contextmenu.prevent.stop="contextmenu(index,item,$event,item.com)" class="vd-component" v-if="item.com=='kefu'">
          <div class="a1 vd-box-sizing" style="position:absolute;width:100%;height:100%;z-index:111;top:0;left:0;" :class="{selected1:cindex==index}"></div>
          <container :item="item" :index="index"></container>
        </div>
      </div>
      <!--北分客服组件-->
      <div class="helpCss">
        <div :class="{selected:cindex==index}" v-for="(item,index) in Coms" @click="handler(index,item)"  @contextmenu.prevent.stop="contextmenu(index,item,$event,item.com)" class="vd-component" v-if="item.com=='help'">
          <div class="a1 vd-box-sizing" style="position:absolute;width:100%;height:100%;z-index:111;top:0;left:0;" :class="{selected1:cindex==index}"></div>
          <container :item="item" :index="index"></container>
        </div>
      </div>

      <div class="postedCss">
        <div :class="{selected:cindex==index}" v-for="(item,index) in Coms" class="vd-component" v-if="item.com=='posted'">
          <div class="a1 vd-box-sizing" style="position:absolute;width:100%;height:100%;z-index:111;top:0;left:0;" :class="{selected1:cindex==index}"></div>
           <container :item="item" :index="index"></container>
        </div>
      </div>

      <div class="distributionCss">
        <div :class="{selected:cindex==index}" v-for="(item,index) in Coms" @click="handler(index,item)" class="vd-component" v-if="item.com=='distribution'">
          <div class="a1 vd-box-sizing" style="position:absolute;width:100%;height:100%;z-index:111;top:0;left:0;bottom: 10px;" :class="{selected1:cindex==index}"></div>
          <container :item="item" :index="index"></container>
        </div>
      </div>


      <div class="fournavCss" :class="item.items.fixed" v-for="(item,index) in Coms" v-if="item.com=='fournav'">
        <div :class="{selected:cindex==index}" @click="handler(index,item)"  class="vd-component">
          <div class="a1 vd-box-sizing" style="position:absolute;width:100%;height:100%;z-index:111;top:0;left:0;" :class="{selected1:cindex==index}"></div>
          <container :item="item" :index="index"></container>
        </div>
      </div>

    </div>



    <div class="handler" :class="showModal?'borderW':''" v-show="!showModal && !hideHandler">
      <a class="add" href="javascript:void(0)" @click="add"><i class="el-icon-plus vd-icon"></i><span>新增</span></a>
      <a class="exchange" href="javascript:void(0)" @click="exchange"><i class="el-icon-edit vd-icon"></i><span>替换</span></a>
      <!-- <a class="up" href="javascript:void(0)" @click="move('up')"><i class="el-icon-arrow-up vd-icon"></i><span>上移</span></a>
      <a class="down" href="javascript:void(0)" @click="move('down')"><i class="el-icon-arrow-down vd-icon"></i><span>下移</span></a> -->
      <!-- <a class="top" href="javascript:void(0)" @click="move('top')"><i class="el-icon-caret-top vd-icon"></i><span>置顶</span></a>
      <a class="bottom" href="javascript:void(0)" @click="move('bottom')"><i class="el-icon-caret-bottom vd-icon"></i><span>置底</span></a> -->
    </div>

    <div class="contextmenu" v-show="showContextmenu" :style="{top:offsetY+'px',left:offsetX+'px'}">
      <a href="javascript:void(0);" class="copy" @click="copy" >复制</a>
      <a href="javascript:void(0);" class="past" @click="past">粘贴</a>
    </div>



  </div>
</template>
<script type="text/javascript">
  import container from './components/container'
  import draggable from 'vuedraggable'
  import vScrollbar from '../../vue2-custom-scrollbar/vue2-custom-scrollbar.vue'
  export default{
    data () {
      return {
        editable: true,
        isDragging: false,
        delayedDragging: false,
        offsetHeight: 0,
        offsetX: 0,
        offsetY: 0,
        phoneOffsetTop: 0,
        tempData: null,   //临时数据,
        triggerCopy: false,
        isBlank: false
      }
    },
    components: {
      container: container,
      draggable: draggable,
      vScrollbar: vScrollbar
    },
    computed: {
      cityIdentify (){
        return  this.$store.state.cityIdentify　//cloud_shop指北分
      },
      Coms: {
        get () {
          return this.$store.state.Coms
        },
        set (value) {
          this.$store.commit('sort', value)
        }
      },
      exclusiveGoods(){
        return this.$store.state.pageName.indexOf('goods')!=-1||this.$store.state.pageName.indexOf('signGoods')!=-1?'exclusiveGoods':''
      },
      cindex () {     //当前组件的key
        return this.$store.state.cindex
      },
      showModal () {
        return this.$store.state.showModal
      },
      curPage(){
        this.offsetHeight = 0
        return this.$store.state.curPage
      },
      phoneBoxTitStyle () {
        var curPage = parseInt(this.$store.state.curPage)
        if(this.$store.state.newApps.length>0){
          return  this.$store.state.newApps[curPage]
        }else{
          return ''
        }
      },
      showContextmenu () {
//        if(this.cityIdentify=="cloud_shop"&&this.curPage!=0){
//          return this.$store.state.showContextmenu = false    // 首页可复制
//        }else{
//          return this.$store.state.showContextmenu
//        }
        return this.$store.state.showContextmenu
      },
      hideHandler () {
        return this.$store.state.hideHandler
      }
    },
    watch:{

    },
    methods: {
      add: function () {
        this.$store.commit('add')
      },
      exchange: function () {
        this.$store.commit('exchange',{obj:this})
      },
      move: function (direction) {
        if (this.$store.state.selected) {
          this.$store.commit('move', direction)
        } else {
          alert('请选择要移动的组件')
        }
      },
      dragend (drag) {
        this.isDragging = false
        if (this.$store.state.selected) {
          this.$store.commit('changeSelected', drag.newIndex)
        }
      },
      handler (index, item,e) {
        var data = {index: index, item: item}
        if($('.border-dashed').length>0){
          $('.border-dashed').removeClass('border-dashed')
          $('.freePanelClose').remove()
        }
        this.$store.commit('selected', data)
        this.$store.commit('changeContextmenu', false)
      },
      contextmenu (index, item, e,name) {
        if(this.$store.state.pageName=="goods"||this.$store.state.pageName=="personCenter"||this.hasCom(name) || this.$store.state.pageName=="community" || this.$store.state.pageName=="shopcart" ||this.$store.state.pageName=="personal"){
          return
        }
        this.isBlank = false
        this.offsetY = e.pageY-this.phoneOffsetTop
        this.offsetX = e.offsetX
        this.$store.commit('changeContextmenu', true)
        this.tempData = item
      },
      contextmenuBlank (e){
        this.isBlank = true
        if(this.$store.state.pageName=="goods"||this.$store.state.pageName=="personCenter"||this.hasCom(name) || this.$store.state.pageName=="community"){
          return
        }
        this.offsetY = e.pageY-this.phoneOffsetTop
        this.offsetX = e.offsetX
        if(this.triggerCopy && this.tempData!==null){
          this.$store.commit('changeContextmenu', true)
        }
      },
      hasCom(name){ //管理组件库
        var moduleList = this.$store.state.moduleList
        if(!moduleList){
          return
        }
        for(var i in moduleList){
          if (moduleList[i].moduleCom == name){
             return
          }
        }
        return 1
      },
      copy () {
        if(this.isBlank){
          this.$message({
            message: '复制失败',
            type: 'info'
          })
          return
        }
        this.$store.commit('copy',this.tempData)
        this.triggerCopy = true
        this.$message({
          message: '复制成功',
          type: 'success'
        })
      },
      past () {
        var copyData = this.$store.state.copyData
        if(!copyData){
          this.$message({
            message: '请先复制组件',
            type: 'warning'
          })
        }else{
          this.$store.commit('past')
          this.$message({
            message: '粘贴成功',
            type: 'success'
          })
        }
      }
    },
    mounted () {
      var _this = this
      setTimeout(function(){
        _this.$refs.barStage.reCalcu()
      },500)
      this.phoneOffsetTop = document.querySelector(".phone-box").offsetTop
    },
    updated () {
      var that = this
      //this.offsetHeight = 0
      this.Coms.forEach(function(item,idx){
        if(item.com=='nav'){
          that.offsetHeight = document.querySelector('.navCss').offsetHeight
        }
        if(item.com=='fournav'){
          that.offsetHeight = document.querySelector('.fournavCss').offsetHeight
        }
        if(item.com=='GoodsBottomBar'){
          that.offsetHeight = document.querySelector('.GoodsBottomBarCss').offsetHeight
        }
      })
    }
  }
</script>
<style scoped>


.phone-box{
  width: 377px;
  height: 667px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -310px 0 0 -187px;
  box-shadow: #666 0px 0px 10px;
  z-index: 1000;
  flex-direction: column;
}
@media screen and (max-height: 720px) {
    .phone-box {
        height: 500px;
        margin-top: -220px;
    }
}
.phone-box-tit{
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  background-color:#fff;
}
.stage{
  position: relative;
  z-index: 9999;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.handler{
  position: absolute;
  width: 40px;
  left: 50%;
  margin-left: 200px;
  top: 0;
}
.handler a{
  display: inline-block;
  width: 32px;
  height: 64px;
  text-align: center;
  line-height: 32px;
  text-decoration: none;
	padding-bottom: 10px;
}
.handler a i{
	width: 32px;
	height: 32px;
	border:solid 1px #888;
  border-radius: 50%;
  line-height: 32px;
}
.handler a i:before{
  color: #666!important;
}
.handler a span{
	display:block;
}
.flip-list-move {
  /* transition: transform 0.5s; */
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.selected{
  border: 1px solid #18ccc0;
  box-sizing:content-box;
}


.wx-video{
  width: 100% !important;
}
.exclusiveGoods{
  position: relative;
  height: 100%;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  padding-bottom:53px;
}
.vd-component{
  position: relative;
  bottom: 0;
}
.GoodsBottomBarCss{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height:51px;
}
.borderW a i.vd-icon{
  border-color:#fff!important;
  color: #fff!important;
}
.borderW a i.vd-icon:before{
  color: #fff!important;
}
.borderW a{
  color: #fff!important;
}
.navCss{
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 999;
}
.navCss.top{
  top: 0;
}
.navCss.bottom{
  bottom: 0;
}
.fournavCss{
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 999;
}
.fournavCss.top{
  top: 0;
}
.fournavCss.bottom{
  bottom: 0;
}
.kefuCss{
  position: absolute;
  right: 20px;
  bottom: 100px;
  z-index: 999;
}
.helpCss{
  position: absolute;
  right: 0px;
  bottom: 125px;
  z-index: 999;
}
.postedCss{
  margin-bottom:6.2px;
  position: absolute;
  right: 20px;
  bottom: 75px;
  z-index: 999;
}
.distributionCss{
  position: absolute;
  right: 0;
  bottom: 66px;
  z-index: 111;
  margin-bottom: 10px;
}
.freePanelTips{
  position: absolute;
  top:50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 26px;
}
.contextmenu{
  position: absolute;
  width: 100px;
  box-shadow: 0 0 20px rgba(0,0,0,.6);
  border: 1px solid #eee;
  background-color: #fff;
  z-index: 9999;
  border-radius: 3px;
}
.contextmenu a{
  display: block;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: #000;
}
.contextmenu a:hover{
  background: #18ccc0;
  color: #fff;
}
</style>
