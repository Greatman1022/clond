<template>
  <div id='baseConf'>
    <div class='baseConfNav'>
      <el-menu :default-active='$route.path' class="el-menu-vertical-demo" @select='handleSelete' :router="true">
        <el-menu-item :index='`/backstagemanage/`+ appid +`/baseconf/applet`' :route="{name:'applet'}">
          <i class="iconfont el-icon-wc-xiaochengxu"></i>微信小程序
        </el-menu-item>
        <!-- <el-menu-item :index='`/backstagemanage/`+ appid +`/baseconf/public`' :route="{name:'public'}">
          <i class="iconfont el-icon-wc-weixin"></i>微信公众号
        </el-menu-item> -->
        <el-menu-item :index='`/backstagemanage/`+ appid +`/baseconf/server`' :route="{name:'server'}">
          <i class="iconfont el-icon-wc-fuwuqi"></i>服务器管理
          <i class='iconfont el-icon-wc-xiangshang' v-if='serverStatus.status == 1 && serverStatus.isUpdate'></i>
          <i class='iconfont el-icon-wc-jinggao' v-if='serverStatus.status == 0'></i>
          <i class='iconfont el-icon-wc-guanji' v-if='serverStatus.status == 2'></i>
        </el-menu-item>
      </el-menu>
    </div>
    <div class='baseconfR'>
      <router-view></router-view>
      <el-dialog title="信息" :show-close='false' :visible.sync="saveSuccessVisible" size="xs" custom-class="dialog-theme2 message">
        <p class='tc fz18'>保存成功!</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveSuccessBtn">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="绑定失败" :show-close='false' :visible.sync="loadFailVisible" size="xs" custom-class="dialog-theme2 message">
        <p class='tc fz18'>必须授权公众号绑定！!</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveLoadFailBtn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'baseConf',
  components: {
  },
  data() {
    return {
      appid: null,
      navIndex: "1"
    }
  },
  created() {
    this.appid = this.$route.params.appid
  },
  computed: {
    ...mapGetters({
      saveSuccessVisible: 'getSaveSuccessVisible',
      loadFailVisible: 'getLoadFailVisible',
      serverStatus: 'getServerStatus'
    })
  },
  methods: {
    handleSelete(index) {
      this.navIndex = index
    },
    saveLoadFailBtn() {
      this.$store.commit('GETLOADFAILVISIBLE', false)
    },
    
    saveSuccessBtn() {
      this.$store.commit('GETSAVESUCCESSVISIBLE', false)
    }
  }
}
</script>

<style scoped>
#baseConf {
  display: -webkit-flex;
  display: flex;
  margin-top: -20px;
}

.baseConfNav {
  width: 200px;
}

.baseconfR {
  -webkit-flex: 1;
  flex: 1;
  padding: 20px;
  border-top: 20px solid #f2f5f6;
  border-left: 20px solid #f2f5f6;
}

.el-icon-wc-weixin,
.el-icon-wc-fuwuqi,
.el-icon-wc-xiaochengxu {
  margin-left: 26px;
  margin-right: 4px;
  font-size: 18px;
  vertical-align: -2px;
}

.el-icon-wc-xiangshang,
.el-icon-wc-jinggao,
.el-icon-wc-guanji {
  font-size: 16px;
  vertical-align: -1px;
  padding-left: 5px;
}

.el-icon-wc-xiangshang,.updateColor {
  color: #17CBBF;
}

.el-icon-wc-jinggao,.stopColor {
  color: #F85F5F;
}

.el-icon-wc-guanji,.restartColor {
  color: #FFBD08;
}

.el-icon-wc-xiangshang:before {
  content: "\e63a";
}

.el-icon-wc-weixin:before {
  content: "\e65a";
}

.el-icon-wc-jinggao:before {
  content: "\e62e";
}

.el-icon-wc-fuwuqi:before {
  content: "\e72c";
}

.el-icon-wc-xiaochengxu:before {
  content: "\e600";
}

.el-icon-wc-guanji:before {
  content: "\e64b";
}

.fz18 {
  font-size: 18px;
}

</style>
