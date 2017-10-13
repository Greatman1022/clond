<template>
    <wx-image class="img" mode="scaleToFill" :style="'height:' + height + 'px;width:'+width+'%;'+position+'z-index:'+zIndex+';paddingTop:'+ spacing[0] + 'px;paddingRight:'+spacing[1] + 'px;paddingBottom:'+ spacing[2] + 'px; paddingLeft:'+ spacing[3] + 'px;'" :src="currentSrc" v-on:click.native="itemTapHandler(currentToNew.to)"/>
</template>

<script>
let _Picture = {
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整图片高度',
      type:'Number',
      value: '315',
      director : 'Fsize',
      tip: '提示:建议高度为300'
    },
    width: {
      el: ['number'],
      label: '调整图片宽度(百分比)',
      type:'Number',
      value: '100',
      director : 'Fsize'
    },
    positionxy:{
      label:'位置定位',
      type:'Array',
      value:[],
      director :'positionxy'
    },
    currentSrc: {
      el: ['uploader'],
      label: '上传图片',
      type: 'String',
      value: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
      director : 'uploader'
    },
    currentToNew: {
      el: ['navtor'],
      label: '选择跳转',
      type : Object,
      newlink:"",
      value : {
          to: '',
          code: ''
      },
      director:{'java':'redirectNew','php':'redirectNewB'}
    },
    spacing: {
      el: ['number'],
      label: '调整间距',
      type: 'Array',
      value: [0,0,0,0],
      director : 'spacing'
    }
  },
  comName:"图片",
  props: {
    currentToNew:{
      type: Object,
      default: function(){
        return {
          to:"",
          code:''
          }
      }
    },
    width :{
      default: '100',
      type :String
    },
    positionxy:Array,
    height: {
      default: '315',
      type: String
    },
    currentSrc: {
      default: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
      type: String
    },
    // currentTo: {
    //   default: '',
    //   type: String
    // },
    position:{
      default:"",
      typeof: String
    },
    zIndex :{
      default:null,
      typeof: Number
    },
    spacing: {
      default:function(){
        return [0,0,0,0]
      },
      type:Array
    }
  },
  methods: {
    itemTapHandler (to) {
      if (!to || typeof to !== 'string') return
      // 自由面板会触发报错，注释掉
      // wx.navigateTo({
      //   url: to
      // })
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
})(_Picture)
</script>

<style>
  .img{
    margin: 0 auto;
    display: block;
    box-sizing: border-box;
  }
</style>
