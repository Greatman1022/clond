<template>
	<div class="PagePro-box">
		<div class="h-tit">页面标题属性</div>
		<div class="body-li dis-flex">
			<span class="b-tit">标题</span>
			<div class="b-container dis-flex-1">
				<el-input v-model="title" class="ui-input"></el-input>
			</div>
		</div>
		<div class="body-li dis-flex">
			<span class="b-tit">背景色</span>
			<div class="b-container dis-flex-1">
				<el-color-picker v-model="bgColor" class="ml0"></el-color-picker>
        <input type="text" v-model="bgColor" class="color-input"/>
			</div>
		</div>
		<div class="body-li dis-flex">
			<span class="b-tit">标题颜色</span>
			<div class="b-container dis-flex-1">
        <el-radio class="radio" v-model="txtColor" label="black">黑色</el-radio>
        <el-radio class="radio" v-model="txtColor" label="white">白色</el-radio>
			</div>
		</div>
		<div class="body-li dis-flex" v-if="pageName&&pageName.indexOf('signGoods')!=-1">
			<span class="b-tit">商品绑定</span>
			<div class="b-container dis-flex-1">
				<el-select v-model="value4"  placeholder="请选择" @change="change(1)" class="selectOption ml0">
			    <el-option
			      v-for="item in options1"
            :key='item.id'
			      :label="item.name"
			      :value="item.id">
			    </el-option>
  			</el-select>
  			<el-select v-model="value5" placeholder="请选择" class="selectOption ml0" @change="change(2)">
			    <el-option
			      v-for="item in options2"
            :key='item.uuid'
			      :label="item.name"
			      :value="item.uuid">
			    </el-option>
  			</el-select>
  		</div>
		</div>
	</div>
</template>
<script>
export default {
  data(){
  	return {
  		options1 :[],
  		options2 :[],
      value4:{
        type:Number
      },
      value5:{
        type:Number
      },
      curPageType:{
        type:Number
      }
  	}
  },
  computed:{
    rootAppid(){
      return this.$store.state.rootAppid
    },
  	newApps(){
      return this.$store.state.newApps
    },
    curPage(){
      this.curPageType = this.$store.state.curPage
    	return this.$store.state.curPage
    },
    pageName(){
    	return this.newApps.length>0 ?this.newApps[this.curPage].pageName :''
    },
    title: {
    	get(){
    		return this.newApps.length>0 ? this.newApps[this.curPage].title :''
    	},
    	set(e){
    		this.$set(this.newApps[this.curPage],'title',e)
        this.$store.commit('upConfig')
    	}
    },
    bgColor: {
    	get() {
    		return this.newApps.length>0 ? this.newApps[this.curPage].navigationBarBackgroundColor :''
    	},
    	set(e) {
    		this.$set(this.newApps[this.curPage],'navigationBarBackgroundColor',e)
        this.$store.commit('upConfig')
    	}
    },
    txtColor: {
    	get() {
    		return this.newApps.length>0 ? this.newApps[this.curPage].navigationBarTextStyle :''
    	},
    	set(e) {
    		this.$set(this.newApps[this.curPage],'navigationBarTextStyle',e)
        this.$store.commit('upConfig')
    	}
    }
  },
  mounted() {
   // this.nextTick()
      // this.$nextTick(function () {
      //   this.$http.get(this.$root.apiServer+this.$root.appid+'/basic/api/product/catalogProducts').then((res) => {
      //     var fdata = JSON.parse(res.bodyText)
      //     this.options1 = fdata.data
      //   })
      // })
    },
  watch: {
    curPageType() {
      var curPage=this.curPage
      if (this.newApps[curPage].pageName.indexOf('signGoods') != -1 && this.newApps[curPage].GoodsId != '') {
        this.value4 = this.newApps[curPage].GoodsId
        if(this.newApps[curPage].signGoodsId!=''){
          this.value5 = this.newApps[curPage].signGoodsId
        }
      }else if(this.newApps[curPage].pageName.indexOf('signGoods') != -1 && this.newApps[curPage].GoodsId == ''){
          this.value4 = ''
          this.value5 = ''
      }
    },
    rootAppid(){
      this.nextTick()
    }
  },
  methods: {
    nextTick() {
      this.$nextTick(function () {
        this.$http.get(this.$root.apiServer+this.$root.appid+'/basic/api/product/catalogProducts').then((res) => {
          var fdata = JSON.parse(res.bodyText)
          this.options1 = fdata.data
        })
      })
    },
    getSignGoods(callback){
      this.options2 = []
      if(this.newApps[this.curPage].GoodsId != this.value4){
        this.value5 = ''
      }
      for (var i = 0; i < this.options1.length; i++) {
        if (this.options1[i].id == this.value4) {
          this.options2 = this.options1[i]['products']
          return false
        }
      }
    },
    change(type) {
      switch (type) {
        case 1:
          this.getSignGoods()
          break
        case 2:
          this.$set(this.newApps[this.curPage],'GoodsId',this.value4)
          this.$set(this.newApps[this.curPage],'signGoodsId',this.value5)
          this.$store.commit('changePicTo',{id:this.value5,pageName:this.pageName})
          break
      }


    }
  }
}
</script>

<style>
	.PagePro-box{

	}
	.h-tit{
		font-size: 16px;
		padding:10px;
		font-weight: bold;
		background-color: #e1e1e1;
		margin-bottom: 10px;
	}
	.body-li{
		margin-bottom: 10px;
	}
	.b-tit{
		display: inline-block;
		width: 90px;
		padding-left:10px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		box-sizing:border-box;
	  -moz-box-sizing:border-box; /* Firefox */
	  -webkit-box-sizing:border-box; /* Safari */
	}
	.b-container{
		padding-right: 10px;
		box-sizing:border-box;
	  -moz-box-sizing:border-box; /* Firefox */
	  -webkit-box-sizing:border-box; /* Safari */
	}
	.selectOption{
		margin-bottom: 10px;
	}
  .ui-input{
    margin-left: -5%;
  }
  .color-input{
    width: 150px;
    height: 36px;
    padding: 10px;
    line-height: 16px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    vertical-align: top;
  }
</style>
