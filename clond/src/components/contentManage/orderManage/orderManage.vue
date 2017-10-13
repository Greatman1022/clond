<template>
  <div class='ordermanage'>
    <v-ordertable v-if='getIsOrderDetail == false'></v-ordertable>
    <v-orderdetail v-else></v-orderdetail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vOrderdetail from './orderdetail'
import vOrdertable from './ordertable'
export default {
  name: 'ordermanage',
  components: {
    vOrderdetail,
    vOrdertable
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(['getIsOrderDetail'])
  },
  watch: {
  }
}
</script>

<style scoped>
.ordermanage{
  padding: 0 20px;
}
</style>
