<template>
  <div id="pdlist" class='pd_list'>
    <div class='dateblock'>
      <div class='am_button'>
        <button @click="agentDialogVisible = true">+ 代理商账户开设</button>
      </div>
      <el-input class='am_search' placeholder="搜索姓名和手机号" icon="search" v-model="keyword" @change="serachKeyword" :on-icon-click="serachKeyword">
      </el-input>
    </div>
    <div class="sa-table am_table">
      <table class="listTable" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th width='240'>手机号</th>
            <th width='180'>开设时间</th>
            <th>姓名</th>
            <th>子账号数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-if="secondData.items && secondData.items.length">
          <tr v-for='(item, index) in secondData.items' :key="index">
            <td>{{ item.mobile }}</td>
            <td>{{ item.createTime | formatDate }}</td>
            <td>{{ item.nickname }}</td>
            <td>{{ item.users.length }}</td>
            <td>
              <el-popover placement='top-start' width='78' trigger='hover' content='重置密码'>
                <el-button slot='reference' class='repass' @click.native.prevent='handleRe(item)'></el-button>
              </el-popover>
              <el-popover placement='top-start' width='78' trigger='hover' content='删除'>
                <el-button slot='reference' class='del' @click.native.prevent='deleteRow(item.id, index)'></el-button>
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
        <el-pagination v-if='secondData.total>0' layout="prev, pager, next" :page-size='secondData.size' :current-page='secondData.page' :total='secondData.total' @current-change="getSecondData">
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
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_sure" type="button" @click="saveRePassDialog()">确定</button>
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
          <h3 class="git pull">开设代理商账户只能能过手机号进行登录</h3>
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
          <div class="ei_button ei_button_lg">
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
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import api from '../../fetch/api.js'
import util from '../../assets/js/utils'
export default {
  name: 'pdlist',
  data() {
    return {
      agentForm: {},
      keyword: null,
      iserror: false,
      errors: false,
      addAgentErrorMsg: false,
      addAgentErrorDialog: false,
      agentDialogVisible: false,
      rePassDialog: false,
      secondData: [],
      keyword: null,
      page: 1,
      pageSize: 15,
    }
  },
  created: function () {
    // this.$store.dispatch('setDealList')
    this.getSecondData(1)
  },
  computed: {
    ...mapGetters({
      // list: 'getDealList',
      userMess: 'getUserMess'
    })
  },
  methods: {
    getSecondData(page) {
      this.page = page
      api.subAccountQuery({
        id: this.userMess.id,
        keyword: this.keyword,
        page: this.page,
        pageSize: this.pageSize,
        type: 2
      }).then(res => {
        if (res.success) {
          this.secondData = res.pagination
        }
      })
    },
    // 搜索
    serachKeyword() { 
      this.getSecondData(1)
    },
    saveAgentDialog: function () {
      let _agent = {
        id: this.userMess.id,
        nickname: this.agentForm.nickname,
        mobile: this.agentForm.mobile,
        password: this.agentForm.password,
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
            this.getSecondData(1)
          } else {
            this.addAgentErrorMsg = res.message
            this.addAgentErrorDialog = true
          }
        })
      }
    },
    onlyNum(key) {
      this.agentForm[key] = util.onlyNum(this.agentForm[key] ? this.agentForm[key] : '')
    },
    openAgentDialog() {
      this.agentForm = {
        nickname: '',
        mobile: '',
        password: '',
      }
      this.iserror = false
      this.errors = ''
    },

    // 删除行
    deleteRow(id, index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'del-wrap'
      }).then(() => {
        api.agentUserDel({ id: id }).then(res => {
          this.secondData.items.splice(index, 1);
          this.$message({ type: 'success', message: '删除成功!' });
          // this.getSecondData(this.page);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

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
    saveRePassDialog: function () {
      this.rePassDialog = false
    },
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
.am_table {
  padding: 0 20px;
}

.listTable {
  margin: 0 auto;
  width: 100%;
}

.listTable tr {
  line-height: 50px;
}

.listTable tr:hover {
  background: #f6fdfd;
}

.listTable thead tr:first-child {
  background: #f7f7f7;
}

.listTable td,
.listTable th {
  text-align: center;
  border-bottom: #e6e6e6 1px solid;
  height: 49px;
  color: #666;
  font-size: 14px;
  font-weight: normal;
}

.pd_l_state {
  padding: 0 50px;
  text-indent: 30px;
  text-align: left!important;
  color: #999 !important;
}

.pd_l_state_header {
  padding: 0 50px;
  text-indent: 10px;
  text-align: left!important;
}

.pd_l_state_1 {
  background: url(~assets/images/icon/binggo.png) 60px center no-repeat;
}

.pd_l_state_2 {
  background: url(~assets/images/icon/tanhao.png) 60px center no-repeat;
}

.pd_l_state_3 {
  background: url(~assets/images/icon/x.png) 60px center no-repeat;
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

.el-button {
  border: none;
}

.am_table button.repass {
  width: 16px;
  height: 18px;
  vertical-align: middle;
  background: url(~assets/images/icon/i_resetpass.png) 100% no-repeat;
}

.am_table button.repass:hover {
  background: url(~assets/images/icon/i_resetpass_full.png) 100% no-repeat;
}

.am_table button.del {
  width: 16px;
  height: 18px;
  vertical-align: middle;
  background: url(~assets/images/icon/i_del.png) 100% no-repeat;
}
.am_table button.del:hover {
  background: url(~assets/images/icon/i_del_full.png) 100% no-repeat;
}
</style>
