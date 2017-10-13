<template>
  <form
    @reset="handleReset"
    @submit.prevent="handleSubmit"
    ref="subForm"
  >
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: {
    reportSubmit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSubmit () {
      let rst = {
        detail: {
          value: {}
        }
      }
      this.getSubInputs(this).forEach(c => {
        rst.detail.value[c.name] = c.getValue()
      })
      this.$emit('submit', rst)
    },
    handleReset () {
      this.getSubInputs(this).forEach(c => {
        c.reset()
      })
      this.$emit('reset')
    },
    getSubInputs (parent) {
      let inputs = ['slider', 'input', 'picker', 'switch', 'checkboxGroup', 'radioGroup']
      let rst = []
      parent.$children.forEach(i => {
        if (inputs.indexOf(i.$options.name) > -1) {
          if (i.name) {
            rst.push(i)
          }
        }
        rst = rst.concat(this.getSubInputs(i))
      })
      return rst
    }
  }
}
</script>

<style>

</style>
