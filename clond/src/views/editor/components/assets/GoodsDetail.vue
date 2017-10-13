<template>
  <wx-view v-if="detail" class="detail">
    <wx-view class="dat_titie">产品描述</wx-view>
    <wx-view class="dat_main"><wx-rich-text :nodes="detail"></wx-rich-text></wx-view>
  </wx-view>
</template>
<script>
let _GoodsDetail = {
  editorConfig: {

  },
  comName:"商品详情",
  props: {

  },
  data () {
    return {
      detail:''
    }
  },
  onLoad (options) {
    if(options){
      var that = this
      wx.request({
        url: this.$root.apiServer+this.$root.appid+'/cloud/public/index.php/shop/Goods/goodsdetail',
        data: {
          uuid: options.id
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success (res) {
          if (res.data.code == '100') {
            that.detail = res.data.data.detail
          }
        },
      })
    }else{
      this.detail = "<img style=\"max-width:100%;\" src=\"http://image.vdongchina.com/M00/00/37/ZSUkmVl66VeEU-y_AAAAAOp2NCY343.png\" title=\"mac.png\" alt=\"mac.png\"/>"
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
})(_GoodsDetail)
</script>
<style scoped>
  .detail{width: 100%;}
  .dat_titie{line-height: 44px;font-size: 16px;padding: 0 5px;border-bottom: 1px solid #e3e3e3;}
  .dat_main{padding: 5px;font-size: 14px;}
</style>
