<template>
  <div id="acmanage" class='acmanage'>
    <div class='dateblock'>
      <span v-if="secondShow && isSecondAgent">选择二级代理商：</span>
      <el-select v-model="sagentId" placeholder="请选择" @change="serachKeyword" v-if="secondShow && isSecondAgent">
        <el-option class="amdate" v-for="item in secondAgentList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <v-playvideo v-if="secondShow && isSecondAgent" srcUrl="http://assets.vdongchina.com/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%BA%8C%E7%BA%A7%E4%BB%A3%E7%90%86%E5%95%86.mp4" playText="如何开设二级代理并分配账号
"></v-playvideo>
      <div class='am_button' v-if="secondShow && isSecondAgent">
        <button @click="agentDialogVisible = true">+ 代理商账户开设</button>
      </div>
      <el-input class='am_search' placeholder="搜索姓名或手机号" icon="search" v-model="keyword" @change="serachKeyword" @key.enter="serachKeyword" :on-icon-click="serachKeyword">
      </el-input>
    </div>
    <div class="sa-table am_table">
      <table class="acTable" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>初始账号</th>
            <th>修改后账号</th>
            <th>开设时间</th>
            <!-- <th>交付时间</th> -->
            <th v-if="secondShow">所属二级代理商</th>
            <!-- <th>激活状态</th> -->
            <!-- <th>激活日期</th> -->
            <th>绑定APPID</th>
            <th>使用模板</th>
            <th class="tl">操作</th>
          </tr>
        </thead>
        <tbody v-if='agentSubAccount.list && agentSubAccount.list.length'>
          <tr v-for='(item, index) in agentSubAccount.list' :key="item.id">
            <td>
              {{item.username}}
            </td>
            <td>
              {{item.usernameChanged}}
              <button class='modifyUsername' @click='modifyUsername(item, index)' v-if="secondShow"></button>
            </td>
            <td>{{ item.createTime | formatDate }}</td>
            <td v-if="secondShow"> {{ item.user && item.user.mobile || '-'}}</td>
            <!-- <td>
              <em class='blueColer' v-if="item.isActive">已激活</em>
              <em class='redColor' v-else>未激活</em>
            </td> -->
            <!-- <td>{{item.activeTime | formatDate}}</td> -->
            <td>{{item.customerApps | formatCustomAppId }}</td>
            <td>{{item.customerApps | formatCustomTempName }}</td>
            <td>
              <el-popover placement='top-start' width='78' trigger='hover' content='编辑权限'>
                <el-button slot='reference' class='edit' @click='handleEdit(item, index)'></el-button>
              </el-popover>
              <el-popover placement='top-start' width='78' trigger='hover' content='重置密码'>
                <el-button slot='reference' class='repass' @click='handleRe(item)'></el-button>
              </el-popover>
              <el-popover placement='top-start' width='78' trigger='hover' content='权限配置'>
              
                <el-button slot='reference' class='policy ' v-if="item.customerApps && item.customerApps.length > 0 && item.customerApps[0].temp.identify == 'flashbuy'" @click='handlePolicy(item)'></el-button>
              </el-popover>
              <el-popover placement='top-start' width='78' trigger='hover' content='选择代理商' v-if="secondShow && isSecondAgent">
                <el-button slot='reference' class='allocation' @click='allocationAgent(item)'></el-button>
              </el-popover>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="table-nothing">
            <td colspan="10">
              <div class="nothing-txt">没有数据</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="block pagination tc">
        <el-pagination v-if='agentSubAccount.total>0' layout="prev, pager, next" :page-size='pageSize' :current-page='agentSubAccount.page' :total='agentSubAccount.total' @current-change="getCurrentChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="重置成功" v-model="rePassDialog" size="xs" custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <p>该账号密码重置为：123456</p>
            <p class='grbyColer'>（请及时提醒用户密码已重置，尽快更改密码）</p>
          </div>
          <div class="ei_button ei_button_lg ei_mt20 txt-center">
            <button class="ei_b_sure" type="button" @click="saveRePassDialog()">确定</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="修改账号" v-model="modifyUsernameDialog" size="xs" custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <input type='text' class='input_username' v-model='usernameVal'>
          </div>
          <div class="ei_button ei_button_lg ei_mt20 txt-center">
            <button class="ei_b_sure" type="button" @click="saveUsername()">确定</button>
          </div>
        </div>
      </div>
    </el-dialog>
  
    <!-- 模块权限配置 -->
    <el-dialog title="模块权限配置" v-model="policyDialog" size="small" custom-class="dialog-theme2 policy-dialog">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix policy-list">
            <div class="policy-item clearfix" v-for="(item, index) in policyList" :key="item.id">
              <div class="pl-name">{{item.moduleName}}</div>
              <div class="pl-cont" v-for="(itm, idx) in item.modules" :key="itm.id" :class="{active: itm.active}" @click="selModule(itm.active, index, idx)">
                <img class="icon" :src="'../../static/img/' + itm.moduleImg + '_full.png'" v-if="itm.active">
                <img class="icon" :src="'../../static/img/' + itm.moduleImg + '.png'" v-else> {{itm.moduleName}}
              </div>
            </div>
          </div>
          <div class="ei_button ei_button_lg txt-center">
            <button class="ei_b_sure" type="button" @click="savePolicyDialog()">确定</button>
            <button class="ei_b_sure ei_b_cancel" type="button" @click="policyDialog = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
  
    <!-- 开设二给代理商 -->
    <el-dialog ref='dialog' v-model="agentDialogVisible" size="sm" @open="openAgentDialog">
      <div class="ui-title">
        <span>开设代理商账户</span>
      </div>
      <div class="content">
        <div class="editInfo">
          <h3>开设代理商账户只能能过手机号进行登录</h3>
          <div class="lb_error" v-show='iserror==true'>{{ errors }}
            <i></i>
          </div>
          <div class="ei_group clearfix ei_mt10">
            <span class="tr">姓名</span>
            <input type="text" v-model="agentForm.nickname" placeholder="代理商名称">
          </div>
          <div class="ei_group clearfix">
            <span class="tr">手机号</span>
            <input type="text" v-model="agentForm.mobile" placeholder="代理商手机号" :input="onlyNum('mobile')">
          </div>
          <div class="ei_group clearfix">
            <span class="tr">初始密码</span>
            <input type="password" v-model="agentForm.password" placeholder="初始密码">
          </div>
          <div class="ei_button ei_button_lg txt-center">
            <button class="ei_b_baocun ei_b_lg" type="button" @click="saveAgentDialog">确认开通</button>
          </div>
        </div>
      </div>
    </el-dialog>
  
    <el-dialog title="添加二级代理商提示" v-model="addAgentErrorDialog" size="xs" custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <p>{{ addAgentErrorMsg }}</p>
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_sure" type="button" @click="addAgentErrorDialog = false">确定</button>
          </div>
        </div>
      </div>
    </el-dialog>
  
    <el-dialog title="二级代理商选择" v-model="agentChangeVisible" size="xs" custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <span class="tr">选择</span>
            <!-- <input type="text" v-model="agentForm.nickname" placeholder="代理商名称"> -->
            <el-select class="change-agent" v-model="changeAgent" placeholder="请选择">
              <el-option class="change-agent" v-for="item in agentChangeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="ei_button ei_button_lg ei_mt20 txt-center">
            <button class="ei_b_sure" type="button" @click="saveAgentChange">确定</button>
            <button class="ei_b_sure ei_b_cancel" type="button" @click="agentChangeVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="修改子账户编辑权限" v-model="agentEditChangeVisible" size="xs" custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <span class="tr">编辑权限</span>
            <!-- <input type="text" v-model="agentForm.nickname" placeholder="代理商名称"> -->
            <el-select class="change-agent" v-model="changeAgentEdit" placeholder="请选择">
              <el-option class="change-agent" v-for="item in agentEditChangeList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="ei_button ei_button_lg ei_mt20 txt-center">
            <button class="ei_b_sure" type="button" @click="saveAgentEidtChange">确定</button>
            <button class="ei_b_sure ei_b_cancel" type="button" @click="agentEditChangeVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import api from '../../fetch/api.js'
