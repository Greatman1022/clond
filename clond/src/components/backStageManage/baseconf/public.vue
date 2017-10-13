<template>
    <div id='public'>
        <div class='bc_block'>
        <h2>公众号管理</h2>
        <div class='bc_item'>
          <p class='p_line'>
            <i class='icon'></i>
            <span class='first'>链接复制</span>
            <span class='grbyColer' v-text='publicnum'></span>
            <a href='javascript:void(0)' v-clipboard="publicnum" @success="handleSuccess('复制成功')" @error="handleError('复制失败')">复制</a>
          </p>
        </div>
        <div class='bc_item'>
          <p class='p_line'>
            <i class='icon'></i>
            <span class='first'>微信公众号绑定</span>
            <span class='grbyColer'>为你了您的操作方便，请绑定微信公众号</span>
            <!-- <a href='javascript:void(0)' @click='bind()' v-if='!appDetail.wxAppid'>绑定</a> -->
            <a href='javascript:void(0)' @click='bind()' v-if='!appDetail.wxAppid'>绑定</a>
            <em v-else>已绑定</em>
          </p>
        </div>
        <!-- {{wxApp}} -->
        <div class='bc_item'>
          <p class='p_line'>
            <i class='icon'></i>
            <span>公众号商户配置信息</span>
          </p>
          <ul>
            <li>
              <label>
                <span>微信支付商户号：</span>
                <input type='text' name='wxname' placeholder="请输入微信支付商户号" v-model='wxApp.mchId' :disabled='wxMDisabled' />
              </label>
            </li>
            <li>
              <label>
                <span>支付API密钥：</span>
                <input type='text' name='wxname' placeholder="请输入支付API密钥" v-model='wxApp.payKey' :disabled='wxPDisabled' />
              </label>
            </li>
            <li>
              <span>支付证书：</span>
              <em class='clientshow'>{{wxApp.apiclientCertFileName}}</em>
              <el-upload class="fileload" accept='.p12' :disabled='wxADisabled' :action="'http://cloud'+ test +'.vdongchina.com/basic/config/certif?bindAppid='+wxApp.appid" name='apiclientCertFile' :show-file-list='false' :on-success='wxcertifSuccess' :class='{"btndisabled": wxADisabled==true}'>
                <el-button>上传文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传.p12文件，且不超过500kb</div>
              </el-upload>
            </li>
            <!-- <li class='pm0'>
              <span>&nbsp;</span>
              <p class='bcchoose'>
                <el-checkbox-group v-model="checkedcon" @change="setIsChoosed">
                  <el-checkbox :disabled='checkDisabled' :checked='isChoosed'>对小程序使用同样的商户配置信息</el-checkbox>
                </el-checkbox-group>
              </p>
            </li> -->
            <li>
              <span>&nbsp;</span>
              <input type='button' value='保存' :disabled='btnWDisabled' @click='wxConfigModify' :class='{"nosave": btnWDisabled==true}' />
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '../../../fetch/api.js'
export default {
  name: 'baseConf',
  components: {
  },
  data() {
    return {
      appid: null,
      publicnum: '未绑定公众号',
      // checkedcon: [],
      apiclientCertFile: '',
      identical: false,
      isChoosed: false,
      test: ''
    }
  },
  created() {
    this.test = window.location.hostname.indexOf('-test') >= 0 ? '-test' : ''
    this.appid = this.$route.params.appid
    this.$store.dispatch('setAppDetail', {appid: this.appid})
  },
  computed: {
    ...mapGetters({
      wxApp: 'getWxApp',
      checkDisabled: 'getCheckDisabled',
      wxMDisabled: 'getWxMDisabled',
      wxPDisabled: 'getWxPDisabled',
      wxADisabled: 'getWxADisabled',
      btnWDisabled: 'getBtnWDisabled',
      appDetail: 'getAppDetail'
    })
  },
  methods: {
    setIsChoosed() { // 选择小程序是否有同样配置
      this.isChoosed = !this.isChoosed
      this.$store.commit('GETISCHOOSED', this.isChoosed)
      if (this.isChoosed) {
        this.identical = true
      } else {
        this.identical = false
      }
    },
    wxcertifSuccess(res, file) {
      this.wxApp.apiclientCertFileName = file.name
    },
    minicertifSuccess(res, file) {
      this.miniClient = file.name
    },

    wxConfigModify() { /* 公众号商户配置信息修改 */
      this.$store.dispatch('setWxConfigModify', {
        appid: this.appDetail.appid,
        bindAppid: this.wxApp.appid,
        mchId: this.wxApp.mchId,
        payKey: this.wxApp.payKey,
        identical: this.identical
      })
    },
    /* 复制 */
    handleSuccess(e) {
      alert(e)
    },
    handleError(e) {
      alert(e)
    },
    bind() {
      this.$store.dispatch('setWxBind')
    }
  },
  watch: {
  }
}
</script>

<style scoped>
h2 {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 8px;
}

.bc_block h2 span {
  font-weight: normal;
}

.bc_item {
  border-bottom: 1px dashed #e2e2e2;
  padding-top: 16px;
  line-height: 15px;
}

.bc_item .p_line {
  clear: both;
  padding-bottom: 16px;
}

.bc_item .p_line i.icon {
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 6px solid transparent;
  border-left: 10px solid #ddd;
  border-bottom: 6px solid transparent;
  margin: 1px 10px 0 0;
}

.bc_item .p_line span.first {
  width: 280px;
  display: inline-block;
}

.bc_item .p_line a {
  color: #0088cc;
  float: right;
}

.bc_item .p_line em {
  color: #aaa;
  float: right;
}

.bc_item ul {
  overflow: hidden;
}

.bc_item ul li {
  width: 100%;
  padding-bottom: 20px;
  float: left;
}

.bc_item ul li span {
  width: 196px;
  display: inline-block;
  text-align: right;
  font-size: 14px;
  float: left;
  line-height: 40px;
}

.bc_item ul li label {
  float: left;
  display: inline-block;
  overflow: hidden;
  font-size: 0;
}



.bc_item ul li label input {
  line-height: 38px;
  width: 228px;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 10px;
  font-size: 14px;
}

.fileload {
  display: inline-block;
  position: relative;
  float: left;
}

.fileload em {
  border: 1px solid #ddd;
  display: block;
  width: 98px;
  line-height: 38px;
  border-radius: 3px;
  text-align: center;
  font-style: normal;
}

.fileload input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 40px;
  cursor: pointer;
  opacity: 0;
}

p.bcchoose {
  color: #999;
  cursor: pointer;
  display: inline-block;
  clear: both;
  line-height: 18px;
}

p.bcchoose i {
  display: inline-block;
  width: 12px;
  height: 20px;
  float: left;
}

p.bcchoose em {
  margin-left: 6px;
  float: left;
  font-style: normal;
}

input[type='button'] {
  background-color: #18ccc0;
  border-radius: 3px;
  border: none;
  width: 94px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  cursor: pointer;
}


.bc_item .tip {
  font-size: 14px;
  color: #f00;
}

em.clientshow {
  position: relative;
  top: 10px;
  left: -80px;
}

.nosave {
  background-color: #ccc!important;
  cursor: auto!important;
}

</style>