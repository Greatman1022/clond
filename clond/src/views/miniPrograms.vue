<template>
  <div id='miniprograms'>
    <v-userInfomation></v-userInfomation>
    <div class='miniprograms'>
      <div class="frameWidth">
        <div id="wrap" class="hd pd_width">
            <ul class="main-tabs">
              <li v-for='(tab,index) in tabs'
              :class='{"on":currentIndex==index}'
              @click='selectTab(index)'
              >{{tab}}<span class="cor"></span></li>
            </ul>
        </div>
        <transition name="component-fade" mode="out-in">
          <div class="myProgram">
            <div class='noList' v-if='total<=0'>
              <p>暂无小程序</p>
              <p><router-link to='/' class='blueColer'>创建小程序</router-link></p>
              <div class='noimg'>
                <img src='~assets/images/no_list.png' />
              </div>
            </div>
            <ul class="mplist">
              <!-- <li class="mp_a_first"><a href="#">新建小程序</a></li> -->
              <li v-for="(item, index) in minilist">
                <img :src="item.fullCover">
                <p class='renew' v-if='item.isBuy'><a href="javascript:;" @click='renewBtn(item.appid)'>续费</a></p>
                <p class='buy' v-if='!item.isBuy'><a href="javascript:;" @click='buyBtn(item.appid)'>立即购买</a></p>
                <i class="mp_a_dfk" v-if="item.type == 1"></i>
                <div class="mp_a_edit">
                  <button class='edit' @click='toEditor(item.appid)'>页面编辑</button>
                  <button class='manage'
                    :disabled='!item.isBuy || item.isOverdue'
                    :class='{"nomanage":!item.isBuy}'
                    @click='conmanage(item.appid)'>
                    内容管理
                  </button>
                  <span v-if='!item.isOverdue && item.validityTime'>{{ item.validityTime }}到期</span>
                  <span v-if='item.isOverdue' class='beover'>已过期，请马上续费</span>
                </div>
              </li>
            </ul>
            <div class="block pagination tc">
              <el-pagination
                v-if='total>0'
                layout="prev, pager, next"
                :page-size='pageSize'
                :current-page='pageNum'
                :total='total'
                @current-change="getCurrentChange">
              </el-pagination>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vUserInfomation from 'components/common/userInfomation'
import api from '../fetch/api.js'
export default {
  name: 'miniprograms',
  components: {
    vUserInfomation
  },
  data () {
    return {
      tabs: [
        '我的小程序',
        '已购买',
        '待付款'
      ],
      currentIndex: 0,
      isBuy: '',
      tab: 0
    }
  },
  computed: {
    ...mapGetters({
      minilist: 'getMiniList',
      total: 'getMiniTotal',
      pageSize: 'getMiniPageSize',
      pageNum: 'getMiniPageNum',
      userMess: 'getUserMess'
    })
  },
  created: function () {
    // this.$store.commit('CHANGENAV', true)
    this.$store.commit('CHANGEREG', 1)
    this.$store.dispatch('setMiniList', {pageSize: 15})
  },
  methods: {
    buyBtn (appid) {
      api.payManner().then(res => {
        // console.log(res.payManner)
        if(res.payManner === 'money') {
          this.$router.push({name: 'pay', params: { appid: appid }})
          // console.log('请用支付宝支付')
          this.$store.commit('GETAGENTPAY', false)
        }
        if(res.payManner === 'deduct') {
          this.$router.push({name: 'pay', params: { appid: appid }})
          this.$store.commit('GETAGENTPAY', true)
        }
      })
    },
    renewBtn (appid) {
      this.$router.push({name: 'pay', params: { appid: appid }})
      this.$store.commit('GETAGENTPAY', false)
    },
    conmanage (appid) {
      this.$router.push({name: 'backstagemanage', params: { appid: appid }})
    },
    toEditor (appid) {
      this.$router.push({name: 'editor', params: { appid: appid }})
    },
    selectTab: function (index) {
      this.currentIndex = index
      if (index === 0) {
        this.isBuy = ''
        this.$store.dispatch('setMiniList', {pageSize: 15})
      } else if (index === 1) {
        this.isBuy = true
        this.$store.dispatch('setMiniList', {isBuy: this.isBuy, pageSize: 15})
      } else {
        this.isBuy = false
        this.$store.dispatch('setMiniList', {isBuy: this.isBuy, pageSize: 15})
      }
    },
    getCurrentChange: function (page) {
      this.$store.dispatch('setMiniList', {isBuy: this.isBuy, page: page, pageSize: 15})
    }
  }
}
</script>

