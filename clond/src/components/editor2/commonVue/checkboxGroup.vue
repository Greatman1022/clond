<template>
  <div class="wx-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'checkboxGroup',
  props: {
    name: String
  },
  data () {
    return {
      value: []
    }
  },
  mounted () {
    this.$on('childChange', this.handleChange)
  },
  methods: {
    handleChange () {
      this.value = []
      this.$el.querySelectorAll('input[type=checkbox]:checked').forEach(el => {
        this.value.push(el.value)
      })
      this.$emit('change', {
        detail: {
          value: this.value
        }
      })
    },
    getValue () {
      return this.value
    },
    reset () {
      this.$broadcast('checkbox', 'reset')
      this.value = []
    }
  }
}
</script>

<style>
.wx-checkbox-group {
  display: block;
}

.wx-checkbox-group[hidden] {
  display: none;
}
</style>
