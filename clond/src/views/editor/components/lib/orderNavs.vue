<template>
  <div class="ed-pic">
    <div v-for="(item, index) in orders" class="ed-pic-li">
      <div class="ed-pic-hd ed-flex cursor" @click="edit(index)">
        <div>
          <i class="el-icon-caret-right"></i>
          <span>导航{{index+1}}</span>
        </div>
      </div>
      <div class="ed-pic-bd" v-show="active==index">
        <div class="ed-pic-box">
          <span class="txt">默认图片：</span>
          <img :src="item.url" class="thumb" ref="index">
          <uploader @upload="changePic" :index='index'></uploader>
        </div>
        <div class="ed-nav-txt">
          <label class="ed-set-label ed-set-label-c">导航文本</label>
          <el-input v-model="item.text" style= "margin-left:10px"></el-input>
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
        orders:this.value,
        active: null,
        page: ''
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
    methods:{
      changePic(a){
        let $this=this
        $this.$set($this.orders[a[1]],'url',a[0])
        // $this.$store.commit('upConfig')
      },
      edit (index) {
//        var code = this.orders[index].code
        this.active = index
      },
    },
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
  .ed-nav-txt{
    padding-bottom: 10px;
  }
</style>
