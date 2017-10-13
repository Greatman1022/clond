<template>
	<div class="ed-pic">
    <el-button type="primary" @click="addPic" class="vd-primary-color cursor"><i class="el-icon-plus"></i>&nbsp;添加导航</el-button>
    <div v-for="(nav, index) in navs" class="ed-pic-li">
      <div class="ed-pic-hd ed-flex cursor" @click="panel(index)">
        <div>
          <i class="el-icon-caret-right"></i>
          <span>导航{{index+1}}</span>
        </div>
        <i class="el-icon-delete" @click.stop="deletePic(index)"></i>
      </div>
      <div class="ed-pic-bd" v-show="active==index">
        <div class="ed-pic-box">
          <span class="txt">默认图片：</span>
          <img :src="nav.url" class="thumb" ref="index">
          <uploader @upload="changePic" :index='index'></uploader>
        </div>

        <div class="ed-pic-box">
          <span class="txt">按下图片：</span>
          <img :src="nav.activeUrl" class="thumb" ref="index">
          <uploader @upload="changeActivePic" :index='index'></uploader>
        </div>

        <div class="ed-nav-txt">
          <label class="ed-set-label ed-set-label-c">导航文本</label>
          <el-input v-model="nav.text" style= "margin-left:10px"></el-input>
        </div>

        <div class="selectLink" v-if="active==index">
            <label class="ed-set-label ed-set-label-c">请选择链接</label>
            <el-select v-model="level1Val" placeholder="请选择" @change="changeType">
              <el-option
                v-for="item in level1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="level2Val" :placeholder="level2.placeholder" v-if="showLevel2 && level1Val==0" @change="changeLevel2">
              <el-option
                v-for="item in level2.lists"
                :key="item.pageName"
                :label="item.title"
                :value="item.pageName" v-if="item.pageName !='goods'">
              </el-option>
            </el-select>
            <el-select v-model="level2Val" :placeholder="level2.placeholder" v-if="showLevel2 && level1Val!==3 && level1Val!='' && level1Val!=0" @change="changeLevel2">
              <el-option
                v-for="item in level2.lists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          <!--  <el-select v-model="level3Val" :placeholder="level3.placeholder" @change="changeLevel3" v-if="showLevel3">
              <el-option
                v-for="item in level3"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>-->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uploader from './uploader'
