<template>
  <wx-view class="banner-cant">
    <!--顶部背景图-->
    <wx-view
      class="banner"
      :style="'height: ' + bgHeight + 'px;backgroundImage: url(' + indexUserInfoImg + ');backgroundSize: 100% ' + bgHeight + 'px;'"
    ></wx-view>


    <!--
      头像
    -->
    <wx-view
      class="head"
      :style="'height: ' + headImageHeight + 'px;width: ' + headImageHeight + 'px;'"
      v-if="isShowHeadImage"
    >
      <wx-view
        :style="'width: ' + headImageHeight + 'px;height: ' + headImageHeight + 'px;'"
        v-if="isShowHeadImage"
        class="head-img"
      >
        <wx-image
          :style="'width: ' +　headImageHeight + 'px;height: ' + headImageHeight + 'px;'"
          class="image"
          v-if="isShowHeadImage"
          :src="indexUserInfoLogo"></wx-image>
      </wx-view>
    </wx-view>


    <wx-view
      :style="'color: ' + indexUserInfoNameColor + ';font-size: ' + headUserInfoNameSize + 'px;line-height: ' + headUserInfoNameSize + 'px;margin-bottom: 2px'"
      class="text"
      v-if="isShowHeadImage">
      {{indexUserInfoName}}
    </wx-view>
    <!--导航栏 end -->
  </wx-view>
</template>

<script>
  let _Head = {
    editorConfig: {
      bgHeight: {
        el: ['number'],
        label: '调整头像背景图片高度',
        type: 'Number',
        value: '165',
        director: 'Fsize'
      },
      headImageHeight: {
        el: ['number'],
        label: '调整头像图片大小',
        type: 'Number',
        value: '81',
        director: 'Fsize'
      },
      headUserInfoNameSize: {
        el: ['number'],
        label: '调整昵称大小',
        type: 'Number',
        value: '16',
        director: 'Fsize'
      },
      isShowHeadImage: {
        label: '是否显示头像和昵称',
        type: 'Boolean',
        value: true,
        director: 'switch2'
      },
      indexUserInfoImg: {
        el: ['uploader'],
        label: '上传背景图片',
        type: 'String',
        value: 'http://uploads.qusaoba.net/images/66/2017/07/RgGfxHKhf7PNkJjjpngXMGmBl4pZwK.jpg',
        director: 'uploader'
      },
      indexUserInfoLogo: {
        el: ['uploader'],
        label: '上传头像图片',
        type: 'String',
        value: 'http://uploads.qusaoba.net/images/66/2017/06/m6Nv96P9vJ3g30B4cvG3x76Nbx4nNC.png',
        director : 'uploader'
      },
      indexUserInfoName: {
        el: ['input'],
        label: '请输入昵称',
        type: 'String',
        value: '想去购',
        director: 'Input'
      },
      indexUserInfoNameColor: {
        label: '用户名称颜色',
        type: 'String',
        value: 'rgba(255, 255, 255, 1)',
        director: 'ColorPicker'
      }
    },
    comName:"店招",
    props: {
      bgHeight: {
        default: '165',
        type: String
      },
      headImageHeight: {
        default: '81',
        type: String
      },
      headUserInfoNameSize: {
        default: '16',
        type: String
      },
      isShowHeadImage: {
        default: true,
        type: Boolean
      },
      indexUserInfoImg: {
        default: 'http://uploads.qusaoba.net/images/66/2017/07/RgGfxHKhf7PNkJjjpngXMGmBl4pZwK.jpg',
        type: String
      },
      indexUserInfoLogo: {
        default: 'http://uploads.qusaoba.net/images/66/2017/06/m6Nv96P9vJ3g30B4cvG3x76Nbx4nNC.png',
        type: String
      },
      indexUserInfoName: {
        default: '想去购',
        type: String
      },
      indexUserInfoNameColor: {
        default: 'rgba(255, 255, 255, 1)',
        type: String
      }
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
  })(_Head)
</script>

<style scoped>
  .banner-cant {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .banner {
    width: 100%;
    background-repeat: no-repeat;
  }

  .banner2 {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .ss2 {
    opacity: 0.7;
  }


  .head {
    position: absolute;
    top: 15%;
    left: 38%;
    border: 1px solid #fff;
    border-radius: 100%;
    text-align: center;
    padding: 3px;
  }

  .head-img {
    border-radius: 100%;
    overflow: hidden;
  }

  .head-img .image {
    border-radius: 100%;
    background-size: 162px 162px;
  }

  .text {
    position: absolute;
    left: 0;
    bottom: 12%;
    width: 100%;
  }
</style>
