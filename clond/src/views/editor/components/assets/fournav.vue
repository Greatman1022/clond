<template>
    <wx-view :style="'background:' + bgColor" class="navs">
      <wx-view class="item" v-for="(item, index) in navs" :key="item.url">
        <wx-view v-if="active==index">
          <wx-image
          :src="item.activeUrl"
          :style="'height:' + size + 'px; width:' + size +'px'"/>
          <wx-text :style="'color:'+activeColor">{{item.text}}</wx-text>
        </wx-view>
        <wx-view v-else>
          <wx-image
          :src="item.url"
          :style="'height:' + size + 'px; width:' + size +'px'"/>
          <wx-text :style="'color:'+color">{{item.text}}</wx-text>
        </wx-view>
      </wx-view>
    </wx-view>
</template>
<script>
let _fourNav = {
  editorConfig: {
    fixed:{
      label:'导航位置',
      type:'String',
      value:'bottom',
      director:'radio2',
      tip: '提示：此组件不可编辑'
    },
  },
  comName:"想去购专用导航",
  props: {
      fixed: {
        default: 'bottom',
        type: String
      },
      bgColor: {
        default: '#ffffff',
        type: String
      },
      color: {
        default: '#000',
        type: String
      },
      activeColor: {
        default: '#38adff',
        type: String
      },
      size: {
        default: '25',
        type:String
      },
      navs: {
        default:function(){
          return [
          {
            text: '首页',
            url: 'http://image.vdongchina.com/M00/00/59/ZSUkmVmISd-EL-ZXAAAAAKfymkI463.png',
            activeUrl: 'http://image.vdongchina.com/M00/00/59/ZSUkmVmISeqEDRhTAAAAAMCWRrE301.png',
            to: '',
            code: ''
          },
          {
            text: '分类',
            url: 'http://image.vdongchina.com/M00/01/0B/ZSUkmVmlVdKEXqpkAAAAAGCzmgY025.png',
            activeUrl: 'http://image.vdongchina.com/M00/01/0B/ZSUkmVmlVdyEVl9ZAAAAAMCWRrE704.png',
            to: '',
            code: ''
          },
          {
            text: '购物车',
            url: 'http://image.vdongchina.com/M00/00/59/ZSUkmVmISe6EDmrrAAAAAJxHVl4880.png',
            activeUrl: 'http://image.vdongchina.com/M00/00/59/ZSUkmVmISfGECob8AAAAAB7R5lE263.png',
            to: '',
            code: ''
          },
          {
            text: '我的',
            url: 'http://image.vdongchina.com/M00/00/59/ZSUkmVmISfmEKZCJAAAAAMJdhpg603.png',
            activeUrl: 'http://image.vdongchina.com/M00/00/59/ZSUkmVmISfyEWFv_AAAAAJ4XaYs055.png',
            to: '',
            code: ''
          }
        ]
        },
        type: Array
      }
  },
  data () {
    return {
      active: null
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
})(_fourNav)
</script>
<style lang="scss" scoped>
  .navs{
    padding: 10px;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    display: flex;
    .item{
      flex: 1;
      text-align: center;
    }
    .wx-text{
      display: block;
    }
  }
  .txt-c{
    text-align:center;
    font-size:16px;
    padding:10px;
  }
  .com-tools>button {
    display: none !important;
  }

</style>
