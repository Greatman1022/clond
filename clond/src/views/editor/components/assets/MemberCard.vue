<template>
  <wx-view class="contant clear" :style="'background:' + bgColor">
      <wx-view class="message" @click="toInfo">
        <wx-image class="message_image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAOVBMVEUAAAD///////////////////////////////////////////////////////////////////////8KOjVvAAAAEnRSTlMAhw5zXrzvTcwo4Jg3GwWtxENiBZUEAAACd0lEQVRo3u3Z2bKbMAwGYHlB3rHR+z9sezpOOymEWLY5ywzfNckPsgixACaBRCjgUoX+WOBChioD1wlUXVkw8RkhiioFF3Faeaq80g5mW03w9B8fzArzxEAvhDirbwudKDO6ebP0RtlG12JfKMR90eRQQ/mnlc5Cx7SuKWqR/VNwHPwVqbJO8CTpTP+Y4VuPUCU4kJSnBw1dND2oteEgPVSrJcGJlKnqWJdElWq+4rX38URbw6306A12sTg12DoLhrUzWT1igaWeW4BGuedSMnMp5e6kmj+juA9m7Fh2yeh4fr0EvyUt+7bPtVrs8xLsO9Hwf+ky+9oNfxnLHcJZk+UOuUPukDvkR4WYO+QOuUN+akj5pn+JekM2YNjYGzrkb84ifUD2jiZ17Psl89IROFZkllj0jLELc+Pke2a/grfysW4yu7b+jrVjROBZkbOVd52TcsHpybI7mNXEC2MYk4EtNw99JD0WkM01D9fswLuLUAvWeBwenE17FUTblDaODZJ1S4YYfR+l32dY6GbfzWBFPQAldJN0XoxM++7t72MKp5P5CEPi2dQah2tVyfpN/nWI11EORUTt6+m+CKlsUJvs+X4VLFXnIQ8+KOMao6Qzqr4jPA+hQ75kofTmklx3TymZ3KaVCIunQ7CnM51Cb21ZqmKtRzqVNRxJKiBNgUGlkwe1UxkHA7JyUJ0FaWGpixXa1bVr7pcFqREujF7cNVA0H+1jPb7ohSUIZWJtvWFSJhc3Y/RvxmzRJSnh9nXW6A7FFeaR9MLUtc90KMBMjg4lmCrQAQGTedopMJvE3fNMwnSp0JNFwhW0p7+sgauYYJEIi9iA4xel+3r4kFR2wQAAAABJRU5ErkJggg==" />
      </wx-view>

			<wx-view class="left index_scan">
				<wx-image class="index_scan_image" :src="vipCard" />
				<wx-view class="cardNumber ft" :style="'color:'+numColor" v-if="userStatus">{{cardNumber}}</wx-view>
				<wx-view class="text" v-if="userStatus">扫一扫</wx-view>
			</wx-view>

			<wx-view class="right index_project" :style="'color:'+txtColor">
        <wx-view class="" v-if="userStatus">
  				<!--会员的样式-->
  				<wx-view class="text index_vip" @click="clickCard">VIP会员</wx-view>
  				<wx-view class="text index_rank">目前等级lv.{{level}}</wx-view>
  				<wx-view class="text index_discount">极限：单笔订单不超过100享受8折</wx-view>
  			</wx-view>

  			<wx-view class="w-100" v-else>
  				<!--领取会员卡-->
  				<wx-view class="draw ft32 txt-c w-100" @click="toClubcard">领取会员卡</wx-view>
  				<wx-view class="w-100 txt-c ft22 draw_title">快来领取你的专属会员卡~</wx-view>
  			</wx-view>

        <wx-view class="index-nav">
          <wx-view class="index-item" v-for="(item, index) in navs" :key="item.to" @click="itemTapHandler(item.to)">
            <wx-image class="index-item_image" :src="item.src" />
						<wx-text class="index-item_text">{{item.text}}</wx-text>
          </wx-view>
        </wx-view>
			</wx-view>

      <!--未领取会员卡dialog-->
  		<wx-view class="mendbackg" v-if="isVip">
  			<wx-view class="mendDialog">
  				<wx-view class="vipDialog_hint">
  					<wx-view>您还未领取会员卡，</wx-view>
  					<wx-view>会员卡功能咱不能使用！</wx-view>
  				</wx-view>
  				<wx-view class="vipDialog_confirm" @click="vipCard_confirm">确定</wx-view>
  			</wx-view>
  		</wx-view>
		</wx-view>
</template>

