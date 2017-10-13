<template>
<div>
    <el-checkbox-group v-model="checkList">
         <el-row :gutter="20">
          <el-col :span="8"  v-for="item in options" :key="item.id"><el-checkbox :label="item.id?item.id:item.cId">{{item.name}}</el-checkbox> </el-col>
        </el-row>
    </el-checkbox-group>
</div>
</template>
<script>
export default {
  name: 'txChoose',
  props: ['value','options','temp'],
  data() {
    return{
      checkList:[],
      mychoose:[]
    }
  },
  watch:{
   checkList(val){
       var that=this
       var result = []
       this.options.forEach(function(item,idx){
         if(val.indexOf(item.id?item.id:item.cId)!==-1){
           result.push(item)
         }
       })
      
      //  console.log("temp",this.temp)
       this.$emit('set',result)
    },
   value(val){
      var checkArr = []
      val.tabIds.forEach(function(item,idx){
      checkArr.push(item.id?item.id:item.cId)
      })
      this.checkList =checkArr
   } 
  },
  created(){
    this.getInfo()
    if(this.temp==0){
      this.checkList=this.mychoose
    }//取消时恢复选中值,需切换组件,调用分类弹窗
  },
  methods:{
      getInfo(){
         var checkArr = []
          this.value.tabIds.forEach(function(item,idx){
            checkArr.push(item.id?item.id:item.cId)
          })
          this.checkList =checkArr
          this.mychoose=checkArr
      }
   }
}
</script>
