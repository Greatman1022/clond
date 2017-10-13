var baseTpl = [{
	"title": "个人中心",
	"pageName": "personCenter",
	"GoodsId": "",
	"signGoodsId": "",
	"children": [{
		"com": "perCenterHead",
		"items": {
			"headerBgSrc": "https://image.vdongchina.com/M00/00/5C/ZSUkmVmJXoaEQF8UAAAAACBxOlQ106.png",
			"color": "#FFFFFF"
		},
		"id": ""
	}, {
		"com": "perCenterList",
		"items": {
			"arr_hidden": [{
				"title": "商品订单",
				"is_hidden": 1,
				"src": "../orderList/orderList",
				"img_right": "https://image.vdongchina.com/M00/00/5F/ZSUkmVmKgJ6EeffoAAAAACgIqHc015.png"
			}, {
				"title": "购物车",
				"is_hidden": 1,
				"src": "../car/car",
				"img_right": "https://image.vdongchina.com/M00/00/60/ZSUkmVmKxK-EBC9lAAAAAAE4uDc448.png"
			},{
				"title": "我的预约",
				"is_hidden": 1,
				"src": "../order_y/order_y",
				"img_right": "https://image.vdongchina.com/M00/00/6C/ZSUkmVmNJPqEPDVhAAAAABZuDlI415.png"
			},
			{
				"title": "服务订单",
				"is_hidden": 1,
				"src": "../myorder/myorder",
				"img_right": "https://image.vdongchina.com/M00/03/09/ZSUkmVnbLTGESzZCAAAAAG1x6uM953.jpg"
			},
			{
				"title": "我的收藏",
				"is_hidden": 1,
				"src": "../secondPagesCollect/secondPagesCollect",
				"img_right": "https://image.vdongchina.com/M00/01/93/ZSUkmVm3TCyEIYb1AAAAAGtygKM521.jpg"
			},
			{
				"title": "我的社区",
				"is_hidden": 1,
				"src": "../communityMy/communityMy",
				"img_right": "https://image.vdongchina.com/M00/03/09/ZSUkmVnbLSOEN5SeAAAAALRXq-8258.png"
			},
			{
				"is_hidden": 0,
        "title": "启用会员卡",
        "list": [
          {
              "title": "余额充值",
      				"src": "../recharge/recharge",
      				"img_right": "https://image.vdongchina.com/M00/02/C0/ZSUkmVnOAeKEYJhdAAAAAGpYGMk195.png"
          },
          {
              "title": "充值记录",
      				"src": "../rechargeRecord/rechargeRecord",
      				"img_right": "https://image.vdongchina.com/M00/02/C0/ZSUkmVnOAgmELvA1AAAAAPkWzfQ682.png"
          },
          {
              "title": "完善资料",
      				"src": "../organizingData/organizingData",
      				"img_right": "https://image.vdongchina.com/M00/02/C0/ZSUkmVnOAiOEdhOzAAAAADI89tE608.png"
          },
          {
              "title": "支付密码管理",
      				"src": "../passwordManage/passwordManage",
      				"img_right": "https://image.vdongchina.com/M00/02/C0/ZSUkmVnOAlWEeGB8AAAAAOI0-DA417.png"
          }
        ]
			}
		]
		},
		"id": ""
	}, {
		"com": "nav",
		"items": {
			"fixed": "bottom",
			"hidden": true,
			"color": "#000",
			"activeColor": "#38adff",
			"bgColor": "#f7f7fa",
			"size": "30",
      "navs": [{
				"text": "首页",
				"url": "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png",
				"activeUrl": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png",
				"to": "../index/index",
				"code": "0*index*"
			}, {
				"text": "发现",
				"url": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png",
				"activeUrl": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png",
				"to": "",
				"code": ""
			}, {
				"text": "购物车",
				"url": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png",
				"activeUrl": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png",
				"to": "",
				"code": ""
			}, {
				"text": "我的",
				"url": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png",
				"activeUrl": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png",
				"to": "",
				"code": ""
			}]
		},
		"id": ""
	}],
	"is_del": false,
	"advancedCpt": [],
	"navigationBarBackgroundColor": "#FFFFFF",
	"navigationBarTextStyle": "black",
	"onShareAppMessage": {
		"title": "个人中心",
		"path": "/personCenter/personCenter"
	}
},{
  "title": "社区",
	"pageName": "community",
  "children": [{
		"com": "community",
		"items": {
      "height": "160",
      "swiperSlides":  [
          {
              "url": 'http://image.vdongchina.com/M00/00/2F/ZSUkmVl1ZOKEewc4AAAAACPCWF4187.jpg',
              "to": '',
              "code": ''
          },
          {
              "url": 'http://image.vdongchina.com/M00/00/BF/ZSUkmVmc0GiEB_t9AAAAAOwJ5G8813.jpg',
              "to": '',
              "code": ''
          }
      ],
      "indicatorDots":  true,
      "indicatorColor": 'rgba(225, 8, 37, 1)',
      "indicatorActiveColor":'#ffffff',
      "autoplay":true,
      "current": 0,
      "interval":5000,
      "duration": 500,
      "circular": false
		},
		"id": ""
	},{
      "com": "posted",
      "items": {}
  },{
		"com": "nav",
		"items": {
			"fixed": "bottom",
			"hidden": true,
			"color": "#000",
			"activeColor": "#38adff",
			"bgColor": "#f7f7fa",
			"size": "30",
			"navs": [{
				"text": "首页",
				"url": "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png",
				"activeUrl": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png",
				"to": "../index/index",
				"code": "0*index*"
			}, {
				"text": "发现",
				"url": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png",
				"activeUrl": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png",
				"to": "",
				"code": ""
			}, {
				"text": "购物车",
				"url": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png",
				"activeUrl": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png",
				"to": "",
				"code": ""
			}, {
				"text": "我的",
				"url": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png",
				"activeUrl": "http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png",
				"to": "",
				"code": ""
			}]
		},
		"id": ""
	}],
  "is_del": false,
	"advancedCpt": [],
	"navigationBarBackgroundColor": "#FFFFFF",
	"navigationBarTextStyle": "black",
	"onShareAppMessage": {
		"title": "社区",
		"path": "/community/community"
	}
}]
export default {
	baseTpl
}
