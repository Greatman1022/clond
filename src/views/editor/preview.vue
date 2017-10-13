<template>
  <div class="preview_dialog">
    <div class="dialog_phone">
      <div class="dialog_content" >
        <iframe :src="previewUrl" id="preview" name="preview"></iframe>
      </div>
    </div>
    <div class="handler-box">
      <!-- <img src="../../../static/img/qr.jpg" alt=""> -->
      <canvas id="canvas"></canvas>
      <p class="qr-tip">微信扫一扫在手机上查看效果</p>
      <el-input placeholder="请输入内容" v-model="previewUrl" readonly>
        <el-button slot="append" v-clipboard="previewUrl" @success="handleSuccess('复制成功')" @error="handleError('复制失败')">复制</el-button>
      </el-input>
      <div class="btn-group">
        <!-- <span class="goHome" @click="gotoHome">返回</span> -->
        <span class="rel" @click='releaseBtn'>发布</span>
      </div>
      <p class="kefu">客服电话&nbsp;&nbsp;:&nbsp;&nbsp;400-960-6092</p>
    </div>
  </div>
</template>
<script>
import api from '../../fetch/api.js'
import QRCode from 'qrcode'
import vdPrefix from '../../../static/js/common_prefix'
export default {
  name: 'editor2',
  data() {
    return {
      appid: '',
      previewUrl: '',
      baseAppName: '',
      tempId: '',
      codeVersion: null,
      url: '',
      tab: 0,
      sampleAppid:''
    }
  },
  mounted () {
    this.url = location.href
    this.appid = this.$route.params.appid
    this.$store.state.upConfigTime = new Date().getTime()
    api.getGuardServer({
      appid: this.appid
    }).then(res => {
      this.codeVersion = res.success
      if (res.success) {
        this.is_preview = true
      } else {
        this.is_preview = false
      }
      api.getConfig({
        appid: this.appid
      }).then(res => {
        var obj = JSON.parse(res.customerApp.config || '{}')
        this.sampleAppid = obj.sampleAppid
        this.baseAppName = obj.baseAppName
        var pagesVal = obj.pages || [{
          pageName: 'pages1',
          title: '首页',
          children: []
        }]
        this.$store.commit('newTest', pagesVal)
        var arr = JSON.stringify(this.filterData())
        api.preview({
            config: arr,
            appid: this.is_preview?this.appid:'sample-' + this.sampleAppid //提取数据的APPID
          })
          .then(res1 => {
            var that = this
            this.query = setInterval(() => {
              api.queryStatus({
                  appid: that.appid
                })
                .then(res2 => {
                  switch (res2.status) {
                    case -1:
                      that.$message({
                        type: 'error',
                        message: '错误!'
                      });
                      clearInterval(that.query);
                      break
                    case 1:
                      that.$message({
                        type: 'info',
                        message: '预览正在初始化中...'
                      });
                      break
                    case 3:
                      api.previewUpdate({
                          config: arr,
                          appid: that.is_preview ?that.appid:'sample-' + that.sampleAppid
                        })
                        .then(res => {
                          clearInterval(that.query);
                          // that.previewUrl = 'http://101.37.170.129' + res1.url + '?time=' + Math.random()
                          // document.querySelector('#preview').onload = function() {
                          //   Loading.close()
                          // };
                          // // 二维码
                          // var canvas = document.getElementById('canvas')
                          //
                          // QRCode.toCanvas(canvas, that.previewUrl, function (error) {
                          // if (error) console.error(error)
                          // console.log('success!');
                          // })
                          var query3 = setInterval(()=>{
                            api.queryStatus({
                              appid: that.appid
                            })
                            .then(res3 => {
                              if(res3.status==3){
                                clearInterval(query3)

                                api.preview({
                                  config: arr,
                                  appid: this.is_preview?this.appid:'sample-' + this.sampleAppid
                                }).then(ress => {
                                  that.previewUrl = vdPrefix.appServer.previewServer + ress.url + '?time=' + Math.random()
                                  document.querySelector('#preview').onload = function() {
                                    Loading.close()
                                  };
                                  // 二维码
                                  var canvas = document.getElementById('canvas')
                                  QRCode.toCanvas(canvas, that.previewUrl, function (error) {
                                  if (error) console.error(error)
                                  console.log('success!');
                                  })
                                })
                              }
                            })
                          },1000)
                        })
                      break
                  }
                })
            }, 2000)
            document.querySelector('#preview').onload = function() {
              Loading.close()
            };
          })
      })
    })
    let Loading = this.$loading({
      target: '.dialog_content',
      text: '预览加载中...'
    })
  },
  methods: {
    deepCopy(source) {
      // 对象数组深拷贝
      var sourceCopy = source instanceof Array ? [] : {}
      for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item]) : source[item]
      }
      return sourceCopy
    },
    filterData() {  //过滤数据
      var arr = {}
      arr.baseAppName = this.baseAppName
      arr.sampleAppid = this.sampleAppid
      arr.appid = this.appid
      // var newApps = CommonJs.editorLocalStorage.backt()
      var newApps = this.$store.state.newApps
      var pages = this.deepCopy(newApps);
      for (var i = 0; i < pages.length; i++) {
        pages[i]['onShareAppMessage'] = {
          title: pages[i].title,
          path: `/${pages[i].pageName}/${pages[i].pageName}`
        }
        for (var n = 0; n < pages[i].children.length; n++) {
          delete pages[i].children[n].editorConfig
        }
      }
      arr.pages = pages
      return arr
    },
    handleSuccess (e) {
      alert(e)
    },
    handleError (e) {
      alert(e)
    },
    gotoHome() {   //返回
      // this.$router.push({
      //   name: 'miniprograms'
      // })
    },
    releaseBtn() { // 发布
      this.$router.push({
        name: 'backstagemanage',
        params: {
          appid: this.appid,
          tab: this.tab
        }
      })
    }
  }
}
</script>
<style>
.preview_dialog{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.dialog_phone{
  width: 426px;
  height: 768px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -384px;
  margin-left: -213px;
  background:url(../../../static/img/iphone.png) center no-repeat;
}
.dialog_content{
  position: absolute;
  width: 375px;
  height: 600px;
  left: 50%;
  top: 67px;
  margin-left:-187px;
  background: #fff;
}
iframe{
  height: 100%;
  width: 100%;
  border: 0;
}
.handler-box{
  width: 200px;
  padding: 60px 60px 25px;
  border: 1px solid #ddd;
  height: 480px;
  position: absolute;
  top: 50%;
  margin-top: -282px;
  left: 50%;
  margin-left: 270px;
  text-align: center;
}
.qr-tip,.kefu{
  font-size: 14px;
  color: #666;
  line-height: 20px;
  margin:16px 0 26px;
}
.kefu{
  color: #ccc;
  margin-top: 100px;
}
.btn-group{
  margin-top: 30px;
  text-align: center;
}
.btn-group:after{
	height: 0;
	clear: both;
	content: '';
	overflow: hidden;
	visibility: hidden;
	display: block;
}
.btn-group span{
	width: 78px;
	height: 30px;
	border: solid 1px #18ccc0;
	text-align: center;
	line-height: 30px;
	border-radius:4px ;
	color: #18ccc0;
	cursor: pointer;
  display: inline-block;
}
.btn-group .rel{
	background: #18ccc0  url(../../../static/img/icon-public.png) no-repeat;
	background-position:10px 8px ;
	color: #FFFFFF;
	padding-left: 12px;
	width: 66px;
}
#canvas{width:180px!important;height:180px!important;}

</style>
