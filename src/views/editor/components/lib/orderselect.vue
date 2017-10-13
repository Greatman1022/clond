<template>
  <el-select v-model="value" placeholder="请选择" @change="change">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
  export default {
    props: ['val', 'index', 'name'],
    data () {
      return {
        options: [{
          value: 'asc',
          label: '排序数值正序'
        },{
          value: 'desc',
          label: '排序数值倒序'
        },{
          value: '',
          label: '不使用该排序'
        }],
        value: null
      }
    },
    mounted(){
      var cindex = this.$store.state.cindex
      this.value = this.$store.state.Coms[cindex].items.orderSelect
    },
    methods: {
      change () {
        var index = this.index
        var name = this.name
        var value = this.value
        this.$store.commit('updateTxt', {index, name, value})
      }
    }
  }
</script>
