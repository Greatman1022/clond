<template>
  <wx-view>
    <wx-view class="page">
        <wx-view  v-if="communityToggle && flag == 1">
            <wx-view class="search pos-r ft30 c4c" @click="search()">
                <wx-image class="search_img pos-a" src="../../../../../static/img/sousuo.png"/>
                <wx-view class="search_input fl-l w-100 c4c">
                    搜索
                </wx-view>
            </wx-view>
            <wx-view class="banner mt20">
                <wx-swiper v-on:change="swiperChange" :style="'height:' + height + 'px'" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :interval="interval" :duration="duration" :current="current" :circular="circular">
                    <wx-swiper-item v-for="(item, index) in swiperSlides" :key="item.url">
                        <wx-image :style="'height:' + height + 'px;width:100%'"  :src="item.url" v-on:click.native="itemTapHandler(item.to)"/>
                    </wx-swiper-item>
                </wx-swiper>
            </wx-view>
            <wx-view class="plate ml30">
                <wx-view class="plate_title c3 ft28">板块</wx-view>
                <wx-scroll-view :scroll-x="true" class="scroll-view_H">
                    <wx-view class="plate_item pos-r"  v-for="(item, index) in navlists" v-if="item.display == 1" :key="item.display" @click="navInvitation(item.plateId)">
                        <wx-image class="plate_item_img pos-a" :src="'http://image.vdongchina.com/'+item.plateUrl"/>
                        <wx-view class="pos-r ft36 white txt-c bg-rgba">{{item.plateName}}</wx-view>
                    </wx-view>
                </wx-scroll-view>
            </wx-view>
            <wx-view class="recommend plr30 box-s">
                <wx-view class="recommend_list ft28 c6">
                    <wx-text :class="navList == '0' ? 'recommend_list_nav on' :'recommend_list_nav'" @click="recommendClick(0)">全部</wx-text>
                    <wx-text :class="navList == '1' ? 'recommend_list_nav on' :'recommend_list_nav'" @click="recommendClick(1)">热门</wx-text>
                    <wx-text :class="navList == '2' ? 'recommend_list_nav on' :'recommend_list_nav'" @click="recommendClick(2)">精品</wx-text>
                </wx-view>
                <wx-view v-for="(item, index) in invitationList" :key="item.id" v-if="invitationList.length>0">
                    <wx-view class="recommend_content display-flex" @click="commentDetail(item.postId)">

                        <wx-view class="">
                            <wx-image class="recommend_content_img" mode="aspectFill" :src="'http://image.vdongchina.com/'+imgUrl+item.coverImg"/>
                        </wx-view>
                        <wx-view class="classname">
                            <wx-view class="recommend_content_title txt-ov display-flex">
                                <wx-view class="classname display-flex">
                                    <wx-text class="refined" v-if="item.addEssence == 1">精</wx-text>
                                    <wx-text class="dian" v-if="item.top == 1 && item.addEssence == 1">·</wx-text>
                                    <wx-text class="peak" v-if="item.top == 1">顶</wx-text>
                                </wx-view>
                                <wx-view class="ft28 c3 txt-ov">{{item.title}}</wx-view>
                            </wx-view>
                            <wx-view class="recommend_content_intro c9 ft24 txt-wrap">{{item.content}}
                            </wx-view>
                            <wx-view class="recommend_content_count display-flex">
                                <wx-view class="reply pos-r ">
                                    <wx-image class="reply_image pos-a" src="../../../../../static/img/gentie.png"/>
                                    <wx-text class="reply_count pos-r">{{item.followNum}}</wx-text>
                                </wx-view>
                                <wx-view class="shuxian"></wx-view>
                                <wx-view class="reply pos-r">
                                    <wx-image class="reply_image pos-a comment_img" src="../../../../../static/img/pinglun.png"/>
                                    <wx-text class="reply_count pos-r">{{item.commentNum}}</wx-text>
                                </wx-view>
                            </wx-view>
                        </wx-view>
                    </wx-view>
                </wx-view>
                <wx-view class="mt20 ft20 c9 txt-c" v-if="noData">
                    ...
                </wx-view>
                <wx-view class="ft20 c9 txt-c" v-if="noData">
                    暂无相关内容
                </wx-view>
                <wx-view class="noMore ft20 c9 txt-c" v-if="hidden">
                    没有更多了
                </wx-view>
                <wx-view class="loadMore txt-c" v-if="loadMore">
                    <wx-view class="loadMore_img">
                        <wx-image class="loadMore_iocn" src="../../../../../static/img/xiaolian.png" /> </wx-view>
                    <wx-view>加载更多</wx-view>
                </wx-view>
            </wx-view>
        </wx-view>
        <wx-view class="mask"  v-if = "!communityToggle && flag == 2">
            <wx-view class="content">
                <wx-image class="header" src="../../../../../static/img/waiting.png"/>
                <wx-text class="middle">暂无该功能</wx-text>
                <wx-text class="footer">程序员正在努力开发中</wx-text>
            </wx-view>
        </wx-view>
    </wx-view>
  </wx-view>
