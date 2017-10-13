<template>
	<wx-view class="classify"  :style="'background:'+bgColor">
	<wx-view class="index_sts bmg margint">
			<wx-view class="index_sts_title clear">
				<wx-view class="index_star left" :style="'font-weight:' + fontWeight + '; fontSize:' + fontSize + 'px;'">{{text}}</wx-view>
				<!--<wx-view class="right index_more" @tap="toShopList">-->
				<wx-view class="right index_more">
					<wx-view class="right">
						<img class="index_more_image" src="~assets/images/right.png" />
					</wx-view>
					<wx-view class="text right">立即进入</wx-view>
				</wx-view>
			</wx-view>
			<wx-view class="index_location"  v-for="(item, index) in lists" :key="index">
				<wx-view class="index_location_store">{{item.name}}</wx-view>
				<wx-view class="index_location_site">{{item.address}}</wx-view>
				<wx-view class="index_location_time">营业时间：{{item.openingTime}}-{{item.closingTime}}</wx-view>
				<wx-view class="index_location_distance"></wx-view>
			</wx-view>
		</wx-view>
	</wx-view>
</template>
<script>
	let _Builderinfo = {
		editorConfig: {
			bgColor: {
		      el: ['text', 'color'],
		      label: '设置组件背景色',
		      type: 'String',
		      value: '#f6f6f6',
		      director : 'ColorPicker'
		    },
			text: {
				el: ['textarea'],
				label: '请输入文本',
				type: 'String',
				value: '附近门店',
				director: 'Input'
			},
			fontSize: {
				el: ['number'],
				label: '调整字号',
				type: 'Number',
				value: '16',
				director: 'Fsize'
			},
			fontWeight: {
				el: ['fontWeight'],
				label: '是否加粗',
				type: 'String',
				value: 'bold',
				director: 'fontWeight'
			}
		},
		comName:"附近门店",
		props: {
			bgColor: {
		        default: '#FFFFFF',
		        type: String
		      },
			text: {
				default: '门店信息',
				type: String
			},
			fontSize: {
				default: '16',
				type: String
			},
			fontWeight: {
				default: 'bold',
				typeof: String
			}
		},

		data() {
			return {
				lists: []
			}
		},
		onLoad() {
			 var that = this
			 wx.request({
			     url: 'https://gw-test.vdongchina.com/b100/basic/api/app/1',
			     method: 'GET',
			     header: {
			         'content-type': 'application/json'
			     },
			     success (res) {
			       if(res.data.success){
			         that.lists = res.data.provider.stores
			       }
			     }
			 })
		},
		methods: {
			// handler (cid,index) {
			//   this.active = index
			//   var that = this
			//   wx.request({
			//       url: this.$root.apiServer + this.$root.appid +'/basic/api/imagetext/select/categoryid',
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
			// }
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
	})(_Builderinfo)
</script>
<style scoped lang="scss">
	.classify {
		padding-bottom: 1px;
		background: #FFFFFF;
		margin-bottom: 60px;
	}

	.index_sts_title {
		padding: 14px 15px;
		border-bottom: 1px solid #f8f8f8;
		margin-bottom: 10px;
	}

	.index_star {
		line-height: 21px;
		font-size: 15px;
		color: #111111;
		font-weight: bold
	}

	.index_more .text {
		color: #999999;
		margin-right: 5px;
	}

	.index_more_image {
		width: 5px;
		height: 10px;
		margin-top: 0px;
	}


	.index_location {
		padding:12px 15px;
		position: relative
	}

	.index_location_store {
		font-weight: bold;
		margin-bottom: 10px;
	}

	.index_location_time {
		margin-top: 2px;
	}

	.index_location_distance {
		position: absolute;
		color: #999999;
		right: 15px;
		top: 50%;
		margin-top: -10px;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.clear:after {
		height: 0;
	    content: ".";
	    clear: both;
	    display: block;
	    visibility: hidden;
	}
</style>
