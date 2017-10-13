<template>
  <div id="agentmanage">
    <div class="am-wrap" v-if="$route.fullPath == '/platmanage/agent'">
      <div class='am_head'>
        <el-radio-group class="raido-group" v-model="isExpire" @change="getAgentList">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">只显示已到期</el-radio>
        </el-radio-group>
        <el-select v-model="pro" class='am_select' placeholder="省份" @change="aProChange">
          <el-option
            v-for="pro in aProList"
            :key='pro.id'
            :label="pro.name"
            :value="pro">
          </el-option>
        </el-select>
        <el-select v-model="city" class='am_select' placeholder="城市" @change="acProChange">
          <el-option
            v-for="city in aCityList"
            :key='city.id'
            :label="city.name"
            :value="city">
          </el-option>
        </el-select>
        <div class='am_button'>
          <button @click="agentDialogVisible = true">+ 代理商账户开设</button>
        </div>
        <el-input
          class='am_search'
          placeholder="搜索姓名和手机号"
          icon="search"
          v-model="searchTxt"
          @change="serachKeyword"
          :on-icon-click="serachKeyword">
        </el-input>
      </div>
      <div class="am_table">
        <table cellpadding="0" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>授权日期</th>
              <th>地区</th>
              <th>姓名</th>
              <th>账号总数</th>
              <th>已激活数</th>
    <!--           <th>手机号码</th> -->
              <th>账号状态</th>
              <th class="tl" width='205'>操作</th>
            </tr>
          </thead>
          <tbody v-if="agentList.length">
            <tr v-for='(item, index) in agentList' :key="item.id">
              <td>{{ item.createTime | formatDate }}</td>
              <td>{{ item.province }} - {{ item.city }}</td>
              <td>{{ item.nickname | formatName}}</td>
              <td>{{ item.allNum ? item.allNum : 0 }}</td>
              <td class="blueColer">{{ item.activeNum ? item.activeNum : 0 }}</td>
             <!--  <td>{{ item.mobile }}</td> -->
              <td>
                <em class='blueColer' v-if="item.status">正常</em>
                <em class='redColor' v-else>禁用</em>
              </td>
              <td class='tl'>
                <el-popover width="80" placement='top-start' trigger='hover' content="交付子帐号" v-if="!item.isDelivery">
                  <el-button slot='reference' class="btn-def btn_deliver" @click="deliverAccount(item.id, index)"></el-button>
                </el-popover>
                <el-popover width="80" placement='top-start' trigger='hover' :content="item.status ? '禁用账号' : '启用账号'">
                  <el-switch slot="reference" v-model="item.status" off-color="#999" on-color="#18ccc0" class="am-switch" on-text="" off-text="" @change="updateState(item.id, index)"> </el-switch>
                </el-popover>
                <el-popover width="80" placement='top-start' trigger='hover' content='重置密码'>
                  <el-button slot='reference' class="btn-def btn_resetpass" @click="resetPassword(item.id)"></el-button>
                </el-popover>
                <el-popover width="80" placement='top-start' trigger='hover' content='查看子账号'>
                    <el-button slot='reference' class="btn-def btn_subaccount" @click="gotoSubAcccountList(item.id)"></el-button>
                </el-popover>
                <el-popover width="80" placement='top-start' trigger='hover' content='开设子账号'>
                  <el-button slot='reference' class="btn-def btn_add" @click="openAddSumDialog(item.id)"></el-button>
                </el-popover>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr class="table-nothing">
              <td colspan="10">没有数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="block pagination tc">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="getAgentList">
        </el-pagination>
      </div>

      <el-dialog ref='dialog' v-model="agentDialogVisible" size="sm" @open="openAgentDialog">
        <div class="ui-title">
          <span>开设代理商账户</span>
        </div>
        <div class="content">
          <div class="editInfo">
            <h3>开设代理商账户只能能过手机号进行登录</h3>
            <div class="lb_error" v-show='iserror==true'>{{ errors }}<i></i></div>
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
            <div class="ei_group clearfix">
              <span class="tr">地区</span>
              <div class="el_address">
                <el-select v-model="agentForm.province" placeholder="请选择省" @change="provinceChange">
                  <el-option
                    v-for="item in provinceList"
                    :label="item.name"
                    :value="item"
                    :key="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="agentForm.city" placeholder="请选择市" @change="cityChange">
                  <el-option
                    v-for="item in cityList"
                    :label="item.name"
                    :value="item"
                    :key="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="agentForm.area" placeholder="请选择区">
                  <el-option
                    v-for="item in districtList"
                    :label="item.name"
                    :value="item"
                    :key="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="ei_group clearfix">
              <span class="tr">代理类型</span>
              <!-- <input type="password" v-model="agentForm.password" placeholder="初始密码"> -->
              <el-radio-group v-model="agentForm.agentType" class="agent-type-group">
                <el-radio :label="0">普通代理商</el-radio>
                <el-radio :label="1">一级代理商</el-radio>
              </el-radio-group>
            </div>
            <div class="ei_button ei_button_lg">
              <button class="ei_b_baocun ei_b_lg" type="button" @click="saveAgentDialog">确认开通</button>
            </div>
          </div>
        </div>
      </el-dialog>

      <el-dialog ref='dialog' v-model="addSumDialogVisible" size="sm">
        <div class="ui-title">
          <span>新增子账户</span>
        </div>
        <div class="content">
          <el-form class="editInfo" :model="addAccountForm" ref="addAccountForm">
            <div class="subaccount-list">
              <el-form-item
                v-for="(account, index) in addAccountForm.accounts"
                class="sa-item"
                :label="'子账户' + (index + 1)"
                :key="account.key"
                :prop="'accounts.' + index + '.value'"
                :rules="{required: true, message: '子账户名称不能为空', trigger: 'blur'}">
                <el-input v-model="account.value" placeholder="请输入子账户"></el-input>
                <el-button @click.prevent="removeSubAccount(account)" class="remove-sa btn-def" v-if="index !== 0" >+</el-button>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button @click="addSubAccount" class="btn-addsub">新增子账号</el-button>
            </el-form-item>
            <el-form-item class="error-tip ei_mt">
              {{ addSubAccountErrMsg }}
            </el-form-item>
            <div class="ei_button ei_button_lg ei_mt">
              <button class="ei_b_baocun ei_b_lg" type="button" @click="saveSubAccount('addAccountForm')">确定</button>
            </div>
          </el-form>
        </div>
      </el-dialog>

      <el-dialog
        title="重置密码提示"
        v-model="rePassDialog"
        size="xs"
        custom-class="dialog-theme2">
        <div class="content">
          <div class="editInfo">
            <div class="ei_group clearfix ei_mt10">
              
              <p v-if="resetPassOk">该账号密码重置为：123456, 只能通过手机号登录</p>
              <p class='grbyColer' v-if="resetPassOk">（请及时提醒用户密码已重置，尽快更改密码）</p>

              <p v-else>该账号密码重置失败</p>
            </div>
            <div class="ei_button ei_button_lg ei_mt20">
              <button class="ei_b_sure" type="button" @click="rePassDialog = false">确定</button>
            </div>
          </div>
        </div>
      </el-dialog>

      <el-dialog
        title="添加代理商提示"
        v-model="addAgentErrorDialog"
        size="xs"
        custom-class="dialog-theme2">
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

      <el-dialog
        title="交付信息"
        :visible.sync="deliveryDialog"
        size="xs"
        custom-class="dialog-theme2">
        <p class='tc'>交付子帐号成功</p>
        <div class="ei_button ei_button_lg ei_mt20">
          <button class="ei_b_sure" type="button" @click="deliveryDialog = false">确定</button>
        </div>
      </el-dialog>
    </div>

    <transition name="component-fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
