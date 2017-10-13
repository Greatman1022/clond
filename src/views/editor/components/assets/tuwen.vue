<template>
  <wx-view class="classify">
    <wx-view class="lists" v-if="lists.length">
      <wx-view class="item" v-for="(item, index) in lists" :key="index">
        <wx-image class="img" mode="aspectFit" :src="item.cover"/>
        <wx-text class="title">{{item.title}}</wx-text>
        <wx-view class="info">
          <wx-text class="date">{{item.createTime}}</wx-text>
          <wx-view>
            <wx-image class="icon" mode="aspectFit" src="http://image.vdongchina.com/M00/00/15/ZSUkmVlfHh2EYwcZAAAAAISvvMw527.png"/>
            <wx-text class="eyes">{{item.readerNum}}</wx-text>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
    <wx-view v-else class="lists">
      <wx-view class="nolists">请选择图文分类</wx-view>
    </wx-view>
  </wx-view>
</template>
<script>
let _Tuwen= {
  editorConfig: {
    lists: {
      el: ['text', 'color'],
      label: '选择图文分类',
      type: Array,
      value: [],
      director : 'tuwen'
    }
  },
  comName:"图文",
  props: {
      lists: {
        default: '#fff',
        type: Array
      }
  },
  data () {
    return {
      // lists: null
    }
  },
  onLoad () {
    // var that = this
    // wx.request({
    //     url: this.$root.apiServer + this.$root.appid +'/basic/api/imagetext/category/get',
    //     method: 'GET',
    //     header: {
    //         'content-type': 'application/json'
    //     },
    //     success (res) {
    //       if(res.data.success){
    //         that.items = res.data.categorys
    //         that.handler(res.data.categorys[0].cId,0)
    //       }
    //     }
    // })
  },
  methods: {
    // handler (cid,index) {
    //   this.active = index
    //   var that = this
    //   wx.request({
    //       url: this.$root.apiServer + this.$root.appid +'/basic/api/imagetext/select/categoryid',
    //       method: 'POST',
    //       data: {
    //         cId: cid
    //       },
    //       header: {
    //           'content-type': 'application/x-www-form-urlencoded'
    //       },
    //       success (res) {
    //         that.lists = res.data.imageTextList
    //       }
    //   })
    // }
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
})(_Tuwen)
</script>
<style scoped lang="scss">
.classify{
  background: #efeff4;
  padding-bottom: 1px;
}
.navs{
  margin-bottom: 10px;
  .nav{
    display: inline-block;
  }
  .text{
    display: inline-block;
    padding: 0 10px;
    border-bottom: 4px solid transparent;
    margin: 0 9px;
    box-sizing: border-box;
  }
}
.item-box{
    white-space: nowrap;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
}
.item{
  padding: 15px;
  background: #fff;
  margin-bottom: 10px;
}
.img{
  width: 345px;
  height: 170px;
  border-radius: 5px;
  overflow: hidden;
}
.title{
  font-size: 18px;
  color: #3a3a3a;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin: 12px 0;
}
.info{
  display: flex;
  justify-content:space-between;
  font-size: 14px;
  color: #999;
}
.icon{
  width: 15px;
  height: 12px;
  margin-right: 3px;
}
.nolists{
  padding: 30px;
  background: #fff;
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
