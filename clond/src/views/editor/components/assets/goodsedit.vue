<template>
    <wx-view class="goods-sort" :style="'background:'+bgColor" v-if="model==1">
      <!--商品排序-->
  		<wx-view class="margint">
				<wx-scroll-view :scroll-x="true" class="navs" v-if="tshow.show == 1">
				<wx-view class="item-box">
  				<wx-view class="nav _navbar_title"  v-for="(item,index) in tshow.tabIds" :key="item.id"  @click="handler(item.id,index)">
				      <wx-view class="text"  v-if="active==index" :style="'color:'+activeColor+';border-bottom-color:'+activeColor+';'" :data-idx="item.id" @click="navbarTap">
	              {{item.name}}
			        </wx-view>

						<wx-view class="text" v-else  :style="'color:'+color+';'" :data-idx="item.id" @click="navbarTap">
								{{item.name}}
						</wx-view>
  				</wx-view>
  			</wx-view>
				</wx-scroll-view>

  			<wx-view class="_navbar_matter" v-if="layout==1">
					<wx-view class="_composite clear">
  					<wx-view class="_composite_item left bmg" v-for="(item,index) in lists" :key="item.index" @click="toGoods(item.id)">
  						<wx-view class="_composite_img"  :style="'width:'+ewidth+'px;height:'+eheight+'px;'">
  							<wx-image class="_composite_img_image" :src="'http://image.vdongchina.com/'+item.thumbUrl" mode="aspectFill"/>
  						</wx-view>
  						<wx-view class="_composite_cant" v-if="decshow==1">
  							<wx-view class="_composite_name" :style="'fontSize:'+fontSizeName+'px;fontWeight:'+fontWeightName+';color:'+colorName+';'">{{item.name}}</wx-view>
  							<wx-view class="_composite_info clear">
  								<wx-view class="_composite_price clear left">
										<wx-view class="_composite_now left" :style="'fontSize:'+fontSizeMark+'px;fontWeight:'+fontWeightMark+';color:'+colorMark+';'">￥<wx-text class="_composite_now_text" :style="'fontSize:'+fontSizePrice+'px;fontWeight:'+fontWeightPrice+';color:'+colorPrice+';'">{{item.guidePrice}}</wx-text></wx-view>
  								</wx-view>
  								<wx-view class="_composite_like right">{{item.collectNum}}人喜欢</wx-view>
  							</wx-view>
  						</wx-view>
  					</wx-view>
  				</wx-view>
  			</wx-view>

        <wx-view class="product-list" v-if="layout==2">
          <wx-view class="large" v-for="(item,index) in lists" :key="item.index" @click="toGoods(item.id)">
              <wx-view>
                  <wx-view class="product-img">
                  	<wx-image  mode="aspectFill" class="product-img-image" :src="'http://image.vdongchina.com/'+item.thumbUrl"/>
                  </wx-view>
                  <wx-view class="product-name"  :style="'fontSize:'+fontSizeName+'px;fontWeight:'+fontWeightName+';color:'+colorName+';'">{{item.name}}</wx-view>
                  <wx-view class="clear product-price">
                      <wx-view class="left main-color" :style="'fontSize:'+fontSizeMark+'px;fontWeight:'+fontWeightMark+';color:'+colorMark+';'">￥<wx-text class="product-price-text" :style="'fontSize:'+fontSizePrice+'px;fontWeight:'+fontWeightPrice+';color:'+colorPrice+';'">{{item.guidePrice}}</wx-text></wx-view>
                      <wx-view class="right">{{item.collectNum}}人喜欢</wx-view>
                  </wx-view>
              </wx-view>
          </wx-view>
        </wx-view>

  		</wx-view>
			<wx-view class="nonePro" v-if="lists.length<1">
	     暂无商品
	    </wx-view>
    </wx-view>


