<template>
  <wx-view class="swiper-container_slider">
    <!--<wx-view class="serrchhead_slider">-->
      <!--<wx-navigator url="../search/search">-->
        <!--<wx-view class="search-box_slider">-->
          <!--<wx-view class="serrch_slider">-->
            <!--<wx-view class="input_slider">在店内搜索</wx-view>-->
            <!--<wx-view class="serrchimg_slider">-->
              <!--<wx-image-->
                <!--class="serrchimg_thumb_slider"-->
                <!--src="http://uploads.qusaoba.net/temp/demo/shop/v2.0/image/search.png"></wx-image>-->
            <!--</wx-view>-->
          <!--</wx-view>-->
        <!--</wx-view>-->
      <!--</wx-navigator>-->
    <!--</wx-view>-->

    <wx-swiper v-on:change="swiperChange" :style="'height:' + height + 'px;'" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval" :duration="duration" :current="current" :circular="circular">
      <wx-swiper-item v-for="(item, index) in swiperSlides" :key="item.url">
        <wx-image :style="'height:' + height + 'px;width:100%'"  :src="item.thumb" v-on:click.native="itemTapHandler(item.to)"/>
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
        director : 'switch'
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
        swiperSlides : []
      }
    },
    /**    请求轮播图数据   **/
    onLoad () {
      let that = this
      wx.request ({
      url: this.$root.apiServer + this.$root.appid + '/cloud/public/index.php/shop/Flexslider/getlist',
      data: {
        uniacid: 2,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success (res) {
        if(res.data.data){
          that.swiperSlides = res.data.data
        }
      }
    })
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
    comName: '轮播'
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
  .serrchhead_slider {
    width: 375px;
    padding: 0;
    margin: 0;
    height: 60px;
    position: absolute;
    z-index: 1000;
  }

  .search-box_slider {
    width: 345px;
    height: 40px;
    margin: 10px 15px;
    line-height: 40px;
    display: inline-block;
  }

  .serrch_slider {
    font-size: 14px;
    color: #999;
    width: 250px;
    margin: 0 auto;
    opacity: 0.5;
  }

  .serrchimg_slider {
    width: 15px;
    height: 15px;
    top: 20px;
    left: 140px;
    position: absolute;
    z-index: 1000;
  }

  .serrchimg_slider .serrchimg_thumb_slider {
    width: 100%;
    height: 100%;
    display: block;
  }

  .serrch_slider .input_slider {
    text-align: center;
    padding-left: 30px;
    height: 34px;
    line-height: 34px;
    border-radius: 20px;
    background: #fff;
    font-size: 15px;
  }

  .swiper-container_slider {
    position: relative;
  }
</style>
