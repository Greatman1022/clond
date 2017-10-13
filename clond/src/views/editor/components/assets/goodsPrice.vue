<template>
  <!--提示 价格 销量-->
  <wx-view class="goods" :style="'background:' + bgColor + ';'">
    <wx-view class="goods_Pinkage">
      <wx-view v-if="list.issendfree == 1">
        <wx-text class="Pinkage">包邮</wx-text>
      </wx-view>
      <wx-view v-if="list.issendfree != 1">
        <wx-text class="Pinkage">不包邮</wx-text>
      </wx-view>
      <wx-text class="Pinkintro">{{list.title}}</wx-text>
      <wx-view v-if="distribution.is_commission == 1">
        <wx-view v-if="distribution.is_agent == 1">
          <wx-view class="fenxiao" v-on:click.native="fenxiao">
            <wx-button>我要分销</wx-button>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
    <!-- 没有商品规格 -->
    <!--<wx-view v-if="nbgoods == 0">-->
      <wx-view class="goods_price">
        <wx-text class="price">现价:￥{{list.marketprice || 59.99}}</wx-text>
        <wx-text class="goods_textleft">原价:￥{{list.productprice || 68.96}}</wx-text>
      </wx-view>
      <wx-view class="goods_price">
        <wx-text class="goods_text">销量：{{sales}}</wx-text>
        <wx-text class="goods_text2">库存：{{list.total || 236}}</wx-text>
      </wx-view>
    <!--</wx-view>-->
  </wx-view>
</template>

<script>
  let _goodsPrice = {
    editorConfig: {   //该编辑器所有配置项
      bgColor: {
        el: ['text', 'color'],
        label: '背景色',
        type: 'String',
        value: '#fff',
        director : 'ColorPicker'
      },
    },
    comName: "商品参数",
    props: {
      bgColor: {
        default: '#fff',
        type: String
      },
    },
    data () {
      return {
        list: [],
        distribution: {},
        sales: 100,
      }
    },
    onLoad (options) {
      var that = this
      if(this.$root.globalData){
        that.getDetail(options)
      }
    },
    methods: {
      getDetail(options) {
        var that = this
        wx.request({
            url: this.$root.apiServer+ this.$root.appid +'/cloud/public/index.php/shop/Goods/goodsdetail',
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
                that.list = res.data.data
                that.sales = Math.abs(res.data.data.sales)
              }
            }
          })
      },
      getCommission() {
        wx.request({
          url: this.$root.apiServer+ this.$root.appid +'/cloud/public/index.php/shop/Commission/commissionset',
          method: 'POST',
          data: {
            uniacid: 2,
            openid: this.$root.globalData.openid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            if(res.data.data && res.data.data.length){
              that.distribution = res.data.data
//              that.ourmid = res.data.data.mid

            }
          }
        })
      }
    },
    watch:{
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
  })(_goodsPrice)
</script>

<style>
  /*提示 价格 销量*/
  .goods {
    height: 105px;
    position: relative;
  }
  .fenxiao {
    position: absolute;
    top: 0;
    right: 5px;
  }

  .fenxiao button {
    background: #FFE817;
    border: none;
    color: #666666;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin-top: 5px;
    font-size: 14px;
  }

  .goods_Pinkage {
    box-sizing: border-box;
    height: 52px;
    line-height: 52px;
    border-bottom: 1px #c8c8c8 dashed;
    font-size: 16px;
    margin: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goods_Pinkage .Pinkage {
    margin-right: 5px;
    padding: 0 5px;
    height: 24px;
    border-radius: 5px;
    background: #e94746;
    color: #fff;
    font-size: 12px;
    line-height: 24px;
    float: left;
    margin-top: 10px;
  }

  .goods_Pinkage .Pinkintro {
    font-size: 15px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 60%;
    display: inline-block;
  }

  .goods_price {
    box-sizing: border-box;
    line-height: 24px;
    color: #c8c8c8;
    font-size: 12px;
    padding:0 10px;
  }

  .price {
    margin-right: 10px;
    color: #e94746;
    font-size: 14px;
    font-weight: bold;
  }

  .goods_textleft {
    color: #999;
    font-size: 14px;
  }

  .goods_text {
    float: left;
    color: #666;
    font-size: 14px;
  }
  .goods_text2 {
    float: right;
    color: #666;
    font-size: 14px;
  }
  /*提示 价格 销量 end */
</style>
