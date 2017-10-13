<template>
  <div
    :class="classes"
    @mousedown="hoverDown"
    @touchstart="hoverDown"
    >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hover: {
      type: Boolean,
      default: false
    },
    hoverClass: {
      type: String,
      default: ''
    },
    hoverStartTime: {
      type: Number,
      default: 50
    },
    hoverStayTime: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      classes: ''
    }
  },
  methods: {
    hoverDown () {
      this.classes = this.hover ? (this.hoverClass !== 'none' ? this.hoverClass : '') : ''
      let blur = () => {
        this.classes = ''
        document.removeEventListener('mouseup', blur)
        document.removeEventListener('touchend', blur)
      }
      document.addEventListener('mouseup', blur, false)
      document.addEventListener('touchend', blur, false)
    }
  }
}
</script>

<style>

</style>
