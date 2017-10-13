<template>
  <wx-view class="box">
    <!--顶部背景图-->
    <wx-view
      class="head_bg"
      :style="'px;backgroundImage: url(' + bgImg + ');'"
    >
    </wx-view>
    <!--顶部背景色-->
    <wx-view
      class="head_bg_color"
      :style="'backgroundColor: '+ bgColor + ';'"
    >
    </wx-view>
    <!--头像-->
    <wx-view
      class="head">
      <wx-view class="head-img">
        <wx-image class="image"
          :src="logo"></wx-image>
      </wx-view>
    </wx-view>
    <!--用户名称-->
    <wx-view class="text">{{userName}}</wx-view>
  </wx-view>
</template>

<script>
  let _personalHead={
      editorConfig:{
        bgColor: {
          el: ['text', 'color'],
          label: '背景颜色',
          type: 'String',
          value: 'transparent',
          director : 'personalBackgroundColorSet'
        },
        bgImg:{
            el:['personalBackgroundImageSet'],
            label:'背景图片',
            type:'String',
            value:'http://uploads.qusaoba.net/images/66/2017/07/RgGfxHKhf7PNkJjjpngXMGmBl4pZwK.jpg',
            director:'personalBackgroundImageSet'
          },
      },
      comName:"背景",
    props:{
      bgColor: {
        default: 'transparent',
        type: String
      },
      bgImg:{
        default:'http://uploads.qusaoba.net/images/66/2017/07/RgGfxHKhf7PNkJjjpngXMGmBl4pZwK.jpg',
        type:String,
      },
    },
    data(){
      return {
        logo:"https://image.vdongchina.com/M00/00/5C/ZSUkmVmJa2OEYDNzAAAAAFt_g9g974.png",
        userName:"微信名"
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
    },
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
  })(_personalHead)

</script>

<style scoped>
  .box{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    text-align: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
  .head_bg{
    width:100%;
    height: 220px;
    -webkit-background-size:;
    background-size:100% 100%;
    background-repeat: no-repeat;
  }
  .head_bg_color{
    width:100%;
    height:220px;
    z-index: 5;
    position: absolute;
    top:0;
    left:0;
  }
  .head {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 15%;
    left: 38%;
    border: 1px solid #fff;
    border-radius: 100%;
    text-align: center;
    padding: 3px;
    z-index: 6;
  }
  .head-img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    overflow: hidden;
  }
  .head-img .image {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background-size: 162px 162px;
  }
  /*用户名start*/
  .text {
    color: rgba(255, 255, 255, 1);
    font-size:14px;
    line-height:25px;
    width: 100%;
    height: 0px;
    -webkit-transform: translateY(-90px);
    -moz-transform: translateY(-90px);
    -ms-transform: translateY(-90px);
    -o-transform: translateY(-90px);
    transform: translateY(-90px);
  }
  /*用户名end*/

</style>
