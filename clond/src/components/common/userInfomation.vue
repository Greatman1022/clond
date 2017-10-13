<template> 
<div id='userInfomation' class="userInfomation">
  <div class="frameWidth">
    <div class="ui_content">
      <img class="ui_img" :src="userMess.headimgurl">
      <div class='ui_c'>
        <h3>
          <span>{{userMess.showName}}</span>
          <button @click="editmess()">编辑信息</button>
        </h3>
        <ul>
          <li>账号类型：{{userMess.userType}}</li>
        </ul>
        <p><span>小程序：{{userMess.customerAppCount || 0}}</span></p>
      </div>
    </div>
  </div>

  <el-dialog ref='dialog' v-model="baseInfoDialog" size="sm" @open='getpermes'>
    <div class="ui-title">
      <span>个人用户基本信息</span>
    </div>
    <div class="content">
      <div class="editInfo">
        <h3>请放心，我们会对您的个人信息进行保密。</h3>
        <div class="ei_group">
          <span>昵称</span>
          <input type="text" v-model="userMess.nickname">
        </div>
        <div class="ei_group ei_sex">
          <span>性别</span>
          <el-radio-group v-model="userMess.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </div>
        <div class="ei_group ei_address clearfix">
          <span>联系地址</span>
          <div class="el_address">
            <!-- <el-select v-model="userMess.province" placeholder="请选择省" @change="prochange()"> -->
            <el-select v-model="userMess.province" placeholder="请选择省" @change="prochange()">
              <el-option
                v-for="item in pro"
                :label="item.name"
                :value="item.id"
                :key="item.id">
              </el-option>
            </el-select>
            <el-select v-model="userMess.city" placeholder="请选择市" @change="citychange()">
              <el-option
                v-for="item in city"
                :label="item.name"
                :value="item.id"
                :key="item.id">
              </el-option>
            </el-select>
            <el-select v-model="userMess.area" placeholder="请选择区">
              <el-option
                v-for="item in area"
                :label="item.name"
                :value="item.id"
                :key="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="clearfix"></div>
          <input type="text" v-model="userMess.address" placeholder="详细地址">
        </div>
        <div class="ei_group ei_button clearfix">
          <button class="ei_b_baocun" type="button" @click="saveBaseInfo">保存</button>
          <button class="ei_b_quxiao" type="button" @click="baseInfoDialog = false">取消</button>
        </div>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../fetch/api.js'
import areadata from '../../assets/js/area_data.js'
export default {
  name: 'userInfomation',
  components: {
  },
  data () {
    return {
      baseInfoDialog: false,
      pro: '',
      city: '',
      area: '',
    }
  },
  computed: {
    ...mapGetters({
      userMess: 'getUserMess'
    })
  },
  methods: {
    getpermes: function () {
      this.pro = areadata.area_data.pro
      this.city = areadata.area_data.city[this.userMess.province]
      this.area = areadata.area_data.county[this.userMess.city]
      let _this = this
      this.pro.forEach(function (item, key) {
        if (item.name === _this.userMess.province) {
          _this.userMess.province = _this.pro[key].id
          _this.city = areadata.area_data.city[_this.userMess.province]
          _this.area = areadata.area_data.county[_this.userMess.city]
        }
      })
    },
    prochange: function () {
      this.userMess.city = ''
      this.userMess.area = ''
      this.city = areadata.area_data.city[this.userMess.province]
      this.area = areadata.area_data.county[this.userMess.city]
    },
    citychange: function (e) {
      this.area = areadata.area_data.county[this.userMess.city]
    },
    editmess () {
      this.baseInfoDialog = true
    },
    saveBaseInfo: function () {
      api.messUpdate({id: this.userMess.id, nickname: this.userMess.nickname, sex: this.userMess.sex, province: this.userMess.province, city: this.userMess.city, area: this.userMess.area, address: this.userMess.address}).then(res => {
        api.userInfo().then(res => {
          this.$store.dispatch('setUserInfo', {user: res.loginUser})
        }).catch((err) => {
          console.info('development...')
        })
      })
      this.baseInfoDialog = false
    }
  }
}
</script>

<style scoped>
.userInfomation{
  border-top:#e6e6e6 1px solid;
  border-bottom:#e6e6e6 1px solid;
  background:#fff;
}
.ui_content{
  padding:34px 0;
  overflow: hidden;
}
.ui_img{
  float:left;
  width:120px;
  height:120px;
  border-radius:100px;
}
.ui_c{
  margin-left: 20px;
  float: left;
}
.ui_c h3{
  font-size: 20px;
  color: #003333;
  line-height: 30px;
  overflow: hidden;
}
.ui_c h3 span{
  float: left;
  margin-right: 14px;
}
.ui_c h3 button{
  float: left;
  border: 1px solid #ececec;
  font-size: 13px;
  border-radius: 3px;
  text-indent: 15px;
  line-height: 28px;
  background: url(~assets/images/icon/icon_pan.png) 9px no-repeat;
  width: 89px;
}
.ui_c ul{
  overflow: hidden;
  padding: 15px 0;
}
.ui_c ul li{
  float: left;
  line-height: 30px;
}
.ui_c ul li:first-child{
  width: 384px;
}
.ui_c p{
  overflow: hidden;
}
.ui_c p span{
  float: left;
  line-height: 30px;
  margin-right: 30px;
}
.ui_c p a{
  float: left;
  line-height: 28px;
  border: 1px solid #18ccc0;
  border-radius: 3px;
  color: #18ccc0;
  display: inline-block;
  width: 89px;
  text-align: center;
}
.el_address{
  float: left;
}
.el_address .el-select{
  float: left;
}
</style>
