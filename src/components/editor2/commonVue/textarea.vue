<template>
  <div class="wx-textarea">
    <div id="wrapped">
      <div ref="placeholder">{{placeholder}}</div>
      <textarea
        ref="textarea"
        :name="name"
        :maxlength="areaMaxlength"
        :disabled="disabled"
        v-model="textValue"
      ></textarea>
      <div ref="compute" class="compute"></div>
      <div ref="stylecompute" :class="areaPlaceholderClass" :style="areaPlaceholderStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    name: String,
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
    autoFocus: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    cursorSpacing: {
      type: Number,
      default: 0
    }
  },
  computed: {
    areaMaxlength () {
      return this.maxlength <= 0 ? -1 : this.maxlength
    },
    areaPlaceholderClass () {
      return `textarea-placeholder ${this.placeholderClass}`
    },
    areaPlaceholderStyle () {
      return `${this.placeholderStyle};display:none;`
    }
  },
  data () {
    return {
      scale: 0,
      textValue: this.value
    }
  },
  watch: {
    value (newVal) {
      this.textValue = newVal
    },
    textValue (newVal) {
      this.defaultValueChange(newVal)
    },
    maxlength (newVal) {
      newVal > 0 && this.textValue.length > newVal && (this.textValue = this.textValue.slice(0, newVal))
    },
    autoHeight (newVal) {
      if (newVal) {
        var t = this.getCurrentRows(this.textValue)
        var n = t.height < t.lineHeight ? t.lineHeight : t.height
        this.$el.style.height = n + 'px'
        this.getComputedStyle()
      }
    },
    focus (newVal) {
      this.focusChanged(newVal)
    },
    disabled () {
      this.focusChanged(this.focus)
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.scale = 750 / window.innerWidth
      this.getComputedStyle()
      this.checkRows(this.value)
      this.checkPlaceholderStyle(this.value)
      this.defaultValueChange(this.value)
      this.focusChanged(this.focus)
    })
  },
  methods: {
    couldFocus (isFocus) {
      if (isFocus) {
        this.disabled || window.requestAnimationFrame(() => {
          this.$refs.textarea.focus()
        })
      } else {
        this.$refs.textarea.blur()
      }
    },
    focusChanged (isFocus) {
      this.couldFocus(isFocus)
    },
    defaultValueChange (e) {
      e = String(e)
      this.maxlength > 0 && e.length > this.maxlength && (e = e.slice(0, this.maxlength))
      this.checkPlaceholderStyle(e)
      this.$refs.textarea.value = e
      this.checkRows(e)
    },
    getComputedStyle () {
      window.requestAnimationFrame(() => {
        let t = window.getComputedStyle(this.$el)
        let n = this.$el.getBoundingClientRect()
        let i = ['Left', 'Right'].map(function (e) {
          return parseFloat(t['border' + e + 'Width']) + parseFloat(t['padding' + e])
        })
        let o = ['Top', 'Bottom'].map(function (e) {
          return parseFloat(t['border' + e + 'Width']) + parseFloat(t['padding' + e])
        })
        let r = this.$refs.textarea
        r.style.width = n.width - i[0] - i[1] + 'px'
        r.style.height = n.height - o[0] - o[1] + 'px'
        r.style.fontWeight = t.fontWeight
        r.style.fontSize = t.fontSize || '16px'
        r.style.color = t.color
        this.$refs.compute.style.fontSize = t.fontSize || '16px'
        this.$refs.compute.style.width = r.style.width
        this.$refs.placeholder.style.width = r.style.width
        this.$refs.placeholder.style.height = r.style.height
      })
    },
    getCurrentRows (e) {
      var t = window.getComputedStyle(this.$refs.compute)
      var n = 1.2 * (parseFloat(t.fontSize) || 16)
      this.$refs.compute.innerText = e
      this.$refs.compute.appendChild(document.createElement('br'))
      return {
        height: Math.max(this.$refs.compute.scrollHeight, n),
        heightRpx: this.scale * this.$refs.compute.scrollHeight,
        lineHeight: n,
        lineCount: Math.ceil(this.$refs.compute.scrollHeight / n)
      }
    },
    checkRows (e) {
      var t = this.getCurrentRows(e)
      if (this.lastRows !== t.lineCount) {
        this.lastRows = t.lineCount
        if (this.autoHeight) {
          var n = t.height < t.lineHeight ? t.lineHeight : t.height
          this.$el.style.height = n + 'px'
          this.getComputedStyle()
        }
        // this.triggerEvent("linechange", t)
      }
    },
    checkPlaceholderStyle (e) {
      e ? this.$refs.placeholder.style.display = 'none' : (this._getComputePlaceholderStyle(), this.$refs.placeholder.style.display = '')
    },
    getHexColor (e) {
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
        return ''
      }
    },
    _getComputePlaceholderStyle () {
      var e = this.$refs.stylecompute
      var t = window.getComputedStyle(e)
      var n = parseInt(t.fontWeight)
      isNaN(n) ? n = t.fontWeight : n < 500 ? n = 'normal' : n >= 500 && (n = 'bold')
      this.placeholderStyle && this.placeholderStyle.split(';')
      var i = this.$refs.placeholder
      i.style.position = 'absolute'
      i.style.fontSize = (parseFloat(t.fontSize) || 16) + 'px'
      i.style.fontWeight = n
      i.style.color = this.getHexColor(t.color)
    }
  }
}
</script>

<style>
.textarea-placeholder {
  color: grey;
}

.wx-textarea {
  width: 300px;
  height: 150px;
  display: block;
  position: relative;
}

.wx-textarea[hidden] {
  display: none;
}

.wx-textarea textarea {
  outline: none;
  border: none;
  resize: none;
  background-color: transparent;
  line-height: 1.2;
  z-index: 2;
  position: absolute;
  padding: 0;
  font-family: inherit;
  background: transparent;
}

.wx-textarea .compute {
  color: transparent;
  top: 0;
  z-index: 0;
}

.wx-textarea div {
  word-break: break-all;
  line-height: 1.2;
  font-family: inherit;
  position: absolute;
}
</style>
