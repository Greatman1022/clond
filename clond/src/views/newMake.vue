<template>
	<div id='newmake'>
		<!-- <v-nopermission></v-nopermission> -->
		<div class='vswiper'>
			<swiper :options="swiperOption">
				<swiper-slide v-for='item in carousels' :key='item.id'>
					<img :src='item.image' />
					<!-- <img src='~assets/images/vbanner.jpg' /> -->
				</swiper-slide>
				<div class="swiper-pagination vswiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div class='newmakecon frameWidth'>
			<div class='condition'>
				<div class='cond_list'>
					<span>{{scene.name}}</span>
					<div class='alist'>
						<a href='javascript:;' :class='{"active":sceneIndex == -1}' @click='selectScene(-1)'>全部</a>
						<a href='javascript:;' v-for='(item, index) in scene.childs' :key="index" :class='{"active":sceneIndex == index}' @click='selectScene(index, item.id)'>{{item.name}}</a>
					</div>
				</div>
				<div class='cond_list'>
					<span>{{industry.name}}</span>
					<div class='alist'>
						<a href='javascript:;' :class='{"active":industryIndex == -1}' @click='selectIndustry(-1)'>全部</a>
						<a href='javascript:;' v-for='(item,index) in industry.childs' :key="index" :class='{"active":industryIndex == index}' @click='selectIndustry(index, item.id)'>{{item.name}}</a>
					</div>
				</div>
				<div class='cond_v'>
					<span>
						<em v-for='(item,index) in sortTab' :class='{"active": currentIndex == index}' @click='sortType(index, item.type)' :key="index">
							{{item.value}}
						</em>
					</span>
				</div>
			</div>
			<div class='vlist'>
				<p v-if='nodata'>无数据</p>
				<ul>
					<li v-for='(item,index) in list' :key="index">
						<div class='img_k'>
							<img :src='item.fullCover' />
						</div>
						<p class='pitem'>
							<span>{{item.name}}</span>
							<!-- <span>{{item.price}}元/年</span> -->
						</p>
						<div class='gomake'>
							<div class='exper'>
								<img :src='item.fullQrcodeUrl' />
								<span>扫一扫 体验二维码</span>
							</div>
							<a href='javascript:;' class='fastto' @click='getToAppId(item.id, item.config)'>马上创建</a>
						</div>
					</li>
				</ul>
			</div>
			<div v-if="noMore" style="text-align: center;padding: 20px 0 50px;">没有更多了</div>

			<!--首次登录或项目更新内容有变化时提示弹窗-->
			<el-dialog title="更新提示" :visible.sync="dialogVisible" size="tiny" custom-class="update-msg-dialog">
				<div class="um-cont"> {{updateCon}} </div>
				<div slot="footer" class="dialog-footer">
					<el-button class="btn-ok" @click="dialogVisible = false">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import vLogin from 'components/login/login'
