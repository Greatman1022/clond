<template>
  <div>
  <!-- checked 为 true 或 false -->
  <i>是否显示全部商品</i><el-checkbox v-model="check" class="cb" @change="change">是</el-checkbox>
  </div>
</template>
<script>
  export default {
    props: [
      'value',
      'name',
      'index'
    ],
    data () {
      return {
        check: this.value
      }
    },
    methods:{
      change(){
        var index = this.index
        var name = this.name
        var value = this.check
        this.$store.commit('updateTxt', {index, name, value})
      }
    }
  };
</script>
<style scoped>
  i{
    margin-left: 15px;
  }
  .cb{
    margin-left: 30px;
  }

</style>
