<template>
  <div id='dataCount'>
    <section v-if='!miniApp.appid'>
      <p class='nodata'>您未绑定小程序，无数据</p>
    </section>
    <section v-else>
      <div class='dc_item'>
        <h2>分析数据<!-- <button>导出Excel</button> --></h2>
        <ul class='tabnav'>
          <li 
            v-for='(list,index) in lists' 
            :class='{"current":index==currentindex, "litwo":index==currentindex&&index==1}' 
            v-text='list'
            @click='filterlist(index)'>
          </li>
        </ul>
        <div class='user_echarts'>
        </div>
      </div>
      <div class='dc_item'>
        <h2>访问趋势<!-- <button>导出Excel</button> --></h2>
        <ul class='tabnav'>
          <li 
            v-for='(list,index) in lists' 
            :class='{"current":index==currentindex2, "litwo":index==currentindex2&&index==1}' 
            v-text='list'
            @click='filterlist2(index)'>
          </li>
        </ul>
        <div class='trend_echarts'></div>
      </div>
      <div class='dc_item'>
        <h2>访问留存<!-- <button>导出Excel</button> --></h2>
        <ul class='tabnav'>
          <li 
            v-for='(list,index) in lists' 
            :class='{"current":index==currentindex3, "litwo":index==currentindex3&&index==1}' 
            v-text='list'
            @click='filterlist3(index)'>
          </li>
        </ul>
        <div class='retained_echarts'></div>
      </div>
    </section> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../../fetch/api.js'
