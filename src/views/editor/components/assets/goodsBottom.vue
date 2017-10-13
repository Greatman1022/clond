<template>
  <wx-view :style="'backgroundColor:' + bgColor + ';'">
    <!--全部宝贝 查看全部宝贝-->
    <wx-view class="stores">
      <wx-view class="store">
        <wx-image class="storeImg" :src="merchant.logo"/>
        <wx-view class="store_title">
          <wx-text class="store_name">{{merchant.name}}</wx-text>
          <wx-view>
            <wx-text class="shopText">公司电话:{{merchant.phone}}</wx-text>
          </wx-view>
        </wx-view>
      </wx-view>
      <wx-view class="shops_ify">
        <wx-view class="store_shops">
          <wx-image class="shopImg" src="http://image.vdongchina.com/M00/01/45/ZSUkmVmudniEKG9EAAAAALMN-ho181.png"/>
          <wx-text class="shopText">查看全部商品</wx-text>
        </wx-view>
        <wx-view class="store_shops two" >
          <wx-image class="shopImg" src="http://image.vdongchina.com/M00/01/45/ZSUkmVmudqGEBKuXAAAAAJKm5fs402.png"/>
          <wx-text class="shopText">进店逛逛</wx-text>
        </wx-view>
      </wx-view>
    </wx-view>
    <!--全部宝贝 查看全部宝贝 end -->

    <!--商品详情 nav -->
    <wx-view class="headerclass">
      <wx-view class="headerclass_block" v-for="(item, index) in worddetails" :key="item.id">
        <wx-view :class="'classlist ' + (currentTab==index?'classListBorder': '')">
          <wx-view class="class_inico">
            <wx-text :class="currentTab==index?'classlist_text_red': ''">{{item.name}}</wx-text>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
    <!--商品详情 nav  end  -->

    <!--图文详情-->
    <wx-view class="xiala_xq" v-if="xq">
      <wx-view/>
        <wx-text class="xqText">继续拖动，查看图文详情</wx-text>
      </wx-view>
    <wx-view v-if="currentTab == 0" :class="'xiala ' + currentTab==0? 'on': ''">
      <wx-view class="xiangqing" v-if="article != ''">
        <wx-view class="wxParse">
          <wx-rich-text :nodes="article"/>
        </wx-view>
      </wx-view>
      <wx-view class="noneData" v-else="">暂无数据</wx-view>
    </wx-view>

  </wx-view>
</template>

<script>
  let _goodsBottom = {
    editorConfig: {
      bgColor: {
        el: ['text', 'color'],
        label: '背景色',
        type: 'String',
        value: '#fff',
        director : 'ColorPicker'
      },
    },
    comName: "商品详情",
    props: {
      bgColor: {
        default: '#fff',
        type: String
      },
      worddetails: {
        default: function () {
          return [
            { name: "图文详情" },
            { name: "产品参数" },
            { name: "用户评论" }
          ]
        }
      },
    },
    config: {
      "navigationBarTitleText": "商品详情"
    },
    data () {
      return {
        currentTab: 0,           // 图文详情切换
        xq: true,                // 图文显示隐藏
        list: {},                // 详情页信息
        merchant:               // 商户信息
        [
          {logo: 'http://www.cybwang.com/upload/zuopin/201606/5f42938878b2f6d2f84c8eb536902610.png'},
          {name: '微商城'},
          {phone: '020-5689142'}
        ],
        article:'<div style="width: 100%;"><img src="http://uploads.qusaoba.net/images/ewei_shop/66/2017/03/Fw3FddkIu22d9fU8a9cdL33DwUZWxE.jpg" style="width: 100%; height: 375px;"alt=""></div>',              // 图文详情
      }
    },
    onLoad: function (options) {
      if(this.$root.globalData){
        getStore(options)
        getContent(options)
      }

    },
    methods:{
      getStore(options) {
        wx.request({
          url: this.$root.apiServer + this.$root.appid +'/cloud/public/index.php/shop/Merchant/merchant',
          method: 'POST',
          data: {
            uniacid: 2,
            goodsid: options.id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            if(res.data.data && res.data.data.length){
              that.merchant = res.data.data
            }
          }
        })
      },
      getContent(options) {
        wx.request({
          url: this.$root.apiServer + this.$root.appid +'/cloud/public/index.php/shop/Merchant/merchant',
          method: 'POST',
          data: {
            uniacid: 2,
            goodsid: options.id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            if(res.data.data && res.data.data.length){
              this.xq = false
              that.article = res.data.data.content
            }
          }
        })
      },


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
  })(_goodsBottom)
