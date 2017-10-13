<template>
  <el-select v-model="val" placeholder="请选择" @change="change">
    
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.text"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
export default {
  props: ['loadDataFn', 'value'],
  data() {
      return {
        val: this.value,
        options: Array
      }
    },
    created () {
      this.loadDataFn(this.$root.apiServer+this.$root.appid+'/basic/api', this, (data) => {
        this.options = data
        if(data){
          data.splice(0,0,{'text':'请选择','value':0})
        }
        // this.val = data[0].value
      })
    },
    methods: {
      change() {
        this.$store.commit('updateTxt',{'cindex':0,'name':'productTitle','value':this.val})
      }
    },
    watch:{
      value(v){
        this.val = v
      }
    }
}
</script>
