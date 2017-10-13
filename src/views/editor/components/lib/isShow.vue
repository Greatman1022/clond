<template>
  <div v-if="this.model == 1 || this.model == 2">
    <div class="ui-item">    
      <label class="ed-set-label">{{this.label}}</label>
      <div v-if="this.name=='eheight'">
          <fsize @changeFont="changeSize" :index=index :value="value"></fsize>
      </div>
      <div v-else>
          <fsize2 @changeFont="changeSize" :index=index :value="value"></fsize2>
      </div>
      
    </div>
  </div>
</template>

<script>
import fsize from './Fsize'
import fsize2 from './Fsize2'
export default {
  name: 'slider',
  props: [
    'value',
    'name',
    'index'
  ],
  data() {
    return {
      label:this.name=='ewidth'?'列表图片宽度':'列表图片高度'
    }
  },
  computed: {
      model () {
          return this.$store.state.Coms[this.$store.state.cindex].items.model
      }
  },
  components: {
    fsize,
    fsize2
  },
  methods: {
    // change(val) {
    //   var index = this.index
    //   var value = val
    //   var name = this.name
    //   this.$store.commit('updateTxt', { index, name, 'setObject': { 'show': value } })
    // },
    changeSize(val) {
      var index = this.index
      var name = this.name
      var value = val
      this.$store.commit('updateTxt', { index, name, value })
      //console.log(this.label);
    },
    // changeSpace(val) {
    //   var index = this.index
    //   var name = this.name
    //   var value = val
    //   this.$store.commit('updateTxt', { index, name, 'setObject': { 'eheight': value } })
    // }
  }
}
</script>
<style scoped>
.ui-item {
  margin-top: 10px;
}
</style>
