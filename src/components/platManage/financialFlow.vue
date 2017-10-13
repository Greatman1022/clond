<template>
  <div id="financialflow">
    <div class='am_head'>
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
      </div>
    </div>
    <div class="am_table">
      <table cellpadding="0" cellspacing="0" width="100%">
        <thead>
          <tr>
            <!-- <th>交易代号</th> -->
            <th>交易日期</th>
            <th>用户账号</th>
            <th>小程序名称</th>
            <th>购买模板</th>
            <th>交易状态</th>
            <th>消费金额</th>
          </tr>
        </thead>
        <tbody v-if="flowList.length" >
          <tr v-for='(item, index) in flowList' 
              :key="item.id">
            <td>{{ item.payTime | formatDate }}</td>
            <td>{{ item.username | formatUser }}</td>
            <td :class="{redColor: !item.customerApp.miniAppName}">{{ item.customerApp.miniAppName | formatAppName }}</td>
            <td>{{ item.buyTempName }}</td>
            <td>{{ item.payStatusTxt }}</td>
            <td class="yellowColor">{{ item.amount }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="table-nothing">
            <td colspan="6">没有数据</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="block pagination tc">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="getFlowList">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '../../fetch/api'
import util from '../../assets/js/utils'
export default {
  name: 'agentmanage',
  data () {
    return {
      flowList: [],
      cities: [],
      cities2: [],
      total: 0,
      value1: '',
      value2: '',
      startDate: '',
      endDate: '',
      pageSize: 15,
      pickerOptionsStart: {
        disabledDate (time) {
          return time.getTime() < 1488297600000 || time.getTime() >= Date.now()
        }
      },
      pickerOptionsOver: {
        disabledDate (time) {
          return time.getTime() < 1488297600000 || time.getTime() >= Date.now()
        }
      }
    }
  },
  watch: {
  },
  created: function () {
    this.getFlowList(1)
  },
  methods: {
    getFlowList: function (page) {
      this.page = page
      let _startDate = this.startDate ? util.formatDate(new Date(this.startDate), 'yyyy-MM-dd') + ' 00:00:00' : ''
      let _endDate = this.endDate ? util.formatDate(new Date(this.endDate), 'yyyy-MM-dd') + ' 24:59:59' : ''
      let data = {
        startTime: _startDate,
        endTime: _endDate,
        page: page,
        pageSize: this.pageSize
      }
      api.agentFlow(data).then(res => {
        if (res.success) {
          this.flowList = res.pagination.items
          this.total = res.pagination.total
        }
      })
    },
    getDate (strDate) {
      let st = strDate
      return st
    },
    // 开始时间禁止晚于结束时间；
    starTimeChang (val) {
      let starTime = Date.parse(this.getDate(val))
      this.startDate = starTime
      this.pickerOptionsOver = {
        disabledDate (time) {
          return time.getTime() <= starTime || time.getTime() >= Date.now()
        }
      }
      this.getFlowList(this.page)
    },
    // 结束时间禁止早于开始时间
    endTimeChang (val) {
      let endTime = Date.parse(this.getDate(val))
      this.endDate = endTime
      this.pickerOptionsStart = {
        disabledDate (time) {
          return time.getTime() < 1488297600000 || time.getTime() >= endTime
        }
      }
      this.getFlowList(this.page)
    }
  },
  filters: {
    formatDate: function (val) {
      let _d = new Date(val)
      return util.formatDate(_d, 'yyyy年MM月dd日')
    },
    formatUser: function (val) {
      let _name = val ? val : '-'
      return _name
    },
    formatAppName: function (val) {
      return val ? val : '未绑定'
    }
  }
}
</script>

<style scoped>
.el-select{
  float: left;
  margin-right: 7px;
}
.amdate .el-input__icon+.el-input__inner{
  padding-right: 10px;
}
#financialflow{
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
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.am_search input{
  border: none;
  margin: 0 10px 0 19px;
  float: left;
  height: 30px;
  line-height: 30px;
}
.am_search i{
  background: url(~assets/images/icon/icon_search2.png) center no-repeat;
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  float: left;
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
.table-nothing:hover,
.table-nothing:hover td{
  background-color: #fff !important;
}
.table-nothing td{
  height: 568px;
}
</style>
