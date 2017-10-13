<template>
  <div class="subaccount-wrap">
    <div class='dateblock'>
      <span><i></i> 筛选：</span>
      <el-date-picker
        class='amdate'
        v-model="startDate"
        type="date"
        placeholder="起始日期"
        :picker-options="pickerOptionsStart"
        @change='starTimeChang'>
      </el-date-picker>
      -
      <el-date-picker
        class='amdate'
        v-model="endDate"
        type="date"
        placeholder="终止日期"
        :picker-options="pickerOptionsOver"
        @change='endTimeChang'>
      </el-date-picker>
      <div class='am_button' @click="goAgentList">
        <router-link to="/platmanage/agent">
          <button>返回上层</button>
        </router-link>
      </div>
      <el-input
        class='am_search sa_search'
        placeholder="搜索用户名"
        icon="search"
        v-model="keyword"
        :on-icon-click="searchClick">
      </el-input>
    </div>

    <div class="sa-table am_table">
      <table cellpadding="0" cellspacing="0" width="100%">
        <thead>
          <tr>
            <th>初始账号</th>
            <th>修改后账号</th>
            <th v-if="secondShow">所属二级代理商</th>
            <th>开设时间</th>
            <th>交付时间</th>
            <th>激活状态</th>
            <th>激活日期</th>
            <!--<th>到期时间</th>-->
            <th>账号状态</th>
            <th class="tl" width='135'>操作</th>
          </tr>
        </thead>
        <tbody v-if="subAccountList.length">
          <tr v-for='(item, index) in subAccountList' :key="index">
            <td>{{ item.username }}</td>
            <td>
              {{ item.usernameChanged }} 
              <button class='btn_modifyUsername' @click='modifyUsername(item, index)'></button>
            </td>
            <td v-if="secondShow">{{ item.user && item.user.mobile || '-' }}</td>
            <td>{{ item.createTime | formatDate }}</td>
            <td>{{ item.deliveryTime | formatDate }}</td>
            <td>
              <em class='blueColer' v-if="item.isActive">已激活</em>
              <em class='redColor' v-else>未激活</em>
            </td>
            <td>{{ item.activeTime | formatDate }}</td>
            <td>
              <em class='blueColer' v-if="item.status">正常</em>
              <em class='redColor' v-else>禁用</em>
            </td>
            <td class='tl'>
              <el-popover width="80" placement='top-start' trigger='hover' :content="item.status ? '禁用账号' : '启用账号'">
                <el-switch slot="reference" v-model="item.status" off-color="#999" on-color="#18ccc0" class="am-switch" on-text="" off-text="" @change="updateState(item.id, index)"> </el-switch>
              </el-popover>
              <el-popover width="80" placement='top-start' trigger='hover' content='重置密码'>
                <el-button slot='reference' class="btn-def btn_resetpass" @click="resetPassword(item.id)"></el-button>
              </el-popover>
              <el-popover width="80" placement='top-start' trigger='hover' content='删除账号'>
                <el-button slot='reference' class="btn-def btn_delaccoount" @click="delAccount(item.id, index)"></el-button>
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

    <el-dialog
      title='删除用户'
      v-model='delUserVisible'
      size='xs'
      custom-class='dialog-theme2'>
      <div class='content'>
        <div class='editInfo'>
          <div class='ei_group clearfix ei_mt10'>
            <p>您确定删除此用户？</p>
            <p class='grbyColer'>(用户个人信息及购买记录都会删除，无法恢复)</p>
          </div>
          <div class='ei_button ei_button_lg ei_mt20'>
            <button class='ei_b_baocun' type='button' @click='saveDelUserDialog'>确定</button>
            <button class='ei_b_quxiao' type='button' @click='delUserVisible = false'>取消</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog 
      title="修改账号"
      v-model="modifyUsernameDialog"
      size="xs"
      custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <input type='text' class='input_username' v-model='usernameVal' />
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_sure" type="button" @click="saveUsername()">确定</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="重置成功"
      v-model="rePassDialog"
      size="xs"
      custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            
            <p v-if="resetPassOk">该账号密码重置为：123456</p>
            <p class='grbyColer' v-if="resetPassOk">（请及时提醒用户密码已重置，尽快更改密码）</p>

            <p v-else>该账号密码重置</p>
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_sure" type="button" @click="rePassDialog = false">确定</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <div class="block pagination tc">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="getSubAccountList">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '../../fetch/api'
import util from '../../assets/js/utils'
export default {
  name: 'subaccount',
  data () {
    return {
      subAccountList: [],
      startDate: '',
      endDate: '',
      pickerOptionsStart: {
        disabledDate (time) {
          return time.getTime() < 1488297600000 || time.getTime() >= Date.now()
        }
      },
      pickerOptionsOver: {
        disabledDate (time) {
          return time.getTime() < 1488297600000 || time.getTime() >= Date.now()
        }
      },
      agentId: 0,
      startTime: '',
      endTime: '',
      keyword: '',
      delUserVisible: false,
      userId: null,
      userIndex: 0,
      pageSize: 15,
      total: 0,
      modifyUsernameDialog: false,
      usernameVal: '',
      rePassDialog: false,
      resetPassOk: true,
      secondShow: false
    }
  },
  created: function () {
    this.agentId = this.$store.getters.getAgentId
    this.getSubAccountList()
    this.getBasicShow()
  },
  methods: {
    getBasicShow() {
      api.getBasicShow().then(res => {
        if(res.success) {
          this.secondShow = res.show.show
        }
      })
    },
    getSubAccountList (page = 1) {
      this.page = page
      let _data = {
        id: this.agentId,
        startTime: this.startTime ? util.formatDate(new Date(this.startTime), 'yyyy-MM-dd') + ' 00:00:00' : '',
        endTime: this.endTime ? util.formatDate(new Date(this.endTime), 'yyyy-MM-dd') + ' 24:59:59' : '',
        username: this.keyword,
        page: this.page,
        pageSize: this.pageSize
      }
      api.subAccountQuery(_data).then(res => {
        if (res.success) {
          this.subAccountList = res.pagination.items.map(item => {
            item.status = item.status ? true : false
            return item
          })
          this.total = res.pagination.total
        }
      })
    },

    // 修改代理商信息
    updateState (id, index) {
      this.updateAgent({id: id, param: this.subAccountList[index].status ? 0 : 1, type: 1}).then(res => {
        if (res.success) {
          let _item = this.subAccountList[index]
          _item.status = this.subAccountList[index].status ? true : false
          this.$set(this.subAccountList, index, _item)
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

    // 重置密码
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

    goAgentList () {
      this.$emit('showbox', false);
    },

    delAccount (userId, index) {
      this.delUserVisible = true
      this.userId = userId
      this.userIndex = index
    },
    saveDelUserDialog () {
      api.agentUserDel({id: this.userId}).then(res => {
        if (res.success) {
          this.subAccountList.splice(this.userIndex, 1)
          this.delUserVisible = false
        }
      })
    },

    searchClick (keyword) {
      this.getSubAccountList()
    },

    getDate (strDate) {
      let st = strDate
      return st
    },
    // 开始时间禁止晚于结束时间；
    starTimeChang (val) {
      let starTime = Date.parse(this.getDate(val))
      this.startTime = starTime
      this.pickerOptionsOver = {
        disabledDate (time) {
          return time.getTime() <= starTime || time.getTime() >= Date.now()
        }
      }
      this.getSubAccountList()
    },
    // 结束时间禁止早于开始时间
    endTimeChang (val) {
      let endTime = Date.parse(this.getDate(val))
      this.endTime = endTime
      this.pickerOptionsStart = {
        disabledDate (time) {
          return time.getTime() < 1488297600000 || time.getTime() >= endTime
        }
      }
      this.getSubAccountList()
    },

    // 修改名字
    modifyUsername: function (item, index) {
      this.modifyUsernameDialog = true
      this.usernameVal = item.usernameChanged
      this.userId = item.id,
      this.userIndex = index
    },
    saveUsername: function () {
      this.modifyUsernameDialog = false
      api.updatesubaccount({id: this.userId, username: this.usernameVal}).then(res => {
        console.log(res)
        let _item = this.subAccountList[this.userIndex]
        _item.usernameChanged = this.usernameVal
        this.$set(this.subAccountList, this.userIndex, _item)
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
    }
  }
}
</script>

<style scoped>
.subaccount-wrap{
  padding: 0 20px;
}
.dateblock{
  margin-bottom: 10px;
  overflow: hidden;
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
.btn_delaccoount{
  background: url(~assets/images/icon/i_del.png) 100% no-repeat;
}
.btn_delaccoount:hover{
  background: url(~assets/images/icon/i_del_full.png) 100% no-repeat;
}
.btn_modifyUsername{
  width: 12px;
  height: 13px;
  vertical-align: -2px;
  background:url(~assets/images/icon/icon_edittout.png) no-repeat;
  background-size: 12px 13px;
}
.btn_modifyUsername:hover{
  background: url(~assets/images/icon/icon_editton.png) no-repeat;
  background-size: 12px 13px;
}

.table-nothing:hover,
.table-nothing:hover td{
  background-color: #fff !important;
}
.table-nothing td{
  height: 568px;
}
.am_button{ 
  display: inline-block;
  float: right;
}
.am_button button{
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  text-align: center;background-color: #fff;
  float: right;
  display: inline-block;
  width: 90px;
  line-height: 30px;
  color: #666;
  margin-left: 15px;
}
.am_search{
  float: right;
}
.am-switch{
  transform: scale(.76);
  vertical-align: middle;
  margin-top: 4px;
}
</style>