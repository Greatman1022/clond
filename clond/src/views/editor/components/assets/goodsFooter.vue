<template>
  <!--底部的加入购物车以及购买按钮，还有收藏-->
  <wx-view class="footer">
    <!--收藏-->
    <wx-view class="collect">
      <wx-view class="class_inico">
        <wx-image class="collectImage" src="http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/star.png"/>
      </wx-view>
      <wx-text class="collectText">未收藏</wx-text>
    </wx-view>

    <!--收藏 end -->
    <!--购物车-->
    <wx-view class="collect" >
      <wx-view class="class_inico">
        <wx-image class="collectImage" src="http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/CAR.png"/>
      </wx-view>
      <wx-text class="collectText">购物车</wx-text>
    </wx-view>
    <!--按钮 -->
    <!-- 没有商品规格 -->
    <!--<wx-view v-if="nbgoods == 0">-->
      <wx-view >
        <wx-view class="addcart" >加入购物车</wx-view>
        <wx-view class="promptly">立即购买</wx-view>
      </wx-view>
    <!--</wx-view>-->

    <!--按钮 end-->
  </wx-view>
</template>

<script>
  let _goodsFooter = {
    editorConfig: {   //该编辑器所有配置项
      fixed:{
        label:'导航位置',
        type:'String',
        value:'bottom',
        director:'radio2',
      },
    },
    comName: "商品参数",
    is_Del: false,
    props: {
      fixed: {
        default: 'bottom',
        type: String
      },
    },
    data () {
      return {
        list: [],
      }
    },
    onLoad (options) {

    },
    methods: {

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
  })(_goodsFooter)
</script>

<style scoped>
  /*底部导航*/
  .footer {
    width: 100%;
    background: red;
    height: 49px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  .footer .collect {
    width: 17%;
    height: 49px;
    background-color: #fff;
    text-align: center;
    float: left;
  }
  .footer .collect .class_inico {
    width: 17px;
    height: 16px;
    margin: 0 auto;
    padding: 7px 0 0 0;
  }
  .footer .collect .collectText {
    color: #999;
    font-size: 14px;
  }
  .footer .collect .class_inico .collectImage {
    width: 100%;
    height: 100%;
    display: block;
  }
  .addcart, .promptly {
    width: 33%;
    height: 50px;
    line-height: 49px;
    float: left;
    box-sizing: border-box;
    text-align: center;
    font-size: 15px;
  }
  .addcart {
    background: #ffe817;
    color: #666;
  }
  .promptly {
    background: #e94746;
    color: #fff;
  }
  .addcart_no, .promptly_no {
    background: #d2d2d3;
    color: #fff;
  }
  /*底部导航 end */
</style>
