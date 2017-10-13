<template>
  <div class="side-left pos-r vd-box-sizing dis-flex">
    <el-menu default-active="0" class="el-menu-vertical-demo vd-box-sizing dis-flex-1" @select="handleSelect">
      <el-menu-item :index="index.toString()" v-for="(page,index) in newApps" :key='index' class="dis-flex pos-r">
          <div class="dis-flex-1 txtellipsis"><i class="el-icon-document"></i>{{page.title}}</div>
          <div v-if="curPage==index &&page.is_del" class="ml-20">
            <el-button type="text" @click.stop="editName(1,'',page.title)" class="ed-menu-btn"><i class="el-icon-edit"></i></el-button>
            <el-button type="text" @click.stop="remove(index)" class="ed-menu-btn"><i class="el-icon-delete" ></i></el-button>
          </div>
          <div class="ed-menu-btn-edidt pos-a dis-flex vd-box-sizing" v-if="curPage==index&&edittype">
            <el-input v-model="page.title" placeholder="请输入内容" ></el-input>
            <el-button type="primary" size="small" @click.stop="editName(2)" class="vd-primary-color">确定</el-button>
            <el-button type="primary" size="small" @click.stop="editName(3,index)" class="vd-primary-color">取消</el-button>
          </div>
      </el-menu-item>
    </el-menu>
    <div class="ed-addPage vd-bg pos-a vd-box-sizing pos-r dis-flex" @click="show = !show">
        <div class="ed-addPage-btn-1 dis-flex-1"><i class="el-icon-plus"></i>&nbsp;&nbsp;新建页面</div>
        <div class="ed-addPage-up-btn" @click=""><i class="el-icon-caret-bottom" :class="show?'rotate':''"></i></div>
    </div>
    <el-menu class="page-list" :class="show?'show':''">
      <el-menu-item index="1" @click="addPage(1)"><i class="el-icon-plus"></i>新建普通页面</el-menu-item>
      <el-menu-item index="2" @click="addPage(2)" v-if="cityIdentify != 'cloud_shop'"><i class="el-icon-plus"></i>新建单商品页</el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/javascript">
export default {
  data(){
    return　{
      edittype:false,
      editNameBefore:'',
      show: false
    }
  },
  computed: {
    newApps(){
      return this.$store.state.newApps
    },
    curPage () {
      return this.$store.state.curPage
    },
    cityIdentify　(){
      return  this.$store.state.cityIdentify　
    }
  },
  mounted: function () {
    // 初始化页面
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$store.commit('changePage', key)
    },
    addPage (type) {
      this.$store.commit('addPage',type)
    },
    editName(type,index,name){
      switch(type) {
        case 1:
          this.edittype = true
          this.editNameBefore = name
          break
        case 2:
          this.edittype = false
          break
        case 3:
          let pages=this.newApps
          this.edittype = false
          this.$set(pages[index],'title',this.editNameBefore)
          this.$store.commit('upConfig')
          break
      }

    },
    remove(index) {
        this.$confirm('此操作将删除该模块, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('removePage',index)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    showPanel: function () {

    }
  }
}
</script>
<style>
input{border: none;padding: 0;margin: 0;}
.side-left{
  flex-direction:column;
  width: 240px;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ddd;
  border-top:0;
  box-sizing: border-box;
  left: 0;
  bottom:0;
  padding-top: 60px;
  padding-bottom: 40px;
  overflow:hidden;
}
.txtellipsis{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ml-20{
  margin-left: 20px;
}
.side-left ul{
	background: #ffffff;
}
.side-left ul{
  margin:0;
  padding: 0;
}
.side-left li{
  list-style: none;
  height: 56px;
  line-height: 56px;
	/*background: url(../../../static/img/bord2.png) no-repeat center;*/
}
.side-left li:first-child{
	/*background: url(../../../static/img/bord1.png) no-repeat center;*/
}
/*.side-left li:hover{
	color: #17c3b8;
}*/
.side-left li a{
  text-decoration: none;
  color: #333;
}
.side-left ul .is-active{
	/*background: url(../../../static/img/bord.png) no-repeat center;*/
	color: #18ccc0 !important;
}
.side-add{
border: 1px solid #d6d6d6;
height: 44px;
line-height:44px ;
overflow: hidden;
border-top: none;
}
.side-add:after{
	height: 0;
	content: "";
	clear: both;
	overflow: hidden;
	visibility: hidden;
	display: block;
}
.side-add input{
	width: 124px;
	height: 28px;
	border:solid 1px #18ccc0;
	border-radius: 4px;
	margin-left: 10px;
}
.side-add .el-button{
	width: 40px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border: none;
	padding: 0;
	margin: 0;
	background: #dfe5e6;
}
.side-add .el-button--primary{
	background-color:#18ccc0;

}
.side-add .el-button--primary:hover{
	background-color:#7ce2db;

}
.ed-addPage{
  bottom: 0;
  left: 0;
  width: 100%;
  color: #ffffff;
  height: 40px;
  text-align: center;
  line-height:40px;
  font-size:16px;
  cursor: pointer;
  z-index: 2;
}
.ed-addPage-up-btn{
  width: 40px;
  height: 40px;
  font-size:16px;
  line-height: 40px;
  border-left:1px solid #21b7ad;
}
.ed-addPage-btn-1{
  padding-left:20px;
}
.ed-addPage-btn-2{
  width: 100%;
  position: absolute;
  top:-40px;
  height: 40x;
  background-color: #e9f9f9;
  color: #18cac0!important;
}
.ed-addPage-up-btn .el-icon-caret-top:before{
  color: #fff!important;
}
.el-menu-vertical-demo{
  width: 100%;
  overflow-y: auto;
}
.ed-menu-btn{
  color: #48576a!important;
}
.ed-menu-btn-edidt{
  width: 100%;
  height: 100%;
  padding:10px 10px 10px 5px;
  background-color: #ffffff;
}

.vd-primary-color{
	background: #18ccc0;
	border: solid 1px #18ccc0;
	}
.vd-primary-color:hover{
	background: #1be6d8;
	border: solid 1px #1be6d8;
}
.side-right .popper__arrow{display: none !important;}
.page-list{
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  text-align: center;
  padding-bottom: 40px !important;
  z-index: 1;
  transform: translateY(100%);
  transition: all 0.35s linear;
  visibility: hidden;
}
.page-list.show{
  visibility: visible;
  transform: translateY(0);
}
.page-list li{
  height: 40px;
  line-height: 40px;
  background: #e9f9f9;
  color: #18cac0;
  width: 100%;
  border-bottom: 1px solid #8ce5e0;
}
.el-icon-caret-bottom{
  transition: all 0.3s;
}
.el-icon-caret-bottom.rotate{
  transform: rotate(180deg);
}
</style>
