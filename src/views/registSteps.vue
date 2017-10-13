<template>
  <div id='registSteps'>
    <div class='registSteps'>
      <div class="pd_width frameWidth">
        <step1 v-if="step=='1'"></step1>
        <step2 v-if="step=='2'"></step2>
        <step3 v-if="step=='3'"></step3>
        <step4 v-if="step=='4'"></step4>
      </div>
    </div>
  </div>
</template>
<script>
import step1 from 'components/registSteps/step1'
import step2 from 'components/registSteps/step2'
import step3 from 'components/registSteps/step3'
import step4 from 'components/registSteps/step4'
export default {
  name: 'registSteps',
  data() {
    return {
      step: String
    }
  },
  components: {
    step1,
    step2,
    step3,
    step4
  },
  methods: {
    changeStep: function () {
      this.step = this.$route.params.step
    }
  },
  created () {
    this.changeStep()
  },
  watch: {
    '$route': 'changeStep'
  }
}
</script>
<style scoped>
.registSteps{
  padding: 20px 0 30px;
}

</style>
