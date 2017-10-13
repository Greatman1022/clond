<template>
  <div>
    <div>
      <label class="ml10">水平位置(0-375)</label><el-input class="abc mt10 mb10" v-model="val[0]" placeholder="请输入内容" @change="change" type="number"></el-input>
    </div>
    <div>
      <label class="ml10">垂直位置</label><el-input class="abc mt10" v-model="val[1]" placeholder="请输入内容" @change="change" type="number"></el-input>
    </div>
  </div>
</template>
<script>
export default{
  props:[
    'value',
    'name',
    'index'
  ],
  computed:{
    val(){
      return this.value  
    }
  },
  methods:{
    change(){
      var style = 'position:absolute;left:' + this.val[0]*2 + 'rpx;top:' + this.val[1]*2 + 'rpx;'
      style=style.replace(/:0rpx/g,':0px')
      this.$store.commit('freePanelAction',{type:2,style:style,positionxy:[this.val[0],this.val[1]]})
    }
  }
}
</script>
<style scoped>

</style>
