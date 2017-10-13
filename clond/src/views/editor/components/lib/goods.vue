<template>
  <div>
    <div class="ui-item">
      <el-tooltip style="margin-left: 10px;">
        <el-switch v-model="value1" on-value="1" off-value="0" @change='change'>
        </el-switch>
      </el-tooltip>

      <div v-if='this.value.show == 1' class="selectBtn">
        <el-button type="success" size="small" class="vd-primary-color" @click="choosemyTab">分类选择</el-button>
      </div>

      <el-select v-model="value2" placeholder="请选择" @change="handler" v-else>
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </div>

    <div class="ui-item" v-if='this.value.show == 1'>
      <label class="ed-set-label">是否显示导航图标</label>
      <el-tooltip style="margin-left: 10px;">
        <el-switch v-model="value3" on-value="1" off-value="0" @change='changeIcon'>
        </el-switch>
      </el-tooltip>
    </div>

    <div class="ui-item" v-if="this.value.show == 1 && this.value.showIcon == 1">
      <label class="ed-set-label">图片尺寸</label>
      <fsize @changeFont="changeSize" :index=index :value="value.iconSize"></fsize>
    </div>

    <div class="ui-item" v-if="this.value.show == 1 && this.value.showIcon == 1">
      <label class="ed-set-label">导航图片与文字间距</label>
      <fsize @changeFont="changeSpace" :index=index :value="value.spacing"></fsize>
    </div>
  </div>
</template>
<script>
import fsize from './Fsize'
import txChoose from './txChoose.vue'
export default {
  name: 'slider',
  props: [
    'value',
    'name',
    'index'
  ],
  data() {
    return {
      options: [],
      checkList: [],//传父组件tab值
      selectList: [],
      value1: this.value.show ? '1' : '0',
      value2: this.value.cId,
      value3: this.value.showIcon ? '1' : '0',
      myappid: null,//传子组件appid
      temp:0
    }
  },
  components: {
    fsize,
    txChoose
  },
  methods: {
    change(val) {
      var index = this.index
      var value = parseInt(val)
      var name = this.name
      this.$store.commit('updateTxt', { index, name, 'setObject': { 'show': value } })
    },
    handler(val) {
      var cid = val
      var index = this.index
      var name = this.name
      this.$store.commit('updateTxt', { index, name, 'setObject': { 'cId': cid } })
    },
    changeIcon(val) {
      var index = this.index
      var value = parseInt(val)
      var name = this.name
      this.$store.commit('updateTxt', { index, name, 'setObject': { 'showIcon': value } })
    },
    changeSize(size) {
      var index = this.index
      var name = this.name
      this.value.iconSize = size
      var value = this.value
      this.$store.commit('updateTxt', { index, name, value })
    },
    changeSpace(size) {
      var index = this.index
      var name = this.name
      this.value.spacing = size
      var value = this.value
      this.$store.commit('updateTxt', { index, name, value })
    },
    setHandler(o) {
      this.checkList = o;//传递子组件到父组件
      //console.log(this.checkList)
    },
    changeTab(){
       var index = this.index
       var name = this.name
       var tabIds = this.checkList;
       this.$store.commit('updateTxt', { index, name, 'setObject': { 'tabIds':tabIds} })
    },
    choosemyTab() {
      const h = this.$createElement;
      this.$msgbox({
        title: '分类选择',
        message: h(txChoose, {
          props: {
            options:this.options,
            value:this.value,
            temp:0
          },
          on: {
            set: this.setHandler
          }
        }),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: (action, instance) => {
          if (action === 'confirm') {
             this.changeTab()
             this.temp=1
             this.$message({
                type: 'success',
                message: '分类设置成功'
              });
          } else {
             this.temp=0
          }
        }
      });
    }
  },
   created () {
       var that = this
        wx.request({
          url: this.$root.apiServer + this.$root.appid + '/basic/api/product/catalogs',
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            if (res.statusCode == 200 && res.data.data.length) {
              // that.options = res.data.data
            var result = res.data.data
            var resArr = []
            result.forEach(function(item,idx){
              resArr.push({id:item.id,name:item.name,thumbnail:item.thumbnail})
            })
            that.options = resArr
              if(that.value.tabIds.length==0){
                  that.value.tabIds=that.options
              }

            }
          }
        })
   }
}
</script>
<style scoped>
.ui-item {
  margin-top: 10px;
}

.cursor {
  cursor: pointer
}

.ed-pic {
  padding: 15px;
}

.selectLink .el-select {
  margin-bottom: 10px;
}

.ed-pic-li {
  border: 1px solid #ededed;
  margin: 15px 0px;
  background-color: #fff;
}

.el-icon-delete {
  cursor: pointer;
}

.ed-pic-hd {
  padding: 10px;
}

.ed-flex {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.thumb {
  display: inline-block;
  width: 54px;
  height: 54px;
  margin: 0;
  text-align: center;
  font-size: 0;
  border: none;
}

.side-right .ed-pic-hd {
  padding: 10px;
  background: #fff;
  border-bottom: #ededed solid 1px;
}

.side-right .ed-pic-bd {

  position: relative;
}

.side-right .ed-pic-bd .ed-pic-box {
  padding: 10px;
}

.side-right .ed-pic-bd .labelTab {
  line-height: 40px;
  background: #f4f4f4;
  padding: 0 10px;
}

.ed-set-label-c {
  font-weight: normal;
  font-size: 12px;
}

.side-right .ed-pic-bd .labelTab:after {
  display: block;
  height: 0;
  content: '';
  clear: both;
  overflow: hidden;
  visibility: hidden;
}

.side-right .ed-pic-bd .el-button {
  position: absolute;
  left: 0;
  width: 80px;
  top: 40px;
}

.labelTab label {
  padding: 0;
  float: left;
  background: none;
  width: 80px;
  cursor: pointer;
  text-align: center;
  margin: 0;
}

.labelTab .addLab {
  background: #20a0ff;

  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  margin-top: 5px;
  color: #fff;
}

.vd-primary-color {
  width: 100%;
  background: #18ccc0;
  border: solid 1px #18ccc0;
}

.vd-primary-color:hover {
  background: #1be6d8;
  border: solid 1px #1be6d8;
}

.ed-nav-txt {
  padding-bottom: 10px;
}

.selectBtn {
  display: inline-block;
  width: 80px;
  margin-left: 20px
}

/* .dialogdef {
  padding: 20px
}

.z-index {
  z-index: 0!important
} */
</style>
