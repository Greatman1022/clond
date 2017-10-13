<template>
  <wx-view class="order">
    <wx-scroll-view :scroll-x="true" class="navs" :style="'background:'+bgColor" v-if="tshow.show == 1">
      <wx-view class="item-box" :style="'padding-top:'+pt+'px;'">
        <wx-view class="nav" v-for="(item, index) in tshow.tabIds" :key="item.id" @click="handler(item.id,index)">
          <wx-view v-if="active==index" class="_item">
            <wx-image v-if="tshow.showIcon==1" :src="item.fullImage" class="nav-icon" :style="'width:'+tshow.iconSize+'px;height:'+tshow.iconSize+'px;margin-bottom:'+tshow.spacing+'px;'"/>
            <wx-text class="text" :style="'margin-left:'+ marginlr +'px;margin-right:'+ marginlr +'px;font-size:' + fontSize + 'px;color:'+activeColor+';padding-bottom:'+pb+'px;border-bottom-color:'+activeColor">{{item.name}}</wx-text>
          </wx-view>
          <wx-view v-else class="_item">
            <wx-image v-if="tshow.showIcon==1" :src="item.fullImage" class="nav-icon" :style="'width:'+tshow.iconSize+'px;height:'+tshow.iconSize+'px;margin-bottom:'+tshow.spacing+'px;'"/>
            <wx-text class="text" :style="'margin-left:'+ marginlr +'px;margin-right:'+ marginlr +'px;font-size:' + fontSize + 'px;color:'+color+';padding-bottom:'+pb+'px'">{{item.name}}</wx-text>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-scroll-view>
    <wx-view class="lists" v-if="lists.length>0" :class="model=='2'?'lists-two':'lists-one'">
      <wx-view class="sitem" v-for="(item, index) in lists" :key="index">
        <wx-view class="shop">
          <wx-view class="shop_image">
            <wx-image class="img" :src="item.fullCover"  mode="aspectFill"></wx-image>
          </wx-view>
          <wx-view class="shop_intro">
            <wx-view class="shop_name">{{item.title}}</wx-view>
            <wx-view class="shop_time">  {{ filter(item.beginTime)}} 至 {{filter( item.endTime)  }} </wx-view>
            <wx-view class="number">{{item.partQuantity}} 人已申请</wx-view>
          </wx-view>
        </wx-view>
      </wx-view>
      <wx-view class="show_more" v-if="total>2" v-on:click.native="moreTapHandler()">更多
        <wx-image class="turn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAAXNSR0IArs4c6QAAApxJREFUOBGVlc1rU0EUxfOSl1aChUTddFHowixEVBBEFwVJlRApBFpqEAlqvhfixn+iCxfiRsiHycZgjS6s0ERsa2i7sCBuutWFoAtB0KgQS9Ik/m7ISBJfmpeB4c6bOefMeXfe3Kclk8mSxWKZHBsb84VCoa+MR2pW0MfoZ+r1+jpiMh6piYBf07SPrVbrJHEtn8+7RlHQBJzNZqdwsMVwGpF3DofjcjAY/GVGSBxYwuHwZ6vVOgv5C07OVavVUqFQOGxGoO1AAXO5nLtWq23yPInYptPpvBIIBP6odaPYdqAWOIUPOLkE+RtOLlYqlZVisTiu1o1ijwMFSKfTpxEo048wt0qfTyQSdbXeHXscqIVYLLaLCy/PP+lzjJ+Wy2VdrXdHQwcKgJMLuHhNn0BkmZwEyUlDrUs0dKAAONmBOMdzFZFr5CRL7Nn0QAERQmTbZrPJx7YH+Qaukt0iQwVEJBqNbhAWEKlBjiHyQOalmRIQYDweLyEQYLiPyJ1UKnVP5nveRyaGNS7cVYSeIGJrNpszph0oYcgTjNs8SkDT8GwVuD+y+3V2TjOPjrYUiUTemn4FErcIeVmsQ75PTu7KBqYESJgf4nPwdsgPId8WsrShAplMxtdoNF6AHYf8iO8iRmy12cMEsD3Lzqv0Q2Afs/NNyE1FljjwFEjYDMSXHfIzl8t1q58sAoavAPk84DXIcolW3G73osfj2RdCf/vPAeSzkF51yCVuYGAQWcR6BCCfYk6ur5O4YbfbF7i+NQEOav8ESNgJQOv0ozjYJvopcXuDiGq+nQOO6jhHtcWkFNMdrq+Xr+y3Ah0UrVTiachvOuT32PeZJYuwThmXojnFzrtUZC93X+qg6aZD/AT6h67r8/xgvptmdoB/ATo3C+Y5jaOIAAAAAElFTkSuQmCC" alt=""/>
      </wx-view>
    </wx-view>
    <wx-view v-else class="lists">
      <wx-view class="nolists">暂无数据</wx-view>
    </wx-view>
  </wx-view>
