<template>
  <el-radio-group v-model="val" @change='change'>
    <el-radio label="1">置底</el-radio>
    <!-- <el-radio label="2">置顶</el-radio> -->
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
        val: this.value != 'top'? "1": "2"
      }
    },
    methods:{
      change() {
        var index=this.index
        var value=this.val == 1? 'bottom':'top'
        var name=this.name
        this.$store.commit('updateTxt',{index,name,value})
      }
    }
}
</script>
