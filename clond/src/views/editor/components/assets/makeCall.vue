<template>
  <wx-view class="makePhoneCall clear" v-on:click.native="makeCall">
    <wx-view class="left clear">
      <wx-image class="phone" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABWRJREFUWAm1l2lMXFUUx5lhZjpSbKYpRaISBa2kpKkLWwshJUBAMSk0FBP9RKJJ20jSkLikaT8Q/VCJxq1NTTR+qX4wwYRWRGtDI5GwgwabYqrVYFvrVibIUphxYPydy9yX+2aepli4yX3n3HP+Z7nnLu89V9K/tOLi4vRIJLItGo3eR78L2CboRpfLtRF+Pd1H99KT6RF0IXQz8FPwU263e3JpaekX6CX6+cHBwd/RJTRXvKSgoKARwxeQb43X3eJ4nARfGRkZ+cD0YyWQl5fnBXCM7PfZAC7XNLKr6K5DJ6FB9Av0MOMQNEr3IV/HeB1UKpQmnfHd0ADdauiPp6amNnd3d0dE6LE0SUnvYtAYG38KPZaSkvJNT0/PnwZmxSwTS0tOTs5bXFxsxriaGE2zs7OyfGqiqgKADiA4Id5Zr9ahoaFDZCozs1pRUVEuTnYGAoGPu7q6/rIUBlNWVhbAeb3H4+kbGBj4zlAltbS0uDs6Ol5HdlDk+H+G5XjfxZpnsuYCXo/wI4RPCiC+5efnd5P9LjDNYN6M18sYX8/h61Uw58BUxmOwl3jt0FowM9AcN49WgLKrr8HvjzcyxrLjpWm6PLI/tU5Tm5agUda/EeEfxLodetTNo5wuJTk0OjrqWFrRr1Zj803h67D4I2a5i/Wvg7l3eHj4LcnQDCQngz1xkGyfom9DJzO7AW7exGkezG3wKfQwmG8Zn8zOzj7R1ta2qDFCZT90dnYeQT9mHUMTILwEh8hpqJLx/20kcjorK6s+PgntzzyGWqYohofJUAWH/xC+j2rYZmIzMAZgJfky6F567cTEhFxsRw2IxTpWQI7TzMzMVVCyOV9jbzxvWayA4eTIxdbEBKa5CzK5jqfjzWUTJrS5ubknEMqxnPb7/S8lAG5SQPAjQGehG7hD9jqZOSbAWa4XMIbtvb298oJRraSkRI7OfzYTEztVn4gBvvY4GSYkwI23AWCZgKlAu1BphYWF5aFQKMhF8vKyJPFJyVsXFhYmwZYa2lPC46uyqqpKltTWEhKgVDUg5K6+4fV6z2o0VdnBLDx007lWayo6L5giLWAJz8CHkPmDweCjWq5pQgIo6mLKs/39/dZ5x8EPIod+H9MnEK3TWAHIEjL7czFwbbyRLYGGhgaZ+WMC4sidNsGsZxuOHuFiaTLlJp+enr4Pu4d5D9hssdPjxzlhtqNvO4asXTVLcAaDRWaRQdDrZgDNo1N24NTNKWPNa4xJ2TcZLOE1ZGJXjt8vtd6WAJvoHZztx9lXzGKXBpm0tLR08/z8vFyz46xvHfskmVfwKcb3+3y+7SybfLAkNHz3gdmJ4m0SUK9kAVlLgNJF3x2zVDs3xtsIu9yPYDO9HP4ywX/GTl7Td/ANKUvo2MDoZbDtAysBylSA5Z1ijTMNTnDGS+sKevmA+ZsewLEcW/k0exrdb1DHho2e1D2EekiDrARwpHf/eRz9pAFOFP17lP4BNtyz6A9At7BkJ52wWob+IklclLERy/ZNqEujM9W2jpRPrgkU6jPOEeAglCoQ/MVYAi0CURWoqKjYBJ8rAtpNJbAMXdmTSmnfD8p/h1irBNhIW2VAhlfYoV8LvxaNqg0SQ+2TcDi8Q2KoBDj7mbGAn69FYO2T4FQ/KleztBx5qAQojbpyUaqyiGKtGkmoGMRSb1mVAB8LP8YC7uaIOF5Aq5EQvisJrK56Yo6JT3UvV1dXX+CnYZxxLlfmF3wPHqcqF+CXViMwvuTzfzvu5NjK7TtWU1MzyA+QGqgYXJU5gOStJX/Ca9kuc2VXcGVfkiC2dwEzT2ONmpFLmTLoaomgt9qWmNyvFOIzftveMN8X/wD2zV2pTnpg7gAAAABJRU5ErkJggg==" alt=""/>
      <wx-view class="zw">一键拨号</wx-view>
    </wx-view>
    <wx-view class="right clear">
      <wx-view class="hm">{{ phoneNumber }}</wx-view>
      <wx-image class="turn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAAXNSR0IArs4c6QAAApxJREFUOBGVlc1rU0EUxfOSl1aChUTddFHowixEVBBEFwVJlRApBFpqEAlqvhfixn+iCxfiRsiHycZgjS6s0ERsa2i7sCBuutWFoAtB0KgQS9Ik/m7ISBJfmpeB4c6bOefMeXfe3Kclk8mSxWKZHBsb84VCoa+MR2pW0MfoZ+r1+jpiMh6piYBf07SPrVbrJHEtn8+7RlHQBJzNZqdwsMVwGpF3DofjcjAY/GVGSBxYwuHwZ6vVOgv5C07OVavVUqFQOGxGoO1AAXO5nLtWq23yPInYptPpvBIIBP6odaPYdqAWOIUPOLkE+RtOLlYqlZVisTiu1o1ijwMFSKfTpxEo048wt0qfTyQSdbXeHXscqIVYLLaLCy/PP+lzjJ+Wy2VdrXdHQwcKgJMLuHhNn0BkmZwEyUlDrUs0dKAAONmBOMdzFZFr5CRL7Nn0QAERQmTbZrPJx7YH+Qaukt0iQwVEJBqNbhAWEKlBjiHyQOalmRIQYDweLyEQYLiPyJ1UKnVP5nveRyaGNS7cVYSeIGJrNpszph0oYcgTjNs8SkDT8GwVuD+y+3V2TjOPjrYUiUTemn4FErcIeVmsQ75PTu7KBqYESJgf4nPwdsgPId8WsrShAplMxtdoNF6AHYf8iO8iRmy12cMEsD3Lzqv0Q2Afs/NNyE1FljjwFEjYDMSXHfIzl8t1q58sAoavAPk84DXIcolW3G73osfj2RdCf/vPAeSzkF51yCVuYGAQWcR6BCCfYk6ur5O4YbfbF7i+NQEOav8ESNgJQOv0ozjYJvopcXuDiGq+nQOO6jhHtcWkFNMdrq+Xr+y3Ah0UrVTiachvOuT32PeZJYuwThmXojnFzrtUZC93X+qg6aZD/AT6h67r8/xgvptmdoB/ATo3C+Y5jaOIAAAAAElFTkSuQmCC" alt=""/>
    </wx-view>
  </wx-view>
