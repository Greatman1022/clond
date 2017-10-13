<template>
  <div id="app">
		<v-head v-if="!getPageType"></v-head>
    <div :class="[getPageType ? 'editor-wrap' : 'content-wrap']">
  		<transition name="fade" >
    		<router-view ></router-view>
    	</transition>
    </div>
    <v-footer v-if="!getPageType"></v-footer>
  </div>
</template>
<script>
import vHead from 'components/header/header'
import vFooter from 'components/footer/footer'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    vHead,
    vFooter
  },
  computed: {
    ...mapGetters([
      'getPageType'
    ])
  }
}
</script>

<style >
@import 'assets/css/public.css';
@import 'assets/css/ele.css';
</style>
