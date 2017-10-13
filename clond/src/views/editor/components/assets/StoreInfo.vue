<template>
  <wx-view>
    <wx-view class="index_recommend bmg clear" @click.native="recommend" :style="'background:'+bgColor">
      <wx-view class="left index_brand">
        <wx-image class="index_brand_image" :src="'http://image.vdongchina.com/'+imgLogo"/>
      </wx-view>
      <wx-view class="left index_mend">
        <wx-view class="index_mend_title" :style="'color:'+titColor">{{mendTitle}}</wx-view>
        <wx-view class="index_mend_matter" :style="'color:'+desColor">{{mendMatter}}</wx-view>
      </wx-view>
    </wx-view>

    <!--店铺介绍dialog-->
  	<wx-view class="mendbackg" v-if="recommendDisplay" @click="recommendClose">
  		<wx-view class="mendDialog">
  			<wx-view class="recommendDialog_title">{{mendTitle}}</wx-view>
  			<wx-scroll-view scroll-y="true" class="recommendDialog_matter">{{mendMatter}}</wx-scroll-view>
  		</wx-view>
  	</wx-view>
  </wx-view>
</template>

<script>
let _StoreInfo = {
  editorConfig: {
  	bgColor: {
      el: ['text', 'color'],
      label: '设置组件背景色',
      type: 'String',
      value: '#ffffff',
      director : 'ColorPicker'
    },
    titColor: {
      el: ['text', 'color'],
      label: '设置标题颜色',
      type: 'String',
      value: '#111',
      director : 'ColorPicker'
    },
    desColor: {
      el: ['text', 'color'],
      label: '设置描述颜色',
      type: 'String',
      value: '#666',
      director : 'ColorPicker'
    }
  },
  comName:"店铺信息",
  props: {
		bgColor: {
      default: '#ffffff',
      type: String
    },
    titColor: {
      default: '#111',
      type: String
    },
    desColor: {
      default: '#666',
      type: String
    }
  },
  data(){
    return {
			imgLogo: 'http://image.vdongchina.com/M00/01/2E/ZSUkmVmrXqWEffFBAAAAAG9swb8031.png',
      mendTitle: '店铺名',
      mendMatter: '描述信息',
      recommendDisplay: false
    }
  },
  onLoad() {
		 var that = this
		 wx.request({
		     url: this.$root.apiServer + this.$root.appid + '/basic/api/store/defaultStoreInfo',
		  	//  url: this.$root.apiServer+this.$root.appid+'/72FIlvny2aA3KCfj9Ox/basic/api/store/defaultStoreInfo',
		     method: 'POST',
		     header: {
		         'content-type': 'application/json'
		     },
		     success (res) {
		       if(res.data.success){
		         that.imgLogo= res.data.data.logo
		         that.mendTitle= res.data.data.name
             that.mendMatter= res.data.data.intro
           }
		     }
		 })
	},
  methods: {
    recommend(){
      this.recommendDisplay=true
    },
    recommendClose() {
				this.recommendDisplay=false
		}
  }
}

export default ((obj) => {
  let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
  obj.methods = obj.methods || {}
  Object.keys(obj || {}).forEach(name => {
    if (lifeCycles.indexOf(name) > -1) {
      obj.methods[name] = obj[name]
    }
  })
  obj.methods['onLoad'] = function (...args) {
    wx.setNavigationBarTitle(obj.config && {
      title: obj.config.navigationBarTitleText
    })
    obj['onLoad'] && obj['onLoad'].apply(this, args)
  }
  return obj
})(_StoreInfo)
</script>

<style scoped>
  .clear::after{display: block;clear: both;content: "";height: 0;overflow: hidden;visibility: hidden}
  .left{float: left}
  .index_recommend {
  	padding: 15px
  }

  .index_brand_image {
  	width: 60px;
  	height: 60px;
  }

  .index_mend {
  	margin-left: 15px;
  }

  .index_mend_title {
  	line-height: 23px;
  	font-size: 16px;
  	color: #111111;
  	font-weight: bold;
  	margin-bottom: 10px;
  }

  .index_mend_matter {
  	overflow: hidden;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  	width: 270px;
  	color: #666666;
  	font-size: 12px;
  }
  .mendbackg {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
		z-index: 9
	}

	.mendDialog {
		position: fixed;
		width: 280px;
		height: 175px;
		left: 50%;
		top: 50%;
		margin-left: -140px;
    margin-top: -88px;
		background: #fff;
		border-radius: 4px;
		z-index: 10;
	}

	.recommendDialog_title {
		line-height: 40px;
		border-bottom: 1px solid #e5e5e5;
		font-size: 16px;
		text-align: center;
		font-weight: bold;
		color: #111111;
		box-sizing: border-box;
	}

	.recommendDialog_matter {
		padding: 12px;
		font-size: 12px;
		line-height: 20px;
		height: 135px;
		color: #666666;
		box-sizing: border-box;
	}
</style>