</template>

<script>
let _makeCall = {
  editorConfig: {
    phoneNumber: {
      el: ['textarea'],
      label: '请输入电话号码',
      type: 'String',
      value: '123456789123',
      director : 'Input'
    }
  },
  comName:"一键拨号",
  props: {
    phoneNumber: {
      default: '123456789123',
      type: String
    }
  },
  methods: {
    makeCall() {
      wx.makePhoneCall({
        phoneNumber: this.phoneNumber
      })
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
})(_makeCall)
</script>

<style scoped="scoped">
.makePhoneCall{
  height: 1.68421rem;
  margin: 0.26316rem;
  line-height: 1.57895rem;
  font-size: 0.84211rem;
  color: #666666
}
.clear::after{
  display: block;
  clear: both;
  content: "";
  height: 0;
  overflow: hidden;
  visibility: hidden
}
.left{
  float: left;
}
.right{
  float: right;
}
.phone{
  width: 1.05263rem;
  height: 1.05263rem;
  margin: 0.21053rem;
  float: left;
}
.turn{
  width: 0.52632rem;
  height: 0.97368rem;
  margin: 0.34211rem 0.15789rem 0.26316rem 0.15789rem;
  float: right;
}
.zw{
  display: inline-block;
  margin-left: 0.52632rem;
  float: left;
}
.hm{
  display: inline-block;
  margin-left: 7.36842rem;
  float: left;
}
</style>
