<template>
  <div class="">
    <el-tooltip style="margin-left: 10px;">
        <el-switch
          v-model="val"
          on-value="1"
          off-value="0" @change = 'change'>
        </el-switch>
    </el-tooltip>
    <div class="font-box" v-show="val=='1'">
      <div class="ui-item">
        <label class="ed-set-label">标题颜色</label>
        <colorpicker @changeColor="changeColor" :index=index :value="value.color"></colorpicker>
      </div>
      <div class="ui-item">
        <label class="ed-set-label">标题字号</label>
        <fsize @changeFont="changeFont" :index=index :value="value.fontSize"></fsize>
      </div>
      <div class="ui-item">
        <label class="ed-set-label">标题对齐方式</label>
        <el-radio-group v-model="align" @change="changeAlign">
          <el-radio label="left">居左</el-radio>
          <el-radio label="center">居中</el-radio>
          <el-radio label="right">居右</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script>
  import colorpicker from './ColorPicker'
  import fsize from './Fsize'
  export default {
    name: "swiperpicTitle",
    props:[
      'value',
      'name',
      'index'
    ],
    data () {
      return {
        val: this.value.open==true?"1":"0",
        align: this.value.align
      }
    },
    components:{
      colorpicker,
      fsize
    },
    methods:{
      change(val) {
        var index=this.index
        // var bool =!!parseInt(this.val)
        var bool=val==1?true:false
        var name=this.name
        this.value.open = bool
        var value = this.value
        this.$store.commit('updateTxt',{index,name,value})
      },
      changeColor (color) {
        var index=this.index
        var name=this.name
        this.value.color = color
        var value = this.value
        this.$store.commit('updateTxt',{index,name,value})
      },
      changeFont (fontSize) {
        var index=this.index
        var name=this.name
        this.value.fontSize = fontSize
        var value = this.value
        this.$store.commit('updateTxt',{index,name,value})
      },
      changeAlign (align) {
        var index=this.index
        var name=this.name
        this.value.align = align
        var value = this.value
        this.$store.commit('updateTxt',{index,name,value})
      }
    }
  };
</script>
<style scoped>
.ui-item{
  margin-top: 10px;
}
</style>
