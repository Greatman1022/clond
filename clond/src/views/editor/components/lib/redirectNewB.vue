<template>
  <div class="selectLink">
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
    <el-select v-model="level2Val1" :placeholder="level2.placeholder" v-if="showLevel2 && level1Val!==3 && level1Val!='' && level1Val!=0" @change="changeLevel2">
      <el-option
        v-for="item in level2.lists"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: ['value', 'index', 'name'],
  data() {
    return {
      navs: this.value,
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
      level2Val1:'',
      showLevel2: false,
      level2:[],
      goodsCategorys: {
        placeholder: '商品分类选择',
        lists: []
      },
      goshopPages: []
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
  watch:{
    value(){
      this.panel()
    }
  },
  methods: {
    getPageName(str){
      var arr=str.split('/')
      return arr[1]
    },
    panel(index) {
      var that = this
      var code = this.value.code
      this.level1Val = code.split('*')[0] ? code.split('*')[0] + '' : ''
      this.level2Val1 = this.level2Val = code.split('*')[1] ?code.split('*')[1] + '': ''
      if (this.cityIdentify == "cloud_shop") {
        this.level2 = {
          placeholder: '页面选择',
          lists: this.pages.concat(this.goshopPages)
        }
      }
      if (this.level2Val == "") {
        this.showLevel2 = false
      } else {
        if (this.level1Val == '1') {
          this.level2 = this.goodsCategorys
        }
        this.showLevel2 = true
      }
      this.active = index
    },
    changeType(value) {
      // console.log(this.level1Val)
      switch (value) {
        case '0':
          if (this.cityIdentify == "cloud_shop") {
            this.level2 = {
              placeholder: '页面选择',
              lists: this.pages.concat(this.goshopPages)
            }
          }
          this.level2Val1=""
          this.showLevel2 = true
          break
        case '1':
          this.level2Val =""
          this.level2 = this.goodsCategorys
          this.showLevel2 = true
          break

        default:
          break
      }
    },
    changeLevel2(value) {
      var that = this
      if (value == "") {
        return
      }
      switch (this.level1Val) {
        case '0':
          var code = this.level1Val + '*' + this.level2Val
          var data = {
            index: this.active,
            value: value + '',
            type: 'picture',
            code: code
          }
          var pages = this.pages
          for (var i = 0; i < pages.length; i++) {
            if (pages[i]['pageName'] == this.page && pages[i].signGoodsId) {
              data.signGoodsId = pages[i].signGoodsId
              break
            }
          }
          this.$store.commit('setLink', data)
          break;
        case '1':
          // 商品
          var index = 0
          this.goodsCategorys.lists.forEach(function(item, idx) {
            if (item.value == value) {
              index = idx
            }
          })
          var title = this.goodsCategorys.lists[index].label
          value = '../classlistTwo/classlistTwo' + '?classid=' + value + '&title=' + title
          var code = this.level1Val + '*' + this.level2Val1
          var data = {
            index: this.active,
            value: value + '',
            type: 'picture',
            code: code
          }
          this.$store.commit('setKefu', data)
          break
        default:
          break
      }
    }
  },
  mounted() {
    var that = this
    // 北分固定链接
    this.goshopPages = [{
      'pageName': 'allshops1',
      'title': '全部商品'
    }, {
      'pageName': 'allshops2',
      'title': '促销商品'
    }, {
      'pageName': 'affiche',
      'title': '店铺公告'
    }]
      // 获取商品分类
    wx.request({
      url: this.$root.apiServer + this.$root.appid + '/cloud/public/index.php/shop/Category/getlist',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        uniacid: 2,
        page_number: 1,
        page_size: 99
      },
      success(res) {
        var result = []
        var data = res.data.data
        data.forEach(function(item, idx, arr) {
          var object = {
            value: "",
            label: "",
            children: {
              placeholder: '商品名称选择',
              lists: []
            }
          }
          object.value = item.id + ''
          object.label = item.name
          result.push(object)
        })
        that.goodsCategorys.lists = result
        that.panel()
      }
    })
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
