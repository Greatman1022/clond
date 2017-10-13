<template>
    <div class="i-agent"></div> 
</template>

<script>
export default {
  name: 'iagent',
  mounted () {
    let _this = this
    setInterval(function () {
        _this.autoHeight()
    }, 500)
  },
  methods: {
    autoHeight () {
      var b_iframe = parent.parent.document.getElementById("contentManage");
      b_iframe.style.height = this.getQueryString('height') + "px";
    },
    getQueryString (name) {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
  }
}
</script>

<style scoped>
</style>
