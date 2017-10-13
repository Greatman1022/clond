<template>
	<el-input class="abc" v-model="val" placeholder="请输入内容" @change="change" type="textarea">
  </el-input>
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
    // watch: {
    //   value (newVal) {
    //     this.val = newVal
    //   }
    // },
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
