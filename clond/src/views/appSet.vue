<template>
  <div id='appSet'>
    <div class='appSet'>
      <div class="pd_width frameWidth">
        <div id="wrap" class="hd">
          <span>帐号设置</span>{{ nick_name }}的帐号设置
          <router-link to="/registAgent"><button type="button" name="topReturn">返回</button></router-link>
        </div>
        <div class="area first">
          <p class="title">修改头像</p>
          <div class="tx">
            <img class="headimg" src="" alt="" name="占位头像">
            <cropper :head_image_url="head_image_url" :appidStore="appidStore" @child-info="get"></cropper>
            <span>
              <img src="../assets/images/icon/tanhao.png" alt="">您本月还可修改头像{{ head_times }}次。<br>
              图片格式只支持：BMP、JPEG、JPG、GIF、PNG，大小不超过2M<br>
              注：实际头像始终为正方形。
            </span>
          </div>
          <p class="errorMsg">{{ errorMsg_head }}</p>
          <button type="submit" name="button" class="subModify" @click="headimgModify">提交修改</button>
        </div>
        <div class="area">
          <p class="title">修改功能介绍</p>
          <div class="gn">
            <textarea type="textarea" name="" v-model="signature" placeholder="请输入功能介绍"></textarea>
            <span>
              <img src="../assets/images/icon/tanhao.png" alt="">您本月还可修改功能介绍{{ gn_times }}次。
            </span>
          </div>
          <p class="errorMsg">{{ errorMsg_gn }}</p>
          <button type="button" name="button" class="subModify" @click="gnModify">提交修改</button>
        </div>
        <div class="area">
          <p class="title">类目设置</p>
          <div class="lm">
            <span>
              <img src="../assets/images/icon/tanhao.png" alt="">您本月还可设置类目{{ quota }}次，最多可设置类目{{ category_limit }}个。
            </span>
          </div>
          <table border="1">
            <tr>
              <th>一级类目</th>
              <th>二级类目</th>
              <!-- <th>提交审核日期</th> -->
              <th>审核状态</th>
              <th>审核不通过原因</th>
              <th>操作</th>
            </tr>
            <tr v-for="item in mycategories">
              <td>{{ item.first_name }}</td>
              <td>{{ item.second_name }}</td>
              <!-- <td>2017-05-03</td> -->
              <td :class="{'n': item.audit_status == 1, 'r': item.audit_status == 2, 'g': item.audit_status == 3} ">{{ item.audit_status_txt }}</td>
              <td>{{ item.audit_reason }}</td>
              <td><section v-if="item.audit_status == 2">
                <a @click="modify(item)" class="el-icon-edit"></a><a @click="del(item)" class="el-icon-delete"></a>
              </section></td>
            </tr>
            <tfoot>
               <tr>
                 <td colspan="5" class="g"><a class="g" @click="add"><span class="el-icon-plus"></span>新增类目</a></td>
               </tr>
            </tfoot>
          </table>
          <!-- <transition name="component-fade" mode="out-in"> -->
            <div class="editArea" v-show="isShow">
              <el-select
                         v-model="first"
                         name="first"
                         placeholder="一级分类"
                         @change="getSecond($event)">
                <el-option
                          v-for="item in firstLevels"
                          v-model="item.value" :key="index">
                </el-option>
              </el-select>
              <el-select
                         v-model="second"
                         name="second"
                         placeholder="二级分类"
                         @change="getSelected($event)">
                <el-option
                          v-for="item in secondLevels"
                          v-model="item.value" :key="index">
                </el-option>
              </el-select>
              <section v-if="selected.sensitive_type == 1">
                <p>
                  <img src="../assets/images/icon/tanhao.png" alt="">您申请增加的类目为敏感类目，需上传以下资质文件
                </p>
                <div class="upload" v-for="(item, index) in qualify">
                  <div v-if="arr1[index] == undefined">
                    <img src="../assets/images/icon/icon_plus.png" alt="">
                    <p>{{ item.name }}</p>
                  </div>
                  <img v-else :src="arr1[index]" alt="" class="review">
                  <input type="file" name="" ref="upload" @change="getMediaId(index)"/>
                  <a v-if="item.url" :href="item.url">案例范本</a>
                </div>
              </section>
              <p class="errorMsg">{{ errorMsg_lm }}</p>
              <section>
                <button type="button" name="submitBtn" @click="lxModify">提交</button>
                <router-link to="/registAgent"><button type="button" name="returnBtn">返回</button></router-link>
              </section>
            </div>
          <!-- </trasition> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import api from '../fetch/api.js'
