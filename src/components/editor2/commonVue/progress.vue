<template>
  <div class="wx-progress">
    <div class="wx-progress-bar" :style="barStyle">
      <div class="wx-progress-inner-bar" :style="innerBarStyle"></div>
    </div>
    <p class="wx-progress-info" v-if="showInfo">{{animatedCurPercent}}%</p>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    showInfo: {
      type: Boolean,
      default: false
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    color: {
      type: String,
      default: '#09BB07'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      curPercent: 0,
      animatedCurPercent: 0
    }
  },
  watch: {
    percent (newVal) {
      this.curPercent = Math.max(Math.min(this.percent, 100), 0)
    },
    curPercent (newValue, oldValue) {
      if (!this.active) {
        this.animatedCurPercent = this.curPercent
        return
      }
      var vm = this
      function animate () {
        if (vm.animatedCurPercent === vm.curPercent) return
        requestAnimationFrame(animate)
        if (vm.animatedCurPercent < vm.curPercent) {
          ++vm.animatedCurPercent
        }
        if (vm.animatedCurPercent > vm.curPercent) {
          --vm.animatedCurPercent
        }
      }
      animate()
    }
  },
  computed: {
    barStyle () {
      return {
        height: `${this.strokeWidth}px`
      }
    },
    innerBarStyle () {
      return {
        width: `${this.animatedCurPercent}%`,
        backgroundColor: this.color
      }
    }
  },
  mounted () {
    this.curPercent = Math.max(Math.min(this.percent, 100), 0)
  }
}
</script>

<style>
.wx-progress {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
}

.wx-progress[hidden] {
  display: none;
}

.wx-progress-bar {
  background-color: #EBEBEB;
  -webkit-flex: 1;
  flex: 1;
}

.wx-progress-inner-bar {
  width: 0;
  height: 100%;
}

.wx-progress-info {
  margin-top: 0;
  margin-bottom: 0;
  min-width: 2em;
  margin-left: 15px;
  font-size: 16px;
}

.wx-progress-info[hidden] {
  display: none;
}
</style>
