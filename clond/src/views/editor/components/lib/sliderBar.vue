<template>
  <div class="ed-classify">
    <el-button type="primary" @click="show" class="vd-primary-color cursor">选择分类</el-button>
    <div v-show="isShow">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedList" @change="checkClassify">
        <el-checkbox class="one-level"  v-model="checked"  v-for="(item, index) in options"  :label="item" :key="index" :value="item.id">{{item.name}}
          <el-button class="unfold"  @click.native ="unfold(index)" type="text" >▼</el-button>
          <el-checkbox-group class="group2" v-model="checkedList" v-if="active==index" @change="checkClassify">
            <div v-if="options2.length==0" style="padding-left: 15px;">该分类下没有二级分类</div>
            <el-checkbox class="two-level" v-model="checked" v-else="" v-for="(item, index) in options2"  :label="item" :key="item.id" :value="item.id">{{item.name}}
              <!--<el-button class="unfold"  @click.native ="unfold3(index)" type="text" >▼</el-button>-->
              <!--<el-checkbox-group class="group2" v-model="checkedList" v-if="active3==index" @change="checkClassify">-->
                <!--<div v-if="options3.length==0" style="padding-left: 15px;">该分类下没有三级分类</div>-->
                <!--<el-checkbox class="two-level" v-model="checked" v-else="" v-for="item in options3"  :label="item" :key="item.id" :value="item.id">{{item.name}}-->
                <!--</el-checkbox>-->
              <!--</el-checkbox-group>-->
            </el-checkbox>
          </el-checkbox-group>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="sort">
      <div class="sort-txt">排序方式</div>
      <el-select class="sort-box" v-model="value3" placeholder="请选择(默认添加顺序排序)" @change="sortChange">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
  import uploader from './uploader'
  import navtor from './navtor'
  export default {
    props:[
      'value',
      'name',
      'index'
    ],
    data() {
      return {
        options: [],                  //一级分类
        options2: [],                 //二级分类
        options3: [],                 //三级分类
        checkAll: '',                 //全选
        checkedList: [],              //选中的分类数组
        isIndeterminate: true,        //全选状态
        isShow:false,                 //是否显示选择分类设置菜单
        checked:true,
        active:null,
        active3:null,
        options4: [{
          value: 'asc',
          label: '排序数值正序'
        }, {
          value: 'desc',
          label: '排序数值倒序'
        }],
        value3:''
      };
    },
    methods: {
      show(){
        this.isShow=!this.isShow
        this.checkedList=this.value.tabIds
      },
      handleCheckAllChange(event) {
        console.log(this.options)
        console.log(this.options2)
        console.log(this.options3)
        this.checkedList = event.target.checked ? this.options : [];
        this.value.tabIds = event.target.checked ? this.options : [];
        this.isIndeterminate = false;
      },
      unfold(index){
        var that=this
        this.active=index
        var id=this.options[index].id
        wx.request({
//          url:this.$root.apiServer +this.$root.appid+'/cloud/public/index.php/shop/Category/getlist',
          url:'https://manper.vdongchina.com/cloud/public/index.php/shop/Category/getlist',
          method:'POST',
          data:{
            uniacid: 2,
            page_number: 1,
            page_size: 1022,
            categoryid:id
          },
          header:{
            'content-type':'application/x-www-form-urlencoded'
          },
          success(res){
            if(res.statusCode==200&res.data.data.length){
              var resArr2=[]
              res.data.data.forEach(function(item,idx){
                resArr2.push({
                  advimg:item.advimg,
                  description:item.description,
                  id:item.id,
                  name:item.name,
                  thumb:item.thumb,
                  uniacid:item.uniacid,
                  displayorder:item.displayorder
                })
              })
              if(JSON.stringify(that.options2)!==JSON.stringify(resArr2)){
                that.options2=resArr2
              }else{}
            }
            else{
              that.options2=[]
            }
          }
        })
      },
      unfold3(index){
        var that=this
        this.active3=index
        var id=this.options2[index].id
        wx.request({
//          url:this.$root.apiServer +this.$root.appid+'/cloud/public/index.php/shop/Category/getlist',
          url:'https://manper.vdongchina.com/cloud/public/index.php/shop/Category/getlist',
          method:'POST',
          data:{
            uniacid: 2,
            page_number: 1,
            page_size: 1022,
            categoryid:id
          },
          header:{
            'content-type':'application/x-www-form-urlencoded'
          },
          success(res){
            if(res.statusCode==200&res.data.data.length){
              var resArr3=[]
              res.data.data.forEach(function(item,idx){
                resArr3.push({
                  advimg:item.advimg,
                  description:item.description,
                  id:item.id,
                  name:item.name,
                  thumb:item.thumb,
                  uniacid:item.uniacid,
                  displayorder:item.displayorder
                })
              })
              if(JSON.stringify(that.options3)!==JSON.stringify(resArr3)){
                that.options3=resArr3
              }else{}
            }
            else{
              that.options3=[]
            }
          }
        })
      },
      checkClassify(value) {
        this.checked=!this.checked
          this.value.tabIds=value
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.options.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
      },
      sortChange(value){
        switch(value){
          case'asc':
            var objList=this.value.tabIds
            objList.sort(function(a,b){
              return b.displayorder-a.displayorder
            });
          break;
          case'desc':
            var objList=this.value.tabIds
            objList.sort(function(a,b){
              return a.displayorder-b.displayorder
            });
          break;
        }
      }
    },
    created(){
      var that=this
      wx.request({
        url: 'https://manper.vdongchina.com/cloud/public/index.php/shop/Category/getlist',
        method: 'POST',
        data: {
          uniacid: 2,
          page_number: 1,
          page_size: 1022
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success (res) {
          console.log(res)
          if(res.statusCode==200&&res.data.data.length){
            var result=res.data.data
            var resArr=[]
            result.forEach(function(item,idx){
              resArr.push({
                description:item.description,
                advimg:item.advimg,
                id:item.id,
                uniacid:item.uniacid,
                name:item.name,
                thumb:item.thumb,
                displayorder:item.displayorder
              })
            })
            that.options=resArr
            if(that.value.tabIds.length==0){
              that.value.tabIds=that.options
            }
          }
        }
      })
    }
  };
</script>
<style scoped>
  .cursor{
    cursor:pointer;
  }
  .ed-classify{
    padding:15px;
  }
  .one-level{
    width: 100%;
    display: block;
    border-bottom:1px solid #ccc;
    margin-top: 5px;
  }
  .one-level:nth-child(1){
    margin-left: 15px;
  }
  .one-level:nth-last-child(1){
    border:none;
  }
  .group2{
    background-color: #fff;
    border:1px dashed #ccc;
    padding:10px 0;
  }
  .two-level:nth-child(1){
    margin-left: 15px;
  }
  .two-level{
    /*background-color: #fff;*/
    display: block;
  }
  .two-level:nth-child(1){
    margin-left: 15px;
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
  .vd-primary-color{
    width: 100%;
    background: #18ccc0;
    border: solid 1px #18ccc0;
  }
  .vd-primary-color:hover{
    background: #1be6d8;
    border: solid 1px #1be6d8;
  }
  .unfold{
    display: block;
    background-color: #F4F4F4;
    color: #E1E1E1;
    float: right;
    width:40px;
    height: 20px;
    line-height: 0px;
    font-size: 20px;
  }
  .sort{
    width:100%;
    height:45px;
    margin-left: 15px;
  }
  .sort-txt{
    display: inline-block;
    margin-top:10px;
    margin-right:10px;
  }
  .sort-box{
    display: inline-block;
    height:100px;
    margin-top:10px;
  }

</style>
