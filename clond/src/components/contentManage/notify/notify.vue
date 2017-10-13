<template>
  <div class='notify'>
    <div class='bc_block'>
      <h2>消息通知</h2>
      <div class="info_not">
          <el-row>
            <el-col :span="2"><img src="~assets/images/vd_qrcode.jpg" /></el-col>
            <el-col :span="22">
              <p>关注微动天下公众号，</p>
              <p>将用户添加至后台为内部用户，就可实时接收订单动态提醒啦！</p>
            </el-col>
          </el-row>    	
      </div>
      <div class='no_nav'>
        <ul class='tabnav'>
          <li 
            v-for='(list,index) in navlist' 
            :class='{"current":index==currentindex, "litwo":index==currentindex&&index==1}' 
            v-text='list'
            @click='filterlist(index)'>
          </li>
        </ul>
        <div class="service">
        	<button @click="openNewService">客服电话设置</button>
        </div>
        <div class='search'>
          <el-input
            placeholder="搜索内部用户昵称"
            icon="search"
            v-model="inputsearch"
            :on-icon-click="clicksearch">
          </el-input>
        </div>
      </div>
      <div class='list_tab'>
        <div class='no_lists' v-if='currentindex==0'>
          <el-row>
            <el-col :span="2"><img src="~assets/images/test/1.png" /></el-col>
            <el-col :span="18">
              <p>中国好小伙</p>
              <p>性别：男</p>
              <p>城市：北京宁波</p>
            </el-col>
            <el-col :span="4"><a class='libtn' href='javascript:;'>删除用户</a></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><img src="~assets/images/test/1.png" /></el-col>
            <el-col :span="18">
              <p>中国好小伙</p>
              <p>性别：男</p>
              <p>城市：北京宁波</p>
            </el-col>
            <el-col :span="4"><a class='libtn' href='javascript:;'>删除用户</a></el-col>
          </el-row>
        </div>
        <div class='no_lists' v-if='currentindex==1'>
          <el-row>
            <el-col :span="2"><img src="~assets/images/test/1.png" /></el-col>
            <el-col :span="18">
              <p>中国好小伙</p>
              <p>性别：男</p>
              <p>城市：北京宁波</p>
            </el-col>
            <el-col :span="4"><a class='libtn' href='javascript:;'>添加内部用户</a></el-col>
          </el-row>
          <el-row>
            <el-col :span="2"><img src="~assets/images/test/1.png" /></el-col>
            <el-col :span="18">
              <p>中国好小伙</p>
              <p>性别：男</p>
              <p>城市：北京宁波</p>
            </el-col>
            <el-col :span="4"><a class='libtn' href='javascript:;'>添加内部用户</a></el-col>
          </el-row>
        </div>
      </div>
    </div>
    
    <!-- 新增类别弹窗 S -->
    <el-dialog :title='catalogTitle'
      v-model='newTypeVisible'
      size='xs'
      custom-class='dialog-theme2'
      @close='closeNewTypePop'>
      <div class='content'>
        <div class='editInfo'>
          <div class='ei_group clearfix ei_mt10'>
            <el-input v-model='newTypeInput' class='umDepinput'
             @keyup.enter='saveNewTypeDialog' placeholder='请输入客服电话'></el-input>
            <p class='error' v-show='isNewError == true'>{{ newError }}</p>
          </div>
          <div class='ei_button ei_button_lg ei_mt20'>
            <button class='ei_b_baocun' type='button' @click='saveNewTypeDialog'>确定</button>
            <button class='ei_b_quxiao' type='button' @click='closeNewTypePop'>取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 新增类别弹窗 E -->
    
  </div>
</template>

<script>
export default {
  name: 'notify',
  components: {
  },
  data () {
    return {
      navlist: ['内部用户管理', '新增内部用户'],
      currentindex: 0,
      inputsearch: '',
      
      /* 弹窗 */
      newTypeVisible: false,
      isNewError: false,
      newError: '',
      newTypeInput: '',
      catalogId: '',
      catalogTitle: ''
    }
  },
  methods: {
    filterlist: function (index) {
      this.currentindex = index
    },
    clicksearch: function () {
      // console.log(1)
    },
    openNewService: function () {
      this.newTypeVisible = true
      this.catalogId = ''
      this.catalogTitle = '客服电话设置'
    },
    closeNewTypePop: function () {
      this.newTypeInput = ''
      this.newError = ''
      this.isNewError = false
      this.newTypeVisible = false
    },
    saveNewTypeDialog: function () {
      // let testVal = /^[\u4e00-\u9fa5]{0,6}$/
      let newTypeVal = this.newTypeInput.trim()
      if (!newTypeVal) {
        this.newError = '请输入客服电话'
        this.isNewError = true
        return false
      }
      this.newError = ''
      this.isNewError = false
      this.newTypeVisible = false
    },
  },
  comnputed: {
  },
  watch: {
  }
}
</script>

<style scoped>
.notify{
  padding: 0 20px;
}
.bc_block{
  margin-top: 30px;
}
.bc_block h2{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}
.info_not{
	width: 100%;
	padding:10px;
	background: #F5F5F5;
	margin-bottom: 16px;
}
.info_not .el-row{
	border:none;
	padding: 0;
}
.info_not img{
  border: 1px solid #ededed;
  width: 79px;
  height: 79px;
}
.info_not .el-row p:first-child{
	margin-top: 20px;
}
.no_nav{
  overflow: hidden;
}
.no_nav ul{
  float: left;
  display: inline-block;
}
.no_nav ul li{
  width: 110px;
}
.list_tab{
  margin-top: 12px;
}
.no_lists img{
  border: 1px solid #ededed;
  width: 79px;
  height: 79px;
}
.no_lists p{
  line-height: 27px;
}
.no_lists a.libtn{
  float: right;
  background-color: #18ccc0;
  border-radius: 3px;
  color: #fff;
  width: 120px;
  line-height: 32px;
  display: inline-block;
  text-align: center;
  margin-top: 25px;
}
.el-row{
  padding: 15px 0;
  border-bottom: 1px dashed #e2e2e2;
}
.service{
	float: left;
	margin-left: 10px;
}
.service button{
		border: 1px solid #ddd;
    border-radius: 3px;
    text-indent: 20px;
    line-height: 30px;
    background: #fff;   
  	width: 130px;
  	background: url(../../../../static/img/icon-manage.png) no-repeat 10px 7px;
}
.search{
  float: right;
  margin-top: 8px;
}
.ei_b_baocun,.ei_group{
  margin-left: 48px;
}
.ei_group p.error{
  line-height: 40px;
  margin-bottom: -20px;
  color: #cc0000;
}
</style>
