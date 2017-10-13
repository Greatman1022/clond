<template>
	<wx-view class="searchBox clear" :style="'background:'+bgColor">
		<wx-view @click="search()" @keyup="show($event)" :class="[isLeft==1 ?'icoLeft':'']">
			<wx-image v-if="currentSrc" mode="aspectFit"  :src="currentSrc" class="serachBtn"/>
			<img v-else  src="~assets/images/icon/search.png" class="serachBtn"/>
		</wx-view>
	    <input auto-focus class="searchInput" :class="[isCenter==1 ?'textCenter':'']" placeholder="请输入关键词"  v-model="vaule" :style="'border:1px solid '+bdColor+';'" />
	</wx-view>
</template>
<script>
	let _Search = {
		editorConfig: {
			bgColor: {
		      el: ['text', 'color'],
		      label: '搜索框背景色',
		      type: 'String',
		      value: '#f6f6f6',
		      director : 'ColorPicker'
		    },
		    bdColor: {
		      el: ['text', 'color'],
		      label: '输入框边框颜色',
		      type: 'String',
		      value: '#f6f6f6',
		      director : 'ColorPicker'
		    },
		    currentSrc: {
		      el: ['uploader'],
		      label: '更换搜索图标',
		      type: 'String',
		      value: '',
		      director : 'uploader'
		    },
		    isLeft: {
		      label : '搜索图标是否右对齐',
		      type : 'Number',
		      value : 0 ,
		      director : 'switch'
		    },
		    isCenter: {
		      label : '输入框文字是否居中',
		      type : 'Number',
		      value : 0 ,
		      director : 'switch'
		    },
		    currentTo: {
		      label: '选择搜索数据源',
		      type: 'Number',
      		value:1,
		      director : 'fenlei'
		    }
		},
		comName:"搜索框",
		props: {
			bgColor: {
        default: '#F7F8F8',
        type: String
      },
	    bdColor: {
	        default: '#F7F8F8',
	        type: String
	      },
	    currentSrc: {
	      default: '',
	      type: String
	    },
	     currentTo: {
	      default: 1,
        type: Number
	    },
	    isCenter: {
          type: Number,
          default: 0
	      },
	     isLeft: {
          type: Number,
          default: 0
	      },
		},
		data() {
			return {
				vaule:""
			}
		},
		onLoad() {
			// var that = this
			// wx.request({
			//     url: this.$root.apiServer+ this.$root.appid +'/basic/api/imagetext/category/get',
			//     method: 'GET',
			//     header: {
			//         'content-type': 'application/json'
			//     },
			//     success (res) {
			//       if(res.data.success){
			//         that.items = res.data.categorys
			//         that.handler(res.data.categorys[0].cId,0)
			//       }
			//     }
			// })
		},
		methods: {
			// handler (cid,index) {
			//   this.active = index
			//   var that = this
			//   wx.request({
			//       url: this.$root.apiServer+ this.$root.appid +'/basic/api/imagetext/select/categoryid',
			//       method: 'POST',
			//       data: {
			//         cId: cid
			//       },
			//       header: {
			//           'content-type': 'application/x-www-form-urlencoded'
			//       },
			//       success (res) {
			//         that.lists = res.data.imageTextList
			//       }
			//   })
			// },
			search(){
				console.log(this.vaule);
			},
			show(ev){
                if(ev.keyCode == 13){
                    alert('你按回车键了');
                }
            }
		}
	}

	export default((obj) => {
		let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
		obj.methods = obj.methods || {}
		Object.keys(obj || {}).forEach(name => {
			if(lifeCycles.indexOf(name) > -1) {
				obj.methods[name] = obj[name]
			}
		})
		obj.methods['onLoad'] = function(...args) {
			wx.setNavigationBarTitle(obj.config && {
				title: obj.config.navigationBarTitleText
			})
			obj['onLoad'] && obj['onLoad'].apply(this, args)
		}
		return obj
	})(_Search)
</script>
<style scoped>
.searchBox{padding: 10px 20px;}
.searchInput{height: 30px;width: 87%;padding:2px 10px 2px 30px;border-radius: 5px;}
.icoLeft .searchInput{padding:2px 30px 2px 10px;border-radius: 5px;}
.icoLeft .serachBtn{left:87%;right:30px!important;}
.serachBtn{width: 14px;height:14px;left: 30px;top:20px;position: absolute;}
.clear:after {height: 0;content: ".";clear: both;display: block;visibility: hidden;}
.textCenter{text-align: center;}
</style>
