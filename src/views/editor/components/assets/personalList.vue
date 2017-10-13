<template>
  <wx-view class="pres-tant">
    <wx-view class="w-100 nav_lists" v-if ="!all_hidden">
      <wx-view class="w-100 plr30 box-s ovfl nav_list bg-wt" v-for="(item,index) in  arr_hidden" v-if="item.is_hidden == 1 " :key="index">
        <wx-navigator :url="item.src" class="w-100 clear1" open-type="navigate">
          <wx-view class="nav ovfl fl-l">
            <wx-view :style="'backgroundColor:'+item.icon_color+';'" class="collect_image fl-l ">
              <wx-image
                class="collect_image_image"
                :src="item.img_right"
              ></wx-image>
            </wx-view>
            <wx-view class="collect_title fl-l ml20">{{item.title}}</wx-view>
          </wx-view>
          <wx-view class="fl-r img_right">
            <wx-image class="img_right_image" src="https://image.vdongchina.com/M00/00/5F/ZSUkmVmKZjqEXGPoAAAAAKhVnJM603.png"></wx-image>
          </wx-view>
        </wx-navigator>
      </wx-view>
    </wx-view>
    <wx-view class="pTips" v-else>
      中心导航
    </wx-view>
  </wx-view>
</template>
<script>
  let _personalList = {
    editorConfig: {
      arr_hidden: {
        el: ['number'],
        label: '列表显示状态',
        type:'Array',
        value: [
            {
          title : '我的资料',
          is_hidden : 1,
          src:'../permater/permater',
          img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-users.png',
          icon_color:'#da4453'
          },
          {
            title : '优惠券',
            is_hidden :1,
            src:'../percouponlist/percouponlist',
            img_right:'http://image.vdongchina.com/M00/01/17/ZSUkmVmndzaEKf71AAAAACFkt9E947.png',
            icon_color:'#ff76d6'
          },
          {
            title : '购物车',
            is_hidden :1,
            src:'../shopcart/shopcart',
            img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-car-2.png',
            icon_color:'#f6bb42'
          },
          {
            title : '我的收藏',
            is_hidden :1,
            src:'../percollection/percollection',
            img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-star1.png',
            icon_color:'#37bc9b'
          },
          {
            title : '我的足迹',
            is_hidden :1,
            src:'../perfootprint/perfootprint',
            img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-foot.png',
            icon_color:'#4a89dc'
          },
          {
            title : '收货地址',
            is_hidden :1,
            src:'../place/place',
            img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-adress4.png',
            icon_color:'#da4453'
          },
          {
            title : '拼团订单',
            is_hidden :1,
            src:'../tuorder/tuorder',
            img_right:'http://image.vdongchina.com/M00/01/17/ZSUkmVmndaKEH5GMAAAAAGo2-X8531.png',
            icon_color:'#F8D446'
          },
          {
            title : '秒杀订单',
            is_hidden :1,
            src:'../perorder/perorder?isseckill=1',
            img_right:'http://image.vdongchina.com/M00/01/18/ZSUkmVmneDmENYPdAAAAAAenoYA548.png',
            icon_color:'#F9690D'
          },
          ],
        director : 'baseTpl'
      }
    },
    comName:"中心导航",
    data(){
      return {
        all_hidden:false
      }
    },
    props: {
      arr_hidden :{
        default:function(){
          return  [
            {
              title : '我的资料',
              is_hidden : 1,
              src:'../permater/permater',
              img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-users.png',
              icon_color:'#da4453'
            },
            {
              title : '优惠券',
              is_hidden :1,
              src:'../percouponlist/percouponlist',
              img_right:'http://image.vdongchina.com/M00/01/17/ZSUkmVmndzaEKf71AAAAACFkt9E947.png',
              icon_color:'#ff76d6'
            },
            {
              title : '购物车',
              is_hidden :1,
              src:'../shopcart/shopcart',
              img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-car-2.png',
              icon_color:'#f6bb42'
            },
            {
              title : '我的收藏',
              is_hidden :1,
              src:'../percollection/percollection',
              img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-star1.png',
              icon_color:'#37bc9b'
            },
            {
              title : '我的足迹',
              is_hidden :1,
              src:'../perfootprint/perfootprint',
              img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-foot.png',
              icon_color:'#4a89dc'
            },
            {
              title : '收货地址',
              is_hidden :1,
              src:'../place/place',
              img_right:'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-adress4.png',
              icon_color:'#da4453'
            },
            {
              title : '秒杀订单',
              is_hidden :1,
              src:'../perorder/perorder?isseckill=1',
              img_right:'http://image.vdongchina.com/M00/01/18/ZSUkmVmneDmENYPdAAAAAAenoYA548.png',
              icon_color:'#F9690D'
            },
            {
              title : '拼团订单',
              is_hidden :1,
              src:'../tuorder/tuorder',
              img_right:'http://image.vdongchina.com/M00/01/17/ZSUkmVmndaKEH5GMAAAAAGo2-X8531.png',
              icon_color:'#F8D446'
            },
          ]
        }
      }
    },
    watch:{
      arr_hidden(e){
        for (var i = 0; i < e.length; i++) {
          if(e[i].is_hidden == '1'){
            this.all_hidden = false   //代表显示
            break
          }
          this.all_hidden = true
        }
      }
    },
    methods: {

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
  })(_personalList)
</script>

<style scoped>
  .pres-tant{
    width: 100%;
    /*height:370px;*/
    /*background-color: rgb(240,240,240);*/
    padding:15px 0px;
  }
  .pTips{
    text-align: center;
    padding-top:15px;
    padding-bottom: 15px;
  }
  .clear1:after{
    clear: both;
    visibility: hidden;
    overflow: hidden;
    content: "";height: 0;
    display: block;
  }
  .collect_image {
    width:25px;
    height:25px;
    background-color: yellow;
    float:left;
    margin-right:10px;
    margin-top:10px;
  }
  .collect_image_image{
    width: 90%;
    height: 90%;
    margin:5%;
    display: block;
  }
  .collect_title{
    font-size: 15px;
    color: #111111;
    height: 49px;
    line-height: 49px;
  }
  .nav{
    height: 49px;
    line-height: 49px;
    justify-content: flex-start;
    align-items:center;
  }
  .img_right{
    margin-top: 17px;
  }
  .img_right_image{
    width: 8px;
    height: 16px;
  }
  .nav_lists{
    background-color: #f7f7f7
  }
  .nav_list{
    background-color: #ffffff;
    margin-bottom: 1px;
    padding-left: 15px;
    padding-right: 15px;
  }
  /*commonCSS*/
  .ml20{
    margin-left: 10px;
  }
  .fl-r {
    float: right;
  }
  .fl-l {
    float: left;
  }
  .ovfl {
    overflow: hidden;
  }
  image {
    width: 100%;
  }
  .box-s {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }


</style>
