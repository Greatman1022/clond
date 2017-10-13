<template>
  <div class="com-tools">
    <el-button type="text" @click.stop="remove" class="remove" v-if="pageName!='goods'&&pageName!='personCenter'&&pageName!='personal'&&pageName!='shopcart'&&pageName!='community'"><i class="el-icon-close"></i></el-button>
    <div class="com-name">
        {{comName}}
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    props: {
      Index: Number,
      comName:String,
      pageName:String
    },
    computed: {
      // 映射到store.state.newApps
       ...mapState(['newApps']),
      Coms: {
        get () {
          return this.$store.state.Coms
        },
        set (value) {
          this.$store.commit('sort', value)
        }
      }
    },
    methods: {
      remove() {
        // 分销，优惠券，底部导航不可删除
        if (this.comName === '想去购专用导航') {
          this.$message({
            type: 'error',
            message: '此模块不可删除'
          })
          return
        }
        var that = this
        var count = 0
        that.$confirm('此操作将删除该模块, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$store.commit('remove', that.index)

          $.each(that.Coms,function(idx,val){
            if(val.com == 'community'){
              count++
            }
          })
          $.each(that.Coms,function(idx,val){
            if(val.com == 'posted' && count ==0){
              that.$store.commit('changeCindex',idx)
              that.$store.commit('remove',idx)
              return false
            }
          })
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>
<style scoped>
  .com-tools{
    display: none;
    position: absolute;
    width:100%;
    top:0;
    left:0;
    height: 20px;
    z-index: 9999;
  }
  .com-name{
    position: relative;
    top:-2px;
    left:-2px;
    display: inline-block;
    color: #fff;
    font-size: 12px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    padding: 0 4px;
    background-color: #18ccc0;
    border-bottom-right-radius: 4px;
    z-index: 9999
  }
  .el-message-box__close{
    position: absolute;
    display: inline-block;
    top: 19px!important;
    right: 20px!important;
    color: #999!important;
    cursor: pointer;
    line-height: 20px;
    text-align: center;
}
.remove{
    height: 20px;
    width: 20px;
    text-align: center;
    position: absolute;
    right: 0;
    z-index: 1000;
    color: #18ccc0;
    top: 0px;
    font-size: 12px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #18ccc0;
    border-radius: 0!important;
    padding: 0;
}
</style>
