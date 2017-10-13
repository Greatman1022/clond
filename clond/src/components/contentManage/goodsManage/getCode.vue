<template>
  <div class='getcode'>
    <div class='bc_block'>
      <h2>二维码获取<button @click='toIndex'>返回上层</button></h2>
    </div>
    <div class='gc_list'>
      <ul>
        <li v-for="(item, index) in codeList">
          <div class='li_top'>
            <div class='top_l'>
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
            <img src="~assets/images/test/cm_img1.jpg">
          </div>
          <div class='li_con'>
            <img src='~assets/images/test/qrcode.jpg' />
          </div>
          <div class='li_bom clearfix'>
            <span><i class='icon_tc'><em>换绑</em></i></span>
            <span><i class='icon_download'></i></span>
          </div>
        </li>
<!--         <li>
          <div class='li_top'>
            <div class='top_l'>
              <p>商品详情一</p>
              <p>绑定商品：日本代购速抢洗...</p>
            </div>
            <img src="~assets/images/test/cm_img1.jpg">
          </div>
          <div class='li_con'>
            <img src='~assets/images/test/qrcode.jpg' />
          </div>
          <div class='li_bom clearfix'>
            <span><i class='icon_tc'></i></span>
            <span><i class='icon_download'></i></span>
          </div>
        </li>
        <li>
          <div class='li_top'>
            <div class='top_l'>
              <p>商品详情一</p>
              <p>绑定商品：日本代购速抢洗...</p>
            </div>
            <img src="~assets/images/test/cm_img1.jpg">
          </div>
          <div class='li_con'>
            <img src='~assets/images/test/qrcode.jpg' />
          </div>
          <div class='li_bom clearfix'>
            <span><i class='icon_tc'></i></span>
            <span><i class='icon_download'></i></span>
          </div>
        </li>
        <li>
          <div class='li_top'>
            <div class='top_l'>
              <p>商品详情一</p>
              <p>绑定商品：日本代购速抢洗...</p>
            </div>
            <img src="~assets/images/test/cm_img1.jpg">
          </div>
          <div class='li_con'>
            <img src='~assets/images/test/qrcode.jpg' />
          </div>
          <div class='li_bom clearfix'>
            <span><i class='icon_tc'></i></span>
            <span><i class='icon_download'></i></span>
          </div>
        </li>
        <li>
          <div class='li_top'>
            <div class='top_l'>
              <p>商品详情一</p>
              <p>绑定商品：日本代购速抢洗...</p>
            </div>
            <img src="~assets/images/test/cm_img1.jpg">
          </div>
          <div class='li_con'>
            <img src='~assets/images/test/qrcode.jpg' />
          </div>
          <div class='li_bom clearfix'>
            <span><i class='icon_tc'></i></span>
            <span><i class='icon_download'></i></span>
          </div>
        </li> -->
      </ul>
    </div>
    <div class="block pagination tr">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="getCodeList">
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: 'getcode',
  components: {
  },
  data () {
    return {
      api: 'http://localhost:3000/codeList',
      codeList: [],
      total: 0,
      gchover: false
    }
  },
  created: function () {
    this.getCodeList()
  },
  methods: {
    getCodeList: function (page) {
      this.$http.get(this.api, {
        params: {
          page: this.page
        }
      }).then((res) => {
        this.total = res.data.pages * 10
        this.codeList = res.data.data
      })
    },
    toIndex: function () {
      this.$store.dispatch('setContextUserType', 'goods')
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>

<style scoped>
.getcode{
  padding: 0 10px;
}
.bc_block{
  margin-top: 20px;
  padding: 0 10px;
}
.bc_block h2{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 24px;
  overflow: hidden;
  line-height: 30px;
}
.bc_block h2 button{
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  text-align: center;background-color: #fff;
  float: right;
  display: inline-block;
  width: 90px;
  line-height: 30px;
  color: #666;
}
.gc_list ul{
  overflow: hidden;
}
.gc_list li{
  border: 1px solid #ddd;
  border-radius: 3px;
  display: inline-block;
  margin: 0 10px 20px;
  width: 273px;
  float: left;
}
.li_top{
  padding: 9px 0;
  margin: 0 10px;
  overflow: hidden;
  border-bottom: 1px solid #e4e4e4;
}
.li_top .top_l{
  float: left;
  line-height: 27px;
  width: 180px;
}
.li_top .top_l p{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.li_top img{
  width: 52px;
  height: 52px;
  float: right;
  border: 1px solid #e4e4e4;
}
.li_con{
  padding: 15px 0;
  text-align: center;
}
.li_con img{
  width: 149px;
  height: 149px;
}
.li_bom{
  background-color: #f5f5f5;
  border-top: 1px solid #e4e4e4;
}
.li_bom span{
  display: inline-block;
  box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  width: 50%;
  float: left;
  text-align: center;
  line-height: 44px;
}
.li_bom span+span{
  border-left: 1px solid #e4e4e4;
}
.li_bom span i{
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: -4px;
  position: relative;
}
.li_bom span i em{
  position: absolute;
  top: -40px;
  left: 50%;
  margin-left: -32px;
  background-color: #333;
  width: 63px;
  line-height: 35px;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  display: none;
}
.li_bom span i:hover em{
  display: inline-block;
}
.icon_tc{
  background: url(~assets/images/icon/icon_tc.png) 100% no-repeat;
}
.icon_tc:hover{
  background: url(~assets/images/icon/icon_tchover.png) 100% no-repeat;
}
.icon_download{
  background: url(~assets/images/icon/icon_download.png) 100% no-repeat;
}
.icon_download:hover{
  background: url(~assets/images/icon/icon_downloadhover.png) 100% no-repeat;
}
.getcode .paging{
  margin: 0 10px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}
</style>
