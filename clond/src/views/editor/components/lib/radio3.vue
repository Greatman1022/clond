<template>
  <div>
    <div class="ui-item">
      <el-radio-group v-model="val" @change='change'>
        <el-radio :label="1">左右滑动</el-radio>
        <el-radio :label="2">平铺</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: [
    'value',
    'name',
    'index'
  ],
  data() {
    return {
      val: this.value
    }
  },
  methods: {
    change(val) {
      var index = this.index
      var value = val
      var name = this.name
      this.$store.commit('updateTxt',{index,name,value})
    },
  }
}
</script>
<style scoped>
.ui-item {
  margin-top: 10px;
}
</style>
