<template>
 <wx-view class="list-content">
  <wx-scroll-view :scroll-y="true" class="navs" :style="'background:'+bgColor" v-if="tshow.show == 1 && tshow.tabIds.length > 0">
    <wx-view class="item-box">
      <!-- <wx-view class="nav" v-for="(item, index) in items" :key="item.id" @click="handler(item.id,index)">
        <wx-text class="text" v-if="active==index" :style="'fontSize:' + fontSize + 'px;color:'+activeColor+';background:#fff'+';border-left:6px solid'+activeColor+';border-bottom:none;border-right:6px solid transparent;'">{{item.name}}</wx-text>
        <wx-text class="text" v-else :style="'fontSize:' + fontSize + 'px;color:'+color+';border-bottom:0.5px solid #e5e5e5;'">{{item.name}}</wx-text>
      </wx-view> -->
       <wx-view class="nav" v-for="(item, index) in tshow.tabIds" :key="item.id" @click="handler(item.id,index)">
        <wx-text class="text" v-if="active==index" :style="'fontSize:' + fontSize + 'px;color:'+activeColor+';background:#fff'+';border-left:6px solid'+activeColor+';border-bottom:none;border-right:6px solid transparent;'">{{item.name}}</wx-text>
        <wx-text class="text" v-else :style="'fontSize:' + fontSize + 'px;color:'+color+';border-bottom:0.5px solid #e5e5e5;'">{{item.name}}</wx-text>
      </wx-view>
    </wx-view>
  </wx-scroll-view>
  <wx-view class="product-list clear" v-if="products.length>0">
    <wx-view class="product-item left" v-for="(item, index) in products" :key="item.gg">
      <wx-view class="classname" v-on:click.native="productItem(item.uuid)">
          <wx-view class="product-img"><wx-image mode="aspectFit" class="product-img-image" :src="item.cover==''?item.thumbUrl: 'http://image.vdongchina.com/'+item.cover"/></wx-view>
          <wx-view class="product-name"  :style="'fontSize:'+fontSizeName+'px;fontWeight:'+fontWeightName+';color:'+colorName+';'">{{item.name}}</wx-view>
          <wx-view class="clear product-price">
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
    tshow: {
      label :'分类导航显示状态',
      type: 'Object',
      value:{
        show: 1,
        cId: 1,
        tabIds:[]
      },
      director: 'goodSide'
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
      value: '#f6f6f6',
      director : 'ColorPicker'
    },
    color: {
      el: ['text', 'color'],
      label: '文本初始颜色',
      type: 'String',
      value: '#333333',
      director : 'ColorPicker'
    },
    activeColor: {
      el: ['text', 'color'],
      label: '文本选中颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    },
    fontSize: {
      el: ['number'],
      label: '文字大小',
      type: 'Number',
      value: '14',
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
      tshow:{
        default:function(){
          return {
            show:1,
            cId:1,
            tabIds:[]
          }
        }
      },
      shopcartShow: {
        type: Object,
        default: function(){
          return {open:true,pic:'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'}
        }
      },
      bgColor: {
        default: '#f6f6f6',
        type: String
      },
      color: {
        default: '#333333',
        type: String
      },
      activeColor: {
        default: '#b4282d',
        type: String
      },
      fontSize: {
        default: '14',
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
              // console.log(res.data.data[0].thumbUrl);
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
          // console.log(res.data.data[0]);
          if(res.statusCode==200 && res.data.data.length){
              var result = res.data.data
              var resArr = []
              result.forEach(function(item,idx){
                resArr.push({id:item.id,name:item.name})
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
})(_ProductList)
</script>
<style scoped>

.list-content{
  display:flex;
  width:100%;
}
.text{
  width: 100%;
  height:100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.navs.wx-scroll-view{
  width:90px;
  height:auto;
  display:flex;
  flex-direction:column;
  background:#f6f6f6;
}
.nav{
  width:90px;
  height:45px;
  line-height:45px;
}
/*购物车图标尺寸  */
.right .shopImg{
  width:25px;
  height: 25px;
}
.clear::after{display: block;height: 0;clear: both;content: "";overflow: hidden;visibility: hidden}
.product-list{ background: #ffffff;flex:1;margin-bottom:19px;}
.product-item{width:42.1%;background:#ffffff;margin-top: 14.5px;float:left;padding-left:5.26%;}
.product-img{
  width:100%;
}
.classname{
  width:100%;
}
.product-img .product-img-image{width:100%;height:120px;}
 .classname .product-name{font-size:13px;line-height:34px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left:4.58%;width:105px;color:#333333;}
.product-price{font-size:11px;color:#b4282d;height:25px;line-height:25px;margin-left:5px;text-align: center;}
.oldPrice{color:#aaaaaa;text-decoration:line-through;margin-left:5px;line-height:25px;font-size:10px;}
.left{float: left}
.right{float: right}
.nonePro{width: 100%;height:200px;line-height:200px;text-align:center;position:relative;}
</style>
