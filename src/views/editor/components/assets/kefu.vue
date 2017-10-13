<template>
  <wx-button open-type="contact" class="kefu">
    <wx-image class="img" mode="aspectFit" :style="'height:' + height + 'px;width:'+width+'px'" :src="currentSrc"/>
  </wx-button>
</template>

<script>
let _Kefu = {
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整图片高度',
      type:'Number',
      value: '55',
      director : 'Fsize'
    },
    width: {
      el: ['number'],
      label: '调整图片宽度',
      type:'Number',
      value: '55',
      director : 'Fsize'
    },
    currentSrc: {
      el: ['uploader'],
      label: '上传图片',
      type: 'String',
      value: 'http://image.vdongchina.com/M00/00/35/ZSUkmVl6l06ELLCrAAAAALKZXAc823.png',
      director : 'uploader'
    }
  },
  comName:"客服",
  props: {
    width :{
      default: '55',
      type :String
    },
    height: {
      default: '55',
      type: String
    },
    currentSrc: {
      default: 'http://image.vdongchina.com/M00/00/35/ZSUkmVl6l06ELLCrAAAAALKZXAc823.png',
      type: String
    }
  },
  methods: {

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
})(_Kefu)
</script>

<style scoped>
  .kefu{
    background: rgba(0,0,0,0);
  	border:none;
  	margin: 0;
  	padding: 0;
    z-index: 999;
    border-radius: 0;
  }
  .kefu::after{
 		content: none;
 	}
  .img{
    margin: 0 auto;
    display: block;
  }
</style>
