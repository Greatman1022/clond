<template>
  <wx-view class="searchBox clear" @click="search()" :class="{'isLeft':isLeft}">
    <wx-view >
      <wx-image v-if="currentSrc" mode="aspectFit"  :src="currentSrc" class="serachBtn"/>
      <img v-else  src="~assets/images/icon/search.png" class="serachBtn"/>
    </wx-view>
    <input auto-focus class="searchInput" :class="{'borderRadius': borderRadius}" placeholder="请输入关键词"  v-model="vaule" :style="'border:1px solid '+bdColor+';background:' + bgColor +';'" />
  </wx-view>
</template>
<script>
  let _searchBox = {
    editorConfig: {
      bgColor: {
        el: ['text', 'color'],
        label: '搜索框背景色',
        type: 'String',
        value: '#f0f0f0',
        director : 'ColorPicker'
      },
      bdColor: {
        el: ['text', 'color'],
        label: '输入框边框颜色',
        type: 'String',
        value: '#f6f6f6',
        director : 'ColorPicker'
      },
      currentSrc: {
        el: ['uploader'],
        label: '更换搜索图标',
        type: 'String',
        value: '',
        director : 'uploader'
      },
      isLeft: {
        label : '搜索图标是否右对齐',
        type : 'Boolean',
        value : false ,
        director : 'switch2'
      },
//      isCenter: {
//        label : '输入框文字是否居中',
//        type : 'Boolean',
//        value : false ,
//        director : 'switch2'
//      },
      borderRadius: {
        label : '输入框是否圆角',
        type: 'Boolean',
        value: true,
        director: 'switch2'
      }
    },
    comName:"搜索框",
    props: {
      bgColor: {
        default: '#f0f0f0',
        type: String
      },
      bdColor: {
        default: '#F7F8F8',
        type: String
      },
      currentSrc: {
        default: '',
        type: String
      },
//      isCenter: {
//        type: Boolean,
//        default: false
//      },
      isLeft: {
        type: Boolean,
        default: false
      },
      borderRadius: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        vaule:""
      }
    },
    onLoad() {
    },
    methods: {
      //点击跳转搜索页
      search: function () {
        wx.redirectTo({
          url: '../search/search',
        })
      },
    }
  }

  export default((obj) => {
    let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
    obj.methods = obj.methods || {}
    Object.keys(obj || {}).forEach(name => {
      if(lifeCycles.indexOf(name) > -1) {
        obj.methods[name] = obj[name]
      }
    })
    obj.methods['onLoad'] = function(...args) {
      wx.setNavigationBarTitle(obj.config && {
          title: obj.config.navigationBarTitleText
        })
      obj['onLoad'] && obj['onLoad'].apply(this, args)
    }
    return obj
  })(_searchBox)
</script>
<style scoped>
  .searchBox{padding: 10px 20px;position: relative;}
  .borderRadius {border-radius: 30px;}
  .searchInput{height: 30px;width: 87%;padding:2px 10px 2px 30px;}
  .isLeft .searchInput{padding:2px 30px 2px 10px;}
  .isLeft .serachBtn{left:87%;right:30px!important;}
  .serachBtn{width: 14px;height:14px;left: 30px;top:20px;position: absolute;}
  .clear:after {height: 0;content: ".";clear: both;display: block;visibility: hidden;}
  .textCenter{text-align: center;}
</style>