</template>
<script>
let _ServiceItemsList = {
  editorConfig: {
    layout:{
      label: '布局',
      type: 'Number',
      value: 1,
      director : 'layout'
    },
		model:{
      label: '是否显示服务项目',
      type: 'Number',
      value:1,
      director : 'switch'
		},
		decshow:{
      label: '是否显示服务描述',
      type: 'Number',
      value:1,
      director : 'switch'
		},
		tshow: {
      label :'分类导航显示状态',
      type: Object,
      value:{
        show: 1,
        cId: 1,
        // showIcon: 0,
        // iconSize: 40,
        // spacing: 0,
        tabIds:[]
      },
      director: 'goodsedit'
    },
		// headIco:{
		// 	label: '是否显示技师头像',
    //   type: Object,
    //   value:{
    //     show: 1,
    //     top: 160,
    //     iconSize: 30
    //   },
    //   director : 'switchService'
		// },
		bgColor: {
      el: ['text', 'color'],
      label: '设置组件背景色',
      type: 'String',
      value: '#ffffff',
      director : 'ColorPicker'
		},
		color: {
      el: ['text', 'color'],
      label: '导航栏文本颜色',
      type: 'String',
      value: '#3a3a3a',
      director : 'ColorPicker'
    },//改
    activeColor: {
      el: ['text', 'color'],
      label: '导航栏文本选中颜色',
      type: 'String',
      value: '#38adff',
      director : 'ColorPicker'
    },//改
    // titColor: {
    //   el: ['text', 'color'],
    //   label: '设置价格颜色',
    //   type: 'String',
    //   value: '#FF4C90',
    //   director : 'ColorPicker'
		// },
		 ewidth:{
      el: ['number'],
      label: '列表图片宽度',
      type: 'Number',
      value: '185',
      director: 'Fsize'
    },
    eheight: {
      el: ['number'],
      label: '列表图片高度',
      type: 'Number',
      value: '185',
      director: 'Fsize'
		},
		fontSizeName:{
      el: ['number'],
      label: '服务项目名称文字大小',
      type: 'Number',
      value: '13',
      director: 'Fsize'
    },
    fontSizeMark:{
      el: ['number'],
      label: '服务项目价格符号大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontSizePrice:{
      el: ['number'],
      label: '服务项目价格文字大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontWeightName:{
      el: ['number'],
      label: '服务项目名称文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightMark:{
      el: ['number'],
      label: '服务项目价格符号粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightPrice:{
      el: ['number'],
      label: '服务项目价格文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    colorName:{
      el: ['text', 'color'],
      label: '服务项目名称文字颜色',
      type: 'String',
      value: '#333333',
      director : 'ColorPicker'
    },
    colorMark:{
      el: ['text', 'color'],
      label: '服务项目价格符号颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    },
    colorPrice:{
      el: ['text', 'color'],
      label: '服务项目价格文字颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    }
  },
  comName:"服务项目",
  props: {
    layout:{
      type: Number,
      default: 1
    },
		color: {
      default: '#3a3a3a',
      type: String
    },//改
    activeColor: {
      default: '#38adff',
      type: String
    },//改
		tshow:{
      default:function(){
        return {
          show:1,
          cId:1,
          // showIcon: 0,
          // iconSize: 40,
          // spacing: 0,
          tabIds:[]
        }
      },
      type:Object
    },
		 ewidth: {
      default: '141',
      type:String
    },
    eheight: {
      default: '174',
      type:String
    },
		model: {
      default: 1,
      type: Number
		},
		decshow: {
      default: 1,
      type: Number
    },
		bgColor: {
      default: '#ffffff',
      type: String
    },
    // titColor: {
    //   default: '#FF4C90',
    //   type: String
    // },
		fontSizeName:{
        default: '13',
        type:String
      },
      fontSizeMark:{
        default: '11',
        type:String
      },
      fontSizePrice:{
        default: '11',
        type:String
      },
      fontWeightName:{
        default: '100',
        type:String
      },
      fontWeightMark:{
        default: '100',
        type:String
      },
      fontWeightPrice:{
        default: '100',
        type:String
      },
      colorName:{
        default: '#333333',
        type: String
      },
      colorMark:{
        default: '#b4282d',
        type: String
      },
      colorPrice:{
        default: '#b4282d',
        type: String
      }

  },
  data() {
			return {
				currentTab: 0,
				// composite: [],
				// menu: [{
				// 		id: 0,
				// 		// title: '综合',
				// 		title: '最新上架',
				// 		checked: true,
				// 		sort: -1
				// 	}, //默认第一个,sort：-1:不存在,0-向下，1-向上
				// 	{
				// 		id: 1,
				// 		title: '',
				// 		checked: false,
				// 		sort: -1
				// 	},
				// 	{
				// 		id: 2,
				// 		title: '',
				// 		checked: false,
				// 		sort: -1
				// 	},
				// ],
				 items: [],
				 active: 0,
				 lists: [],
			   catCid:null    //切换栏目要用到
			}
		},
    onLoad () {
					var that = this
					wx.request({
					 url: this.$root.apiServer + this.$root.appid + '/basic/api/server/catalogServers',
          method: 'GET',
          data:{
            perMaxNum:50
          },
          header: {
            'content-type': 'application/json'
          },
						success: function(res) {
							//console.log(res)
							if(res.data.success && res.data.data.length){
                  var result = res.data.data
                  var resArr = []
                  result.forEach(function(item,idx){
                    resArr.push({id:item.id,name:item.name})
                  })
									that.items = resArr
									that.catCid = resArr[0].id
									// var cids = []
									// that.items.forEach(function(item,idx){
									// 	cids.push(item.id)
									// })

									if(that.tshow.show){
										if(that.tshow.tabIds.length==0){
												that.handler(that.catCid,0)
										}else{
												that.handler(that.tshow.tabIds[0].id,0)
										}

									}else{
										that.handler(that.catCid,0)
									}

									if(that.tshow.tabIds.length==0){
										that.tshow.tabIds=that.items
									}

								// 	that.composite = res.data.data.list.filter(item => {//项目列表
								// 		return item.status == 1
								// })
							}

						}
					})
		},
    methods: {
      navbarTap(e) {
				// var menu = this.menu;
				// var id = e.currentTarget.dataset.idx;
				// for(var i = 0, len = menu.length; i < len; i++) {
				// 	if(menu[i].id == id) { //当前点击item
				// 		if(menu[i].checked) { //原本就是选中item
				// 			if(menu[i].sort == 0 || menu[i].sort == 1) { //需切换上下
				// 				menu[i].sort = menu[i].sort == 1 ? 0 : 1;
				// 			}
				// 		} else {
				// 			menu[i].checked = true;
				// 		}
				// 	} else {
				// 		menu[i].checked = false;
				// 	}
				// }
				// this.currentTab=id
				// this.menu = menu
			},
			handler (cid,index) {
      this.active = index
			var that = this
      wx.request({
         	url: this.$root.apiServer + this.$root.appid + '/basic/api/server/catalogServers',
          method: 'GET',
          data:{
            perMaxNum:50
          },
          header: {
            'content-type': 'application/json'
          },
          success (res) {
						if(res.data.success){
							for (var i = 0; i < res.data.data.length; i++) {
								if (res.data.data[i].id==cid) {
								that.lists = 	res.data.data[i].servers.filter(item => {
		              return item.status == 1
		         		 })
									break
								}
							}
						}
						// 	console.log('	cid',cid)
						// console.log('	that.lists',	that.lists)

          }
      })
    },
			toGoods(id){
				wx.navigateTo({
					url: '../levelPagesGoods/levelPagesGoods?id='+id
				})
			},
		},
		watch:{
    tshow(e){
      if(e.show !=1){
        this.handler(e.cId,0)
      }else{
        if(this.tshow.tabIds.length==0){
					this.handler(this.catCid,0)
						// console.log("watch",1)
        }else{
					this.handler(this.tshow.tabIds[0].id,0)
					// console.log("watch",2)
        }
			}

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
})(_ServiceItemsList)
</script>
<style scoped>
	._navbar_item {
		flex: 1;
		position: relative
	}

	._navbar_icon_image {
		width: 9px;
		height: 5px;
		position: absolute;
		right: 30px;
		top: 20px;
	}

	._navbar_item_icon image {
		width: 9px;
		height: 5px;
	}

	._navbar_title .active {
		 color: rgb(56, 173, 255); border-bottom-color: rgb(56, 173, 255);
	}

	._composite{
		display: flex;
		justify-content:space-between ;
		flex-wrap:wrap;
	}
	._composite_item {
		width: 50%;
		position: relative;
		margin-top: 5px;
		overflow: hidden;
		/* flex:1 */
	}

	._composite_item_head {
		position: absolute;
		left: 15px;
		top: 163px;
		line-height: 25px;
		color: #fff;
		display: flex;
    align-items: center;
	}

	._composite_item_img {
		width: 25px;
		height: 25px;
		overflow: hidden;
		border-radius: 50%;
		margin-right: 10px;
	}

	._composite_item_img_image {
		width: 25px;
		height: 25px;
	}

	._composite_item:nth-child(2) {
		margin-right: 0
	}
	._composite_img{margin: 0 auto;display: flex;display: -webkit-flex;}/*改*/
	._composite_img_image {
		width: 100%;
		height: 100%;
		flex:1
	}/*改*/

	._composite_cant {
		padding: 5px 10px 10px 12px;
	}

	._composite_name {
    overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		font-size: 14px;
		color: #333333;
		line-height: 21px;
    min-height: 42px;
	}

	._composite_info {
		margin-top: 11px;
		color: #999999;
	}

	._composite_price {
		font-size: 11px;
	}

	._composite_now {
		color: #FF4C90
	}

	._composite_now_text {
		line-height: 24px;
		font-size: 15px;
		font-weight: bold
	}

	._composite_former {
		margin-left: 5px;
		text-decoration: line-through
	}

	._composite_former_text {
		line-height: 24px;
	}

	._composite_like {
		line-height: 24px;
	}

	._lookover {
		line-height:44px;
		text-align: center;
		color: #FF4C90;
		font-weight: bold;
		font-size: 14px;
	}
  .clear::after {
    display:block;
    clear:both;
    content:"";
    height:0;
    overflow:hidden;
    visibility:hidden;
  }

  .left{
    float: left;
  }

  .right{
    float: right;
  }
	.nonePro{height:200px;line-height: 200px;text-align: center;position:relative;}
	.navs{
  margin-bottom: 10px;
}
.nav{
  display: inline-block;
}
._item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text{
  display: inline-block;
  padding: 0 10px;
  border-bottom: 4px solid transparent;
  margin: 0 9px;
  box-sizing: border-box;
	margin-left: 10px; margin-right: 10px; font-size: 14px;padding-bottom: 10px;
}
.item-box{
		padding-top: 10px;
    white-space: nowrap;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
}
.item{
  padding: 15px;
  background: #fff;
  margin-bottom: 10px;
}

.product-img .product-img-image{
  width:100%;
  height:100%;
}
.product-img{text-align: center;}
.product-list .large{
  padding: 10px;
  background: #fff;
}
.product-list .large .product-img{
  width: 100%;
  height: 170px;
  margin: 0 auto;
}
.product-list .large .product-name{
  font-size: 15px;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.product-price{
  height: 25px;
  line-height: 25px;
}
.product-list .large .product-price{
  margin-top: 9px;
}
.product-list .large .product-price-text{
  font-size: 18px;
}
</style>