import echarts from 'echarts'
export default {
  name: 'dataCount',
  components: {
  },
  data () {
    return {
      appid: null,
      color: ['#7fb800','#99b2ff', '#ff7396', '#1768ac', '#ffbf69','#ef767a',  '#18ccc0', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
      myChart1: {},
      myChart2: {},
      myChart3: {},
      lists: ['日', '周', '月'],
      currentindex: 0,
      currentindex2: 0,
      currentindex3: 0,
      newValue: [],
      user: {
        ref_date: [],
        visit_total: [],
        share_pv: [],
        share_uv: []
      },
      trend: {
        ref_date: [],
        visit_uv_new: [],
        stay_time_session:[],
        stay_time_uv: [],
        visit_depth: [],
        session_cnt: [],
        visit_pv: [],
        visit_uv: []
      },
      retained: {
        ref_date: [],
        visit_uv: [],
        visit_uv_new: []
      }
    }
  },
  computed: {
    ...mapGetters({
      miniApp: 'getMiniApp'
    })
  },
  // props: ['appid'],
  methods: {
    getSummarytrend (type) {
      api.summarytrend({type: type, appid: this.appid}).then(res => {
        var _this = this
        if (res.list) {
          res.list.map(function(item) {
            if (type === 'day'){
              _this.user.ref_date.push(item.ref_date)
            }
            if (type === 'week'){
              _this.user.ref_date.push(item.ref_week)
            }
            if (type === 'month'){
              _this.user.ref_date.push(item.ref_day)
            }
            _this.user.visit_total.push(item.visit_total)
            _this.user.share_uv.push(item.share_uv)
            _this.user.share_pv.push(item.share_pv)
          })
        }
        this._getUserChart()
      })
    },
    filterlist: function (index) {
      this.user.ref_date = []
      this.user.visit_total = []
      this.user.share_uv = []
      this.user.share_pv = []
      this.currentindex = index
      if (index === 0) {
        this.getSummarytrend('day')
      }
      if(index === 1) {
        this.getSummarytrend('week')
      }
      if(index === 2) {
        this.getSummarytrend('month')
      }
    },
    getVisittrend (type) {
      api.visittrend({type: type, appid: this.appid}).then(res => {
        var _this = this
        if (res.list) {
          res.list.map(function(item) {
            _this.trend.ref_date.push(item.ref_date)
            _this.trend.visit_uv_new.push(item.visit_uv_new)
            _this.trend.stay_time_session.push(item.stay_time_session)
            _this.trend.stay_time_uv.push(item.stay_time_uv)
            _this.trend.visit_depth.push(item.visit_depth)
            _this.trend.session_cnt.push(item.session_cnt)
            _this.trend.visit_pv.push(item.visit_pv)
            _this.trend.visit_uv.push(item.visit_uv)
          })
        }
        this._getTrendChart()
      })
    },
    filterlist2: function (index) {
      this.trend.ref_date = []
      this.trend.visit_uv_new = []
      this.trend.stay_time_session = []
      this.trend.stay_time_uv = []
      this.trend.visit_depth = []
      this.trend.session_cnt = []
      this.trend.visit_pv = []
      this.trend.visit_uv = []
      this.currentindex2 = index
      if (index === 0) {
        this.getVisittrend('day')
      }
      if(index === 1) {
        this.getVisittrend('week')
      }
      if(index === 2) {
        this.getVisittrend('month')
      }
    },
    getRetaininfo (type) {
      api.retaininfo({type: type, appid: this.appid}).then(res => {
        var _this = this
        if (res.list) {
          res.list.map(function(item) {
            _this.retained.ref_date.push(item.ref_date)
            _this.retained.visit_uv.push(item.visit_uv)
            _this.retained.visit_uv_new.push(item.visit_uv_new)
          })
        }
        this._getRetainedChart()
      })
    },
    filterlist3: function (index) {
      this.retained.ref_date = []
      this.retained.visit_uv = []
      this.retained.visit_uv_new = []
      this.currentindex3 = index
      if (index === 0) {
        this.getRetaininfo('day')
      }
      if(index === 1) {
        this.getRetaininfo('week')
      }
      if(index === 2) {
        this.getRetaininfo('month')
      }
    },
    _getUserChart () {
      this.myChart1.setOption({
        title: {
          show: false
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['累计用户数', '累计分析次数', '累计分享人数'],
          right: '4%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false
        },
        color: this.color,
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 14
            }
          },
          data: this.user.ref_date
        }],
        yAxis: [{
          axisLine: {
            show: false
          },
          nameLocation: 'end',
          nameGap: 20,
          nameRotate: 0,
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#efefef'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 14
            }
          },
          type: 'value',
          nameTextStyle: {
            color: '#999'
          }
        }],
        series: [{
          name: '累计用户数',
          type: 'line',
          data: this.user.visit_total
        }, {
          name: '累计分析次数',
          type: 'line',
          data: this.user.share_pv
        }, {
          name: '累计分享人数',
          type: 'line',
          data: this.user.share_uv
        }]
      })
    },
    _getTrendChart() {
      this.myChart2.setOption({
        title: {
          show: false
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增用户数', '人均停留时间', '次均停留时间', '平均访问深度', '打开次数', '访问次数', '访问人数'],
          right: '4%',
          width: 600
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false
        },
        color: this.color,
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 14
            }
          },
          data: this.trend.ref_date
        }],
        yAxis: [{
          axisLine: {
            show: false
          },
          nameLocation: 'end',
          nameGap: 20,
          nameRotate: 0,
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#efefef'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 14
            }
          },
          type: 'value',
          nameTextStyle: {
            color: '#999'
          }
        }],
        series: [{
          name: '新增用户数',
          type: 'line',
          data: this.trend.visit_uv_new
        }, {
          name: '人均停留时间',
          type: 'line',
          data: this.trend.stay_time_uv
        }, {
          name: '次均停留时间',
          type: 'line',
          data: this.trend.stay_time_session
        }, {
          name: '平均访问深度',
          type: 'line',
          data: this.trend.visit_depth
        }, {
          name: '打开次数',
          type: 'line',
          data: this.trend.session_cnt
        }, {
          name: '访问次数',
          type: 'line',
          data: this.trend.visit_pv
        }, {
          name: '访问人数',
          type: 'line',
          data: this.trend.visit_uv
        }]
      })
    },
    _getRetainedChart() {
      this.myChart3.setOption({
        title: {
          show: false
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增用户留存', '活跃用户留存'],
          right: '4%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false
        },
        color: this.color,
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 14
            }
          },
          data: this.retained.ref_date
        }],
        yAxis: [{
          axisLine: {
            show: false
          },
          nameLocation: 'end',
          nameGap: 20,
          nameRotate: 0,
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#efefef'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#999',
              fontSize: 14
            }
          },
          type: 'value',
          nameTextStyle: {
            color: '#999'
          }
        }],
        series: [{
          name: '新增用户留存',
          type: 'line',
          data: this.retained.visit_uv_new
        }, {
          name: '活跃用户留存',
          type: 'line',
          data: this.retained.visit_uv
        }]
      })
    }
  },
  created () {
    this.appid = this.$route.params.appid
    console.log(this.appid)
    if (this.miniApp.appid) {
      this.$nextTick(() => {
        this.myChart1 = echarts.init(document.querySelector('.user_echarts'))
        this.myChart2 = echarts.init(document.querySelector('.trend_echarts'))
        this.myChart3 = echarts.init(document.querySelector('.retained_echarts'))
      })
      this.getSummarytrend('day')
      this.getVisittrend('day')
      this.getRetaininfo('day')
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
#dataCount{
  padding-bottom: 21px;
  margin-top: -20px;
}
.dc_item{
  position: relative;
  padding: 0 21px 40px;
  border-top: 10px solid #f5f5f5;
}
.dc_item:first-child{
  border-top: none;
}
.dc_item h2{
  padding: 22px 0 25px;
  line-height: 32px;
  color: #333;
  font-weight: bold;
  font-size: 16px;
}
.dc_item h2 button{
  float: right;
  line-height: 30px;
  border: 1px solid #ddd;
  background: none;
  width: 90px;
  border-radius: 3px;
}
.user_echarts,.trend_echarts,.retained_echarts{
  height: 375px;
}
ul.tabnav{
  position: absolute;
  top: 65px;
  left: 21px;
  z-index: 1;
}
.nodata{
  text-align: center;
  padding-top: 20px;
  color: #f00; 
}
</style>
