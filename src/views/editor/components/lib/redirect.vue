<template>
  <el-select v-model="val" placeholder="请选择" @change="change">
    <el-option label="无" value=""></el-option>
    <el-option
      v-for="item in pages"
      :key="item.id"
      :label="item.title"
      :value="item.pageName" v-if="item.pageName !='goods'&& item.pageName != pages[curPage].pageName">
    </el-option>
  </el-select>
</template>
<script>
export default {
  props: ['value', 'index'],
  data() {
      return {
        val: '请选择页面',
        options: Array
      }
    },
    computed:{
      pages () {
        return this.$store.state.newApps
      },
      coms () {
        return this.$store.state.Coms
      },
      curPage (){
        return this.$store.state.curPage
      },
      cindex(){   //组件index
        return this.$store.state.cindex
      },
      freeCindex(){
        return this.$store.state.freeCindex
      },
      currentTo () {
        if(typeof this.freeCindex == 'number'){
          return this.coms[this.cindex].children[this.freeCindex]['items']['currentTo'] || ''
        }else{
          return this.coms[this.cindex]['items']['currentTo'] || ''
        }
        
      }
    },
    mounted () {
      this.selectChange()
    },
    methods: {
      change() {
        var  pages = this.pages
        for(var i = 0;i <pages.length;i++){
          if(pages[i]['pageName'] == this.val && pages[i].signGoodsId){
            var signGoodsId = pages[i].signGoodsId
            break
          } 
        }
        var toUrl = signGoodsId?`../${this.val}/${this.val}?id=`+signGoodsId : `../${this.val}/${this.val}`
        toUrl = this.val ? toUrl : ''
        console.log()
        this.$store.commit('updateTxt',{'name':'currentTo','value':toUrl})
      },
      selectChange(){
        let current = this.currentTo
        let queryIndex = current.lastIndexOf('?')
        this.val = current.slice(current.lastIndexOf('/') + 1, queryIndex > -1 ? queryIndex : current.length)
      }
    },
    watch:{
      cindex(obj){
        this.selectChange()
      },
      value(){
        this.selectChange()
      }
    }
}
</script>