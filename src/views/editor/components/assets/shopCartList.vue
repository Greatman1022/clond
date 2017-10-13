<template>
  <wx-view class="shopCart">
    <wx-view>
    <!--logs.wxml-->
    <wx-view v-if="shops!=[]">
      <wx-view class="item-box">
        <wx-view class="items">
          <wx-view class="item" v-for="(item, index) in shops" :key="item.index">
            <wx-view class="inner txt">
              <wx-view class="select">
                <wx-image class="select_img" src="http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/cilcle@2x.png"/>
              </wx-view>
              <wx-image class="item-icon" :src="item.thumb"/>
              <wx-view class="describe" >
                <wx-text class="describetxt">{{item.title}}</wx-text>
              </wx-view>
              <wx-view class="goodtype" :data-id="item.goodsid" v-if="item.optiontitle != null">规格:{{item.optiontitle}}; </wx-view>
              <wx-view class="price2">
                <wx-text class="money1">￥{{item.marketprice}}</wx-text>
                <wx-text class="money2" v-if="item.productprice">￥{{item.productprice}}</wx-text>
              </wx-view>
              <wx-view class="plusdiv">
                <wx-view class="reduce">-</wx-view>
                <wx-view class="plustxt">{{item.total}}</wx-view>
                <wx-view class="add">+</wx-view>
              </wx-view>
              <wx-view class="hidden">
                <wx-image class="hidden_img" src="http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/hidden.png"/>
              </wx-view>
            </wx-view>
          </wx-view>
        </wx-view>
        <!--调节样式view-->
        <wx-view class="adjust"/>
        <!--调节样式view  end-->
      </wx-view>
      <!--底部固定div-->
      <wx-view class="jiesuan">
        <wx-view class="quanxuandiv">
          <wx-view class="quanxuan">
            <wx-image class="quanxuan_img1" src="http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/cilcle@2x.png"/>
          </wx-view>
        </wx-view>
        <wx-view class="quanxuantxt">
          全选()
        </wx-view>
        <wx-view class="submitdiv">结算</wx-view>
        <wx-view class="sum">
          <wx-view class="sumprice">合计:
            <wx-text class="sumnumber">￥0.00</wx-text>
          </wx-view>
          <wx-view class="freight">不含运费</wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
    <wx-view id="else" v-else="">
      <wx-view class="box">
        <wx-view class="bgimg">
          <wx-image class="bgImg" src="http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/car-1.png"/>
        </wx-view>
        <wx-view class="notxt">暂时没有相关商品</wx-view>
        <wx-view class="notxt2">主银快去给我找找其他的东西吧</wx-view>
        <wx-view class="boxbutton">
          <wx-view class="tiaozhuan" >个人中心</wx-view>
          <wx-view class="tiaozhuan2" >去逛逛</wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
  </wx-view>
  </wx-view>
</template>

<script>
  let _shopCart = {
    editorConfig: {
      cart:{
        label:'购物车',
        type:'String',
        tip: '提示：此组件不可编辑',
        director:'shopCart'
      },
    },
    comName:"购物车列表",
    props: {
      cart:{
        default: '',
        type: String
      },
    },
    data(){
      return {
        shops:[
          {
            thumb:'http://uploads.qusaoba.net/images/2/2017/08/Z1A2Wc0cN1Zn12r6LCKnlB1c2cA10U.jpg',
            title:'2016秋冬新款女装bf棒球服学生休闲宽松百搭夹克加绒加厚短外套潮',
            marketprice:'0.01',
            total:1
          },
          {
            thumb:'http://uploads.qusaoba.net/images/2/2017/08/nuQgOgrZOirIEi8oPGAleo5DpOPduP.jpg',
            title:'随意搭',
            marketprice:'88.00',
            total:1
          },
          {
            thumb:'http://uploads.qusaoba.net/images/2/2017/09/PGQ9QWB7eO1oha1HZqAB73nO99gQBQ.png',
            title:'春秋马思纯陈伟霆同款帽衫原宿bf风连帽卫衣女宽松学生oversize潮',
            marketprice:'79.00',
            total:1
          },
        ]
      }
    },
    onLoad () {
        if(this.$root.globalData){
          var that = this
          wx.request({
            url: this.$root.apiServer + this.$root.appid  +'/cloud/public/index.php/shop/cart/lists',
            method: 'POST',
            data: {
              uniacid: this.$root.globalData.projectId,
              openid: this.$root.globalData.openid,
              page_number: 1,
              page_size: 10
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;'
            },
            success (res) {
              that.shops=res.data.data
            }
          })
        }

    },
    watch:{

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
  })(_shopCart)
</script>

