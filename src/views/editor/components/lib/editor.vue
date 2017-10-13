<template>
   <vue-html5-editor :content="val" :height="300" @change="change" style="margin-top:-10px;margin-bottom:-20px"></vue-html5-editor>
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
        val:this.replaceTxt(this.value),
        customToolbar: [
          ['bold', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }, { 'align': [] }],
          ['clean']
        ]
      }
    },
    watch: {
      value(){
        this.val = this.replaceTxt(this.value)
      }
      // val (newVal) {
      //   this.change(newVal)
      // }
    },
   	methods:{
      replaceTxt(val){
        val=val.replace(/<font/g,'<span').replace(/<\/font>/g,'</span>')
        return val
      },
      change(e) {
        // console.log(222222222222222)
      	var index=this.index
      	var value= e 
      	var name=this.name
        this.replaceTxt(e)
      	this.$store.commit('updateTxt',{index,name,value})
      }
    }
}
</script>
