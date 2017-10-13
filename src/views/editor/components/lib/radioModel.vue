<template>
  <div>
    <div class="ui-item">
      <el-radio-group v-model="val" @change='change'>
        <el-radio :label="1">左右布局</el-radio>
        <el-radio :label="2">横向滑动</el-radio>
      </el-radio-group>
    </div>

    <div class="ui-item" v-if="this.value.type == 2">
      <label class="ed-set-label">图片宽度</label>
      <fsize @changeFont="changeW" :value="value.width"></fsize>
    </div>
    <div class="ui-item" v-if="this.value.type == 2">
      <label class="ed-set-label">图片高度</label>
      <fsize @changeFont="changeH" :value="value.height"></fsize>
    </div>
  </div>
</template>

<script>
import fsize from './Fsize'
export default {
  name: 'slider',
  props: [
    'value',
    'name',
    'index'
  ],
  data() {
    return {
      val: this.value.type
    }
  },
  components: {
    fsize
  },
  methods: {
    change(val) {
      var index = this.index
      var value = val
      var name = this.name
      this.$store.commit('updateTxt',{index,name,'setObject':{'type':value}})
    },
    changeW(val) {
      var index=this.index
      var name=this.name
      this.value.width = val
      var value = this.value
      this.$store.commit('updateTxt',{index,name,value})
    },
    changeH(val) {
      var index=this.index
      var name=this.name
      this.value.height = val
      var value = this.value
      this.$store.commit('updateTxt',{index,name,value})
    }
  }
}
</script>
<style scoped>
.ui-item {
  margin-top: 10px;
}
</style>
