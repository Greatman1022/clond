<template>
  <div>
    <iframe id="mapPage" width="100%" height="450px" frameborder=0 
    :src = "locpickerUrl">
    </iframe>
  </div>
</template>
<script>
var ip = returnCitySN.cip;
export default {
  name: 'txmap',
  data() {
    return {
      mytude: [],
      locpickerUrl: "http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&coord="
    }
  },
  watch: {
    mytude(val) {
      this.$emit('set', val)
    }
  },
  created() {
    let self = this
    let ip = returnCitySN.cip;
    // let ip = '36.25.114.120';
    $.ajax({
      url: 'https://apis.map.qq.com/ws/location/v1/ip?key=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU&ip='+ ip +'&output=jsonp&callback=fn2',
      type:'GET',
      dataType:'jsonp',
      jsonp:'callback',
      async: false,
      jsonpCallback: 'fn2',
      success: function(res) {
        if (res.status === 0) {
          self.locpickerUrl = self.locpickerUrl + res.result.location.lat + ',' + res.result.location.lng
        } else {
          self.locpickerUrl = self.locpickerUrl + '29.8042,121.54529'
        }
      }
    })
  },
  mounted() {
    var loc;
    var self = this
    window.addEventListener('message', function(event) {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息.
      loc = event.data;
      if (loc && loc.module == 'locationPicker') { //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        self.mytude = []
        Object.keys(loc.latlng).forEach(item => {
          self.mytude.push(loc.latlng[item])
        })
        self.mytude.push(loc.poiaddress)
      }
    }, false)
  }
}
</script>