import api from '../../fetch/api'
import util from '../../assets/js/utils'
import areadata from '../../assets/js/area_data.js'
// import vSubaccount from './subAccount'
export default {
  name: 'agentmanage',
  // components: {
  //   vSubaccount
  // },
  data () {
    return {
      agentList: [],
      provinceList: [],
      cityList: [],
      districtList: [],
      aProList: [{
        id: 0,
        name: '全部'
      }],
      aCityList: [],
      pro: '',
      city: '',
      isExpire: 1,
      agentDialogVisible: false,
      agentForm: {},
      resetPassDialogVisible: false,
      newPassword: '',
      addSumDialogVisible: false,
      addSum: '',
      total: 0,
      pageSize: 15,
      page: 1,
      searchTxt: '',
      iserror: false,
      errors: '',
      agentId: '',
      addAccountForm: {
        accounts: [{
          value: ''
        }]
      },
      rePassDialog: false,
      resetPassOk: true,
      addAgentErrorDialog: false,
      addAgentErrorMsg: '',
      deliveryDialog: false,
      addSubAccountErrMsg: null
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  created: function () {
    this.getAgentList()
    this.aProList = this.aProList.concat(areadata.area_data.pro)
  },
  methods: {
    serachKeyword(key) {
      this.getAgentList(1, key)
    },
    getAgentList: function (page = 1) {
      this.page = page
      let data = {
        province: this.pro && this.pro.name && this.pro.id !== 0 ? this.pro.name : '',
        city: this.city && this.city.name ? this.city.name : '',
        keyword: this.searchTxt,
        isExpire: this.isExpire === 2,
        page: this.page,
        pageSize: this.pageSize
      }
      api.agentList(data).then(res => {
        if (res.success) {
          this.agentList = res.pagination.items.map(item => {
            item.status = item.status ? true : false
            return item
          })
          this.total = res.pagination.total
        }
      })
    },
    aProChange: function () {
      this.city = ''
      this.aCityList = areadata.area_data.city[this.pro.id]
      this.getAgentList()
    },
    acProChange: function () {
      this.getAgentList()
    },
    // 开设子账户
    provinceChange: function () {
      this.agentForm.city = ''
      this.agentForm.area = ''
      this.cityList = areadata.area_data.city[this.agentForm.province.id]
      this.districtList = areadata.area_data.county[this.agentForm.city.id]
    },
    cityChange: function () {
      this.agentForm.area = ''
      this.districtList = areadata.area_data.county[this.agentForm.city.id]
    },
    onlyNum (key) {
      this.agentForm[key] = util.onlyNum(this.agentForm[key] ? this.agentForm[key] : '')
    },
    openAgentDialog () {
      this.agentForm = {
        nickname: '',
        mobile: '',
        password: '',
        province: '',
        city: '',
        area: '',
        agentType: 0
      }
      this.iserror = false
      this.errors = ''
      this.provinceList = areadata.area_data.pro
    },
    saveAgentDialog: function () {
      let _agent = {
        nickname: this.agentForm.nickname,
        mobile: this.agentForm.mobile,
        password: this.agentForm.password,
        province: this.agentForm.province.name,
        city: this.agentForm.city.name,
        area: this.agentForm.area.name,
        agentType: this.agentForm.agentType
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
      } else if (!_agent.province) {
        this.errors = '代理商所在省份不能为空!'
        this.iserror = true
      } else if (!_agent.city) {
        this.errors = '代理商所在城市不能为空!'
        this.iserror = true
      } else if (!_agent.area) {
        this.errors = '代理商所在区不能为空!'
        this.iserror = true
      } else {
        api.agentAdd(_agent).then(res => {
          this.agentDialogVisible = false
          if (res.success) {
            this.getAgentList()
          } else {
            this.addAgentErrorMsg = res.message
            this.addAgentErrorDialog = true
          }
        })
      }
    },
    resetPassword: function (id) {
      this.updateAgent({id: id, param: '123456', type: 2}).then(res => {
        if (res.success) {
          this.rePassDialog = true
          this.resetPassOk = true
        } else {
          this.rePassDialog = true
          this.resetPassOk = false
        }
      })
    },
    
    // 修改代理商信息
    updateState (id, index) {
      this.updateAgent({id: id, param: this.agentList[index].status ? 0 : 1, type: 1}).then(res => {
        if (res.success) {
          let _item = this.agentList[index]
          _item.status = this.agentList[index].status ? true : false
          this.$set(this.agentList, index, _item)
        }
      })
    },
    updateAgent (params) {
      return new Promise ((resolve, reject) => {
        api.agentUpdate(params).then(res => {
          resolve(res)
        })
      })
    },

    gotoSubAcccountList (agentId) {
      this.$store.dispatch('setAgentId', agentId)
      this.$router.push({name: 'platAgentManageSub'})
    },

    // 添加子账号
    openAddSumDialog : function (id) {
      this.addAccountForm = {
        accounts: [{
          value: ''
        }]
      }
      this.agentId = id
      this.addSumDialogVisible = true
    },
    addSubAccount () {
      this.addAccountForm.accounts.push({
        value: '',
        key: Date.now()
      });
    },
    removeSubAccount (item) {
      var index = this.addAccountForm.accounts.indexOf(item)
      if (index !== -1) {
        this.addAccountForm.accounts.splice(index, 1)
      }
    },
    saveSubAccount (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _accounts = this.addAccountForm.accounts.map(item => {
            return item.value
          }).join()
          api.agentSubaccountAdd({userId: this.agentId, accounts: _accounts}).then(res => {
            if (res.success) {
              this.addSumDialogVisible = false
            } else {
              this.addSubAccountErrMsg = res.message
            }
          })
        } else {
          return false
        }
      })
    },
    deliverAccount (id, index) {
      let _item = this.agentList[index]
      api.deliveryAccount({id: id}).then(res => {
        if (res.success) {
          this.deliveryDialog = true
          _item.isDelivery = true
          this.$set(this.agentList, index, _item)
        }
      })
    }
  },
  filters: {
    formatDate: function (val) {
      let _d = new Date(val)
      return util.formatDate(_d, 'yyyy-MM-dd')
    },
    fromatAccountNum (val) {
      return val || 0
    },
    formatName (val) {
      return val || '-'
    }
  }
}
</script>
<style scoped>
.raido-group{
  float: left;
  margin-right: 7px;
}
.el-select{
  float: left;
  margin-right: 7px;
}
.el-radio{
  float: left;
  line-height: 32px;
}
.el-radio+.el-radio{
  margin-right: 20px;
}
#agentmanage{
  padding: 0 20px;
}
.am_head{
  margin-bottom: 10px;
  overflow: hidden;
}
.dateblock{
  display: inline-block;
  float: left;
  margin-left: 13px;
  line-height: 32px;
}
.dateblock span i{
  background: url(~assets/images/icon/icon_date.png) no-repeat;
  display: inline-block;
  width: 13px;
  height: 15px;
  vertical-align: -2px;
}
.am_search{
  float: right;
}
.am_button{ 
  display: inline-block;
  float: right;
}
.am_button button{
  background-color: #18ccc0;
  line-height: 32px;
  color: #fff;
  border-radius: 3px;
  width: 135px;
  text-align: center;
  margin-left: 20px;
}
.am_table tr{ 
  height:50px;
}
.am_table tr:hover{ 
  background:#f6fdfd;
}
.am_table thead tr:first-child{ 
  background:#f7f7f7;
}
.am_table td,.am_table th{ 
  text-align:center; 
  border-bottom:#e6e6e6 1px solid; 
  height:49px; 
  color:#666; 
  font-size:14px;
  font-weight: normal;
}
.btn-def{
  border: none;
  padding: 0;
  display: initial;
  background-color: initial;
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-right: 5px;
  vertical-align: middle;
}
.btn_deliver{
  background: url(~assets/images/icon/i_right.png) 100% no-repeat;
}
.btn_deliver:hover{
  background: url(~assets/images/icon/i_right_full.png) 100% no-repeat;
}
.btn_add{
  background: url(~assets/images/icon/i_add.png) 100% no-repeat;
}
.btn_add:hover{
  background: url(~assets/images/icon/i_add_full.png) 100% no-repeat;
}
.btn_resetpass{
  background: url(~assets/images/icon/i_resetpass.png) 100% no-repeat;
}
.btn_resetpass:hover{
  background: url(~assets/images/icon/i_resetpass_full.png) 100% no-repeat;
}
.btn_subaccount{
  background: url(~assets/images/icon/i_search.png) 100% no-repeat;
}
.btn_subaccount:hover{
  background: url(~assets/images/icon/i_search_full.png) 100% no-repeat;
}

