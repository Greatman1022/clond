<template>
  <swiper-slide>
    <slot></slot>
  </swiper-slide>
</template>

<script>
import { swiperSlide } from '@/vendor/vue-awesome-swiper'
export default {
  components: {
    swiperSlide
  }
}
</script>

<style>
</style>