import util from '../../assets/js/utils'
import vPlayvideo from 'components/common/playVideo'
export default {
  name: 'acmanage',
  components: {
    vPlayvideo
  },
  data () {
    return {
      rePassDialog: false,
      policyDialog: false,
      modifyUsernameDialog: false,
      usernameVal: '',
      usernameId: '',
      usernameIndex: '',
      policyList: [],
      agentDialogVisible: false,
      agentForm: {},
      iserror: false,
      errors: '',
      sagentId: '',
      addAgentErrorMsg: null,
      addAgentErrorDialog: false,
      secondAgentList: [{
        value: null,
        label: '全部'
      }],
      agentChangeVisible: false,
      agentChangeList: [],
      changeAgent: null,
      pageSize: 15,
      page: 1,
      keyword: null,
      userId: null,
      isSecondAgent: false,
      secondShow: false,
      agentEditChangeVisible: false,
      agentEditChangeList: [
        {value: 1, label: '是'},
        {value: 0, label: '否'}
      ],
      changeAgentEdit: 0
    }
  },
  computed: {
    ...mapGetters({
      agentSubAccount: 'getAgentSubAccount',
      userMess: 'getUserMess'
    })
  },
  created: function () {
    this.$store.dispatch('setAgentSubAccount', {
      id: this.userMess.id,
      keyword: null,
      page: this.page,
      pageSize: this.pageSize,
      type: this.userMess.agentType
    })
    this.getSecondAgent()
    this.getModuleList()

    if (this.userMess.agentType === 1) {
      this.isSecondAgent = true
    }
    this.getBasicShow()
  },
  methods: {
    getBasicShow () {
      api.getBasicShow().then(res => {
        if (res.success) {
          this.secondShow = res.show.show
        }
      })
    },
    getSecondAgent () {
      api.subAccountQuery({
        id: this.userMess.id,
        type: 2
      }).then(res => {
        res.pagination.items.map(item => {
          this.secondAgentList.push({ value: item.id, label: item.mobile })
          this.agentChangeList.push({ value: item.id, label: item.mobile })
        })
      })
    },
    getCurrentChange: function (page) {
      this.page = page
      this.$store.dispatch('setAgentSubAccount', {
        id: this.userMess.id,
        sagentId: this.sagentId,
        keyword: this.keyword,
        page: this.page,
        pageSize: this.pageSize,
        type: this.userMess.agentType
      })
    },
    // 获取模块
    getModuleList () {
      api.moduleList({
        identify: 'flashbuy'
      }).then(res => {
        this.policyList = res.modules[0].modules
      })
    },
    selModule (active, index, idx) {
      let _item = this.policyList[index].modules[idx]
      _item.active = !_item.active
      this.$set(this.policyList[index].modules, idx, _item)
    },
    // 重置密码
    handleRe: function (item) {
      this.rePassDialog = true
      api.agentUpdate({
        id: item.id,
        param: '修改密码',
        type: 2
      }).then(res => {
        if (res.success) {
          item.password = '123456'
        }
      })
    },
    // 编辑权限
    handleEdit (item, idx) {
      this.agentId = item.id
      this.agentEditChangeVisible = true

      this.changeAgentEdit = this.agentSubAccount.list[idx].isEdit ? 1 : 0
    },
    saveAgentEidtChange () {
      api.agentUpdateEdit({
        userId: this.agentId,
        isEdit: this.changeAgentEdit
      }).then(res => {
        if (res.success) {
          this.$message.success('修改子账户编辑权限成功')
          this.agentEditChangeVisible = false
          this.$store.dispatch('setAgentSubAccount', {
            id: this.userMess.id,
            keyword: null,
            page: this.page,
            pageSize: this.pageSize,
            type: this.userMess.agentType
          })
        } else {
          this.$message.error(res.message)
          this.agentEditChangeVisible = false
        }
      })
    },
    saveRePassDialog: function () {
      this.rePassDialog = false
    },
    modifyUsername: function (item, index) {
      this.modifyUsernameDialog = true
      this.usernameVal = item.usernameChanged
      this.usernameId = item.id
      this.usernameIndex = index
    },
    saveUsername: function () {
      this.modifyUsernameDialog = false
      api.updatesubaccount({
        id: this.usernameId,
        username: this.usernameVal
      }).then(res => {
        if (!res.success) {
          this.$message.error(res.message)
          // this.$store.dispatch('setAgentSubAccount', {
          //   id: this.userMess.id,
          //   page: this.page
          // })
        } else {
          let _item = this.agentSubAccount.list[this.usernameIndex]
          _item.usernameChanged = this.usernameVal
          this.$set(this.agentSubAccount.list, this.usernameIndex, _item)
        }
      })
    },
    // 权限配置
    handlePolicy (item) {
      this.usernameId = item.id
      this.policyDialog = true

      api.modulePermission({
        userId: this.usernameId
      }).then(result => {
        result.modulePermission = result.modulePermission ? result.modulePermission : {}
        this.policyList = this.policyList.map((item, index) => {
          item.modules = item.modules.map((itm, idx) => {
            if (result.modulePermission.mids) {
              itm.active = result.modulePermission.mids && result.modulePermission.mids.split(',').indexOf(''+itm.id) >= 0 ? true : false
            } else {
              itm.active = true
            }
            return itm
          })
          return item
        })
      })
    },
    savePolicyDialog () {
      this.policyDialog = false
      let mids = []
      this.policyList.map((item, index) => {
        item.modules.map((itm, idx) => {
          if (itm.active) {
            mids.push(itm.id)
          }
        })
      })
      api.moduleAdd({
        userId: this.usernameId,
        mids: mids.join(',')
      }).then(res => {
        if (!res.success) (
          this.$message.error('保存用户对应的权限失败')
        )
      })
    },
    // 搜索
    serachKeyword (key) {
      this.getCurrentChange(1)
    },
    saveAgentDialog: function () {
      let _agent = {
        id: this.userMess.id,
        nickname: this.agentForm.nickname,
        mobile: this.agentForm.mobile,
        password: this.agentForm.password
      }

      if (!_agent.nickname) {
        this.errors = '代理商名称不能为空!'
        this.iserror = true
      } else if (!_agent.mobile) {
        this.errors = '手机号不能为空!'
        this.iserror = true
      } else if (util.checkPhone(_agent.mobile)) {
        this.errors = '手机号格式不正确!'
        this.iserror = true
      } else if (!_agent.password) {
        this.errors = '密码不能为空!'
        this.iserror = true
      } else {

        api.createSecondAgeng(_agent).then(res => {
          this.agentDialogVisible = false
          if (res.success) {
            // this.getAgentList()
            this.$store.dispatch('setAgentSubAccount', {
              id: this.userMess.id,
              page: this.page
            })
          } else {
            this.addAgentErrorMsg = res.message
            this.addAgentErrorDialog = true
          }
        })
      }
    },
    onlyNum (key) {
      this.agentForm[key] = util.onlyNum(this.agentForm[key] ? this.agentForm[key] : '')
    },
    openAgentDialog () {
      this.agentForm = {
        nickname: '',
        mobile: '',
        password: '',
      }
      this.iserror = false
      this.errors = ''
    },

    // 更改所属二级代理商
    allocationAgent (item) {
      this.agentChangeVisible = true
      this.userId = item.id
      this.changeAgent = item.user && item.user.mobile ? item.user.mobile : null
    },
    saveAgentChange () {
      api.agentChange({
        id: this.userId,
        sagentId: this.changeAgent
      }).then(res => {
        this.agentChangeVisible = false
        if (res.success) {
          this.getCurrentChange(this.page)
        } else {
          this.$message.error('更改所属二级代理商失败')
        }
      })
    }
  },
  filters: {
    formatDate: function (val) {
      if (val) {
        let _d = new Date(val)
        return util.formatDate(_d, 'yyyy年MM月dd日')
      } else {
        return '-'
      }
    },
    formatCustomAppId (val) {
      if (val && val[0] && val[0].appid) {
        return val[0].appid
      } else {
        return '-'
      }
    },
    formatCustomTempName (val) {
      if (val && val[0] && val[0].temp && val[0].temp.name) {
        return val[0].temp.name
      } else {
        return '-'
      }
    }
  }
}
</script>

