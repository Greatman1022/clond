<template>
  <wx-view class="swiper-container_slider">
    <wx-swiper v-on:change="swiperChange" :style="'height:' + height + 'px;'" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval" :duration="duration" :current="current" :circular="circular">
      <wx-swiper-item v-for="(item, index) in swiperSlides" :key="item.url">
        <wx-image :style="'height:' + height + 'px;width:100%'"  :src="item.thumb_url || item.url"/>
      </wx-swiper-item>
    </wx-swiper>
  </wx-view>
</template>

<script>
  let _Slide = {
    editorConfig: {
      height: {
        el: ['number'],
        label: '调整轮播图整体高度',
        type: 'Number',
        value: '225',
        director: 'Fsize'
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
    },
    comName: '普通轮播',
    props: {
      height: {
        default: '225',
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
    data () {
      return {
        swiperSlides : [
          {
            url: 'http://uploads.qusaoba.net/images/ewei_shop/66/2017/03/stiW4zmW2m4UTUwI9299MN4TY41i43.jpg',
            to: ''
          },
          {
            url: 'http://uploads.qusaoba.net/images/66/2017/04/X6quv4Z6Z6Juj4sqZQKuSU6uvW6yhM.jpg',
            to: ''
          }
        ]
      }
    },
    /**    请求轮播图数据   **/
    onLoad (options) {
      let that = this
      if(this.$root.globalData){
        wx.request ({
          url: this.$root.apiServer + this.$root.appid + '/cloud/public/index.php/shop/Flexslider/getlist',
          data: {
            uniacid: 2,
            goodsid: options.id
          },
          method: 'POST',
          header: {
            "Content-Type": "application/json"
          },
          success (res) {
            if(res.data.data){
              that.swiperSlides = res.data.data.thumb_url
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
        wx.redirectTo({
          url: to
        })
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
  })(_Slide)
</script>
<style scoped>

</style>
