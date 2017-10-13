<template>
  <div class="wx-switch">
    <div class="wx-switch-wrapper">
      <div
        v-if="type !== 'checkbox'"
        id="switchInput"
        type="checkbox"
        class="wx-switch-input"
        :class="{'wx-switch-input-checked': checkedStatus, 'wx-switch-input-disabled': disabled}"
        :style="switchStyle"
        @click="onInputChange"
        >
      </div>
      <div
        v-if="type === 'checkbox'"
        id="checkboxInput"
        type="checkbox"
        class="wx-checkbox-input"
        :class="{'wx-checkbox-input-checked': checkedStatus, 'wx-checkbox-input-disabled': disabled}"
        :style="{'color': color}"
        @click="onInputChange"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'switch',
  props: {
    name: String,
    checked: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'switch'
    },
    color: {
      type: String,
      default: '#04BE02'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checkedStatus: this.checked
    }
  },
  watch: {
    checked (newVal) {
      this.checkedStatus = newVal
    }
  },
  computed: {
    switchStyle () {
      return {
        backgroundColor: this.checkedStatus ? this.color : '#DFDFDF',
        borderColor: this.checkedStatus ? this.color : '#DFDFDF'
      }
    }
  },
  methods: {
    onInputChange (e) {
      if (this.disabled) return
      this.checkedStatus = !this.checkedStatus
      this.$emit('change', {
        detail: {
          value: this.checkedStatus
        }
      })
    },
    getValue () {
      return this.checkedStatus
    },
    reset () {
      this.checkedStatus = this.checked
    }
  }
}
</script>

<style>
.wx-switch {
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
}

.wx-switch[hidden] {
  display: none;
}

.wx-switch .wx-switch-wrapper {
  display: -webkit-inline-flex;
  display: inline-flex;
  -webkit-align-items: center;
  align-items: center;
  vertical-align: middle;
}

.wx-switch .wx-switch-input {
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  width: 52px;
  height: 32px;
  margin-right: 5px;
  border: 1px solid #DFDFDF;
  outline: 0;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: #DFDFDF;
  transition: background-color 0.1s, border 0.1s;
}

.wx-switch .wx-switch-input:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 30px;
  border-radius: 15px;
  background-color: #FDFDFD;
  transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s, -webkit-transform .3s;
}

.wx-switch .wx-switch-input:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s, -webkit-transform .3s;
}

.wx-switch .wx-switch-input.wx-switch-input-checked {
  border-color: #04BE02;
  background-color: #04BE02;
}

.wx-switch .wx-switch-input.wx-switch-input-checked:before {
  -webkit-transform: scale(0);
  transform: scale(0);
}

.wx-switch .wx-switch-input.wx-switch-input-checked:after {
  -webkit-transform: translateX(20px);
  transform: translateX(20px);
}

.wx-switch .wx-checkbox-input {
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
  color: #09BB07;
}

.wx-switch .wx-checkbox-input.wx-checkbox-input-checked:before {
  font: normal normal normal 14px/1 "weui";
  content: "\EA08";
  color: inherit;
  font-size: 22px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -48%) scale(0.73);
  -webkit-transform: translate(-50%, -48%) scale(0.73);
}

.wx-switch .wx-checkbox-input.wx-checkbox-input-disabled {
  background-color: #E1E1E1;
}

.wx-switch .wx-checkbox-input.wx-checkbox-input-disabled:before {
  color: #ADADAD;
}
</style>
