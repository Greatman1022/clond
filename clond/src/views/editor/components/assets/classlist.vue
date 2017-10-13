<template>
  <wx-view>
    <wx-view class="recommend-list" :style="'background:'+bgColor" v-if="classtify!=''">
      <!--<wx-scroll-view scroll-view style="overflow:hidden;white-space: nowrap; display: flex;">-->
        <wx-view v-for="(item, index) in classtify" :key="index" class="recommend-item">
          <wx-view class="recommend-img">
            <wx-view bindtap="classGo" :data-classid="item.id">
              <wx-image :src="item.advimg" class="image" :style=" 'width:' + Ewidth + 'px;height:' + Eheight +'px;'"></wx-image>
              <wx-view class="title" :style="'color:' + color + ';font-size:' + fontSize + 'px;'">{{item.name}}</wx-view>
            </wx-view>
          </wx-view>
        </wx-view>
      <!--</wx-scroll-view>-->
    </wx-view>
    <wx-view v-else class="nolists">暂无分类</wx-view>

  </wx-view>
</template>
<script>
  let _classList = {
    editorConfig: {   //该编辑器所有配置项
      Ewidth:{
        el: ['number'],
        label: '列表图片宽度',
        type: 'Number',
        value: '72',
        director: 'Fsize'
      },
      Eheight: {
        el: ['number'],
        label: '列表图片高度',
        type: 'Number',
        value: '74',
        director: 'Fsize'
      },
      bgColor: {
        el: ['text', 'color'],
        label: '背景色',
        type: 'String',
        value: '#fff',
        director : 'ColorPicker'
      },
      color: {
        el: ['text', 'color'],
        label: '文本颜色',
        type: 'String',
        value: '#3a3a3a',
        director : 'ColorPicker'
      },
      fontSize: {
        el: ['number'],
        label: '文字大小',
        type: 'Number',
        value: '14',
        director: 'Fsize'
      },
    },
    comName:"分类列表",
    props: {
      Ewidth: {
        default: '72',
        type:String
      },
      Eheight: {
        default: '74',
        type:String
      },
      bgColor: {
        default: '#fff',
        type: String
      },
      color: {
        default: '#3a3a3a',
        type: String
      },
      fontSize: {
        default: '14',
        type:String
      },
    },
    data () {
      return {
        classtify: [],   // 分类列表
      }
    },
    onLoad () {
      var that = this
      // 获取分类列表
      wx.request({
        url: this.$root.apiServer+ this.$root.appid +'/cloud/public/index.php/shop/Category/getlist',
        method: 'POST',
        data: {
          uniacid: 2,
          page_number: 1,
          page_size: 100
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success (res) {
          if(res.data.data && res.data.data.length){
            that.classtify = res.data.data
          }
        }
      })
    },
    methods: {

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
  })(_classList)
</script>
<style scoped>
  /*   分类列表   */
  .recommend-list {
    width: 375px;
    height: 100%;
    margin: 10px 0;
    display: flex;
    flex-wrap: wrap;

  }
  .recommend-item {
    width: 25%;
    /*display: inline-block;*/
  }
  .recommend-img {
    width: 90px;
    display: inline-block;
    text-align: center;
  }

  .recommend-img .image {
    border-radius: 100%;
    width: 74px;
    height: 72px;
  }

  .recommend-img .title {
    font-size: 13px;
    overflow: hidden;
    margin: 0 auto;
    color: #666;
  }
  .nolists{
    padding: 30px;
    background: #fff;
    font-size: 15px;
    text-align: center;
    margin-bottom: 10px;
  }
  /*   分类列表  end  */



</style>
