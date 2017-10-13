<template>
  <div class='usermanage'>
    <div class='om_search'>
      <!-- <label>
        groupId：
        <input type='text' placeholder='通过groupId搜索用户' v-model='groupid' />
      </label> -->
      <label>
        姓名：
        <input type='text' placeholder='通过姓名搜索用户' v-model='realName' />
      </label>
      <label>
        手机号：
        <input type='text' placeholder='通过手机号搜索用户' v-model='phone' />
      </label>
      <button @click='search'><i class='icon_search'></i>搜索</button>
    </div>
    <div class='um_con'>
      <div class='con_l'>
        <div class='l_head'>
          <label class='checklab'>
            <i class='icon_choose' :class='{"icon_choosed":choosed==true}'></i>
            <input type='checkbox' v-model='checkAll' @click='checkedAll()' />
            全选
          </label>
          <div class='btn_group'>
            <button class='movebtn' @click='openMoveBatchGroupPop()'>移动分组</button>
            <button class='deletebtn' @click='removeusers' v-model='ischeckdate'>删除</button>
          </div>
        </div>
        <table width='100%'>
          <thead>
            <tr>
              <th width='30'>&nbsp;</th>
              <th width='105'>微信昵称</th>
              <th width='85'>姓名</th>
              <th width='115'>手机</th>
              <th>地址</th>
              <!-- <th width='230'>地址</th> -->
              <th width='165'>最近一次下单时间</th>
              <th width='90'>下单总额</th>
              <th width='125'>分组</th>
              <!-- <th>操作</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for='(user,index) in userlist'>
              <td>
                <label class='checklab'>
                  <i class='icon_choose' :class='{"icon_choosed":ischeckdate.indexOf(user.id)!==-1}'></i>
                  <input type='checkbox' :value="user.id" class="fan-checkbox" v-model='ischeckdate' :check='choosed'/>
                </label> 
              </td>
              <td v-text='user.nickName'></td>
              <td v-text='user.realName'></td>
              <td v-text='user.phone'></td>
              <td v-text='user.address'></td>
              <td v-text='user.lastOrdDate'></td>
              <td v-text='user.totalOrdPrice'></td>
              <td>
                <!-- <span v-text='user.groupName'></span> -->
                <el-select v-model="user.groupName" placeholder="请选择" @change='moveusergroup(user.id, user.groupId)'>
                  <el-option
                    v-for="group in groupOption"
                    :key="group.id"
                    :label="group.name"
                    :value="group.name">
                  </el-option>
                </el-select>
              </td>
              <!-- <td>
                <button @click='removeuser(user.id)' class='del_btn' v-model='ischeckdate'>删除</button>
              </td> -->
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan='8'>
                <div class="block pagination tr">
                  <el-pagination
                    v-if='total>0'
                    class='pagination'
                    layout="prev, pager, next"
                    :page-size='pageSize'
                    :current-page='pageNum'
                    :total='total'
                    @current-change="getCurrentChange">
                  </el-pagination>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class='con_r'>
        <h3>分组类别<i @click='openMakeGroupPop'>+</i></h3>
        <ul>
          <li>未分组</li>
          <li v-for='grouplist in groupOption'>
            {{grouplist.name}}
            <span>          
              <i class='icon_del' @click='openDelGroupPop(grouplist.id, grouplist.name)'></i>
              <i class='icon_xg' @click='openModifyGroupPop(grouplist.id, grouplist.name)'></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="批量移动分组"
      v-model="moveBatchGroupVisible"
      size="xs"
      custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <el-select v-model="moveBatchGroupValue" class='umDepselect' placeholder="请选择" @change='batchmoveselect()'>
              <el-option
                v-for="item in groupOption"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_baocun" type="button" @click="saveMoveBatchGroupDialog()">确定</button>
            <button class="ei_b_quxiao" type="button" @click="moveBatchGroupVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="新建分组"
      v-model="makeGroupVisible"
      size="xs"
      custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <el-input v-model="makeGroupinput" class='umDepinput' placeholder="请输入分组名称"></el-input>
            <p class='error' v-show='isMakeError == true'>{{makeError}}</p>
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_baocun" type="button" @click="saveMakeGroupDialog()">确定</button>
            <button class="ei_b_quxiao" type="button" @click="makeGroupVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="删除分组"
      v-model="delGroupVisible"
      size="xs"
      custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <p>确认删除分组 <em class="redColor">{{groupName}}</em></p>
            <p>仅删除分组，不删除视频，组内视频按将自动归入未分组</p>
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_baocun" type="button" @click="saveDelGroupDialog()">确定</button>
            <button class="ei_b_quxiao" type="button" @click="delGroupVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="修改分组"
      v-model="modifyGroupVisible"
      size="xs"
      custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <el-input v-model="modifyGroupinput" class='umDepinput' placeholder="请输入分组名称"></el-input>
            <p class='error' v-show='isModifyError == true'>{{modifyError}}</p>
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_baocun" type="button" @click="saveModifyGroupDialog()">确定</button>
            <button class="ei_b_quxiao" type="button" @click="modifyGroupVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../../fetch/api.js'
