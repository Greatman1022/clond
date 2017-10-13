<template>
  <div class="wx-slider">
    <div class="wx-slider-wrapper" :class="{'wx-slider-disabled': disabled}">
      <div class="wx-slider-tap-area" id="wrapper" @click.stop="areaTap">
        <div class="wx-slider-handle-wrapper" :style="{'backgroundColor': color}">
          <div
            class="wx-slider-handle"
            :style="handleStyle"
            @touchstart="onTouchStart"
            @mousedown="onTouchStart"
            ></div>
          <div class="wx-slider-track" :style="trackStyle"></div>
          <div class="wx-slider-step" ref="step"></div>
        </div>
      </div>
      <span v-if="showValue" class="wx-slider-value"><p>{{currentValue}}</p></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: {
    name: String,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#e9e9e9'
    },
    selectedColor: {
      type: String,
      default: '#1aad19'
    },
    showValue: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this._filterValue(this.value)
    }
  },
  watch: {
    value (newVal) {
      this.currentValue = this._filterValue(this.value)
    }
  },
  computed: {
    trackStyle () {
      return {
        width: this._getValueWidth(this.currentValue, this.min, this.max),
        backgroundColor: this.selectedColor
      }
    },
    handleStyle () {
      return {
        left: this._getValueWidth(this.currentValue, this.min, this.max)
      }
    }
  },
  methods: {
    areaTap (e) {
      if (!this.disabled) {
        this._onUserChangedValue(e)
      }
    },
    onTouchStart (e) {
      if (!this.disabled) {
        var move = (e) => {
          this._onUserChangedValue(e)
        }
        var end = (e) => {
          document.removeEventListener('touchmove', move)
          document.removeEventListener('touchend', end)
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', end)
          this.$emit('change', {
            detail: {
              value: this.currentValue
            }
          })
        }
        document.addEventListener('touchmove', move)
        document.addEventListener('touchend', end)
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', end)
      }
    },
    getValue () {
      return this.currentValue
    },
    reset () {
      this.currentValue = this.min
    },
    _getValueWidth (value, min, max) {
      return 100 * (value - min) / (max - min) + '%'
    },
    _filterValue (e) {
      if (e < this.min) return this.min
      if (e > this.max) return this.max
      var t = Math.round((e - this.min) / this.step)
      return t * this.step + this.min
    },
    _getXPosition (e) {
      for (var t = e.offsetLeft; e; e = e.offsetParent) t += e.offsetLeft
      return t - document.body.scrollLeft
    },
    _onUserChangedValue (e) {
      var t = this.$refs.step.offsetWidth
      var n = this._getXPosition(this.$refs.step)
      var i = ((e.clientX === undefined ? e.touches[0].clientX : e.clientX) - n) * (this.max - this.min) / t + this.min
      this.currentValue = this._filterValue(i)
    }
  }
}
</script>

<style>
.wx-slider {
  margin: 10px 18px;
  padding: 0;
  display: block;
}

.wx-slider[hidden] {
  display: none;
}

.wx-slider .wx-slider-wrapper {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  min-height: 16px;
}

.wx-slider .wx-slider-tap-area {
  -webkit-flex: 1;
  flex: 1;
  padding: 8px 0;
}

.wx-slider .wx-slider-handle-wrapper {
  position: relative;
  height: 2px;
  border-radius: 5px;
  background-color: #e9e9e9;
  cursor: pointer;
  transition: background-color 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

.wx-slider .wx-slider-track {
  height: 100%;
  border-radius: 6px;
  background-color: #1aad19;
  transition: background-color 0.3s ease;
}

.wx-slider .wx-slider-handle {
  position: absolute;
  width: 28px;
  height: 28px;
  left: 50%;
  top: 50%;
  margin-left: -14px;
  margin-top: -14px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #fff;
  z-index: 2;
  transition: border-color 0.3s ease;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.wx-slider .wx-slider-step {
  position: absolute;
  width: 100%;
  height: 2px;
  background: transparent;
  z-index: 1;
}

.wx-slider .wx-slider-value {
  color: #888;
  font-size: 14px;
  margin-left: 1em;
}

.wx-slider .wx-slider-disabled .wx-slider-track {
  background-color: #ccc !important;
}

.wx-slider .wx-slider-disabled .wx-slider-handle {
  background-color: #FFF !important;
  border-color: #ccc !important;
}
</style>
