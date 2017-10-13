<template>
  <div id="acresource" class='acresource'>
    <table class="acTable" cellpadding="0" cellspacing="0" width="96%">
      <thead>
        <tr>
          <th>意向客户手机号</th>
          <th>申请时间</th>
          <th>所属范围</th>
          <th>小程序名称</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item, index) in minilist'>
          <td>{{ item.tel }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.appletname }}</td>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'acresource',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      minilist: 'getMiniList',
      total: 'getMiniTotal',
      pageSize: 'getMiniPageSize',
      pageNum: 'getMiniPageNum'
    })
  },
  created: function () {
  },
  methods: {
    getCurrentChange: function (page) {
      this.$store.dispatch('setMiniList', {userId: 1, page: page, pageSize: 8})
    }
  },
  filters: {
    /* formatDate: function (val) {
      let _d = new Date(val)
      let _month = (_d.getMonth() + 1)
      let _date = _d.getDate()
      let _hour = _d.getHours()
      let _minute = _d.getMinutes()
      _month = _month < 10 ? ('0' + _month) : _month
      _date = _date < 10 ? ('0' + _date) : _date
      _hour = _hour < 10 ? ('0' + _hour) : _hour
      _minute = _minute < 10 ? ('0' + _minute) : _minute
      return _d.getFullYear() + '年' + _month + '月' + _date + '日 ' + _hour + ':' + _minute
    } */
  }
}
</script>

<style scoped>
.acTable{ 
  margin:0 auto;
}
.acTable tr{ 
  height:50px;
}
.acTable tr:hover{ 
  background:#f6fdfd;
}
.acTable thead tr:first-child{ 
  background:#f7f7f7;
}
.acTable td,.acTable th{ 
  width:25%; 
  text-align:center; 
  border-bottom:#e6e6e6 1px solid; 
  height:49px; 
  color:#666; 
  font-size:14px;
  font-weight: normal;
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
</style>
