<template>
  <div class="wx-map" ref="mapContainer">
    <div ref="map" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import loadMap from '../utils/loadMap.js'
export default {
  props: {
    longitude: Number,
    latitude: Number,
    scale: {
      type: Number,
      default: 16
    },
    markers: Array,
    polyline: Array,
    circles: Array,
    controls: Array,
    includePoints: Array,
    showLocation: Boolean,
    bindmarkertap: String,
    bindcontroltap: String,
    bindregionchange: String,
    bindtap: String
  },
  data () {
    return {
      _qq: null,
      _map: null
    }
  },
  watch: {
    longitude (newVal) {
      this._map.setCenter(new this._qq.maps.LatLng(this.latitude, newVal))
    },
    latitude (newVal) {
      this._map.setCenter(new this._qq.maps.LatLng(newVal, this.longitude))
    },
    scale (newVal) {
      this._map.zoomTo(parseInt(newVal))
    },
    markers () {
      this.markersChange()
    },
    polyline () {
      this.polylineChange()
    },
    circles () {
      this.circlesChange()
    },
    controls (v) {
      this.controlsChange()
    },
    includePoints () {
      this.pointsChange()
    }
  },
  mounted () {
    if (!this._qq) {
      loadMap.loaded().then(() => {
        this._qq = window.qq
        this.insertMap()
        this.markersChange()
        this.polylineChange()
        this.circlesChange()
        this.controlsChange()
        this.pointsChange()
      })
    }
  },
  beforeDestroy () {
    this._map = this._qq = null
  },
  methods: {
    insertMap () {
      this._map = new this._qq.maps.Map(this.$refs.map, {
        zoom: parseInt(this.scale),
        center: new this._qq.maps.LatLng(this.latitude, this.longitude),
        mapTypeId: this._qq.maps.MapTypeId.ROADMAP,
        panControl: false,
        scaleControl: false,
        zoomControl: false,
        mapTypeControl: false
      })
      this.$refs.mapContainer['_map'] = this._map
    },
    markersChange () {
      if (!this._map) return
      (this.markers || []).map((marker) => {
        var n = new this._qq.maps.Marker({
          position: new this._qq.maps.LatLng(marker.latitude, marker.longitude),
          map: this._map
        })

        marker.iconPath && (Number(marker.width) && Number(marker.height)
        ? n.setIcon(new this._qq.maps.MarkerImage(marker.iconPath, new this._qq.maps.Size(marker.width, marker.height), new this._qq.maps.Point(0, 0), new this._qq.maps.Point(marker.width / 2, marker.height), new this._qq.maps.Size(marker.width, marker.height)))
        : n.setIcon(new this._qq.maps.MarkerImage(marker.iconPath)))

        if (marker.title || marker.name) {
          n.setTitle(marker.title || marker.name)
        }

        // this.bindmarkertap && typeof t.id !== 'undefined' && qq.maps.event.addListener(n, 'click', function(n) {
        //   var i = n.event;
        //   i instanceof TouchEvent ? i.type === 'touchend' && wx.publishPageEvent(e.bindmarkertap, { markerId: t.id }) : wx.publishPageEvent(e.bindmarkertap, { markerId: t.id })
        // })
        return n
      })
    },
    polylineChange () {
      if (!this._map) return
      (this.polyline || []).map((line) => {
        var n = line.points.map((e) => {
          return new this._qq.maps.LatLng(e.latitude, e.longitude)
        })
        return new this._qq.maps.Polyline({
          map: this._map,
          path: n,
          strokeColor: this._transformColor(line.color) || '',
          strokeWidth: line.width,
          strokeDashStyle: line.dottedLine ? 'dash' : 'solid'
        })
      })
    },
    circlesChange () {
      if (!this._map) return
      (this.circles || []).map((circle) => {
        return new this._qq.maps.Circle({
          map: this._map,
          center: new this._qq.maps.LatLng(circle.latitude, circle.longitude),
          radius: circle.radius,
          fillColor: circle.fillColor && this._transformColor(circle.fillColor) || '',
          strokeColor: circle.color && this._transformColor(circle.color) || '',
          strokeWeight: circle.strokeWidth || 1
        })
      })
    },
    controlsChange () {
      if (!this._map) return
      for (var n = this._controls = this._controls || []; n.length;) {
        var i = n.pop()
        i.onclick = null
        i.parentNode.removeChild(i)
      }
      (this.controls || []).forEach((t) => {
        var i = document.createElement('img')
        i.style.position = 'absolute'
        i.style.left = (t.position && t.position.left || 0) + 'px'
        i.style.top = (t.position && t.position.top || 0) + 'px'
        i.style.width = (t.position && t.position.width || '') + 'px'
        i.style.height = (t.position && t.position.height || '') + 'px'
        i.style.zIndex = 9999
        i.src = t.iconPath
        // t.clickable && typeof t.id !== 'undefined' && (i.onclick = function() { wx.publishPageEvent(e.bindcontroltap, { controlId: t.id }) })
        this._controls.push(i)
        this.$refs.map.appendChild(i)
      })
    },
    pointsChange () {
      if (!this._map || !this.includePoints) return
      var n = new this._qq.maps.LatLngBounds();
      (this.includePoints || []).forEach((e) => {
        n.extend(new this._qq.maps.LatLng(e.latitude, e.longitude))
      })
      this._map.fitBounds(n)
    },
    showLocationChange () {
    },
    _transformColor (e) {
      e.indexOf('#') === 0 && (e = e.substr(1))
      var t = Number('0x' + e.substr(0, 2))
      var n = Number('0x' + e.substr(2, 2))
      var i = Number('0x' + e.substr(4, 2))
      var o = e.substr(6, 2) ? Number('0x' + e.substr(6, 2)) / 255 : 1
      return new this._qq.maps.Color(t, n, i, o)
    }
  }
}
</script>

<style>
.wx-map {
  position: relative;
  width: 300px;
  height: 150px;
  display: block;
}
</style>