import navtor from './navtor'
export default{
  name: 'slider',
  data(){
    return  {
      navs:this.value,
      active: null,
      page: '',
      level1: [{
        value: '0',
        label: '跳转页面'
      }, {
        value: '1',
        label: '跳转分类'
      }],

      level1Val: '',
      level2Val: '',
      showLevel2: false,
      level2: {},
      goodsCategorys: {
        placeholder: '商品分类选择',
        lists: []
      },
      goshopPages : []
    }
  },
  props:{
    index: {
      type: Number
      },
    name,
    value :{
      type: Array
    }
  },
  computed: {
    pages () {
        return this.$store.state.newApps
    },
    curPage () {
      return this.$store.state.curPage
    },
    cityIdentify (){
      return  this.$store.state.cityIdentify　//cloud_shop指北分
    }
  },
  components:{
    uploader,
    navtor
  },
  watch: {
    navs(newnavs) {
      this.navs = newnavs
    },
    active (newVal) {
      var curPage = this.$store.state.curPage
      var cindex = this.$store.state.cindex
      var page_str = this.pages[curPage].children[cindex].items.navs[newVal]['to']
      this.page =page_str ? this.getPageName(page_str) : page_str
    }
  },
  methods:{
      getPageName(str){
        var arr=str.split('/')
        return arr[1]
      },
     changePic(a){
        let $this=this
        $this.$set($this.navs[a[1]],'url',a[0])
        // $this.$store.commit('upConfig')
     },
     changeActivePic(a){
       let $this=this
       $this.$set($this.navs[a[1]],'activeUrl',a[0])
     },
     addPic () {
       if(this.navs.length==5){
         this.$message({
           type: 'info',
           message: '导航不能超过5个'
         })
         return
       }
       this.$store.commit('addPic','navs')
     },
     deletePic (index) {
       var data = {index :index, type: 'navs'}
       this.$store.commit('deletePic', data)
     },
     panel (index) {
       var that = this
       var code = this.navs[index].code
       this.level1Val = code.split('*')[0]?code.split('*')[0]+'':''
       this.level2Val = code.split('*')[1]?code.split('*')[1]+'':''
       if(this.level1Val=='0'){
           this.level2 = {placeholder:'页面选择',lists:this.pages.concat([{'pageName': 'car','title': '购物车'}])}
       }
       if(this.cityIdentify=="cloud_shop"){
          this.level2 = {placeholder:'页面选择',lists:this.pages.concat(this.goshopPages)}
       }
       if(this.level2Val==""){
         this.showLevel2 = false
       }else{
         if(this.level1Val=='1'){
           this.level2 = this.goodsCategorys
         }
         this.showLevel2 = true
       }
       this.active = index
     },
     changeType (value) {
       switch (value) {
         case '0':
           if(this.cityIdentify=="cloud_shop"){
             this.level2 = {placeholder:'页面选择',lists:this.pages.concat(this.goshopPages)}
           }else{
            this.level2 = {placeholder:'页面选择',lists:this.pages.concat([{'pageName': 'car','title': '购物车'}])}
           }
           this.showLevel2 = true
           break
         case '1':
           this.level2 = this.goodsCategorys
           this.showLevel2 = true
           break

         default:
           break
       }
       this.level2Val = ""
     },
     changeLevel2 (value) {
       var that = this
       if(value==""){
         return
       }
       switch (this.level1Val) {
         case '0':
           var code = this.level1Val+'*'+this.level2Val
           console.log(code)
           var data = {index: this.active, value: value+'', type: 'navs', code: code}
           var  pages = this.pages
           for(var i = 0;i <pages.length;i++){
              if(pages[i]['pageName'] == this.page && pages[i].signGoodsId){
                data.signGoodsId = pages[i].signGoodsId
                break
              }
           }
           this.$store.commit('setLink', data)
           break;
         case '1':
           // 商品
           var index = 0
           this.goodsCategorys.lists.forEach(function(item,idx){
             if(item.value==value){
               index = idx
             }
           })
           var title = this.goodsCategorys.lists[index].label
           value = '../classlistTwo/classlistTwo' + '?classid=' + value + '&title=' + title
           var code = this.level1Val+'*'+this.level2Val
           var data = {index: this.active, value:value+'', type: 'navs', code: code}
           this.$store.commit('setKefu', data)
           break
         default:
           break
       }
     }
  },
  mounted () {
    var that = this
    // 获取商品分类
    wx.request({
      url: this.$root.apiServer+this.$root.appid+'/cloud/public/index.php/shop/Category/getlist',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uniacid: 2,
        page_number: 1,
        page_size: 99
      },
      success (res) {
          var result = []
          var data = res.data.data
          data.forEach(function(item,idx,arr){
            var object = {
              value: "",
              label: "",
              children: {
                placeholder: '商品名称选择',
                lists: []
              }
            }
            object.value = item.id+''
            object.label = item.name
            result.push(object)
          })
          that.goodsCategorys.lists = result
        }
    })

    // 北分固定链接
    this.goshopPages =  [
      {
        'pageName': 'allshops1',
        'title': '全部商品'
      },
      {
        'pageName': 'allshops2',
        'title': '促销商品'
      },
      {
        'pageName': 'affiche',
        'title': '店铺公告'
      }
    ]
  }
}
</script>
<style scoped>
.cursor{
  cursor:pointer
}
.ed-pic{
  padding:15px;
}
.selectLink .el-select{
  margin-bottom: 10px;
}
.ed-pic-li{
  border: 1px solid #ededed;
  margin:15px 0px;
  background-color: #fff;
}
.el-icon-delete{
  cursor: pointer;
}
.ed-pic-hd{
  padding: 10px;
}
.ed-flex{
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.thumb{
    display: inline-block;
    width: 54px;
    height: 54px;
    margin: 0;
    text-align: center;
    font-size: 0;
    border: none;
}
.side-right .ed-pic-hd{
	padding: 10px;
	background: #fff;
	border-bottom: #ededed solid 1px;
}
.side-right .ed-pic-bd{
	position: relative;
}
.side-right .ed-pic-bd .ed-pic-box{
	padding: 10px;
}
.side-right .ed-pic-bd .labelTab{
	line-height: 40px;
	background: #f4f4f4;
	padding: 0 10px;
}
.ed-set-label-c{
  font-weight: normal;
  font-size: 12px;
}
.side-right .ed-pic-bd .labelTab:after{
	display: block;
	height: 0;
	content: '';
	clear: both;
	overflow: hidden;
	visibility: hidden;
}
.side-right .ed-pic-bd .el-button{
	position: absolute;
	left: 0;
	width: 80px;
	top: 40px;
}
.labelTab label{
	padding: 0;
	float: left;
	background: none;
	width: 80px;
	cursor: pointer;
	text-align: center;
	margin: 0;
}
.labelTab .addLab{
	background:#20a0ff;

	height: 30px;
	line-height: 30px;
	border-radius: 4px;
	margin-top: 5px;
	color: #fff;
}
.vd-primary-color{
  width: 100%;
	background: #18ccc0;
	border: solid 1px #18ccc0;
	}
.vd-primary-color:hover{
	background: #1be6d8;
	border: solid 1px #1be6d8;
}
.ed-nav-txt{
  padding-bottom: 10px;
}
</style>
