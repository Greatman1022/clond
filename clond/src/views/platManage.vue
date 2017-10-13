<template>
  <div id='platmanage'>
    <div class="pd_width frameWidth">
      <div id="wrap" class="hd">
        <ul class="main-tabs">
          <li v-for='(tab, index) in tabs' :class='{"on": $route.fullPath.indexOf(tab.url) >= 0 }' :key="index"
            v-if='!getUserInfo || tab.policy.indexOf(getUserInfo.role) >= 0'>
            <router-link :to="tab.url">
              {{ tab.name }}
              <span class="cor"></span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class='platcon'>
        <transition name="component-fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'platmanage',
  data() {
    return {
      tabs: [{
        type: 'agent',
        name: '代理商管理',
        url: '/platmanage/agent',
        policy: ['ROLE_ADMIN']
      },
      {
        type: 'financial',
        name: '财务流水',
        url: '/platmanage/financial',
        policy: ['ROLE_ADMIN']
      },
      {
        type: 'temp',
        name: '小程序模版管理',
        url: '/platmanage/temp',
        policy: ['ROLE_ADMIN', 'ROLE_UI']
      }]
    }
  },
  created () {
    // console.log(this.getUserInfo)
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    },
    getUserInfo () {
      let _this = this
      let _userInfo = this.$store.state.common.userInfo
      if (_userInfo) {
        return _userInfo.data
      } else {
        api.userInfo().then(res => {
          if (res.success) {
            _this.$store.dispatch('setUserInfo', {user: res.loginUser, remember: false})
            return res.loginUser
          } else {
            _this.$router.push({name: 'login'})
          }
        }).catch((err) => {
          console.info('development...')
        })
      }
    }
  }
}
</script>

<style scoped>
#platmanage {
  padding: 20px 0 50px;
}

.platcon {
  padding-bottom: 20px;
}
</style>
