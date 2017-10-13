<!--商品列表-->
<!--商品列表-->
<template>
  <wx-view>
    <wx-view class="img" v-if="allitems!=''">
      <wx-view class="img1"  v-for="(item, index) in allitems" :key="item.id">
        <wx-image class="image"  mode="scaleToFill" :src="item.thumb"/>
        <wx-view class="introduce">{{item.title}}</wx-view>
        <wx-text class="cr">{{item.marketprice}}</wx-text>
        <wx-text class="lt">{{item.productprice}}</wx-text>
      </wx-view>
    </wx-view>
    <wx-view v-else>
      <wx-view class="nolists">暂无数据</wx-view>
    </wx-view>
  </wx-view>

</template>

<script>
let _goodslistnew = {
  editorConfig: {
    showNum: {
      el: ['text'],
      label: '商品显示数量',
      type: 'Number',
      value: '7',
      director: 'Fsize'
    },
    isCheck: {
      el: ['textarea'],
      label: '是否显示全部商品',
      type: 'Boolean',
      value: true,
      director: 'checkbox'
    },
    showSelect: {
      el: ['navtor'],
      label: '分类显示',
      type: 'String',
      value: '',
      director: 'product'
    },
    orderSelect: {
      el: ['navtor'],
      label: '按排序数值选择 (优先级高)',
      type: 'String',
      value: null,
      director: 'orderselect'
    },
    sortSelect: {
      el: ['navtor'],
      label: '按时间排序选择',
      type: 'String',
      value: 'asc',
      director: 'sortselect'
    },

  },
  comName:"商品列表",
  props: {
    textTitle: {
      default: '推荐宝贝',
      type: String
    },
    showNum: {
      default: '8',
      type: String
    },
    isCheck: {
      default: true,
      type: Boolean
    },
    showSelect: {
      default: '',
      type: String
    },
    orderSelect: {
      default: '',
      type: String
    },
    sortSelect: {
      default: 'asc',
      type: String
    },

  },
  data () {
    return {
      allitems: []
    }
  },
  onLoad () {
    this.dataOnload()
  },
  methods:{
    dataOnload(){
      var that=this
      var arr={
        uniacid: 2,  //商户id
        page_number: 1,  //第几页
        page_size: this.showNum,  //每页显示几个
        time: this.sortSelect,   //时间排序
        displayorder: this.orderSelect
      }
      if(!!this.showSelect){
        var arr2 = this.showSelect.split('*')
      }
      !this.isCheck&&(arr['pcate']=arr2[0]?arr2[0]:'',arr['ccate']=arr2[1]?arr2[1]:'')
      wx.request({
        url: this.$root.apiServer + that.$root.appid + '/cloud/public/index.php/shop/Goods/categoryGoods',
//        url: 'https://manper.vdongchina.com/cloud/public/index.php/shop/Goods/categoryGoods',
        method: 'POST',
        data: arr,
        header: {
          'content-type': 'application/x-www-form-urlencoded;'
        },
        success (res) {
          if(res.data.data && res.data.data.length){
            that.allitems = res.data.data
          }
        }
      })
    }
  },
  watch: {
    showNum (currentVal) {
      this.onLoad()
    },
    sortSelect (currentVal) {
      this.onLoad()
    },
    isCheck (currentVal) {
      this.onLoad()
    },
    showSelect(currentVal){
      this.onLoad()
    },
    orderSelect(currentVal){
      this.onLoad()
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
})(_goodslistnew)
</script>
<style scoped>
  .title{
    text-align: center;
    padding-bottom: 10px;
    font-size: 1.2em;
    display: block;
    width:100%;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    /*display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow: hidden;*/
  }
  .img{
    padding-top:5px;
    width:100%;
    /*height:275px;*//*高不固定死*/
    border-radius: 12px;
    -moz-border-radius: 12px;
    -webkit-border-radius:12px;
    overflow: hidden;
  }
  /*img*/
  .image{
    width: 100%;
    height: 190px;
    border-radius: 10px;
    -moz-border-radius:10px;
    -webkit-border-radius:10px;
    display: block;
    margin:0 auto;
  }
  .image>div{
    background-size: 100% 100% !important;
  }
  .introduce{
    width:170px;
    height: 40px;
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
  }
  .img1{
    float: left;
    width:48%;
    margin-left: 5px;
  }
  .cr{
    color:#e94746;
  }
  .lt{
    text-decoration: line-through;
    color: #999;
  }
  .nolists{
    padding: 30px;
    background: #fff;
    font-size: 15px;
    text-align: center;
    margin-bottom: 10px;
  }


</style>
