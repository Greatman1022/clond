<template>
  <div class="text" :style="{ color: color, fontSize: fontSize + 'px'}">
    {{ text }}
  </div>
</template>

<script>
  export default {
    name: 'text',
    editorConfig: {
      text: {
        el: ['textarea'],
        label: '请输入文本',
        type: String,
        value: '我是文本'
      },
      color: {
        el: ['text', 'color'],
        label: '请输入颜色',
        type: String,
        value: '#000fff'
      },
      fontSize: {
        el: ['number'],
        label: '调整字号',
        type: String,
        value: '16'
      }
    },
    props: {
      text: String,
      color: {
        type: String,
        default: '#f1f1f1',
        validator: function (value) {
          let reg = /^#[0-9a-fA-F]{3,6}$/
          if (reg.test(value)) {
            return (reg.test(value))
          }
        }
      },
      fontSize: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