<style scoped="scoped">
  /* pages/leftSwiperDel/index.wxss */
  page {
    font-family: "Microsoft YaHei";
    background: #FFF
  }
  view {
    box-sizing: border-box
  }
  div {
    box-sizing: border-box
  }
  .shopCart{
    width: 100%;
    position: relative;
  }
  .item-box {
    width: 375px;
    height:539px;
    margin: 0 auto;
  }
  .items {
    width: 100%;
    margin-top: -1px
  }
  .item {
    position: relative;
    border-top: 2px solid #eee;
    height: 110px;
    overflow: hidden;
    margin-top: -1px;
  }
  .item:last-child {
    border-bottom: 1px solid #eee
  }
  .inner {
    position: absolute;
    top: 0
  }
  .inner.txt {
    background-color: #FFF;
    width: 100%;
    z-index: 1000;
    height: 110px
  }
  .inner.del{
    background-color: #e64340;
    width: 75px;
    text-align: center;
    z-index: 4;
    right: 0;
    color: #fff;
    height: 110px
  }
  .item-icon {
    width: 80px;
    height: 80px;
    margin: 15px 0 0 8px;
    float: left;
    border-radius: 3px
  }
  .describe {
    width: 240px;
    height: 20px;
    line-height: 20px;
    color: #333;
    font-size: 14px;
    z-index: 1;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 15px 0 0 10px
  }
  .describetxt {
    width: 100%;
    font-size:14px;
    color: #333333
  }
  .goodtype{
    width: 240px;
    height: 20px;
    color: #999;
    font-size: 13px;
    z-index: 1;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 3px;
    margin-left: 10px
  }
  .plusdiv {
    position: absolute;
    bottom: 3px;
    right: 4px;
    width: 75px;
    height: 30px
  }
  .add,.reduce {
    width: 20px;
    height: 20px;
    line-height: 15px;
    border-radius: 50%;
    text-align: center
  }
  .add {
    border: 1px solid #E94746;
    float: left;
    color: #fff;
    font-size: 26px;
    background: #E94746
  }
  .reduce {
    border: 1px solid #999999;
    float: left;
    font-size: 26px;
    color: #999999
  }
  .plustxt {
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    float: left;
    font-size: 15px;
    color: #333333
  }
  .price2 {
    width: 120px;
    height: 20px;
    z-index: 1;
    line-height: 20px;
    float: left;
    margin: 15px 0 0 10px
  }
  .money1 {
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    color: #ff0000;
    float: left;
    font-weight: bold
  }
  .money2 {
    height: 20px;
    line-height: 23px;
    font-size: 10px;
    color: #000;
    float: left;
    margin-left: 4px;
    text-decoration: line-through
  }
  .hidden{
    position: absolute;
    right: -1px;
    top: 43px;
    width: 6px;
    height: 25px
  }
  .hidden .hidden_img {
    width: 6px;
    height: 25px
  }
  .jiesuan{
    position: absolute;
    bottom: -5px;
    left:0px;
    width: 375px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #FFF;
    border-top: 1px solid #CCC;
    /*border-bottom: 1px solid #CCC;*/
    font-size: 15px;
    z-index: 2000;
  }
  .quanxuandiv {
    width: 28px;
    height: 44px;
    float: left
  }
  .quanxuan {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    margin-top: 13px
  }
  .quanxuan .quanxuan_img1{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 10px
  }

  .quanxuantxt {
    width: 75px;
    height: 44px;
    float: left;
    text-align: center;
    line-height: 44px;
    color: #666;
    font-size: 14px
  }
  .sum {
    height: 44px;
    float: right;
    font-size: 14px;
    margin-right: 8px
  }
  .sumprice {
    width: 100%;
    height: 22px;
    line-height: 22px;
    color: #666;
    text-align: left
  }
  .sumnumber {
    font-weight: bold;
    color: #F00
  }
  .freight{
    width: 100%;
    height: 22px;
    line-height: 22px;
    color: #999;
    font-size: 13px;
    text-align: left
  }
  .submitdiv {
    width: 90px;
    height: 42px;
    float: right;
    color: #FFF;
    background: #E94746;
    font-size: 15px;
    border-radius: 3px
  }
  .select {
    float: left;
    font-size: 14px;
    line-height: 110px
  }
  .select .select_img {
    margin-left: 5px;
    width: 20px;
    height: 20px
  }
  .adjust {
    width: 375px;
    height: 44px
  }
  /*无商品*/
  .box{
    width: 100%;
    height:453px;
  }
  .bgimg{
    width:95px;
    height:80px;
    margin:0 auto;
    margin-top:90px;
  }
  .bgimg .bgImg{
    width: 95px;
    height: 80px;
  }
  .notxt{
    margin:0 auto;
    width:200px;
    height:20px;
    text-align:center;
    line-height:20px;
    font-size:14px;
    color:#999;
    margin-top:10px;
  }
  .notxt2{
    margin:0 auto;
    width:200px;
    height:20px;
    text-align:center;
    line-height:20px;
    font-size:14px;
    color:#999;
    margin-top:5px;

  }
  .boxbutton{
    width:100%;
    height:44px;
    margin-top:75px;
    padding:0 11px;
    display:box;
    display:-webkit-box;
    text-align:center;

  }
  .tiaozhuan{
    box-flex:box;
    -webkit-box-flex:1;
    width:50%;
    height:44px;
    border:1px solid #979797;
    font-size:16px;
    line-height:44px;
    color:#666666;
    border-radius:4px;
    margin-right:20px;
  }
  .tiaozhuan2{
    box-flex:box;
    -webkit-box-flex:1;
    width:50%;
    height:44px;
    border:1px solid #979797;
    font-size:16px;
    line-height:44px;
    color:#666666;
    border-radius:4px;
  }
</style>
