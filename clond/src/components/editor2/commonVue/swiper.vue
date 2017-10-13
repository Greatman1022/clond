<template>
  <x-swiper :options="swiperOption" ref="swiper">
    <slot></slot>
    <div ref="pagination" class="swiper-pagination" slot="pagination" v-if="indicatorDots"></div>
  </x-swiper>
</template>

<script>
import { swiper } from '@/vendor/vue-awesome-swiper'
export default {
  props: {
    indicatorDots: {
      type: Boolean,
      default: false
    },
    indicatorColor: {
      type: String,
      default: 'rgba(0, 0, 0, .3)'
    },
    indicatorActiveColor: {
      type: String,
      default: '#000000'
    },
    vertical: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
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
      default: false
    }
  },
  data () {
    let that = this
    return {
      swiperOption: {
        autoHeight: true,
        initialSlide: this.current,
        autoplay: this.autoplay ? this.interval : 0,
        autoplayDisableOnInteraction: false,
        direction: this.vertical ? 'vertical' : 'horizontal',
        speed: this.duration,
        pagination: this.indicatorDots ? '.swiper-pagination' : '',
        paginationClickable: true,
        simulateTouch: true,
        onSlideChangeEnd (swiper) {
          that.$emit('change', {
            detail: {
              current: swiper.activeIndex
            }
          })
        },
        onSlideChangeStart (swiper) {
          that.setBulletsColor(swiper)
        },
        onInit (swiper) {
          that.setBulletsColor(swiper)
        }
      }
    }
  },
  methods: {
    setBulletsColor (swiper) {
      let bulletSize = swiper.bullets.length
      let bullet = null
      for (let i = 0; i < bulletSize; i++) {
        bullet = swiper.bullets[i]
        bullet.style.backgroundColor = i === swiper.activeIndex ? this.indicatorActiveColor : this.indicatorColor
      }
    }
  },
  components: {
    XSwiper: swiper
  }
}
</script>

<style>
</style>
