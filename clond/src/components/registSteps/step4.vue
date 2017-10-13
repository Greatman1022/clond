<template>
  <div id='step4'>
    <div id="wrap" class="hd">
      <img src="../../assets/images/regist/4.png" alt="">
    </div>
    <transition name="component-fade" mode="out-in">
      <div class="step4">
        <div class="tips">
          <img src="../../assets/images/regist/审核.png" alt="">
          <i>订单审核中</i>
        </div>
        <p>您的订单正在审核中，审核派单成功后会将审核公司信息推送至微信管理员，请耐心等待...</p>
        <router-link to="/registAgent"><button type="button" name="returnBtn">返回</button></router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'step4',
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
*{box-sizing:border-box;}
.step4{
  min-height: 570px;
}
div.tips{
  margin: 50px auto 25px;;
  display: block;
  width: 135px;
  font-size: 16px;
  color: #333333;
}
p{
  width: 570px;
  margin: 0 auto;
}
button{
  width: 150px;
  height: 42px;
  border-radius: 3px;
  display: block;
  margin: 20px auto 0;
  background: #fff;
  color: #666666;
  margin-top: 80px;
  font-size: 14px;
  border: 1px solid #d6d6d6;
}
</style>
