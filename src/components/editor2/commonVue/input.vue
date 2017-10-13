<template>
  <div class="wx-input">
    <div :disabled="disabled" :password="password">
      <input
        ref="inputEl"
        v-model="inputValue"
        :disabled="disabled"
        :maxlength="maxlength"
        @focus="handleInputFocus"
        @blur="handleInputFocus"
      />
      <div ref="input" :class="getPlaceholderClass" :style="placeholderStyle" v-show="placeholderShow">{{placeholder}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'input',
  props: {
    value: [String, Number],
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    password: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    placeholderStyle: String,
    placeholderClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 140
    },
    cursorSpacing: {
      type: Number,
      default: 0
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    password () {
      this.typeChange()
    },
    type () {
      this.typeChange()
    },
    placeholder (newVal) {
      this.showValue = newVal
    },
    maxlength () {
      this.defaultValueChange(this.inputValue)
    },
    value (newVal) {
      this.defaultValueChange(newVal)
    },
    focus () {
      this.focusChange()
    },
    inputValue (newVal) {
      this.$emit('input', {
        detail: {
          value: newVal
        }
      })
    }
  },
  computed: {
    getPlaceholderClass () {
      return `input-placeholder ${this.placeholderClass}`
    },
    placeholderShow () {
      return !this.inputValue || this.inputValue === ''
    }
  },
  data () {
    return {
      inputType: this.password ? 'password' : this.type,
      inputValue: this.value || '',
      _lastHeight: 0
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.checkLineHeight()
      this.typeChange()
      this.focusChange()
    })
  },
  methods: {
    typeChange () {
      let inputEl = this.$refs.inputEl
      let types = ['text', 'number', 'idcard', 'digit', 'password']
      this.inputType = types.indexOf(this.type) === -1 ? 'text' : this.type
      this.inputType = this.password ? 'password' : this.inputType
      inputEl.setAttribute('type', this.inputType)
    },
    focusChange () {
      if (this.focus) {
        this.disabled || window.requestAnimationFrame(() => {
          this.$refs.inputEl.focus()
        })
      } else {
        this.$refs.inputEl.blur()
      }
    },
    handleInputFocus (e) {
      let rst = {
        detail: {
          value: this.inputValue
        },
        type: e.type
      }
      this.$emit(e.type, rst)
    },
    defaultValueChange (e) {
      e = String(e)
      this.maxlength > 0 && (e = e.slice(0, this.maxlength))
      this.inputValue = e
    },
    checkLineHeight () {
      window.requestAnimationFrame(() => {
        var t = window.getComputedStyle(this.$el)
        var n = this.$el.getBoundingClientRect()
        var i = ['Left', 'Right'].map(function (e) {
          return parseFloat(t['border' + e + 'Width']) + parseFloat(t['padding' + e])
        })
        var o = ['Top', 'Bottom'].map(function (e) {
          return parseFloat(t['border' + e + 'Width']) + parseFloat(t['padding' + e])
        })
        var r = n.height - o[0] - o[1]
        if (r !== this._lastHeight) {
          var a = this.$refs.input
          a.style.height = r + 'px'
          a.style.lineHeight = r + 'px'
          a.style.width = n.width - i[0] - i[1] + 'px'
          this._lastHeight = r
        }
      })
    },
    getValue () {
      return this.inputValue
    },
    reset () {
      this.inputValue = ''
    },
    _getHexColor (e) {
      if (!e) return '#000000'
      if (e.indexOf('#') >= 0) return e
      try {
        var t
        var n
        var i = (function () {
          if (e.indexOf('#') >= 0) return { v: e }
          t = e.match(/\d+/g)
          var i = []

          t.map(function (e, t) {
            if (t < 3) {
              var n = parseInt(e)
              n = n > 9 ? n.toString(16) : '0' + n
              i.push(n)
            }
          })

          if (t.length > 3) {
            n = parseFloat(t.slice(3).join('.'))
            n === 0 && i.push('00')
            if (n >= 1) {
              i.push('ff')
            } else {
              n = parseInt(255 * n)
              n = n > 9 ? n.toString(16) : '0' + n
              i.push(n)
            }
          }
          return {
            v: '#' + i.join('')
          }
        })()
        if ((typeof i === 'undefined' ? 'undefined' : typeof i) === 'object') return i.v
      } catch (e) {
        return '#000000'
      }
    }
  }
}
</script>

<style>
.input-placeholder {
  color: gray;
}

.wx-input {
  display: block;
  height: 1.4rem;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
  font-family: UICTFontTextStyleBody;
  min-height: 1.4rem;
}

.wx-input input {
  position: relative;
  min-height: 1.4rem;
  border: none;
  height: inherit;
  width: 100%;
  font-size: inherit;
  font-weight: inherit;
  font-family: UICTFontTextStyleBody;
  color: inherit;
  background: transparent;
  display: inherit;
  padding: 0;
  margin: 0;
  outline: none;
  vertical-align: middle;
  text-align: inherit;
  overflow: inherit;
  white-space: inherit;
  text-overflow: inherit;
  -webkit-tap-highlight-color: transparent;
  z-index: 2;
}

.wx-input[disabled] div {
  color: grey;
}

.wx-input[hidden] {
  display: none;
}

.wx-input div {
  position: relative;
  min-height: 1.4rem;
  text-overflow: inherit;
  border: none;
  height: inherit;
  width: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-family: UICTFontTextStyleBody;
  /*color: inherit;*/
  padding: 0;
  margin: 0;
  outline: none;
  text-align: inherit;
  -webkit-tap-highlight-color: transparent;
}

.wx-input div[type=password] div {
  color: black;
}

.wx-input div div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 100%;
  height: inherit;
  min-height: 1.4rem;
  white-space: nowrap;
  text-align: inherit;
  overflow: hidden;
  vertical-align: middle;
  z-index: 1;
}
</style>
