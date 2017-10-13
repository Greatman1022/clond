<template>
 <wx-view>

  <wx-scroll-view :scroll-x="true" class="navs" :style="'background:'+bgColor" v-if="tshow.show == 1">
    <wx-view class="item-box" :style="'padding-top:'+pt+'px;'">
      <wx-view class="nav" v-for="(item, index) in tshow.tabIds" :key="item.id" @click="handler(item.id,index)">
        <wx-view v-if="active==index" class="_item">
          <wx-image v-if="tshow.showIcon==1" :src="'http://image.vdongchina.com/'+item.thumbnail" class="nav-icon" :style="'width:'+tshow.iconSize+'px;height:'+tshow.iconSize+'px;margin-bottom:'+tshow.spacing+'px;'"/>
          <wx-text class="text" :style="'margin-left:'+ marginlr +'px;margin-right:'+ marginlr +'px;fontSize:' + fontSize + 'px;color:'+activeColor+';padding-bottom:'+pb+'px;border-bottom-color:'+activeColor">{{item.name}}</wx-text>
        </wx-view>
        <wx-view v-else class="_item">
          <wx-image v-if="tshow.showIcon==1" :src="'http://image.vdongchina.com/'+item.thumbnail" class="nav-icon" :style="'width:'+tshow.iconSize+'px;height:'+tshow.iconSize+'px;margin-bottom:'+tshow.spacing+'px;'"/>
          <wx-text class="text"  :style="'margin-left:'+ marginlr +'px;margin-right:'+ marginlr +'px;fontSize:' + fontSize + 'px;color:'+color+';padding-bottom:'+pb+'px'">{{item.name}}</wx-text>
        </wx-view>
      </wx-view>
    </wx-view>

  </wx-scroll-view>

  <wx-view class="product-list clear" v-if="model == 1&&products.length>0">
     <wx-view class="product-item" v-for="(item, index) in products" :key="item.gg" >
         <wx-view class="classname rowclass" v-on:click.native="productItem(item.uuid)" >
             <wx-view class="product-img">
             	<wx-image  mode="aspectFill"  class="product-img-image" :src="item.cover==''?item.thumbUrl: 'http://image.vdongchina.com/'+item.cover"  :style="'width:'+ewidth+'px;height:'+eheight+'px;'"/>
             </wx-view>
         </wx-view>
          <wx-view style="width:100%">
                <wx-view class="product-name" :style="'fontSize:'+fontSizeName+'px;fontWeight:'+fontWeightName+';color:'+colorName+';'">{{item.name}}</wx-view>
                <wx-view class="clear product-price">
                    <wx-view class="left main-color" :style="'fontSize:'+fontSizeMark+'px;fontWeight:'+fontWeightMark+';color:'+colorMark+';'">￥<wx-text class="product-price-text" :style="'fontSize:'+fontSizePrice+'px;fontWeight:'+fontWeightPrice+';color:'+colorPrice+';'">{{item.salePrice}}</wx-text></wx-view>
                    <wx-view class="left oldPrice" v-if="item.isShowMarkerPrice">￥{{item.marketPrice}}</wx-view>
                    <wx-view class="right shopcart" @click="addCar(item.uuid)" v-show="shopcartShow.open"><wx-image class="shopImg" :src="shopcartShow.pic"/></wx-view>
                </wx-view>
             </wx-view>
     </wx-view>
  </wx-view>

  <wx-scroll-view :scroll-x="true" v-if="model == 2&&products.length>0" class="uploadWrap">
     <wx-view class="upload_Item" v-for="(item, index) in products" :key="item.gg"  v-on:click.native="productItem(item.uuid)"  :style="'width:'+ewidth+'px;height:'+eheight+'px;'">
       <wx-view class="classname columnclass">
        <wx-image class="upload_Item_img" :src="item.cover==''?item.thumbUrl: 'http://image.vdongchina.com/'+item.cover" mode="aspectFill"/>
       <wx-view class="itemTxt">
         <wx-view class="product-name upload_name" :style="'fontSize:'+fontSizeName+'px;font-weight:'+fontWeightName+';color:'+colorName+';'">{{item.name}}</wx-view>
         <wx-view class="clear product-price">
             <wx-view class="left main-color" :style="'fontSize:'+fontSizeMark+'px;fontWeight:'+fontWeightMark+';color:'+colorMark+';'">￥<wx-text class="product-price-text" :style="'fontSize:'+fontSizePrice+'px;fontWeight:'+fontWeightPrice+';color:'+colorPrice+';'">{{item.salePrice}}</wx-text></wx-view>
             <wx-view class="left oldPrice" v-if="item.isShowMarkerPrice">￥{{item.marketPrice}}</wx-view>
             <wx-view class="right shopcart" @click="addCar(item.uuid)" v-show="shopcartShow.open"><wx-image class="shopImg" :src="shopcartShow.pic"/></wx-view>
         </wx-view>
       </wx-view>

       </wx-view>
     </wx-view>
   </wx-scroll-view>

   <wx-view class="product-list clear" v-if="model == 3&&products.length>0">
      <wx-view class="large" v-for="(item, index) in products" :key="item.gg" >
          <wx-view v-on:click.native="productItem(item.uuid)" >
              <wx-view class="product-img">
              	<wx-image  mode="aspectFill" class="product-img-image" :src="item.cover==''?item.thumbUrl: 'http://image.vdongchina.com/'+item.cover"/>
              </wx-view>
              <wx-view class="product-name" :style="'fontSize:'+fontSizeName+'px;fontWeight:'+fontWeightName+';color:'+colorName+';'">{{item.name}}</wx-view>
              <wx-view class="clear product-price">
                  <wx-view class="left main-color" :style="'fontSize:'+fontSizeMark+'px;fontWeight:'+fontWeightMark+';color:'+colorMark+';'">￥<wx-text class="product-price-text" :style="'fontSize:'+fontSizePrice+'px;fontWeight:'+fontWeightPrice+';color:'+colorPrice+';'">{{item.salePrice}}</wx-text></wx-view>
                  <wx-view class="left oldPrice" v-if="item.isShowMarkerPrice">￥{{item.marketPrice}}</wx-view>
                  <wx-view class="right shopcart" @click="addCar(item.uuid)" v-show="shopcartShow.open"><wx-image class="shopImg" :src="shopcartShow.pic"/></wx-view>
              </wx-view>
          </wx-view>
      </wx-view>
   </wx-view>

   <wx-view class="product-list clear" v-if="model == 4&&products.length>0">
     <wx-view class="small sitem" v-for="(item, index) in products" :key="item.gg" >
       <wx-view class="item-media">
         <wx-image class="img" mode="aspectFill" :src="item.cover==''?item.thumbUrl: 'http://image.vdongchina.com/'+item.cover"/>
       </wx-view>
       <wx-view class="item-main">
         <wx-view class="item-desc" :style="'fontSize:'+fontSizeName+'px;fontWeight:'+fontWeightName+';color:'+colorName+';width:100%;'">
             {{item.name}}
         </wx-view>
         <wx-view class="item-title-row">
           <wx-view class="left main-color"  :style="'fontSize:'+fontSizeMark+'px;fontWeight:'+fontWeightMark+';color:'+colorMark+';'">￥<wx-text class="product-price-text" :style="'fontSize:'+fontSizePrice+'px;fontWeight:'+fontWeightPrice+';color:'+colorPrice+';'">{{item.salePrice}}</wx-text></wx-view>
           <wx-view class="left oldPrice" v-if="item.isShowMarkerPrice">￥{{item.marketPrice}}</wx-view>
           <wx-view class="right shopcart" @click="addCar(item.uuid)" v-show="shopcartShow.open"><wx-image class="shopImg" :src="shopcartShow.pic"/></wx-view>
         </wx-view>
       </wx-view>
     </wx-view>
   </wx-view>

   	<wx-view class="nonePro" v-if="products.length == 0">
	     暂无商品
	</wx-view>
 </wx-view>
