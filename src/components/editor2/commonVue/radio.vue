<template>
  <div class="wx-radio">
    <div class="wx-radio-wrapper">
      <div
        class="wx-radio-input"
        :class="{'wx-radio-input-checked': checkedState, 'wx-radio-input-disabled': disabled}"
        :style="styles"
        @click.stop="_handleTap"
        ></div>
      <input ref="input" type="radio" :id="id" :value="value" :checked="checkedState" :disabled="disabled" @change="_inputChange">
    </div>
  </div>
</template>

<script>
import htmlUtil from '@/utils/htmlUtil'

export default {
  name: 'radio',
  props: {
    id: String,
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#09BB07'
    }
  },
  data () {
    return {
      checkedState: this.checked
    }
  },
  computed: {
    styles () {
      if (this.checkedState) {
        return {
          backgroundColor: this.color,
          borderColor: this.color
        }
      }
      return
    }
  },
  methods: {
    _handleTap () {
      // 父标签是label，导致触发2次change
      if (!this.disabled && !htmlUtil.isParent(this.$el, 'label')) {
        this.checkedState = true
        this.$refs.input.checked = this.checkedState
        this.$dispatch('radioGroup', 'childChange', this)
      }
    },
    _inputChange () {
      this.checkedState = true
      this.$dispatch('radioGroup', 'childChange', this)
    }
  },
  mounted () {
    this.$on('selectChange', e => {
      if (this !== e) {
        this.checkedState = false
      }
    })
    this.$on('reset', () => {
      this.checkedState = this.checked
    })
  }
}
</script>

<style>
.wx-radio {
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
}

.wx-radio[hidden] {
  display: none;
}

.wx-radio input {
  display: none;
}

.wx-radio .wx-radio-wrapper {
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-align-items: center;
  align-items: center;
  vertical-align: middle;
}

.wx-radio .wx-radio-input {
  -webkit-appearance: none;
  appearance: none;
  margin-right: 5px;
  outline: 0;
  border: 1px solid #D1D1D1;
  background-color: #ffffff;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  position: relative;
}

.wx-radio .wx-radio-input.wx-radio-input-checked {
  background-color: #09BB07;
  border-color: #09BB07;
}

.wx-radio .wx-radio-input.wx-radio-input-checked:before {
  font: normal normal normal 14px/1 "weui";
  content: "\EA08";
  color: #ffffff;
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -48%) scale(0.73);
  -webkit-transform: translate(-50%, -48%) scale(0.73);
}

.wx-radio .wx-radio-input.wx-radio-input-disabled {
  background-color: #E1E1E1;
  border-color: #D1D1D1;
}

.wx-radio .wx-radio-input.wx-radio-input-disabled:before {
  color: #ADADAD;
}
</style>
