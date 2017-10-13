<script>
  function deepCopy(source) {
    // 对象数组深拷贝
    var sourceCopy = source instanceof Array ? [] : {}
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
    }
    return sourceCopy
  }
  import '@/assets/js/jquery-ui'
  import close from './close'
  export default {
    name: 'vd-component',
    data(){
      return {
        comName:'',
      }
    },
    props: {
      item: Object,
      index: Number,
      curPage: Number
    },
    methods:{
      renderCom(h,item,xtype,index,containmentId,e){
        var values = deepCopy(item) //组件属性参数
          var t=require('./assets/'+xtype)
          t = t[xtype] ? t[xtype] : t
          var editorConfig = t.editorConfig
          this.comName = t.comName
          if(!e.editorConfig){
            this.$store.commit('addEditorConfig',{index,editorConfig})
          }
          if(xtype == 'freePanel'){
            values.cItems = e.children
            values.height = e.items.height
          }
          values.Index = index
          values.containmentId = containmentId //容器专属ID
        return h(t, {
            props: values,
            attrs: {
            }
          })
        }
      },
    render (h) {
      var arr = []
      var $this=this
      var Index = this.index
      var xtype = this.item.com
      var values = this.item.items //组件属性参数
      var pageName = this.$store.state.pageName
      var containmentId = "containment-wrapper-"+this.curPage+'-'+Index
      arr.push(this.renderCom(h,values,xtype,Index,containmentId,this.item))
      var vheight = (xtype == 'video'?'height:225px':'') //不知道video多出5px原因强加
      var comName = this.comName&&this.comName!=''?this.comName:'未知'
      arr.push(h(close, {props: { Index ,comName ,pageName}}))
      return h('div', {attrs:{style:vheight
        ,id:containmentId}},arr)
    }
  }
</script>
<style scoped>
.selected .com-tools{
  display: block;
}
.wx-video{
  width: 100%;
}
</style>
