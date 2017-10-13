<template>
	<div id='nopermission'>
		<p>您无权限访问该页面</p>
		<img src='~assets/images/no_list.png' />
	</div>
</template>

<script>
export default {
  name: 'nopermission',
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
#nopermission{
	 text-align: center;
	 padding: 150px 0;
}
p{
	line-height: 30px;
	font-size: 16px;
	margin-bottom: 20px;
}
</style>
