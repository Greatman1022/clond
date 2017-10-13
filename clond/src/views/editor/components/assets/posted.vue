<template>
  <wx-view class="posted" @click="posted()" style="width:55px; height:55px;" v-if="communityToggle && flag == 1">
    <wx-image class="posted_img" src="../../../../../static/img/fatie.png" style="width:49px; height:49px;" mode="aspectFit"/>
  </wx-view>
</template>

<script>
let _posted = {
  editorConfig: {

  },
  comName:"评论",
  props: {

  },
  methods: {
    posted() { //发帖
        wx.navigateTo({
            url: '../posted/posted',
        })
    }
  },
  data() {
      return {
          communityToggle:true,//判断是否有社区功能
          flag:""
      }
  },
  onLoad() {
    var that = this
    // that.communityToggle = true
    // let hostname = window.location.host.replace('cloud', 'gw')
    // var hostname = this.$root.apiServer
    // var typenet
    // if(hostname.indexOf("test") > 0){
    //     typenet = "/basic"
    // }else{
    //     typenet = "/guard"
    // }
    wx.request({
      url: this.$root.apiServer + this.$root.appid + '/basic/community/app/special/getSpecial',
      method:'GET',
      data: {
          cloudAppId:this.$root.appid
      },
      header:{
          'content-type': 'application/json'
      },
      success(res){
        // console.log(res)
        if(res.statusCode == "200"){
            if (res.data.object.examine == 2) {
                that.communityToggle = true
                that.flag = 1
            } else {
                that.communityToggle = false
                that.flag = 2
            }
        }else{
            that.communityToggle = true
            that.flag = 1
        }
      }
    })
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
})(_posted)
</script>

<style scoped>
  .posted{
    background: rgba(0,0,0,0);
  	border:none;
  	margin: 0;
  	padding: 0;
    z-index: 999;
    border-radius: 0;
  }
  .posted::after{
 		content: none;
 	}
  .posted_img{
    margin: 0 auto;
    display: block;
  }
</style>
