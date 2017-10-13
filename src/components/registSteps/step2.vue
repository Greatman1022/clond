<template>
  <div id='step2'>
    <div id="wrap" class="hd">
      <img src="../../assets/images/regist/2.png" alt="">
    </div>
    <transition name="component-fade" mode="out-in">
      <div class="step2">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm">
          <div class="formarea">
            <p class="title">主体资质认证</p>
            <div>
              <el-form-item label="认证类型" prop="customer_type">
                <el-radio-group v-model="ruleForm.customer_type">
                  <el-radio :label="1">企业</el-radio>
                  <el-radio :label="12" disabled>个体工商户</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item label="主体名称" prop="name">
              <el-input v-model="ruleForm.name" name="name" disabled></el-input>
            </el-form-item>
            <el-form-item label="营业执照注册号/统一社会信用代码：" prop="registered_id">
              <el-input v-model="ruleForm.registered_id" name="registered_id"></el-input>
            </el-form-item>
            <el-form-item label="营业执照注册号/对公账户户名：" prop="account_name">
              <el-input v-model="ruleForm.account_name" name="account_name"></el-input>
            </el-form-item>
            <el-form-item label="对公银行帐号：" prop="bank_account">
              <el-input v-model="ruleForm.bank_account" name="bank_account"></el-input>
            </el-form-item>
            <el-form-item label="对公账户开户银行：" prop="bank_name">
              <el-input v-model="ruleForm.bank_name" name="bank_name"></el-input>
            </el-form-item>
            <el-form-item label="企业工商营业执照：">
              <div class="upload">
                <div v-if="!ruleForm.business_license_stuff.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（一张）</p>
                </div>
                <img v-else :src="ruleForm.business_license_stuff.image_url" alt="" class="review">
                <input type="file" name="business_license_stuff" @change="blsSuccess"/>
              </div>
            </el-form-item>
            <el-form-item label="申请公函：">
              <div class="upload">
                <div v-if="!ruleForm.application_letter.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（一张）</p>
                </div>
                <img v-else :src="ruleForm.application_letter.image_url" alt="" class="review">
                <input type="file" name="application_letter" @change="blsSuccess"/>
              </div>
              <a class="download" href="https://wximg.gtimg.com/shake_tv/mpwiki/Application_for_certification_letter_Agent.doc" download="申请公函范例">点击下载申请公函范例样本</a>
            </el-form-item>
            <el-form-item label="其他证明材料：">
              <div class="upload">
                <div v-if="!ruleForm.other_stuff.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（一张）</p>
                </div>
                <img v-else :src="ruleForm.other_stuff.image_url" alt="" class="review">
                <input type="file" name="other_stuff" @change="blsSuccess"/>
              </div>
            </el-form-item>
          </div>
          <div class="formarea">
            <p class="title">运营者资质认证</p>
            <el-form-item label="运营者姓名：" prop="mp_operator_name">
              <el-input v-model="ruleForm.mp_operator_name" name="mp_operator_name"></el-input>
            </el-form-item>
            <el-form-item label="运营者身份证号：" prop="mp_operator_idcard_number">
              <el-input v-model="ruleForm.mp_operator_idcard_number" name="mp_operator_idcard_number"></el-input>
            </el-form-item>
            <el-form-item label="运营者手机号：" prop="mp_operator_phone">
              <el-input v-model="ruleForm.mp_operator_phone" name="mp_operator_phone"></el-input>
            </el-form-item>
            <el-form-item label="运营者座机：" prop="mp_operator_tel">
              <el-input v-model="ruleForm.mp_operator_tel" name="mp_operator_tel"></el-input>
            </el-form-item>
            <el-form-item label="运营者电子邮箱：" prop="mp_operator_email">
              <el-input v-model="ruleForm.mp_operator_email" name="mp_operator_email"></el-input>
            </el-form-item>
          </div>
          <div class="formarea">
            <p class="title">小程序/公众号命名</p>
            <el-form-item label="命名名称：" prop="nick_name">
              <el-input v-model="ruleForm.nick_name" name="nick_name" @change="check()"></el-input>
              <span class="errorMsg">{{ nameCheckResult }}</span>
            </el-form-item>
            <div>
              <el-form-item label="命名类型：" prop="naming_type">
                <el-radio-group v-model="ruleForm.naming_type">
                  <el-radio :label="1">基于商标</el-radio>
                  <el-radio :label="6">基于媒体</el-radio>
                  <el-radio :label="11">基于自选</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item label="商标注册证：" v-if="ruleForm.naming_type == 1">
              <div class="upload">
                <div v-if="!ruleForm.brand_register_stuff.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（一张）</p>
                </div>
                <img v-else :src="ruleForm.brand_register_stuff.image_url" alt="" class="review">
                <input type="file" name="brand_register_stuff" @change="blsSuccess"/>
              </div>
            </el-form-item>
            <el-form-item label="商标授权书：" v-if="ruleForm.naming_type == 1">
              <div class="upload">
                <div v-if="!ruleForm.brand_auth_stuff.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第一张）</p>
                </div>
                <img v-else :src="ruleForm.brand_auth_stuff.image_url" alt="" class="review">
                <input type="file" name="brand_auth_stuff" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.brand_auth_stuff1.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第二张）</p>
                </div>
                <img v-else :src="ruleForm.brand_auth_stuff1.image_url" alt="" class="review">
                <input type="file" name="brand_auth_stuff1" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.brand_auth_stuff2.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第三张）</p>
                </div>
                <img v-else :src="ruleForm.brand_auth_stuff2.image_url" alt="" class="review">
                <input type="file" name="brand_auth_stuff2" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.brand_auth_stuff3.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第四张）</p>
                </div>
                <img v-else :src="ruleForm.brand_auth_stuff3.image_url" alt="" class="review">
                <input type="file" name="brand_auth_stuff3" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.brand_auth_stuff4.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第五张）</p>
                </div>
                <img v-else :src="ruleForm.brand_auth_stuff4.image_url" alt="" class="review">
                <input type="file" name="brand_auth_stuff4" @change="blsSuccess"/>
              </div>
            </el-form-item>
            <el-form-item label="基于媒体命名提交材料：" v-if="ruleForm.naming_type == 6">
              <div class="upload">
                <div v-if="!ruleForm.naming_media_licesnse_stuff.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第一张）</p>
                </div>
                <img v-else :src="ruleForm.naming_media_licesnse_stuff.image_url" alt="" class="review">
                <input type="file" name="naming_media_licesnse_stuff" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.naming_media_licesnse_stuff1.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第二张）</p>
                </div>
                <img v-else :src="ruleForm.naming_media_licesnse_stuff1.image_url" alt="" class="review">
                <input type="file" name="naming_media_licesnse_stuff1" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.naming_media_licesnse_stuff2.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第三张）</p>
                </div>
                <img v-else :src="ruleForm.naming_media_licesnse_stuff2.image_url" alt="" class="review">
                <input type="file" name="naming_media_licesnse_stuff2" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.naming_media_licesnse_stuff3.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第四张）</p>
                </div>
                <img v-else :src="ruleForm.naming_media_licesnse_stuff3.image_url" alt="" class="review">
                <input type="file" name="naming_media_licesnse_stuff3" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.naming_media_licesnse_stuff4.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第五张）</p>
                </div>
                <img v-else :src="ruleForm.naming_media_licesnse_stuff4.image_url" alt="" class="review">
                <input type="file" name="naming_media_licesnse_stuff4" @change="blsSuccess"/>
              </div>
            </el-form-item>
            <el-form-item label="命中关键词提交材料：" v-if="ruleForm.naming_type == 11">
              <div class="upload">
                <div v-if="!ruleForm.naming_keyword_stuff.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第一张）</p>
                </div>
                <img v-else :src="ruleForm.naming_keyword_stuff.image_url" alt="" class="review">
                <input type="file" name="naming_keyword_stuff" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.naming_keyword_stuff1.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第二张）</p>
                </div>
                <img v-else :src="ruleForm.naming_keyword_stuff1.image_url" alt="" class="review">
                <input type="file" name="naming_keyword_stuff1" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.naming_keyword_stuff2.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第三张）</p>
                </div>
                <img v-else :src="ruleForm.naming_keyword_stuff2.image_url" alt="" class="review">
                <input type="file" name="naming_keyword_stuff2" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.naming_keyword_stuff3.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第四张）</p>
                </div>
                <img v-else :src="ruleForm.naming_keyword_stuff3.image_url" alt="" class="review">
                <input type="file" name="naming_keyword_stuff3" @change="blsSuccess"/>
              </div>
              <div class="upload">
                <div v-if="!ruleForm.naming_keyword_stuff4.image_url">
                  <img :src="icon_plus" alt="">
                  <p>上传扫描件<br>（第五张）</p>
                </div>
                <img v-else :src="ruleForm.naming_keyword_stuff4.image_url" alt="" class="review">
                <input type="file" name="naming_keyword_stuff4" @change="blsSuccess"/>
              </div>
            </el-form-item>
          </div>
          <div class="formarea lastform">
            <p class="title">发票部分</p>
            <div>
              <el-form-item label="是否开发票：" prop="need_invoice">
                <el-radio-group v-model="ruleForm.need_invoice">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="fp" v-if="ruleForm.need_invoice == 1">
              <div>
                <el-form-item label="发票类型：" prop="invoice_type">
                  <el-radio-group v-model="ruleForm.invoice_type">
                    <el-radio :label="0">普通发票</el-radio>
                    <el-radio :label="1">增值税专用发票</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="qyxx" v-if="ruleForm.invoice_type == 1">
                <p>企业信息</p>
                <el-form-item label="专票纳税号：" prop="tax_num">
                  <el-input v-model="ruleForm.tax_num" name="tax_num" placeholder="请输入专票纳税号"></el-input>
                </el-form-item>
                <el-form-item label="企业电话：" prop="tax_num">
                  <el-input v-model="ruleForm.enterprise_tel" name="enterprise_tel" placeholder="请输入企业电话"></el-input>
                </el-form-item>
                <el-form-item label="企业开户行：" prop="invoice_bank_name">
                  <el-input v-model="ruleForm.invoice_bank_name" name="invoice_bank_name" placeholder="请输入企业开户行"></el-input>
                </el-form-item>
                <el-form-item label="企业银行帐号：" prop="invoice_bank_account">
                  <el-input v-model="ruleForm.invoice_bank_account" name="invoice_bank_account" placeholder="请输入企业银行帐号"></el-input>
                </el-form-item>
                <el-form-item label="企业注册地址：" prop="register_addr">
                  <el-input v-model="ruleForm.register_addr" name="register_addr" placeholder="请输入企业银行帐号"></el-input>
                </el-form-item>
                <el-form-item label="企业开户许可证：">
                  <div class="upload">
                    <div v-if="!ruleForm.open_license_stuff.image_url">
                      <img :src="icon_plus" alt="">
                      <p>上传扫描件<br>（一张）</p>
                    </div>
                    <img v-else :src="ruleForm.open_license_stuff.image_url" alt="" class="review">
                    <input type="file" name="open_license_stuff" @change="blsSuccess"/>
                  </div>
                </el-form-item>
                <el-form-item label="税务登记证：">
                  <div class="upload">
                    <div v-if="!ruleForm.tax_reg_certificate.image_url">
                      <img :src="icon_plus" alt="">
                      <p>上传扫描件<br>（一张）</p>
                    </div>
                    <img v-else :src="ruleForm.tax_reg_certificate.image_url" alt="" class="review">
                    <input type="file" name="tax_reg_certificate" @change="blsSuccess"/>
                  </div>
                </el-form-item>
              </div>
              <div class="sjxx">
                <p>收件信息</p>
                <el-form-item label="收件人姓名：" prop="contact">
                  <el-input v-model="ruleForm.contact" name="contact" placeholder="请输入收件人姓名"></el-input>
                </el-form-item>
                <el-form-item label="收件人手机：" prop="mobile">
                  <el-input v-model="ruleForm.mobile" name="mobile" placeholder="请输入收件人手机"></el-input>
                </el-form-item>
                <el-form-item label="收件地邮编：" prop="postcode">
                  <el-input v-model="ruleForm.postcode" name="postcode" placeholder="请输入收件地邮编"></el-input>
                </el-form-item>
                <el-form-item label="收件地址：">
                  <el-select size="small"
                             name="province"
                             v-model="ruleForm.province"
                             placeholder="请选择省份"
                             v-on:change="getCitys($event)">
                    <el-option
                              v-for="item in provs"
                              :key="item.id"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select size="small"
                             name="city"
                             v-model="ruleForm.city"
                             placeholder="请选择城市"></br>
                    <el-option
                              v-for="item in citys"
                              :key="item.id"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                  </el-select><br>
                  <input v-model="ruleForm.address" placeholder="请输入详细地址" required name="address" />
                </el-form-item>
              </div>
            </div>
            <span class="errorMsg">{{ errorMsg }}</span>
          </div>
          <el-form-item class="bt">
            <el-button class="submit" name="submitBtn" @click="onSubmit('ruleForm')">提交材料</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
