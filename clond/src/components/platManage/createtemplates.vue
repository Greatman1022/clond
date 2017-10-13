<template>
  <div id="createtemplate">
    <div class='bc_block'>
      <h2>新增模板
        <router-link to="/platmanage/temp">
          <button>返回上层</button>
        </router-link>
      </h2>
      <el-form :model="tempData" ref="tempData" :rules="rules" class="tempForm">
      <el-form-item label="模版名称：" prop="name">
        <el-input class="template-name" v-model="tempData.name" placeholder="请输入模版名称"></el-input>
      </el-form-item>
      <el-form-item label="模版图片：" prop="cover"> 
        <p>建议上传尺寸为560*560像素，最小尺寸不能低于280*280像素，上传图片标准规格为正方形。</p>
        <el-upload
          class="avatar-uploader"
          action="http://upload.vdongchina.com/?project=cloud"
          :show-file-list="false"
          :on-success="handleSuccessCover"
          :before-upload="beforeUpload">
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="二维码图片：" prop="qrcodeUrl">
        <p>建议上传尺寸为560*560像素，最小尺寸不能低于280*280像素，上传图片标准规格为正方形。</p>
        <el-upload
          class="avatar-uploader"
          action="http://upload.vdongchina.com/?project=cloud"
          :show-file-list="false"
          :on-success="handleSuccessQrcode"
          :before-upload="beforeUpload">
          <img v-if="qrcUrl" :src="qrcUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="行业选择：" prop="sceneId">
        <el-select v-model="tempData.sceneId" class="cm_select" @change="selectSceneItem" placeholder="请选择场景">
          <el-option
            v-for="(item, index) in sceneList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景选择：" prop="industryId">
        <el-select v-model="tempData.industryId" class="cm_select" @change="selectIndustryItem" placeholder="请选择行业">
          <el-option
            v-for="(item, index) in industryList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格：" prop="price">
        <el-input type="number" class="ipt-price" v-model="tempData.price" placeholder="请输入价格"></el-input>
        <!-- <input type='text' class='ipt-price' v-model='tempData.price' placeholder="请输入价格" :input="onlyPrice(tempData.price)"> -->
      </el-form-item>
      <el-form-item label="配置文件：" prop="config">
        <el-input type="textarea" class="ta-config" v-model="tempData.config" placeholder="请输入配置文件"></el-input>
      </el-form-item>
      <el-form-item label="模板标识：" prop="identify">
        <!-- <el-input class="template-name" v-model="tempData.identify" placeholder="请输入模板标识"></el-input> -->
        <el-select v-model="tempData.identify" class="cm_select" placeholder="请选择模板标识">
          <el-option
            v-for="(item, index) in identifyList"
            :key="item.id"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <!-- <button class='save_btn' @click="saveTemplateApp">保存</button> -->
        <el-button class="save_btn" @click="submitForm('tempData')">保存</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import api from '../../fetch/api'
