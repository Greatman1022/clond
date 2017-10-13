var release = {
  apiServer: "https://gw.vdongchina.com/", //接口地址
  uploadServer:"http://101.37.170.129:3000", //小程序上传接口地址
  previewServer:"http://preview.vdongchina.com" //预览地址
}

var test = {
  apiServer: "https://gw-test.vdongchina.com/",
  uploadServer:"http://116.62.214.25:3000",
  previewServer:"http://116.62.214.25"
}

var appServer = window.location.hostname.indexOf('test') != -1 || window.location.hostname.indexOf('localhost')!=-1? test : release

export default {
    appServer
}
