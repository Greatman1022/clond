<template>
  <div class='devicemanage'>
    <div class='bc_block'>
      <h2>打印机管理<span>( <i>*</i>暂时只支持飞鹅打印机)</span></h2>
      <div class='bc_item'>
        <p class='p_line'>
          <i class='icon'></i>
          <span class='first'>链接复制飞鹅打印机官网</span>
          <span class='grayColer' v-text='copyData1'></span>
          <a href='javascript:void(0)' v-clipboard="copyData1" @success="handleSuccess('复制成功1')" @error="handleError('复制失败1')">复制</a>
        </p>
      </div>
      <div class='bc_item'>
        <p class='p_line'>
          <i class='icon'></i>
          <span class='first'>飞鹅打印机官方淘宝店</span>
          <span class='grbyColer' v-text='copyData2'></span>
          <a href='javascript:void(0)' v-clipboard="copyData2" @success="handleSuccess('复制成功2')" @error="handleError('复制失败2')">复制</a>
        </p>
      </div>
      <div class='bc_item'>
        <p class='p_line'>
          <i class='icon'></i>
          <span class='first'>打印机开关</span>
          <span class='iswitch'>
            
          </span>
        </p>
      </div>
      <div class='bc_item'>
        <p class='p_word'>
          <i></i>
          //PRINTER_SN：打印机编号9位，查看飞鹅打印机底部贴纸上面的打印机编号；<br>//KEY：去飞鹅打印机官方网站 www.feieyun.com 注册帐号，添加打印机编号，自动生成KEY
        </p>
        <ul>
          <li>
            <label>
              <span>//PRINTER_SN：</span>
              <input type='text' name='number' placeholder="请输入打印机编号"/>
            </label>
          </li>
          <li>
            <label>
              <span>//KEY：</span>
              <input type='text' name='password' placeholder="请输入密码"/>
            </label>
          </li>
          <li>
            <span> </span>
            <input type='button' value='保存' />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'devicemanage',
  components: {
  },
  data () {
    return {
      copyData1: 'http://www.feieyun.com/index.jsp',
      copyData2: 'https://shop111951821.taobao.com/shop/view_shop.htm'
    }
  },
  methods: {
    handleSuccess (e) {
      alert(e)
    },
    handleError (e) {
      alert(e)
    }
  },
  comnputed: {
  },
  watch: {
  }
}
</script>

<style scoped>
.devicemanage{
  padding: 0 20px;
}
.bc_block{
  margin-top: 30px;
}
.bc_block h2{
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}
.bc_block h2 span{
  font-size: 14px;
  font-weight: normal;
}
.bc_block h2 span i{
  color:  #cc0000;
}
.bc_item{
  border-bottom: 1px dashed #e2e2e2;
  padding-top: 12px;
  line-height: 32px;
}
.bc_item p.p_line{
  clear: both;
  padding-bottom: 12px;
  overflow: hidden;
}
.bc_item p.p_line i.icon{
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 6px solid transparent;
  border-left: 10px solid #ddd;
  border-bottom: 6px solid transparent;
  margin: 1px 10px 0 0;
}
.bc_item p.p_line span.first{
  width: 280px;
  display: inline-block;
}
.bc_item p.p_line a{
  color: #0088cc;
  float: right;
}
.bc_item:last-child{
  border-bottom: none;
}
span.iswitch{
  display: inline-block;
  overflow: hidden;
  height: 32px;
}
.el-switch{
  float: left;
  height: 32px;
}
.bc_item p.p_word{
  position: relative;
  padding:8px 35px;
  background-color: #f5f5f5;
  color: #666;
  line-height: 24px;
  margin-bottom: 20px;
}
.bc_item p.p_word i{
  position: absolute;
  top: 10px;
  left: 10px;
  width: 18px;
  height: 18px;
  display: inline-block;
  background: url(~assets/images/icon/icon_notes.png) no-repeat;
}
.bc_item ul li{
  padding-bottom: 20px;
}
.bc_item ul li label{
  display: inline-block;
}
.bc_item ul li span{
  width: 133px;
  display: inline-block;
  text-align: right;
}
.bc_item ul li label input{
  line-height: 38px;
  width: 228px;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 0 10px;
}
input[type='button']{
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
