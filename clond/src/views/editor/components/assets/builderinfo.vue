<template>
	<wx-view class="classify" :style="'background:'+bgColor" v-if="name.length>0">
		<wx-view class="index_sts bmg margint">
			<wx-view class="index_sts_title clear">
				<wx-text class="index_star left" :style="'font-weight:' + fontWeighta + '; font-size:' + fontSize + 'px;'">{{ text }}</wx-text>
				<wx-view class="right index_more" @click="toManicurist">
					<wx-view class="right">
						<wx-image class="index_more_image" src="http://image.vdongchina.com/M00/01/84/ZSUkmVm2ArqEBSYwAAAAAKhVnJM311.png"></wx-image>
					</wx-view>
					<wx-view class="text right">查看更多</wx-view>
				</wx-view>
			</wx-view>
			<wx-view class="scollTrue">
				<wx-view class="index_wrap scollTrue">
					<wx-view class="index_name" v-for="(item, index) in name" :key="index">
						<wx-view class="clear index_wrap_item" @click="nameItem(item.id)" data-id="{{}}">
							<wx-view class="index_name_img left">
								<wx-image mode="aspectFit" class="index_name_img" :src="'http://image.vdongchina.com/'+item.headUrl"></wx-image>
							</wx-view>
							<wx-view class="index_person left">
								<wx-view class="index_wrap_name">{{item.name}}</wx-view>
								<wx-view class="index_wrap_job">{{item.categoryName}}</wx-view>
								<!-- <wx-view class="index_wrap_star display-flex">
									<wx-image v-for="n in count" :key="n" class="index_wrap_star_image" :id="n" src="http://image.vdongchina.com/M00/01/84/ZSUkmVm2AxuENKDOAAAAAPH2r74290.png" />
								</wx-view> -->
							</wx-view>
						</wx-view>
					</wx-view>
				</wx-view>
			</wx-view>
		</wx-view>
	</wx-view>
	<wx-view v-else class="lists">
		<wx-view class="nolists">暂无数据</wx-view>
	</wx-view>
</template>
<script>
let _Builderinfo = {
	editorConfig: {
		bgColor: {
			el: ['text', 'color'],
			label: '设置组件背景色',
			type: 'String',
			value: '#FFFFFF',
			director: 'ColorPicker'
		},
		text: {
			el: ['textarea'],
			label: '请输入文本',
			type: 'String',
			value: '匠星',
			director: 'Input'
		},
		fontSize: {
			el: ['number'],
			label: '调整字号',
			type: 'Number',
			value: '16',
			director: 'Fsize'
		},
		fontWeighta: {
			label: '是否加粗',
			type: 'String',
			value: 'bold',
			director: 'fontWeight'
		}
	},
	comName: '技师信息',
	props: {
		bgColor: {
			default: '#FFFFFF',
			type: String
		},
		text: {
			default: '匠星',
			type: String
		},
		fontSize: {
			default: '16',
			type: String
		},
		fontWeighta: {
			default: 'bold',
			type: String
		}
	},
	data() {
		return {
			count: 3,
			name: []
		}
	},
	onLoad() {
		var that = this
		//console.log("onload")
		wx.request({
			url: this.$root.apiServer + this.$root.appid + '/basic/api/staff/queryStaff',
			// url: this.$root.apiServer+this.$root.appid+ '/72FIlvny2aA3KCfj9Ox/basic/api/staff/queryStaff',
			method: 'POST',
			data: {
				pageNum: 1,
				pageSize: 4
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success(res) {
				//console.log(res)
				that.name = res.data.data.list.filter(item => {//匠星列表
					return item.status == 1
				});
			}
		})
	},
	methods: {
		nameItem(id){
			wx.navigateTo({
				url: '../actorsManicuristIndex/actorsManicuristIndex?id='+id
			})			
		},
		toManicurist() {
			wx.navigateTo({
				url: '../actorsManicurist/actorsManicurist'
			})
		}
	}

}

export default ((obj) => {
	//console.log("obj",obj)

	let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
	obj.methods = obj.methods || {}
	Object.keys(obj || {}).forEach(name => {
		if (lifeCycles.indexOf(name) > -1) {
			obj.methods[name] = obj[name]
		}
	})
	obj.methods['onLoad'] = function(...args) {
		wx.setNavigationBarTitle(obj.config && {
			title: obj.config.navigationBarTitleText
		})
		obj['onLoad'] && obj['onLoad'].apply(this, args)

	 //console.log("args",args)
	}
	return obj
})(_Builderinfo)
</script>
<style scoped lang="scss">
.scollTrue {
	overflow: -webkit-paged-x;
}

.classify {
	padding-bottom: 1px;
	background: #FFFFFF;
	/* margin-bottom: 60px;*/
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

.index_wrap {
	width: 100%;
	display: flex;
}

.index_wrap_item {
	width: 180px;
}

.index_name {
	/*flex: 1;*/
	border-right: solid 1px #f8f8f8;
	padding: 15px;
}

.index_name:last-child {
	border-right: none
}

.index_name_img {
	width: 70px;
	height: 70px;
	border-radius: 50%;
	overflow: hidden
}

.index_name_img_image {
	width: 70px;
	height: 70px;
}

.index_person {
	width: 95px;
	margin-left: 15px;
}

.index_wrap_name {
	line-height: 23px;
	font-size: 16px;
	font-weight: bold;
}

.index_wrap_job {
	margin-top: 8px;
}

.index_wrap_star {
	margin-top: 10px;
}

.index_wrap_star_image {
	width: 16px;
	height: 15px;
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

.nolists {
	padding: 30px;
	background: #fff;
	font-size: 15px;
	text-align: center;
	margin-bottom: 10px;
}
</style>