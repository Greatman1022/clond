<template>
  <div class="wx-scroll-view">
    <div class="wx-scroll-view-wrap" :style="scrollViewStyle" @scroll="handleScroll">
      <div class="wx-scroll-view-wrap">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
const SCROLL_DELTA = 20
export default {
  props: {
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: false
    },
    upperThreshold: {
      type: Number
    },
    lowerThreshold: {
      type: Number
    }
  },
  computed: {
    scrollViewStyle () {
      return {
        overflowX: this.scrollX ? 'auto' : 'hidden',
        overflowY: this.scrollY ? 'auto' : 'hidden'
      }
    }
  },
  data () {
    return {
      _lastScrollTop: 0,
      _lastScrollLeft: 0,
      _lastScrollTime: 0
    }
  },
  methods: {
    handleScroll (e) {
      if (!(e.timeStamp - this._lastScrollTime < SCROLL_DELTA)) {
        this._lastScrollTime = e.timeStamp
        let target = e.target
        if (this.scrollY) {
          let n = this._lastScrollTop - target.scrollTop > 0
          let i = this._lastScrollTop - target.scrollTop < 0
          target.scrollTop <= this.upperThreshold && n && this.$emit('scrolltoupper')
          target.scrollTop + target.offsetHeight + this.lowerThreshold >= target.scrollHeight && i && this.$emit('scrolltolower')
        }
        if (this.scrollX) {
          let o = this._lastScrollLeft - target.scrollLeft > 0
          let r = this._lastScrollLeft - target.scrollLeft < 0
          target.scrollLeft <= this.upperThreshold && o && this.$emit('scrolltoupper')
          target.scrollLeft + target.offsetWidth + this.lowerThreshold >= target.scrollWidth && r && this.$emit('scrolltolower')
        }
        this._lastScrollTop = target.scrollTop
        this._lastScrollLeft = target.scrollLeft
        this.$emit('scroll')
      }
    }
  }
}
</script>

<style>
.wx-scroll-view {
  display: block;
  width: 100%;
}
.wx-scroll-view[hidden] {
  display: none;
}
.wx-scroll-view-wrap {
  position: relative;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
.wx-scroll-view-wrap::-webkit-scrollbar  
{  
    width: 16px;  
    height: 16px;  
    background-color: #F5F5F5;  
} 
  
/*定义滚动条轨道 内阴影+圆角*/  
.wx-scroll-view-wrap::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滑块 内阴影+圆角*/  
.wx-scroll-view-wrap::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #555;  
}  
</style>
