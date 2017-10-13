<template>
	<wx-view class="container">
  <wx-view class="contant clear">
      <!--<img  class="card_backg" src="~assets/images/meiye/bg.png" />-->
      <img class="card_backg" :src="currentSrc"/>
      <wx-view class="card_top">
          <wx-view class="clear card_top_cant">
              <wx-view class="left">权限：全场折扣</wx-view>
              <wx-view class="right card_top_look">查看会员权限？</wx-view>
          </wx-view>
          <wx-view class="clear card_top_vip">
              <wx-view class="left clear">
                  <wx-view class="left card_vip_head">
                       <img   class="card_vip_head_image" src="~assets/images/meiye/head.png"/>
                  </wx-view>
                   <wx-view class="left card_vip_cant">
                      <wx-view class="card_vip_name">Bullet</wx-view>
                      <wx-view class="card_vip_post">VIP会员</wx-view>
                  </wx-view>                 
              </wx-view>
              <wx-view class="right card_vip_balance">
                  我的余额：200￥
              </wx-view>
          </wx-view>
          <wx-view class="clear card_top_class">
              <wx-view class="left">lv.15</wx-view>
              <wx-view class="right card_alass_plan">
                <wx-view class="card_alass_rate" style="width:60%"></wx-view>
              </wx-view>
          </wx-view>
          <wx-view class="card_alass_rade">再消费￥100升为lv.16</wx-view>
      </wx-view>
  </wx-view>
</wx-view> 
</template>
<script>
	let _Search = {
		editorConfig: {			
		    currentSrc: {
		      el: ['uploader'],
		      label: '设置会员卡背景图',
		      type: 'String',
		      value: 'http://image.vdongchina.com/M00/00/99/ZSUkmVmWjb6EVjQnAAAAACBxOlQ439.png',
		      director : 'uploader'
		    }
		},
		comName:"我的会员卡",
		props: {			
		    currentSrc: {
		      default: 'http://image.vdongchina.com/M00/00/99/ZSUkmVmWjb6EVjQnAAAAACBxOlQ439.png',
		      type: String
		    }
		},
		data() {
			return {
				   
			}
		},
		onLoad() {
//			 var that = this
//			 wx.request({
//			     url: 'https://gw-test.vdongchina.com/b100/basic/api/member/getMemberCard',
//			     method: 'POST',
//			     header: {
//			         'content-type': 'application/json'
//			     },
//			     success (res) {
//			       if(res.data.success){
//			         that.items = res.data.categorys
//			         that.handler(res.data.categorys[0].cId,0)
//			       }
//			     }
//			 })
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
<style  scoped lang="scss">	
.contant{margin: 5px;   height: 200px;background: #141414;position: relative}
.contant .card_backg{width: 365px;height: 200px;}
.card_top{position: absolute;width: 345px;height: 160px;top:20px;left: 10px;color: #ffffff}
.card_top_cant{line-height: 24px;}
.card_top_look{width: 105px;height: 24px;background: #000000;border:solid 1px #ffffff;border-radius: 15px;font-size: 13px;text-align: center;padding-left:10/2px;}
.card_top_vip{margin-top: 10px;}
.card_vip_head_image{width: 60px;height: 60px;}
.card_vip_cant{margin-left: 10px;}
.card_vip_name{line-height: 23px;font-size: 16px;font-weight: bold;margin-bottom: 8px;}
.card_vip_post{line-height: 19px;font-size: 13px;}
.card_vip_balance{font-size: 16px;line-height: 20px;margin-top: 15px;font-weight:bold }
.card_top_class{margin-top: 20px;}
.card_alass_plan{width: 310px;height: 5px;background: #ffffff;position: relative;top: 5px;border-radius: 5px;overflow: hidden}
.card_alass_rate{position: absolute;top:0;left:0;height: 5px;background:#FF4C90;border-radius: 5px}
.card_alass_rade{margin-top: 5px;font-size: 13px;}

.card_info{margin-top: 20px;}
._navbar_title{line-height: 34px;text-align: center;font-size: 16px;display: flex;border:solid 1px #FF4C90;color: #999999}
._navbar_title .active{color: #ffffff;background: #FF4C90} 
._navbar_item{flex:1;}

._composite_item{line-height: 45px;padding: 5px 15px;background: #FFFFFF;margin-bottom: 5px;}
._navbar_matter_content{border-top: 1px solid #f0f0f0;display: flex;color: #999999;}
._navbar_matter_name{flex:7}
._navbar_matter_number{flex: 1}
._navbar_matter_price{flex: 4;text-align: right}
._navbar_matter_no{text-align: center;}
._navbar_matter_no .no_record img{width: 40%;margin: 10px 0px;}
._navbar_matter_no .no_txt{color:#999999 ;font-size: 16px;}

._composite .mycard{position: relative;color: #FFFFFF;}
._composite .mycard .cardimg{position: relative;}
._composite .mycard .cardtype{position: absolute;top:10px;font-size:16px ;left:20px}
._composite .mycard .cardper{position: absolute;top:30px;font-size:32px;right: 50px;}
._composite .mycard .cardfooter{background: #f0f0f0;color: #999;display: block;padding: 10px;text-align: right;border-radius:0px 0px 10px 10px;}
.left{float: left;}
.right{float: right;}
.clear:after{height: 0;content: ".";clear: both;display: block;visibility: hidden;}
</style>