<style scoped>
.am_table {
  padding: 0 20px;
}

.acTable {
  margin: 0 auto;
  width: 100%;
}

.acTable tr {
  line-height: 50px;
}

.acTable tr:hover {
  background: #f6fdfd;
}

.acTable thead tr:first-child {
  background: #f7f7f7;
}

.acTable td,
.acTable th {
  text-align: center;
  border-bottom: #e6e6e6 1px solid;
  height: 49px;
  color: #666;
  font-size: 14px;
  font-weight: normal;
}

.acTable button {
  padding: 0;
  display: inline-block;
  border: none;
  margin-right: 8px;
}

.acTable button.modifyUsername {
  width: 12px;
  height: 13px;
  vertical-align: -2px;
  background: url(~assets/images/icon/icon_edittout.png) no-repeat;
  background-size: 12px 13px;
}

.acTable button.modifyUsername:hover {
  background: url(~assets/images/icon/icon_editton.png) no-repeat;
  background-size: 12px 13px;
}

.acTable button.repass {
  width: 16px;
  height: 18px;
  vertical-align: middle;
  background: url(~assets/images/icon/i_resetpass.png) 100% no-repeat;
}

.acTable button.repass:hover {
  background: url(~assets/images/icon/i_resetpass_full.png) 100% no-repeat;
}

