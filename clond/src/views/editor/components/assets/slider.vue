<template>
    <wx-swiper v-on:change="swiperChange" :style="'height:' + height + 'px'" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval" :duration="duration" :current="current" :circular="circular">
        <wx-swiper-item v-for="(item, index) in swiperSlides" :key="item.url">
            <wx-image :style="'height:' + height + 'px;width:100%'"  :src="item.url" v-on:click.native="itemTapHandler(item.to)"/>
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
      director: 'Fsize',
      tip: '提示:建议高度为300'
    },
    indicatorDots: {
      label : '是否显示面板指示点',
      type : 'Boolean',
      value : true ,
      director : 'switch2'
    },
    indicatorColor:{
      label:'轮播指示点颜色',
      type:'String',
      value:'rgba(0, 0, 0, .3)',
      director: 'ColorPicker'
    },
    indicatorActiveColor:{
      label:'轮播选中的指示点颜色',
      type :'String',
      value : '#000000',
      director : 'ColorPicker'
    },
    swiperSlides: {
      el: ['slider'],
      label: '图片填充',
      type: 'slider',
      value: [
        {
          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
          to: '',
          code: ''
        },
        {
          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png',
          to: '',
          code: ''
        }
      ],
//      director: 'slider'
      director:{'java':'slider','php':'sliderSearch'}
    }
  },
  comName:"轮播图",
  props: {
      height: {
        default: '315',
        type:String
      },
      swiperSlides: {
        default: [
          {
            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
            to: '',
            code: ''
          },
          {
            url: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
            to: '',
            code: ''
          }
        ],
        type: Array
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
