<template>
  <div id='vmList'>
    <h2>线上版本</h2>
    <div class="">
      <div class="li_version">
        <span class="lab tc">版本号</span>
        <span class="version tc">V1.7</span>
      </div>
      <div class='li_con'>
        <p>
          <span class="lab">开发者</span>
          <span class="txt">王大妈</span>
        </p>
        <p>
          <span class="lab">发布时间</span>
          <span class="txt">2017-4-14 11:46:00</span>
        </p>
        <p>
          <span class="lab">描述</span>
          <span class="txt">分享功能完善</span>  
        </p>
      </div>

      <div class="li_qrcode">
<!--         <div class="rqcode_wrap">
          <span class="redColor">审核未通过</span>
        </div> -->

        <div class="rqcode_wrap">
          <div class="qr_img">
            <img src="" alt="">
          </div>
          <div class="qr_text">
            体验版 <img src="" alt="">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'vmList',
  data () {
    return {
      vtext: '微动学堂双十一',
      isInput: 0,
      isRelease: 1
    }
  },
  methods: {
    isEdit: function () {
      this.isInput = 1
    },
    isSave: function () {
      this.isInput = 0
    }
  }
}
</script>

<style scoped>
h2{
  font-size: 18px;
  padding-bottom: 22px;
}
.li_version{
  float: left;
  width: 80px;
  height: 80px;
  background-color: #f5f5f5;
  padding: 14px 0;
  box-sizing: border-box;
}
.li_version span{
  display: block;
}
.li_version .lab{
  color: #bbb;
}
.li_version .version{
  color: #333;
  font-size: 18px;
  font-weight: 500;
}
.li_con{
  float: left;
  line-height: 26px;
  margin-left: 50px;
}
.li_con .lab{
  width: 105px;
  color: #999;
  display: inline-block;
}
.li_con .txt{
  color: #333;
}
.li_qrcode{
  float: right;
}
.rqcode_wrap{
  height: 110px;
  border: 1px solid #d6d6d6;
  box-sizing: border-box;
  position: relative;
  padding-right: 28px;
  background-color: #e4e4e4;
}
.rqcode_wrap .qr_img{
  background-color: #fff;
  width: 105px;
  height: 108px;
  box-sizing: border-box;
}
.rqcode_wrap .qr_img img{
  width: 90px;
  height: 90px;
  padding: 10px 7.5px;
}
.qr_text{
  position: absolute;
  right: 0;
  top: 15px;
  text-align: center;
  padding: 0 8px;
  width: 28px;
  box-sizing: border-box;
  display: inline-block;
  background-color: #e4e4e4;
}



.li_con p{
  overflow: hidden;
}
.li_con input{
  border: none;
  border-bottom: 1px solid #18ccc0;
  line-height: 20px;
  width: 150px;
}
.li_con button{
  background-color: #666666;
  color: #fff;
  border: 1px solid #ccc;
  line-height: 26px; 
  width: 46px;
  border-radius: 3px;
  cursor: pointer;
}
.li_con em{
  font-size: 12px;
}
.li_con i{
  height: 15px;
  display: inline-block;
}
i.icon_edit_small{
  width: 15px;
  vertical-align: -2px;
  margin-left: 9px;
  cursor: pointer;
  background: url(~assets/images/icon/icon_edit_small.png)
}
i.icon_date{
  width: 13px;
  vertical-align: -2px;
  margin-left: 13px;
  background: url(~assets/images/icon/icon_date.png)
}
.li_handle{
  float: right;
}
.li_handle span{
  padding: 0 21px;
  width: 30px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  color: #999;
  float: left;
}
.li_handle span:hover{
  color: #18ccc0;
}
.li_handle span em{
  line-height: 25px;
  display: block;
  float: left;
  margin-top: 10px;
}
i.vicon{
  display: block;
  width: 20px;
  height: 20px;
  margin: 5px auto 0 auto;
}
i.icon_issue{  
  background: url(~assets/images/icon/icon_issued.png)
}
.li_handle span:hover i.icon_issue{
  background: url(~assets/images/icon/icon_issue.png)
}
i.icon_copy{
  background: url(~assets/images/icon/icon_copied.png)
}
.li_handle span:hover i.icon_copy{
  background: url(~assets/images/icon/icon_copy.png)
}
i.icon_view{
  background: url(~assets/images/icon/icon_viewed.png)
}
.li_handle span:hover i.icon_view{
  background: url(~assets/images/icon/icon_view.png)
}
i.icon_edit{
  background: url(~assets/images/icon/icon_edited.png)
}
.li_handle span:hover i.icon_edit{
  background: url(~assets/images/icon/icon_edit.png)
}
i.icon_delete{
  background: url(~assets/images/icon/icon_deleted.png)
}
.li_handle span:hover i.icon_delete{
  background: url(~assets/images/icon/icon_delete.png)
}
</style>