.acTable button.policy {
  width: 16px;
  height: 18px;
  vertical-align: middle;
  background: url(~assets/images/icon/i_key.png) 100% no-repeat;
}

.acTable button.policy:hover {
  background: url(~assets/images/icon/i_key_full.png) 100% no-repeat;
}

.acTable button.allocation {
  width: 16px;
  height: 18px;
  vertical-align: middle;
  background: url(~assets/images/icon/i_add.png) 100% no-repeat;
}

.acTable button.allocation:hover {
  background: url(~assets/images/icon/i_add_full.png) 100% no-repeat;
}
.acTable button.edit {
  width: 16px;
  height: 18px;
  vertical-align: middle;
  background: url(~assets/images/icon/icon_pagemag.png) 100% no-repeat;
}

.acTable button.edit:hover {
  background: url(~assets/images/icon/icon_pagemaghover.png) 100% no-repeat;
}

.input_username {
  width: 100%;
}

.acmanage .el-dialog__body {
  padding-left: 30px !important;
}

.ei_button .ei_b_sure {
  margin-left: 0;
  margin-right: 15px;
}

.ei_button .ei_b_cancel {
  background-color: #fff;
  color: #999;
  border: 1px solid #d6d6d6;
}

.policy-list {
  padding: 30px 30px 0;
  margin-top: 0;
  max-height: 400px;
  overflow-y: auto;
}

