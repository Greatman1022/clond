<template>
  <wx-view>
    <!--商品列表 start-->
    <wx-view class="shopbg" v-if="list.length!=''" :style="'background:'+bgColor">
      <wx-view class="shop-list" >
        <wx-view v-for="item in list" :key="item.id" class="titlelist_block">
          <wx-view class="shop-lists" >
            <wx-view class="shop-list-img">
              <!--<wx-image class="thumbimg" :src="item.thumb" :style=" 'width:' + Ewidth + 'px;height:' + Eheight +'px;'"></wx-image>-->
              <wx-image class="thumbimg" :src="item.thumb" ></wx-image>
            </wx-view>
            <wx-view class="shopName" :style="'color:' + color + ';font-size:' + fontSize + 'px;'">{{item.title}}</wx-view>
            <wx-view class="txtdiv">
              <wx-text class="shopPrice">¥{{item.marketprice}}</wx-text>
              <wx-text class="shopDel">¥{{item.productprice}}</wx-text>
            </wx-view>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
    <!--商品列表 end-->

    <wx-view v-else>
      <wx-view class="nolists">暂无数据</wx-view>
    </wx-view>

  </wx-view>
</template>
<script>
  let _goodList = {
    editorConfig: {   //该编辑器所有配置项
//      Ewidth:{
//        el: ['number'],
//        label: '列表图片宽度',
//        type: 'Number',
//        value: '175',
//        director: 'Fsize'
//      },
//      Eheight: {
//        el: ['number'],
//        label: '列表图片高度',
//        type: 'Number',
//        value: '175',
//        director: 'Fsize'
//      },
      bgColor: {
        el: ['text', 'color'],
        label: '背景色',
        type: 'String',
        value: '#fff',
        director : 'ColorPicker'
      },
      color: {
        el: ['text', 'color'],
        label: '文本颜色',
        type: 'String',
        value: '#3a3a3a',
        director : 'ColorPicker'
      },
      fontSize: {
        el: ['number'],
        label: '文字大小',
        type: 'Number',
        value: '14',
        director: 'Fsize'
      },
    },
    comName:"商品列表",
    props: {
//      Ewidth: {
//        default: '170',
//        type:String
//      },
//      Eheight: {
//        default: '174',
//        type:String
//      },
      bgColor: {
        default: '#fff',
        type: String
      },
      color: {
        default: '#3a3a3a',
        type: String
      },
      fontSize: {
        default: '14',
        type:String
      },
    },
    data () {
      return {
        list: [],         // 商品列表
      }
    },
    onLoad () {
      this.handler()
    },
    methods: {
      handler (index) {
        var that = this
        wx.request({
          url: this.$root.apiServer + this.$root.appid + '/cloud/public/index.php/shop/Goods/categorygoods',
          method: 'POST',
          data: {
            uniacid: 2,
            page_number: 1,
            page_size: 6,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            if(res && res.data.data)
            that.list = res.data.data
          }
        })
      },
      itemTapHandler (id){
        wx.navigateTo({
          url: '../goods/goods' + '?id=' + id
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
  })(_goodList)
</script>
<style scoped>


  /*  商品   list    */
  .shopbg {
    width: 100%;
    background: #fff;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .shop-list {
    width: 100%;
    padding: 0 8px;
  }
  .shop-lists {
    position: relative;
    float: left;
    padding: 5px 3px 0 3px;
    height: 250px;
    margin-bottom: 12px;
  }

  .shop-lists .shopName {
    width: 175px;
    margin-top: 10px;
    color: #555;
    font-size: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .txtdiv{
    width: 170px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    bottom: -5px;
    left: 5px;
  }
  .shop-lists .shopPrice {
    height: 20px;
    color: #e94746;
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;

  }
  .shop-lists .shopDel {
    color: #999;
    font-size: 14px;
    text-decoration: line-through;
  }
  .shop-list-img {
    width: 175px;
    height: 175px;
    vertical-align: middle;
  }
  .shop-list-img .thumbimg {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  /*商品 list end */
  .nolists{
    padding: 30px;
    background: #fff;
    font-size: 15px;
    text-align: center;
    margin-bottom: 10px;
  }


</style>
