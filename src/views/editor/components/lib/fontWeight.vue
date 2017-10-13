<template>
  <el-tooltip style="margin-left: 10px;">
      <el-switch
        v-model="val"
        on-value="1"
        off-value="0" @change = 'change'>
      </el-switch>
  </el-tooltip>
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
        val: this.value?'1':'0'
      }
    },
    methods:{
      change(val) {
        var index=this.index
        var value=val== 1? 'bold':'normal'
        var name=this.name
        this.$store.commit('updateTxt',{index,name,value})
      }
    }
  };
</script>
