<template>
  <wx-view class="ui-video">
    <wx-video style="width: 100%;" :src="url" class="video"/>
    <wx-image :src="poster" class="poster"/>
    <wx-image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAArlBMVEXX19fQ0NDW1tb////T09PS0tLW1tYAAADX19fR0dHe3t7i4uL////T09PT09PZ2dn////W1tbT09Po6Ojs7Oz////w8PD////////i4uLg4ODp6enl5eXf39/////////////29vb19fXz8/Pq6urf39/////////g4ODd3d3////////////////////5+fn////////////////////z8/P////////5+fn7+/tADHeGAAAAN3RSTlNNLEPbPzhHAE4xYW/+Oz1Q7Eo1krH63jSzeGubgmfEZwj889KfbPQjale4Fz5G0NwsnaCBfr8E+12dhgAAAjNJREFUSMel1ml7ojAQAOBJIDTBDSCHQMH7aLWHvXyG/v8/trq7LMKAVp2v8DIkmUwCdyTiz8TwIsTIM5LPmD5vkvh9hcUgDPI0zYNwUODqPT5JXl5xltlcKaEdRwuluJ3N8PWlkzyMcL70lWnB/7BM5S/nOHpoJ2OcDZnuS6iF7Gs2nOG4jSQYKAEVqBAIFWBCyMQobFZlaGZidmFM6mTiFVzJUlAjFS+8SY0YhSNcOBGucArjmCTfnAhi+HdSkTHaighilI3jkjxhxiScDckyfPpHRlNm/YRYbDr6S55xKI6F5LzDiCE+/yHGgNU/tl6LjhViA+NA3vBRH79guQZmwmkzUj/i2558TP0+HIXTwxC3a9WWqO9PP/YkWqjaQ7OHruth7pvUSLWI7iBG24QGWTK9wLn0gSDTxhi+Cm41yb1pqWGEqeJNY/HiCzYDBZSAFGaIO4vsBjXYgBG2EpBc9fBXT1myTkIDvEC0EpDgWzsMTV4zIvAgynU7OSTy02Lr1oaq8wgwdboISM12jQl1UjxBZF/ZHqalqEjnj0lHZzh3fZCNH+sa/j7FeouBMEtQDb9jkqXpB2WhkUluW8qlo+QcF1ofAFnK1oKxWY6eXa4iKRhSlk66egwxNMsUtCxp8duIq/sqBSl+usWAZ2G/Kke6xehGlqBFlYJuZNIuSJB2QZoSCdKULm59VzTYy9v45YfF5UfSFQffDcdrGZszh/jtV4XzF5KLrz23Xq6uuML9Bn/rUTH81g3uAAAAAElFTkSuQmCC" class="icon"/>
  </wx-view>
</template>
<script>
let _Movie = {
  editorConfig: {
    url: {
      el: ['text'],
      label: '请输入视频地址',
      type: String,
      value: 'http://video.vdongchina.com/vdong',
      director : 'Input',
      tip:'<a href="http://note.youdao.com/noteshare?id=f6ec5857fb603ced46d199aaf79d7d42" target="_blank">如何获取视频地址?<i class="el-icon-information ml10"></i></a>'
    },
    poster: {
      el: ['uploader'],
      label: '替换视频封面',
      type: String,
      value: 'https://image.vdongchina.com/M00/00/42/ZSUkmVl_6nGEcd7cAAAAALxCc6s588.png',
      director : 'uploader',
      tip: "推荐视频封面尺寸750*450"
    }
  },
  comName:"视频",
  props: {
    url: {
      default: 'http://video.vdongchina.com/vdong',
      type: String
    },
    poster: {
      default: 'https://image.vdongchina.com/M00/00/42/ZSUkmVl_6nGEcd7cAAAAALxCc6s588.png',
      type: String
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
})(_Movie)
</script>
<style scoped>
.ui-video{
  position: relative;
}
.ui-video .video{
  vertical-align: top;
}
.ui-video .poster{
  width: 100%;
  height: 225px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.ui-video .icon{
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  z-index: 2;
}
</style>
