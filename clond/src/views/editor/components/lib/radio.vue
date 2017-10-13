<template>
  <div>
    <div class="ui-item">
      <el-radio-group v-model="val" @change='change' class="ui-group">
        <el-radio :label="1" class="ui-radio">双排列表</el-radio>
        <el-radio :label="2" class="ui-radio">横向滑动</el-radio>
        <el-radio :label="3" class="ui-radio">大图列表</el-radio>
        <el-radio :label="4" class="ui-radio">左右布局</el-radio>
      </el-radio-group>
    </div>

    <!-- <div class="ui-item" v-if="this.value.show == 1 || this.value.show == 2">
      <label class="ed-set-label">列表图片宽度</label>
      <fsize @changeFont="changeSize" :index=index :value="value.ewidth"></fsize>
    </div>

    <div class="ui-item" v-if="this.value.show == 1 || this.value.show == 2">
      <label class="ed-set-label">列表图片高度</label>
      <fsize @changeFont="changeSpace" :index=index :value="value.eheight"></fsize>
    </div> -->
  </div>
</template>

<script>
import fsize from './Fsize'
export default {
  name: 'slider',
  props: [
    'value',
    'name',
    'index'
  ],
  data() {
    return {
      val: this.value
    }
  },
  components: {
    fsize
  },
  watch: {
    value (val) {
      this.val = val
    }
  },
  methods: {
    change(val) {
      var index = this.index
      var value = val
      var name = this.name
      this.$store.commit('updateTxt', { index, name,value})
    }
  }
}
</script>
<style scoped>
.ui-item {
  margin-top: 10px;
}
.ui-group{
  margin: 0 10px;
  font-size: 0;
}
.ui-radio{
  width: 50%;
  margin-left: 0 !important;
  margin: 10px 0;
}
</style>
