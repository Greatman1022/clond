<template>
  <div id="acmanage" class='acmanage'>
    {{minilist[0]}}
    <table class="acTable" cellpadding="0" cellspacing="0" width="96%">
      <thead>
        <tr>
          <th>账号</th>
          <th>绑定APPID</th>
          <th width='190'>使用模板</th>
          <th width='195'>激活日期</th>
          <th width='155'>到期时间</th>
          <th width='205'>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item, index) in minilist'>
          <td>{{ item.createTime}}</td>
          <td :class="{redColor: !item.appid}">{{ item.appid | filterNone }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.companyName}}</td>
          <td>{{ item.duetime}}</td>
          <!-- <td class="remark">{{ item.remark }} <span class="i-edit" @click="editRemark(item.id)"></span> </td> -->
          <!-- <td>
            <button class='aset' v-if='item.isSet' @click='handleSet(item.id)'>开设账号</button>
            <span v-else>已设置</span>
          </td> -->
          <td>
            <el-popover
              placement='top-start'
              width='78'
              trigger='hover'
              content='重置密码'>
              <el-button slot='reference' class='repass' v-if='item.miniAppid' @click='handleRe(item.id)'></el-button>
            </el-popover>
            <!-- <el-popover
              placement='top-start'
              width='78'
              trigger='hover'
              content='开设子账号'>
              <el-button slot='reference' class='setname' v-if='!item.miniAppid' @click='handleSet(item.id)'></el-button>
            </el-popover>
            <el-popover
              placement='top-start'
              width='78'
              trigger='hover'
              content='重置密码'>
              <el-button slot='reference' class='repass' v-if='item.miniAppid' @click='handleRe(item.id)'></el-button>
            </el-popover>
            <el-popover
              placement='top-start'
              width='78'
              trigger='hover'
              content='续费'>
              <el-button slot='reference' class='renew'></el-button>
            </el-popover>
            <el-popover
              placement='top-start'
              width='78'
              trigger='hover'
              content='页面管理'>
              <el-button slot='reference' class='pagemana'></el-button>
            </el-popover>
            <el-popover
              placement='top-start'
              width='78'
              trigger='hover'
              content='内容管理'>
              <el-button slot='reference' class='conmana'></el-button>
            </el-popover> -->
          </td>
        </tr>
      </tbody>
    </table>
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

    <!-- <el-dialog ref='dialog' v-model="subAccoutDialog" size="sm" @open='openSubAccout'>
      <div class="ui-title">
        <span>开设子账户</span>
      </div>
      <div class="content">
        <div class="editInfo">
          <h3>开设子账户后，只有子账户可以管理购买的项目。</h3>
          <div class="ei_group clearfix ei_mt5">
            <span class="tl">初始账号</span>
            <input type="text" v-model="subAccount" placeholder="请输入初始账号">
            <p class="error">eeee</p>
          </div>
          <div class="ei_group clearfix ei_mt">
            <span class="tl">初始密码</span>
            <input type="password" v-model="subPassword" placeholder="请输入初始密码">
            <p class="error">eee</p>
          </div>
          <div class="ei_group clearfix ei_mt">
            <span class="tl">公司名称</span>
            <input type="text" v-model="subCompany" placeholder="请输入公司名称">
            <p class="error">eee</p>
          </div>
          <div class="ei_button ei_button_lg">
            <button class="ei_b_baocun ei_b_lg" type="button" @click="saveSubAccoutDialog()">绑定</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog ref='dialog' v-model="rePassDialog" size="sm">
      <div class="ui-title">
        <span>重置密码</span>
      </div>
      <div class="content">
        <div class="editInfo">
          <h3>请输入您的新密码，请在确保安全的情况下进行。</h3>
          <div class="ei_group clearfix ei_mt5">
            <span class="tl">初始账号</span>
            <input type="text" v-model="rePass" placeholder="请输入初始账号">
            <p class="error">eee</p>
          </div>
          <div class="ei_group clearfix ei_mt">
            <span class="tl">原密码</span>
            <input type="password" v-model="rePassword" placeholder="请输入初始密码">
            <p class="error">eee</p>
          </div>
          <div class="ei_button ei_button_lg">
            <button class="ei_b_baocun ei_b_lg" type="button" @click="saveRePassDialog()">重置</button>
          </div>
        </div>
      </div>
    </el-dialog> -->

    <!-- <el-dialog ref='dialog' v-model="editRemarkDialog" size="sm">
      <div class="ui-title">
        <span>备注</span>
      </div>
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix">
            <el-input type="textarea" class="textarea" :rows="4" resize="none" v-model="remark" placeholder="备注"></el-input>
          </div>
          <div class="ei_button ei_button_lg">
            <button class="ei_b_baocun ei_b_lg" type="button" @click="saveEditRemark()">确定</button>
          </div>
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../fetch/api.js'
export default {
  name: 'acmanage',
  data () {
    return {
      subAccoutDialog: false,
      subAccount: '',
      subPassword: '',
      subCompany: '',
      accout: {},
      rePassDialog: false,
      rePass: '',
      rePassword: '',
      miniId: ''
    }
  },
  computed: {
    ...mapGetters({
      userMess: 'getUserMess',
      minilist: 'getMiniList',
      total: 'getMiniTotal',
      pageSize: 'getMiniPageSize',
      pageNum: 'getMiniPageNum'
    })
  },
  created: function () {
    this.$store.dispatch('setMiniList', {userId: 1, pageSize: 8})
  },
  methods: {
    getCurrentChange: function (page) {
      this.$store.dispatch('setMiniList', {userId: 1, page: page, pageSize: 8})
    },
    openSubAccout: function () {
      this.accout = {}
    },
    handleSet: function (id) {
      this.subAccoutDialog = true
      this.subAccount = ''
      this.subCompany = ''
      this.subPassword = ''
      this.miniId = id
    },
    saveSubAccoutDialog: function () {
      api.openAccount({id: this.miniId, userId: this.userMess.id, username: this.subAccount, password: this.subPassword, companyName: this.subCompany}).then(res => {
        console.log('成功')
      })
      this.subAccoutDialog = false
    },
    handleRe: function (id) {
      this.rePassDialog = true
      this.rePass = ''
      this.rePassword = ''
      this.miniId = id
    },
    saveRePassDialog: function () {
      this.rePassDialog = false
    }
    /* editRemark: function (index) {
      this.currId = index
      this.editRemarkDialog = true
      this.remark = this.acmList[this.currId].remark
    },
    saveEditRemark: function () {
      this.editRemarkDialog = false
      this.acmList[this.currId].remark = this.remark
    } */
  },
  filters: {
    /* formatDate: function (val) {
      let _d = new Date(val)
      let _month = (_d.getMonth() + 1)
      let _date = _d.getDate()
      _month = _month < 10 ? ('0' + _month) : _month
      _date = _date < 10 ? ('0' + _date) : _date

      return _d.getFullYear() + '年' + _month + '月' + _date + '日'
    }, */
    filterNone: function (val) {
      return val || '未填写'
    }
  }
}
</script>

