<template>
  <el-select v-model="val" placeholder="请选择" @change="change">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.title"
      :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
export default {
  props:[
    'value',
    'name',
    'index'
  ],
  data() {
    return {
      val: this.value,
      options: []
    }
  },
  created () {
    var that = this
    wx.request({
      url: this.$root.apiServer + this.$root.appid + '/basic/api/carousel/list',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.options = res.data.carousels
        if(that.value==0){
            that.change(res.data.carousels[0].id)
        }
      }
    })
  },
  methods: {
    change(val) {
      var value = val
      var index = this.index
      var name = this.name
      this.$store.commit('updateTxt', { index, name, value })
    }
  },
  watch:{
    value(v){
      this.val = v
    }
  }
}
</script>
