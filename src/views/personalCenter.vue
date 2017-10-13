<template>
  <div class="personalcenter">
    <v-userInfomation></v-userInfomation>
    <!--个人用户明细-->
    <div class="personalDetails">
      <div class="pd_width frameWidth">
        <div id="wrap" class="hd">
          <ul class="main-tabs">
            <li :class='{"on":currentIndex==0}' @click='selectli(0)' v-if='userMess.role === "ROLE_APPER" || userMess.role === "ROLE_TEST"'>交易明细
              <span class="cor"></span>
            </li>
            <li :class='{"on":currentIndex==0}' @click='selectli(0)' v-if='userMess.role === "ROLE_AGENT"'>账户管理
              <span class="cor"></span>
            </li>
            <!-- <li :class='{"on":currentIndex==2}' @click='selectli(2)' v-if='agent'>客户资源<span class="cor"></span></li> -->
            <li :class='{"on":currentIndex==1}' @click='selectli(1)'>账号安全
              <span class="cor"></span>
            </li>
            <li :class='{"on":currentIndex==2}' @click='selectli(2)' v-if='secondShow && userMess.role === "ROLE_AGENT" && userMess.agentType === 1'>二级代理商
              <span class="cor"></span>
            </li>
          </ul>
        </div>
        <transition name="component-fade" mode="out-in">
          <v-pdlist v-if='(userMess.role=="ROLE_APPER" || userMess.role === "ROLE_TEST")&&currentIndex==0'></v-pdlist>
          <v-acmanage v-if='userMess.role=="ROLE_AGENT"&&currentIndex==0'></v-acmanage>
          <!-- <v-acresource v-if='currentIndex==2'></v-acresource> -->
          <v-acsafe v-if='currentIndex==1'></v-acsafe>
          <v-secondagent v-if='userMess.role=="ROLE_AGENT"&&currentIndex==2'></v-secondagent>
        </transition>
      </div>
      <!--个人用户明细-->
    </div>
  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../fetch/api.js'
import vUserInfomation from 'components/common/userInfomation'
import vPdlist from 'components/personalCenter/pdlist'
import vAcmanage from 'components/personalCenter/acmanage'
// import vAcresource from 'components/personalCenter/acresource'
import vAcsafe from 'components/personalCenter/accountsafe'
import vSecondagent from 'components/personalCenter/secondAgent'

export default {
  name: 'personalcenter',
  components: {
    vUserInfomation,
    vPdlist,
    vAcmanage,
    // vAcresource,
    vAcsafe,
    vSecondagent
  },
  data() {
    return {
      currentIndex: 0,
      secondShow: false
    }
  },
  created() {
    this.freeTrial()
    this.getBasicShow()

    //获取更新信息
		api.getUpdateMsg().then(res => {
			if (res.success) {
				let msg = res.notice;
				this.updateCon = msg.content;
				this.updateTime = msg.addtime;

				if (!this.updateCon) {
					this.dialogVisible = false;
				} else if (!localStorage.getItem("noticeLastTime") || localStorage.getItem("noticeLastTime") !== this.updateTime) {
					localStorage.setItem("noticeLastTime", this.updateTime);
					this.dialogVisible = true;
				}
			}
		}).catch((err) => {
			console.info('没有更新内容')
		})
  },
  methods: {
    freeTrial: function () {
      let _this = this
      api.userInfo().then(res => {
        if (res.success) {
          _this.$router.push({name: 'personalcenter'})
          // _this.$store.commit('CHANGENAV', true)
          _this.$store.commit('CHANGEREG', 1)
          _this.$store.commit('LOGINDIALOG', false)
        } else {
          this.$store.commit('LOGINDIALOG', true)
        }
      }).catch((err) => {
        console.info('development...')
        this.$store.commit('LOGINDIALOG', true)
      })
    },

    getBasicShow() {
      api.getBasicShow().then(res => {
        if (res.success) {
          this.secondShow = res.show.show
        }
      })
    },
    selectli: function (index) {
      this.currentIndex = index
    }
  },
  computed: {
    ...mapGetters({
      userMess: 'getUserMess'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.personalDetails {
  padding: 20px 0 80px;
}
</style>
