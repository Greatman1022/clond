<template>
  <canvas class="wx-canvas" :id="canvasId" ref="canvasEl"></canvas>
</template>

<script>
export default {
  props: {
    canvasId: String,
    disableScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    let res = {
      detail: {
        errMsg: 'canvas-id canvas in this page has already existed'
      }
    }
    if (this.canvasId) {
      let el = document.getElementById(this.canvasId)
      if (el) {
        this.$emit('error', res)
        this.$destroy()
      }
    } else {
      res.detail.errMsg = 'canvas-id attribute is undefined'
      this.$emit('error', res)
      this.$destroy()
    }
  }
}
</script>

<style>
.wx-canvas {
    width: 300px;
    height: 150px;
    display: block;
}
</style>
