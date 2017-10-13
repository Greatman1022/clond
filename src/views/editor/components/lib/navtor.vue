<template>
	<div class="ed-select">
	  <select @change="changeUrl">
	    <option v-for="(page, index) in pages" :value="index">{{ page.title }}</option>
	  </select>
	</div>
</template>
<script>
export default{
  name: 'navtor',
  data () {
    return {
      // 根据配置文件生成的pages对象 专门存储小程序所有页面及对应url
      pages: [
      ],
      url: ''
    }
  },
  methods: {
    changeUrl (e) {
      // console.log(e.target.selectedIndex)
      this.url = this.pages[e.target.selectedIndex].url
      let object = {
        target: {
          value: this.url
        }
      }
      this.$emit('navto', object)
    }
  }
}
</script>
<style scoped>
.ed-select{
	padding: 10px;
}	
.ed-select select{
	width: 240px;
	height: 32px;
	

}
</style>