<template>
  <div class="side-right vd-box-sizing" v-show="showRight" :class="tipPanel" :data-type="comPanel">
    <div class="side-right-div">
      <PageProp v-show="!canAdd && !canEditor"></PageProp>
      <Components v-if="canAdd"></Components>
      <Setting v-if='canEditor'></Setting>
    </div>
  </div>
</template>

<script type="text/javascript">
  import  Setting from './components/Setting'
  import Components from './components/Components'
  import PageProp from  './components/PageProp'
  export default {
    data () {
      return {
        comPanel: ''
      }
    },
    props: {
      tipPanel: String
    },
    computed: {
      canAdd() {
        return this.$store.state.canAdd
      },
      canEditor() {
        return this.$store.state.canEditor
      },
      showRight() {
        return this.$store.state.showRight
      }
    },
    components: {
      Components: Components,
      Setting: Setting,
      PageProp:PageProp
    },
    updated () {
      if(this.canAdd){
        this.comPanel = 'comPanel'
      }else{
        this.comPanel = ''
      }
    }
  }
</script>
<style scoped>
.side-right{
  width: 365px;
  background: #f4f4f4;
  border-left: 1px solid #ddd;
  position: absolute;
  right: 0;
  top:60px;
  bottom: 0;
  height: calc(100% - 60px);
  z-index:980;
  overflow:hidden;
}
[data-type='comPanel']{
  top: 0;
}
.showPanel{
  padding-top: 0;
  z-index:1000002;
}
.side-right-div{
  height: 100%;
  overflow-y: auto;
  width: 100%;
}
</style>