export default {
  name: 'usermanage',
  components: {
  },
  data () {
    return {
      ischeckdate: [], /* 获取选项框数据 */
      checkAll: false,
      choosed: false,

      moveBatchGroupVisible: false,
      moveBatchGroupValue: '',

      makeGroupVisible: false,
      makeGroupinput: '',
      isMakeError: false,
      makeError: '',

      delGroupVisible: false,
      groupName: '',
      groupId: '',

      modifyGroupVisible: false,
      isModifyError: false,
      modifyError: '',
      modifyGroupinput: '',
      modifyGroupId: '',

      groupid: '',
      realName: '',
      phone: ''
    }
  },
  created: function () {
    this.$store.dispatch('setUserList', {pageNum: this.pageNum})
    this.$store.dispatch('setUserGroup')
  },
  computed: {
    ...mapGetters({
      userlist: 'getUserList',
      total: 'getTotal',
      pageSize: 'getPageSize',
      pageNum: 'getPageNum',
      groupOption: 'getUserGroup'
    })
  },
  methods: {
    moveusergroup (id, groupId) {
      api.moveUserGroup({userId: id, userGroupId: groupId}).then(res => {
        // console.log(res)
      })
    },
    getCurrentChange (page) {
      this.ischeckdate = []
      this.$store.dispatch('setUserList', {pageNum: page})
    },
    search () {
      this.$store.dispatch('setUserList', {groupId: this.groupid, realName: this.realName, phone: this.phone})
    },
    /* 移动分组弹窗 */
    openMoveBatchGroupPop () {
      this.moveBatchGroupVisible = true
    },
    saveMoveBatchGroupDialog () {
      this.moveBatchGroupVisible = false
      this.$store.dispatch('setMoveBatchUserGroup', {userIds: this.ischeckdate, userGroupId: this.moveBatchGroupValue})
    },
    batchmoveselect () {
      // console.log(this.moveBatchGroupValue)
    },

    /* 新建分组弹窗 */
    openMakeGroupPop () {
      this.makeGroupVisible = true
      this.makeGroupinput = ''
    },
    saveMakeGroupDialog () {
      /* if (!this.makeGroupinput) {
        this.makeError = ''
        this.isMakeError = true
        return false
      } */
      this.isMakeError = false
      this.makeGroupVisible = false
      this.$store.dispatch('setAddUserGroup', { name: this.makeGroupinput })
    },

    /* 删除分组弹窗 */
    openDelGroupPop (id, val) {
      this.delGroupVisible = true
      this.groupName = val
      this.groupId = id
    },
    saveDelGroupDialog () {
      this.delGroupVisible = false
      this.$store.dispatch('setDelUserGroup', { id: this.groupId })
    },
    /* removeGroup: function (id) {
      this.groupOption = this.groupOption.filter((item) => { return item.id !== id })
    }, */

    /* 修改分组名称弹窗 */
    openModifyGroupPop (id, val) {
      this.modifyGroupVisible = true
      this.modifyGroupinput = val
      this.modifyGroupId = id
    },
    saveModifyGroupDialog () {
      this.modifyGroupVisible = false
      this.groupName = this.modifyGroupinput
      this.groupId = this.modifyGroupId
      this.$store.dispatch('setModifyUserGroup', {id: this.groupId, name: this.groupName})
    },

    /* 全选、删除 */
    checkedAll () {
      let ischeckdate = []
      if (this.checkAll) {
        this.userlist.forEach((item) => {
          ischeckdate.push(item.id)
        })
      }
      this.ischeckdate = ischeckdate
    },
    /* removeuser: function (id) {
      this.userlist = this.userlist.filter((item) => { return item.id !== id })
      this.ischeckdate = this.ischeckdate.filter((val) => { return val !== id })
    }, */
    removeusers () {
      this.$store.dispatch('setDelUser', {ids: this.ischeckdate})
      this.ischeckdate = []
    }
  },
  watch: {
    'ischeckdate': function () {
      if (this.userlist.length === this.ischeckdate.length && this.userlist.length !== 0) {
        this.checkAll = true
        this.choosed = true
      } else {
        this.checkAll = false
        this.choosed = false
      }
    },
    'groupid': function () {
      if (this.groupid === '' && this.realName === '' && this.phone === '') {
        this.$store.dispatch('setUserList', {pageNum: this.pageNum})
      }
    }
  }
}
</script>

