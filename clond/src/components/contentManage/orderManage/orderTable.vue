<template>
  <div class="ordertable">
    <div class='om_search'>
      <label>
        订单编号：
        <input type='text' />
      </label>
      <label>
         收件人姓名： 
        <input type='text' />
      </label>
      <label>
        手机号：
        <input type='text' />
      </label>
      <button><i class='icon_search'></i>搜索</button>
    </div>
    <div class='om_nav'>
      <ul class='tabnav'>
        <li 
          v-for='(list,index) in navLists' 
          :class='{"current":index==currentindex, "litwo":index == currentindex && index != 0}' 
          v-text='list'
          @click='filterlist(index)'>
        </li>
      </ul>
    </div>
    <div class='om_table'>
      <el-table
        :data="orderList"
        style="width: 100%"
        @expand="expandRow"
        empty-text="抱歉，你还没有相关的订单信息..." >
        <el-table-column type="expand" width="63">
          <template scope="props">
            <div class="od_block" v-loading.body="props.loading">
              <div class="od_info">
                <ul class="order_list">
                  <li class="header">
                    <span class="od_img">商品图片</span>
                    <span class="od_name">商品名称</span>
                    <span class="od_price">单价</span>
                    <span class="od_number">数量</span>
                  </li>
                  <li v-for="(goods, index) in props.row.ordProducts">
                    <span class="od_img"><img :src="goods.thumbnailUrl"></span>
                    <span class="od_name ell2">{{ goods.productName }}</span>
                    <span class="od_price">{{ goods.salePrice }}</span>
                    <span class="od_number">{{ goods.buyNum }}</span>
                  </li>
                </ul>
                <div class="od_logistics_info">
                  <div class="title">物流信息追踪</div>
                  <div class="odl_info">
                    <p class="express-compony">物流公司:  </p>
                    <div class="timeline-wrap">
                      <div class="timeline">
                        <ul :data-tr = "props.row.traces">
                          <li class="direction-r" 
                              v-for="(logistics, index) in props.row.traces"
                              :class='{"active" : 0 === index}'>
                            <span class="time">{{ logistics.AcceptTime }}</span>
                            <div class="desc">{{ logistics.AcceptStation }}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="od_deliver-info">
                <el-tooltip content="Top center" placement="top">
                  <em>收货信息：</em> 
                </el-tooltip>
                {{ props.row.user.name }}, {{ props.row.user.phone }}, {{ props.row.user.address }}
                <em v-if="goodsInfo.user && goodsInfo.user.mark">备注：</em>{{ props.row.mark }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="165" label="订单编号" prop="id" class-name="first-cell"> </el-table-column>
        <el-table-column width="65" label="数量" prop="productCount"> </el-table-column>
        <!-- prop="createDate" :formatter="formatDate" -->
        <el-table-column width="123" label="下单时间" class-name="ell">
          <template scope="scope"> 
            <el-tooltip class="item" placement="top-center">
            <div slot="content">多行信息<br/>第二行信息</div>
              <span>{{ scope.row.createDate | formatDate }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column width="115" label="发货时间" prop="shipDate" :formatter="formatDate" class-name="ell"> </el-table-column>
        <el-table-column width="83" label="发货快递" prop="shipCompanyName"> </el-table-column>
        <el-table-column width="120" label="快递单号" prop="shipDeliveryCode" class-name="ell"> </el-table-column>
        <el-table-column width="85" label="订单状态" prop="status" :formatter="formatStatus"> </el-table-column>
        <el-table-column width="85" label="订单金额" prop="totalPrice"> </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button class="show-detail" :class="{'active': scope.row.showdetail == true}" type="text" size="small">展开明细 <i class='icon_triangle'></i></el-button>
            <el-button type="text" @click='gotoDetailPage(scope.row.id)' size="small">查看详情</el-button>
            <el-button type="text" @click='openRefundDialog()' size="small">退款</el-button>
            <el-button type="text" @click='openLogisticsInfo()' size="small">填写物流</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block pagination tr">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="getOrderList">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="填写退款金额"
      v-model="refundVisible"
      size="xs"
      custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            <span class="tl">退款金额:</span>
            <input type="text" v-model="refundAmount" placeholder="请输入退款金额" @input="onlyNum()">
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_baocun" type="button" @click="saveRefundDialog()">确定</button>
            <button class="ei_b_quxiao" type="button" @click="refundVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="填写物流信息"
      v-model="logisticsInfoVisible"
      size="xs"
      custom-class="dialog-theme2 dialog-min">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix">
            <span class="tl">物流公司:</span>
            <input type="text" v-model="logisticsCompany" placeholder="请输入物流公司">
          </div>
          <div class="ei_group clearfix">
            <span class="tl">物流单号:</span>
            <input type="text" v-model="logisticsNumber" placeholder="请输入物流单号">
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_baocun" type="button" @click="saveLogisticsInfoDialog()">确定</button>
            <button class="ei_b_quxiao" type="button" @click="logisticsInfoVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../../fetch/api'
import util from '../../../assets/js/utils'
export default {
  name: 'ordertable',
  data () {
    return {
      api: 'http://localhost:3000/orderList',
      navLists: [
        '全部订单',
        '待付款',
        '待发货',
        '已发货',
        '已完成',
        '退款'
      ],
      orderList: [],
      goodsInfo: {},
      goodsList: [
        {
          img: require('assets/images/test/cm_img1.jpg'),
          name: '日本代购GRL ViVi新春版 玲奈镂空花袖套头 长袖 T恤tw157',
          price: 160,
          number: 1
        },
        {
          img: require('assets/images/test/cm_img1.jpg'),
          name: '日本代购GRL ViVi新春版 玲奈镂空花袖套头 长袖 T恤tw157',
          price: 160,
          number: 1
        }
      ],
      deliverInfo: {
        name: '周红静',
        phone: 13185953312,
        address: '浙江省 宁波市 江东区 柳明苑6号',
        mark: '我就是喜欢买买买~~~'
      },
      logisticsList: [
        {
          time: '2017-03-22 11:37:5',
          msg: '[宁波市]已签收，签收人是同事代签，感谢使用顺丰快递，期待再欠为您服务'
        },
        {
          time: '2017-03-22 11:37:45',
          msg: '[宁波市]浙江宁波江东公司派件员：上东百宁街 区域 13185953312 正在为您派件'
        },
        {
          time: '2017-03-22 11:37:45',
          msg: '[宁波市]已签收，签收人是同事代签，感谢使用顺丰快递，期待再欠为您服务'
        },
        {
          time: '2017-03-22 11:37:4',
          msg: '[宁波市]已签收，签收人是同事代签，感谢使用顺丰快递，期待再欠为您服务'
        }
      ],
      currentindex: 0,
      refundVisible: false,
      refundAmount: '',
      logisticsInfoVisible: false,
      logisticsCompany: '',
      logisticsNumber: '',
      total: 0,
      status: null
    }
  },
  created: function () {
    this.getOrderList()
  },
  methods: {
    getOrderList: function (page = null) {
      api.ordList({status: this.status, pageNum: page, pageSize: 20}).then(res => {
        if (res.code === 100) {
          this.orderList = res.data.list
          this.total = res.data.total
        }
      })
    },
    filterlist: function (index) {
      this.currentindex = index
    },
    openRefundDialog: function () {
      this.refundAmount = ''
      this.refundVisible = true
    },
    onlyNum: function () {
      let t = this.refundAmount.charAt(0)
      this.refundAmount = this.refundAmount.replace(/[^\d\\.]/g, '')
      this.refundAmount = this.refundAmount.replace(/^\./g, '')
      this.refundAmount = this.refundAmount.replace(/\.{2,}/g, '.')
      this.refundAmount = this.refundAmount.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      if (t === '-') {
        this.refundAmount = '-' + this.refundAmount
      }
    },
    saveRefundDialog: function () {
      this.refundVisible = false
    },

    // 填写物流
    openLogisticsInfo: function () {
      this.logisticsCompany = ''
      this.logisticsNumber = ''
      this.logisticsInfoVisible = true
    },
    saveLogisticsInfoDialog: function () {
      this.logisticsInfoVisible = false
    },

    // 查看详情
    gotoDetailPage: function (orderId) {
      this.$store.dispatch('setIsOrderDetail', true)
      this.$store.dispatch('setOrderId', orderId)
    },

    // 展开明细
    expandRow: function (row, expanded) {
      if (expanded) {
        row.loading = true
      } else {
        row.loading = false
      }
      // console.log(row)
      if (!row.ordProducts) {
        row.user = {
          name: '',
          phone: '',
          address: ''
        }
        api.ordDetail({ordId: row.id}).then(res => {
          if (res.code === 100) {
            let _user = res.data.userAddress
            row.ordProducts = res.data.ordProducts
            row.user = _user
            row.user.address = _user.province + ' ' + _user.city + ' ' + _user.district + ' ' + _user.street
            row.mark = res.data.mark
          }
        })
      }
      if (!row.traces) {
        api.ordTrack({ordId: row.id}).then(res => {
          if (res.code === 100) {
            row.traces = res.data.Traces
          }
        })
      }
      row.showdetail = !row.showdetail
    },

    // 格式化时间
    formatDate: function (row, column) {
      let _d = column.property === 'createDate' ? new Date(row.createDate) : new Date(row.shipDate)
      return util.formatDate(_d, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStatus: function (row, column) {
      let _statusArr = ['待支付', '待发货', '待确认', '待评价', '已完成', '已关闭', '退款']
      return _statusArr[row.status]
    }
  },
  comnputed: {
  },
  filters: {
    formatDate: function (date) {
      let _d = new Date(date)
      return util.formatDate(_d, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  watch: {
  }
}
</script>



<style scoped>
.om_search{
  padding: 14px 0;
  line-height: 30px;
  font-size: 0;
}
.om_search label{
  margin-right: 18px;
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
.om_nav ul{
  display: inline-block;
  margin-bottom: 10px;
}
.om_nav ul li{
  width: 98px;
}

.om_table table{
  border: 1px solid #ddd;
}
.om_table th,.om_table td{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.om_table th:first-child,.om_table td:first-child{
  padding-left: 20px;
}
.om_table th:last-child,.om_table td:last-child{
  padding-right: 20px;
}
.om_table th{
  background-color: #f5f5f5;
  line-height: 40px;
  font-weight: bold;
}
.om_table td{
  border-bottom: 1px dashed #e2e2e2;
  line-height: 47px;
}
td.lasttd a{
  color: #0088cc;
}
.icon_triangle{
  height: 2px;
  display: inline-block;
  border-top: 5px solid #0088cc;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  transition: all .3s;
}

.paging{
  padding:21px 0 0;
}

.od_info{
  width: 100%;
  position: relative;
  padding-left: 560px;
  border-top:1px solid #f5f5f5;
  box-sizing: border-box;
}
.order_list{
  width: 560px;
  position: absolute;
  left: 0;
  height: 100%;
}
.order_list:after{
  content: '';
  background-color: #ddd;
  width: 1px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
}
.order_list li{
  padding: 12px 0;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
.order_list li:last-child{
  border-bottom: none;
}
.order_list .header{
  height: 40px;
  border-bottom: 1px solid #ddd;
  background-color: #f5f5f5;
  color: #000;
  font-weight: bold;
  line-height: 40px;
  padding: 0;
}
.order_list span{
  display: inline-block;
  padding: 0 20px;
  box-sizing: border-box;
  vertical-align: middle;
  white-space: normal;
  line-height: 24px;
}
.order_list .od_img {
  width: 96px;
}
.order_list .od_img img{
  width: 52px;
  height: 52px;
  border: 1px solid #ddd;
}
.order_list .od_name {
  width: 280px;
}
.order_list .od_price{
  width: 85px;
  color: #ffbf00;
}
.order_list .od_number {
  width: 86px;
}
.order_list .header .od_price{
  color: #000;
}

.od_logistics_info{
  width: 100%;
  background-color: #f5f5f5;
}
.od_logistics_info .title{
  border-bottom: 1px solid #ddd;
  background-color: #f5f5f5;
  color: #000;
  font-weight: bold;
  line-height: 40px;
  height: 40px;
  text-align: center;
}
.od_logistics_info .odl_info{
  background-color: #f5f5f5;
  padding: 12px 20px;
}
.od_logistics_info .express-compony{
  height: 21px;
  line-height: 21px;
}

/* timeline */
.timeline-wrap{
  padding: 5px;
  background-color: #fff;
}
.timeline{
  height: 102px;
  overflow:hidden;
  overflow-y: auto;
}

.timeline ul {
  position: relative;
  width: 508px;
  list-style-type: none;
  box-sizing: border-box;
}

.timeline ul:before {
  position: absolute;
  left: 15px;
  top: 5px;
  content: ' ';
  display: block;
  width: 2px;
  height: 100%;
  margin-left: -3px;
  background-color: #ddd;
  z-index: 1;
}
.timeline ul:after{
  content: ' ';
  position: absolute;
  background-color: #fff;
  width: 5px;
  height: 40px;
  left: 12px;
  bottom: -5px;
  z-index: 2;
}

.timeline li {
  padding-left: 200px;
  position: relative;
  padding-right: 35px;
}
.direction-r:before{
  content: '';
  position: absolute;
  top: 4px;
  left: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #bbb;
  border: 2px solid #fff;
  z-index: 9;
}
.timeline li .time{
  position: absolute;
  left: 30px;
  top: 0;
  color: #999;
  line-height: 20px;
}
.timeline li .desc {
  line-height: 1.6;
  margin-bottom: 20px;
  color: #999;
  white-space: normal;
}
.timeline .active:before{
  left: 8px;
  width:10px;
  height: 10px;
  background-color: #18ccc0;
  border: none;
  box-shadow: 0 0 2px 3px rgba(24,204,192,.36);  
}
.timeline .active .time,
.timeline .active .desc{
  color: #333;
}

.od_deliver-info{
  border-top: 1px solid #ddd;
  background-color: #f5f5f5;
  line-height: 40px;
}
.od_deliver-info em{
  font-weight: 600;
  display: inline-block;
  margin-left: 20px;
}

.timeline::-webkit-scrollbar {
  width: 6px; 
  height: 4px;
  padding-right: 5px;
  padding-top: 5px; 
}
.timeline::-webkit-scrollbar-track-piece {
  background-color: #f5f5f5; 
}
.timeline::-webkit-scrollbar-thumb:vertical {
  border:1px solid #ddd;
  background-color: #ddd;
  -webkit-border-radius: 5px;
}
.timeline::-webkit-scrollbar-thumb:horizontal {
  border:1px solid #ddd;
  background-color: #ddd;
  -webkit-border-radius: 3px;
}
.timeline::-webkit-scrollbar-thumb:hover {
  background-color:#ddd;
  -webkit-border-radius: 3px;
}
.show-detail{
  position: relative;
  margin-right: 15px !important;
  display: inline-block !important;
}
.show-detail .icon_triangle{
  position: absolute;
  top: 12px;
  right: -13px;
}
.om_table .show-detail.active{
  color: #18ccc0 !important;
}
.om_table .show-detail.active .icon_triangle{
  top: 9px;
  transform:rotate(180deg);
  border-top-color: #18ccc0 !important;
}
.ell .cell{
  word-break: initial;
}
.ell2{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-inline-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
