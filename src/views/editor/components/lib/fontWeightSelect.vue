<template>
  <el-select v-model="val" placeholder="请选择" @change="change">
    <el-option value="100">100</el-option>
    <el-option value="200">200</el-option>
    <el-option value="300">300</el-option>
    <el-option value="400">400</el-option>
    <el-option value="500">500</el-option>
    <el-option value="600">600</el-option>
    <el-option value="700">700</el-option>
    <el-option value="800">800</el-option>
    <el-option value="900">900</el-option>
  </el-select>
</template>
<script>
export default {
  props:{
    index: {
        type: Number
    },
    name,
    value:{
        type: Number
    }
  },
  data() {
    return {
      val: this.value
    }
  },
  watch: {
    value (newVal) {
    this.val = newVal
    }
  },
  methods:{
    change(){
    var index=this.index
    var value=this.val.toString()
    var name=this.name
    var cname = this.$parent.$options.name
    if(this.$parent && (cname === 'swiperpicTitle' || cname === 'slider')){
        this.$emit('changeFont', this.val)
    }else{
        this.$store.commit('updateTxt',{index,name,value})
    }
    }
  }
}
</script>