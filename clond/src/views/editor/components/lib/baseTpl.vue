<template>
	<div class="baseLists">
    <div v-for="(item,index) in val" class="baseList">
      <span class="baseList-tit">{{item.title}}</span>
      <el-switch v-model="val[index].is_hidden" class="m-l-5 mt10" @change='change(val[index].is_hidden,item.title)' on-value="1" off-value="0"></el-switch>
    </div>
  </div>
</template>
<script>
export default {
  	props:[
   		'value',
   		'name',
   		'index'
   	],
    data () {
      return {
        val: this.value
      }
    },
    created(){
      this.val = this.value
      this.val.forEach((item,index)=>{
        this.val[index].is_hidden = String(item.is_hidden)
      })
    },
   	methods:{
      change(val,name) {
        var that = this
        if(name=="启用会员卡"){
          //发送状态给后台
          wx.request({
              url: this.$root.apiServer+this.$root.appid+'/basic/newMember/applet/updateById',
              method: 'POST',
              header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                isdeleted: val
              },
              success (res) {
                that.$store.commit('changeMemberState', val)
              }
          })
        }
      	// var index=this.index
      	// var value=this.val
      	// var name=this.name
      	// this.$store.commit('updateTxt',{index,name,value})
      },
      deepCopy(source) {
          // 对象数组深拷贝
          var sourceCopy = source instanceof Array ? [] : {}
          for (var item in source) {
              sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item]) : source[item]
          }
          return sourceCopy
      }
    }
}
</script>
<style scoped>
  .baseLists{
    padding: 10px;
  }
  .baseList{
    margin-bottom: 10px;
  }
  .baseList-tit{
    display: inline-block;
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    visibility: middle;
  }
  .mt10{
    margin-top: -10px;
  }
</style>
