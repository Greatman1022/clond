<script type="text/javascript">
import "@/assets/jquery-ui.min.css"
let _freePanel = {
	editorConfig :{
		height :{
			el: ['number'],
	  label: '调整自由模板高度',
	  type:'Number',
	  value: '315',
	  director : 'Fsize'
		}
	},
	comName:"自由面板",
	props: {
		height: {
			default: '200',
			type: String
		},
		Index: Number,
		cItems: Array,
		containmentId: String
	},
	methods: {
		renderCom(h, item, xtype, index, containmentId, e) {
			var borderDashed = '' //选中虚线
			var values = item //组件属性参数
			var _that = this
			var t = require('./' + xtype)
			t = t[xtype] ? t[xtype] : t
			var editorConfig = t.editorConfig
			if (!e.editorConfig) {
				this.$store.commit('addEditorConfig', {
					index,
					editorConfig
				})
			}
			this.$store.state.freeCindex == index.index&&this.$store.state.cindex==index.Index&&(borderDashed = 'border-dashed')
			return h(t, {
				props: values,
				class:borderDashed,
				attrs:{
					"mousedown ": false
				},
				nativeOn: {
					mousedown (e) {
						e.stopPropagation()
						let that = $(e.currentTarget)
						let style = ''
						if(that.find('.preventdefault').length == 0){
							that.append('<div class="preventdefault"></div>')
						}
						$('.freePanelClose').remove()
						$("<div class='freePanelClose'><i class='el-icon-close'></i></div>").appendTo(that).on('mousedown',(e)=>{
							e.stopPropagation()
							_that.$store.commit('freePanelAction',{type:1,activeType:1})
						})
						_that.$store.commit('selected', {
								index: index
							})
						that.draggable({
							cursor: "move",
							addClasses: true,
							containment: "#" + containmentId,
							scroll: true,
							stop(event, ui) { //停止
								style = 'position:absolute;left:' + ui.position.left*2 + 'rpx;top:' + ui.position.top*2 + 'rpx;'
								that.draggable('destroy')
								style=style.replace(/:0rpx/g,':0px')
								_that.$store.commit('freePanelAction',{type:2,style:style,positionxy:[ui.position.left,ui.position.top]})
							}
						})
					},
					click(e) {
						e.stopPropagation()
					}
				}
			})
		},
		deepCopy(source){
		// 对象数组深拷贝
      var sourceCopy = source instanceof Array ? [] : {}
      for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item]) : source[item]
      }
      return sourceCopy
		}
	},
	render(h) {
		var arr = []
		var Index = this.Index
		Array.from(this.cItems).forEach((e, index) => {
			let xtype = e.com
			let values = this.deepCopy(e.items)
			// console.log(this.deepCopy(e.items))
			if(values.positionxy&&values.positionxy.length == 0){
				values.positionxy = values.position.match(/[0-9]+/g)
			}
			if(values.position.indexOf('rpx')!=-1){
				values.positionxy = values.position.match(/[0-9]+/g)
				for (let i = 0; i < values.positionxy.length; i++) {
					values.positionxy[i] = values.positionxy[i]/2
					values.position = values.position.replace(/([0-9]+)rpx/ig, (match, num) => {
						return `${Number(num) / 2}px`
					})
				}
			}
			arr.push(this.renderCom(h, values, xtype, {
				Index,
				index
			}, this.containmentId, e))
		})
		return h('div', {
			attrs: {
				style: 'height:' + this.height + 'px;overflow:hidden;position:relative'
			},
			on :{
			}
		}, arr)
	}
}
export default ((obj)=>{
	let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
  obj.methods = obj.methods || {}
  Object.keys(obj || {}).forEach(name => {
	if (lifeCycles.indexOf(name) > -1) {
	  obj.methods[name] = obj[name]
	}
  })
  obj.methods['onLoad'] = function (...args) {
	wx.setNavigationBarTitle(obj.config && {
	  title: obj.config.navigationBarTitleText
	})
	obj['onLoad'] && obj['onLoad'].apply(this, args)
  }
  return obj
})(_freePanel)
</script> 
<style>
	.border-dashed{
		border: 1px dashed #c72121;
		box-sizing:border-box;
		-moz-box-sizing:border-box; /* Firefox */
		-webkit-box-sizing:border-box; /* Safari */
		cursor: move;
	}
	.freePanelClose{
		height: 20px!important;
		width: 20px!important;
		text-align: center;
		position: absolute;
		right: 0;
		z-index: 100;
		color: #c72121;
		top: 0;
		z-index: 99;
		font-size: 12px;
		box-sizing: border-box;
		background-color: #fff;
		border: 1px solid #c72121;
		border-radius: 0!important;
		padding: 0;
		cursor: pointer;
	}
	.preventdefault{
		position: absolute;
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
		z-index: 98;
	}
</style>