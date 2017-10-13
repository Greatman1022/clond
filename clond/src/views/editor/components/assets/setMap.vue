<template>
  <wx-view>
    <wx-view class="handler" @click.native="handler">
      <wx-view>
        <wx-image class="icon-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAcCAMAAAC9M9RRAAAATlBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzsfMPcAAAAGXRSTlMAB1hsFvjnJBB2vNUb3mU3LIqVf63N8USicL+Z0wAAALtJREFUKM91kVkCgyAMRKeALAruVrn/RduSoBTb96MZSDIkIB7i0DFGvYoHCvomZhqJjGpjyaZYDvEb7VPpLdZ0nyYu3lkAm/s5Y418cqTQc6qiXlxUgr347I3CFpQ5IzNTVdB5j4wg4a/epc9R1QlY6NyA8BROMPQTPNnpzmtrfuOoRsdzXQFKqBjxZrrJE+1K13PmnQ2VPoCoRu1wUi6yxYUNV3GLAtOUFpmy946KPckCN0Ra3w9k6fAFYwMjK9UYWNIAAAAASUVORK5CYII="/>
        <wx-text class="address">{{mytude[2]}}</wx-text>
      </wx-view>
      <wx-view class="btn">
        <wx-image class="icon-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAATlBMVEUAAAAJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwcJuwe1lbRaAAAAGXRSTlMA8GgBdhf4Tw6ltQbmQNjijsebgSlbITcw9cK27gAAAJJJREFUKM9t0OsWRCAYheFQUnSQw8y+/xud1YRU3/Pz3RaKUSbejUQ+PYB2+GhEvqyDXJGI4tX9got6ZbEh+z55D3hZ72w0CvJf58Oi5IZ0GNT6+PyCxjjHQSqLyvYc65Q8uDwIVpB3D6zSI9mby05dlzX/oGkHFbtlLR6HgxgMgC4ejvo6ZxQHTOSg4BlJdvk2fnhsFIM3fBcUAAAAAElFTkSuQmCC"/>
        <wx-text>位置</wx-text>
      </wx-view>
    </wx-view>
  </wx-view>
</template>

<script>
let _setMap = {
  editorConfig: {
    height: {
      el: ['number'],
      label: '调整图片高度',
      type:'Number',
      value: '280',
      director : 'Fsize'
    },
    mytude: {
      el: ['number'],
      label: '调整经纬度',
      type:'Array',
      value: [39.916056,116.385384,'北京市西城区'],
      director : 'setMap'
    }
  },
  comName:"地图",
  props: {
    height: {
      default: '280',
      type: String
    },
    mytude: {
      default: [39.916056,116.385384,'北京市西城区'],
      type: Array
    },
    scale: {
      default: 13,
      type: Number
    }
  },
  computed: {
    markers() {
      let arr = [{
        iconPath: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAYCAYAAAAYl8YPAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAqNJREFUOI2F1EuIlmUUB/DffI7WZCFlUZCFm8opqMWLEkJtYkKjSYIuFETlwFkWQkFRtLGYIkmwRXKgyBbBtOhKZUYFhaDVt+hGaRcmkHCR1SwksslavGfs7XNmejbnfZ7/5Tmc9zxnyDwrIkaxGddiDZbhGL7BHjyXmV8P6oYGTFbgKdw9iA2sv/E8tmTmzElmEbEK7+HiOprGFPbhF5yFK3ErVhfnIK7JzEMnzCqjT3ARZvEgdmTmsXlKsAz3YBLD+BZrM3NmuDjbO0bjmbm7Iz4Pq3AoMw/XBdsi4ku8Ubrt2DxUxf6qsrw/M7d1TJ7FdZ3E3sJEZh4uzn14smp4WQ8TZTSNHUUaqfp1jdT+/cIVf7r0Ez2MFTDVqdEduBTHcRdWVvwLo4Ur/lRpxoYLhI87GVxd8dXM3FXfuyLietxUeA7oRntYWpufO2azFUf8d502gNO2DSwdxlEsx4oOYQ/uxMaIeEj718b9W8N3O9wzKh7tafsL1nYIL2FvfT+Kzyqq86kOd063r4dXanPzHJqZs9iAZypzFXdiQ+EiYqije20oIs7W/t7l2JSZr3duFRFLcSZ+zcw/B7Ab8TJmsHruOU3iAe1UuHxQNN+KiFPwufYtb83MR3qFTeIn7bjZ+n9GtR4rox/xOCyBfr//R9M03+E2rG+aZn+/3/9+kazG8XRtb8nMAzCXmarVzjqbiog1CxhdgRdr+0RmnmiT3gB3Cz7V9tzuiDh/wOhCvInT8QEe7uInTdOIuEDbe+fiC1yVmTMRcQ4+wiX4Aesy88iiZmXYlHAEH2IT3tZO2iNYn5kHB3ULzvmIuEHb0L0yWInfMZaZe+fTLFnIrN/vH2ia5jds1D7w47g9M99ZSLOgWRnub5rmVKzDvZn5wmL8fwDuKea3sTR5iwAAAABJRU5ErkJggg==",
        id: 0,
        latitude: this.mytude[0],
        longitude: this.mytude[1],
        width: 19,
        height: 24
      }]
      return arr
    }
  },
  methods: {
    handler () {
      var that = this
      wx.openLocation({
        longitude: that.mytude[1],
        latitude: that.mytude[0],
        address: that.mytude[2],
      })
    }
  }
}

export default ((obj) => {
  let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
  obj.methods = obj.methods || {}
  Object.keys(obj || {}).forEach(name => {
    if (lifeCycles.indexOf(name) > -1) {
      obj.methods[name] = obj[name]
    }
  })
  obj.methods['onLoad'] = function (...args) {
    wx.setNavigationBarTitle(obj.config && {
      title: obj.config.navigationBarTitleText
    })
    obj['onLoad'] && obj['onLoad'].apply(this, args)
  }
  return obj
})(_setMap)
</script>

<style scoped="scoped">
#map{
  width: 100%;
  z-index: 100;
}
.handler{
  height: 30px;
  line-height: 30px;
  display: flex;
  padding: 15px 10px;
  justify-content: space-between;
}
.handler .icon-1{
  width: 12px;
  height: 14px;
  vertical-align: middle;
}
.handler .icon-2{
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
.handler .address{
  font-size: 15px;
  line-height: 30px;
  max-width: 250px;
  overflow: hidden;
  display: inline-block;
  height: 30px;
  vertical-align: top;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn{
  font-size: 15px;
  width: 68px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
}
</style>
