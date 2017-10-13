<template>
  <div class="footer footer-wrap">

    <div class="sm-footer">
      <div class="wrap">
        <p class="coptyright">
          浙江微动天下信息技术股份有限公司 官网: www.vdongchina.com <br />
          浙IC备16000559号-3 Copyright © 2017 cloud.vdongchina.com. All rights reserved
        </p>
      </div>
    </div>
    <!-- <div class="lg-footer">
      <div class="wrap">
        <div class="ft-info">
          <div class="ft-inro-wrap">
            <div class="ft-group">
              <span class="lab">微尘小程序</span>
              <ul>
                <li><a href="javascript:;">本地服务商</a></li>
                <li><a href="javascript:;">产品介绍</a></li>
                <li class="third">客服电话: 400-960-6092</li>
                <li><a href="javascript:;">帮助中心</a></li>
                <li><a href="javascript:;">招商加盟</a></li>
                <li class="third">联系电话: 010-59264168</li>
              </ul>
            </div>
            <div class="ft-group">
              <span class="lab">友情链接</span>
              <ul>
                <li><a href="javascript:;">微动天下</a></li>
                <li><a href="javascript:;">微动天下</a></li>
                <li><a href="javascript:;">微动天下</a></li>
              </ul>
            </div>
          </div>
          <div class="ft-qrcode-wrap">
            <div class="qrcode-img">
              <img src="~assets/images/vd_qrcode.jpg" alt="微动天下">
            </div>
            <p class="qrcode-tip">关注微尘公众号，<br />立即获得最新小程序资讯！</p>
          </div>
        </div>
        <div class="coptyright">© 2015 - 2017 vdongchian <a href="javascript:;">浙ICP备16000559号-3</a></div>
      </div>
    </div> -->

    <div class="fixed-box">
      <ul>
        <!--<li>
          <i class="icon i-msg" @click="leaveMsgVisible = true"></i>
        </li>-->
        <li>
          <i class="icon i-chat"></i>
          <dl>
            <dd><a href="http://pwt.zoosnet.net/LR/Chatpre.aspx?id=PWT85081952&lng=cn" target="_blank"><i class="i-bussiness"></i> 合作加盟</a></dd>
            <!--<dd><i class="i-qq"></i> 在线客服</dd>-->
          </dl>
        </li>
        <li>
          <i class="icon i-top" @click="gotoTop"></i>
        </li>
      </ul>
    </div>

    <el-dialog ref='dialog'
      v-model="leaveMsgVisible" size="sm"
      @open="openLeaveMsgDialog">
      <div class="ui-title">
        <span>用户留言板</span>
      </div>
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix">
            <span class="tl">姓名</span>
            <input type="text" v-model="msgForm.name" placeholder="请输入姓名">
            <!-- <p class="tip" :class="[accout.name]">{{ accout.nameTip }}</p> -->
          </div>
          <div class="ei_group clearfix">
            <span class="tl">手机号码</span>
            <input type="text" v-model="msgForm.phoneNum" placeholder="请输入手机号码">
            <!-- <p class="tip" :class="[accout.pass]">{{ accout.passTip }}</p> -->
          </div>
          <div class="ei_group clearfix">
            <span class="tl">留言</span>
            <el-input class="msg-textarea" type="textarea"
              v-model="msgForm.msg" placeholder="留言内容"></el-input>
          </div>
          <div class="ei_button ei_button_lg">
            <button class="ei_b_baocun ei_b_lg" type="button"
            @click="saveLeaveMasDialog">提交</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'footer',
  props: [],
  data () {
    return {
      leaveMsgVisible: false,
      msgForm: {
        name: '',
        phoneNum: '',
        msg: ''
      }
    }
  },
  methods: {
    openLeaveMsgDialog: function () {
      this.msgForm = {name: '', phoneNum: '', msg: ''}
    },
    saveLeaveMasDialog: function () {
      this.leaveMsgVisible = false
    },
    gotoTop: function () {
      if(document.documentElement.scrollTop) {
        document.documentElement.scrollTop = 0
      } else if(document.body.scrollTop) {
        document.body.scrollTop = 0
      }
    }
  }
}
</script>

