<template>
  <wx-view v-if="isYouhui">
      <wx-view class="getCoupons">
        <wx-view class="icon">券</wx-view>
        <wx-view class="classname">领取店铺折扣券</wx-view>
      </wx-view>
  </wx-view>
</template>

<script>
let _Discount = {
  editorConfig: {
//    isYouhui: {
//      label: '是否显示优惠券',
//      type: 'Boolean',
//      value: true,
//      director: 'switch'
//    }
  },
  comName: '优惠券',
  props: {
    isYouhui: {
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
})(_Discount)

</script>

<style scoped>
/* 优惠券入口 start */
.getCoupons{
  background: #e94746;
  font-size: 18px;
  height: 48px;
  line-height: 48px;
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 1px;
}
.getCoupons .icon{
  background: #ffc862;
  color:#e94746;
  width: 22px;
  height: 22px;
  text-align: center;
  padding: 2px;
  line-height: 22px;
  margin-top: 11px;
  margin-right: 20px;
  border-radius: 3px;
}
</style>
