<template>
  <div id='step3'>
    <div id="wrap" class="hd">
      <img src="../../assets/images/regist/3.png" alt="">
    </div>
    <transition name="component-fade" mode="out-in">
      <div class="step3">
        <p class="title">微信认证</p>
        <div class="intro">
          需支付300元的审核费用，提交认证后，会在1-5个工作日完成审核，审核完成后会获得认证标识，<br>
          订阅号自定义菜单可插入外联，服务号可获得高级接口及开通支付的权限等。<a target="_blank" href="https://kf.qq.com/faq/120911VrYVrA150918fMZ77R.html?scene_id=kf3386">查看详情</a>
        </div>
        <img v-if="url" class="code" :src="url" alt="">
        <div class="tips">
          <img src="../../assets/images/regist/wechat.png" alt="">
          <i>{{ msg }}</i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../fetch/api.js'
export default {
  name: 'step3',
  data () {
    return {
      url: '',
      msg: '',
      timer: null
    }
  },
  computed: {
    ...mapGetters({
      orderidStore: 'orderidStore'
    })
  },
  methods: {
    jump() {
      api.getOrderById({order_id: this.orderidStore}).then(res => {
        if (res.success) {
          if(res.order.order_status == 1) {
            this.$router.push({path:'/registSteps/4'})
          }else {
            return
          }
        }else {
          this.msg = res.message
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    api.getWxPayCode({order_id: this.orderidStore}).then(res => {
      if (res.success) {
        this.url = res.payQrcode
        this.msg = '使用微信扫码付款'
      }else {
        this.msg = res.message
      }
    }).catch(err => {
      console.log(err)
    })
    this.jump()
    this.timer = setInterval(this.jump, 30000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
}
</script>

<style scoped>
*{box-sizing:border-box;}
.step3{
  padding: 30px 45px;
  min-height: 560px;
}
p.title{
  margin-bottom: 30px;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}
div.intro{
  line-height: 2.5;
}
div.intro a{
  color: #18ccc0;
}
img.code{
  margin: 70px auto 0;
  display: block;
  height: 172px;
  width: 172px;
}
div.tips{
  margin: 48px auto;
  display: block;
  width: 150px;
  color: #888888;
}
</style>
