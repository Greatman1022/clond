export default {
  /* editor */
  activeComIndex: null,
  activeCom: null,
  isEditor: 0,
  showModal: false,
  showEditor: false,
  showComs: false,
  /* editor2 */
  cindex: null,                // 选中组件的index，默认null
  freeCindex :null,           // 选中容器的freeCindex，默认null
  title: '编辑器',
  curPage: 0,
  pageName:'', //选中页面的类型
  showRight: true,        //右侧导航
  canEditor: false,
  canAdd: false,
  // curComponent: 'XText',     // 组件类型
  editorType: '',
  canExchange: false,
  selected: false,          // 是否选中组件
  // showModal: false,        // 显示遮罩
  showContextmenu: false,     //右键面板状态
  hideHandler: false,        //新增、替换状态
  Coms: [                  //  当前页面所有组件的数组

  ],
  textValues: {
    fontSize: 0,
    color: '#000',
    txt: '此乃测试文本'
  },
  videoValue: {
    src: ''
  },
  newApps: [
  ],               // 整个模板配置
  cDefault: {              // 通用组件配置
  },
  baseSenior: [
  ],
  cTemplate: {
  },
  a: {
  },
  activeCom:{
  },
  b:{
  },
  rootAppid: '',
  upConfigTime:'',
  copyData: null ,     //拷贝组件数据
  sampleAppid : '',
  moduleList :null, //组件显示状态 代理商控制
  cityIdentify:'',
  cityDevLanguage:'', //区分北京和宁波模板值为最新的判断 PHP和java 区分
  temp:{} //当前模板所有信息
}
