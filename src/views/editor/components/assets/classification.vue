<template>
  <wx-view class="classify">
    <wx-scroll-view :scroll-x="true" class="navs" :style="'background:'+bgColor" v-if="tshow.show == 1">
      <wx-view class="item-box" :style="'padding-top:'+pt+'px;'">
        <wx-view class="nav" v-for="(item, index) in tshow.tabIds" :key="item.cId" @click="handler(item.cId,index)">
          <wx-view v-if="active==index" class="_item">
            <wx-image v-if="tshow.showIcon==1" :src="item.coverImg" class="nav-icon" :style="'width:'+tshow.iconSize+'px;height:'+tshow.iconSize+'px;margin-bottom:'+tshow.spacing+'px;'"/>
            <wx-text class="text" :style="'margin-left:'+ marginlr +'px;margin-right:'+ marginlr +'px;fontSize:' + fontSize + 'px;color:'+activeColor+';padding-bottom:'+pb+'px;border-bottom-color:'+activeColor">{{item.name}}</wx-text>
          </wx-view>
          <wx-view v-else class="_item">
            <wx-image v-if="tshow.showIcon==1" :src="item.coverImg" class="nav-icon" :style="'width:'+tshow.iconSize+'px;height:'+tshow.iconSize+'px;margin-bottom:'+tshow.spacing+'px;'"/>
            <wx-text class="text" :style="'margin-left:'+ marginlr +'px;margin-right:'+ marginlr +'px;fontSize:' + fontSize + 'px;color:'+color+';padding-bottom:'+pb+'px'">{{item.name}}</wx-text>
          </wx-view>
        </wx-view>

      </wx-view>
    </wx-scroll-view>

    <wx-view class="lists" v-if="lists!=null && model.type==1">
      <wx-view v-for="(item, index) in lists" :key="index" class="items">
        <wx-view v-if="item.style&&item.status"  class="item" v-on:click.native="itemTapHandler(item.id)">
          <wx-image class="img" mode="aspectFill" :src="item.cover"/>
          <wx-text class="title">{{item.title}}</wx-text>
          <wx-view class="info">
            <wx-text class="date">{{item.createTime}}</wx-text>
            <wx-view><wx-image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png"/>{{item.readerNum}}</wx-view>
          </wx-view>
        </wx-view>
        <wx-view v-else="item.status" class="sitem" v-on:click.native="itemTapHandler(item.id)">
          <wx-view class="item-media">
            <wx-image class="img" mode="aspectFill" :src="item.cover"/>
          </wx-view>
          <wx-view class="item-main">
            <wx-view class="item-desc" style="width:100%">
                {{item.title}}
            </wx-view>
            <wx-view class="item-title-row">
              <wx-view class="item-title">{{item.createTime}}</wx-view>
              <wx-view class="item-after"><wx-image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png"/>{{item.readerNum}}</wx-view>
            </wx-view>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-view>

    <wx-scroll-view :scroll-x="true" v-if="lists!=null && model.type==2" class="uploadWrap">
       <wx-view class="upload_Item" v-for="(item, index) in lists" :key="item.gg"  v-on:click.native="itemTapHandler(item.id)" :style="'width:'+model.width+'px;'">
         <wx-image class="img" mode="aspectFill" :src="item.cover" :style="'height:'+model.height+'px;'"/>
         <wx-text class="title">{{item.title}}</wx-text>
       </wx-view>
    </wx-scroll-view>

    <wx-view v-if="lists==null" class="lists">
      <wx-view class="nolists">暂无数据</wx-view>
    </wx-view>
  </wx-view>
