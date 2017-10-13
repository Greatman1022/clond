<template>
<!-- 	<div id='vcode' class='vcode'>
    <input name='newpassword' type="text" placeholder="请输入验证码"> -->
		<button class="btn-vcode" :class='{disabled : disabled || time > 0}' :disabled="disabled || time > 0" v-text='text'></button>
<!-- 	</div> -->	
</template>

<script>
export default {
  name: 'vcode',
  props: {
    second: {
      type: Number,
      default: 60
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      time: 0
    }
  },
  methods: {
    run: function () {
      this.time = this.second
      this.timer()
    },
    timer: function () {
      /* this.disabled = false; */
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      }
    }
  },
  computed: {
    text: function () {
      return this.time > 0 ? this.time + 's' : '获取验证码'
    }
  }
}

</script>

<style scoped>
button{
  width:85px; 
  border-top-right-radius:4px; 
  border-bottom-right-radius:4px; 
  position:absolute; 
  right: 1px; 
  top:1px; 
  border:0;
  height:38px; 
  line-height:38px; 
  font-size:14px; 
  background:#18ccc0; 
  color:#fff; 
  cursor:pointer;
}
.disabled{
  background-color: #e2e1e2;
  color: #fff;
}
</style>
