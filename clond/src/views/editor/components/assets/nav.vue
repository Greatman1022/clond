<template>
    <wx-view :style="'background:' + bgColor" class="bottom-navs" v-if="hidden">
      <wx-view class="nav-item" v-for="(item, index) in navs" :key="item.url">
        <wx-view v-if="active==index && item.to!=='kefu'" @click="itemTapHandler(item.to,index)">
          <wx-image
          :src="item.activeUrl"
          :style="'height:' + size + 'px; width:' + size +'px'" class="nav-icon"/>
          <wx-text :style="'color:'+activeColor" class="nav-text">{{item.text}}</wx-text>
        </wx-view>

        <wx-view v-if="active!==index && item.to!=='kefu'" @click="itemTapHandler(item.to,index)">
          <wx-image
          :src="item.url"
          :style="'height:' + size + 'px; width:' + size +'px'" class="nav-icon"/>
          <wx-text :style="'color:'+color" class="nav-text">{{item.text}}</wx-text>
        </wx-view>

          <wx-button  open-type="contact" class="kefu" v-if="item.to=='kefu'">
            <wx-image
            :src="item.url"
            :style="'height:' + size + 'px; width:' + size +'px'" class="nav-icon"/>
            <wx-text :style="'color:'+color" class="nav-text">{{item.text}}</wx-text>
          </wx-button>
      </wx-view>
    </wx-view>
    <wx-view v-else class="txt-c">
      底部导航
    </wx-view>
</template>
<script>
let _Nav = {
  editorConfig: {
    fixed:{
      label:'导航位置',
      type:'String',
      value:'bottom',
      director:'radio2'
    },
    hidden:{
      label:'底部导航显示与否',
      type:'Boolean',
      value:true,
      director : 'switch2'
    },
    color: {
      el: ['text', 'color'],
      label: '文本初始颜色',
      type: 'String',
      value: '#000',
      director : 'ColorPicker'
    },
    activeColor: {
      el: ['text', 'color'],
      label: '文本选中颜色',
      type: 'String',
      value: '#38adff',
      director : 'ColorPicker'
    },
    bgColor: {
      el: ['text', 'color'],
      label: '导航背景色',
      type: 'String',
      value: '#f7f7fa',
      director : 'ColorPicker'
    },
    size: {
      el: ['number'],
      label: '图标尺寸设定',
      type: 'Number',
      value: '25',
      director: 'Fsize'
    },
    navs: {
      el: ['navigation'],
      label: '图片填充',
      type: 'navigation',
      value: [
        {
          text: '首页',
          url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png',
          activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png',
          to: '',
          code: ''
        },
        {
          text: '发现',
          url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png',
          activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png',
          to: '',
          code: ''
        },
        {
          text: '购物车',
          url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png',
          activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png',
          to: '',
          code: ''
        },
        {
          text: '我的',
          url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png',
          activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png',
          to: '',
          code: ''
        }
      ],
      director: 'navigation'
    }
  },
  comName:"底部导航",
  props: {
      fixed: {
        default: 'bottom',
        type: String
      },
      hidden:{
        default: true,
        type: Boolean
      },
      bgColor: {
        default: '#f7f7fa',
        type: String
      },
      color: {
        default: '#000',
        type: String
      },
      activeColor: {
        default: '#38adff',
        type: String
      },
      size: {
        default: '25',
        type:String
      },
      navs: {
        default:function(){
        return [
          {
            text: '首页',
            url: 'http://image.vdongchina.com/M00/00/B7/ZSUkmVmbvwaEJusMAAAAABh0uRY923.png',
            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvw6ESqIOAAAAALEJgTo719.png',
            to: '',
            code: ''
          },
          {
            text: '发现',
            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbvz2EaQl3AAAAANpYvKA331.png',
            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv0KEJc-SAAAAAN0ThAI854.png',
            to: '',
            code: ''
          },
          {
            text: '购物车',
            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2KEPMfBAAAAAInFaaE694.png',
            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv2eEeDyxAAAAAPgfdec987.png',
            to: '',
            code: ''
          },
          {
            text: '我的',
            url: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3mESU8_AAAAAM9rVBU163.png',
            activeUrl: 'http://image.vdongchina.com/M00/00/B8/ZSUkmVmbv3-ELsyiAAAAAHyl0bU181.png',
            to: '',
            code: ''
          }
        ]
      },
        type: Array
      }
  },
  data () {
    return {
      active: null
    }
  },
  methods: {
    itemTapHandler (to,index) {
        // this.active = index
        if (!to || typeof to !== 'string') return
        wx.navigateTo({
            url: to
        })
    }
  },
  computed: {
    curPage () {
      return this.$store.state.curPage
      console.log("page",this.$store.state.curPage)
    }
  },
  onLoad () {
    var that = this
    var navData = this.navs
    var isExit = false // 存在对象没
    var pageName
    if(typeof this.$store == 'object'){ //说明在编辑器里编辑
      pageName = this.$store.state.pageName
    }else if(typeof window == 'object'){  // H5
      pageName = window.location.href.split('#/')[1].split('/')[0]
    }else if(typeof getCurrentPages == 'function'){ // 小程序
      pageName = getCurrentPages()[getCurrentPages().length-1].__route__.splic.split('/')[1]
    }
    navData.forEach(function(item,idx){
      if(item.to !=''&&item.to.indexOf(pageName)!=-1){
        that.active = idx
        isExit = true
      }
    });
    !isExit&&(this.active=null)
  },
  watch:{
    navs(){
      this.onLoad ()
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
})(_Nav)
</script>
<style scoped>
.bottom-navs{
  padding: 10px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  display: flex;
}
.bottom-navs .nav-item{
  flex: 1;
  text-align: center;
}
.bottom-navs .nav-icon{
  vertical-align: top;
}
.bottom-navs .nav-text{
  font-size: 12px;
  display: block;
  height: 15px;
  line-height: 15px;
  margin-top: 6px;
}
.txt-c{
  text-align:center;
  font-size:16px;
  padding:10px;
}
.bottom-navs .kefu{
  background: rgba(0,0,0,0);
  border:none;
  margin: 0;
  padding: 0;
  border-radius: 0;
  font-size: 0;
  display: inline-block;
  height: 100%;
  vertical-align: top;
}
.bottom-navs .kefu::after{
  content: none;
}
</style>
