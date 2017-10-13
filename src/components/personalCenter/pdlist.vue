<template>
  <div id="pdlist" class='pd_list'>

    <table class="listTable" cellpadding="0" cellspacing="0" width="96%">
      <thead>
        <tr>
          <th width='240'>订单账号</th>
          <th width='180'>日期</th>
          <th>绑定小程序</th>
          <th>小程序模板</th>
          <th width='200'>交易是否成功</th>
          <th>消费金额</th>
        </tr>
      </thead>
      <tbody v-if="list.items &&  list.items.length">
        <tr v-for='(item, index) in list.items' :key="index">
          <td>{{ item.orderNo }}</td>
          <td>{{ item.customerApp.createTime }}</td>
          <td :class="{redColor: !item.customerApp.miniAppName}">{{ item.customerApp.miniAppName || '未绑定' }}</td>
          <td>{{ item.buyTempName}}</td>
          <td>交易成功</td>
          <td class="redColor">{{ item.amount }}</td>
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
      <el-pagination
        v-if='list.total>0'
        layout="prev, pager, next"
        :page-size='list.size'
        :current-page='list.page'
        :total='list.total'
        @current-change="getCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'pdlist',
  data () {
    return {}
  },
  created: function () {
    this.$store.dispatch('setDealList')
  },
  computed: {
    ...mapGetters({
      list: 'getDealList',
      userMess: 'getUserMess'
    })
  },
  methods: {
    getCurrentChange: function (page) {
      this.$store.dispatch('setDealList', {page: page})
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
    saveRePassDialog: function () {
      this.rePassDialog = false
    },
  }
}
</script>

<style scoped>
.listTable{ 
  margin:0 auto;
}
.listTable tr{ 
  line-height:50px;
}
.listTable tr:hover{ 
  background:#f6fdfd;
}
.listTable thead tr:first-child{ 
  background:#f7f7f7;
}
.listTable td,.listTable th{ 
  text-align:center; 
  border-bottom:#e6e6e6 1px solid; 
  height:49px; 
  color:#666; 
  font-size:14px;
  font-weight: normal;
}
.pd_l_state{
  padding: 0 50px;
  text-indent: 30px;
  text-align: left!important;
  color: #999 !important;
}
.pd_l_state_header{
  padding: 0 50px;
  text-indent: 10px;
  text-align: left!important;
}
.pd_l_state_1{ 
  background:url(~assets/images/icon/binggo.png) 60px center no-repeat;
}
.pd_l_state_2{ 
  background:url(~assets/images/icon/tanhao.png) 60px center no-repeat;
}
.pd_l_state_3{ 
  background:url(~assets/images/icon/x.png) 60px center no-repeat;
}
</style>
