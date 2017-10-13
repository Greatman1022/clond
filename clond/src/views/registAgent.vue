<template>
  <div id='registAgent'>
    <div class='registAgent'>
      <div class="pd_width frameWidth">
        <div id="wrap" class="hd">
            <ul class="main-tabs">
              <li v-for='(tab,index) in tabs'
              :class='{"on":currentIndex==index}'
              @click='selectTab(index)'
              >{{tab}}<span class="cor"></span></li>
            </ul>
        </div>
        <transition name="component-fade" mode="out-in">
          <div class="myApp frameWidth">
            <table class="mplist">
              <p>
                <router-link to="/registSteps/1" class="registBtn"><span class="icon_regist"></span>注册小程序/公众号</router-link>
                <a href="https://pay.weixin.qq.com/index.php/home/login?return_url=%2F" target="_blank" class="jumpWx">注册微信商户号</a>
              </p>
              <tr v-for="app in appList">
                <td><img :src="app.head_image_url" alt=""></td>
                <td class="cl2">
                  {{ app.account_type_txt }}名称：{{ app.nick_name}}<br>
                  <div class="tag">{{ app.account_type_txt }}</div>
                </td>
                <td class="cl3">
                  {{ app.annual_review_begin_time }}<br>
                  {{ app.annual_review_end_time }}<br>
                </td>
                <td class="cl4">
                  <span class="appid">APPID:{{ app.appid }}</span><a class="zt" :class="{'active': app.status < 1}" @click="jump(app.status, app.appid)">{{ app.statusTxt }}</a>
                </td>
                <td>
                  <button type="button" @click="set(app.appid, app.status)" name="set" :class="{'avtive': app.status === 2}">设置</button>
                </td>
              </tr>
            </table>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../fetch/api.js'
export default {
  name: 'registAgent',
  data () {
    return {
      tabs: [
        '全部帐号',
        '小程序帐号',
        '订阅号帐号',
        '服务号帐号'
      ],
      currentIndex: 0,
      appList: []
    }
  },
  methods: {
    selectTab: function (index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.getList()
          break;
        case 1:
          api.getAppList().then(res => {
            let arr = []
            Object.keys(res.pagination.items).forEach(key => {
              if (res.pagination.items[key].account_type === 3) {
               arr.push(res.pagination.items[key])
              }
            })
            this.appList = arr
          })
          break;
        case 2:
          api.getAppList().then(res => {
            let arr = []
            Object.keys(res.pagination.items).forEach(key => {
              if (res.pagination.items[key].account_type === 1) {
               arr.push(res.pagination.items[key])
              }
            })
            this.appList = arr
          })
          break;
        case 3:
          api.getAppList().then(res => {
            let arr = []
            Object.keys(res.pagination.items).forEach(key => {
              if (res.pagination.items[key].account_type === 2) {
               arr.push(res.pagination.items[key])
              }
            })
            this.appList = arr
          })
          break;
      }
    },
    jump (status, appid) {
      switch (true) {
        case status < 0:
          this.$store.dispatch('storeAppid', {appid})
          this.$router.push({path:'/registSteps/2'})
          break;
        case status == 0:
          api.getOrderByAppid({appid: appid}).then(res => {
            if (res.success) {
              let order_id = res.order.order_id
              this.$store.dispatch('storeOrderid', {order_id})
              this.$router.push({path: '/registSteps/3'})
            }
          }).catch(err => {
            console.log(err)
          })
          break;
        case status > 0:
          break;
      }
    },
    set(appid, status) {
      if (status == 2) {
        this.$store.dispatch('storeAppid', {appid})
        this.$router.push({path: '/appSet'})
      }
    },
    getList () {
      api.getAppList().then(res => {
        let arr = res.pagination.items
        Object.keys(arr).forEach(key => {
       })
        this.appList = arr
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>
*{box-sizing:border-box;}
.registAgent{
  padding: 20px 0 30px;
}
table.mplist{
  overflow: hidden;
}
.registBtn{
  width: 165px;
  height: 30px;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  line-height: 30px;
}
/*span.icon_regist{
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url(~assets/images/icon/icon_type.png) 15px center no-repeat;
}*/
a.jumpWx{
  text-decoration: underline;
  padding-left: 15px;
  color: #888888;
}
a.zt{
  color: #888888;
  cursor: not-allowed;
}
a.zt.active{
  color: #cd0000;
  text-decoration: underline;
  cursor: pointer;
}
.myApp{
  padding: 0 20px 30px;
}
.mplist tr{
  overflow:hidden;
  float:left;
  width:1160px;
  height:110px;
  position:relative;
  border-bottom: 1px dashed #d6d6d6;
}
.mplist button{
  height: 32px;
  width: 60px;
  border-radius: 2px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  margin-left: 30px;
}
.mplist button{
  background: #d6d6d6;
  cursor: not-allowed;
}
.mplist button.avtive{
  background: #1accc1;
  cursor: pointer;
}
.mplist tr td img{
  display:block;
  width:80px;
  height:80px;
  margin: 15px;
  border-radius: 100%;
  border: 1px solid #d6d6d6;
}
div.tag{
  height: 24px;
  width: 60px;
  border: 1px solid #d6d6d6;
  border-radius: 2px;
  text-align: center;
  line-height: 24px;
  margin-top: 5px;
}
span.appid{
  margin-right: 30px;
  background-color: #b9f0ec;
  color: #888888;
}
td.cl2{
  width: 25%;
  text-align: left;
}
td.cl3{
  width: 22%;
  color:#888888;
  text-align: left;
}
td.cl4{
  width: 35%;
  text-align: right;
}
</style>
