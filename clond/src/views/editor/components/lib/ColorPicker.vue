<template>
  <div class="colorpicker">
    <el-color-picker v-model="val" @change="change" color-format="hex"></el-color-picker>
    <input type="text" v-model="val" class="color-input"/>
  </div>
</template>
<script>
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  /*RGB颜色转换为16进制*/
  String.prototype.colorHex = function(){
    var that = this;
    if(/^(rgba|RGBA)/.test(that)){
      var aColor = that.replace(/(?:\(|\)|rgba|RGBA)*/g,"").split(",");
      var strHex = "#";
      for(var i=0; i<aColor.length-1; i++){
        var hex = Number(aColor[i]).toString(16);
        if(hex === "0"){
          hex += hex;
        }
        strHex += hex;
      }
      if(strHex.length !== 7){
        strHex = that;
      }
      return strHex;
    }else if(reg.test(that)){
      var aNum = that.replace(/#/,"").split("");
      if(aNum.length === 6){
        return that;
      }else if(aNum.length === 3){
        var numHex = "#";
        for(var i=0; i<aNum.length; i+=1){
          numHex += (aNum[i]+aNum[i]);
        }
        return numHex;
      }
    }else{
      return that;
    }
  };
  export default {
   	props:[
   		'value',
   		'name',
   		'index'
   	],
    data () {
      return {
        val: this.value.colorHex()
      }
    },
    watch: {
      value (newVal) {
        this.val = newVal
      },
      val(){
        this.change()
      }
    },
    methods:{
      change(){
      	var index=this.index
      	var  value=this.val
      	var name=this.name
        if(this.$parent && this.$parent.$options.name === 'swiperpicTitle'){
          this.$emit('changeColor', value)
        }else{
          this.$store.commit('updateTxt',{index,name ,value})
        }
      }
    }
  };
</script>
<style scoped>
  .color-input{
    width: 150px;
    height: 36px;
    padding: 10px;
    line-height: 16px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    vertical-align: top;
  }
</style>
