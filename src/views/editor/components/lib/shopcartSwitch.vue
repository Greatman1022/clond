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
                <label class="ed-set-label">更改添加购物车的图标</label>
                <uploader @upload="changepic" :index=index :value="value.pic"></uploader>
            </div>
        </div>
    </div>
</template>
<script>
  import uploader from './uploader'
  export default {
    name: "shopcartSwitch",
    props:[
      'value',
      'name',
      'index'
    ],
    data () {
      return {
        val: this.value.open?'1':'0'
      }
    },
    components:{
      uploader
    },
    methods:{
      change(val) {
        var index=this.index
        var bool=!!parseInt(val)
        var name=this.name
        this.value.open = bool
        var value = this.value
        this.$store.commit('updateTxt',{index,name,value})
      },
      changepic (pic) {
        //console.log(pic)
        var index=this.index
        var name=this.name
        this.value.pic = pic[0]
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
