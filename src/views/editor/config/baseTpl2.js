var baseTpl2 = [
  {
    "title": "分类",
    "pageName": "classlist",
    "advancedCpt": [],
    "children": [
      {
        "com": "searchBox",
        "id": "",
        "items": {
          "bgColor": "#F0F0F0",
          "bdColor": "#F7F8F8",
          "currentSrc": "",
          // "isCenter": false,
          "isLeft": false,
          "borderRadius": true
        }
      },
      {
        "com": "classlist",
        "id": "",
        "items": {
          "Ewidth": "72",
          "Eheight": "74",
          "bgColor": "#fff",
          "color": "#3a3a3a",
          "fontSize": "14",
        }
      },
      {
        "com": "goodslist",
        "id": "",
        "items": {
          "Ewidth": "170",
          "Eheight": "174",
          "bgColor": "#fff",
          "color": "#3a3a3a",
          "fontSize": "14"
        }
      },
      {
        "com": "fournav",
        "id": "",
        "items": {
          "fixed": "bottom"
        }
      }
    ],
    "is_del": false,
    "navigationBarBackgroundColor": "#47e1bb",
    "navigationBarTextStyle": "black"
  },
  {
    "title": "购物车",
    "pageName": "shopcart",
    "advancedCpt": [],
    "children": [
      {
        "com": "shopCartList",
        "items": {},
        "id": ""
      },
      {
        "com": "fournav",
        "items": {
          "fixed": "bottom"
        },
        "id": ""
      }
    ],
    "is_del": false,
    "navigationBarBackgroundColor": "#AD2121",
    "navigationBarTextStyle": "white",
    "onShareAppMessage": {
      "title": "购物车",
      "path": "/shopCart/shopCart"
    }
  },
  {
    "title": "个人中心",
    "pageName": "personal",
    "advancedCpt": [],
    "children": [
      {
        "com": "personalHead",
        "id": "",
        "items": {
          "bgColor":"transparent",
          "bgImg": "http://uploads.qusaoba.net/images/66/2017/07/RgGfxHKhf7PNkJjjpngXMGmBl4pZwK.jpg",
        }
      },
      {
        "com": "personalHeadOrder",
        "id": "",
        "items": {
          "color": "rgba(0, 0, 0, 1)",
          "orders": [
            {
              "text": "全部订单",
              "url": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/orders.png",
              "to": "../perorder/perorder",
              "code": ""
            },
            {
              "text": "待付款",
              "url": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/payment.png",
              "to": "../perorder/perorder?state=1",
              "code": ""
            },
            {
              "text": "待发货",
              "url": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/delivered.png",
              "to": "../perorder/perorder?state=2",
              "code": ""
            },
            {
              "text": "待收货",
              "url": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/received.png",
              "to": "../perorder/perorder?state=3",
              "code": ""
            },
            {
              "text": "待退款",
              "url": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/refunded.png",
              "to": "../perorder/perorder?state=4",
              "code": ""
            }
          ]
        }
      },
      {
        "com": "personalList",
        "id": "",
        "items": {
          "arr_hidden": [
            {
              "title": "我的资料",
              "is_hidden": 1,
              "src": "../permater/permater",
              "img_right": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-users.png",
              "icon_color": "#da4453"
            },
            {
              "title": "优惠券",
              "is_hidden": 1,
              "src": "../percouponlist/percouponlist",
              "img_right": "http://image.vdongchina.com/M00/01/17/ZSUkmVmndzaEKf71AAAAACFkt9E947.png",
              "icon_color": "#ff76d6"
            },
            {
              "title": "购物车",
              "is_hidden": 1,
              "src": "../shopcart/shopcart",
              "img_right": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-car-2.png",
              "icon_color": "#f6bb42"
            },
            {
              "title": "我的收藏",
              "is_hidden": 1,
              "src": "../percollection/percollection",
              "img_right": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-star1.png",
              "icon_color": "#37bc9b"
            },
            {
              "title": "我的足迹",
              "is_hidden": 1,
              "src": "../perfootprint/perfootprint",
              "img_right": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-foot.png",
              "icon_color": "#4a89dc"
            },
            {
              "title": "收货地址",
              "is_hidden": 1,
              "src": "../place/place",
              "img_right": "http://uploads.qusaoba.net/temp/demo/shop/v2.0/Personal/img/symbols-adress4.png",
              "icon_color": "#da4453"
            },
            {
              "title" : "秒杀订单",
              "is_hidden" :1,
              "src":"../perorder/perorder?isseckill=1",
              "img_right":"http://image.vdongchina.com/M00/01/18/ZSUkmVmneDmENYPdAAAAAAenoYA548.png",
              "icon_color":"#F9690D"
            },
            {
              "title" : "拼团订单",
              "is_hidden" :1,
              "src":"../tuorder/tuorder",
              "img_right":"http://image.vdongchina.com/M00/01/17/ZSUkmVmndaKEH5GMAAAAAGo2-X8531.png",
              "icon_color":"#F8D446"
            },
          ]
        }
      },
      {
        "com": "fournav",
        "items": {
          "fixed": "bottom"
        },
        "id": ""
      }
    ],
    "is_del": false,
    "navigationBarBackgroundColor": "#FFFFFF",
    "navigationBarTextStyle": "black",
    "onShareAppMessage": {
      "title": "个人中心",
      "path": "/personal/personal"
    }
  }

]
export default {
	baseTpl2
}
