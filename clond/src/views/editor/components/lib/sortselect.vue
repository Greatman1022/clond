<template>
  <el-select v-model="value" placeholder="请选择(不选默认正序)" @change="change">
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
          label: '上传时间正序'
        }, {
          value: 'desc',
          label: '上传时间倒序'
        }],
        value: ''
      }
  },
  computed: {
    coms () {
      return this.$store.state.Coms
    },
    cindex () {
      return this.$store.state.cindex
    },
  },
  mounted(){
    var cindex = this.$store.state.cindex
    var com = this.$store.state.Coms
    var sort = this.coms[this.cindex].items.sortSelect
    this.value = sort
    console.log(this.value)
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
