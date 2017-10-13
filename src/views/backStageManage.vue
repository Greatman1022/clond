<template>
  <div id='backstagemanage' class='backstagemanage'>
    <div class="pd_width frameWidth">
      <div id="wrap" class="hd">
          <ul class="main-tabs">
            <li v-for='(tab,index) in tabs'
            :key='index'
            @click='selectli2(index)'
            >
            <router-link :to="{name: tab.url}" >{{tab.name}}</router-link>
            <span class="cor"> </span>
            </li>
          </ul>
      </div>

      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <!-- <transition name="component-fade" mode="out-in">
        <v-baseconf v-if='currentIndex==0' :appDetail='appDetail' :appid='appid'></v-baseconf>
        <v-contentManage v-if='currentIndex==1'></v-contentManage>
        <v-dataCount v-if='currentIndex==2' :appid='appid'></v-dataCount>
      </transition> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api.js'
// import vBaseconf from 'components/backStageManage/baseconf/baseconf'
// import vVersionManage from 'components/backStageManage/versionManage/versionManage'
// import vContentManage from './contentManage'
// import vDataCount from 'components/backStageManage/dataCount/dataCount'
export default {
  name: 'backstagemanage',
  components: {
    // vBaseconf,
    // vVersionManage,
    // vContentManage,
    // vDataCount
  },
  data () {
    return {
      tabs: [
        {
          name: '基本配置',
          url: 'baseconf'
        },
        {
          name: '内容管理',
          url: 'content'
        },
        {
          name: '数据统计',
          url: 'datacount'
        }
      ],
      // currentIndex: 0,
      appid: '',
      // contentUrl: '',
      devLanguage: '',
      // beijingUrl: '',
      token: '',
      test: '',
      branch: ''
    }
  },
  computed: {
    ...mapGetters({
      appDetail: 'getAppDetail'
    })
  },
  created: function () {
    this.getToken()
    this.$store.commit('CHANGEREG', 2)
    // this.$store.commit('CHANGENAV', false)
    this.appid = this.$route.params.appid
    this.$store.dispatch('setAppDetail', {appid: this.appid})
    // let _type = window.location.pathname.split('/')[3]
    this.test = window.location.hostname.indexOf('-test') >= 0 ? '-test' : ''
    this.branch = window.location.hostname.indexOf('-test') >= 0 ? 'basic' : 'guard'
    // if (_type === '1') {
    //   this.$router.push({name: 'backstagemanage', params: { appid: this.appid, tab: localStorage.getItem('type') }})
    // }
  },
  mounted () {
    // this.currentIndex = this.$route.params.tab
  },
  methods: {
    getToken() {
      api.getToken().then(res => {
        this.token = res.token
        //console.log(this.token,this.test,this.appid)
      })
    },
    // getDevLanguage() {
    //   console.log(this.appDetail.temp.devLanguage)
    // },
    selectli2: function (index) {
      console.log(index)
      // this.getDevLanguage()
      if (index === 1) {
        if(this.appDetail.temp.devLanguage === 'java'){
          window.location.href = 'http://gw'+ this.test +'.vdongchina.com/' + this.appid + '/'+ this.branch + '/mgt/page'
        }
        if(this.appDetail.temp.devLanguage === 'php'){
          window.location.href = 'http://gw'+ this.test +'.vdongchina.com/' + this.appid + '/weichen/web/index.php?c=user&a=login&token=' + this.token
        }
      } /*else {
        localStorage.setItem('type', index)
      }*/
      // this.currentIndex = index
      // this.$store.commit('CHANGENAV', false)
      // this.$router.push({name: 'backstagemanage', params: { appid: this.appid, tab: index }})
    }
  }
}
</script>

<style scoped>
.backstagemanage{
  padding: 20px 0 80px;
}
.main-tabs li a.router-link-active {
    background: #18ccc0;
    color: #fff;
}
.main-tabs li a.router-link-active+.cor {
    width: 0;
    height: 0;
    font-size: 0;
    border-width: 6px 10px;
    border-style: solid;
    border-color: #18ccc0 transparent transparent;
    _border-color: #18ccc0 #fff #fff;
    overflow: hidden;
    position: absolute;
    left: 50%;
    margin-left: -10px;
    bottom: -12px;
    z-index: 1;
}
</style>