.policy-list .policy-item {
  margin-bottom: 20px;
}

.pl-name {
  font-size: 16px;
  margin-bottom: 10px;
}

.policy-list .pl-cont .icon {
  width: 16px;
  height: 14px;
}

.policy-list .pl-cont {
  cursor: pointer;
  overflow: hidden;
  padding: 10px 16px;
  border: 1px solid #d6d6d6;
  height: 46px;
  box-sizing: border-box;
  border-radius: 4px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}






/* .ei_button {
  margin: 10px 30px 0;
  border-top: 1px solid #d6d6d6;
  padding-top: 15px;
} */

.pl-cont.active {
  border: 1px solid #18ccc0;
  color: #18ccc0;
  position: relative
}

.pl-cont.active:after {
  content: '';
  background-image: url('/static/img/bingo.png');
  width: 15px;
  height: 14px;
  right: 0;
  top: 0;
  position: absolute;
}

.dateblock {
  margin-bottom: 10px;
  overflow: hidden;
  padding: 0 20px;
}

.am_button {
  display: inline-block;
  float: right;
}

.am_search {
  float: right;
}

.am-switch {
  transform: scale(.76);
  vertical-align: middle;
  margin-top: 4px;
}

.am_button button {
  background-color: #18ccc0;
  line-height: 32px;
  color: #fff;
  border-radius: 3px;
  width: 135px;
  text-align: center;
  margin-left: 20px;
}

.txt-center {
  text-align: center;
}

.ei_button.txt-center .ei_b_baocun,
.ei_button.txt-center .ei_b_sure,
.ei_button.txt-center .ei_b_quxiao {
  float: inherit;
}
</style>
