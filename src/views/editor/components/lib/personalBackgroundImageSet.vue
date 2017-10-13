<template>
  <div class="wx-upload" style="margin-left:10px">
    <i>背景图片:</i>
    <el-button size="small" type="primary" class="ed-upload-btn vd-primary-color">
      更换图片
    </el-button>
    <input type="file" ref="upload" @change="changePic" class="ed-upload">
    <i style="display: block;margin-top: 5px;">提示：若背景颜色和背景图片同时设置，只显示背景颜色</i>
  </div>

</template>
<script>
import axios from 'axios'
export default{
  name: 'uploader',
  data () {
    return {
      src: 'http://image-dev.vdongchina.com/group2/M00/00/01/wKgfyFkK1GaENjB5AAAAAHrp8co482.png'
    }
  },
  props:{
    index:{
      type: Number
    },
    name: String
  },
  methods: {
    changePic (e) {
      let $this=this
      let input = this.$refs.upload
      let form = new FormData()
      if (input.files[0] !== undefined) {
        form.append('file', input.files[0])
        form.append('project',this.$root.upAppid)
        axios.post('http://upload.vdongchina.com/', form, {
          headers: {'Content-Type':'multipart/form-data'}}).then(function (res) {
            let src = 'http://image.vdongchina.com/' + res.data.fileid
            $this.src = src
            var cname = $this.$parent.$options.name
            if($this.$parent && (cname === 'slider' || cname==='shopcartSwitch')){
              $this.$emit('upload', [$this.src,$this.index])
            }else{
              var name = $this.name
              $this.$store.commit('updateTxt',{name:name, value:src})
            }

          }
        )
      }
    }
  }
}
</script>
<style scoped>
  i{
    margin:0px 10px;
  }
  .ed-upload-btn{
    position: relative;
    display: inline-block;
    margin-left: 10px;
  }
  .ed-upload{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
  .vd-primary-color{
	background: #18ccc0;
	border: solid 1px #18ccc0;
  margin-left: 0;
	}
.vd-primary-color:hover{
	background: #1be6d8;
	border: solid 1px #1be6d8;
}
.wx-upload{
  display: inline-block;
  position: relative;

}
</style>
