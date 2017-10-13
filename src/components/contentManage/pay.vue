<template>
  <div class='pay'>
    <div class='pd_width frameWidth'>
      <div class='pay_top'>
        <span><em>你选择的订单提交成功</em>支付成功后即可运用该模版</span>
      </div>
      <div class='pay_con' v-if='agentpay==false'>
        <p><span class='grbyColer'>购买项目：</span>{{appDetail.temp.name}} </p>
        <p><span class='grbyColer'>需支付：</span><span class='orangeColor'><em>{{appDetail.temp.price}}</em> 元</span></p>
        <p>
          <a :href="'http://cloud.vdongchina.com/guard/payment?orderId='+orderId">
            <el-button @click='goPay'>马上支付</el-button>
          </a>
        </p>
      </div>
      <div class='pay_con' v-else>
        <p><span class='grbyColer'>购买项目：</span>{{appDetail.temp.name}} </p>
        <div class='acnumber'>
          <p>您目前可免费创建项目：1个</p>
        </div>
        <p>
          <el-button @click='buildBtn'>确认创建</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../fetch/api.js'
export default {
  name: 'pay',
  components: {
  },
  data () {
    return {
      appid: '',
      orderId: ''
    }
  },
  computed: {
    ...mapGetters({
      agentpay: 'getAgentpay',
      appDetail: 'getAppDetail'
    })
  },
  created: function () {
    this.appid = this.$route.params.appid
    this.$store.dispatch('setAppDetail', {appid: this.appid})
    api.orderSubmit({appid: this.appid}).then(res => {
      this.orderId = res.order.id
      // console.log(res.order.id)
    })
  },
  methods: {
    goPay () {
      // this.$router.push({path: 'http://cloud.vdongchina.com/guard/payment?orderId='+this.orderId})
      // api.payment({orderId: this.orderId}).then(res => {})
    },
    buildBtn () {
      api.payDeduct({appid: this.appid}).then(res => {
        this.$router.push('/miniprograms')
      })
    }
  }
}
</script>

<style scoped>
.pay{
  padding: 20px 0;
}
.pay_top{
  margin: 0 20px;
  padding: 37px 0;
  line-height: 25px;
  text-align: center;
  border-bottom: 1px solid #d6d6d6;
}
.pay_top span{
  display: inline-block;
  color: #999;
}
.pay_top span em{
  display: inline-block;
  background: url(~assets/images/icon/icon_success.png) no-repeat;
  height: 25px;
  text-indent: 45px;
  font-size: 18px;
  color: #333;
  padding-right: 10px;
}
.pay_con{
  text-align: center;
  padding: 20px 0 70px;
}
.pay_con p{
  line-height: 40px;
  font-size: 16px;
}
p span.orangeColor em{
  font-size: 28px;
}
.pay_con button{
  background-color: #18ccc0;
  color: #fff;
  border: none;
  line-height: 20px;
  width: 130px;
  margin-top: 30px;
}
.acnumber{
  width: 228px;
  padding: 7px 0;
  display: inline-block;
  border: 1px solid #d6d6d6;
  margin-top: 20px;
}
.acnumber p{
  line-height: 30px;
}
</style>
