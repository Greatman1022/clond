<template>
  <el-radio-group v-model="val" @change='change'>
    <el-radio :label="1">左右布局</el-radio>
    <el-radio :label="2">上下布局</el-radio>
  </el-radio-group>
</template>

<script>
export default {
    props:[
      'value',
      'name',
      'index'
    ],
    data () {
      return {
        val: this.value
      }
    },
    methods:{
      change() {
        var index=this.index
        var value=this.val
        var name=this.name
        this.$store.commit('updateTxt',{index,name,value})
      }
    }
}
</script>