<style scoped>
/*.footer-wrap{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}*/
.msg-textarea{
  width: 310px !important;
  height: 150px;
}
.fixed-box{
  position: fixed;
  right:-1px;
  top: 50%;
  border: 1px solid #ddd;
  z-index: 29;
}
.fixed-box li{
  height: 54px;
  width: 54px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  position: relative;
}
.fixed-box .icon{
  height: 54px;
  width: 54px;
  background: center center no-repeat;
  display: inline-block;
}
.fixed-box li:hover>dl{
  right: 55px;
}
.fixed-box dl{
  position: absolute;
  padding-right: 15px;
  width: 106px;
  right: -128px;
  top: 0;
  z-index: -1;
  transition: all .5s;
}
.fixed-box dl:before,
.fixed-box dl:after{
  content: '';
  width: 0;
  height: 0;
  font-size: 0;
  border-width: 7px 9px;
  border-style: solid;
  border-color: transparent transparent transparent #fff;
  _border-color: #fff #fff #fff;
  overflow: hidden;
  position: absolute;
  right: -2px;
  top: 12px;
  z-index: 4;
}
.fixed-box dl:after{
  border-width: 8px 10px;
  border-color: transparent transparent transparent #ddd;
  _border-color: #fff #fff #fff;
  right: -4px;
  top: 11px;
  z-index: 3;
}
.fixed-box dl dd{
  border-bottom: 1px solid #ddd;
  border: 1px solid #ddd;
  line-height: 46px;
  text-align: center;
  background-color: #fff;
  padding: 3px 10px;
}
.fixed-box dl dd a{
  display: block
}
/*.fixed-box dl dd:first-child{
  border-bottom: none;
}*/
.fixed-box dl .i-bussiness,
.fixed-box dl .i-qq{
  height: 18px;
  width: 18px;
  background: center center no-repeat;
  display: inline-block;
  vertical-align: middle;
}
.fixed-box dd .i-bussiness{
  background-image:url(~assets/images/icon/icon_business_n.png);
}
.fixed-box dd .i-qq{
  background-image:url(~assets/images/icon/icon_qq_n.png);
}
.fixed-box dd:hover>.i-bussiness{
  background-image:url(~assets/images/icon/icon_business.png);
}
.fixed-box dd:hover>.i-qq{
  background-image:url(~assets/images/icon/icon_qq.png);
}
.fixed-box .i-msg{
  background-image:url(~assets/images/icon/icon_msg_n.png);
}
.fixed-box li:hover .i-msg{
  background-image:url(~assets/images/icon/icon_msg.png);
}
.fixed-box .i-chat{
  background-image:url(~assets/images/icon/icon_chat_n.png);
}
.fixed-box li:hover .i-chat{
  background-image:url(~assets/images/icon/icon_chat.png);
}
.fixed-box .i-top{
  background-image:url(~assets/images/icon/icon_top_n.png);
}
.fixed-box li:hover .i-top{
  background-image:url(~assets/images/icon/icon_top.png);
}
.fixed-box li:last-child{
  border-bottom: none;
}
.footer{
  background-color: #fff;
  font-size: 14px;
}
.sm-footer{
  /*position: absolute;*/
  /*bottom: 0;*/
  width: 100%;
}
.sm-footer .wrap{
  border-top: 1px solid #e5e5e5;
  text-align: center;
  margin: 0 auto;
  padding: 45px 0;
}
.lg-footer{
  border-top: 1px solid #e5e5e5;
}
.lg-footer .wrap{
  width: 860px;
  margin: 0 auto;
}
.coptyright{
  line-height: 24px;
  text-align: center;
  color: #999;
}
.coptyright a{
  color: #ddd;
}

.ft-info{
  padding: 35px 0;
  position: relative;
  padding-right: 300px;
  min-height: 108px;
}
.ft-group ul{
  display: inline-block;
  width: 400px;
}
.ft-group li,
.ft-group .lab{
  width: 90px;
  margin-right: 5px;
  display: inline-block;
  vertical-align: top;
  color: #999;
  line-height: 36px;
}
.ft-group a{
  color: #999;
}
.ft-group a:hover{
  text-decoration: underline;
}
.ft-group li.third{
  width: 180px;
}
.ft-qrcode-wrap{
  position: absolute;
  right: 0;
  top: 35px;
}
.qrcode-img{
  width: 108px;
  height: 108px;
  border: 1px solid #ddd;
  display: inline-block;
}
.qrcode-img img{
  width: 100%;
  height: 100%;
}
.qrcode-tip{
  margin-left: 15px;
  display: inline-block;
  vertical-align: top;
}
</style>
