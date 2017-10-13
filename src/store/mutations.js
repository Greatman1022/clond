import * as types from './types'
import CommonJs from '@/assets/js/editorUntil'
import resetState from '@/store/restState'
import vue from 'vue'
var pageIndex = 0
function deepCopy(source) {
    // 对象数组深拷贝
    var sourceCopy = source instanceof Array ? [] : {}
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
    }
    return sourceCopy
}
export default {
  /* Editor */
  showEditor(state, bool) {
      state.showEditor = bool
    },
    showComs(state, bool) {
      state.showComs = bool
    },
    /* Editor2 */
    changePage(state, page) {
      state.cindex = null
      state.curPage = parseInt(page)
      state.pageName = state.newApps[page].pageName
      state.Coms = state.newApps[page].children
      state.canEditor = false
      if(state.pageName=="goods"||state.pageName=="personCenter" || state.pageName == "shopcart" || state.pageName == "personal" || state.pageName == "community"){
        state.hideHandler = true
      }else{
        state.hideHandler = false
      }
    },
    move(state, data) {
      var arr = state.Coms
      var cindex = state.cindex
      switch (data) {
        case 'up':
          if (state.cindex === 0) {
            return
          }
          arr[cindex] = arr.splice(cindex - 1, 1, arr[cindex])[0]
          state.cindex--
            break
        case 'down':
          if (cindex === arr.length - 1) {
            return
          }
          arr[cindex] = arr.splice(cindex + 1, 1, arr[cindex])[0]
          state.cindex++
            break
        case 'top':
          if (cindex === 0) {
            return
          }
          arr.unshift(arr[cindex])
          arr.splice(cindex + 1, 1)
          state.cindex = 0
          break
        case 'bottom':
          if (cindex === arr.length - 1) {
            return
          }
          arr.push(arr[cindex])
          arr.splice(cindex, 1)
          state.cindex = arr.length - 1
          break
        default:
          return
      }
    },
    sure(state, data) {
      var page = state.curPage
      var advancedCpt = state.newApps[page].advancedCpt
      var arr = {}
      arr.com = data.com
      arr.items = {}
      Object.keys(data.editorConfig).forEach((name) => {
        let item = deepCopy(data.editorConfig[name])
        arr.items[name] = item.value
      })
      arr.id = ''
      if(data.com == 'freePanel'){ //判断添加模块
        arr.children = []
      }
      if (state.canExchange) {
        state.newApps[page].children.splice(state.cindex, 1)
        state.newApps[page].children.splice(state.cindex, 0, arr)
        state.selected = false
        data.obj.$message({
          type: 'success',
          message: '替换成功!'
        });
      } else {
        if(state.selected){
          if(typeof state.cindex == 'number'&&state.Coms[state.cindex].com == 'freePanel'&&!data.confirm){ //判断是当前自由面板
            arr.items['position']="position:absolute;left:40rpx;top:40rpx;"
            arr.items['positionxy'] = [20,20]
            if(arr.com == 'text'){
              arr.items['display'] = 'inline-block;'
            }else{
              arr.items['height'] = '100'
              arr.items['width'] = '28'
            }
            arr.items['zIndex'] = state.Coms[state.cindex].children.length == 0? 1 : state.Coms[state.cindex].children[0].items['zIndex']+1
            state.newApps[page].children[state.cindex].children.push(arr)
          }else{
            if(typeof state.cindex == 'number'&&state.cindex>=0){
              state.newApps[page].children.splice(++state.cindex, 0, arr)
            }else{
              state.newApps[page].children.push(arr)
            }
            state.cindex = null
          }
        }else{
          state.newApps[page].children.push(arr)
        }
        state.Coms = state.newApps[page].children
        data.obj.$message({
          type: 'success',
          message: '添加成功!'
        });
      }
      state.canExchange = false
      if(data.isDblclick){
        state.showModal = true
      }else{
        state.showModal = false
      }
      // CommonJs.editorLocalStorage.set(state.newApps)
    },
    cancel(state) {
      state.showRight = true
      state.canExchange = false
      state.showModal = false
      state.canAdd = false
    },
    add(state) {
      state.showRight = true
      state.canAdd = true
      state.canEditor = false
      state.showModal = true
    },
    remove(state, data) {
      var page = state.curPage
      state.Coms.splice(state.cindex, 1)
      state.selected = false
      state.showModal = false
      state.cindex = null
      state.canEditor = false
    },
    addEditorConfig(state, data) {
      var getData
      if(typeof data.index == "number"){
        state.Coms[data.index].editorConfig = data.editorConfig
        getData = state.Coms[data.index].items
      }else{
        state.Coms[data.index.Index].children[data.index.index].editorConfig = data.editorConfig
        getData = state.Coms[data.index.Index].children[data.index.index].items
      }
      Object.keys(data.editorConfig).forEach((name,index)=>{  //自动填充组件增加属性
        !getData.hasOwnProperty(name)&&(vue.set(getData,name,data.editorConfig[name].value))
      })
    },
    exchange(state,data) {
      if (state.selected) {
        state.showRight = true
        state.canAdd = true
        state.canEditor = false
        state.canExchange = true
        state.showModal = true
        state.selected = false
      } else {
        data.obj.$message({
          type: 'info',
          message: '请选择替换的组件!'
        });
      }
    },
    updateTxt(state, data) {
      var page = state.curPage
      if(state.Coms[state.cindex].com != 'freePanel'){
        if(data.setObject&&typeof data.setObject == 'object'){
          Object.keys(data.setObject).forEach((item,name)=>{
            state.Coms[state.cindex].items[data.name][item] = data.setObject[item]
          })
        }else{
          state.Coms[state.cindex].items[data.name] = data.value
        }
      }else{
        if(typeof state.freeCindex == 'number'){
          state.Coms[state.cindex].children[state.freeCindex].items[data.name] = data.value
        }else{
          state.Coms[state.cindex].items[data.name] = data.value
        }
      }
      //CommonJs.editorLocalStorage.set(state.newApps)
    },
    updateTxt2(state, data) {
      var page = state.curPage
      state.Coms[data.index].items[data.name] = data.value
      //CommonJs.editorLocalStorage.set(state.newApps)
    },
    upConfig(state) {
      //CommonJs.editorLocalStorage.set(state.newApps)
    },
    updateSpacing (state, data) {
      var page = state.curPage
      var cindex = state.cindex
      state.Coms[cindex].items['spacing'] = data
    },
    selected(state, data) {
      state.showRight = true //右侧栏显示
      state.canEditor = true //编辑面板
      state.canAdd = false //组件库面板
      state.showModal = false
      if(typeof data.index == 'number'){
        state.cindex = data.index
         state.freeCindex = null
      }else{
        state.cindex = data.index.Index  //Index指freePanel
        state.freeCindex = data.index.index
      }
      state.selected = true
    },
    sort(state, data) {
      var page = state.curPage
      state.newApps[page].children = data
      state.Coms = data
    },
    changeSelected: function(state, data) {
      state.cindex = data
    },
    newTest: function(state, data) { // 用户读取数据
      state.newApps = data
      state.pageName = state.newApps[0].pageName
      state.Coms = state.newApps[0].children
    },
    cDefault: function(state, data) { // 组件库配置
      state.cDefault = data
    },
    baseSenior: function(state, data){ //通用高级组件配置
      state.baseSenior = data
    },
    cTemplate: function(state, data) { // 默认模板配置
      state.cTemplate = data
    },
    initPage(state) {
      state.Coms = state.newApps[0].children
    },
    addPage(state, data) {
      var bcolor = state.newApps.length > 0 ? state.newApps[0]['navigationBarBackgroundColor'] : '#FFFFFF'
      var tcolor = state.newApps.length > 0 ? state.newApps[0]['navigationBarTextStyle'] : 'black'
      pageIndex = +new Date()
      var newpage = {
        title: data == 1 ? '新建普通页面' : '新建单商品页',
        pageName: data == 1 ? 'page' + pageIndex : 'signGoods' + pageIndex,
        GoodsId: '',
        signGoodsId: '',
        children: [],
        is_del: true,
        advancedCpt: data == 1 ? [] : ["GoodsBottomBar", "GoodsPriceBar", "GoodsInfo","GoodsSlider"],
        navigationBarBackgroundColor: bcolor,
        navigationBarTextStyle: tcolor
      }
      state.newApps.push(newpage)
      //CommonJs.editorLocalStorage.set(state.newApps)
    },
    removePage(state, data) {
      state.newApps.splice(data, 1)
      if (state.newApps.length > 0) {
        state.curPage = data - 1
        state.Coms = state.newApps[data - 1].children
        state.pageName = state.newApps[data - 1].pageName
      } else {
        state.Coms = {}
        state.pageName = ''
      }
      state.selected = false
      state.showModal = false
      state.cindex = null
      //CommonJs.editorLocalStorage.set(state.newApps)
    },
    changeT(state, data) {
      state.b = data
    },
    deletePic(state, data) {
      var page = state.curPage
      console.log(data)
      state.newApps[page].children[state.cindex].items[data.type].splice([data.index], 1)
      //CommonJs.editorLocalStorage.set(state.newApps)
    },
    addPic(state, data) {
      var page = state.curPage
      var obj = {
        "to": "",
        "url": "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png"
      }
      if(data=='navs'){
        obj = {
          "text": "导航",
          "to": "",
          "url": "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png",
          "activeUrl": "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png",
          "code": ''
        }
      }
      if(data=="swiperSlides"){
        obj = {
          "url": "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png",
          "to": "",
          "desc": "此乃标题",
          "code":''
        }
        // data = "swiperSlides"
      }
      // if(data=="slider"){
      //   obj = {
      //     "url": "http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png",
      //     "to": "",
      //   }
      //   data = "slider"
      // }
      if(data=="goodsedit"){
        obj = {
              "thumbUrl": "M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png",
              "name": "输入标题",
              "guidePrice": '0',
              "memberPrice": '0',
              "memberDiscount": '0',
              // "head":"http://image.vdongchina.com/M00/00/B7/ZSUkmVmbqe2Ef5EJAAAAAHrp8co145.png",
              // "personName":"安迪",

        }
        data = "goodsItem"
      }
      state.newApps[page].children[state.cindex].items[data].push(obj)
      //CommonJs.editorLocalStorage.set(state.newApps)
    },
    freePanelAction(state,data){ //type值 0:层级操作  1:组件删除  2.移动更新位置数据
      switch(data.type) {
        case 0:
            let cindex = state.cindex
            let freeCindex = state.freeCindex
            let zindex = parseInt(state.Coms[cindex].children[freeCindex].items['zIndex'])
            if(data.activeType){ //增加
              zindex++
            }else{
              zindex--
            }
            state.Coms[cindex].children[freeCindex].items['zIndex'] =String(zindex)
          break
        case 1:
            if(data.activeType){
                state.Coms[state.cindex].children.splice(state.freeCindex,1)
            }
          break
        case 2 :
            state.Coms[state.cindex].children[state.freeCindex].items['position'] = data.style
            state.Coms[state.cindex].children[state.freeCindex].items['positionxy'] = data.positionxy
            break;
        case 3 :
            state.freeCindex = data.key
            state.Coms[state.cindex].children = deepCopy (data.arr)
      }
    },
    setLink(state, data) {
      var page = state.curPage
      var toUrl = '../' + data.value + '/' + data.value
      data.value == "allshops1" &&(toUrl = '../allshops/allshops?type=1')
      data.value == "allshops2" &&(toUrl = '../allshops/allshops?type=2')
      toUrl = data.signGoodsId ? toUrl + '?id=' + data.signGoodsId : toUrl
      toUrl = data.value ? toUrl :''
      if(data.type=="navs" || data.type=="swiperSlides"){
        state.newApps[page].children[state.cindex].items[data.type][data.index].to = toUrl
        state.newApps[page].children[state.cindex].items[data.type][data.index].code = data.code
      }else if(data.type=="picture"&&state.Coms[state.cindex].com != 'freePanel'){
        state.newApps[page].children[state.cindex].items.currentToNew.to= toUrl
        state.newApps[page].children[state.cindex].items.currentToNew.code = data.code
      }else if(data.type=="picture"&&state.Coms[state.cindex].com == 'freePanel'){
       // console.log(toUrl)
        state.newApps[page].children[state.cindex].children[state.freeCindex].items.currentToNew.to= toUrl
        state.newApps[page].children[state.cindex].children[state.freeCindex].items.currentToNew.code= data.code
      }

    },
    setKefu(state, data) {
      var page = state.curPage
      // console.log("yes",state.Coms[state.cindex].com == 'freePanel')
      // console.log('p',data.type=="picture")
      if(data.type=="navs"||data.type=="swiperSlides"){
        state.newApps[page].children[state.cindex].items[data.type][data.index].to = data.value
        state.newApps[page].children[state.cindex].items[data.type][data.index].code = data.code
      }else if(data.type=="picture"&&state.Coms[state.cindex].com != 'freePanel'){
        state.newApps[page].children[state.cindex].items.currentToNew.to= data.value
        state.newApps[page].children[state.cindex].items.currentToNew.code = data.code
      }else if(data.type=="picture"&&state.Coms[state.cindex].com == 'freePanel'){
        state.newApps[page].children[state.cindex].children[state.freeCindex].items.currentToNew.to= data.value
        state.newApps[page].children[state.cindex].children[state.freeCindex].items.currentToNew.code= data.code
      }
    },
    showPanel(state) {
      state.canAdd = true
    },
    hidePanel(state) {
      state.canAdd = false
    },
    rootAppid(state,data){
      state.rootAppid = data
    },
    resetState(state){ //退出清理resetState
      Object.keys(resetState).forEach((name)=>{
        state[name] = resetState[name]
      })
    },
    changePicTo(state,data){
      let newApps = JSON.stringify(state.newApps)
      let pattern = new RegExp(data.pageName+'\\?id=[0-9a-zA-Z]*\\"\\,','gmi')
      newApps=newApps.replace(pattern,data.pageName+'?id='+data.id+'",')
      state.newApps =deepCopy(JSON.parse(newApps))
    },
    changeTuwen (state,data){
      var curPage = state.curPage
      var cindex = state.cindex
      state.newApps[curPage].children[cindex].items.lists = data
    },
    copy (state,data){
      state.copyData = data
    },
    past (state){
      var curPage = state.curPage
      var item = deepCopy(state.copyData)
      state.newApps[curPage].children.push(item)
    },
    changeContextmenu (state, data){
      state.showContextmenu = data
    },
    getSampleAppid (state,data){
      state.sampleAppid = data
    },
    getperMission (state,data){
      state.moduleList = data
    },
    getCityIdentify(state,data){
      state.cityIdentify = data[0]
      state.cityDevLanguage =data[1] //区分北京和宁波模板值(后者为最新的判断 PHP和java 区分)
    },
    getTemp(state,data){
      state.temp = data
    },
    changeCindex (state,data){
      state.cindex = data
    },
    changeMemberState (state,data){
      var index = 0
      var curPage = state.curPage
      state.Coms.forEach(function(item,idx){
        if(item.com=="perCenterHead"){
          index = idx
        }
      })
      state.newApps[curPage].children[index].items.isdeleted = data
    }
}
