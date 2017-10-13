<template>
    <wx-swiper v-on:change="swiperChange" :style="'height:' + swiperSlides.height + 'px;'" :indicator-dots= "swiperSlides.open==1"  :indicator-color="swiperSlides.pointColor" :indicator-active-color="swiperSlides.checkedPointColor" :autoplay="autoplay" :interval="interval" :duration="duration" :current="current" :circular="circular">
        <wx-swiper-item v-for="(item, index) in swiperSlides.carouselImgs" :key="item.img" :style="'height:' + swiperSlides.height + 'px;width:100%;'">
            <wx-image mode="scaleToFill" :src="item.fullImg" :style="'height:' + swiperSlides.height + 'px;width:100%;'" v-on:click.native="itemTapHandler(item.link)" class="carousel"/>
        </wx-swiper-item>
    </wx-swiper>
</template>

<script>
let _Slide = {
  editorConfig: {
    value: {
      label :'轮播图列表',
      type: Number,
      value: 0,
      director: 'carousel'
    }
  },
  comName:"后台轮播",
  props: {
    value:{
      default:function(){
        return 0
      },
      type:Number
    },
    //轮播控制
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
        swiperSlides: {}
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
      },
      loadData (id) {
        var that = this
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/api/carousel/single',
            method: 'POST',
            data:{
                id:id
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success (res) {
                that.swiperSlides = res.data.carousel
            }
        })
    }
  },
  onShow () {
    var that = this
    if(that.value == 0){
        wx.request({
            url: this.$root.apiServer + this.$root.appid + '/basic/api/carousel/list',
            method: 'GET',
            header: {
            'content-type': 'application/json'
            },
            success(res) {
                that.loadData(res.data.carousels[0].id)
            }
        })
    }else{
        that.loadData(that.value)
    }
  },
  watch:{
    value(id){
        var that = this
        if(id == 0){
            wx.request({
                url: this.$root.apiServer + this.$root.appid + '/basic/api/carousel/list',
                method: 'GET',
                header: {
                'content-type': 'application/json'
                },
                success(res) {
                    that.loadData(res.data.carousels[0].id)
                }
            })
        }else{
            that.loadData(id)
        }
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
<style scoped>
.carousel{
    vertical-align: top;
}
</style>
