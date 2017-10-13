<template>
  <div class="selectLink">
    <el-select v-model="level1Val" placeholder="请选择" @change="changeType">
      <el-option v-for="item in level1" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="level2Val" :placeholder="level2.placeholder" v-if="showLevel2 && level1Val==0" @change="changeLevel2">
      <el-option v-for="item in level2.lists" :key="item.pageName" :label="item.title" :value="item.pageName" v-if="item.pageName !='goods'">
      </el-option>
      </el-option>
    </el-select>
    <el-select v-model="level2Val" :placeholder="level2.placeholder" v-if="showLevel2 && level1Val!==3 && level1Val!='' && level1Val!=0" @change="changeLevel2">
      <el-option v-for="item in level2.lists" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="level3Val" :placeholder="level3.placeholder" @change="changeLevel3" v-if="showLevel3">
      <el-option v-for="item in level3.lists" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: ['value', 'index'],
  data() {
    return {
      sliders: this.value,
      page: '',
      active: 1,
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
      },{
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
      isFirst: true,
      hasCode: '',
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
      goshopPages: []
    }
  },
  computed: {
    pages() {
      return this.$store.state.newApps
    },
    coms() {
      return this.$store.state.Coms
    },
    curPage() {
      return this.$store.state.curPage
    },
    cindex() {   //组件index
      return this.$store.state.cindex
    },
    freeCindex() {
      return this.$store.state.freeCindex
    }
  },
  // created() {

  // },
  watch: {
    freeCindex(val) {
      this.isFirst = true
      this.panle()
    },
    cindex(val) {
      this.isFirst = true
      this.panle()
    },
    level3Val(val) {
    }
  },
  methods: {
    getPageName(str) {
      var arr = str.split('/')
      return arr[1]
    },
    panle() {
      var that = this
      var index = 0
      var code = ''
      var pages = this.pages
      var page_str = ''
      var pageName = ''

      if (typeof this.freeCindex == 'number') {

        if (this.coms[this.cindex].children[this.freeCindex].items.currentTo != undefined && this.coms[this.cindex].children[this.freeCindex].items.currentToNew.code == "") {
          this.level1Val = "1"
          page_str = this.coms[this.cindex].children[this.freeCindex].items.currentTo
          this.coms[this.cindex].children[this.freeCindex].items.currentToNew.to=this.coms[this.cindex].children[this.freeCindex].items.currentTo
          pageName = page_str ? this.getPageName(page_str) : page_str

          for (var i = 0; i < pages.length; i++) {
            if (pages[i]['pageName'] == pageName) {
              this.level2Val = pages[i].title
              break
            }
          }
        } else {
          code = this.coms[this.cindex].children[this.freeCindex].items.currentToNew.code;
          this.level1Val = code.split('*')[0] ? code.split('*')[0] + '' : ''
          this.level2Val = code.split('*')[1] ? code.split('*')[1] + '' : ''
          this.level3Val = code.split('*')[2] ? code.split('*')[2] + '' : ''
        }
      } else {

        if (this.coms[this.cindex].items.currentTo != undefined && this.coms[this.cindex].items.currentToNew.code == "") {
          this.level1Val = "1"
          page_str = this.coms[this.cindex].items.currentTo
          this.coms[this.cindex].items.currentToNew.to=this.coms[this.cindex].items.currentTo
          pageName = page_str ? this.getPageName(page_str) : page_str

          for (var i = 0; i < pages.length; i++) {
            if (pages[i]['pageName'] == pageName) {
              this.level2Val = pages[i].title
              break
            }
          }
        } else {
          code = this.coms[this.cindex].items.currentToNew.code;
          this.level1Val = code.split('*')[0] ? code.split('*')[0] + '' : ''
          this.level2Val = code.split('*')[1] ? code.split('*')[1] + '' : ''
          this.level3Val = code.split('*')[2] ? code.split('*')[2] + '' : ''
        }
      }
      this.hasCode = code
      if (this.level1Val == '0') {
        this.level2 = { placeholder: '页面选择', lists: this.pages.concat([{ 'pageName': 'car', 'title': '购物车' }]) }
      }
      if (this.sampleAppid == "goshop") {
        this.level2 = { placeholder: '页面选择', lists: this.pages.concat(this.goshopPages) }
      }
      if (this.level2Val == "") {
        this.showLevel2 = false
      } else {
        if (this.level1Val == '1') {
          this.level2 = this.goodsCategorys
        }
        if (this.level1Val == '2') {
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
      if (this.level3Val == "") {
        this.showLevel3 = false
      } else {
        this.showLevel3 = true
        if (this.level1Val == '1') {
          var index = 0
          if (this.goodsCategorys) {

            this.goodsCategorys.lists.forEach(function(item, idx) {
              if (item.value == that.level2Val) {
                index = idx
              }
            })
            wx.request({
              url: this.$root.apiServer + this.$root.appid + '/basic/api/product/productByCatalogId',
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              data: { catalogId: that.level2Val },
              success(res) {
                var data = res.data.data.filter(item => {
                  return item.status == 1
                })//过滤未上架
                that.goodsCategorys.lists[index].children.lists = []//解决切换是数据重复拷贝
                data.forEach(function(item, idx) {
                  that.goodsCategorys.lists[index].children.lists.push({ value: item.uuid, label: item.name })/*uuid*/
                })
                that.level3 = that.goodsCategorys.lists[index].children
              }
            })
          }//控制台报错，为空不执行

        }
        if (this.level1Val == '2') {
          var sindex = 0
          this.tuwenCategorys.lists.forEach(function(item, idx) {
            if (item.value == that.level2Val) {
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
                  that.formCategorys.lists[index].children.lists = []//解决切换是数据重复拷贝
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
      }

      this.active = index
    },
    changeType(value,e) {
      if(this.isFirst && this.hasCode!==""){
        this.isFirst = false
        return
      }
      switch (value) {
        case '0':
          if (this.sampleAppid == "goshop") {
            this.level2 = { placeholder: '页面选择', lists: this.pages.concat(this.goshopPages) }
          } else {
            this.level2 = { placeholder: '页面选择', lists: this.pages.concat([{ 'pageName': 'car', 'title': '购物车' }]) }
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
          var code = this.level1Val + '*' + this.level2Val + '*' + this.level3Val
          var data = { value: 'kefu', type: 'picture', code: code }
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
          var code = this.level1Val + '*' + this.level2Val + '*' + this.level3Val
          var data = { value: value + '', type: 'picture', code: code }
          var toUrl = '../' + value + '/' + value
          data.value = toUrl
          this.$store.commit('setKefu', data)
          break
        default:
          break
      }
      this.level2Val = ""
      this.level3Val = ""
      this.showLevel3 = false
    },
    changeLevel2(value) {
      var that = this
      if (value == "") {
        return
      }
      switch (this.level1Val) {
        case '0':
          var code = this.level1Val + '*' + this.level2Val + '*' + this.level3Val
          var data = { value: value + '', type: 'picture', code: code }
          var pages = this.pages
          for (var i = 0; i < pages.length; i++) {
            if (pages[i]['pageName'] == this.page && pages[i].signGoodsId) {
              data.signGoodsId = pages[i].signGoodsId
              break
            }
          }
          var toUrl = '../' + value + '/' + value
          toUrl = data.signGoodsId ? toUrl + '?id=' + data.signGoodsId : toUrl
          data.value = toUrl
          this.$store.commit('setKefu', data)
          this.showLevel3 = false
          break;
        case '1':
          // 商品
          var index = 0
          this.goodsCategorys.lists.forEach(function(item, idx) {
            if (item.value == value) {
              index = idx
            }
          })
          wx.request({
            url: this.$root.apiServer + this.$root.appid + '/basic/api/product/productByCatalogId',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            data: { catalogId: value },
            success(res) {
              if(res.data.data!=undefined){
                    var data = res.data.data.filter(item => {
                      return item.status == 1
                    })//过滤未上架
                    that.goodsCategorys.lists[index].children.lists = []//解决切换是数据重复拷贝
                    data.forEach(function(item, idx) {
                      that.goodsCategorys.lists[index].children.lists.push({ value: item.uuid, label: item.name })
                    })
                    that.level3 = that.goodsCategorys.lists[index].children
                    // that.level3Val = ""
                    that.showLevel3 = true

              }

            }
          })

          break
        case '2':
          // 图文
          var index = 0
          this.tuwenCategorys.lists.forEach(function(item, idx) {
            if (item.value == value) {
              index = idx
            }
          })
          this.level3 = this.tuwenCategorys.lists[index].children
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
                 //that.level3Val = ""
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
          this.showLevel3 = true
          break
        default:
          break
      }
    },
    changeLevel3(value) {
      if (this.level1Val == "1") {
        value = '../goods/goods' + '?id=' + value
      }
      if (this.level1Val == "2") {
        value = '../graphic/graphic' + '?id=' + value
      }
      if(this.level1Val=="4"){
        value =  '../course_order/course_order' + '?id=' + value
      }
      if(this.level1Val=="5"){
        value =  '../levelPagesGoods/levelPagesGoods?id='+ value
      }
      var code = this.level1Val + '*' + this.level2Val + '*' + this.level3Val
      var data = { value: value + '', type: 'picture', code: code }
      this.$store.commit('setKefu', data)
    }
  },
  mounted() {
    var that = this
    var state1=false,
        state2 = false,
        state3 = false,
        state4 = false
    // 获取图文分类
    wx.request({
      url: this.$root.apiServer + this.$root.appid + '/basic/api/imagetext/select/categoryid',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var result = []
        var data = res.data.category
        if (data) {
          data.forEach(function(item, idx, arr) {
            var object = {
              value: "",
              label: "",
              children: {
                placeholder: '图文名称选择',
                lists: []
              }
            }
            object.value = item.cId + ''
            object.label = item.name
            var imageTextList = item.imageTextList.filter(item => {
              return item.status == 1
            })
            item.imageTextList = imageTextList//过滤未上架
            item.imageTextList.forEach(function(child, i) {
              object.children.lists.push({ value: child.id + '', label: child.title })
            });
            result.push(object)
          })
          that.tuwenCategorys.lists = result
          //that.panle()
        }
        state1 = true
        if(state1&&state2&&state3&&state4){
          that.panle()
        }
      }
    })
    // 获取商品分类
    wx.request({
      url: this.$root.apiServer + this.$root.appid + '/basic/api/product/catalogs',
      method: 'GET',
      header: {
        'content-type': 'application/json'
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
        //that.panle()
        state2 = true
        if(state1&&state2&&state3&&state4){
          that.panle()
        }
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
          //that.panle()
          state3 = true
          if(state1&&state2&&state3&&state4){
            that.panle()
          }
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
            //that.panle()
          }
          state4 = true
          if(state1&&state2&&state3&&state4){
            that.panle()
          }
        }
    })

    // 北分固定链接
    this.goshopPages = [
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
.selectLink {
  padding-bottom: 10px;
}

.selectLink .el-select {
  margin-bottom: 10px;
}
</style>
