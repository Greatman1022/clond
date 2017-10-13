<template>

</template>

<script>
export default {
  name: 'slider',
  props: [
    'value',
    'name',
    'index'
  ],
  data() {
    return {
      val: this.value
    }
  }
}
</script>
<style scoped>

</style>