import cropper from '../components/cropper'
export default {
  name: 'registAgent',
  data () {
    return {
      nick_name: '',
      head_img_media_id: null,
      errorMsg_head: '',
      head_image_url: '',
      signature: '',
      errorMsg_gn: '',
      head_times: '',
      gn_times: '',
      status: '',
      quota: '',
      category_limit: '',
      mycategories: [],
      isShow: false,
      firstLevels: [],
      first: '',
      secondLevels: [],
      second: '',
      isAdd: false,
      allcategories: [],
      qualify: [],
      arr1: [],
      selected: {
        first_id: Number,
        second_id: Number,
        sensitive_type: 0,
        certicates: []
      },
      errorMsg_lm: ''
    }
  },
  computed: {
    ...mapGetters({
      appidStore: 'appidStore'
    })
  },
  components: {
    'cropper': cropper
  },
  methods: {
    get(msg){
      this.head_img_media_id = msg
    },
    headimgModify() {
      if(this.head_img_media_id) {
        api.headImage({
          appid: this.appidStore,
          head_img: this.head_img_media_id.media_id,
          x1: this.head_img_media_id.x1,
          x2: this.head_img_media_id.x2,
          y1: this.head_img_media_id.y1,
          y2: this.head_img_media_id.y2
        }).then(res => {
          if (res.success) {
            this.errorMsg_head = '头像修改成功'
            api.getAccountInfo({appid: this.appidStore}).then(res => {
              this.head_times = res.wechatAccount.h_modify_quota - res.wechatAccount.h_modify_used_count
            })
          }else {
            this.errorMsg_head = '**'+ res.message.split('：')[0]
          }
        }).catch(err => {
          console.log(err)
        })
      }else {
        this.errorMsg_head = '**未选择头像'
      }
    },
    gnModify() {
      if(this.signature) {
        api.signature({appid: this.appidStore, signature: this.signature}).then(res => {
          if (res.success) {
            this.errorMsg_gn = '功能介绍修改成功'
            api.getAccountInfo({appid: this.appidStore}).then(res => {
              this.gn_times = res.wechatAccount.s_modify_quota - res.wechatAccount.s_modify_used_count
            })
          }else {
            this.errorMsg_gn = '**'+ res.message.split('：')[0]
          }
        }).catch(err => {
          console.log(err)
        })
      }else {
        this.errorMsg_gn = "**请填写功能介绍"
      }
    },
    getFirst() {
      this.firstLevels=[]
      api.categorysAll({appid: this.appidStore}).then(res => {
        if (res.success) {
            this.allcategories = res.categorys
            this.allcategories.forEach(i => {
            this.firstLevels.push({value: i.name})
          })
          this.getSecond(this.first)
          this.getSelected(this.second)
        }
      })
    },
    getSecond(first) {
      this.secondLevels=[]
      for (var val of this.allcategories){
        if (first == val.name){
          val.children.forEach(i => {
            this.secondLevels.push({value: i.name})
          })
        }
      }
    },
    getSelected (second) {
      this.allcategories.forEach( i =>{
        if(this.first == i.name) {
          this.selected.first_id = i.id
          i.children.forEach( j => {
            if(second == j.name) {
              this.selected.second_id = j.id
              this.selected.sensitive_type = j.sensitive_type
              this.qualify.length = 0
              this.arr1.length = 0
              if (this.selected.sensitive_type == 1 ) {
                j.qualify.exter_list.forEach(k => {
                  k.inner_list.forEach(m => {
                    this.qualify.push(m)
                  })
                })
              }
            }
          })
        }
      })
    },
    add() {
      this.isShow = true
      this.isAdd = true
      this.first = ''
      this.second = ''
      this.getFirst()
      this.selected = {
        first_id: Number,
        second_id: Number,
        sensitive_type: 0,
        certicates: []
      }
    },
    modify(item){
      this.isShow = true
      this.isAdd = false
      this.first = item.first_name
      this.second = item.second_name
      this.getFirst()
      this.getSelected(this.second)
      // 资质材料还获取吗？接口没有返回值========
      // this.certicates = ???
    },
    del(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // })
          api.categorysDel({appid: this.appidStore, first: item.first, second: item.second}).then(res => {
            console.log(res)
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              api.categorys({appid: this.appidStore}).then(res => {
                if (res.success) {
                  this.quota = res.categorys.quota
                  this.category_limit = res.categorys.limit
                  this.mycategories = res.categorys.categories
                }else {
                  console.log(res.message)
                }
              }).catch(err => {
                console.log(err)
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
    },
    getMediaId(index) {
      let input = this.$refs.upload
      let form = new FormData()
      form.append('file', input[index].files[0])
      form.append('appid', this.appidStore)
      api.getMediaId(form).then(res => {
        if (res.success) {
          this.selected.certicates[index] = {
            key: '',
            value: ''
          }
          this.selected.certicates[index].key = this.qualify[index].name
          this.selected.certicates[index].value = res.data.media_id
          Vue.set(this.arr1, index, res.data.image_url)
        }
      })
    },
    lxModify(){
      if (this.isAdd) {
        api.categorysAdd({
          appid: this.appidStore,
          categories: [
            {
              first: this.selected.first_id,
              second: this.selected.second_id,
              certicates: this.selected.certicates
            }
          ]
        }).then(res => {
          this.fn(res)
        }).catch(err => {
          console.log(err)
        })
      }else {
        api.categorysModify({
          appid: this.appidStore,
          categories: [
            {
              first: this.selected.first_id,
              second: this.selected.second_id,
              certicates: this.selected.certicates
            }
          ]
        }).then(res => {
          this.fn(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    fn (res) {
      if (res.success) {
        this.errorMsg_lm = '类目修改成功'
        api.categorys({appid: this.appidStore}).then(res => {
          if (res.success) {
            this.quota = res.categorys.quota
            this.category_limit = res.categorys.limit
            this.mycategories = res.categorys.categories
          }else {
            console.log(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }else {
        this.errorMsg_lm = '**'+ res.message.split('：')[0]
      }
    }
  },
  created() {
    api.getAccountInfo({appid: this.appidStore}).then(res => {
      if (res.success) {
        this.nick_name = res.wechatAccount.nick_name
        this.head_image_url = res.wechatAccount.head_image_url
        this.signature = res.wechatAccount.signature
        this.head_times = res.wechatAccount.h_modify_quota - res.wechatAccount.h_modify_used_count
        this.gn_times  = res.wechatAccount.s_modify_quota - res.wechatAccount.s_modify_used_count
        this.status = res.wechatAccount.status
        if (this.status == 2) {
          api.categorys({appid: this.appidStore}).then(res => {
            if (res.success) {
              this.quota = res.categorys.quota
              this.category_limit = res.categorys.limit
              this.mycategories = res.categorys.categories
            }else {
              console.log(res.message)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    })
  }
}
</script>

<style scoped>
*{box-sizing:border-box;}
.appSet{
  padding: 20px 0 30px;
}
.hd{
  height: 56px;
  padding: 10px 20px;
  color: #999999;
  border-bottom: 1px solid #dddddd;
}
.hd span{
  font-size: 18px;
  line-height: 36px;
  padding-right: 15px;
  color: #333333;
}
.area{
  padding: 20px 0;
  margin: 0 15px;
  border-top: 1px dashed #d6d6d6;
}
.first{
  padding-top: 30px;
  border-top: none;
}
button[name="topReturn"]{
  height: 36px;
  width: 95px;
  font-size: 16px;
  color: #333333;
  background: none;
  border: 1px solid #dddddd;
  border-radius: 36px;
  float: right;
}
div.tx{
  height: 80px;
  color: #666666;
  margin-bottom: 15px;
}
.headimg{
  float: left;
  margin-right: 8px;
  opacity: 0;
  z-index: 0;
  width: 80px;
  height: 80px;
}
.errorMsg{
  color:#cd0000 !important;
}
button.subModify{
  height: 32px;
  width: 85px;
  color: #fff;
  background: #1accc1;
  border-radius: 4px;
  margin: 20px 0 10px;
}
div.tx span img,
div.gn span img,
div.lm span img,
div.editArea p img{
  margin-right: 5px;
}
p.title{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}
div.gn{
  height: 160px;
}
div.gn span{
  margin-left: 10px;
  color:#666666;
}
div.gn span:after,
.editArea section:after{
  content: "\0020";
  display: block;
  height: 0;
  clear: both;
}
textarea{
  width: 622px;
  height: 150px;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  padding: 10px;
  overflow: auto;
}
div.lm span{
  color: #666666;
}
th{
  text-align: center;
  background: #f5f5f5;
  font-weight: normal;
}
td{
  border:solid #dddddd;
  border-width:0px 1px 1px 0px;
  text-align: center;
  min-width: 125px;
}
table{
  width: 870px;
  /*height: 245px;*/
  border:solid #dddddd;
  border-width:1px 0px 0px 1px;
  margin: 15px 0;
}
table th,
table td{
  height:45px;
}
.r{
  color: #cd0000;
}
.g{
  color: #1accc1;
}
.el-icon-edit,.el-icon-delete{
  color: #666666;
  margin-left: 15px;
}
.el-icon-plus{
  margin-right: 10px;
  color: #1accc1;
}
tfoot td{
  padding: 10px;
}
.editArea{
  background: #f6f6f6;
  padding: 30px 0 15px 15px;
}
.el-select{
  width: 160px;
  height: 40px;
  margin-right: 5px;
  margin-bottom: 15px;
}
div.editArea p{
  color: #666666;
}
div.editArea p a{
  color: #1accc1;
  text-decoration: underline;
}
.upload {
  border: 1px dashed #d6d6d6;
  margin: 15px 0 30px;
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
.upload a{
  color: #1accc1;
  text-decoration: underline;
}
.upload div{
  height: inherit;
  width: inherit;
  float: left;
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
.upload .el-icon-plus{
  margin: 0;
  color: #8c939d;
}
.avatar{
  height: 108px;
  width: 108px;
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
.editArea button{
  width: 85px;
  height: 30px;
  border-radius: 3px;
}
.editArea button[name="submitBtn"]{
  background: #1accc1;
  color: #fff;
  margin-right: 10px;
}
.editArea button[name="returnBtn"]{
  background: #fff;
  color: #333;
  border: 1px solid #d6d6d6;
}
</style>
