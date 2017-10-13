<template>
  <div
    :class="navigatorClass"
    @click="handleClick"
    @mousedown="hover"
    @touchstart="hover"
    v-show="!hidden">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    openType: {
      type: String,
      default: 'navigate'
    },
    delta: Number,
    hoverClass: {
      type: String,
      default: 'navigator-hover'
    },
    hoverStartTime: {
      type: Number,
      default: 50
    },
    hoverStayTime: {
      type: Number,
      default: 600
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      navigatorClass: 'wx-navigator'
    }
  },
  methods: {
    hover () {
      this.navigatorClass = (this.hoverClass !== 'none' ? this.hoverClass : '') + ' wx-navigator'
      let blur = () => {
        this.navigatorClass = 'wx-navigator'
        document.removeEventListener('mouseup', blur)
        document.removeEventListener('touchend', blur)
      }
      document.addEventListener('mouseup', blur, false)
      document.addEventListener('touchend', blur, false)
    },
    handleClick () {
      let wx = window.wx
      if (this.openType !== 'navigateBack' && !this.url) {
        console.error('<navigator/> should have url attribute when using navigateTo, redirectTo or switchTab')
        return
      }
      if (this.redirect) {
        wx.redirectTo({ url: this.url })
        return
      }
      switch (this.openType) {
        case 'navigate':
        case 'navigateTo':
          return wx.navigateTo({ url: this.url })
        case 'redirect':
        case 'redirectTo':
          return wx.redirectTo({ url: this.url })
        case 'switchTab':
          return wx.switchTab({ url: this.url })
        case 'navigateBack':
          return wx.navigateBack({ delta: this.delta })
        case 'reLaunch':
          return wx.reLaunch({ url: this.url })
        default:
          return console.error('<navigator/> with invalid openType ' + this.openType)
      }
    }
  }
}
</script>

<style>
.wx-navigator {
    height: auto;
    width: auto;
    display: block;
}
.navigator-hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0.7;
}
</style>
