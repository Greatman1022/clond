<template>
  <div id='server'>
		<div class='bc_block'>
			<h2>服务器（
				<span v-if='serverStatus.status == 1 && !serverStatus.isUpdate'>正常</span>
				<span class='restartColor' v-if='serverStatus.status == 2'>重启中</span>
				<span class='stopColor' v-if='serverStatus.status == 0'>已停止</span>
				<span class='updateColor' v-if='serverStatus.status == 1 && serverStatus.isUpdate'>有更新版本</span>）
			</h2>
			<div class='bc_item'>
				<p class='p_line'>
					当前版本 : 
          <span v-if='serverStatus.currVersion'>{{serverStatus.currVersion}}</span> 
          <span v-else>无版本</span> 
          <span v-if='serverStatus.currVersion && !serverStatus.isUpdate'>（已经是最新版本）</span>
          <span v-else-if='serverStatus.currVersion && serverStatus.isUpdate'>（最新版本：{{serverStatus.updateVersion}}，请重启服务器更新镜像）</span>
				</p>
				<ul>
					<li>
            <el-button class='baseBtn' @click='reStart' v-if='serverStatus.status == 0'>启动</el-button>
						<!-- <el-button class='baseBtn' @click='reStart' v-else>重启</el-button>               -->
						 <el-button class='baseBtn' @click='reStart' v-else :disabled="serverStatus.status == 1 && !serverStatus.isUpdate || serverStatus.status == 2">重启</el-button>   
					</li>
				</ul>
			</div>
			<h2 class='mt20'>项目属性</h2>
			<div class='bc_item'>
				<p class='p_line'>
					<i class='icon'></i>
					<span>项目属性</span>
				</p>
				<ul>
					<li>
						<label class='bc_top'>
							<span>项目所属类别：</span>
							<el-select v-model="appDetail.sceneId" placeholder="请选择">
								<el-option v-for="item in scene.childs" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
							<el-select v-model="appDetail.industryId" placeholder="请选择">
								<el-option v-for="item in industry.childs" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</label>
					</li>
					<li>
						<span>项目封面 ：</span>
						<div class='item_r picload'>
							<p class='ptip'>建议上传尺寸为640*640像素，最小尺寸不能低于320*320像素，上传图片标准规格为正方形。</p>
							<el-upload class="avatar-uploader" action="http://upload.vdongchina.com?project=cloud" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeUpload">
								<!-- <div class="upload" v-model="tempData.cover">
										<i></i>
										<span>添加图片</span>
									</div> -->
								<img v-if="appDetail.fullCover" :src="appDetail.fullCover" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</div>
					</li>
					<li>
						<span>&nbsp;</span>
						<input type='button' value='保存' @click='saveProjectAttr()' />
					</li>
				</ul>
			</div>
		</div>
    <el-dialog title="提示" :show-close='false' :visible.sync="tipVisible" size="xs" custom-class="dialog-theme2 message">
      <p class='tc fz18 dredColor'>请先填写小程序相关配置参数，再尝试启动服务器</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tipBtn">确 定</el-button>
      </span>
    </el-dialog>
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
      imageUrl: '',
      cover: '',
      tipVisible: false
    }
  },
  created() {
    this.$store.dispatch('setCategorys')
    this.appid = this.$route.params.appid
    this.$store.dispatch('setAppDetail', {appid: this.appid})
    // this.getAppSituation({pid: this.appDetail.temp.identify,appid: this.appid})
    var getStatus = null
    clearTimeout(getStatus)
    var _this = this
    var getStatus = setTimeout(function(){
      _this.$store.dispatch('setAppDetail', {appid: _this.appid})
    }, 60000)
  },
  computed: {
    ...mapGetters({
      scene: 'getScene',
      industry: 'getIndustry',
      appDetail: 'getAppDetail',
      serverStatus: 'getServerStatus'
    })
  },
  methods: {
    tipBtn() {
      this.tipVisible = false
    },
    // getAppSituation(params) {
    //   api.appSituation(params).then(res => {
        
    //   })
    // },
    reStart() {
      if(this.appDetail.miniApp.appSecret && this.appDetail.miniApp.appid){
        api.restart({appid: this.appid}).then(res => {
          if(res.success) {
            this.$store.dispatch('setAppDetail', {appid: this.appid})
          }
        })
      } else {
        this.tipVisible = true
        console.log('请先填写小程序相关配置参数，再尝试启动服务器')
      }
    },
    saveProjectAttr() {
      api.projectAttr({
        appid: this.appDetail.appid,
        sceneId: this.appDetail.sceneId,
        industryId: this.appDetail.industryId,
        cover: this.cover
      }).then(res => {
        this.$store.commit('GETSAVESUCCESSVISIBLE', true)
      })
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    uploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.appDetail.fullCover = 'http://image.vdongchina.com/' + res.fileid
      // console.log(res.fileid)
      this.cover = res.fileid
    }
  }
}
</script>

<style scoped>
.bc_top .el-select {
  margin-right: 10px;
}

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

.bc_item ul li .item_r {
  float: left;
  width: 744px;
  display: inline-block;
}

.bc_item ul li .item_r .ptip {
  line-height: 34px;
  padding: 0 10px;
  margin: 3px 0 10px;
  color: #666;
  background-color: #f5f5f5;
}

.bc_item ul li label input {
  line-height: 38px;
  width: 228px;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 10px;
  font-size: 14px;
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
</style>