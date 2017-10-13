<template>
  <div>
    <draggable id="sortable" v-model="com">
      <li class="ui-state-default sortableli" v-for="(item,index) in com" :class=" freeCindex == index?'selected':'unselected cancel'" :item='JSON.stringify(item)' :text='item.items.text' :length = 'com.length'><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>组件<img v-if="item.com == 'picture'" :src="item.items.currentSrc" height="50px" width="50px" style="margin-left:10px"></li>
    </draggable>
    <div class="tips">
        <span>提示&nbsp;&nbsp;:&nbsp;&nbsp;</span>可拖动调整子组件层级，编号越大层级越高。点击组件列表可直接选中组件<span>(ps:有背景色的为你选中组件)</span>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import "@/assets/jquery-ui.min.css"
  export default{
    components: {
      draggable: draggable
    },
    computed:{
      com:{
        get(){
          let cindex = this.$store.state.cindex 
          return this.$store.state.Coms[cindex].children
        },
        set(value){
          var key1
          $('.freePanelClose').remove()
          value.forEach((item,key)=>{
            if(item == this.com[this.freeCindex]){
              key1 = key
            }
            item.items['zIndex'] = value.length - key
          })
          this.$store.commit('freePanelAction',{type:3,arr:value, key: key1})
        }
      },
      freeCindex(){
        return this.$store.state.freeCindex
      }
    },
    data () {
      return {
        fIndex: this.$store.state.freeCindex,
        coms: this.$store.state.Coms[this.$store.state.cindex].children
      }
    },
    mounted(){
      let that = this
    },
    methods: {
    },
    render(){
     
    }
  }
</script>
<style scoped>
  .vd-primary-color{
		background: #18ccc0;
		border: solid 1px #18ccc0;
  	margin-left: 0;
	}
  .selected{
    background-color: #20a0ff;
    color:#fff;
  }
  #sortable{
    width: 100%;
  }
  #sortable li{
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
    cursor: move;
    padding: 5px;
    border-radius: 6px;
  }
  .tips{
    width: 90%;
    margin:auto;
    margin-top: 20px
  }
  .tips span{
    color: #18ccc0;  
  }
/*  .unselected{
    cursor: 
  }*/
</style>
