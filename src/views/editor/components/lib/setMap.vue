<template>
  <el-button type="button" @click="setMap" class="ml10">设置</el-button>
</template>

<script>
import Vue from 'vue'
import txmap from './txmap.vue'
export default {
    props:[
      'value',
      'name',
      'index'
    ],
    components:{
      txmap
    },
    data () {
      return {
        val: this.value
      }
    },
    methods:{
      change() {
        var index=this.index
        var value=this.val
        var name=this.name
        this.$store.commit('updateTxt',{index,name,value})
      },
      setHandler(o) {
        this.val = o
      },
      setMap() {
        const h = this.$createElement;
        this.$msgbox({
          title: '选取地点',
          message: h('div', null, [
            h('txmap',{
              on: {
                set: this.setHandler
              }
            }
          )
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
           beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.change();
              done();
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'success',
            message: '地图位置设置成功'
          });
        });
      },

    }
}
</script>