<script>
let _MemberCard = {
  editorConfig: {
    bgColor: {
      el: ['text', 'color'],
      label: '背景色',
      type: 'String',
      value: '#141414',
      director : 'ColorPicker'
    },
    txtColor: {
      el: ['text', 'color'],
      label: '字体颜色',
      type: 'String',
      value: '#fff',
      director : 'ColorPicker'
    },
    vipCard: {
      el: ['uploader'],
      label: '会员卡',
      type: 'String',
      value: 'http://image.vdongchina.com/M00/00/2B/ZSUkmVlu8ziEJ_9nAAAAADNn0Is724.png',
      director : 'uploader'
    },
    numColor: {
      el: ['text', 'color'],
      label: '卡号颜色',
      type: 'String',
      value: '#fff',
      director : 'ColorPicker'
    }
  },
  comName:"会员卡",
  props: {
    bgColor: {
      default: '#141414',
      type: String
    },
    txtColor: {
      default: '#fff',
      type: String
    },
    vipCard: {
      default: 'http://image.vdongchina.com/M00/00/2B/ZSUkmVlu8ziEJ_9nAAAAADNn0Is724.png',
      type: String
    },
    numColor: {
      default: '#fff',
      type: String
    }
  },
  data () {
    return {
      isVip: false,
			userStatus: 0,
			level:1,
			cardNumber: "1776 7375 0074",
      navs : [
        {
          text: '个人信息',
          src: 'http://image.vdongchina.com/M00/00/2B/ZSUkmVlvBqeEWrr3AAAAANIoePc875.png',
          to: '../userinfo/userinfo'
        },
        {
          text: '我的收藏',
          src: 'http://image.vdongchina.com/M00/00/2B/ZSUkmVlvBtyEQRg3AAAAAP4AroA280.png',
          to: '../secondPagesCollect/secondPagesCollect'
        },
        {
          text: '我的订单',
          src: 'http://image.vdongchina.com/M00/00/2B/ZSUkmVlvBviEP88aAAAAAI9-hFE239.png',
          to: '../order/order'
        }
      ]
    }
  },
  methods: {
    itemTapHandler (to) {
        wx.navigateTo({
					url: to
				})
    },
    //跳转我的会员
			clickCard() {
				wx.navigateTo({
					url: '../secondPagesCard/secondPagesCard'
				})
			},
			//跳转收藏
			toCollect() {
				wx.navigateTo({
					url: '../secondPagesCollect/secondPagesCollect'
				})
			},
			//跳转订单
			toOrder() {
				wx.navigateTo({
					url: '../order/order'
				})
			},
			//领取会员卡
			toClubcard() {
				wx.navigateTo({
					url: '../clubCard/clubCard'
				})
			},
			toInfo(){
				wx.navigateTo({
					url: '../centerInfo/centerInfo'
				})
			},
			// 领取会员卡
			vipCards(e) {
				if(!this.data.vipCard) {
					this.vipCard=true
				}

			},
			vipCard_confirm(e) {
				this.vipCard=false
			}
  }
}

export default ((obj) => {
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
})(_MemberCard)
</script>

<style scoped>
.clear::after {
  display:block;
  clear:both;
  content:"";
  height:0;
  overflow:hidden;
  visibility:hidden;
}

.left{
  float: left;
}

.right{
  float: right;
}

.contant {
  margin: 5px;
  height:247px;
  position: relative
}
.message{
  position: absolute;
  top: 5px;
  right: 5px;
}
.message_image{
  width: 20px;
  height: 20px;
}
.index_scan {
		margin-top: 20px;
		margin-left:20px;
		position: relative;
		width: 132px;
		height: 212px;
		overflow: hidden;
		border-radius: 8px
	}

	.index_scan_image {
    width: 132px;
		height: 212px;
	}

  .cardNumber {
		position: absolute;
		top: 35px;
		left: -30px;
		transform: rotate(-90deg);
		font-family: PingFangSC-Medium;
		font-size: 11px;
		color: #FFFFFF;
		letter-spacing: 0;
	}

	.index_scan .text {
		position: absolute;
		line-height: 15px;
		color: #fff;
		background: #f19abd;
		display: block;
		bottom: 0;
		width: 132px;
		text-align: center;
    font-size: 12px;
	}

	.index_project {
		width: 190px;
		color: #fff;
		margin-top:20px;
		margin-right: 10px;
		text-align: center;
		margin-left: 10px;
	}

	.index_vip {
		line-height: 25px;
		font-size: 18px;
		margin-bottom: 10px;
	}

	.index_rank {
		margin-bottom: 15px;
	}

	.index_discount {
		line-height: 14px;
		font-size: 11px;
		margin-bottom: 30px;
	}

	.index-nav {
		display: flex
	}

	.index-item {
		flex: 1;
		text-align: center
	}

	.index-item_image {
		width: 40px;
		height: 40px
	}

	.index-item_text {
		display: block;
		margin-top: 20px;
	}

  .draw {
    width: 153px;
    height: 34px;
    opacity: 0.8;
    border: 1px solid #FFFFFF;
    border-radius: 8px;
    line-height: 34px;
    margin: 0 auto;
    margin-top: 16px;
    font-size: 16px;
  }

  .draw_title {
    margin-top: 15px;
    margin-bottom: 26px;
    font-size: 11px;
  }
  .mendbackg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
		z-index: 9
	}

	.mendDialog {
		position: fixed;
		width: 280px;
		height: 175px;
		left: 50%;
		top: 50%;
		margin-left: -140px;
    margin-top: -88px;
		background: #fff;
		border-radius: 4px;
		z-index: 10;
	}
	.vipDialog_hint {
		padding: 25px 45px 20px 53px;
		text-align: center;
		font-size: 16px;
		color: #666666;
		line-height: 25px;
	}

	.vipDialog_confirm {
		line-height: 40px;
		color: #FF4C90;
		border-top: #e5e5e5 1px solid;
		position: absolute;
		bottom: 0;
		text-align: center;
		display: block;
		width: 280px;
		font-size: 18px;
	}
</style>
