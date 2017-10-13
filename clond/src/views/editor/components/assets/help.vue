<template>
  <wx-view class="wrapper">
    <wx-view class="kefuDiv">
      <wx-view class="kefuText">客服</wx-view>
      <wx-view class="kefuImg">
        <wx-image class="kefuImage" src="http://image.vdongchina.com/M00/01/93/ZSUkmVm3UWKEOq51AAAAAGpZAVo311.png"></wx-image>
      </wx-view>
    </wx-view>
  </wx-view>
</template>

<script>
  let _Help= {
    editorConfig: {

    },
    comName: '客服',
    props: {
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
  })(_Help)
</script>

<style scoped>
  .wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .kefuDiv{
    width: 70px;
    height: 27px;
    background: #E94746;
    border-radius:20px 0 0 20px;
  }
  .kefuImg .kefuImage{
    position:relative;
    top: 3px;
    left: 8px;
    z-index: 20;
    width: 25px;
    height: 20px;
  }

  .kefuText {
    width: 30px;
    height: 27px;
    float: right;
    margin-right: 3px;
    text-align: center;
    line-height: 27px;
    font-size: 12px;
    color: #FFF;
  }
</style>