</script>

<style scoped>
  /*查看全部商品 数量*/
  .stores {
    box-sizing: border-box;
    margin-bottom: 12px;
    padding: 0 10px;
    background: #fff;
    height: 136px;
  }

  .store {
    padding: 10px 0;
    height: 50px;
  }

  .store .storeImg {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .store_title {
    float: left;
    margin-left: 10px;
  }

  .store .store_name {
    display: inline-block;
    color: #333;
    font-size: 14px;
  }

  .store .shopText {
    color: #999;
    font-size: 12px;
  }

  .shops_ify {
    overflow: hidden;
    padding: 12px 0;
  }

  .store_shops {
    float: left;
    display: flex;
    width: 167px;
    height: 30px;
    border: 1px solid #999;
    border-radius: 3px;
    font-size: 13px;
    line-height: 30px;
    justify-content: center;
    align-items: center;
    color: #999;
  }

  .store_shops .shopImg {
    margin-right: 10px;
    width: 17px;
    height: 15px;
  }

  .store_shops.two {
    float: right;
  }
  /*查看全部商品 数量 end */

  /*商品详情 nav */

  .headerclass {
    width: 100%;
    background-color: #fff;
    height: 45px;
    display: flex;
    justify-content: center;
  }
  .headerclass>view {
    flex: 1;
  }
  .headerclass_block {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .class_inico {
    width: 100%;
    color: #999;
    text-align: center;
    font-size: 15px;
    line-height: 43px;
  }

  .classListBorder {
    border-bottom: 2px solid #e94746;
  }

  .classlist_text_red {
    color: #e94746;
    border-bottom: 1px solid #e94746;
  }
  .clearHeight {
    width: 100%;
    height: 100vh;
  }
  .noneData {
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 15px;
    text-align: center;
  }
  /*商品详情 nav end */

  /*商品详情 headimg*/

  .xiala {
    background: #f0f0f0;
    min-height: 50px;
  }

  .xiala.on {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    margin-bottom: 50px;
    font-size: 12px;
    justify-content: center;
    align-items: center;
  }

  .xiala_xq {
    width: 100%;
    height: 60px;
    margin: 0 auto;
    position: relative;
  }

  .xiala_xq view {
    width: 80%;
    height: 1px;
    margin: 22px auto 0 auto;
    background: #c8c8c8;
  }
  .xiala_xq div {
    width: 80%;
    height: 1px;
    margin: 22px auto 0 auto;
    background: #c8c8c8;
  }
  .xiala_xq .xqText {
    display: block;
    width: 175px;
    height: 20px;
    background: #f0f0f0;
    margin: -10px auto;
    font-size: 14px;
    text-align: center;
  }
  /*商品详情 headimg end  */

  /*立即购买 弹窗*/
  .liji {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
  }
  .info {
    width: 100%;
    min-height:100px;
    overflow: scroll;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
  .lijigoumai {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
  }
  .liji_header {
    overflow: hidden;
    width: 100%;
    background: #fff;
    z-index: 12;
  }
  .liji_header2 {
    width: 355px;
    overflow: hidden;
    margin: 0 auto;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    z-index: 12;
  }
  .liji_image {
    width: 80px;
    height: 80px;
    margin-top: 10px;
    border-radius: 5px;
    position: absolute;
    left: 10px;
    top: 0;
  }
  .liji_header_xinxi {
    width: 225px;
    height: 105px;
    float: left;
    margin-left: 104px;
    font-size: 12px;
  }
  .liji_header_xinxi .liji_pirce {
    color: #e94746;
    font-size: 19px;
    font-weight: bold;
    margin-top: 20px;
  }
  .liji_header_xinxi .liji_num {
    margin-top: 22px;
    font-size: 12px;
    color: #999;
  }
  .liji_header_xinxi .liji_num .numb {
    color: #e94746;
    margin: 0 5px;
  }
  /*start 图文详情*/
  .xiangqing {
    width: 100%;
    overflow: hidden;
  }
  .wxParse {
    font-size: 13px;
    color: #333;
    background: #fff;
    padding: 5px 10px;
  }
  /*end 图文详情*/
</style>
