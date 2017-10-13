<template>
  <div>
    <el-select v-model="val1" placeholder="请选择(不选默认全部)" @change="change(0)" class="mb10">
      <el-option v-for="(item, index) in options1"
        :key="index"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="val2" placeholder="请选择(二级分类-默认全部)" @change="change(1)">
      <el-option v-for="(item, index) in options2"
        :key="index"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: ['value','name','index'],
  data() {
    return {
      val1: null,
      val2: null,
      options1: [],
      options2:[],
    }
  },
  created () {
    if(!!this.value){
      let arr = this.value.split('*')
      this.val1 = Number(arr[0])
      this.val2 = arr[1]? Number(arr[1]):null
    }
    this.requestList()
  },
  watch:{
    value() {
    }
  },
  methods: {
    change(type) {    //type为几级联动
      let  index=this.index
      let  name=this.name
      let  value =''
      if(type == 0){
        this.options2 = []
        this.val2 =''
        value = this.val1 + '*'
        this.requestList(this.val1)
      }else{
        value = this.val1 + '*' + this.val2
      }
      this.$store.commit('updateTxt',{index,name,value})
    },
    requestList(v) {
      let that = this
      wx.request({
        url: this.$root.apiServer + this.$root.appid + '/cloud/public/index.php/shop/Category/getlist',
        method: 'POST',
        data: {
          uniacid: 2, //商户id
          page_number: 1, //第几页
          categoryid: v ? v : '',
          page_size: 99
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8;'
        },
        success(res) {
          if(v){
            that.options2 = res.data.data
          }else{
            that.options1 = res.data.data
            that.val2 && that.requestList(that.val1)
          }
        }
      })
    }
  }
}
</script>