import provCity from '../../../static/js/prov_city.js'
import { mapGetters } from 'vuex'
import api from '../../fetch/api.js'
export default {
  name: 'step2',
  data () {
    return {
      icon_plus: require("../../assets/images/icon/icon_plus.png"),
      rules: {
        name: [{ required: true, message: '请输入主体名称', trigger: 'blur' }],
        registered_id: [{ required: true, message: '请输入营业执照注册号/统一社会信用代码', trigger: 'blur' }],
        account_name: [{ required: true, message: '请输入对公账户户名', trigger: 'blur' }],
        bank_account: [{ required: true, message: '请输入对公银行帐号', trigger: 'blur' }],
        bank_name: [{ required: true, message: '请输入对公账户开户银行', trigger: 'blur' }],
        mp_operator_name: [{ required: true, message: '请输入运营者姓', trigger: 'blur' }],
        mp_operator_idcard_number: [{ required: true, message: '请输入运营者身份证号', trigger: 'blur' }],
        mp_operator_phone: [{ required: true, message: '请输入运营者手机号', trigger: 'blur' }],
        mp_operator_tel: [{ required: true, message: '请输入运营者座机', trigger: 'blur' }],
        mp_operator_email: [{ required: true, message: '请输入运营者电子邮箱', trigger: 'blur' }],
        nick_name: [{ required: true, message: '请输入命名名称', trigger: 'blur' }]
      },
      arr1: [],
      citys: [],
      provs: provCity.provs,
      nameCheckResult: '',
      nowUpload: '',
      errorMsg: '',
      ruleForm: {
        customer_type: 1,
        name: '',
        registered_id: '',
        account_name: '',
        bank_account: '',
        bank_name: '',
        business_license_stuff: {
          media_id: '',
          image_url: ''
        },
        application_letter: {
          media_id: '',
          image_url: ''
        },
        other_stuff: {
          media_id: '',
          image_url: ''
        },
        mp_operator_name: '',
        mp_operator_idcard_number: '',
        mp_operator_phone: '',
        mp_operator_tel: '',
        mp_operator_email: '',
        nick_name: '',
        naming_type: 1,
        brand_register_stuff: {
          media_id: '',
          image_url: ''
        },
        brand_auth_stuff: {
          media_id: '',
          image_url: ''
        },
        brand_auth_stuff1: {
          media_id: '',
          image_url: ''
        },
        brand_auth_stuff2: {
          media_id: '',
          image_url: ''
        },
        brand_auth_stuff3: {
          media_id: '',
          image_url: ''
        },
        brand_auth_stuff4: {
          media_id: '',
          image_url: ''
        },
        naming_media_licesnse_stuff: {
          media_id: '',
          image_url: ''
        },
        naming_media_licesnse_stuff1: {
          media_id: '',
          image_url: ''
        },
        naming_media_licesnse_stuff2: {
          media_id: '',
          image_url: ''
        },
        naming_media_licesnse_stuff3: {
          media_id: '',
          image_url: ''
        },
        naming_media_licesnse_stuff4: {
          media_id: '',
          image_url: ''
        },
        naming_keyword_stuff: {
          media_id: '',
          image_url: ''
        },
        naming_keyword_stuff1: {
          media_id: '',
          image_url: ''
        },
        naming_keyword_stuff2: {
          media_id: '',
          image_url: ''
        },
        naming_keyword_stuff3: {
          media_id: '',
          image_url: ''
        },
        naming_keyword_stuff4: {
          media_id: '',
          image_url: ''
        },
        need_invoice: 0,
        invoice_type: 0,
        tax_num: '',
        enterprise_tel: '',
        invoice_bank_name: '',
        invoice_bank_account: '',
        register_addr: '',
        open_license_stuff: {
          media_id: '',
          image_url: ''
        },
        tax_reg_certificate: {
          media_id: '',
          image_url: ''
        },
        contact: '',
        mobile: '',
        postcode: '',
        province: '',
        city: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      appidStore: 'appidStore',
      orderidStore: 'orderidStore'
    })
  },
  methods: {
    getCitys (prov) {
      let tempCity=[]
      this.citys=[]
      this.ruleForm.city=''
      let allCity=provCity.allCity
      for (var val of allCity){
        if (prov == val.prov){
          tempCity.push({label: val.label, value: val.label})
        }
      }
      this.citys = tempCity;
    },
    blsSuccess(e) {
      let bl = e.target
      if(this.beforeUpload(bl.files[0])){
        let form = new FormData()
        form.append('file', bl.files[0])
        form.append('appid', this.appidStore)
        api.getMediaId(form).then(res => {
          if (res.success) {
            this.ruleForm[bl.name].media_id = res.data.media_id
            this.ruleForm[bl.name].image_url = res.data.image_url
          }
        })
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('请上传图片格式!')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    check() {
      api.checkAppName({appid: this.appidStore, nickName: this.ruleForm.nick_name}).then(res => {
        if (res.success) {
          this.nameCheckResult = res.result
        }else {
          this.nameCheckResult = res.message
        }
      }).catch(err => {
         console.log(err)
       })
    },
    onSubmit (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if(valid){
          let obj = {
            media_id: '',
            image_url: ''
          }
          if(this.ruleForm.naming_type == 1){//基于商标
            this.ruleForm.naming_media_licesnse_stuff=obj
            this.ruleForm.naming_media_licesnse_stuff1=obj
            this.ruleForm.naming_media_licesnse_stuff2=obj
            this.ruleForm.naming_media_licesnse_stuff3=obj
            this.ruleForm.naming_media_licesnse_stuff4=obj
            this.ruleForm.naming_keyword_stuff=obj
            this.ruleForm.naming_keyword_stuff1=obj
            this.ruleForm.naming_keyword_stuff2=obj
            this.ruleForm.naming_keyword_stuff3=obj
            this.ruleForm.naming_keyword_stuff4=obj
          }else if (this.ruleForm.naming_type == 6) {//基于媒体
            this.ruleForm.brand_register_stuff=obj
            this.ruleForm.brand_auth_stuff=obj
            this.ruleForm.brand_auth_stuff1=obj
            this.ruleForm.brand_auth_stuff2=obj
            this.ruleForm.brand_auth_stuff3=obj
            this.ruleForm.brand_auth_stuff4=obj
            this.ruleForm.naming_keyword_stuff=obj
            this.ruleForm.naming_keyword_stuff1=obj
            this.ruleForm.naming_keyword_stuff2=obj
            this.ruleForm.naming_keyword_stuff3=obj
            this.ruleForm.naming_keyword_stuff4=obj
          }else {//基于自选
            this.ruleForm.brand_register_stuff=obj
            this.ruleForm.brand_auth_stuff=obj
            this.ruleForm.brand_auth_stuff1=obj
            this.ruleForm.brand_auth_stuff2=obj
            this.ruleForm.brand_auth_stuff3=obj
            this.ruleForm.brand_auth_stuff4=obj
            this.ruleForm.naming_media_licesnse_stuff=obj
            this.ruleForm.naming_media_licesnse_stuff1=obj
            this.ruleForm.naming_media_licesnse_stuff2=obj
            this.ruleForm.naming_media_licesnse_stuff3=obj
            this.ruleForm.naming_media_licesnse_stuff4=obj
          }
          api.submitMaterial({
            appid: this.appidStore,
            order_id: this.orderidStore,
            customer_type: this.ruleForm.customer_type,
            name: this.ruleForm.name,
            registered_id: this.ruleForm.registered_id,
            account_name: this.ruleForm.account_name,
            bank_account: this.ruleForm.bank_account,
            bank_name: this.ruleForm.bank_name,
            business_license_stuff: this.ruleForm.business_license_stuff.media_id,
            business_license_stuff_img: this.ruleForm.business_license_stuff.image_url,
            application_letter: this.ruleForm.application_letter.media_id,
            application_letter_img: this.ruleForm.application_letter.image_url,
            other_stuff: this.ruleForm.other_stuff.media_id,
            other_stuff_img: this.ruleForm.other_stuff.image_url,
            mp_operator_name: this.ruleForm.mp_operator_name,
            mp_operator_idcard_number: this.ruleForm.mp_operator_idcard_number,
            mp_operator_phone: this.ruleForm.mp_operator_phone,
            mp_operator_tel: this.ruleForm.mp_operator_tel,
            mp_operator_email: this.ruleForm.mp_operator_email,
            nick_name: this.ruleForm.nick_name,
            naming_type: this.ruleForm.naming_type,
            brand_register_stuff: this.ruleForm.brand_register_stuff.media_id,
            brand_register_stuff_img: this.ruleForm.brand_register_stuff.image_url,
            brand_auth_stuff: this.ruleForm.brand_auth_stuff.media_id,
            brand_auth_stuff_img: this.ruleForm.brand_auth_stuff.image_url,
            brand_auth_stuff1: this.ruleForm.brand_auth_stuff1.media_id,
            brand_auth_stuff1_img: this.ruleForm.brand_auth_stuff1.image_url,
            brand_auth_stuff2: this.ruleForm.brand_auth_stuff2.media_id,
            brand_auth_stuff2_img: this.ruleForm.brand_auth_stuff2.image_url,
            brand_auth_stuff3: this.ruleForm.brand_auth_stuff3.media_id,
            brand_auth_stuff3_img: this.ruleForm.brand_auth_stuff3.image_url,
            brand_auth_stuff4: this.ruleForm.brand_auth_stuff4.media_id,
            brand_auth_stuff4_img: this.ruleForm.brand_auth_stuff4.image_url,
            naming_media_licesnse_stuff: this.ruleForm.naming_media_licesnse_stuff.media_id,
            naming_media_licesnse_stuff_img: this.ruleForm.naming_media_licesnse_stuff.image_url,
            naming_media_licesnse_stuff1: this.ruleForm.naming_media_licesnse_stuff1.media_id,
            naming_media_licesnse_stuff1_img: this.ruleForm.naming_media_licesnse_stuff1.image_url,
            naming_media_licesnse_stuff2: this.ruleForm.naming_media_licesnse_stuff2.media_id,
            naming_media_licesnse_stuff2_img: this.ruleForm.naming_media_licesnse_stuff2.image_url,
            naming_media_licesnse_stuff3: this.ruleForm.naming_media_licesnse_stuff3.media_id,
            naming_media_licesnse_stuff3_img: this.ruleForm.naming_media_licesnse_stuff3.image_url,
            naming_media_licesnse_stuff4: this.ruleForm.naming_media_licesnse_stuff4.media_id,
            naming_media_licesnse_stuff4_img: this.ruleForm.naming_media_licesnse_stuff4.image_url,
            naming_keyword_stuff: this.ruleForm.naming_keyword_stuff.media_id,
            naming_keyword_stuff_img: this.ruleForm.naming_keyword_stuff.image_url,
            naming_keyword_stuff1: this.ruleForm.naming_keyword_stuff1.media_id,
            naming_keyword_stuff1_img: this.ruleForm.naming_keyword_stuff1.image_url,
            naming_keyword_stuff2: this.ruleForm.naming_keyword_stuff2.media_id,
            naming_keyword_stuff2_img: this.ruleForm.naming_keyword_stuff2.image_url,
            naming_keyword_stuff3: this.ruleForm.naming_keyword_stuff3.media_id,
            naming_keyword_stuff3_img: this.ruleForm.naming_keyword_stuff3.image_url,
            naming_keyword_stuff4: this.ruleForm.naming_keyword_stuff4.media_id,
            naming_keyword_stuff4_img: this.ruleForm.naming_keyword_stuff4.image_url,
            need_invoice: this.ruleForm.need_invoice,
            invoice_type: this.ruleForm.invoice_type,
            address: this.ruleForm.address,
            contact: this.ruleForm.contact,
            mobile: this.ruleForm.mobile,
            province: this.ruleForm.province,
            city: this.ruleForm.city,
            postcode: this.ruleForm.postcode,
            tax_num: this.ruleForm.tax_num,
            enterprise_tel: this.ruleForm.enterprise_tel,
            open_license_stuff: this.ruleForm.open_license_stuff.media_id,
            open_license_stuff_img: this.ruleForm.open_license_stuff.image_url,
            tax_reg_certificate: this.ruleForm.tax_reg_certificate.media_id,
            tax_reg_certificate_img: this.ruleForm.tax_reg_certificate.image_url,
            register_addr: this.ruleForm.register_addr,
            invoice_bank_name: this.ruleForm.invoice_bank_name,
            invoice_bank_account: this.ruleForm.invoice_bank_account
          }).then(res => {
            if (res.success) {
             let order_id = res.order_id
             api.getOrderById({order_id: order_id}).then(res => {
               if (res.order.order_status == 1) {
                 this.$router.push({path:'/registSteps/4'})
               }else {
                 this.$store.dispatch('storeOrderid', {order_id})
                 this.$router.push({path:'/registSteps/3'})
               }
             })
           }else {
             this.errorMsg = '**' + res.message
           }}).catch(err => {
              console.log(err);
           })
        }else {
          return
        }
      })
    }
  },
  created () {
    api.getAppInfo({appid: this.appidStore}).then(res => {
      if (res.success) {
        if (res.verifyInfo != null) {
          this.ruleForm = res.verifyInfo
          this.errorMsg = res.order.remark
          let order_id = res.order.order_id
          this.$store.dispatch('storeOrderid', {order_id})
        }else {
          this.ruleForm.name = res.data.principal_name
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
*{box-sizing:border-box;line-height: 1;}
form{
  padding-bottom: 20px;
}
.formarea{
  padding: 30px 0;
  margin: 0 45px;
  border-bottom: 1px dashed #d6d6d6;
}
p.title{
  margin-bottom: 30px;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}
span.errorMsg{
  color:#cd0000;
}
section:after {
  content: "\0020";
  display: block;
  height: 0;
  clear: both;
}
input {
    height: 40px;
    width: 250px;
    border: 1px solid #d6d6d6;
    padding-left: 10px;
    margin: 15px 0 20px;
    border-radius: 3px;
}
.el-radio-group{
  margin: 15px 0 20px;
}
input.large{
  width: 450px;
}
input[type="radio"]{
  width: 13px;
  height: 13px;
}
a.download{
  margin: 93px 0 0 15px;
  text-decoration: underline;
  display: inline-block;
  color: #666666;
}
div.fp{
  width: 290px;
  background: #efefef;
  padding: 30px 0 0 15px;
}
div.fp p{
  font-weight: bold;
  margin-bottom: 15px;
}
.lastform{
  border-bottom: 1px solid #d6d7da;
}
input.el-input__inner{
  height:40px!important;
  margin-right: 10px!important;
}
button.submit{
  width: 150px;
  height: 42px;
  border-radius: 3px;
  display: block;
  margin: 20px auto 0;
  background: #18ccc0;
  color: #fff;
  border: none;
}
.avatar-uploader-icon{
  height: 60px;
  width: 108px;
  line-height: 60px;
}
.avatar-uploader .el-upload{
  height: 108px;
  width: 108px;
}
.avatar{
  height: 108px;
  width: 108px;
}
.upload {
  border: 1px dashed #d6d6d6;
  position: relative;
  width: 108px;
  height: 108px;
  float: left;
  margin-right: 10px;
  text-align: center;
}
.upload img.review {
  height: 106px;
  width: 108px;
}
.upload div{
  height: inherit;
  width: inherit;
  float: left;
}
.upload div p{
  color: #d6d6d6;
  line-height: 1.3;
  text-align: center;
  margin-bottom: 10px;
}
.upload div img{
  height: 18px;
  width: 18px;
  margin: 15px auto 10px;
  display: block;
}
input[type="file"]{
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  height: inherit;
  width: inherit;
  cursor: pointer;
  margin: 0;
  height: 108px!important;
}
</style>
<style>
#step2 input{
  height: 40px;
  border:1px solid #d6d6d6;
  border-radius: 2px;
  padding-left: 15px;
  width: 250px;
  border-radius: 2px;
}
#step2 input[type="file"]{
  width: 108px;
  padding-left: 0;
}
#step2 .el-input{
  height: 40px;
}
#step2 label{
  float: none;
  display: inline-block;
  text-align:left;
  color:#333;
  padding-top:0;
}
#step2 .el-form-item__error,span.errorMsg{
  color:#cd0000;
}
#step2 .el-radio-group{
  margin-bottom: 0;
}
#step2 input[name="province"]{
  float: left;
}
</style>
