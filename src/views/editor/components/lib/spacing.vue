<template>
  <div class="modify-spacing">
    <div class='block'>
      <span class="demonstration">上</span>
      <el-slider
        class="vd-slider"
        v-model='val[0]'
        show-input @change="change" :max="500">
      </el-slider>
    </div>

    <div class="block">
      <span class="demonstration">下</span>
      <el-slider
        class="vd-slider"
        v-model='val[2]'
        show-input @change="change" :max="500">
      </el-slider>
    </div>

    <div class="block">
      <span class="demonstration">左</span>
      <el-slider
        class="vd-slider"
        v-model='val[3]'
        show-input @change="change" :max="500">
      </el-slider>
    </div>

    <div class="block">
      <span class="demonstration">右</span>
      <el-slider
        class="vd-slider"
        v-model='val[1]'
        show-input @change="change" :max="500">
      </el-slider>
    </div>
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
        type: Array
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
      	var value=this.val
      	this.$store.commit('updateSpacing',value)
      }
    }
}
</script>

<style scoped>
  .block{
    padding: 15px 10px;
    overflow: hidden;
    border-bottom: 1px solid #eff2f6;
  }
  .block .vd-slider{
    width: 88%;
    float: right;
  }
  .demonstration {
    font-size: 14px;
    color: #8492a6;
    line-height: 36px;
  }
</style>
