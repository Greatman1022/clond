<template>
	<div class="">
		<div class="dailog-head">
			可替换模板
		</div>
		<div class="dailog-content">
			<div class="loading" v-show="show_loading">
				<div class="el-loading-mask"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><p class="el-loading-text c18">拼命加载中</p></div></div>
			</div>
			<div class="searchDiv">
			<el-input placeholder="输入模板名称" icon="search" v-model="input2" :on-icon-click="handleIconClick" class="search"></el-input><span class="search-tips">*替换模板只会替换布局和初始固定素材，原有交互设计无法保留，后台数据不会受到影响。</span>
			</div>
			<div class="tpl"  v-if="arr.length>0" v-for="(item,index) in arr" @click="checkTpl(item.id)">
					<div class="tpl-img"><img :src="'http://image.vdongchina.com/' + item.cover"  width="100%;"/>
							<div class=" checking" v-show="checkingId == item.id"><div class="checking-des"><i class="fa fa-check-circle-o"></i><p>{{des1}}</p></div></div></div>
					<div class="tpl-tit">{{item.name}}</div>					
			</div>
			<div class="tpl0" v-if="arr.length==0">
				搜索数据为空
			</div>
		</div>
		<div class="dailog-foot">
			<button type="button" class="el-button el-button--primary vd-primary-color" @click="sure"><span>确定</span></button>
			<button type="button" class="el-button  is-plain vd-primary-color2" @click="cancel"><span>取消</span></button>
		</div>
	</div>
</template>
<script>
import API from '@/fetch/api.js'
	export default{
		data(){
			return {
				arr:[],//模板数组
				show_loading:true,
				des1:'当前使用模板',
				checkingId: '', //当前选择模板id
				input2:'',
				usingId:''
			}
		},
		computed:{
			// identify(){
			// 	return this.$store.state.cityIdentify
			// },
			temp(){
				var temp = this.$store.state.temp
				this.usingId=this.checkingId = this.$store.state.temp.id
				return temp
			}
		},
		mounted(){
			var that= this
			// var identify=this.$store.state.cityIdentify
			API.checkTpl({identify:that.temp.identify}).then((res)=>{
				if(res.success){
					 that.arr = res.list
				}
				setTimeout(function(){
						that.show_loading= false	
					},2000)		
			})
		},
		methods:{
			checkTpl(id){
				// console.log(this.usingId,id)
				this.checkingId=id
				this.des1 =this.usingId ==id?'当前使用模板':'当前选择模板'
			},
			sure(){
				if(this.usingId==this.checkingId){
					this.$message({
	            type: 'info',
	            message: '您所选取的模板已是当前使用模板,无需替换'
	         }) 
				}else if(this.checkingId==''){
					this.$message({
	            type: 'info',
	            message: '请选择好使用模板'
	        }) 	
				}else{
					this.$confirm('此操作将永久替换了您当前所制作的数据?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
        		type: 'warning'
	        }).then(() => {
	        	let that = this
	        	// let config = this.arr[this.checkingId].config
	        	API.getTpl({id:this.checkingId}).then((res)=>{
	        		if(res.success){
	        			that.$emit('checkTpl',[4,JSON.parse(res.data.config).pages,that.checkingId])
	        		}
	        	})
	        })
				}
			},
			cancel(){
				this.$emit('checkTpl',3)
			},
			handleIconClick(){
			var  that = this
				that.show_loading= true
				API.checkTpl({
					identify : that.temp.identify,
					name:that.input2
				}).then((res)=>{
					if(res.success){
					 that.arr = res.list
					 if(that.arr.length){
					 	that.checkingId =''
					 }
					}
					setTimeout(function(){
						that.show_loading= false	
					},2000)			
				})
			}
		}
	}
</script>
<style scoped>
	 .c18{
	 	color: #18ccc0
	 }
	 .dailog-head,.dailog-foot{
		color: #18ccc0;
		text-align:center;
		font-size: 16px;
		padding-top: 15px;
		padding-bottom: 15px;
		position: relative;
	 }
	 .dailog-content{
	 	position: relative;
	 	padding: 20px 15px;
		height: 500px;
	 	overflow-y: auto;
	 }
	 /*.dailog-footer{
	 	text-align: cente
	 }*/
	 .dailog-head:after{
		content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #18ccc0;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
	 }
	 .dailog-foot:before{
	 	content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #18ccc0;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
	 }
	 .vd-primary-color2{
	 	color: #18ccc0!important;
		border-color: #18ccc0!important;
	 }
	 .dis-flex{
		display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */  
		display: -moz-box; /* Firefox 17- */  
		display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */  
		display: -moz-flex; /* Firefox 18+ */  
		display: -ms-flexbox; /* IE 10 */  
		display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */  
	 }
	 .tpl{
	 	display: inline-block;
	 	margin-left: 14px;
	 	margin-right: 15px;
	 	margin-bottom: 15px;
	 	box-shadow: rgba(0,0,0,0.1) 0px 0px 5px;
	 	cursor: pointer;
	 }
	 .tpl-img{
	 		position:relative; 
			height: 160px;
			width: 160px;
			overflow: hidden;
	 }
	 .tpl-tit{
			font-size: 16px;
			text-align: center;
			padding-top: 10px;
			padding-bottom: 10px;
	 }
	 .checking{
	 	position: absolute;
	 	top:0;
	 	left:0;
	 	font-size: 14px;
	 	width: 100%;
	 	height: 100%;
	 	color: #FFF;
	 	text-align: center;
	 	background-color: rgba(0,0,0,0.2);
	 	z-index: 99;
	 }
	 .tpl0{
	 	position: absolute;
	 	top: 50%;
	 	left:50%;
	 	text-align: center;
		-webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
	 }
	 .checking i{
	 	font-size: 52px;
	 }
	 .checking-des{
			position: relative;
			top:50%;
			left:50%;
			-webkit-transform: translate(-50%, -50%);
    	transform: translate(-50%, -50%);
	 }
	 .vd-primary-color:hover,.vd-primary-color:focus{
    background: #1be6d8;
    border: solid 1px #1be6d8;
	}
	.search{
		width: 20%;
		margin-bottom: 15px;
	}
	.searchDiv{
		padding: 5px 15px; 
	}
	.el-input__inner{
		width: auto!important
	}
	.search-tips{
		margin-left:15px;
		color: #e15555
	}
</style>
