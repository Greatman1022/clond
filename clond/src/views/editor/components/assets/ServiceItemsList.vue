<template>
    <wx-view class="goods-sort">
      <!--商品排序-->
  		<wx-view class="margint">
  			<wx-view class="_navbar_title bmg">
  				<wx-view class="_composite_item left bmg" v-for="(item,index) in menu" :key="item.id">
  					<wx-view class="_navbar_item" :class="item.checked ? 'active' : ''" :data-idx="item.id" @click="navbarTap">
  						{{item.title}}
  						<wx-view class="_navbar_icon">
  							<wx-image class="_navbar_icon_image" v-if="!item.checked&&item.sort!=-1" src="../../../static/img/turndown.png" />
  							<wx-image class="_navbar_icon_image" v-if="item.checked&&item.sort==1" src="../../../static/img/up.png" />
  							<wx-image class="_navbar_icon_image" v-if="item.checked&&item.sort==0" src="../../../static/img/down.png" />
  						</wx-view>
  					</wx-view>
  				</wx-view>
  			</wx-view>
  			<wx-view class="_navbar_matter">
  				<wx-view v-if="currentTab==0" class="_composite clear">
  					<wx-view class="_composite_item left bmg" v-for="(item,index) in composite" :key="item.img" @click="toGoods">
  						<wx-view class="_composite_img">
  							<wx-image class="_composite_img_image" :src="item.img[0]" />
  						</wx-view>
  						<wx-view class="_composite_cant">
  							<wx-view class="_composite_name">{{item.type}}</wx-view>
  							<wx-view class="_composite_info clear">
  								<wx-view class="_composite_price clear left">
  									<wx-view class="_composite_now left">￥<wx-text class="_composite_now_text">{{item.prefPrice}}</wx-text></wx-view>
  									<wx-view class="_composite_former left">￥<wx-text class="_composite_former_text">{{item.price}}</wx-text></wx-view>
  								</wx-view>
  								<wx-view class="_composite_like right">{{item.likes}}人喜欢</wx-view>
  							</wx-view>
  						</wx-view>
  						<wx-view class="_composite_item_head clear">
  							<wx-view class="_composite_item_img left">
  								<wx-image class="_composite_item_img_image" :src="item.head" />
  							</wx-view>
  							<wx-view class="left">{{item.details}}</wx-view>
  						</wx-view>
  					</wx-view>
  				</wx-view>

  				<wx-view v-if="currentTab==1" class="_composite clear">
  					<wx-view class="_composite_item left" v-for="(item,index) in composite" :key="gg">
  						<wx-view class="_composite_img">
  							<wx-image class="_composite_img_image" :src="item.img" />
  						</wx-view>
  					</wx-view>
  				</wx-view>
  				<wx-view v-if="currentTab==2">
  					评价
  				</wx-view>
  			</wx-view>
  		</wx-view>
  		<wx-view class="_lookover bmg margint" @click="clickLookover">
  			查看更多改商户项目
  		</wx-view>
    </wx-view>
</template>
<script>
let _ServiceItemsList = {
  editorConfig: {

  },
  comName:"",
  props: {

  },
  data() {
			return {
				currentTab: 0,
				composite: [],
				menu: [{
						id: 0,
						title: '综合',
						checked: true,
						sort: -1
					}, //默认第一个,sort：-1:不存在,0-向下，1-向上
					{
						id: 1,
						title: '',
						checked: false,
						sort: -1
					},
					{
						id: 2,
						title: '',
						checked: false,
						sort: -1
					},
				]
			}
		},
    onLoad () {
      var that = this
      wx.request({
        //url: this.$root.apiServer+this.$root.appid+'/basic/api/product/productByCatalogId',
			  url: "https://gw-test.vdongchina.com/b100/basic/api/app/1",
			  data: {
			  },
			  method:"GET",
			  header: {
			      'content-type': 'application/json'
			  },
			  success: function(res) {
          console.log(res)
					that.composite = res.data.provider.projects.filter(item => {//项目列表
              return item.status == "启用"
          })
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
      toGoods(){
				wx.navigateTo({
					url: '../levelPagesGoods/levelPagesGoods'
				})
			},
      clickLookover() {
				wx.navigateTo({
					url: '../secondPagesStore/secondPagesStore'
				})
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
.margint {
  margin-top:10px;
}
._navbar_title {
		line-height: 49px;
		text-align: center;
		font-size: 15px;
		display: flex;
		border-bottom: 1px solid #FF4C90;
	}

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
		color: #FF4C90;
		position: relative
	}

	.active::after {
		position: absolute;
		border-left: 9px solid transparent;
		border-right: 9px solid transparent;
		border-bottom: 9px solid #FF4C90;
		content: " ";
		display: block;
		width: 0;
		height: 0;
		bottom: 0;
		left: 50px;
	}

	._navbar_matter {
		margin-top: 5px;
	}
	._composite{
		display: flex;
		justify-content:space-between ;
		flex-wrap:wrap;
	}
	._composite_item {
		width: 185px;
		position: relative;
		margin-bottom: 5px;
	}

	._composite_item_head {
		position: absolute;
		left: 15px;
		top: 165px;
		line-height: 25px;
		color: #fff
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

	._composite_img_image {
		width: 185px;
		height: 185px;
	}

	._composite_cant {
		padding: 5px 10px 10px 12px;
	}

	._composite_name {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 14px;
		color: #333333
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
</style>
