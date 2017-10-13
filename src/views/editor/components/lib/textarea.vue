<el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="val">
</el-input>

<script>
export default {
  props: [
    'value',
    'name',
    'index'
  ],
  data() {
    return {
      val: this.value
    }
  },
  methods: {
    change() {
      var index = this.index
      var value = this.val
      var name = this.name
      this.$store.commit('updateTxt', {
        index,
        name,
        value
      })
    }
  }
}
</script>