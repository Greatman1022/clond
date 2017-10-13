<template>
  <el-select v-model="val" placeholder="请选择" @change="change">

    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item.name"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
export default {
  props:[
    'value',
    'name',
    'index',
  ],
  data() {
      return {
        val: this.value,
        options: [{name:"图文分类",value:1},{name:"商品分类",value:2}]
      }
    },
    created () {
//    this.loadDataFn(this.$root.apiServer+this.$root.appid+'/basic/api', this, (data) => {
//      this.options = data
//      if(data){
//        data.splice(0,0,{'text':'请选择','value':0})
//      }
//      // this.val = data[0].value
//    })
    },
    methods: {
      change() {
      	var index=this.index
        var name=this.name
        this.$store.commit('updateTxt',{index,name,'value':this.val})
      }
    },
    watch:{
      value(v){
        this.val = v
      }
    }
}
</script>