</template>
<script>

let _Community = {
    editorConfig: {
        height: {
            el: ['number'],
            label: '调整轮播图整体高度',
            type: 'Number',
            value: '160',
            director: 'Fsize',
            tip: '提示:建议高度为150'
        },
        indicatorDots: {
            label : '是否显示面板指示点',
            type : 'Boolean',
            value : true ,
            director : 'switch2'
        },
        indicatorColor:{
            label:'轮播指示点颜色',
            type:'String',
            value:'rgba(0, 0, 0, .3)',
            director: 'ColorPicker'
        },
            indicatorActiveColor:{
            label:'轮播选中的指示点颜色',
            type :'String',
            value : '#000000',
            director : 'ColorPicker'
        },
        swiperSlides: {
            el: ['slider'],
            label: '图片填充',
            type: 'slider',
            value: [
                {
                url: 'http://image.vdongchina.com/M00/00/2F/ZSUkmVl1ZOKEewc4AAAAACPCWF4187.jpg',
                to: '',
                code: ''
                },
                {
                url: 'http://image.vdongchina.com/M00/00/BF/ZSUkmVmc0GiEB_t9AAAAAOwJ5G8813.jpg',
                to: '',
                code: ''
                }
            ],
            director: 'slider'
        }
    },
    comName:"社区",
    props: {
        height: {
            default: '160',
            type:String
        },
        swiperSlides: {
            default: function(){
                return [
                    {
                        url: 'http://image.vdongchina.com/M00/00/2F/ZSUkmVl1ZOKEewc4AAAAACPCWF4187.jpg',
                        to: '',
                        code: ''
                    },
                    {
                        url: 'http://image.vdongchina.com/M00/00/BF/ZSUkmVmc0GiEB_t9AAAAAOwJ5G8813.jpg',
                        to: '',
                        code: ''
                    }
                ]
            },
            type: Array
        },
        indicatorDots: {
            type: Boolean,
            default: true
        },
        indicatorColor: {
            type: String,
            default: 'rgba(225, 8, 37, 1)'
        },
        indicatorActiveColor: {
            type: String,
            default: '#ffffff'
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        current: {
            type: Number,
            default: 0
        },
        interval: {
            type: Number,
            default: 5000
        },
        duration: {
            type: Number,
            default: 500
        },
        circular: {
            type: Boolean,
            circular: false
        }
    },
    data() {
        return {
            navList: 0,//默认全部
            navlists: [],//推荐（热门、精品）
            hidden: false,//没有更多
            page: 1,//当前页码
            Pullcount: 0,
            loadMore: false,//正在加载中
            postedVisible: true,//根据判断H5还是移动端决定：评论图标是否可见
            invitationList: [], // 帖子列表
            isHot: true, // 是否为热门
            isAddEssence: false, //是否为精品
            isAll: false,//当前页面是否等于总页码
            noData: false,//没有数据
            imgUrl: '',//图片路径（默认图片路径不完整，补充路径）
            communityToggle:true,//判断是否有社区功能
            flag:''
        }
    },
    onLoad() {
        var that = this
        that.navlists = []
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/community/app/plate/listAll',
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success (res) {
              if (res.data.success) {
                that.navlists = res.data.data
                } else {

                }
            }
        })

        that.invitationList = []
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/community/app/post/page',
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success (res) {
                if (res.data.success) {
                    that.invitationList = res.data.data.list
                } else {

                }
            }
        })

        wx.request({
            url: this.$root.apiServer + this.$root.appid + '/basic/community/app/special/getSpecial',
            method:'GET',
            data: {
                cloudAppId:this.$root.appid
            },
            header:{
                'content-type': 'application/json'
            },
            success(res){
                // console.log(res)
                if(res.statusCode == "200"){
                    if (res.data.object.examine == 2) {
                        that.communityToggle = true
                        that.flag = 1
                    } else {
                        that.communityToggle = false
                        that.flag = 2
                    }
                }else{
                    that.communityToggle = true
                    that.flag = 1
                }
            }
        })

        //判断是否是H5页面
        // if(that.isH5 = !wx.hasOwnProperty('version')){
        //     // console.log("h5")
        //     this.postedVisible = false
        // }else{
        //     this.postedVisible = true
        // }
    },

    methods: {
        //控制轮播方法
        swiperChange (e) {
          this.$emit('change', e)
        },
        itemTapHandler (to) {
            if (!to || typeof to !== 'string') return
            wx.navigateTo({
                url: to
            })
        },

        navInvitation(plateId) {//跳转板块帖子列表
            wx.navigateTo({
                url: '../invitationList/invitationList?plateId=' + plateId
            })
        },
        recommendClick(index) { //热门和精品切换
            this.page = 1
            this.navList = index
            this.invitationList = []
            this.loadMore = false
            this.isAll = false
            this.noData = false
            this.hidden = false
            if(index==0){
                this.isHot = false
                this.isAddEssence = false
            }else if (index == 1) {
                this.isHot = true
                this.isAddEssence = false
            } else {
                this.isHot = false
                this.isAddEssence = true
            }
        },
        posted() { //发帖
            wx.navigateTo({
                url: '../posted/posted',
            })
        },
        search() {//搜索
            wx.navigateTo({
                url: '../search/search',
            })
        },
        commentDetail(id) {//帖子详情
            wx.navigateTo({
                url: '../topics/topics?id=' + id,
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
})(_Community)

</script>


<style scoped>
.page .mask{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 99;
    background: #fff;
}
.page .mask .content{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.page .mask .content .header{
    width:93px;
    height:93px;
    margin-bottom:25px;
}
.page .mask .content .middle{
    font-size:20px;
    color:#000;
    height:28px;
    line-height: 28px;
    margin-bottom:15px;
}
.page .mask .content .footer{
    font-size: 14px;
    color:#888;
    height: 20px;
    line-height: 20px;
}
.page {
    min-height: 300px;
    overflow: hidden;
    position: relative;
}
.pos-r{
    position: relative;
}
.pos-a{
    position: absolute;
}
.ft24{
    font-size: 12px;
}
.ft28{
    font-size: 14px;
}
.ft30{
    font-size: 15px;
}
.ft36{
    font-size: 18px;
}
.white{
    color:#ffffff;
}
.c3{
    color:#333333;
}
.c6{
    color:#666666;
}
.c4c{
    color: #4c4c4c;
}
.c9{
    color:#999999;
}
.fl-l{
    float: left;
}
.w-100{
    width: 100%;
}
.mt20{
    margin-top: 10px;
}
.ml30{
    margin-left: 15px;
}
.txt-c{
    text-align: center;
}

.plr30 {
	padding-left: 15px;
	padding-right: 15px;
}
.box-s {
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
}
.display-flex {
	display: flex !important;
	display: -webkit-box !important;
	display: -moz-box !important;
	display: -ms-flexbox !important;
	display: -webkit-flex !important;
}
.txt-ov {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.txt-wrap {
	word-break: break-all;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	/*background-color: burlywood;*/
}
.loadMore {
	font-size: 10px;
	color: #0081FF;
}

.loadMore_img,
.loadMore_iocn {
	width: 25px;
	height: 25px;
	margin: 0 auto;
}
.noMore{
    height: 49px;
    line-height: 49px;
}


.search {
    width: 345px;
    margin: 0 auto;
    height: 29px;
    line-height: 29px;
    background: #EEEEEE;
    border-radius: 35.5px;
    -moz-border-radius: 35.5px;
    -webkit-border-radius: 35.5px;
    margin-top: 10px;
}

.search_img {
    width: 16px;
    height: 15.5px;
    left: 9px;
    top: 7px;
}

.search_input {
    padding-left: 35px;
    height: 29px;
    line-height: 29px;
}

.banner_img {
    width: 100%;
    height: 160px;
}

swiper {
    height: 160px;
}

.plate_title {
    height: 20px;
    line-height: 20px;
    padding: 10px 0;
}

.plate_item {
    width: 140px;
    height: 60px;
    line-height: 60px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius:10px;
    display: inline-block;
    margin-right: 15px;
}

.plate_item_img {
    width: 140px;
    height: 60px;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
}

.plate_item .bg-rgba {
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
}

.scroll-view_H {
    white-space: nowrap;
}



/*帖子列表  */

.recommend {
    margin-top: 20px;
}

.recommend_list {
    margin-bottom: 4px;
}

.recommend_list_nav {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin-right: 27px;
    padding-bottom: 2.5px;
}

.recommend_list_nav.on {
    font-size: 15px;
    color: #007AFF;
    border-bottom: 2px solid #007AFF;
}

.recommend_content {
    padding: 10px 0;
    border-bottom: 1px solid #D8D8D8;
}

.recommend_content_img {
    width: 120px;
    height: 85px;
}

.recommend_content_title {
    width: 216px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    overflow: hidden;
}

.refined,
.peak {
    display: inline-block;
    width: 12.5px;
    height: 12.5px;
    line-height: 12.5px;
    font-size: 9px;
    border-radius: 50%;
    border: 1px solid #007AFF;
    color: #007AFF;
    text-align: center;
    margin-top: 3.5px;
}

.peak {
    border: 1px solid #DC5925;
    color: #DC5925;
    margin-right: 6px;
}

.dian {
    height: 12.5px;
    line-height: 12.5px;
    color: #007AFF;
    margin-top: 3.5px;
}

.recommend_content_intro {
    height: 33px;
    line-height: 16.5px;
    margin-top: 5px;
    margin-left: 10px;
}

.recommend_content_count {
    float: right;
    margin-top: 13px;
}

.reply {
    padding-left: 25px;
    height: 14px;
    line-height: 14px;
}

.reply_image {
    width: 11px;
    height: 11px;
    top: 4px;
    left: 10px;
}

.reply_count {
    font-size: 10px;
    color: #979797;
    height: 14px;
    line-height: 14px;
}

.shuxian {
    width: 2px;
    height: 10px;
    background: #979797;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    margin-top: 5px;
    margin-left: 7px;
}

.comment_img {
    width: 13px;
    height: 12px;
}


/*帖子列表结束  */

/* .posted {
    display:none;
    position: fixed;
    bottom: 49px;
    right: 13px;
}

.posted_img {
    width: 49px;
    height: 49px;
} */
</style>
