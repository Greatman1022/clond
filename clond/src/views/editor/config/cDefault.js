let pConf = {
  'base': {
    name: '基础',
    hidden: [],
    data: [
      {com: 'text', 'comName': '文本', 'specialShow': 'freePanel', 'hidden': ''},
      {com: 'video', 'comName': '视频', 'specialShow': '', 'hidden': ''},
      {com: 'picture', 'comName': '图片', 'specialShow': 'freePanel', 'hidden': ''},
      {com: 'slider', 'comName': '普通轮播', 'specialShow': '', 'hidden': ''},
      {com: 'specialSlider', 'comName': '后台轮播', 'specialShow': '', 'hidden': ''}
    ]
  },
  'list': {
    name: '列表',
    hidden: ['cloud_shop'],
    data: [
      {com: 'classification', 'comName': '图文列表', 'specialShow': '', 'hidden': ''},
      {com: 'newProlists', 'comName': '商品列表', 'specialShow': '', 'hidden': ''},
	    {com: 'prolistsSide', 'comName': '商品列表', 'specialShow': '', 'hidden': ''},
      {com: 'bespeak', 'comName': '预约活动', 'specialShow': '', 'hidden': ''}
    ]
  },
  'fun': {
    name: '功能',
    hidden: [],
    data: [
      {com: 'kefu', 'comName': '客服', 'specialShow': '', 'hidden': 'cloud_shop'},
      {com: 'nav', 'comName': '底部导航', 'specialShow': '', 'hidden': 'cloud_shop'},
      {com: 'swiperpic', 'comName': '滑动导航', 'specialShow': '', 'hidden': ''},
      {com: 'makeCall', 'comName': '一键呼叫', 'specialShow': '', 'hidden': ''},
      {com: 'setMap', 'comName': '地图服务', 'specialShow': '', 'hidden': ''},
      {com: 'search', 'comName': '搜索框', 'specialShow': '', 'hidden': 'cloud_shop'},
      {com: 'builderinfo', 'comName': '技师信息', 'specialShow': '', 'hidden': 'cloud_shop'},
      {com: 'StoreInfo', 'comName': '商户信息', 'specialShow': '', 'hidden': 'cloud_shop'},
      {com: 'goodsedit', 'comName': '服务项目', 'specialShow': '', 'hidden': 'cloud_shop'}
    ]
  },
  'list2': {
    name: '列表',
    hidden: ['flashbuy', 'flashbuy_2'],
    data: [
      {com: 'goodslistnew', 'comName': '商品列表', 'specialShow': '', 'hidden': ''},
      {com: 'help', 'comName': '客服', 'specialShow': '', 'hidden': ''},
      {com: 'searchBox', 'comName': '搜索框', 'specialShow': '', 'hidden': ''},
      {com: 'indexNav', 'comName': '通用导航', 'specialShow': '', 'hidden': ''},
    ]
  }
}
export default {
  pConf
}
