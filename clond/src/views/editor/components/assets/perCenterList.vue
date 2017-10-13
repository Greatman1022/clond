<template>
<wx-view class="">
  <wx-view class="w-100 nav_lists" v-if ="!all_hidden">
    <wx-view class="w-100 box-s ovfl nav_list bg-wt" v-for="(item,index) in  arr_hidden" v-if="item.is_hidden == 1 " :key="index">
        <wx-navigator :url="item.src" class="w-100 clear1 vd-nav" open-type="navigate" v-if="!item.list">
            <wx-view class="nav ovfl fl-l">
                <wx-view class="collect_image fl-l ">
                    <wx-image class="collect_image_image" :src="item.img_right"></wx-image>
                </wx-view>
                <wx-view class="collect_title fl-l ml20">{{item.title}}</wx-view>
            </wx-view>
            <wx-view class="fl-r img_right">
                <wx-image class="img_right_image" src="https://image.vdongchina.com/M00/00/5F/ZSUkmVmKZjqEXGPoAAAAAKhVnJM603.png"></wx-image>
            </wx-view>
        </wx-navigator>

        <wx-navigator v-for="(list,idx) in  item.list" :url="list.src" class="w-100 clear1 vd-nav" open-type="navigate" v-if="item.list" :key="index">
            <wx-view class="nav ovfl fl-l">
                <wx-view class="collect_image fl-l ">
                    <wx-image class="collect_image_image" :src="list.img_right"></wx-image>
                </wx-view>
                <wx-view class="collect_title fl-l ml20">{{list.title}}</wx-view>
            </wx-view>
            <wx-view class="fl-r img_right">
                <wx-image class="img_right_image" src="https://image.vdongchina.com/M00/00/5F/ZSUkmVmKZjqEXGPoAAAAAKhVnJM603.png"></wx-image>
            </wx-view>
        </wx-navigator>

    </wx-view>
  </wx-view>
  <wx-view class="pTips" v-else>
      中心导航
  </wx-view>
</wx-view>
</template>

<script>
let _perCenterList = {
  editorConfig: {
    arr_hidden: {
      el: ['number'],
      label: '列表显示状态',
      type:'Array',
      value: [{
          title : '全部订单',
          is_hidden : 1,
          src:'../orderList/orderList',
          img_right:'https://image.vdongchina.com/M00/00/5F/ZSUkmVmKgJ6EeffoAAAAACgIqHc015.png'
        },
        {
          title : '购物车',
          is_hidden :1,
          src:'../car/car',
          img_right:'https://image.vdongchina.com/M00/00/60/ZSUkmVmKxK-EBC9lAAAAAAE4uDc448.png'
      }],
      director : 'baseTpl'
    }
  },
  comName:"中心导航",
  data(){
    return {
      all_hidden:false
    }
  },
  props: {
    arr_hidden :{
      default:function(){
        return [
          {
            title : '全部订单',
            is_hidden : 1,
            src:'../orderList/orderList',
            img_right:'https://image.vdongchina.com/M00/00/5F/ZSUkmVmKgJ6EeffoAAAAACgIqHc015.png'
          },
          {
            title : '购物车',
            is_hidden : 1,
            src:'../car/car',
            img_right:'https://image.vdongchina.com/M00/00/60/ZSUkmVmKxK-EBC9lAAAAAAE4uDc448.png'
          }
        ]
      }
    }
  },
  watch:{
    arr_hidden(e){
      for (var i = 0; i < e.length; i++) {
        if(e[i].is_hidden == '1'){
          this.all_hidden = false   //代表显示
          break
        }
        this.all_hidden = true
      }
    }
  },
  methods: {
    // itemTapHandler (to) {
    //   if (!to || typeof to !== 'string') return
    //   wx.navigateTo({
    //     url: to
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
})(_perCenterList)
</script>
<style scoped>
.pTips{
  text-align: center;
  padding-top:15px;
  padding-bottom: 15px;
}
.clear1:after{
  clear: both;
  visibility: hidden;
  overflow: hidden;
  content: "";height: 0;
  display: block;
}
.collect_image {
    /*margin-top: 24rpx;*/

    width: 15px;
    height:49px;
    line-height: 49px;
    box-sizing: border-box;
}
.collect_image_image{
    padding-top: 17px;
    width: 15px;
    height: 15px;
}
.collect_title{
    font-size: 15px;
    color: #111111;
    height: 49px;
    line-height: 49px;
}
.nav{
    height: 49px;
    line-height: 49px;
    justify-content: flex-start;
    align-items:center;
}
.img_right{
    margin-top: 17px;
}
.img_right_image{
    width: 8px;
    height: 16px;
}
.set_image_image{
     padding-top: 15px;
    width: 15px;
    height: 19px;
}
.nav_lists{
  background-color: #f7f7f7
}
.nav_list{
  background-color: #ffffff;
  /*
  margin-bottom: 1px;
  padding-left: 15px;
  padding-right: 15px;*/
}
.vd-nav{
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px solid #f7f7f7;
}

/*commonCSS*/
.ml20{
  margin-left: 10px;
}
.block {
  display: block;
}

.txt-c {
  text-align: center;
}

.ft24 {
  font-size: 12px;
}

.ft26 {
  font-size: 13px;
}

.fl-r {
  float: right;
}
.fl-l {
  float: left;
}


.tc {
  text-align: center;
}
.ovfl {
  overflow: hidden;
}

image {
  width: 100%;
}

.c6 {
  color: #666;
}

.c3 {
  color: #333;
}

.c3c {
  color: #3c3c3c;
}

.c9 {
  color: #999;
}
.cl {
  clear: both;
}

.white {
  color: #fff;
}

.box-s {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.display-flex {
  display: flex !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
}

.display-flex-1 {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}


</style>
