<template>
  <div class="wx-picker" @click="showSelector">
    <slot></slot>
  </div>
</template>

<script>
import picker from './pickerCom'

export default {
  name: 'picker',
  props: {
    name: String,
    mode: {
      type: String,
      default: 'selector'
    },
    range: {
      type: [Object, Array],
      default: function () {
        return []
      }
    },
    rangeKey: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    start: String,
    end: String,
    fields: String
  },
  data () {
    return {
      val: this.value
    }
  },
  methods: {
    handleChange (val) {
      this.val = val.detail.value
      this.$emit('change', val)
    },
    showSelector () {
      if (this.disabled) return
      if (this.mode === 'selector') {
        let n = Number(this.val)
        let i = []

        if (isNaN(n) || n >= this.range.length) {
          n = 0
        }
        if (this.rangeKey) {
          for (let o = 0; o < this.range.length; o++) {
            let r = this.range[o]
            i.push(r[this.rangeKey] + '')
          }
        } else {
          for (let o = 0; o < this.range.length; o++) {
            i.push(this.range[o] + '')
          }
        }
        picker.showPickerView({
          mode: this.mode,
          items: i,
          current: n,
          changeHandler: this.handleChange
        })
      } else if (this.mode === 'time') {
        picker.showPickerView({
          mode: this.mode,
          start: this.start || '00:00',
          end: this.end || '23:59',
          current: this.val || '00:00',
          changeHandler: this.handleChange
        })
      } else {
        picker.showPickerView({
          mode: this.mode,
          start: this.start || '1900-01-01',
          end: this.end || '2100-01-01',
          current: this.val || '2010-01-01',
          fields: this.fields || 'day',
          changeHandler: this.handleChange
        })
      }
    },
    getValue () {
      return this.val
    },
    reset () {
      this.val = this.value
    }
  }
}
</script>

<style>
.wx-picker {
    display: block;
}
</style>