// import vNopermission from 'components/common/noPermission'
// import InfiniteLoading from 'vue-infinite-loading'
import api from '../fetch/api'
export default {
	name: 'newmake',
	components: {
		// vNopermission,
		swiper,
		swiperSlide,
		vLogin
	},
	data() {
		return {
			swiperOption: {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				spaceBetween: 30,
				centeredSlides: true,
				autoplay: 2500,
				autoplayDisableOnInteraction: false,
				loop: true
			},
			sortTab: [{
				type: 'hot',
				value: '热门'
			},
			{
				type: 'new',
				value: '最新'
			}
			],
			isrun: false,
			isFinish: false, //是否最后一页
			listParams: { //默认参数
				sceneId: '',
				industryId: '',
				sortType: 'hot',
				page: 1,
				pageSize: 12,
				status: 1,
			},
			list: [],
			page: 1,
			sceneIndex: -1,
			industryIndex: -1,
			//sceneId: '',//直接用listParams中的參數
			//industryId: '',
			currentIndex: 0,
			nodata: false,
			noMore: false,
			dialogVisible: false,
			updateCon: "",
			updateTime: ""
		}
	},
	computed: {
		...mapGetters({
			carousels: 'getCarousels',
			scene: 'getScene',
			industry: 'getIndustry',
			userMess: 'getUserMess'
		})
	},
	created: function () {
		this.$store.dispatch('setCarousels')
		this.$store.dispatch('setCategorys')
		/* api.TemplatesList({page: this.page, pageSize: 2}).then(res => {
			this.list = res.pagination.items
		}) */
		this.getTemList({
			sortType: 'hot'
		})

		//获取更新信息
		api.getUpdateMsg().then(res => {
			if (res.success) {
				let msg = res.notice;
				this.updateCon = msg.content;
				this.updateTime = msg.addtime;

				if (!this.updateCon) {
					this.dialogVisible = false;
				} else if (!localStorage.getItem("noticeLastTime") || localStorage.getItem("noticeLastTime") !== this.updateTime) {
					localStorage.setItem("noticeLastTime", this.updateTime);
					this.dialogVisible = true;
				}
			}
		}).catch((err) => {
			console.info('没有更新内容')
		})
	},
	mounted: function () {
		if (process.env.NODE_ENV !== 'development') {
			_this = this
			api.userInfo().then(res => {
				if (res.success) {
					_this.$store.dispatch('setUserInfo', {
						user: res.loginUser,
						remember: _this.isChecked
					})
					if (res.loginUser.role === 'ROLE_ADMIN') {
						_this.$router.push({ name: 'platmanage' })
					} else if (res.loginUser.role === 'ROLE_AGENT') {
						_this.$router.push({ name: 'personalcenter' })
					} else {
						_this.$router.push({ name: 'newmake' })
					}
					// _this.$store.commit('CHANGENAV', true)
					_this.$store.commit('CHANGEREG', 1)
					_this.$store.commit('LOGINDIALOG', false)
				}
			}).catch((err) => {
				console.info('development...')
			})
		}
	},
	methods: {
		getToAppId(id, config) {
			if (!this.userMess || !this.userMess.id) {
				this.$store.commit('LOGINDIALOG', true)
			} else {
				api.SaveConfig({
					tempId: id,
					userId: this.userMess.id,
					config: config
				}).then(res => {
					this.$router.push({
						name: 'editor',
						params: {
							appid: res.appid
						}
					})
				})
			}
		},
		sortType(index, type) {
			this.currentIndex = index
			this.getTemList({
				sortType: type,
				page: 1
			})
		},
		nextPage() {
			if (!this.isFinish && !this.isrun) {
				this.listParams.page += 1
				this.getTemList({})
			}
		},
		menu() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			//console.log(document.body.scrollHeight+'||'+document.body.scrollTop+'||'+document.body.clientHeight)
			if (scrollTop == (document.body.scrollHeight - document.body.clientHeight)) {
				this.nextPage()
			}
		},
		extend(defaultParams, params) {
			for (var item in defaultParams) {
				if (params.hasOwnProperty(item)) {
					defaultParams[item] = params[item]
				}
			}
		},
		getTemList(params) {
			if (params)
				this.extend(this.listParams, params);//修改参数（存在的修改，不存在的保持默认）
			// console.log(this.listParams);
			this.isrun = true;
			api.TemplatesList(this.listParams).then(res => {
				this.noMore = false;
				if (res.pagination.items && res.pagination.items.length) {//存在数据
					if (res.pagination.items.length == this.listParams.pageSize) {
						this.isFinish = false; // 获取到的数据==请求的每页数量，表明后续页面有内容(如果不足每页数量，表明没有更多了)
					}
					else {
						this.isFinish = true;
					}
					if (this.listParams.page == 1) { //第一页：刷新list，
						this.list = res.pagination.items
					}
					else {	//后续页，添加
						for (var i = 0, len = res.pagination.items.length; i < len; i++) {
							this.list.push(res.pagination.items[i])
						}
					}
					if (res.pagination.items.length < this.listParams.pageSize) {
						console.log('没有更多');
						this.isFinish = true;
						this.noMore = true;
					}
				} else if (this.listParams.page == 1) { //第一页没有数据，显示“没有内容”
					this.list = [];
					console.log('没有内容');
				}
				else { //没有更多了
					console.log('没有更多');
					this.isFinish = true;
					this.noMore = true;
				}
				this.isrun = false;
				// console.log(res.pagination.items)
			})
		},
		selectScene(index, id) {
			this.sceneIndex = index
			this.getTemList({
				page: 1,
				sceneId: index !== -1 ? id : ''
			})
		},
		selectIndustry(index, id) {
			this.industryIndex = index
			this.getTemList({
				page: 1,
				industryId: index !== -1 ? id : ''
			})
		}
	},
	mounted() {
		window.addEventListener('scroll', this.menu)
	},
	beforeDestroy() { }
}
</script>

