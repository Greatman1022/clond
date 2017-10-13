import axios from 'axios'
import qs from 'qs'
import vdPrefix from '../../static/js/common_prefix'
let urlPrefix = {
  backend: '',
  plat: '',
  upload: '',
  docker: ''
}
// let loginUrl = ''
if (process.env.NODE_ENV === 'development') {
  urlPrefix.backend = '/api'
  urlPrefix.plat = '/devapi'
  urlPrefix.upload = '/uploadapi'
  urlPrefix.docker = '/dockerapi'
  // loginUrl = '/basic'
} else {
  urlPrefix.backend = ''
  urlPrefix.plat = ''
  urlPrefix.upload = vdPrefix.appServer.uploadServer
  urlPrefix.docker = window.location.hostname.indexOf('test') != -1 ? 'http://cloud-test.vdongchina.com/docker' : 'http://cloud.vdongchina.com/docker'
  // loginUrl = ''
}

export function fetch(url, data, method = 'GET', headers = {}) {
  return new Promise((resolve, reject) => {
    let options = {
      'method': method,
      'url': url,
      'headers': headers && typeof headers === 'object' ? headers : {}
    }
    options.headers['X-Requested-Page'] = 'json'
    options[method === 'GET' ? 'params' : 'data'] = data

    axios(options).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

/***************************************************************************/
export default {
  getAppid() {
    return window.location.pathname.replace('/backstagemanage/', '')
  },

  /* *********** 平台管理所有api START *********** */
  // 新建项目
  TypeScene() {
    return fetch(`${urlPrefix.plat}/basic/scene`)
  },
  TypeIndustry() {
    return fetch(`${urlPrefix.plat}/basic/industry`)
  },
  TemplatesList(params) {
    return fetch(`${urlPrefix.plat}/basic/templates`, params)
  },
  Carousels(params) {
    return fetch(`${urlPrefix.plat}/basic/carousels`, params)
  },
  SaveConfig(params) {
    return fetch(`${urlPrefix.plat}/guard/app/add`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  UpdateConfig(params) {
    return fetch(`${urlPrefix.plat}/guard/app/update`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  getConfig(params) {
    return fetch(`${urlPrefix.plat}/guard/app/get`, params)
  },

  // 我的小程序
  MiniList(params) {
    return fetch(`${urlPrefix.plat}/guard/app/list`, params)
  },

  // 普通用户
  dealDetailList(params) {
    return fetch(`${urlPrefix.plat}/guard/user/transactiondetail`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  getBasicCode(params) {
    return fetch(`${urlPrefix.plat}/basic/user/get/code`, params)
  },
  forgetPassword(params) {
    return fetch(`${urlPrefix.plat}/basic/user/forget/password`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  // 组件显示状态管理
  getperMission(params) {
    return fetch(`${urlPrefix.plat}/guard/module/getpermission`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  // 代理商
  deliveryAccount(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/delivery`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  agentList(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/list`, params)
  },
  agentAdd(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/add`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  transactions(params) {
    return fetch(`${urlPrefix.plat}/guard/user/transactions`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  agentUpdate(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/update`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  agentFlow(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/flow`, params)
  },
  agentUserDel(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/delete`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  agentSubaccountAdd(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/batchsubaccount`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  subAccountQuery(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/querysubaccount`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  agentChange(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/change`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  agentUpdateEdit(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/update/edit`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },

  createSecondAgeng(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/createsecondagent`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  templatesList(params) {
    return fetch(`${urlPrefix.plat}/basic/templates`, params)
  },
  templateAdd(params) {
    return fetch(`${urlPrefix.plat}/guard/template/add`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  templateupdate(params) {
    return fetch(`${urlPrefix.plat}/guard/template/update`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  getTemplate(params) {
    return fetch(`${urlPrefix.plat}/guard/template/get`, params)
  },
  templateQuery(params) {
    return fetch(`${urlPrefix.plat}/guard/template/query`, params)
  },
  getCode(params) {
    return fetch(`${urlPrefix.plat}/guard/user/get/code`, params)
  },
  getUserAppid(params) {
    return fetch(`${urlPrefix.plat}/guard/user/get/appid`, params)
  },
  verificationCode(params) {
    return fetch(`${urlPrefix.plat}/guard/user/bind`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  modifyPassword(params) {
    return fetch(`${urlPrefix.plat}/guard/user/modify/password`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  messUpdate(params) {
    return fetch(`${urlPrefix.plat}/guard/user/update`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  usernameUpdate(params) {
    return fetch(`${urlPrefix.plat}/guard/user/update/username`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  BindApplet(params) {
    return fetch(`${urlPrefix.plat}/guard/config/bind`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  codeUpload(params) {
    return fetch(`${urlPrefix.plat}/guard/version/save`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  // 获取商户号及支付秘钥
  getMchid(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/pay/mchid`, params)
  },
  modifyConfig(params) {
    return fetch(`${urlPrefix.plat}/guard/config/pay`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  openAccount(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/subaccount`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  // 基本管理上传代码
  getWalogin(params) {
    // return fetch(`http://101.37.170.129:3000/walogin`, params)
    return fetch(`${urlPrefix.upload}/walogin`, params)
  },
  getQueryLoginScanState(params) {
    return fetch(`${urlPrefix.upload}/queryLoginScanState`, params)
    // return fetch(`http://101.37.170.129:3000/queryLoginScanState`, params)
  },
  getCommitQrCode(params) {
    return fetch(`${urlPrefix.upload}/commitQrCode`, params)
    // return fetch(`http://101.37.170.129:3000/commitQrCode`, params)
  },
  getQueryQrCodeState(params) {
    return fetch(`${urlPrefix.upload}/queryQrCodeState`, params)
    // return fetch(`http://101.37.170.129:3000/queryQrCodeState`, params)
  },
  getPublish(userId, appId, wxAppId, codeVersionId, appVersion, appDesc, params) {
    return fetch(`${urlPrefix.upload}/publish?userId=${userId}&appId=${appId}&wxAppId=${wxAppId}&codeVersionId=${codeVersionId}&appVersion=${appVersion}&appDesc=${appDesc}`, params, 'POST', {
      'Content-Type': 'application/json'
    })
    // return fetch(`http://101.37.170.129:3000/publish?userId=${userId}&appId=${appId}&wxAppId=${wxAppId}&codeVersionId=${codeVersionId}&appVersion=${appVersion}&appDesc=${appDesc}`, params, 'POST', {'Content-Type': 'application/json'})
  },
  getVersionUploadStatus(params) {
    return fetch(`${urlPrefix.plat}/guard/version/newest`, params)
  },
  getGuardServer(params) {
    return fetch(`${urlPrefix.plat}/guard/server/status`, params)
  },
  // 基本管理上传代码 END
  updatesubaccount(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/updatesubaccount`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  projectAttr(params) {
    return fetch(`${urlPrefix.plat}/guard/config/project/attr`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  agentSubaccount(params) {
    return fetch(`${urlPrefix.plat}/guard/agent/subaccount/app`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },

  /* 数据统计 */
  summarytrend(params) {
    return fetch(`${urlPrefix.plat}/guard/datacube/summarytrend`, params)
  },
  retaininfo(params) {
    return fetch(`${urlPrefix.plat}/guard/datacube/retaininfo`, params)
  },
  visittrend(params) {
    return fetch(`${urlPrefix.plat}/guard/datacube/visittrend`, params)
  },
  /* 数据统计 END */

  /* 支付 */
  payManner() {
    return fetch(`${urlPrefix.plat}/guard/app/pay/manner`)
  },
  payDeduct(params) {
    return fetch(`${urlPrefix.plat}/guard/app/pay/deduct`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  orderSubmit(params) {
    return fetch(`${urlPrefix.plat}/guard/order/submit`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  // payment (params) {
  //   return fetch(`${urlPrefix.plat}/guard/payment`, params)
  // },
  /* 支付 END */
  /* *********** 平台管理所有api END *********** */

  /* *********** 登录api START *********** */
  clearCookie(params) {
    return fetch(`http://gw.vdongchina.com/clear`, params)
  },
  login(params) {
    return fetch(`${urlPrefix.plat}/login`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  loginOut(params) {
    return fetch(`${urlPrefix.plat}/logout`)
  },
  userInfo() {
    return fetch(`${urlPrefix.plat}/guard/userinfo`)
  },
  preview(params) {
    return fetch(`${urlPrefix.upload}/preview?appId=${params.appid}`, params.config, 'POST', {
      'Content-Type': 'application/json'
    })
  },
  previewUpdate(params) {
    return fetch(`${urlPrefix.upload}/previewUpdate?appId=${params.appid}`, params.config, 'POST', {
      'Content-Type': 'application/json'
    })
  },
  queryStatus(params) {
    return fetch(`${urlPrefix.upload}/queryPreviewStatus?appId=${params.appid}`)
  },
  /* *********** 登录api END *********** */
  /* *********** 认证 api *********** */
  register(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/register`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  getAppList() {
    return fetch(`${urlPrefix.plat}/guard/wechat/account/list`)
  },
  getAppInfo(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/verify/info`, params)
  },
  checkAppName(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/checkname`, params)
  },
  submitMaterial(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/verify/submit`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  getWxPayCode(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/pay/qrcode`, params)
  },
  getOrderByAppid(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/orderbyappid`, params)
  },
  getOrderById(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/orderbyid`, params)
  },
  getMediaId(params) {
    return fetch(`${urlPrefix.plat}/basic/wechat/media`, params, 'POST')
  },
  headImage(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/modify/headimage`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  signatur(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/modify/signature`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  getAccountInfo(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/account/get`, params)
  },
  categorys(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/categorys`, params)
  },
  categorysAll(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/categorys/all`, params)
  },
  categorysAdd(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/category/add`, params, 'POST', {
      'Content-Type': 'application/json'
    })
  },
  categorysDel(params) {
    return fetch(`${urlPrefix.plat}/guard/wechat/category/delete`, qs.stringify(params), 'POST')
  },
  categorysModify(params) {
    return fetch(`${urlPrefix.plat}/basic/wechat/category/modify`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/json'
    })
  },

  tempappadd(params) {
    return fetch(`${urlPrefix.plat}/guard/tempapp/add`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  getToken(params) {
    return fetch(`${urlPrefix.plat}/guard/user/token`)
  },
  getUpdateMsg(params) {
    return fetch(`${urlPrefix.plat}/basic/notice`)
  },
  getBasicShow(params) {
    return fetch(`${urlPrefix.plat}/basic/show`)
  },

  // 获取更新信息
  // getUpdateMsg(params){
  //   return fetch(`${urlPrefix.plat}/basic/notice`)
  // },

  // 模块权限分配
  moduleList(params) {
    return fetch(`${urlPrefix.plat}/guard/module/list`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  modulePermission(params) {
    return fetch(`${urlPrefix.plat}/guard/module/getpermission`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  moduleAdd(params) {
    return fetch(`${urlPrefix.plat}/guard/module/add`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },

  // 个人中心获取登录二维码
  createqrcode(params) {
    return fetch(`${urlPrefix.plat}/guard/createqrcode`, params)
  },
  synch() {
    return fetch(`${urlPrefix.plat}/guard/user/synch`)
  },

  // 选择用户替换模板
  checkTpl(params) {
    return fetch(`${urlPrefix.plat}/guard/template/list`, params)
  },
  getTpl(params) {
    return fetch(`${urlPrefix.plat}/guard/template/get`, params)
  },
  wxCreateQrcode(params) {
    return fetch(`${urlPrefix.plat}/basic/createqrcode`, params)
  },
  wxBasicLogin(params) {
    return fetch(`${urlPrefix.plat}/basic/login`, params)
  },

  // 平台数据集
  platDataList(params) {
    return fetch(`${urlPrefix.plat}/guard/dataset/list`, params)
  },
  platDataAdd(params) {
    return fetch(`${urlPrefix.plat}/guard/dataset/add`, params, 'POST')
  },
  platDataDel(params) {
    return fetch(`${urlPrefix.plat}/guard/dataset/del`, params, 'POST')
  },

  /** 基本配置 服务器管理 **/
  appSituation(params) {
    return fetch(`${urlPrefix.docker}/app/appSituation`, qs.stringify(params), 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  },
  restart(params) {
    return fetch(`${urlPrefix.plat}/guard/version/restart`, params)
  }
  /* *********** 认证 api END*********** */
  /* login: function () {
    let url = '${urlPrefix.plat}/xauth/token'
    let data = {
      'grant_type': 'password',
      'username': '1599',
      'password': '123456'
    }
    httpRequest('post', url, data).then(results => {
      console.log(results)
    })

    httpRequest('get', '${urlPrefix.plat}/xauth/test1', {access_token: '84673377-9629-4eaa-919e-1abc610e4a7f'}).then(results => {
      console.log(results)
    })
  } */
}
