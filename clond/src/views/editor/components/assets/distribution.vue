<template>
    <wx-view class="wrapper" v-if="isFenxiao">
      <wx-view class="distributionDiv">
        <wx-view class="distributionText">分销</wx-view>
        <wx-view class="distributionImg">
          <wx-image class="distributionImage" src="../../../../../static/img/distributioncenter.png"></wx-image>
        </wx-view>
      </wx-view>
    </wx-view>
</template>

<script>
  let _Distribution= {
    editorConfig: {
//      isFenxiao: {
//        label: '是否显示分销',
//        type: 'Boolean',
//        value: true,
//        director: 'switch'
//      }
    },
    comName: '分销功能',
    props: {
      isFenxiao: {
        default: true,
        type: Boolean
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
  })(_Distribution)
</script>

<style scoped>
  .wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .distributionDiv{
    width: 70px;
    height: 27px;
    background: #E94746;
    border-radius:20px 0 0 20px;
  }
  .distributionImg .distributionImage{
    position:relative;
    top: 0;
    left: 8px;
    z-index: 20;
    width: 30px;
    height: 27px;
  }

  .distributionText {
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