</template>
<script>
let _Bespeak= {
  editorConfig: {
    model:{
      label: '布局',
      type: 'Number',
      value:1,
      director : 'switchStyle'
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
      director: 'order'
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
  comName:'预约',
  props: {
    model: {
      default: 1,
      type: Number
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
      total: 0,
      items: [],
      active: 0,
      lists: [],
      catCid:null    //切换栏目要用到
    }
  },
  onLoad () {
    var that = this
    wx.request({
        url: this.$root.apiServer+ this.$root.appid +'/basic/plugin/form/category/list',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success (res) {
          if(res.data.success&&res.data.list.length){
              var result = res.data.list
              var resArr = []
              result.forEach(function(item,idx){
                resArr.push({id:item.id,name:item.name,fullImage:item.fullImage})
              })
              that.items = resArr
              that.catCid = resArr[0].id
            if(that.tshow.show){
              if(that.tshow.tabIds.length==0){
                  that.handler(that.catCid,0)
              }else{
                  that.handler(that.tshow.tabIds[0].id,0)
              }

            }else{
              that.handler(that.tshow.cId,0)
            }

            if(that.tshow.tabIds.length==0){
              that.tshow.tabIds=that.items
            }



          }
        }
    })
  },
  methods: {
     // 相当于使用过滤器的表达式
    filter(value) {
      return value.substring(0,16)
    },
    moreTapHandler(){
      wx.navigateTo({
          url: '../order_list/order_list'
      })
    },
    handler (id,index) {
      this.active = index
      var that = this
      wx.request({
          url: this.$root.apiServer+ this.$root.appid +'/basic/plugin/form/paging',
          method: 'GET',
          data: {
            categoryId: id,
            status: 1,
            pageNum: 1,
            pageSize: 10
          },
          header: {
              'content-type': 'application/json'
          },
          success (res) {
            if(res.data.success && res.data.pagination.list.length){
              that.lists = res.data.pagination.list.filter(item => {
                return item.isOpen
              })
              that.total = that.lists.length
              that.lists = that.lists.splice(0, 2)
            }else{
              that.total = 0
              that.lists = []
            }
          }
      })
    }
  },
  watch:{
    tshow(e){
      if(e.show !=1){
        this.handler(e.cId,0)
      }else{
        // this.handler(this.catCid,0)
        if(this.tshow.tabIds.length==0){
          this.handler(this.catCid,0)
        }else{
          this.handler(this.tshow.tabIds[0].id,0)
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
})(_Bespeak)
</script>
<style scoped lang="scss">
.lists-two{
  display: flex;
  flex-direction: column;
  background: #FFF;
  padding:0 15px;
}
.lists-two .sitem{
  background: #FFFFFF;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
}
.lists-two .sitem:last-child{
  border: 0;
}
.lists-two .img{
  height: 170px;
}
.lists-two .sitem .shop{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lists-two .sitem .shop .shop_image{
  margin: 10px 0;
  width: 100%;
}
.lists-two .sitem .shop .shop_image .img{
  width: 100%;
  border-radius: 6px;
  height: 170px;
}
.lists-two .shop_intro{
  width: 100%;
}
.lists-two .shop_name{
  font-size: 16px;
  color: #333;
  height: 25px;
  line-height: 25px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.lists-two .shop_time{
  color: #999999;
  font-size: 12px;
  height: 16.5px;
  line-height: 16.5px;
  padding: 10px 0;
  display: inline-block;
}
.lists-two .number{
  margin-left:24.5px;
  color: #999999;
  font-size: 12px;
  height: 16.5px;
  line-height: 16.5px;
  padding: 10px 0;
  display: inline-block;
}
.lists-two .show_more{
  text-align: center;
  line-height: 46px;
  position: relative;
  background: #FFFFFF;
}
.lists-two .show_more .turn{
  width: 0.5rem;
  height: 0.9rem;
  margin: 0 0.5rem;
  position: absolute;
  top: 1rem;
}
.lists-one{
  padding:0 15px;
  background: #fff;
}
.lists-one .sitem{display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; -webkit-box-align: center; -ms-flex-align: center; align-items: center;}
.lists-one .sitem { background-color: #fff; position: relative; padding:17px 0;}
.lists-one .sitem:after,
.lists-one .sitem:before { content: " "; position: absolute; left: 0; right: 0; height: 1px; color: #e5e5e5; z-index: 2;}
.lists-one .sitem:after {bottom: 0; border-bottom: 1px solid #e5e5e5; -webkit-transform-origin: 0 100%; transform-origin: 0 100%; -webkit-transform: scaleY(.5); transform: scaleY(.5);}
.lists-one .shop{display: inline-flex;width: 100%;overflow: hidden}/*改*/
.lists-one .shop_image .img{width: 100px;height: 100px;overflow: hidden;}
.lists-one .shop_intro{margin-left: 10px;width: 70%;height:100px; flex-direction: column; -webkit-box-flex: 1; -ms-flex: 1; flex: 1; display: flex; justify-content: space-between; align-items: center;}/*改*/
.lists-one .shop_name{width:100%;text-align:left; line-height: 26px; font-size: 16px; color: #333; text-overflow: ellipsis;  -webkit-line-clamp: 2; overflow: hidden; letter-spacing: .62px; max-height: 42px;white-space: nowrap;}/*改*/
.lists-one .shop_time{width:100%;font-size: 12px; color: #999999; letter-spacing: 0.19px; margin-top: -30px;}
.lists-one .number{width:100%;font-size: 12px; color: #999999;}
.lists-one .show_more{text-align: center;line-height: 46px;position: relative;}
.lists-one .show_more .turn{ width: 0.5rem; height: 0.9rem; margin: 0 0.5rem;position: absolute;top: 1rem;}
.nolists{ padding: 30px; background: #fff; font-size: 15px; text-align: center; margin-bottom: 10px; }
.order{
  background: #efeff4;
  padding-bottom: 1px;
}
.navs{
  margin-bottom: 10px;
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
</style>
