<template>
	<div class="ed-pic">
    <div v-for="(nav, index) in navs" class="ed-pic-li">
      <div class="ed-pic-hd ed-flex cursor" @click="panel(index)">
        <div>
          <i class="el-icon-caret-right"></i>
          <span>{{nav.text}}</span>
        </div>
      </div>
      <div class="ed-pic-bd" v-show="active==index">
        <div class="ed-pic-box">
          <label class="ed-set-label ed-set-label-c">图标</label>
          <img :src="nav.src" class="thumb" ref="index">
          <uploader @upload="changePic" :index='index'></uploader>
        </div>

        <div class="ed-nav-txt">
          <label class="ed-set-label ed-set-label-c">文本</label>
          <el-input v-model="nav.text"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uploader from './uploader'
export default{
  name: 'slider',
  data(){
    return  {
      navs:this.value,
      active: null
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
    curPage (){
      return this.$store.state.curPage
    }
  },
  components:{
    uploader
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
        $this.$set($this.navs[a[1]],'src',a[0])
        // $this.$store.commit('upConfig')
     },
     panel (index) {
       this.active = index
     }
  },
  mounted () {

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
.ed-nav-txt .ed-set-label{
  margin: 0 10px 10px;
}
</style>