.table-nothing:hover,
.table-nothing:hover td{
  background-color: #fff !important;
}
.table-nothing td{
  height: 568px;
}
.lb_error{
  transition:all 0.5s; 
  height:26px; 
  line-height:26px; 
  font-size:14px; 
  color:#f00; 
  width:100%;
  text-indent:32px;
}
.lb_error i{ 
  cursor:pointer; 
  display:blcok; 
  width:16px; 
  height:26px; 
  position:absolute; 
  left:36px; 
  background:url(~assets/images/icon/error.png) center center no-repeat; 
}
.am_table td.tl,.am_table th.tl{
  padding-left: 30px;
  box-sizing: border-box;
}
.subaccount-list{
  margin-top: 20px;
  max-height: 318px;
  overflow-y: auto;
  margin-bottom: 20px;
}
.sa-item .el-form-item__label{
  padding: 15px 12px 15px 0;
}
.sa-item .el-input{
  width: initial;
}
.btn-addsub{
  width: 100%;
  border: 1px dashed #ddd;
  color: #bbb;
}
.btn-addsub:hover{
  color: #18ccc0;
}
.remove-sa{
  display: inline-block;
  font-size: 28px;
  color: #bbb;
  margin-top: -12px;
}
.am-switch{
  transform: scale(.76);
  vertical-align: middle;
  margin-top: 4px;
}
.agent-type-group{
  vertical-align: middle;
  padding: 7px 0;
}
.error-tip{
  color: #f00;
}
</style>
