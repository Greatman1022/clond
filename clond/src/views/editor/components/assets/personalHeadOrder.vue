<template>
    <!--我的订单-->
    <wx-view class="order-tant">
      <wx-view class="myOrder">
        <wx-view class="zhuangtai" v-for="(item,index) in orders" :key="item.url">
          <wx-navigator :url="item.to">
            <wx-view >
              <wx-image class="icon" :src="item.url"></wx-image>
            </wx-view>
            <wx-text class="orderText" :style="'color:'+color+';'" >{{item.text}}</wx-text>
          </wx-navigator>
        </wx-view>
      </wx-view>
    </wx-view>
</template>

<script>
  let _personalHeadOrder={
      editorConfig:{
        color:{
          el: ['text', 'color'],
          label: '文本初始颜色',
          type: 'String',
          value: 'rgba(255, 255, 255, 1)',
          director: 'ColorPicker'
        },
        orders: {
          el: ['orderNavs'],
          label: '图片填充',
          type: 'orderNavs',
          value: [
            {
              text: '全部订单',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/orders.png',
              to: '../perorder/perorder',
              code: ''
            },
            {
              text: '待付款',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/payment.png',
              to: '../perorder/perorder?state=1',
              code: ''
            },
            {
              text: '待发货',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/delivered.png',
              to: '../perorder/perorder?state=2',
              code: ''
            },
            {
              text: '待收货',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/received.png',
              to: '../perorder/perorder?state=3',
              code: ''
            },
            {
              text: '待退款',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/refunded.png',
              to: '../perorder/perorder?state=4',
              code: ''
            },
          ],
          director: 'orderNavs'
        }
      },
      comName:"我的订单导航",
    props:{
      color: {
        default: 'rgba(0, 0, 0, 1)',
        type: String
      },
      orders: {
        default:[
            {
              text: '全部订单',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/orders.png',
              to: '../perorder/perorder',
              code: ''
            },
            {
              text: '待付款',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/payment.png',
              to: '../perorder/perorder?state=1',
              code: ''
            },
            {
              text: '待发货',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/delivered.png',
              to: '../perorder/perorder?state=2',
              code: ''
            },
            {
              text: '待收货',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/received.png',
              to: '../perorder/perorder?state=3',
              code: ''
            },
            {
              text: '待退款',
              url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/refunded.png',
              to: '../perorder/perorder?state=4',
              code: ''
            },
          ],
        type: Array
      }
    },
    data(){
      return {
        active: 0
      }
    },
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
  })(_personalHeadOrder)

</script>

<style scoped>

  /*我的订单start*/
  .order-tant{
    width: 90%;
    height: 80px;
    background-color: #fff;
    margin:0px 0px 0px 5%;
    border-radius:5px;
    border:1px solid #fff;
    box-shadow:0 0 20px #fab4b4;
    position:relative;
    z-index:6;
  }
  .myOrder{
    display:flex;
    display:-webkit-flex;
    width:100%;
    text-align:center;
    margin-top:15px;
    height: 70%;
  }
  .zhuangtai{
    width:20%;
    box-flex:1;
    -webkit-box-flex:1;
    position:relative;
  }
  .icon{
    width: 28px;
    height: 25px;
  }
  .orderText{
    font-size:14px;
    margin-top: 5px;
    display: block;
  }
  /*我的订单end*/
</style>