<style scoped>
.ei_b_baocun,.ei_group{
  margin-left: 48px;
}
.ei_group p.error{
  line-height: 40px;
  margin-bottom: -20px;
  color: #cc0000;
}
.usermanage{
  padding: 0 20px;
}
.om_search{
  padding: 14px 0;
  line-height: 30px;
}
.om_search label{
  margin-right: 15px;
  font-size: 14px;
  display: inline-block;
}
.om_search input{
  display: inline-block;
  width: 128px;
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  line-height: 30px;
  padding: 0 10px;
}
.om_search button{
  line-height: 32px;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  width: 76px;
  background-color: #18ccc0;
}
.om_search button i{
  background: url(~assets/images/icon/icon_search.png) no-repeat;
  width: 17px;
  height: 17px;
  display: inline-block;
  margin-right: 5px;
  vertical-align: -3px;
}
label.checklab{
  float: left;
  line-height: 32px;
  cursor: pointer;
}
label.checklab i.icon_choose{
  border: 1px solid #d6d6d6;
  height: 11px;
  width: 11px;
  display: inline-block;
  float: left;
  margin: 10px 6px 0 0;
}
label.checklab i.icon_choosed{
  background: url(~assets/images/icon/icon_choose.png);
}
label.checklab input{
  width: 0px;
  height: 0px;
}
.um_con{
  overflow: hidden;
  border: 1px solid #ddd;
  display: flex;
  display: -webkit-flex;
}
.con_l{
  width: 989px;
  flex: 1;
  -webkit-flex: 1;
}
.con_l .l_head{
  display: inline-block;
  padding: 14px 9px;
}
.con_l .l_head label{
  margin-right: 10px;
}
.con_l .l_head .btn_group{
  display: inline-block;
  font-size: 0px;
}
.con_l .l_head .btn_group button{
  border: 1px solid #d6d6d6;
  line-height: 30px;
  background: none;
  border-radius: 3px;
  text-align: center;
  width: 90px;
  font-size: 14px;
  margin-left: 10px;
}
.con_l table{

}
.con_l table th,.con_l table td{
  word-break:break-all;
  word-wrap:break-word;
}
.con_l table th{
  background-color: #f5f5f5;
  line-height: 40px;
}
.con_l table td{
  padding: 15px 25px 15px 0;
  border-bottom: 1px dashed #e2e2e2;
}
.con_l table td:first-child,.con_l table td:last-child{
  padding-right: 0;
}
.con_l table td label{
  float: right;
}
.con_l table td .del_btn{
  background: none;
  color: #0088cc;
}
.con_l table tfoot tr td{
  border-bottom: none;
}
.con_l .paging{
  padding:10px 8px 10px 0;
}
.con_r{
  width: 168px;
  border-left: 1px solid #ddd;
}
.con_r h3{
  background-color: #f5f5f5;
  padding: 0 10px;
  line-height: 40px;
}
.con_r h3 i{
  float: right;
  color: #999;
  font-size: 28px;
  cursor: pointer;
}
.con_r ul li{
  padding:0 10px;
  margin-bottom: 10px;
  line-height: 40px;
  position: relative;
}
.con_r ul li:hover{
  background-color: #f5f5f5;
}
.con_r ul li span{
  position: absolute;
  right: 10px;
  top: 0;
  display: none;
}
.con_r ul li:hover span{
  display: inline-block;
}
.con_r ul li span i{
  height: 16px;
  float: right;
  display: inline-block;
  margin-top: 12px;
  cursor: pointer;
}
i.icon_xg{
  width: 17px;
  background: url(~assets/images/icon/icon_xg.png) no-repeat;
}
i.icon_del{
  width: 15px;
  background: url(~assets/images/icon/icon_del.png) no-repeat;
  margin-left: 9px;
}
.pagination{
  padding: 0 5px 0 0;
}
</style>
