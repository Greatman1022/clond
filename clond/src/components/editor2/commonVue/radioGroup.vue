<template>
  <div class="wx-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'radioGroup',
  props: {
    name: String
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    _genName () {
      return +new Date()
    },
    handleChange (e) {
      if (e) {
        this.value = e.value
        this.$emit('change', {
          detail: {
            value: e.value
          }
        })
      }
      this.$broadcast('radio', 'selectChange', e)
    },
    getValue () {
      return this.value
    },
    reset () {
      this.$broadcast('radio', 'reset')
      this.value = ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      const name = this._genName()
      this.$el.querySelectorAll('input[type="radio"]').forEach(v => {
        v.setAttribute('name', name)
      })
    })
    this.$on('childChange', this.handleChange)
  }
}
</script>

<style>
.wx-radio-group {
  display: block;
}

.wx-radio-group[hidden] {
  display: none;
}
</style>
