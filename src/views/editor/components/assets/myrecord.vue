<template>
	<wx-view class="container">
		<wx-view class="card_info">
			<wx-view class="_navbar_title bmg">
				<wx-view class="_navbar_item" :class="currentTab==0 ? 'active' : ''" data-idx="0" @click="navbarTap">
					我的消费记录
				</wx-view>
				<wx-view class="_navbar_item" :class="currentTab==1 ? 'active' : ''" data-idx="1" @click="navbarTap">
					我的卡券
				</wx-view>
			</wx-view>

			<wx-view v-if="currentTab==0" class="_composite">
				<wx-view class="_navbar_matter" v-if="noRecord">
					<wx-view class="_composite_item" v-for="(item,index) in composite" :key="index">
						<wx-view class="_navbar_matter_title clear">
							<wx-view class="left">{{item.title}}</wx-view>
							<wx-view class="right">{{item.time}}</wx-view>
						</wx-view>
						<wx-view class="_navbar_matter_content" v-for="(items,index) in item.record" :key="index">
							<wx-view class="_navbar_matter_name">{{items.name}}</wx-view>
							<wx-view class="_navbar_matter_number">X {{items.num}}</wx-view>
							<wx-view class="_navbar_matter_price">({{items.type}})￥{{items.price}}</wx-view>
						</wx-view>
					</wx-view>
				</wx-view>
				<wx-view class="_navbar_matter_no" v-else>
					<wx-view class="no_record"><img src="~assets/images/meiye/no_record.png" /></wx-view>
					<wx-view class="no_txt">暂无消费记录</wx-view>
				</wx-view>
			</wx-view>

			<wx-view v-if="currentTab==1" class="_composite clear" :style="'paddingRight:'+spacing[1] + 'px;paddingLeft:'+ spacing[3] + 'px;'">
				<wx-view class="_navbar_matter mycard clear" v-if="noCoupons" v-for="(items,index) in coupons" :key="index" :style="'height:' + height + 'px;width:'+width+'%;'+position+'z-index:'+zIndex+';marginTop:'+ spacing[0] + 'px;marginBottom:'+ spacing[2] + 'px;'">
					<img class="cardimg" :src="currentSrc"/>
					<wx-view class="cardtype">{{items.type}}</wx-view>
					<wx-view class="cardper">{{items.percent}}</wx-view>
					<wx-view class="cardfooter">已领取优惠券有效期:{{items.startTime}}~{{items.endTime}}</wx-view>
				</wx-view>
				<wx-view class="_navbar_matter_no" v-else>
					<wx-view class="no_record"><img src="~assets/images/meiye/no_coupons.png" /></wx-view>
					<wx-view class="no_txt">暂无优惠券</wx-view>
				</wx-view>
			</wx-view>

		</wx-view>
	</wx-view>
