<template>
  <wx-view
    class="item-cant"
    :style="'background-image: url(' + bgImg + ');background-size: 100% 100%;'"
  >
    <wx-view class="item" v-for="(item, index) in navs" :key="item.url">
      <wx-navigator class="item-navigtor" :url="item.to" v-if="active===index" >
        <wx-view class="item-icon">
          <wx-image
            :style="'height: ' + size + 'px;width: ' + size + 'px;'"
            class="item-image"
            :src="item.activeUrl"></wx-image>
        </wx-view>
        <wx-view
          :style="'color: ' + activeColor + ';'"
          class="item-text"
        >{{ item.text }}</wx-view>
      </wx-navigator>
      <wx-navigator class="item-navigtor" :url="item.to" v-else key="index">
        <wx-view class="item-icon">
          <wx-image
            :style="'height: ' + size + 'px;width: ' + size + 'px;'"
            class="item-image"
            :src="item.url"></wx-image>
        </wx-view>
        <wx-view
          :style="'color: ' + color + ';'"
          class="item-text"
        >{{ item.text }}</wx-view>
      </wx-navigator>
    </wx-view>
  </wx-view>
</template>

<script>
  let _indexNav = {
    editorConfig: {
      color: {
        el: ['text', 'color'],
        label: '文本初始颜色',
        type: 'String',
        value: 'rgba(255, 255, 255, 1)',
        director: 'ColorPicker'
      },
      activeColor: {
        el: ['text', 'color'],
        label: '文本选中颜色',
        type: 'String',
        value: 'rgba(0, 0, 0, 1)',
        director: 'ColorPicker'
      },
      bgImg: {
        el: ['uploader'],
        label: '导航背景图片',
        type: 'String',
        value: 'http://image.vdongchina.com/M00/00/9A/ZSUkmVmWkUSELbOHAAAAAM4Yp6s725.png',
        director: 'uploader'
      },
      size: {
        el: ['number'],
        label: '图标尺寸设定',
        type: 'Number',
        value: '20',
        director: 'Fsize'
      },
      navs: {
        el: ['navigation'],
        label: '图片填充',
        type: 'navigation',
        value: [
          {
            text: '首页',
            url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header1.png',
            activeUrl: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header1.png',
            to: '../index/index',
            code: ''
          },
          {
            text: '全部商品',
            url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header2.png',
            activeUrl: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header2.png',
            to: '../allshops/allshops?type=1',
            code: ''
          },
          {
            text: '促销商品',
            url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header3.png',
            activeUrl: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header3.png',
            to: '../allshops/allshops?type=2',
            code: ''
          },
          {
            text: '店铺公告',
            url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header4.png',
            activeUrl: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header4.png',
            to: '../affiche/affiche',
            code: ''
          }
        ],
        director: 'navigationB'
      }
    },
    comName:"菜单",
    data () {
      return {
          active: 0
      }
    },
    props: {
      bgImg: {
        default: 'http://image.vdongchina.com/M00/00/9A/ZSUkmVmWkUSELbOHAAAAAM4Yp6s725.png',
        type: String
      },
      color: {
        default: 'rgba(255, 255, 255, 1)',
        type: String
      },
      activeColor: {
        default: 'rgba(0, 0, 0, 1)',
        type: String
      },
      size: {
        default: '25',
        type:String
      },
      navs: {
        default: [
          {
            text: '首页',
            url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header1.png',
            activeUrl: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header1.png',
            to: '../index/index',
            code: ''
          },
          {
            text: '全部商品',
            url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header2.png',
            activeUrl: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header2.png',
            to: '../allshops/allshops?type=1',
            code: ''
          },
          {
            text: '促销商品',
            url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header3.png',
            activeUrl: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header3.png',
            to: '../allshops/allshops?type=2',
            code: ''
          },
          {
            text: '店铺公告',
            url: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header4.png',
            activeUrl: 'http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/header4.png',
            to: '../affiche/affiche',
            code: ''
          }
        ],
        type: Array
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
  })(_indexNav)
</script>

<style scoped>
  .item-cant {
    width: 100%;
    padding-top: 5px;
    background-color: #eaaeae;
    display: flex;
    justify-content: space-around;
  }
  .item-cant .item {
    flex: 1;
    height: 100%;
    overflow: hidden;
    float: left;
    text-align: center;
  }
  .item-cant .item .item-icon {
    display: inline-block;
    font-size: 0;
    /*width: 34px;*/
  }
  .item-cant .item .item-text {
    margin-top: 3px;
  }
  .item-cant .item .item-navigtor {
    display: inline-block;
  }
  .item-cant .item .item-icon .item-image {
    width: 100%;
    height: 100%;
  }
</style>

