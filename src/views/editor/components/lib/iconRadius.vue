<template>
  <div class='block'>
    <el-slider
      v-model='val'
      show-input @change="change" :max="50">
    </el-slider>
    <el-button class="setCircular " type="primary" size="small" @click="setCircular">设置为圆形</el-button>
  </div>
</template>
<script>
export default {
  	props: {
      index: {
        type: Number
      },
   		name,
      value:{
        type: Number
      }
   	},
    data () {
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
      },
      setCircular(){
        var index=this.index
        var value='50'
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
<style>
  el-slider{
    display: inline-block;
  }
  .setCircular{
    margin-left: 250px;
    margin-top: 5px;
  }
</style>