</template>
<script>
let _Classify = {
  editorConfig: {
    model:{
      label: '布局',
      type: 'Object',
      value: {
        type: 1,
        width: 200,
        height: 105
      },
      director : 'radioModel'
    },
    tshow: {
      label :'分类导航显示状态',
      type: 'Object',
      value:{
        show: 1,
        cId: 1,
        showIcon: 0,
        iconSize: 40,
        spacing: 0,
        tabIds:[]
      },
      director: 'tuwen'
    },
    bgColor: {
      el: ['text', 'color'],
      label: '背景色',
      type: 'String',
      value: '#fff',
      director : 'ColorPicker'
    },
    color: {
      el: ['text', 'color'],
      label: '文本初始颜色',
      type: 'String',
      value: '#3a3a3a',
      director : 'ColorPicker'
    },
    activeColor: {
      el: ['text', 'color'],
      label: '文本选中颜色',
      type: 'String',
      value: '#38adff',
      director : 'ColorPicker'
    },
    fontSize: {
      el: ['number'],
      label: '文字大小',
      type: 'Number',
      value: '14',
      director: 'Fsize'
    },
    pt: {
      el: ['number'],
      label: '分类栏顶部间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    marginlr:{
      el: ['number'],
      label: '分类栏左右间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    pb: {
      el: ['number'],
      label: '分类栏底部间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    }
  },
  comName:"图文",
  props: {
    model:{
      default:function(){
        return {
          type:1,
          width:200,
          height: 105
        }
      },
      type:Object
    },
    bgColor: {
      default: '#fff',
      type: String
    },
    color: {
      default: '#3a3a3a',
      type: String
    },
    activeColor: {
      default: '#38adff',
      type: String
    },
    fontSize: {
      default: '14',
      type:String
    },
    pt: {
      default: '10',
      type:String
    },
    pb: {
      default: '10',
      type:String
    },
    marginlr: {
      default: '10',
      type:String
    },
    tshow:{
      default:function(){
        return {
          show:1,
          cId:1,
          showIcon: 0,
          iconSize: 40,
          spacing: 0,
          tabIds:[]
        }
      },
      type:Object
    }
  },
  data () {
    return {
      items: [],
      active: 0,
      lists: [],
      catCid:null    //切换栏目要用到
    }
  },
  onLoad () {
    var that = this
    wx.request({
        url: this.$root.apiServer+ this.$root.appid +'/basic/api/imagetext/category/get',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success (res) {
         if(res.statusCode==200 && res.data.categorys.length){
            var result = res.data.categorys
            var resArr = []
            result.forEach(function(item,idx){
              resArr.push({cId:item.cId,name:item.name,coverImg:item.coverImg})
            })
            that.items = resArr
            that.catCid = resArr[0].cId
            if(that.tshow.show){
              if(that.tshow.tabIds.length==0){
                  that.handler(that.catCid,0)
              }else{
                  that.handler(that.tshow.tabIds[0].cId,0)
              }

            }else{
              that.handler(that.tshow.cId,0)
            }

            // that.handler(typeof that.tshow.cId !='object'&&that.tshow.cId&&cids.indexOf(that.tshow.cId)!==-1?that.tshow.cId:res.data.categorys[0].cId,0)
            // that.isFirst = false
            if(that.tshow.tabIds.length==0){
              that.tshow.tabIds=that.items
            }
          }

        }
    })
  },
  methods: {
    handler (cid,index) {
      this.active = index
      var that = this
      wx.request({
          url: this.$root.apiServer+ this.$root.appid +'/basic/api/imagetext/select/categoryid',
          method: 'POST',
          data: {
            cId: cid
          },
          header: {
              'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            that.lists = res.data.imageTextList
          }
      })
    },
    itemTapHandler(id){
      wx.navigateTo({
          url: '../graphic/graphic' + '?id=' + id
      })
    }
  },
  watch:{
    tshow(e){
      if(e.show !=1){
        this.handler(e.cId,0)
      }else{
        // this.handler(this.catCid,0)
        // this.handler(this.tshow.tabIds[0].cId,0)
        if(this.tshow.tabIds.length==0){
          this.handler(this.catCid,0)
        }else{
          this.handler(this.tshow.tabIds[0].cId,0)
        }
      }
    }
  }
}
export default ((obj) => {
  let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
  obj.methods = obj.methods || {}
  Object.keys(obj || {}).forEach(name => {
    if (lifeCycles.indexOf(name) > -1) {
      obj.methods[name] = obj[name]
    }
  })
  obj.methods['onLoad'] = function (...args) {
    wx.setNavigationBarTitle(obj.config && {
      title: obj.config.navigationBarTitleText
    })
    obj['onLoad'] && obj['onLoad'].apply(this, args)
  }
  return obj
})(_Classify)
</script>
<style scoped>
.classify{
  background: #fff;
  padding-bottom: 1px;
}
.nav{
  display: inline-block;
}
._item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-icon{
  vertical-align: top;
  width: 40px;
  height: 40px;
  margin-bottom: 0;
}
.text{
  display: inline-block;
  padding: 0 10px;
  border-bottom: 4px solid transparent;
  margin: 0 9px;
  box-sizing: border-box;
}
.item-box{
    white-space: nowrap;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
}
.info{
  display: flex;
  justify-content:space-between;
  font-size: 12px;
  color: #999;
  padding:0 3px;
}
.icon{
  font-size:12px;
  color:#999;
  width: 15px;
  height: 12px;
  margin-right: 3px;
}
.nolists{
  padding: 30px;
  background: #fff;
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
}
.sitem,.item-main,.item-title-row{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.sitem,.item-main,.item-title-row .item-title{
  font-size:12px;
  color:#999;
}
.sitem{
  background-color:#fff;
  position:relative;
  padding:15px 0;
}
.sitem .img{
  width:90px;
  height:90px;
  background-color:#f2f5f6;
}
.item-media+.item-main {
    margin-left:10px;
}
.item-main{
  height:90px;
  flex-direction:column;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.item-title-row{
  position:relative;
  bottom:6px;
  width:100%;
}
.item-desc {
  position:relative;
  top:6px;
  font-size:16px;
  color: #333;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  letter-spacing: 0.62px;
  max-height: 42px;
}

.uploadWrap{
  width:100%;
  white-space:nowrap;
  padding-left: 10px;
  box-sizing: border-box;
}
.upload_Item{
   width:200px;
   margin-right: 10px;
   display: inline-block;
   overflow: hidden;
   vertical-align: top;
 }
.uploadWrap .img{
  width: 100%;
  height: 105px;
}
.uploadWrap .title{
  padding-left:3px;
  font-size: 16px;
  color: #333;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}
.classify .lists{
  padding:0 15px;
}
.classify .uploadWrap{
  padding-top: 10px;
}
.uploadWrap .upload_Item{
  padding-bottom: 5px;
}
.lists .items{
  border-bottom: #efeff4 1px solid;
}
.lists .items:last-child{
  border-bottom: 0;
}
.lists .items .item{
  padding:15px 0;
  background: #fff;
}
.lists .items .item .title{
  font-size: 16px;
  color: #333;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin: 12px 0;
  padding:0 3px;
}
.lists .items .item .img{
  width: 100%;
  height: 170px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