</template>
<script>
	let _Search = {
		editorConfig: {
			height: {
				el: ['number'],
				label: '调整图片高度',
				type: 'Number',
				value: '140',
				director: 'Fsize'
			},
			width: {
				el: ['number'],
				label: '调整图片宽度(百分比)',
				type: 'Number',
				value: '100',
				director: 'Fsize'
			},
			positionxy: {
				label: '位置定位',
				type: 'Array',
				value: [],
				director: 'positionxy'
			},
			currentSrc: {
				el: ['uploader'],
				label: '上传图片',
				type: 'String',
				value: 'http://image.vdongchina.com/M00/00/99/ZSUkmVmWjvyEUFfQAAAAAEi7SVE618.png',
				director: 'uploader'
			},
			spacing: {
				el: ['number'],
				label: '调整间距',
				type: 'Array',
				value: [10, 15, 10, 15],
				director: 'spacing'
			}
		},
		comName: "我的卡券",
		props: {
			width: {
				default: '100',
				type: String
			},
			positionxy: Array,
			height: {
				default: '140',
				type: String
			},
			currentSrc: {
				default: 'http://image.vdongchina.com/M00/00/99/ZSUkmVmWjvyEUFfQAAAAAEi7SVE618.png',
				type: String
			},
			position: {
				default: "",
				typeof: String
			},
			zIndex: {
				default: null,
				typeof: Number
			},
			spacing: {
				default: function() {
					return [10, 15, 10, 15]
				},
				type: Array
			}
		},
		data() {
			return {
				currentTab: 1,
				noRecord: true,
				noCoupons: true,
				composite: [{
						title: "罗蒙环球城银泰城店",
						time: "2017-05-03",
						record: [{
								name: "夏日清凉！美人鱼钻石钻甲",
								num: "1",
								price: "100",
								type: "余额支付"
							},
							{
								name: "夏日清凉！美人鱼钻石钻甲",
								num: "1",
								price: "100",
								type: "微信支付"
							},

						]
					},
					{
						title: "罗蒙环球城银泰城店",
						time: "2017-05-31",
						record: [{
							name: "夏日清凉！美人鱼钻石钻甲",
							num: "1",
							price: "100",
							type: "余额支付"
						}, ]
					},
					{
						title: "罗蒙环球城银泰城店",
						time: "2017-05-03",
						record: [{
								name: "夏日清凉！美人鱼钻石钻甲",
								num: "1",
								price: "100",
								type: "微信支付"
							},
							{
								name: "夏日清凉！美人鱼钻石钻甲",
								num: "1",
								price: "100",
								type: "微信支付"
							},
						]
					},
				],
				coupons: [{
						type: "优惠券",
						percent: "7折",
						startTime: "2017-05-31",
						endTime: "2017-06-31"

					}, {
						type: "代金券",
						percent: "￥30",
						startTime: "2017-05-31",
						endTime: "2017-06-31"

					},
					{
						type: "全场满减券(满100减10元)",
						percent: "￥10",
						startTime: "2017-05-31",
						endTime: "2017-06-31"

					}
				]
			}
		},
		onLoad() {
			// var that = this
			// wx.request({
			//     url: this.$root.apiServer + this.$root.appid +'/basic/api/imagetext/category/get',
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
			// },
			navbarTap: function(e) {
				this.currentTab = e.target.dataset.idx
			},
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
<style scoped lang="scss">
	.contant {
		margin: 5px;
		height: 200px;
		background: #141414;
		position: relative
	}
	
	.contant .card_backg {
		width: 365px;
		height: 200px;
	}
	
	.card_top {
		position: absolute;
		width: 345px;
		height: 160px;
		top: 20px;
		left: 10px;
		color: #ffffff
	}
	
	.card_top_cant {
		line-height: 24px;
	}
	
	.card_top_look {
		width: 105px;
		height: 24px;
		background: #000000;
		border: solid 1px #ffffff;
		border-radius: 15px;
		font-size: 13px;
		text-align: center;
		padding-left: 10/2px;
	}
	
	.card_top_vip {
		margin-top: 10px;
	}
	
	.card_vip_head_image {
		width: 60px;
		height: 60px;
	}
	
	.card_vip_cant {
		margin-left: 10px;
	}
	
	.card_vip_name {
		line-height: 23px;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 8px;
	}
	
	.card_vip_post {
		line-height: 19px;
		font-size: 13px;
	}
	
	.card_vip_balance {
		font-size: 16px;
		line-height: 20px;
		margin-top: 15px;
		font-weight: bold
	}
	
	.card_top_class {
		margin-top: 20px;
	}
	
	.card_alass_plan {
		width: 310px;
		height: 5px;
		background: #ffffff;
		position: relative;
		top: 5px;
		border-radius: 5px;
		overflow: hidden
	}
	
	.card_alass_rate {
		position: absolute;
		top: 0;
		left: 0;
		height: 5px;
		background: #FF4C90;
		border-radius: 5px
	}
	
	.card_alass_rade {
		margin-top: 5px;
		font-size: 13px;
	}
	
	.card_info {
		margin-top: 20px;
	}
	
	._navbar_title {
		line-height: 34px;
		text-align: center;
		font-size: 16px;
		display: flex;
		border: solid 1px #FF4C90;
		color: #999999
	}
	
	._navbar_title .active {
		color: #ffffff;
		background: #FF4C90
	}
	
	._navbar_item {
		flex: 1;
	}
	
	._composite_item {
		line-height: 45px;
		padding: 5px 15px;
		background: #FFFFFF;
		margin-bottom: 5px;
	}
	
	._navbar_matter_content {
		border-top: 1px solid #f0f0f0;
		display: flex;
		color: #999999;
	}
	
	._navbar_matter_name {
		flex: 7
	}
	
	._navbar_matter_number {
		flex: 1
	}
	
	._navbar_matter_price {
		flex: 4;
		text-align: right
	}
	
	._navbar_matter_no {
		text-align: center;
	}
	
	._navbar_matter_no .no_record img {
		width: 40%;
		margin: 10px 0px;
	}
	
	._navbar_matter_no .no_txt {
		color: #999999;
		font-size: 16px;
	}
	
	._composite .mycard {
		position: relative;
		color: #FFFFFF;
	}
	
	._composite .mycard .cardimg {
		position: relative;
	}
	
	._composite .mycard .cardtype {
		position: absolute;
		top: 10px;
		font-size: 16px;
		left: 20px
	}
	
	._composite .mycard .cardper {
		position: absolute;
		top: 30px;
		font-size: 32px;
		right: 50px;
	}
	
	._composite .mycard .cardfooter {
		background: #f0f0f0;
		color: #999;
		display: block;
		padding: 10px;
		text-align: right;
		border-radius: 0px 0px 10px 10px;
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