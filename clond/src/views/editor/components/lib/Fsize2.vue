<template>
  <div class='block'>
    <el-slider
      v-model='val'
      show-input @change="change" :max="500" :min="121">
    </el-slider>
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
      }
    }
}
</script>
