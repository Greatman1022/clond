<template>
  <swiper :options="swiperOption" :style="{ height: height + 'px'}">
    <swiper-slide v-for="slide in swiperSlides">
      <img :src="slide.src" alt="" :to="slide.to">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'carouselCom',
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整轮播图整体高度',
      type: String,
      value: '200'
    },
    slideNumber: {
      el: ['number'],
      label: '填写轮播数量[2-5]个',
      type: String,
      value: '2'
    },
    currentSlide: {
      el: ['select'],
      label: '选择轮播页',
      type: String,
      data: [
        {
          id: '1'
        },
        {
          id: '2'
        }
      ],
      value: '1'
    },
    currentSrc: {
      el: ['uploader'],
      label: '上传图片',
      type: String,
      value: ''
    },
    currentTo: {
      el: ['navtor'],
      label: '选择跳转页面',
      type: String,
      value: ''
    }
  },
  computed: {
    ...mapGetters({
      activeCom: 'activeCom'
    })
  },
  data () {
    return {
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      },
      swiperSlides: [
        {
          src: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
          to: ''
        },
        {
          src: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png',
          to: ''
        }
      ]
    }
  },
  watch: {
    slideNumber: function (newVal, oldVal) {
      if (newVal > 1 && newVal < 6) {
        if (newVal > oldVal) {
          for (let i = this.swiperSlides.length; i < newVal; i++) {
            this.swiperSlides.push({src: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png', to: ''})
            this.activeCom.props.currentSlide.data.push({id: i + 1})
          }
        } else {
          this.swiperSlides.splice(newVal, this.swiperSlides.length - newVal)
          this.activeCom.props.currentSlide.data.splice(newVal, this.activeCom.props.currentSlide.data.length - newVal)
        }
      }
    },
    currentSrc: function (newVal) {
      this.swiperSlides[this.currentSlide - 1].src = newVal
    },
    currentTo: function (newVal) {
      this.swiperSlides[this.currentSlide - 1].to = newVal
    }
  },
  props: {
    height: String,
    slideNumber: String,
    currentSrc: String,
    currentSlide: String,
    currentTo: String
  }
}
</script>
<style>
.swiper-container {
  width: 100%;
  height: 320px;
  border: 1px solid #ccc;
}
</style>
