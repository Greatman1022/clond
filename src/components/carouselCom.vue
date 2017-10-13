<template>
  <swiper :options="swiperOption" :style="{ height: height + 'px'}">
    <swiper-slide v-for="slide in swiperSlides">I'm Slide {{ slide }}</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: 'carouselCom',
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整轮播图整体高度',
      type: String,
      value: '200'
    }
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
      swiperSlides: [1, 2, 3, 4, 5]
    }
  },
  props: {
    height: String
  },
  mounted () {
    setInterval(() => {
      console.log('simulate async data')
      let swiperSlides = this.swiperSlides
      if (swiperSlides.length < 10) swiperSlides.push(swiperSlides.length + 1)
    }, 3000)
  }
}
</script>
<style scoped>
.swiper-container {
  width: 100%;
  height: 320px;
  border: 1px solid #ccc;
}
</style>
