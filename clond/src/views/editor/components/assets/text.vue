<template>
    <wx-view :style="'color: '+ color +';'+ display +';zIndex:' + zIndex + ';paddingTop:'+ spacing[0] + 'px;paddingRight:'+spacing[1] + 'px;paddingBottom:'+ spacing[2] + 'px; paddingLeft:'+ spacing[3] + 'px;'+position" ><wx-rich-text :nodes="text?text:'文本组件'" v-if="text!=''&&text!='<p><br></p>'"></wx-rich-text><wx-text v-else>文本组件</wx-text></wx-view>
</template>
<script>
let _Txt = {
  editorConfig: {
    text: {
      el: ['textarea'],
      label: '请输入文本',
      type: 'String',
      value: '',
      director : 'editor'
    },
    positionxy:{
      label:'位置定位',
      type:'Array',
      value:[],
      director :'positionxy'
    },
    color: {
      el: ['text', 'color'],
      label: '请输入颜色',
      type: 'String',
      value: '#303030',
      director : 'ColorPicker'
    },
    spacing: {
      el: ['number'],
      label: '调整间距',
      type: 'Array',
      value: [0,0,0,0],
      director : 'spacing'
    }
  },
  comName:"文本",
  props: {
    text: {
      default: '文本组件',
      type: String
    },
    color: {
      default: '#303030',
      type: String
    },
    display:{
      default:'block',
      type:String
    },
    position:{
      default:'',
      type:String
    },
    positionxy:Array,
    zIndex :{
      default:null,
      type: Number
    },
    spacing: {
      default:function(){
        return [0,0,0,0]
      },
      type:Array
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
})(_Txt)
</script>
<style scoped>
  .wx-text{
    display: block;
  }
</style>
