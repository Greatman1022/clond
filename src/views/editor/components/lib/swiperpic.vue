<template>
	<div class="ed-pic">
    <el-button type="primary" @click="addPic" class="vd-primary-color cursor"><i class="el-icon-plus"></i>&nbsp;添加图片栏</el-button>
    <div v-for="(slide, index) in sliders" class="ed-pic-li" :key="index">
      <div class="ed-pic-hd ed-flex cursor" @click="panel(index)">
        <div>
          <i class="el-icon-caret-right"></i>
          <span>图片{{index}}</span>
        </div>
        <i class="el-icon-delete" @click.stop="deletePic(index)"></i>
      </div>
      <div class="ed-pic-bd" v-show="active==index">
        <div class="ed-pic-box">
          <img :src="slide.url" class="thumb" ref="index">
          <uploader @upload="changePic" :index='index'></uploader>
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

            <el-select v-model="level3Val" :placeholder="level3.placeholder" @change="changeLevel3" v-if="showLevel3">
              <el-option
                v-for="item in level3.lists"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <label class="ed-set-label ed-set-label-c">标题名称</label>
            <el-input v-model="slide.desc" placeholder="请输入标题"></el-input>
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
      sliders:this.value,
      active: null,
      page: '',
      level1: [{
        value: '0',
        label: '跳转页面'
      }, {
        value: '1',
        label: '跳转商品'
      }, {
        value: '2',
        label: '跳转图文'
      }, {
        value: '4',
        label: '跳转预约'
      }, {
        value: '5',
        label: '跳转服务'
      }, {
        value: 'orderList',
        label: '我的订单'
      }],
      level1Val: '',
      level2Val: '',
      level3Val: '',
      showLevel2: false,
      showLevel3: false,
      level2: {},
      level3: {},
      goodsCategorys: {
        placeholder: '商品分类选择',
        lists: []
      },
      tuwenCategorys: {
        placeholder: '图文分类选择',
        lists: []
      },
      formCategorys: {
        placeholder: '预约分类选择',
        lists: []
      },
      serviceCategorys: {
        placeholder: '服务分类选择',
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
    curPage (){
      return this.$store.state.curPage
    }
  },
  components:{
    uploader
  },
  watch: {
    active (newVal) {
      var curPage = this.$store.state.curPage
      var cindex = this.$store.state.cindex
      var page_str = this.pages[curPage].children[cindex].items.swiperSlides[newVal]['to']
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
        $this.$set($this.sliders[a[1]],'url',a[0])
        // $this.$store.commit('upConfig')
     },
     addPic () {
       this.$store.commit('addPic','swiperSlides')
     },
     deletePic (index) {
       var data = {index: index,type:'swiperSlides'}
       this.$store.commit('deletePic', data)
     },
     panel (index) {
       var that = this
       var code = this.sliders[index].code
       var  pages = this.pages
        //console.log("code",code)
       if(code==undefined){
          this.level1Val=1
          var page_str = this.sliders[index].to
          var pageName =page_str ? this.getPageName(page_str) : page_str

          for(var i = 0;i <pages.length;i++){
              if(pages[i]['pageName'] == pageName){
                this.level2Val=pages[i].title
                break
              }
          }
          //console.log("lev",this.level2Val)
        }else if(code==""){
          this.level1Val=""
          this.level2Val=""
          this.level3Val=""
        }else{
          this.level1Val = code.split('*')[0]?code.split('*')[0]+'':''
          this.level2Val = code.split('*')[1]?code.split('*')[1]+'':''
          this.level3Val = code.split('*')[2]?code.split('*')[2]+'':''
       }

       if(this.level1Val=='0'){
           this.level2 = {placeholder:'页面选择',lists:this.pages.concat([{'pageName': 'car','title': '购物车'}])}
       }
       if(this.sampleAppid=="goshop"){
          this.level2 = {placeholder:'页面选择',lists:this.pages.concat(this.goshopPages)}
       }
       if(this.level2Val==""){
         this.showLevel2 = false
       }else{
         if(this.level1Val=='1'){
           this.level2 = this.goodsCategorys
         }
         if(this.level1Val=='2'){
           this.level2 = this.tuwenCategorys
         }
         if(this.level1Val=='4'){
           this.level2 = this.formCategorys
         }
         if(this.level1Val=='5'){
           this.level2 = this.serviceCategorys
         }
         this.showLevel2 = true
       }

       if(this.level3Val==""){
         this.showLevel3 = false
       }else{
         if(this.level1Val=='1'){
           var sindex = 0
          //  console.log(this.goodsCategorys.lists)
           this.goodsCategorys.lists.forEach(function(item,idx){
             if(item.value==that.level2Val){
               sindex = idx
             }
           })
           wx.request({
               url: this.$root.apiServer+this.$root.appid+'/basic/api/product/productByCatalogId',
               method: 'GET',
               header: {
                   'content-type': 'application/json'
               },
               data: {catalogId: that.level2Val},
               success (res) {
                 var data = res.data.data.filter(item => {
                      return item.status == 1
                  })//过滤未上架

                   data.forEach(function(item,idx){
                     that.goodsCategorys.lists[index].children.lists.push({value: item.uuid, label: item.name})/*item.uuid*/
                   })
                   that.level3 = that.goodsCategorys.lists[index].children
               }
           })
          //  this.level3 = this.goodsCategorys.lists[sindex].children
         }
         if(this.level1Val=='2'){
           var sindex = 0
           this.tuwenCategorys.lists.forEach(function(item,idx){
             if(item.value==that.level2Val){
               sindex = idx
             }
           })
           this.level3 = this.tuwenCategorys.lists[sindex].children
         }

         if(this.level1Val=='4'){
           var sindex = 0
            this.formCategorys.lists.forEach(function(item,idx){
              if(item.value==that.level2Val){
                sindex = idx
              }
            })

             wx.request({
                 url: this.$root.apiServer+ this.$root.appid +'/basic/plugin/form/paging',
                 method: 'GET',
                 header: {
                     'content-type': 'application/json'
                 },
                 data: {
                   categoryId: that.level2Val,
                   status: 1,
                   pageNum: 1,
                   pageSize: 10
                 },
                 success (res) {
                   var data = res.data.pagination.list.filter(item => {
                       return item.isOpen
                   })//过滤未上架
                   data.forEach(function(item,idx){
                     that.formCategorys.lists[index].children.lists.push({value:item.id+'', label: item.title})
                   })
                   that.level3 = that.formCategorys.lists[index].children
                 }
             })
           }

           if(this.level1Val=='5'){
             var sindex = 0
             this.serviceCategorys.lists.forEach(function(item,idx){
               if(item.value==that.level2Val){
                 sindex = idx
               }
             })
             this.level3 = this.serviceCategorys.lists[sindex].children
           }

           this.showLevel3 = true
       }
       this.active = index
     },
     changeType (value) {
       switch (value) {
         case '0':
           if(this.sampleAppid=="goshop"){
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
         case '2':
           this.level2 = this.tuwenCategorys
           this.showLevel2 = true
           break
         case '3':
           this.showLevel2 = false
           this.level2Val = ""
           this.level3Val = ""
           var code = this.level1Val+'*'+this.level2Val+'*'+this.level3Val
           var data = {index: this.active, value: 'kefu', type: 'swiperSlides', code: code}
           this.$store.commit('setKefu', data)
           break;
         case '4':
           this.level2 = this.formCategorys
           this.showLevel2 = true
           break
         case '5':
           this.level2 = this.serviceCategorys
           this.showLevel2 = true
           break
         case 'orderList':
          this.level2Val = ""
          this.level3Val = ""
          this.showLevel2 = false
          var code = this.level1Val+'*'+this.level2Val+'*'+this.level3Val
          var data = {index: this.active, value: value+'', type: 'swiperSlides', code: code}
          this.$store.commit('setLink', data)
          break
         default:
           break
       }
        this.level2Val = ""
        this.level3Val = ""
        this.showLevel3 = false
     },
     changeLevel2 (value) {
       var that = this
       if(value==""){
         return
       }
       switch (this.level1Val) {
         case '0':
           var code = this.level1Val+'*'+this.level2Val+'*'+this.level3Val
           var data = {index: this.active, value: value+'', type: 'swiperSlides', code: code}
           var  pages = this.pages
           for(var i = 0;i <pages.length;i++){
              if(pages[i]['pageName'] == this.page && pages[i].signGoodsId){
                data.signGoodsId = pages[i].signGoodsId
                break
              }
           }
           this.$store.commit('setLink', data)
           this.showLevel3 = false
           break;
         case '1':
            // 商品
           //  this.level3 = this.goodsCategorys.lists[value].children
            var index = 0
            this.goodsCategorys.lists.forEach(function(item,idx){
              if(item.value==value){
                index = idx
              }
            })
            wx.request({
                url: this.$root.apiServer+this.$root.appid+'/basic/api/product/productByCatalogId',
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                data: {catalogId: value},
                success (res) {
                  var data = res.data.data.filter(item => {
                      return item.status == 1
                  })//过滤未上架
                  that.goodsCategorys.lists[index].children.lists=[]//解决切换是数据重复拷贝
                  data.forEach(function(item,idx){

                    that.goodsCategorys.lists[index].children.lists.push({value:item.uuid, label: item.name})/*item.uuid*/
                  })
                  that.level3 = that.goodsCategorys.lists[index].children
                  that.level3Val = ""
                  that.showLevel3 = true
                }
            })
           break
         case '2':
           // 图文
           //  this.level3 = this.tuwenCategorys.lists[value].children
           var index = 0
           this.tuwenCategorys.lists.forEach(function(item,idx){
             if(item.value==value){
               index = idx
             }
           })
           this.level3 = this.tuwenCategorys.lists[index].children
           this.level3Val = ""
           this.showLevel3 = true
           break
         case '4':
            // 预约
            var index = 0
            this.formCategorys.lists.forEach(function(item,idx){
              if(item.value==value){
                index = idx
              }
            })
            wx.request({
                url: this.$root.apiServer+ this.$root.appid +'/basic/plugin/form/paging',
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                data: {
                  categoryId: value,
                  status: 1,
                  pageNum: 1,
                  pageSize: 10
                },
                success (res) {
                  var data = res.data.pagination.list.filter(item => {
                      return item.isOpen
                  })//过滤未上架
                  that.formCategorys.lists[index].children.lists=[]//解决切换是数据重复拷贝
                  data.forEach(function(item,idx){

                    that.formCategorys.lists[index].children.lists.push({value:item.id, label: item.title})/*item.uuid*/
                  })
                  that.level3 = that.formCategorys.lists[index].children
                  that.level3Val = ""
                  that.showLevel3 = true
                }
            })
           break
         case '5':
           // 服务
           var index = 0
           this.serviceCategorys.lists.forEach(function(item,idx){
             if(item.value==value){
               index = idx
             }
           })
           this.level3 = this.serviceCategorys.lists[index].children
           this.level3Val = ""
           this.showLevel3 = true
           break
         default:
           break
       }
     },
     changeLevel3 (value) {
       if(this.level1Val=="1"){
         value = '../goods/goods' + '?id=' + value
       }
       if(this.level1Val=="2"){
         value = '../graphic/graphic' + '?id=' + value
       }
       if(this.level1Val=="4"){
         value =  '../course_order/course_order' + '?id=' + value
       }
       if(this.level1Val=="5"){
         value =  '../levelPagesGoods/levelPagesGoods?id='+ value
       }
       var code = this.level1Val+'*'+this.level2Val+'*'+this.level3Val
       var data = {index: this.active, value:value+'', type: 'swiperSlides', code: code}
       this.$store.commit('setKefu', data)
     }
  },
  mounted () {
    var that = this
    // 获取图文分类
    wx.request({
        url: this.$root.apiServer+this.$root.appid+'/basic/api/imagetext/select/categoryid',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success (res) {
          var result = []
          var data = res.data.category
          if(data){
            data.forEach(function(item,idx,arr){
              var object = {
                value: "",
                label: "",
                children: {
                  placeholder: '图文名称选择',
                  lists: []
                }
              }
              object.value = item.cId+''
              object.label = item.name

              var imageTextList = item.imageTextList.filter(item => {
                 return item.status == 1
             })
              item.imageTextList = imageTextList//过滤未上架

              item.imageTextList.forEach(function(child,i){
                object.children.lists.push({value:child.id+'',label:child.title})
              });
              result.push(object)
            })
            that.tuwenCategorys.lists = result
          }
        }
    })

    // 获取商品分类
    wx.request({
        url: this.$root.apiServer+this.$root.appid+'/basic/api/product/catalogs',
        method: 'GET',
        header: {
            'content-type': 'application/json'
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

    // 获取预约分类
    wx.request({
        url: this.$root.apiServer+ this.$root.appid +'/basic/plugin/form/category/list',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success (res) {
          var result = []
          var data = res.data.list
          data.forEach(function(item,idx,arr){
            var object = {
              value: "",
              label: "",
              children: {
                placeholder: '预约名称选择',
                lists: []
              }
            }
            object.value = item.id+''
            object.label = item.name
            result.push(object)

          })
          that.formCategorys.lists = result
        }
    })

    // 获取服务分类
    wx.request({
        url: this.$root.apiServer + this.$root.appid + '/basic/api/server/catalogServers',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        data:{
          perMaxNum:50
        },
        success (res) {
          var result = []
          var data = res.data.data
          if(data){
            data.forEach(function(item,idx,arr){
              var object = {
                value: "",
                label: "",
                children: {
                  placeholder: '服务名称选择',
                  lists: []
                }
              }
              object.value = item.id+''
              object.label = item.name

              var servers = item.servers.filter(item => {
                 return item.status == 1
             })
              item.servers = servers//过滤未上架

              item.servers.forEach(function(child,i){
                object.children.lists.push({value:child.id+'',label:child.name})
              });
              result.push(object)
            })
            that.serviceCategorys.lists = result
          }
        }
    })

    // 北分固定链接
    this.goshopPages =  [
      {
        'pageName': 'classlist',
        'title': '分类'
      },
      {
        'pageName': 'shopcart',
        'title': '购物车'
      },
      {
        'pageName': 'personal',
        'title': '个人中心'
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
.selectLink{
  padding-bottom: 10px;
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
    width: 80px;
    height: 80px;
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
</style>