export default {
  name: 'createtemplate',
  data () {
    return {
      industryList: [],
      sceneList: [],
      industry: '',
      scene: '',
      dialogImageUrl: '',
      dialogVisible: false,
      imgUrl: '',
      qrcUrl: '',
      tempData: {},
      tempId: '',
      identifyList: [
        {
          id: 1,
          value: 'flashbuy'
        },
        {
          id: 2,
          value: 'cloud_shop'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请上传模板图片', trigger: 'change' }
        ],
        qrcodeUrl: [
          { required: true, message: '请上传二维码图片', trigger: 'change' }
        ],
        sceneId: [
          { required: true, type: 'number', message: '请选择场景', trigger: 'change' }
        ],
        industryId: [
          { required: true, type: 'number', message: '请选择行业', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        config: [
          { required: true, message: '请输入配置文件', trigger: 'blur' }
        ],
        identify: [
          { required: true, message: '请输入模板标识', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getTemplateInfo()
    this.typeIndustry()
    this.typeScene()
    this.getDataList()
  },
  methods: {
    // 获取平台数据集
    getDataList () {
      api.platDataList({type: 1}).then(res => {
        if (res.success) {
          this.identifyList = res.list
        } else {
          this.$message.error('获取模板标识失败！')
        }
      })
    },
    getTemplateInfo () {
      this.tempItem = this.$store.getters.getTemplateId
      if (this.tempItem) {
        this.tempData = this.tempItem
        if (this.tempData.cover) {
          this.tempData.cover = this.tempData.cover
          this.imgUrl = 'http://image.vdongchina.com/' + this.tempItem.cover
          this.qrcUrl = 'http://image.vdongchina.com/' + this.tempItem.qrcodeUrl
        }
      } else {
        this.tempData = {
          name: '',
          cover: '',
          qrcodeUrl: '',
          sceneId: null,
          sceneName: null,
          industryId: null,
          industryName: null,
          identify: null,
          price: '',
          config: '',
          userId: ''
        }
      }
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleSuccessCover: function (response, file, fileList) {
      this.imgUrl = URL.createObjectURL(file.raw)
      this.tempData.cover = response.fileid
      this.$refs['tempData'].validateField('cover')
    },
    handleSuccessQrcode: function (response, file, fileList) {
      this.qrcUrl = URL.createObjectURL(file.raw)
      this.tempData.qrcodeUrl = response.fileid
      this.$refs['tempData'].validateField('qrcodeUrl')
    },
    typeIndustry () {
      api.TypeIndustry().then(res => {
        if (res.success) {
          this.industryList = res.industry[0].childs
          if (this.tempData.industryId) {
            let _industry = this.industryList.filter(item => {
              return item.id === this.tempData.industryId
            })
            this.industry = _industry[0]
          }
        }
      })
    },
    typeScene () {
      api.TypeScene().then(res => {
        if (res.success) {
          this.sceneList = res.scene[0].childs
          if (this.tempData.sceneId) {
            let _scene = this.sceneList.filter(item => {
              return item.id === this.tempData.sceneId
            })
            this.scene = _scene[0]
          }
        }
      })
    },
    selectSceneItem (sceneId) {
      // if (item) {
      //   this.tempData.sceneId = item.id.toString()
      //   this.tempData.sceneName = item.name
      // }

      if (this.tempItem.sceneId) {
        this.$refs['tempData'].validateField('sceneId')
      }
    },
    selectIndustryItem (industryId) {
      // if (item) {
      //   this.tempData.industryId = item.id.toString()
      //   this.tempData.industryName = item.name
      // }

      if (this.tempItem.industryId) {
        this.$refs['tempData'].validateField('industryId')
      }
    },
    submitForm (formName) {
      this.tempData.userId = this.$store.state.common.userInfo.data.id
      this.tempData.price = this.tempData.price.toString()
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.tempItem) {
            api.templateupdate(this.tempData).then(res => {
              if (res.success) {
                _this.$router.push({name: 'platTempManage'})
              } else {
                _this.$message.error(res.message)
              }
            })
          } else {
            api.templateAdd(this.tempData).then(res => {
              if (res.success) {
                _this.$router.push({name: 'platTempManage'})
              } else {
                _this.$message.error(res.message)
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
#createtemplate{
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
.bc_block h2 button{
  border: 1px solid #d6d6d6;
  border-radius: 3px;
  text-align: center;background-color: #fff;
  float: right;
  display: inline-block;
  width: 90px;
  line-height: 30px;
  color: #666;
}
.ng_item{
  display: block;
  margin-bottom: 20px;
  overflow: hidden;
}
.ng_item span.item_l{
  width: 167px;
  float: left;
  display: inline-block;
  text-align: right;
  line-height: 40px;
  margin-right: 8px;
}
.ng_item .item_r{
  float: left;
  width: 813px;
  display: inline-block;
}
.ng_item span.pic_l{
  line-height: 34px;
}
.ng_item .picload p{
  line-height: 34px;
  padding:0 10px;
  margin-bottom: 10px;
  color: #666;
  background-color: #f5f5f5;
}
.el-upload--picture-card i{
  display: block;
  width: 100%;
  height: 38px;
  margin-top: 22px;
  background: url(~assets/images/icon/icon_plus.png) no-repeat center;
}
.el-upload--picture-card:hover i{
  background: url(~assets/images/icon/icon_plus_hover.png) no-repeat center;
}
.el-upload--picture-card span{
  display: inline-block;
  line-height: 35px;
  color: #999;
}
.el-upload--picture-card:hover span{
  color: #18ccc0;
}
.save_btn{
  background-color: #18ccc0;
  color: #fff;
  text-align: center;
  width: 198px;
  line-height: 24px;
  border-radius: 3px;
  font-size: 16px;
  box-sizing: border-box;
  margin-left: 175px;
}
.template-name{
  width: 250px;
}
.template-name{
  width: 250px;
}
.max-width{
  width: 620px;
}
.ta-config{
  width: 620px !important;
  height: 150px;
  resize: none;
}
.ta-config .el-textarea__inner{
  width: 100%;
  height: 150px !important;
  resize: none !important;
}
.ipt-price{
  width: 215px;
  height:40px; line-height:38px; transition:all 0.5s; border-radius:4px;
}
.ipt-price:focus{ border:#18ccc0 1px solid; box-shadow: 0 0 8px rgba(122,208,202,.105); -moz-box-shadow: 0 0 8px rgba(122,208,202,.5); -webkit-box-shadow: 0 0 8px rgba(122,208,202,3);}
.ipt-price:hover{border-color:#18ccc0}
.avatar-uploader{
  margin-left: 175px;
}
</style>
