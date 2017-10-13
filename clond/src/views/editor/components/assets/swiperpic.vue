<template>
  <wx-scroll-view :scroll-x="true"  class="uploadWrap">
     <wx-view class="upload_Items" v-for="(item, index) in swiperSlides" :key="item.gg">
       <wx-view class="classname" v-on:click.native="itemTapHandler(item.to)" :style="'padding-top:'+paddingt+'px;padding-bottom:'+paddingb+'px;padding-left:'+paddinglr+'px;padding-right:'+ paddingr +'px;'">
         <wx-image class="upload_Item_img" :src="item.url" :style="'height:'+height+'px;width:'+width+'px;'"/>
         <wx-view v-show="openTitle.open" :style="'color:'+openTitle.color+';font-size:'+openTitle.fontSize+'px;width:'+width+'px;text-align:'+openTitle.align" class="sw-title">{{item.desc}}</wx-view>
       </wx-view>
     </wx-view>
 </wx-scroll-view>
</template>
<script>
let _swiperpic = {
  editorConfig: {
    openTitle: {
      label: '开启标题',
      type: Object,
      value: {
        open: true,
        color: "#000",
        fontSize: 14,
        align: 'center'
      },
      director: 'swiperpicTitle'
    },
    swiperSlides: {
      label: '图片填充',
      type: 'slider',
      value: [
        {
          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
          to: '',
          desc: '请输入标题',
          code: ''
        },
        {
          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
          to: '',
          desc: '请输入标题',
          code: ''
        }
      ],
//      director: 'swiperpic'
      director:{'java':'swiperpic','php':'swiperpic2'}
    },
    height: {
      el: ['number'],
      label: '调整图片高度',
      type: 'Number',
      value: '115',
      director: 'Fsize'
    },
    width:{
      el: ['number'],
      label: '调整图片宽度',
      type: 'Number',
      value: '115',
      director: 'Fsize'
    },
    paddingt:{
      el: ['number'],
      label: '调整图片上间距',
      type: 'Number',
      value: '15',
      director: 'Fsize'
    },
    paddingb:{
      el: ['number'],
      label: '调整图片下间距',
      type: 'Number',
      value: '15',
      director: 'Fsize'
    },
    paddinglr:{
      el:['number'],
      label:'图片的左间距',
      type:'Number',
      value:'15',
      director: 'Fsize'
    },
    paddingr:{
      el:['number'],
      label:'图片的右间距',
      type:'Number',
      value:'0',
      director: 'Fsize'
    }
  },
  comName:"滑动导航",
  props:{
    openTitle: {
      type: Object,
      default: function(){
        return {open:true,color:"#f00",fontSize:14,align: 'center'}
      }
    },
    swiperSlides: {
        default: [
          {
            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
            to: '',
            desc: '请输入标题',
            code: ''
          },
          {
            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
            to: '',
            desc: '请输入标题',
            code: ''
          }
        ],
        type: Array
      },
    height:{
      default:'115',
      type:String
    },
    width:{
      default:'115',
      type:String
    },
    paddingt:{
      default:'15',
      type:String
    },
    paddingb:{
      default:'15',
      type:String
    },
    paddinglr:{
      default:'15',
      type:String
    },
    paddingr:{
      default:'0',
      type:String
    }
  },
  methods:{
      itemTapHandler (to) {
      if (!to || typeof to !== 'string') return
      wx.navigateTo({
          url: to
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
})(_swiperpic)
</script>
<style type="text/css" scoped>
.uploadWrap{width:100%; white-space:nowrap;}
.upload_Items{display: inline-block;}
.sw-title{
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
