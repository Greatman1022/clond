<template>
  <div id='versionmanage'>
    <ul class='vm_data'>
      <li v-for='(vm, index) in vmList'>
        <h2>{{ vm.type }}</h2>
        <div class="">
          <div class="li_version">
            <span class="lab tc">版本号</span>
            <span class="version tc">{{ vm.versionNum }}</span>
          </div>
          <div class='li_con'>
            <p>
              <span class="lab">开发者</span>
              <span class="txt">{{ vm.publisher }}</span>
            </p>
            <p>
              <span class="lab">发布时间</span>
              <span class="txt">{{ vm.releaseTime }}</span>
            </p>
            <p>
              <span class="lab">描述</span>
              <span class="txt">{{ vm.desc }}</span>  
            </p>
          </div>

          <div class="li_qrcode">
            <div class="qrcode_tip" v-if="vm.state == 1">
              <input type="button" value="发布版本">
            </div>
            <div class="qrcode_tip" v-else-if="vm.state == 2">
              <span class="redColor" >审核未通过</span>
            </div>
            <div class="rqcode_wrap" v-else-if="vm.state == 3">
              <div class="qr_img">
                <img :src="vm.qrCode">
              </div>
              <div class="qr_text">
                体验版 <img :src="vm.qrCode">
              </div>
            </div>
            <div class="qrcode_tip" v-else-if="vm.state == 4">
              <input type="button" value="重新提交该版本" @click="resubmitVisible = true">
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="btn_group">
      <input type='button' value='发布体验版' />
      <input type='button' value='提交当前审核版本' @click="dialogAuditNotice = true"/>
    </div>

    <el-dialog ref='dialog' v-model="dialogAuditNotice" size="md">
      <div class="ui-title">
        <span>提交审核的相关须知</span>
      </div>
      <div class="content">
        <div class="editInfo">
          <div class="i-tip-wrap">
            <img src="~assets/images/test/icon_notes.png">
            <p class="i-tip"> 确认提交审核？</p>
          </div>
          <dl class="">
            <dt>提交给微信团队审核前，请确保:</dt>
            <dd>提交的小程序功能完整，可以正常打开和运行，而不是测试版或Demo<br />
            小程序的调试和预览可以开发者工具进行。多次提交测试内容或Demo，将收到相应处罚。</dd>
            <dd>已仔细阅读<a href="https://mp.weixin.qq.com/debug/wxadoc/product/index.html" target="_blank">《微信小程序平台运营规范》</a>和<a href="https://mp.weixin.qq.com/debug/wxadoc/product/reject.html" target="_blank">《微信小程序平台审核常见被拒绝情形》</a></dd>
          </dl>
          <el-checkbox v-model="notesChecked" :change="checkNotes">我已阅读并了解平台审核规范规则</el-checkbox>
          <div class="ei_button ei_button_lg ei_mt10">
            <button class="ei_b_baocun ei_b_lg" :class="[notesChecked ? 'btn_ok' : 'btn_disabed']" type="button" @click="openConfigDialog">确定提交</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog ref='dialog' v-model="dialogConfig" size="md" custom-class="config-dialog">
      <div class="ui-title">
        <span>配置功能页面</span>
      </div>
      <div class="content">
        <div class="editInfo">
         <h3>至少填写一组，填写正确的信息有利于用户快速搜索出你的小程序</h3>
          <div class="ei_group clearfix">
            <span class="tr">功能页面</span>
            <el-select v-model="fnType" placeholder="请选择">
            <el-option
              v-for="item in fnList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </div>
          <div class="ei_group clearfix">
            <span class="tr">标题</span>
            <input type="text" class="title-count" v-model="configTitle" @input="strCountLimit()">
            <span class="title-count-info"><em>{{ strCount }}</em>/32</span>
          </div>
          <div class="ei_group clearfix">
            <span class="tr">所在服务类目</span>
            <div class="el_address">
              <el-select v-model="service" placeholder="生活服务">
                <el-option
                  v-for="item in serviceList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.id">
                </el-option>
              </el-select>
              <el-select v-model="service2" placeholder="请选择">
                <el-option
                  v-for="item in serviceList2"
                  :label="item.label"
                  :value="item.value"
                  :key="item.id">
                </el-option>
              </el-select>
            </div>
            <p class="tip-info">功能页面和服务类目必须一一对应，且提供的内容必须符合该类目范围</p>
          </div>
          <div class="ei_group clearfix ei_mt">
            <span class="tr">标题</span>
            <input type="text" v-model="configTitle2">
            <p class="tip-info">标签用回车分开，填写与页面功能相关的标签，更容易被搜索</p>
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_baocun ei_b_lg" type="button" @click="saveConfigDialog">提交审核</button>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="重新提交"
      v-model="resubmitVisible"
      size="xs"
      custom-class="dialog-theme2">
      <div class="content">
        <div class="editInfo">
          <div class="ei_group clearfix ei_mt10">
            重新提交该版本，您当前线上版本将会呗代替，您确定琮要提交历史版本吗？
          </div>
          <div class="ei_button ei_button_lg ei_mt20">
            <button class="ei_b_baocun" type="button" @click="saveResubmitDialog">确定</button>
            <button class="ei_b_quxiao" type="button" @click="resubmitVisible = false">取消</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let vmList = [
  {
    type: '线上版本',
    versionNum: 'V1.7',
    publisher: '王大妈',
    releaseTime: '2017-4-14 11:46:00',
    desc: '分享功能完善',
    state: 1,
    qrCode: ''
  },
  {
    type: '审核版本',
    versionNum: 'V1.7',
    publisher: '王大妈',
    releaseTime: '2017-4-14 11:46:00',
    desc: '分享功能完善',
    state: 2,
    qrCode: ''
  },
  {
    type: '体验版本',
    versionNum: 'V1.7',
    publisher: '王大妈',
    releaseTime: '2017-4-14 11:46:00',
    desc: '分享功能完善',
    state: 3,
    qrCode: require('assets/images/test/qrcode.jpg')
  },
  {
    type: '历史版本',
    versionNum: 'V1.7',
    publisher: '王大妈',
    releaseTime: '2017-4-14 11:46:00',
    desc: '分享功能完善',
    state: 4,
    qrCode: ''
  }
]
export default {
  name: 'versionmanage',
  data () {
    return {
      vmList: vmList,
      fnList: [],
      serviceList: [],
      serviceList2: [],
      strCount: 0,
      dialogAuditNotice: false,
      notesChecked: false,
      dialogConfig: false,
      fnType: '',
      configTitle: '',
      service: '',
      service2: '',
      configTitle2: '',
      resubmitVisible: false
    }
  },
  methods: {
    checkNotes: function () {
      this.notesChecked = !this.notesChecked
    },
    openConfigDialog: function () {
      if (this.notesChecked) {
        this.dialogConfig = true
        this.dialogAuditNotice = false
      }
    },
    saveConfigDialog: function () {
      this.dialogConfig = false
    },
    strCountLimit: function () {
      this.configTitle = this.configTitle.substr(0, 32)
      this.strCount = this.configTitle.length
    },
    saveResubmitDialog: function () {
      this.resubmitVisible = false
    }
  },
  comnputed: {
  }
}
</script>

