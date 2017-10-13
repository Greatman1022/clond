<template>
  <div class="wx-checkbox">
    <div class="wx-checkbox-wrapper">
      <div
        class="wx-checkbox-input"
        :class="{'wx-checkbox-input-checked': checkedState, 'wx-checkbox-input-disabled': disabled}"
        :style="styles"
        @click="_handleTap"
        ></div>
      <input ref="cbx" type="checkbox" :id="id" :value="value" :checked="checkedState" :disabled="disabled" @change="_inputChange">
    </div>
  </div>
</template>

<script>
import htmlUtil from '@/utils/htmlUtil'

export default {
  name: 'checkbox',
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
      return 'color:' + this.color
    }
  },
  methods: {
    _handleTap () {
      // 父标签是label，导致触发2次change
      if (!this.disabled && !htmlUtil.isParent(this.$el, 'label')) {
        this.checkedState = !this.checkedState
        this.$refs.cbx.checked = this.checkedState
        this.$dispatch('checkboxGroup', 'childChange')
      }
    },
    _inputChange (e) {
      this.checkedState = e.target.checked
      this.$dispatch('checkboxGroup', 'childChange')
    }
  },
  mounted () {
    this.$on('reset', () => {
      this.checkedState = false
    })
  }
}
</script>

<style>
.wx-checkbox {
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
}

.wx-checkbox[hidden] {
  display: none;
}

.wx-checkbox input {
  display: none;
}

.wx-checkbox .wx-checkbox-wrapper {
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-align-items: center;
  align-items: center;
  vertical-align: middle;
}

.wx-checkbox .wx-checkbox-input {
  margin-right: 5px;
  -webkit-appearance: none;
  appearance: none;
  outline: 0;
  border: 1px solid #D1D1D1;
  background-color: #FFFFFF;
  border-radius: 3px;
  width: 22px;
  height: 22px;
  position: relative;
}

.wx-checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  color: #09BB07;
}

.wx-checkbox .wx-checkbox-input.wx-checkbox-input-checked:before {
  font: normal normal normal 14px/1 "weui";
  content: "\EA08";
  font-size: 22px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -48%) scale(0.73);
  -webkit-transform: translate(-50%, -48%) scale(0.73);
}

.wx-checkbox .wx-checkbox-input.wx-checkbox-input-disabled {
  background-color: #E1E1E1;
}

.wx-checkbox .wx-checkbox-input.wx-checkbox-input-disabled:before {
  color: #ADADAD;
}
</style>
