<template>
  <div id="templatemanage">
    <div class="tm-wrap" v-if="$route.fullPath == '/platmanage/temp'">
      <div class='am_head'>
        <span>筛选：</span>
        <el-select v-model="resouceName" class='am_select' placeholder="创建来源" @change="selectResouce">
          <el-option
            v-for="item in resouceList"
            :key='item.id'
            :label="item.txt"
            :value="item">
          </el-option>
        </el-select>
        <div class='am_button'>
          <button  @click="createTemplate('')">+ 创建模版</button>
        </div>
        <el-input
          class='am_search'
          placeholder="搜索用户名"
          icon="search"
          v-model="keyword"
          :on-icon-click="searchClick">
        </el-input>
      </div>
      <div class="am_table">
        <table cellpadding="0" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>模板名称</th>
              <th>创建日期</th>
              <th>用户名(创建者)</th>
              <th>创建来源</th>
              <!--<th>发布日期</th>-->
              <th>使用情况</th>
              <th>发布状态</th>
              <th>模版编辑</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item, index) in templateList' :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.createTime | formatDate }}</td>
              <td v-if="item.user">{{ item.user.nickname }}</td>
              <td v-else></td>
              <td v-if="item.user">{{ item.user.role | fotmateRole }}</td>
              <td v-else></td>
              <!--<td>-</td>-->
              <td>
                <em class='blueColer' v-if="item.status">正常</em>
                <em class='redColor' v-else>禁用</em>
              </td>
              <td>
                <button class="table_btn" v-if="!item.status"
                  @click="updateState(item.id, index)">启用</button>
                <button class="table_btnno" v-else
                  @click="updateState(item.id, index)">禁用</button>
              </td>
              <td>
                <!--<router-link to="/platmanage/temp/edit">-->
                  <button class="editbtn" @click="createTemplate(item)">编辑</button>
                  <button class='editbtn' @click='designTem(item.id)'>设计</button>
                <!--</router-link>-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="block pagination tc">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="getAgentList">
        </el-pagination>
      </div>
    </div>

    <transition name="component-fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
import api from '../../fetch/api'
import util from '../../assets/js/utils'
export default {
  name: 'templatemanage',
  data () {
    return {
      resouceList: [
        {
          name: 'ALL',
          txt: '全部'
        },
        {
          name: 'ROLE_ADMIN',
          txt: '管理员'
        },
        {
          name: 'ROLE_AGENT',
          txt: '代理商'
        },
        {
          name: 'ROLE_APPER',
          txt: '终端'
        }
      ],
      templateList: [],
      resouceKey: '',
      resouceName: '',
      keyword: '',
      cities: [],
      total: 0,
      pageSize: 15
    }
  },
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  created: function () {
    this.getAgentList(1)
    let _role = this.$store.getters.getUserInfo.data.role
  },
  methods: {
    getAgentList: function (page) {
      this.page = page
      this.getData(1)
    },
    searchClick (keyword) {
      if (this.keyword) {
        this.getData(0)
      } else {
        this.getData(1)
      }
    },
    // 修改代理商信息
    updateState (id, index) {
      api.templateupdate({id: id, status: this.templateList[index].status ? 0 : 1}).then(res => {
        if (res.success) {
          this.templateList[index].status = !this.templateList[index].status
          this.$set(this.templateList, index, this.templateList[index])
        }
      })
    },
    createTemplate (tempItem) {
      this.$store.dispatch('setTemplateId', tempItem)
      if (tempItem) {
        this.$router.push({name: 'platTempManageEdit'})
      } else {
        this.$router.push({name: 'platTempManageAdd'})
      }
    },
    selectResouce (item) {
      if (item.name === 'ALL') {
        this.getData(1)
      } else {
        this.resouceKey = item.name
        this.getData(0)
      }
    },
    // 获取数据
    getData (type) {
      let _userInfo = this.$store.getters.getUserInfo
      if (type) {
        let data = {
          sceneId: '',
          industryId: '',
          sortType: 'new',
          page: this.page,
          pageSize: this.pageSize,
          status: ''
        }
        if (_userInfo.data.role === 'ROLE_APPUI') {
          data.userId = _userInfo.data.id
        }
        api.templatesList(data).then(res => {
          if (res.success) {
            this.templateList = res.pagination.items
            this.total = res.pagination.total
          }
        })
      } else {
        let data = {
          username: this.keyword,
          source: this.resouceKey,
          page: this.page,
          pageSize: this.pageSize
        }
        api.templateQuery(data).then(res => {
          if (res.success) {
            this.templateList = res.pagination.items
            this.total = res.pagination.total
          }
        })
      }
    },

    // 跳去编辑器
    designTem (id) {
      api.tempappadd({tempId: id}).then(res => {
        console.log(res)
        this.$router.push({name: 'editor', params: { appid: res.appid }})
      })
    }
  },
  filters: {
    formatDate: function (val) {
      let _d = new Date(val)
      return util.formatDate(_d, 'yyyy年MM月dd日')
    },
    fotmateRole: function (val) {
      if (val === 'ROLE_ADMIN') {
        return '管理员'
      } else if (val === 'ROLE_AGENT') {
        return '代理商'
      } else if (val === 'ROLE_UI') {
        return 'UI'
      } else if (val === 'ROLE_APPUI') {
        return 'APPUI'
      } else {
        return '终端'
      }
    }
  }
}
</script>
<style scoped>
.el-select{
  float: left;
  margin-right: 7px;
}
.el-radio{
  float: left;
  line-height: 32px;
}
.el-radio+.el-radio{
  margin-right: 20px;
}
#templatemanage{
  padding: 0 20px;
}
.am_head{
  margin-bottom: 10px;
  overflow: hidden;
}
.am_head span{
  line-height: 32px;
  float: left;
}
.dateblock{
  display: inline-block;
  float: left;
  margin-left: 13px;
  line-height: 32px;
}
.dateblock span i{
  background: url(~assets/images/icon/icon_date.png) no-repeat;
  display: inline-block;
  width: 13px;
  height: 15px;
  vertical-align: -2px;
}
.am_search{
  float: right;
}
.am_button{ 
  display: inline-block;
  float: right;
}
.am_button button{
  background-color: #18ccc0;
  line-height: 32px;
  color: #fff;
  border-radius: 3px;
  width: 100px;
  text-align: center;
  margin-left: 20px;
}
.am_table tr{ 
  height:50px;
}
.am_table tr:hover{ 
  background:#f6fdfd;
}
.am_table thead tr:first-child{ 
  background:#f7f7f7;
}
.am_table td,.am_table th{ 
  text-align:center; 
  border-bottom:#e6e6e6 1px solid; 
  height:49px; 
  color:#666; 
  font-size:14px;
  font-weight: normal;
}
.editbtn{
  width: 50px;
  text-indent: 22px;
  text-align: left;
  display: inline-block;
  line-height: 20px;
  background: url(~assets/images/icon/icon_edittout.png) 0px 2px no-repeat;
}
.editbtn:hover{
  color: #18ccc0;
  background: url(~assets/images/icon/icon_editton.png) 0px 2px no-repeat;
}
.editbtn:last-child{
  margin-left: 15px;
  background: url(~assets/images/icon/i_edit_form.png) 0px 2px no-repeat;
}
.editbtn:last-child:hover{
  background: url(~assets/images/icon/i_edit_form_full.png) 0px 2px no-repeat;
}
</style>