<style scoped>
.acTable{ 
  margin:0 auto;
}
.acTable tr{ 
  line-height:50px;
}
.acTable tr:hover{ 
  background:#f6fdfd;
}
.acTable thead tr:first-child{ 
  background:#f7f7f7;
}
.acTable td,.acTable th{ 
  text-align:center; 
  border-bottom:#e6e6e6 1px solid; 
  height:49px; 
  color:#666; 
  font-size:14px;
  font-weight: normal;
}
.acTable button{
  padding: 0;
  display: inline-block;
  border: none;
  margin-right: 8px;
}
.acTable button.setname{
  width: 18px;
  height: 18px;
  background:url(~assets/images/icon/icon_open.png);
}
.acTable button.setname:hover{
  background: url(~assets/images/icon/icon_openhover.png);
}
.acTable button.repass{
  width: 16px;
  height: 18px;
  background:url(~assets/images/icon/icon_repass.png);
}
.acTable button.repass:hover{
  background: url(~assets/images/icon/icon_repasshover.png);
}
.acTable button.renew{
  width: 20px;
  height: 17px;
  background:url(~assets/images/icon/icon_renew.png);
}
.acTable button.renew:hover{
  background: url(~assets/images/icon/icon_renewhover.png);
}
.acTable button.pagemana{
  width: 16px;
  height: 16px;
  background: url(~assets/images/icon/icon_pagemag.png);
}
.acTable button.pagemana:hover{
  background: url(~assets/images/icon/icon_pagemaghover.png);
}
.acTable button.conmana{
  width: 16px;
  height: 16px;
  background: url(~assets/images/icon/icon_conmag.png);
}
.acTable button.conmanahover{
  background: url(~assets/images/icon/icon_conmaghover.png);
}
.pd_l_state{
  text-indent: 120px;
  text-align: left!important;
}
.pd_list .pd_l_state_1{ 
  background:url(~assets/images/icon/binggo.png) 100px center no-repeat;
}
.pd_list .pd_l_state_2{ 
  background:url(~assets/images/icon/tanhao.png) 100px center no-repeat;
}
.pd_list .pd_l_state_3{ 
  background:url(~assets/images/icon/x.png) 100px center no-repeat;
}
.aset{
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  line-height: 30px;
  text-align: center;
  color: #666;
  background-color: #fff;
  width: 84px;
}
.arenew{
  border: 1px solid #cc5252;
  border-radius: 3px;
  background-color: #f85f5f;
  line-height: 30px;
  width: 62px;
  text-align: center;
  color: #fff;
  display: inline-block;
}
.i-edit{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('~assets/images/icon/icon_edited.png') no-repeat center center;
  transform: scale(.8);
  vertical-align: middle;
  opacity: .3;
  cursor: pointer;
}
.i-edit:hover{
  opacity: .8;
}
.textarea{
  width: 100% !important;
}
.remark{
  color: #ccc !important;
}
</style>
