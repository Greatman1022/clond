import Vue from 'vue'
import Router from 'vue-router'
// import NewMake from '@/views/newMake'
// import Miniprograms from '@/views/miniPrograms'
// import Localfacilitator from '@/views/localFacilitator'
// import Productpre from '@/views/productPre'
// import PersonalCenter from '@/views/personalCenter'

// import RegistAgent from '@/views/registAgent'
// import RegistSteps from '@/views/registSteps'
// import AppSet from '@/views/appSet'

// import AgentCenter from '@/views/agentCenter'
// import Login from '@/views/login'
// import Editor from '@/views/editor/Index.vue'
// import Editor from '@/views/editor/App.vue'

/* 后台管理页面 */
// import BackStageManage from '@/views/backStageManage'

/* 平台管理页面 */
// import PlatManage from '@/views/platManage'

// import Pay from '@/components/contentManage/pay.vue'

// import Paysuccess from '@/components/contentManage/paysuccess.vue'
// import Iagent from '@/components/common/iagent.vue'

const agentManage = () =>
  import('@/components/platManage/agentmanage')
const agentManageSub = () =>
  import('@/components/platManage/subAccount')
const financialManage = () =>
  import('@/components/platManage/financialFlow')
const tempManage = () =>
  import('@/components/platManage/templatemanage')
const tempManageAdd = () =>
  import('@/components/platManage/createtemplates')

Vue.use(Router)
import store from '../store/index'
// import * as types from '../types'
import api from '../fetch/api'

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/editor/:appid',
    name: 'editor',
      // component: Editor,
    component: function (resolve) {
      require(['@/views/editor/App.vue'], resolve)
    }
  },
  {
    path: '/preview/:appid',
    name: 'preview',
      // component: Preview,
    component: function (resolve) {
      require(['@/views/editor/preview.vue'], resolve)
    }
  },
  {
    path: '/exception',
    name: 'exception',
      // component: Productpre
    component: function (resolve) {
      require(['@/components/common/exception.vue'], resolve)
    }
  },
  {
    path: '/newmake',
    name: 'newmake',
      // component: NewMake
    component: function (resolve) {
      require(['@/views/newMake.vue'], resolve)
    }
  },
  {
    path: '/miniprograms',
    name: 'miniprograms',
      // component: Miniprograms
    component: function (resolve) {
      require(['@/views/miniPrograms.vue'], resolve)
    }
  },
  {
    path: '/localfacilitator',
    name: 'localfacilitator',
      // component: Localfacilitator
    component: function (resolve) {
      require(['@/views/localFacilitator.vue'], resolve)
    }
  },
  {
    path: '/productpre',
    name: 'productpre',
      // component: Productpre
    component: function (resolve) {
      require(['@/views/productPre.vue'], resolve)
    }
  },
  {
    path: '/personalcenter',
    name: 'personalcenter',
      // component: PersonalCenter
    component: function (resolve) {
      require(['@/views/personalCenter.vue'], resolve)
    }
  },
  {
    path: '/backstagemanage/:appid',
    name: 'backstagemanage',
    redirect: '/backstagemanage/:appid/baseconf',
      // component: BackStageManage
    component: function (resolve) {
      require(['@/views/backStageManage.vue'], resolve)
    },
    children: [{
      path: 'baseconf',
      name: 'baseconf',
      redirect: 'baseconf/applet',
      component: function (resolve) {
        require(['@/components/backStageManage/baseconf/baseconf.vue'], resolve)
      },
      children: [{
        path: 'applet',
        name: 'applet',
        component: function (resolve) {
          require(['@/components/backStageManage/baseconf/applet.vue'], resolve)
        }
      },
      {
        path: 'public',
        name: 'public',
        component: function (resolve) {
          require(['@/components/backStageManage/baseconf/public.vue'], resolve)
        }
      },
      {
        path: 'server',
        name: 'server',
        component: function (resolve) {
          require(['@/components/backStageManage/baseconf/server.vue'], resolve)
        }
      }
      ]
    },
    {
      path: 'content',
      name: 'content',
      component: function (resolve) {
        require(['@/views/contentManage.vue'], resolve)
      }
    },
    {
      path: 'datacount',
      name: 'datacount',
      component: function (resolve) {
        require(['@/components/backStageManage/dataCount/dataCount.vue'], resolve)
      }
    }
    ]
  },
  {
    path: '/platmanage',
    name: 'platManage',
      // component: PlatManage
    redirect: '/platmanage/agent',
    component: function (resolve) {
      require(['@/views/platManage.vue'], resolve)
    },
    children: [{
      path: 'agent',
      component: agentManage,
      name: 'platAgentManage',
      children: [{
        path: 'sub',
        component: agentManageSub,
        name: 'platAgentManageSub'
      }]
    },
    {
      path: 'financial',
      component: financialManage,
      name: 'platFinancialManage'
    },
    {
      path: 'temp',
      component: tempManage,
      name: 'platTempManage',
      children: [{
        path: 'add',
        component: tempManageAdd,
        name: 'platTempManageAdd'
      },
      {
        path: 'edit',
        component: tempManageAdd,
        name: 'platTempManageEdit'
      }
      ]
    }
    ]
  },
  {
    path: '/pay/:appid',
    name: 'pay',
      // component: Pay
    component: function (resolve) {
      require(['@/components/contentManage/pay.vue'], resolve)
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
      // component: Paysuccess
    component: function (resolve) {
      require(['@/components/contentManage/paysuccess.vue'], resolve)
    }
  },
  {
    path: '/iagent',
    name: 'iagent',
      // component: Iagent
    component: function (resolve) {
      require(['@/components/common/iagent.vue'], resolve)
    }
  },
  {
    path: '/registAgent',
    name: 'registAgent',
      // component: RegistAgent
    component: function (resolve) {
      require(['@/views/registAgent.vue'], resolve)
    }
  },
  {
    path: '/registSteps/:step',
    name: 'registSteps',
      // component: RegistSteps
    component: function (resolve) {
      require(['@/views/registSteps.vue'], resolve)
    }
  },
  {
    path: '/appSet',
    name: 'appset',
      // component: AppSet
    component: function (resolve) {
      require(['@/views/appSet.vue'], resolve)
    }
  },
  {
    path: '/',
    name: 'login',
      // component: Login
    component: function (resolve) {
      require(['@/views/login.vue'], resolve)
    }
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.indexOf('backstagemanage') >= 0 || to.name.indexOf('login') >= 0) {
    store.commit('SHOWNAV', false)
  } else {
    store.commit('SHOWNAV', true)
  }

  if (to.name.indexOf('editor') >= 0 || to.name.indexOf('preview') >= 0) {
    store.dispatch('setPageType', 1)
    store.commit('CHANGENAV', false)
    next()
  } else if (to.name.indexOf('miniprograms') >= 0 || to.name.indexOf('personalcenter') >= 0) {
    store.dispatch('setPageType', 0)
    store.commit('CHANGENAV', true)
    api.userInfo().then(res => {
      if (!res.success) {
        store.commit('LOGINDIALOG', true)
        next(false)
      } else {
        next()
      }
    }).catch((err) => {
      store.commit('LOGINDIALOG', true)
      next(false)
    })
  } else {
    store.dispatch('setPageType', 0)
    store.commit('CHANGENAV', true)
    next()
  }
})

export default router
