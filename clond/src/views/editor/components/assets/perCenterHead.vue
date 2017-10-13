<template>
  <wx-view>
    <wx-view class="header" v-if="isdeleted==0">
      <wx-image class="bg_image" :src="headerBgSrc"></wx-image>
      <wx-view class="user_image">
          <wx-view class="circle">
              <wx-image class="user_image_image" :src="logo"/>
          </wx-view>
          <wx-view class="ft36 white w-100 user_name" :style="'color:'+color">{{userName}}</wx-view>
      </wx-view>
    </wx-view>

    <wx-view class="header2" v-if="isdeleted==1">
      <wx-view class="cartInfo box-s" >
          <wx-image class="cartInfoB" :src="cartInfo.backPic"></wx-image>
          <wx-view class='display-flex' :style="'color: '+ cartInfo.fontColor">
              <wx-view v-if="cartInfo.logo">
                  <wx-image class="logo" :src="cartInfo.logo"></wx-image>
              </wx-view>
              <wx-view class='logo' v-else style="'color: '+ cartInfo.fontColor">logo</wx-view>
              <wx-view class='companyName ft24 cf pos-r' :style="'color: '+ cartInfo.fontColor">{{cartInfo.codeName ? cartInfo.codeName:'会员卡名称'}}</wx-view>
              <wx-view class='grade pos-r cf'>
                  <wx-text class='gradeVip' :style="'color: '+ cartInfo.fontColor">VIP</wx-text>
                  <wx-text :style="'color: '+ cartInfo.fontColor">.{{cartInfo.lever?cartInfo.lever:'0'}}</wx-text>
              </wx-view>
          </wx-view>
          <wx-view class='balance cf pos-r'>{{cartInfo.balance}}</wx-view>
          <wx-button class='recharge box-s cf' :style="'color: '+ cartInfo.fontColor" @click="recharge">充值</wx-button>
          <wx-view class='cardNumber ft32 cf pos-r'>
              <wx-text class='display-ib h45' :style="'color: '+ cartInfo.fontColor">{{cartInfo.leverName ? cartInfo.leverName:"普通会员"}}</wx-text>
              <wx-text class='ft24 cf display-ib h45' :style="'color: '+ cartInfo.fontColor">{{cartInfo.codeNum ? cartInfo.codeNum:'xxxxxxxxx'}}(卡号)</wx-text>
          </wx-view>
          <wx-view class='cardNumber ft24 cf pos-r' >
              <wx-text class='display-ib' :style="'color: '+ cartInfo.fontColor">有效期：</wx-text>
              <wx-text class='ft24 cf display-ib ' :style="'color: '+ cartInfo.fontColor">{{cartInfo.deadtime ? cartInfo.deadtime:'xxxx-xx-xx'}}</wx-text>
          </wx-view>
      </wx-view>
    </wx-view>
  </wx-view>
</template>

<script>
let _perCenterHead = {
  editorConfig:{
     headerBgSrc: {
      el: ['uploader'],
      label: '上传背景图片',
      type: 'String',
      value: 'https://image.vdongchina.com/M00/00/5C/ZSUkmVmJXoaEQF8UAAAAACBxOlQ106.png',
      director : 'uploader'
    },
    color: {
      el: ['text', 'color'],
      label: '微信名颜色',
      type: 'String',
      value: '#FFFFFF',
      director : 'ColorPicker'
    },
    isdeleted: {
      type: 'String',
      value: '0',
      director : 'Blank',
      tip: "tips：启用会员卡时修改图片和字体样式无效"
    }
  },
  comName:'中心头部',
  props: {
    headerBgSrc: {
      default: 'https://image.vdongchina.com/M00/00/5C/ZSUkmVmJXoaEQF8UAAAAACBxOlQ106.png',
      type: String
    },
    color:{
      default:'#FFFFFF',
      type:String
    },
    isdeleted: {
      default:'0',
      type:String
    }
  },
  data(){
    return {
      logo:"https://image.vdongchina.com/M00/00/5C/ZSUkmVmJa2OEYDNzAAAAAFt_g9g974.png",
      userName:"微信名",
      cartInfo: {}
    }
  },
  onLoad(){
    var that=this
    wx.getUserInfo({
      success: function(res) {
        if(res.userInfo){
          that.logo = res.userInfo.avatarUrl
          that.userName = res.userInfo.nickName
        }
      }
    })

    wx.request({
        url: this.$root.apiServer+this.$root.appid+'/basic/newMember/applet/view',
        method: 'POST',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success (res) {
          that.cartInfo = res.data.obj
        }
    })
  },
  methods: {
    recharge () {

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
})(_perCenterHead)
</script>

<style scoped>
  .header{
    width: 100%;
    height: 200px;
  }
  .bg_image {
    width: 100%;
    height: 100%;
  }
  .user_image{
    position: absolute;
    width: 100%;
    top: 50px;
    z-index: 99;
  }
  .circle{
    position: relative;
    width: 80px;
    height: 80px;
    top: 0px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
  }
  .user_image_image{
    width: 80px;
    height: 80px;
  }
  .user_name{
    font-size: 16px;
    margin-top: 20px;
    text-align: center;
    color: #ffffff
  }

  .box-s {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
  }

  .cf {
      color: #fff;
  }

  .c3 {
      color: #333;
  }

  .ft24 {
      font-size: 24rpx;
  }

  .ft32 {
      font-size: 32rpx;
  }

  .display-flex {
      display: flex !important;
      display: -webkit-box !important;
      display: -moz-box !important;
      display: -ms-flexbox !important;
      display: -webkit-flex !important;
      height: 25px;
  }

  .pos-r {
      position: relative;
  }

  .pos-a {
      position: absolute;
  }

  .display-ib {
      display: inline-block
  }

  .h45 {
      height: 45rpx;
      line-height: 45rpx;
  }

  .fl-l {
      float: left;
  }

  .fl-r {
      float: right;
  }

  /*会员卡  */

  .header2 {
      padding: 20px 0;
      background: #ffffff;
      margin-bottom: 10px;
  }

  .cartInfo {
      width: 325px;
      height: 183px;
      margin: 0 auto;
      border-radius: 7px;
      background-repeat: no-repeat;
      background-position-y: 100%;
      background-size: 100%;
      position: relative;
      padding: 10px 15px;
  }

  .cartInfoB {
      position: absolute;
      width: 325px;
      height: 183px;
      top: 0;
      left: 0;
      border-radius: 7px;
  }

  .logo {
      width: 25px;
      height: 25px;
      background: #fff;
      border-radius: 50%;
      position: relative;
      line-height: 25px;
      text-align: center;
      font-size: 11px;
      color: #8a37c6;
  }

  .companyName {
      height: 26px;
      line-height: 26px;
      margin-left: 16px;
      width: 190px;
  }

  .grade {
      font-size: 22px;
  }

  .gradeVip {
      width: 160px;
  }

  .gradeVip {
      font-style: italic;
      margin-right: 3px;
  }

  .balance {
      text-align: center;
      font-size: 25px;
      margin-top: 24px;
      height: 35px;
      line-height: 35px;
      font-weight: bold;
  }

  .recharge {
      border: 1px solid #fff;
      border-radius: 2px;
      width: 50px;
      height: 22px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      padding: 0;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      background: rgba(0, 0, 0, 0);
      margin-top: 6px;
      margin-bottom: 10px;
  }

  .cardNumber {
      height: 23px;
      line-height: 23px;
  }

  .ft24.cf.display-ib.h45 {
      margin-left: 4px;
  }
</style>
