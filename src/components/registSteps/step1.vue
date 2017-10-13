<template>
  <div id='step1'>
    <div id="wrap" class="hd">
      <img src="../../assets/images/regist/1.png" alt="">
    </div>
    <transition name="component-fade" mode="out-in">
      <div class="step1 frameWidth">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <p>选择帐号类型，一旦成功建立帐号，类型不可更改</p>
          <div class="choose">
            <div class="appType" v-for="(apptype, index) in apptypes" @click="changeType(index)" :class="{ 'active': index+1 === accountType }">
              <img :src="apptype.src" alt="">
              <span>{{ apptype.tag }}</span>
              <p> {{ apptype.intro }}</p>
            </div>
          </div>
          <label for="zt">主体类型：</label><br>
          <input type="text" name="ztlx" value="企业" disabled="true"><br>
          <el-form-item label="主体名称" prop="ztmc">
            <el-input v-model="ruleForm.ztmc" name="ztmc"></el-input>
          </el-form-item>
          <span class="errorMsg">{{ errorMsg }}</span>
          <el-form-item class="bt">
            <el-button @click="returnFn" name="returnBtn">返回</el-button>
            <el-button type="primary" name="submitBtn" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import api from '../../fetch/api'
export default {
  name: 'step1',
  data() {
      return {
        ruleForm: {
          ztmc: ''
        },
        rules: {
          ztmc: [
            { required: true, message: '请输入主体名称', trigger: 'blur' }
          ]
        },
        apptypes: [
          {
            src: require("../../assets/images/regist/icon-dyh.png"),
            tag: '订阅号',
            intro: '具有信息发布与传播的能力适合个人及媒体注册'
          },
          {
            src: require("../../assets/images/regist/icon-fwh.png"),
            tag: '服务号',
            intro: '具有用户管理与提供业务服务的能力适合企业及组织注册'
          },
          {
            src: require("../../assets/images/regist/icon-xcx.png"),
            tag: '小程序',
            intro: '具有出色的体验，可以被便捷地获取与传播适合有服务内容的企业和组织注册'
          }
        ],
        accountType: 1,
        errorMsg: ''
      }
    },
    methods: {
      changeType(i) {
        this.accountType = i+1
      },
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            api.register({accountType: this.accountType, principalName: this.ruleForm.ztmc}).then(res => {
              if (res.success) {
               let appid = res.appid
               this.$store.dispatch('storeAppid', {appid})
               this.$router.push({path:'/registSteps/2'})
             }else {
               this.errorMsg = '**' + res.message
             }}).catch(err => {
                console.log(err);
              });
          } else {
            return
          }
        })
      },
      returnFn(){
        this.$router.push({path:'/registAgent'})
      }
    }
}
</script>

<style scoped>
*{box-sizing:border-box;}
.step1{
  padding: 30px 45px;
}
.step1:after,.choose:after{
  content: "\0020";
  display: block;
  height: 0;
  clear: both;
}
.appType{
  float: left;
  width: 350px;
  height: 160px;
  margin: 20px 30px 25px 0;
  padding: 20px;
  border: 1px solid #d6d6d6;
}
.appType:hover{
  border: 2px solid #18ccc0;
  background: #fefefe;
}
.active{
  border: 2px solid #18ccc0;
  background: #fefefe;
}
div:last-child{
  margin-right: 0;
}
.appType img{
  margin: 0 10px 10px 90px;
}
.appType span{
  font-size: 18px;
}
.appType p{
  color: #999999;
  text-align: center;
  line-height: 28px;
}
.bt{
  width: 1110px;
  height: 62px;
  margin-top: 30px;
  border-top: 1px solid #e6e7ea;
}
.bt button{
  width: 150px;
  height: 42px;
  border-radius: 3px;
  margin-top: 20px;
  margin-right: 20px;
  border: none;
}
button[name="returnBtn"]:hover{
  color: #333;
}
button[name="submitBtn"]:hover{
  color: #fff;
}
button[name="returnBtn"]{
  margin-left: 400px;
  background: #fff;
  border: 1px solid #d6d6d6;
}
button[name="submitBtn"]{
  background: #18ccc0;
  color: #fff;
}
</style>
<style>
#step1 input{
  height: 40px;
  border:1px solid #d6d6d6;
  border-radius: 2px;
  margin: 15px 0 20px;
  padding-left: 15px;
  width: 250px;
  background: #fff;
  border-radius: 2px;
}
#step1 input[name="ztlx"]{
  width: 125px;
  background: #efefef;
}
#step1 .el-input{
  width: 250px;
  height: 40px;
}
#step1 .el-form-item__label{
  float: none;
  text-align:left;
  color:#333;
}
#step1 .el-form-item__error,span.errorMsg{
  color:#cd0000;
}
</style>