<style scoped>
.miniprograms{
  padding: 20px 0 80px;
}
ul.mplist{
  width: 1190px;
  padding:0px 5px;
  overflow: hidden;
}
ul.mplist li{
  overflow:hidden;
  float:left;
  width:208px;
  height:250px;
  margin:0 15px 40px 15px;
  position:relative;
  background-color: #fff;
  box-shadow: 0 0 8px #d7d9da;
}
ul.mplist li p{
  color:#333;
  text-align:center;
  height:42px;
  line-height:42px;
  width:208px;
  border-top:0;
  overflow: hidden;
}
ul.mplist li p a{
  width:100%;
  height:100%;
  display: block;
  float: left;
}
ul.mplist li p.renew a{
  color:#333;
  text-indent: 10px;
  background:url(~assets/images/icon/renew.png) 75px center no-repeat;
}
ul.mplist li p.buy a{
  color:#fff;
  background-color: #18ccc0;
}
ul.mplist li p.renew a:hover{
  color:#18ccc0;
}
ul.mplist li img{
  display:block;
  width:208px;
  height:208px;
}
ul.mplist li i{
  display:block;
  width:81px;
  height:49px;
  right:0;
  top:0;
  position:absolute;
  z-index:30;
}
.mp_a_dfk{
  background:url(~assets/images/icon/dfk.png) center center no-repeat;
}
.mp_a_ygm{
  background:url(~assets/images/icon/ygm.png) center center no-repeat;
}
.myProgram ul li:hover div.mp_a_edit{
  opacity:1;
}
.mp_a_edit{
  position:absolute;
  background:rgba(0,0,0,0.6);
  width:100%;
  height:158px;
  left:0;
  top:0;
  padding-top: 50px;
  transition:all 0.5s;
  opacity:0;
  filter:alpha(opacity:0);
}
.mp_a_edit button{
  margin: 0 auto;
  color:#fff;
  border-radius: 3px;
  display: block;
  border: 1px solid #fff;
  width: 142px;
  line-height: 35px;
  text-indent: 19px;
}
.mp_a_edit button:hover{
  color: #25413d;
  border-color: #18ccc0;
}
.mp_a_edit button.edit{
  background:url(~assets/images/icon/icon_editm.png) 28px no-repeat;
}
.mp_a_edit button.edit:hover{
  background:url(~assets/images/icon/icon_editmhover.png) #18ccc0 28px no-repeat;
}
.mp_a_edit button.manage{
  background:url(~assets/images/icon/icon_mana.png) 28px no-repeat;
  margin-top: 20px;
}
.mp_a_edit button.manage:hover{
  background:url(~assets/images/icon/icon_manahover.png) #18ccc0 28px no-repeat;
}
.mp_a_edit button.nomanage{
  border-color: #a1a1a1;
  background-color: #a1a1a1;
  cursor: default;
}
.mp_a_edit button.nomanage:hover{
  background:url(~assets/images/icon/icon_mana.png) 28px no-repeat;
  border-color: #a1a1a1;
  background-color: #a1a1a1;
  color: #fff;
}
.mp_a_edit span{
  width:100%;
  display:block;
  background:url(~assets/images/icon/time.png) 25px no-repeat;
  height:50px;
  line-height:50px;
  color:#fff;
  text-indent: 45px;
  margin-top: 15px;
  font-size: 13px;
}
.mp_a_edit span.beover{
  background:url(~assets/images/icon/timed.png) 25px no-repeat;
}
.noList{
  text-align: center;
  padding-top: 65px;
  line-height: 25px;
}
.noList .noimg{
  text-indent: 20px;
  margin-top: 30px;
}
.main-tabs{
  margin-bottom: 40px!important;
}
</style>