</template>
<script>
let _ProductList = {
  editorConfig: {   //该编辑器所有配置项
    model:{
      label: '布局',
      type: 'Number',
      value: 1,
      director : 'radio'
    },
    // isShow:{
    //   label: '',
    //   type:Object,
    //   value:{
    //     show: 1,
    //     ewidth: 141,
    //     eheight: 174
    //   },
    //   director : 'isShow'
    // },
    ewidth:{
      el: ['number'],
      label: '列表图片宽度',
      labelshow:"",
      type: 'Number',
      value: 141,
      director: 'isShow'
    },
    eheight: {
      el: ['number'],
      label: '列表图片高度',
      labelshow:"",
      type: 'Number',
      value: 174,
      director: 'isShow'
    },
    tshow: {
      label :'分类导航显示状态',
      type: Object,
      value:{
        show: 1,
        cId: 1,
        showIcon: 0,
        iconSize: 40,
        spacing: 0,
        tabIds:[]
      },
      director: 'goods'
    },
    shopcartShow: {
      label : '购物车图标显示状态',
      type : Object,
      value : {
        open: true,
        pic: 'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'
      },
      tip: '建议尺寸50*50',
      director : 'shopcartSwitch'
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
    },
    fontSizeName:{
      el: ['number'],
      label: '商品名称文字大小',
      type: 'Number',
      value: '13',
      director: 'Fsize'
    },
    fontSizeMark:{
      el: ['number'],
      label: '商品价格符号大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontSizePrice:{
      el: ['number'],
      label: '商品价格文字大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontWeightName:{
      el: ['number'],
      label: '商品名称文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightMark:{
      el: ['number'],
      label: '商品价格符号粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightPrice:{
      el: ['number'],
      label: '商品价格文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    colorName:{
      el: ['text', 'color'],
      label: '商品名称文字颜色',
      type: 'String',
      value: '#333333',
      director : 'ColorPicker'
    },
    colorMark:{
      el: ['text', 'color'],
      label: '商品价格符号颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    },
    colorPrice:{
      el: ['text', 'color'],
      label: '商品价格文字颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    }
  },
  comName:"新商品列表",
  props: {
    model: {
      default: 3,
      type: Number
    },
    // isShow: {
    //   default:function(){
    //     return {
    //       show: 3,
    //       ewidth: 141,
    //       eheight: 174
    //     }
    //     },
    //    type: Object
    // },
    ewidth: {
    label: '列表图片宽度',
      default: 141,
      type:Number
    },
    eheight: {
      label: '列表图片高度',
      default: 174,
      type:Number
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
    },
    shopcartShow: {
      type: Object,
      default: function(){
        return {open:true,pic:'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'}
      }
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
    fontSizeName:{
      default: '13',
      type:String
    },
    fontSizeMark:{
      default: '11',
      type:String
    },
    fontSizePrice:{
      default: '11',
      type:String
    },
    fontWeightName:{
      default: '100',
      type:String
    },
    fontWeightMark:{
      default: '100',
      type:String
    },
    fontWeightPrice:{
      default: '100',
      type:String
    },
    colorName:{
      default: '#333333',
      type: String
    },
    colorMark:{
      default: '#b4282d',
      type: String
    },
    colorPrice:{
      default: '#b4282d',
      type: String
    }
  },
  data () {
    return {
      products: [],
      items: [],
      active: 0,
      catCid:null,    //切换栏目要用到,
      isFirst: true
    }
  },
  methods: {
      handler (cid,index) {
        this.active = index
        var that = this
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/api/product/productByCatalogId',
            data: {
                catalogId : cid
            },
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success (res) {
              var productList = res.data.data.filter(item => {
		              return item.status == 1
		          })
              that.products = productList
            }
        })
      },
      productItem (id){
        wx.navigateTo({
            url: '../goods/goods' + '?id=' + id
        })
      },
      addCar (id) {
        //
      }
  },
  onLoad () {
    var that = this
    // 获取商品分类
    wx.request({
        url: this.$root.apiServer+this.$root.appid+'/basic/api/product/catalogs',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success (res) {
          if(res.statusCode==200 && res.data.data.length){
              var result = res.data.data
              var resArr = []
              result.forEach(function(item,idx){
                resArr.push({id:item.id,name:item.name,thumbnail:item.thumbnail})
              })
              that.items = resArr
              that.catCid = resArr[0].id

            if(that.tshow.show&&that.tshow.tabIds){
              if(that.tshow.tabIds.length==0){
                  that.handler(that.catCid,0)
              }else{
                  that.handler(that.tshow.tabIds[0].id,0)
              }

            }else{
              that.handler(that.tshow.cId,0)
            }
            // that.handler(typeof that.tshow.cId !='object'&&that.tshow.cId&&cids.indexOf(that.tshow.cId)!==-1?that.tshow.cId:res.data.data[0].id,0)
            that.isFirst = false
            if(that.tshow.tabIds.length==0){
              that.tshow.tabIds=that.items
            }
          }
        }
    })
  },
  watch:{
    tshow(e){
      if(this.isFirst){
        return
      }
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
    },
    // model(e){
    //   this.isShow.show=e
    //   // console.log(this.isShow.show)
    // }
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
})(_ProductList)
</script>
<style scoped>
.product-cant{height: 2.63158rem;line-height: 2.63158rem;position: relative;background:#ffffff}
.product-line{position: absolute;width: 6.31579rem;height: 0.10526rem;background: #000;top:1.21053rem;left: 50%;margin-left: -3.15789rem;}
.product-title{position: absolute;width: 4.73684rem;left:50%;margin-left: -2.36842rem;top: 0;text-align: center;background: #ffffff}
.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden}
.left{float: left}
.right{float: right}
.product-list{ background: #f9f9f9;padding-top: 0.21053rem; }
.product-item{width: 49%;height: auto;background:#ffffff;margin-bottom: 0.26316rem;float: left;overflow: hidden;display: flex;display:-webkit-flex;align-items: center;justify-content: center;-webkit-align-items: center;-webkit-justify-content: center;flex-direction: column;-webkit-flex-direction:column}

.product-item:nth-child(even){margin-left:0.26316rem;}
/* .rowclass{display: flex;display: -webkit-flex;flex-direction: column;-webkit-flex-direction:column}
.product-img .product-img-image{width:auto;height:auto;flex:1;-webkit-flex:1 }
.product-img{text-align: center;display: flex;display: -webkit-flex} */
/*.product-img .product-img-image{width: 9.73684rem;height: 9.73684rem;} */
.product-img .product-img-image{width:100%;height:100%}
.product-img{text-align: center;}


.product-name{font-size: 0.73684rem;line-height: 1.31579rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left:0.26316rem;padding-right: 0.26316rem;}
.product-price{font-size: 0.57895rem;line-height: 1.05263rem;margin-left: 0.26316rem;color: #999999}
.product-price text{font-size: 0.78947rem;}
.oldPrice{text-decoration:line-through;margin-left: 0.26316rem;line-height: 1.15789rem;}
.upload_title{height: 2.10526rem;line-height: 2.10526rem;padding-left: 0.52632rem;font-size: 0.68421rem;border-top:solid 0.02632rem #e3e3e3;}
.uploadWrap{width:100%; white-space:nowrap;}

.upload_Item{ width:7.84211rem; height: 10.68421rem;margin-right: 0.26316rem;margin-bottom: 5px;;border:solid 0.02632rem rgba(0,0,0,0.1);display: inline-flex;display: -webkit-inline-flex;-webkit-align-items: center;-webkit-justify-content:center;overflow: hidden;align-items: center;justify-content:center;overflow: hidden;}
.upload_Item_img{ width: 100%; height:100%;display: flex;display: -webkit-flex}
.nonePro{height:200px;line-height: 200px;text-align: center;position:relative;}
.navs{
  margin-bottom: 10px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.nav{
  display: inline-block;
}
.text{
  display: block;
  padding: 0 10px;
  border-bottom: 4px solid transparent;
  margin: 0 9px;
  box-sizing: border-box;
}
.item-box{
    white-space: nowrap;
}
._item{
  text-align: center;
}
.nav-icon{
  vertical-align: top;
  height: 40px;
  width: 40px;
  margin-bottom: 0;
}
.classname{align-self: center;}
.columnclass{width: 100%;align-self: flex-start;height: 100%;flex:1;flex-direction: column;  -webkit-align-self: flex-start; -webkit-flex:1; -webkit-flex-direction: column;display: -webkit-flex;}
.shopcart{margin-right: 5px;}

.product-list .large{
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
}
.product-list .large .product-img{
  width: 100%;
  height: 170px;
  margin: 0 auto
}
.product-list .large .product-name{
  font-size: 15px;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
}
.product-price{
  height: 25px;
  line-height: 25px;
}
.product-list .large .product-price{
  margin-top: 9px;
}
.product-list .large .main-color{
  font-size: 14px;
}
.product-list .large .product-price-text{
  font-size: 18px;
}
.product-list .oldPrice{
  font-size: 13px;
}
.product-price .shopImg{
  height: 25px;
  width: 25px;
  vertical-align: top;
}
.product-price .oldPrice{
  line-height: 25px;
}
/* .product-img-image{display: flex!important;display: -webkit-flex!important}
.product-img-image div{width:auto!important;height:auto!important;flex:1;-webkit-flex:1} */

.sitem,.item-main{
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
.sitem{
  background-color:#fff;
  position:relative;
  padding:17px;
}
.sitem:before{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.sitem:after{
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}
.sitem .img{
  width:90px;
  height:90px;
  background-color:#f2f5f6;
  border-radius: 5px;
  overflow: hidden;
}
.item-media+.item-main {
    margin-left:10px;
}
.item-main{
  height:90px;
  flex-direction:column
}
.item-main{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.item-desc{
  position:relative;
  top:6px;
}
.item-title-row{
  position:relative;
  bottom:6px;
  width:100%;
}
.item-desc {
    font-size:15px;
    color: #111111;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    letter-spacing: 0.62px;
    line-height: 1.5;
    max-height: 42px;
}
.right .shopImg{
  width:25px;
  height: 25px;
  vertical-align: top;
}
.sitem .main-color{
  height: 25px;
  line-height: 25px;
}
.sitem .oldPrice{
  height: 25px;
  line-height: 25px;
}
</style>