<style scoped>
#versionmanage{
  padding: 0 21px 21px;
}
.vm_data li{
  margin-top: 28px;
  padding: 0 17px 20px;
  overflow: hidden;
  border-bottom: 1px dashed #ccc;
  position: relative;
}
.vm_data h2{
  font-size: 18px;
  padding-bottom: 22px;
}
.li_version{
  float: left;
  width: 80px;
  height: 80px;
  background-color: #f5f5f5;
  padding: 14px 0;
  box-sizing: border-box;
}
.li_version span{
  display: block;
}
.li_version .lab{
  color: #bbb;
}
.li_version .version{
  color: #333;
  font-size: 18px;
  font-weight: 500;
}
.li_con{
  float: left;
  line-height: 26px;
  margin-left: 50px;
}
.li_con .lab{
  width: 105px;
  color: #999;
  display: inline-block;
}
.li_con .txt{
  color: #000;
}
.li_qrcode{
  position: absolute;
  right: 15px;
  bottom: 20px;
}
.qrcode_tip{
  margin-right: 40px;
  margin-bottom: 24px;
}
.rqcode_wrap{
  height: 110px;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  position: relative;
  padding-right: 28px;
  background-color: #e4e4e4;
}
.rqcode_wrap .qr_img{
  background-color: #fff;
  width: 105px;
  height: 108px;
  box-sizing: border-box;
}
.rqcode_wrap .qr_img img{
  width: 90px;
  height: 90px;
  padding: 10px 7.5px;
}
.qr_text{
  position: absolute;
  right: 0;
  top: 15px;
  text-align: center;
  padding: 0 8px;
  width: 28px;
  box-sizing: border-box;
  display: inline-block;
  background-color: #e4e4e4;
}
.i-tip-wrap{
  text-align: center;
  margin: 50px auto 30px;
}
.i-tip-wrap .i-tip{
  font-size: 16px;
  margin-top: 20px;
  color: #000;
}
dl{
  color: #999;
  line-height: 32px;
}
dl dd{
  position: relative;
  padding-left: 32px;
}
dl dd:before{
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border:2px solid #bbb;
  border-radius: 50%;
  left: 11px;
  top: 11px;
}
dl dd a{
  color: #18ccc0;
}
dl dd a:hover{
  text-decoration: underline;
}
.btn_group{
  margin: 20px 10px 50px;
}

input[type='button']{
  background-color: #18ccc0;
  border-radius: 3px;
  border: none;
  padding: 0 20px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
}
input[type='button']:hover,
input[type='button']:foucs{
  
}
.btn_group input[type='button']{
  margin-right: 17px;
}

.config-dialog.el-dialog.el-dialog--md .el-input__inner{
  background-color: #fafafa !important;
}
.title-count{
  padding-right: 50px;
  box-sizing: border-box;
}
.title-count-info{
  position: absolute;
  right: 30px;
  width: inherit !important;
  padding-right: 10px !important;
}

</style>
