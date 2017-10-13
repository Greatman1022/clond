<template>
  <wx-view class="groupKill">
    <wx-view class="kill" :class=" {'kill-border': isPin}" v-if="isMiao">
      <wx-view class="kill_text">
        <wx-view class="kill_text_top">限时秒杀</wx-view>
        <wx-view class="kill_text_bottom">进入查看更多</wx-view>
      </wx-view>
      <wx-view class="kill_image">
        <wx-image
          class='image'
          mode="aspectFit"
          src="../../../../../static/img/time.png">
        </wx-image>
      </wx-view>
    </wx-view>
    <wx-view class="group" v-if="isPin">
      <wx-view class="group_text">
        <wx-view class="group_text_top">精品拼单</wx-view>
        <wx-view class="group_text_bottom">帮您整理好</wx-view>
      </wx-view>
      <wx-view class="group_image">
        <wx-image
          class="image"
          mode="aspectFit"
          src="../../../../../static/img/pintuan.png" >
        </wx-image>
      </wx-view>
    </wx-view>
    <wx-view v-if="!isMiao && !isPin" class="none">提示：如不需要此组件请删除</wx-view>
  </wx-view>
</template>

<script>
  let _pinMiao =  {
    editorConfig: {
      isMiao: {
        label: '是否显示秒杀',
        type: 'Boolean',
        value: true,
        director: 'switch'
      },
      isPin: {
        label: '是否显示拼单',
        type: 'Boolean',
        value: true,
        director: 'switch'
      }
    },
    comName:"拼团&秒杀",
    props: {
      isPin: {
        default: true,
        type: Boolean
      },
      isMiao: {
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
  })(_pinMiao)
</script>

<style scoped>
  .groupKill {
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
  }
  .kill-border {
    border-right: 1px solid #f0f0f0;
  }
  .kill, .group {
    flex-basis: 50%;
    vertical-align: middle;
  }
  .kill .kill_text, .group .group_text{
    padding-left: 10px;
    padding-top: 15px;
    float: left;
  }
  .kill_text_top, .group_text_top{
    line-height: 25px;
    font-size: 15px;
  }
  .kill_text_top {
    color: #e16664;
  }
  .group_text_top {
    color: #fece65;
  }
  .kill_text_bottom, .group_text_bottom {
    line-height: 25px;
    color: #acacac;
    font-size: 12px;
  }
  .kill_image, .group_image {
    width: 50px;
    height: 50px;
    overflow: hidden;
    float: right;
    margin-right: 15px;
    margin-top: 15px;
  }
  .kill_image .image, .group_image .image {
    width: 100%;
    height: 100%;
  }
  .none{
    line-height: 80px;
    text-align: center;
    font-size: 15px;
  }
</style>