<style scoped>
.vswiper {
	position: relative;
	height: 300px;
	overflow: hidden;
}

.swiper-container {
	width: 1920px;
	min-width: 1200px;
	height: 100%;
	transition: all 1s;
	position: absolute;
	top: 0;
	left: 50%;
	margin-left: -960px;
}

.swiper-slide img {
	width: 100%;
}

.newmakecon {
	margin-top: 20px;
}

.newmakecon .condition {
	background-color: #fff;
	padding: 20px 25px 12px;
}

.newmakecon .condition .cond_list {
	margin-bottom: 12px;
	line-height: 30px;
	overflow: hidden;
}

.newmakecon .condition .cond_list span {
	color: #333;
	padding-right: 5px;
	display: inline-block;
	float: left;
}

.newmakecon .condition .cond_list .alist {
	float: right;
	width: 1110px;
}

.newmakecon .condition .cond_list .alist a {
	color: #666;
	padding: 0 9px;
	display: inline-block;
	margin-left: 12px;
	float: left;
}

.newmakecon .condition .cond_list a.active {
	background-color: #18ccc0;
	border-radius: 5px;
	color: #fff;
}

.newmakecon .condition .cond_v {
	border-top: 1px solid #ddd;
	padding-top: 15px;
}

.newmakecon .condition .cond_v span {
	line-height: 26px;
	display: inline-block;
}

.newmakecon .condition .cond_v span em {
	cursor: pointer;
	font-style: normal;
	color: #333;
	border: 1px solid #18ccc0;
	display: inline-block;
}

.newmakecon .condition .cond_v span em:first-child {
	padding: 0 9px 0 12px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
}

.newmakecon .condition .cond_v span em:last-child {
	padding: 0 12px 0 9px;
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
}

.newmakecon .condition .cond_v span em.active {
	background-color: #18ccc0;
	color: #fff;
}

.newmakecon .vlist {
	padding-top: 30px;
	overflow: hidden;
}

.newmakecon .vlist ul li {
	width: 208px;
	float: left;
	margin: 0 20px 40px 20px;
	background-color: #fff;
	position: relative;
	box-shadow: 0 0 8px #d7d9da;
}

.newmakecon .vlist ul li:nth-child(5n-4) {
	margin-left: 0;
}

.newmakecon .vlist ul li:nth-child(5n) {
	margin-right: 0;
}

.newmakecon .vlist ul li .img_k {
	width: 208px;
	height: 208px;
}

.newmakecon .vlist ul li .img_k img {
	width: 100%;
	height: 100%;
}

.newmakecon .vlist ul li p.pitem {
	line-height: 42px;
	padding: 0 10px;
	overflow: hidden;
}

.newmakecon .vlist ul li p.pitem span {
	float: right;
	color: #18ccc0;
}

.newmakecon .vlist ul li p.pitem span:first-child {
	max-width: 100px;
	float: left;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: #666;
}

.newmakecon .vlist ul li .gomake {
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	transition: all 0.5s;
	width: 100%;
}

.newmakecon .vlist ul li:hover .gomake {
	opacity: 1;
}

.newmakecon .vlist ul li .exper {
	font-size: 18px;
	color: #ff6b01;
	background-color: rgba(0, 0, 0, 0.6);
	text-align: center;
	font-size: 0px;
	height: 208px;
}

.newmakecon .vlist ul li .exper img {
	margin: 0 auto;
	width: 140px;
	height: 140px;
	padding: 24px 34px 0px;
}

.newmakecon .vlist ul li .exper span {
	display: block;
	line-height: 43px;
	font-size: 13px;
	color: #fff;
}

.newmakecon .vlist ul li .fastto {
	display: inline-block;
	width: 100%;
	background-color: #18ccc0;
	font-size: 18px;
	line-height: 42px;
	text-align: center;
	color: #fff;
}
.um-cont{
	white-space: pre-line;
  line-height: 2;
}
</style>
