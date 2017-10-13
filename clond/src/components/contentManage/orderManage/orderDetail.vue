<template>
  <div class="order-detail">
    <div class="bc_block">
      <h2>订单详情<button @click="toOrderManage">返回上层</button></h2>
      <div class="od_status"> 当前订单状态：{{ orderInfo.status | formatStatus }} </div>
    </div>
    <div class="od_block">
      <h2>收货信息</h2>
      <ul class="od_list">
        <li>
          <span class="lab">姓名:</span>
          <span class="msg">{{ orderInfo.userAddress.name }}</span>
        </li>
        <li>
          <span class="lab">手机号:</span>
          <span class="msg">{{ orderInfo.userAddress.phone }}</span>
        </li>
        <li>
          <span class="lab">收货地址:</span>
          <span class="msg">{{ orderInfo.userAddress.province }} {{ orderInfo.userAddress.city }} 
          {{ orderInfo.userAddress.district }} {{ orderInfo.userAddress.street }}</span>
        </li>
        <li>
          <span class="lab">备注:</span>
          <span class="msg">{{ orderInfo.mark ? orderInfo.mark : '无'}}</span>
        </li>
      </ul>
    </div>
    <div class="od_block">
      <h2>订单信息</h2>
      <div class="order_info">
        <ul class="oi_list">
          <li class="item1">订单编号：{{ orderInfo.code }}</li>
          <li class="item2">微信支付流水号：{{ orderInfo.payWxSerialNumber }}</li>
          <li class="item3">下单时间：{{ orderInfo.createDate | formatDate }}</li>
        </ul>
        <ul class="oi_list">
          <li class="item1" v-if="orderInfo.shipDate">发货时间：{{ orderInfo.shipDate | formatDate }}</li>
          <li class="item2">快递单号：{{ orderInfo.shipDeliveryCode ? orderInfo.shipDeliveryCode : '暂未发货'}}</li>
        </ul>
      </div>
      <div class="od_info">
        <ul class="order_list">
          <li class="header">
            <span class="od_img">商品图片</span>
            <span class="od_name">商品名称</span>
            <span class="od_price">单价</span>
            <span class="od_number">数量</span>
          </li>
          <li v-for="(goods, index) in orderInfo.ordProducts">
            <span class="od_img"><img :src="goods.img"></span>
            <span class="od_name">{{ goods.productName }}</span>
            <span class="od_price">{{ goods.salePrice }}</span>
            <span class="od_number">{{ goods.buyNum }}</span>
          </li>
        </ul>
        <div class="od_logistics_info">
          <div class="title">物流信息追踪</div>
          <div class="odl_info">
            <p>物流公司: {{ orderInfo.shipCompanyName ? vorderInfo.shipCompanyName : '暂未发货'}} </p>
            <div class="timeline-wrap">
              <div class="timeline">
                <ul v-if="orderInfo.instantResult">
                  <li class="direction-r" 
                      v-for="(logistics, index) in orderInfo.instantResult.Traces"
                      :class='{"active" : 0 === index}'>
                    <span class="time">{{ logistics.AcceptTime }}</span>
                    <div class="desc">{{ logistics.AcceptStation }}</div>
                  </li>
                </ul>
                <p class="" v-else> 暂无物流信息 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="od_total">
        实际收款: <em>{{ orderInfo.totalSalePrice }}</em> 元
      </div>
    </div>
    <div class="od_block" v-if="orderInfo.ordRefunds">
      <h2>退款记录</h2>
      <ul class="od_list refund_list">
        <li v-for="(refund, index) in orderInfo.ordRefunds">
          <span class="time">{{ refund.createDate | formatDate }}</span>
          <span class="msg">退款金额: {{ refund.msg }} 元</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../../../fetch/api'
import util from '../../../assets/js/utils'
export default {
  name: 'orderdetail',
  data () {
    return {
      orderInfo: null
    }
  },
  created: function () {
    this.getOrderInfo()
  },
  methods: {
    getOrderInfo: function () {
      let _ordId = this.$store.state.ordermanage.orderId
      api.ordDetail({ordId: _ordId}).then(res => {
        console.log(res)
        if (res.code === 100) {
          this.orderInfo = res.data
        }
      })
    },
    toOrderManage: function () {
      this.$store.dispatch('setIsOrderDetail', false)
    }
  },
  filters: {
    formatDate: function (d) {
      let _d = new Date(d)
      return util.formatDate(_d, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStatus: function (status) {
      let _statusArr = ['待支付', '待发货', '待确认', '待评价', '已完成', '已关闭', '退款']
      return _statusArr[status]
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>

<style scoped>
.order-detail{
  padding: 0 20px;
}
.bc_block{
  margin-top: 20px;
}
.bc_block h2{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 24px;
  overflow: hidden;
  line-height: 30px;
}
.bc_block button{
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  text-align: center;background-color: #fff;
  float: right;
  display: inline-block;
  width: 90px;
  line-height: 30px;
  color: #666;
}
.od_status{
  width: 100%;
  background-color:#f5f5f5;
  color: #333;
  font-weight: bold;
  font-size: 18px;
  padding: 18px 48px;
  box-sizing: border-box;
}
.od_block{
  margin-top: 20px;
}
.od_block h2{
  color:  #4dd3c9;
  font-size: 16px;
  line-height: 2;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.od_list li{
  line-height: 2.4;
  padding-left: 20px;
  color: #333;
}
.refund_list li{
  padding-left: 34px;
  position: relative;
}
.refund_list li:before{
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #999;
  position: absolute;
  left: 20px;
  top: 13px;
}
.refund_list .time{
  margin-right: 30px;
  display: inline-block;
}
.order_info{
  margin-bottom: 5px;
  width: 93%;
  margin: 0 auto 5px;
}
.oi_list:first-child{
  border-bottom: 1px solid #f1f1f1;
}
.oi_list li{
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.oi_list .item1{
  margin-left: 100px;
  width: 250px;
}
.oi_list .item2{
  width: 400px;
}
.oi_list .item3{
  width: 250px; 
}

.od_info{
  width: 100%;
  position: relative;
  padding-left: 50%;
  border:1px solid #ddd;
  background-color: #f5f5f5;
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
  background-color: #fff;
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

.od_total{
  background-color: #f5f5f5;
  border:1px solid #ddd;
  border-top: none;
  text-align: right;
  padding: 3px 20px;
  color: #333;
  font-size: 14px;
}
.od_total em{
  color: #c00;
  font-size: 22px
}


.od_logistics_info{
  width: 558px;
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
  background-color: #fff;
  padding: 12px 20px;
}

/* timeline */
.timeline-wrap{
  padding: 5px;
  background-color: #f5f5f5;
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
  background-color: #f5f5f5;
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
  background-color: #f5f5f5;
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
}
.timeline li .desc {
  line-height: 1.6;
  margin-bottom: 20px;
  color: #999;
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
</style>
