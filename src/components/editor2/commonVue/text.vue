<template>
  <span :class="classes" :selectable="selectable">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    selectable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return 'wx-text' + (this.class ? ' ' + this.class : '')
    }
  },
  methods: {
    updateContent (content) {
      return content.replace(/\\n/g, '<br>').replace(/\\t/g, '&nbsp;')
    }
  },
  mounted () {
    this.$nextTick(function () {
      let html = this.$el.innerHTML
      this.$el.innerHTML = this.updateContent(html)
    })
  },
  updated () {
    this.$el.innerHTML = this.updateContent(this.$slots.default[0].text)
  }
}
</script>

<style>
.wx-text[selectable] {
    user-select: text;
    -webkit-user-select: text;
}
</style>
