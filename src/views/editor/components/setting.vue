<script>
export default {
  data(){
    return {
      a1:{
      }
    }
  },
  methods: {
    renderSettingCom (h, editorConfig, name, index, value, loadDataFn,comName) {
      let item = editorConfig[name]
      let children = []
      let props = {
        index,
        name,
        value
      }
      if (loadDataFn) {
        props['loadDataFn'] = loadDataFn
      }
      if (name) {
        if(item.director == 'positionxy'&&comName !='freePanel'){
          return children
        }
        if(typeof item.director == 'string'){
          var  director = require('./lib/'+ item.director)
        }else{
          var  director = require('./lib/'+ item.director[this.$store.state.cityDevLanguage])
        }
        children.push(h('div', {
          attrs: {
            for: editorConfig[name].label
          }//商品列表labelshow设置为空时右侧label隐藏
        }, [editorConfig[name].labelshow!=''?h('label',{attrs:{
          class:'ed-set-label'
        }},editorConfig[name].label):'',h(director,{
              attrs:{},
              props
            }
          ),editorConfig[name]['tip']&&comName!= 'freePanel'?h('div',{domProps: {innerHTML:editorConfig[name]['tip']},class:'ml15 mt15'}):''
        ]))
        
        if(editorConfig[name].labelshow!=''){
            children.push(h('br'))
        }//商品列表labelshow设置为空时br不输出
        
      }
      return children
    }
  },
  render (h) {
    let Coms=this.$store.state.Coms
    let cindex=this.$store.state.cindex
    let freeCindex =this.$store.state.freeCindex
    let children = []
    this.activeCom=Coms[cindex]
    if(Coms[cindex].com == 'freePanel'&& typeof(freeCindex) == 'number'){
      this.activeCom = Coms[cindex].children[freeCindex]
    }
    let editorConfig = this.activeCom.editorConfig
    if (this.activeCom) {
      Object.keys(editorConfig).forEach((name,index) => {
          let item = editorConfig[name]
          let i=this.activeCom.items[name]
          if(typeof i != 'boolean'){
            i = i ? i : item.value
          }
          if(item.type === 'Number'){
            i = parseInt(i)
          }
          children = children.concat(item.data ? this.renderSettingCom(h, editorConfig, name, index, i, item.data,Coms[cindex].com) : this.renderSettingCom(h, editorConfig, name, index, i,'',Coms[cindex].com))
      })
    }
    if(Coms[cindex].com == 'freePanel'&& typeof(freeCindex) == 'number'){
        let director = require('./lib/zindex')
        children.push(h('div',{},[h('label',{attrs:{class:'ed-set-label'}},'改变层级'),h(director)]))
    }
    return h('div', children)
  }
}
</script>
<style>
.editor2 label{
  font-size: 16px;
	box-sizing: border-box;
}
.editor2 .el-input__inner{
	width: 90%;
	margin: 0 auto;
}
.el-tooltip__popper.is-dark{
  display: none
}
.editor2 .el-select,.editor2 .el-radio-group{
	margin-left: 10px;
}
.editor2  .el-input__inner[size="small"]{
	width: 100%;
}
.editor2 .el-tabs__content{
  padding:0!important;
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */ display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */ display: -ms-flexbox; /* TWEENER - IE 10 */ display: -webkit-flex; /* NEW - Chrome */ display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
  flex-direction: column;
}
.editor2  .el-input__inner[icon="caret-top"]{
	width: 100%;
}
.editor2 label .el-color-picker{
	display:block;
	width: 60px;
}
.editor2 .el-color-picker{
	margin-left: 10px;
}
.editor2 .el-tabs--border-card {
  height: 100%;
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */ display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */ display: -ms-flexbox; /* TWEENER - IE 10 */ display: -webkit-flex; /* NEW - Chrome */ display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
  flex-direction: column;
}
.editor2 .el-slider{
	width: 90%;
	margin: 0 auto;
}
.editor2 label .el-slider__button{
	margin-top: -6px;
}
.editor2 .ed-set-label{
  display: block;
  font-size: 14px;
  padding: 10px;
  font-weight: bold;
  background-color: #e1e1e1;
  margin-bottom: 10px;
}
.mt15{
  margin-top: 15px;
}
</style>