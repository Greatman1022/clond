<template>
  <div
    class="wx-image"
    :background-size="backgroundSize"
    :background-position="backgroundPosition"
    :background-repeat="backgroundRepeat"
    >
    <div :style="styles"></div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    mode: {
      type: String,
      default: 'scaleToFill'
    },
    backgroundSize: String,
    backgroundPosition: String,
    backgroundRepeat: String
  },
  data () {
    return {
      _img: null
    }
  },
  computed: {
    styles () {
      let styleStr = ''
      let imgSrc = this.src
      if (imgSrc) {
        if (!(this._img && this._img instanceof Image)) {
          this._img = new Image()
          // TODO: img事件监听
          this._img.src = imgSrc
        }
        styleStr = 'background-image: url(' + imgSrc + ');' + this.modeStr
      }
      return styleStr
    },
    modeStr () {
      let backgroundSize = '100% 100%'
      let backgroundPosition = '0% 0%'
      let backgroundRepeat = 'no-repeat'
      switch (this.mode) {
        case 'scaleToFill':
          backgroundSize = '100% 100%'
          break
        case 'aspectFit':
          backgroundSize = 'contain'
          backgroundPosition = 'center center'
          break
        case 'aspectFill':
          backgroundSize = 'cover'
          backgroundPosition = 'center center'
          break
        case 'widthFix':
          backgroundSize = '100% 100%'
          break
        case 'top':
          backgroundPosition = 'top center'
          break
        case 'bottom':
          backgroundPosition = 'bottom center'
          break
        case 'center':
          backgroundPosition = 'center center'
          break
        case 'left':
          backgroundPosition = 'center left'
          break
        case 'right':
          backgroundPosition = 'center right'
          break
        case 'top left':
          backgroundPosition = 'top left'
          break
        case 'top right':
          backgroundPosition = 'top right'
          break
        case 'bottom left':
          backgroundPosition = 'bottom left'
          break
        case 'bottom right':
          backgroundPosition = 'bottom right'
      }

      // 样式优先级：组件属性 > mode > style & class
      backgroundSize = this.backgroundSize || backgroundSize
      backgroundPosition = this.backgroundPosition || backgroundPosition
      backgroundRepeat = this.backgroundRepeat || backgroundRepeat

      return 'background-repeat:' + backgroundRepeat + ';background-size:' + backgroundSize + ';background-position:' + backgroundPosition
    }
  }
}
</script>

<style>
.wx-image {
    width: 320px;
    height: 240px;
    display: inline-block;
    overflow: hidden;
}

.wx-image[hidden] {
    display: none;
}

.wx-image > div {
    width: 100%;
    height: 100%;
}

.wx-image > img {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    display: block;
}
</style>
