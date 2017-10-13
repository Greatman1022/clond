<template>
  <wx-view>
    <!--横向滚动布局 -->
    <wx-view class="recommend" :style="'padding:'+vSpace+'px 0px;'" v-if="model==1">
      <wx-view class="bgimage" :style="'backgroundImage:url('+bgImg+');'"></wx-view>
      <wx-view class="bgcolor" :style="'backgroundColor: '+ bgColor + ';'"></wx-view>
      <wx-view class="recommend-container" :style="'margin:'+vSpace+'px 0px;'">
        <wx-view class="recommend-list">
          <wx-scroll-view scroll-view style="overflow:hidden;white-space: nowrap; display: block;">
            <wx-view v-for="(item, index) in tshow.tabIds" :key="index" class="recommend-item" :style="'margin:0px '+hSpace+'px;'">
              <wx-view class="recommend-img">
                <wx-view bindtap="classGo" :data-classid="item.id">
                  <wx-image :src="item.advimg" :style="'width: ' +iconHeight + 'px;height: ' + iconHeight + 'px;borderRadius: '+radius+'%;'" class="image"></wx-image>
                  <wx-view class="title"  :style="'color: ' + classifyColor + ';font-size: ' + classifyTitleSize + 'px;line-height: ' + classifyTitleSize + 'px;'">{{item.name}}</wx-view>
                </wx-view>
              </wx-view>
            </wx-view>
          </wx-scroll-view>
        </wx-view>
      </wx-view>
    </wx-view>
    <!--平铺布局-->
    <wx-view class="recommend" :style="'padding:'+vSpace+'px 0px;'" v-if="model==2">
      <wx-view class="bgimage" :style="'backgroundImage:url('+bgImg+');'"></wx-view>
      <wx-view class="bgcolor" :style="'backgroundColor: '+ bgColor + ';'"></wx-view>
      <wx-view class="recommend-container">
        <wx-view class="recommend-list">
          <wx-view v-for="(item, index) in tshow.tabIds" :key="index" class="recommend-item" :style="'margin:'+vSpace+'px '+hSpace+'px;'">
            <wx-view class="recommend-img">
              <wx-view bindtap="classGo" :data-classid="item.id">
                <wx-image :src="item.advimg" :style="'width: ' +iconHeight + 'px;height: ' + iconHeight + 'px;borderRadius: '+radius+'%;'" class="image"></wx-image>
                <wx-view class="title"  :style="'color: ' + classifyColor + ';font-size: ' + classifyTitleSize + 'px;line-height: ' + classifyTitleSize + 'px;'">{{item.name}}</wx-view>
              </wx-view>
            </wx-view>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
  </wx-view>
</template>
<script>
  let _SliderBar = {
    editorConfig: {
      tshow:{
        label: '分类设置',
        type: Object,
        value:{
          tabIds:[]
        },
        director:{'java':'','php':'sliderBar'}
      },
      model:{
        label: '布局样式',
        type: 'Number',
        value: 1,
        director : 'radio3'
      },
      bgColor:{
        el:['text','color'],
        label:'背景颜色',
        type:'string',
        value:'transparent',
        director:'personalBackgroundColorSet'
      },
      bgImg:{
        el:['personalBackgroundImageSet'],
        label:'背景图片',
        type:'String',
        value:'',
        director:'personalBackgroundImageSet'
      },
      hSpace:{
        el:['number'],
        label:'设置左右间距',
        type:'Number',
        value:'10',
        director:'Fsize'
      },
      vSpace:{
        el:['number'],
        label:'设置上下间距',
        type:'Number',
        value:'5',
        director:'Fsize'
      },
      radius:{
        el:['number'],
        label:'图片形状设置',
        type:'Number',
        value:'50',
        director:'iconRadius'
      },
      iconHeight: {
        el: ['number'],
        label: '调整分类图片大小',
        type: 'Number',
        value: '70',
        director: 'Fsize'
      },
      classifyColor: {
        label: '分类标题文本颜色',
        type: 'String',
        value: 'rgba(0, 0, 0, 1)',
        director: 'ColorPicker'
      },
      classifyTitleSize: {
        el: ['number'],
        label: '调整分类标题大小',
        type: 'Number',
        value: '14',
        director: 'Fsize'
      }
    },
    props: {
      tshow:{
        default: function () {
          return {
            tabIds:[]
          }
        },
        type:Object
      },
      model: {
        default: 1,
        type: Number
      },
      bgColor:{
        default:'transparent',
        type:String
      },
      bgImg:{
        default:'',
        type:String,
      },
      hSpace:{
        default:'10',
        type:String,
      },
      vSpace:{
        default:'5',
        type:String,
      },
      radius:{
        default:'50',
        type:String,
      },
      iconHeight: {
        default: '70',
        type: String
      },
      classifyColor: {
        default: 'rgba(0, 0, 0, 1)',
        type: String
      },
      classifyTitleSize: {
        default: '14',
        type: String
      }
    },
    comName:"商品分类",
    data () {
      return {
      }
    },
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
  })(_SliderBar)
</script>
<style scoped>
  /*左右滑动样式start*/
  .recommend {
    overflow: hidden;
    width: 100%;
    position: relative;
  }
  .bgimage{
    width:100%;
    height: 100%;
    position: absolute;
    -webkit-background-size: cover;
    background-size: cover;
    top:0;
    left:0;
    z-index:-2;
  }
  .bgcolor{
    width:100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    z-index:-1;
  }
  .recommend-container {
    overflow-wrap: break-word;
    width: 100%;
    height: 100%;
  }
  .recommend-item {
    display: inline-block;
  }
  .recommend-list {
    z-index:10;
  }
  .recommend-img {
    display: inline-block;
    text-align: center;
  }
  .recommend-img .image {
    z-index:10;
  }
  .recommend-img .title {
    font-size: 13px;
    overflow: hidden;
    margin: 2px auto;
    color: #666;
    z-index:15;
  }
  /*左右滑动样式end*/

  /*平铺样式start*/

  /*平铺样式end*/
</style>
