<template>
    <wx-swiper v-on:change="swiperChange" :style="'height:' + height + 'px'" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval" :duration="duration" :current="current" :circular="circular">
        <wx-swiper-item v-for="(item, index) in swiperSlides" :key="item.url">
            <wx-image :style="'height:' + height + 'px;width:100%'"  :src="item.url" />
        </wx-swiper-item>
    </wx-swiper>
</template>

<script>
let _Slide = {
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整轮播图整体高度',
      type: 'Number',
      value: '315',
      director: 'Fsize'
    },
    indicatorDots: {
      label : '是否显示面板指示点',
      type : 'Boolean',
      value : true ,
      director : 'switch2'
    },
    indicatorColor:{
      label:'轮播点颜色',
      type:'String',
      value:'rgba(213,43,136,1)',
      director: 'ColorPicker'
    }
  },
  comName:"高级轮播图",
  data(){
  	return {
  		swiperSlides: [
	          {
	            url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
	            to: ''
	          },
	          {
	            url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
	            to: ''
	          }
	        ]
  	}
  },
  props: {
      height: {
        default: '315',
        type:String
      },
      indicatorDots: {
          type: Boolean,
          default: true
      },
      indicatorColor: {
          type: String,
          default: 'rgba(225, 8, 37, 1)'
      },
      indicatorActiveColor: {
          type: String,
          default: '#ffffff'
      },
      autoplay: {
          type: Boolean,
          default: true
      },
      current: {
          type: Number,
          default: 0
      },
      interval: {
          type: Number,
          default: 5000
      },
      duration: {
          type: Number,
          default: 500
      },
      circular: {
          type: Boolean,
          circular: false
      }
  },
	onLoad (options) {
	  var app = this.$root
	  if(app.globalData){
	    var that = this
	    this.version = app.globalData.appName
	    wx.request({
	      url: this.$root.apiServer+ this.$root.appid + '/basic/api/product/uuid',
	      data: {
	        uuid: options.id
	      },
	      method: 'GET',
	      header: {
	        'content-type': 'application/json'
	      },
	      success (res) {
	        if (res.data.code == '100') {
	          that.swiperSlides = res.data.data.bannerImgs
	        }
	      }
	    })
	  }
	},
  methods: {
      swiperChange (e) {
          this.$emit('change', e)
      },
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
})(_Slide)
</script>
