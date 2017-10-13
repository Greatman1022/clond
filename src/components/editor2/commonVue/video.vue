<template>
  <div class="wx-video">
    <div class="wx-video-container">
      <video
        ref="player"
        webkit-playsinline
        :src="src"
        @timeupdate="timeupdate"
        @durationchange="durationchange"
        @ended="ended"
        @loadeddata="canplay"
        @pause="pause"
      ></video>
      <div id="default" class="wx-video-bar" :class="barType">
        <div id="controls" class="wx-video-controls">
          <div
            class="wx-video-button"
            :class="status"
            @click.stop="play"
            ></div>
          <div class="wx-video-time">{{currentTime}}</div>
          <div ref="progress" class="wx-video-progress">
            <div
              class="wx-video-ball"
              :style="progressLeftStyle"
              @touchstart.stop="onBallTouchStart"
              @mousedown.stop="onBallTouchStart"
              >
              <div class="wx-video-inner"></div>
            </div>
            <div class="wx-video-inner" :style="progressLengthStyle"></div>
          </div>
          <div class="wx-video-time" parse-text-content>{{duration}}</div>
        </div>
        <div class="wx-video-danmu-btn" :class="danmuStatus" @click.stop="danmuBtnClick" v-if="danmuBtn">弹幕</div>
        <div id="fullscreen" class="wx-video-fullscreen" @click.stop="fullscreen"></div>
      </div>
      <div ref="danmu" class="wx-video-danmu" :style="danmuStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    controls: {
      type: Boolean,
      default: true
    },
    danmuList: Array,
    danmuBtn: {
      type: Boolean,
      default: false
    },
    enableDanmu: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    objectFit: {
      type: String,
      default: 'contain'
    }
  },
  data () {
    return {
      isCanPlay: false,
      playing: false,
      currentTime: '00:00',
      progressLeft: -22,
      progressLength: 0,
      danmuStatus: this.enableDanmu ? 'active' : '',
      duration: '00:00',
      rate: 0,
      isLockTimeUpdateProgress: false,
      danmuStyle: {
        zIndex: this.enableDanmu ? '0' : '-9999'
      },
      danmuObject: {},
      lastDanmuPosition: 0
    }
  },
  computed: {
    progressLeftStyle () {
      return {
        left: `${this.progressLeft}px`
      }
    },
    progressLengthStyle () {
      return {
        width: `${this.progressLength}px`
      }
    },
    status () {
      return this.playing ? 'pause' : 'play'
    },
    barType () {
      return this.controls ? 'full' : this.danmuBtn ? 'part' : 'none'
    }
  },
  watch: {
    src () {
      this.playing = false
      this.isCanPlay = false
      this.danmuObject = this._getDanmuObject()
    }
  },
  methods: {
    play () {
      let player = this.$refs.player
      if (player.paused) {
        this.$refs.player.play()
        this.playing = true
      } else {
        this.$refs.player.pause()
        this.playing = false
      }
    },
    timeupdate () {
      if (!this.$refs.player) return
      var n = this.$refs.player.currentTime / this.$refs.player.duration
      n > 0.99 && this._resetDanmu()
      if (!this.isLockTimeUpdateProgress) {
        this._setProgress(n)
        this.currentTime = this._formatTime(this.$refs.player.currentTime)
        var i = this.danmuObject[parseInt(this.$refs.player.currentTime)]
        i && i !== 0 && i.length > 0 && i.forEach((e) => {
          this._sendDanmu(e)
        })
      }
    },
    canplay () {
      this.isCanPlay = true
      this.autoplay && this.play()
    },
    pause () {
    },
    ended () {
      this.playing = false
    },
    durationchange () {
      this.duration = this._formatTime(this.$refs.player.duration)
    },
    fullscreen () {
      this.$refs.player.webkitEnterFullscreen()
    },
    onBallTouchStart () {
      if (!this.isCanPlay) return
      this.isLockTimeUpdateProgress = true
      var t = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.rate = e.type === 'mousemove' ? this._computeRate(e.clientX) : this._computeRate(e.touches[0].clientX)
        this._setProgress(this.rate)
      }
      var n = (e) => {
        this.$refs.player.currentTime = this.$refs.player.duration * this.rate
        document.removeEventListener('touchmove', t)
        document.removeEventListener('touchend', n)
        document.removeEventListener('mousemove', t)
        document.removeEventListener('mouseup', n)
        this.isLockTimeUpdateProgress = false
        this._resetDanmu()
      }
      document.addEventListener('touchmove', t)
      document.addEventListener('touchend', n)
      document.addEventListener('mousemove', t)
      document.addEventListener('mouseup', n)
    },
    danmuBtnClick () {
      this.danmuStatus = this.danmuStatus === '' ? 'active' : ''
      this.danmuStyle.zIndex = this.danmuStyle.zIndex === '-9999' ? '0' : '-9999'
    },
    _formatTime (time) {
      if (time === Infinity) return '00:00'
      time = parseInt(time)
      let t = Math.floor(time / 3600)
      let n = Math.floor((time - 3600 * t) / 60)
      let i = time - 3600 * t - 60 * n
      return t === 0 ? (n >= 10 ? n : '0' + n) + ':' + (i >= 10 ? i : '0' + i) : (t >= 10 ? t : '0' + t) + ':' + (n >= 10 ? n : '0' + n) + ':' + (i >= 10 ? i : '0' + i)
    },
    _computeRate (e) {
      var t = this.$refs.progress.getBoundingClientRect().left
      var n = this.$refs.progress.offsetWidth
      var i = (e - t) / n
      i < 0 ? i = 0 : i > 1 && (i = 1)
      return i
    },
    _setProgress (e) {
      this.progressLength = Math.floor(this.$refs.progress.offsetWidth * e)
      this.progressLeft = this.progressLength - 22
    },
    _sendDanmu (danmu) {
      if (this.playing && !danmu.flag) {
        danmu.flag = !0
        var t = document.createElement('p')
        t.className += 'wx-video-danmu-item'
        t.textContent = danmu.text
        t.style.top = this._genDanmuPosition() + '%'
        t.style.color = danmu.color
        this.$refs.danmu.appendChild(t)
        t.style.left = '-' + t.offsetWidth + 'px'
      }
    },
    _genDanmuPosition () {
      if (this.lastDanmuPosition) {
        var e = 100 * Math.random()
        Math.abs(e - this.lastDanmuPosition) < 10 ? this.lastDanmuPosition = (this.lastDanmuPosition + 50) % 100 : this.lastDanmuPosition = e
      } else {
        this.lastDanmuPosition = 100 * Math.random()
      }
      return this.lastDanmuPosition
    },
    _resetDanmu () {
      this.$refs.danmu.innerHTML = ''
      Object.keys(this.danmuObject).forEach((t) => {
        this.danmuObject[t].forEach((e) => {
          e.flag = false
        })
      })
    },
    _getDanmuObject () {
      return this.danmuList.reduce((e, t) => {
        if (typeof t.time === 'number' &&
          t.time >= 0 &&
          typeof t.text === 'string' &&
          t.text.length > 0) {
          e[t.time] ? e[t.time].push({ text: t.text, color: t.color || '#ffffff' }) : e[t.time] = [{ text: t.text, color: t.color || '#ffffff' }]
        }
        return e
      }, {})
    }
  },
  mounted () {
    this.danmuObject = this._getDanmuObject()
  }
}
</script>

<style>
.wx-video {
  width: 300px;
  height: 225px;
  display: inline-block;
  line-height: 0;
  overflow: hidden;
}

.wx-video[hidden] {
  display: none;
}

.wx-video .wx-video-container {
  width: 100%;
  height: 100%;
  background-color: black;
  display: inline-block;
  position: relative;
}

.wx-video video {
  width: 100%;
  height: 100%;
}

.wx-video .wx-video-bar {
  height: 44px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: absolute;
  bottom: 0;
  right: 0;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 10px;
}

.wx-video .wx-video-bar.full {
  left: 0;
}

.wx-video .wx-video-bar.part {
  margin: 5px;
  border-radius: 5px;
  height: 34px;
}

.wx-video .wx-video-bar.none {
  display: none;
}

.wx-video .wx-video-bar > .wx-video-controls {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  margin: 0 8.5px;
}

.wx-video .wx-video-bar > .wx-video-controls > .wx-video-button {
  width: 13px;
  height: 15px;
  margin: 14.5px 12.5px 14.5px 0;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.wx-video .wx-video-bar > .wx-video-controls > .wx-video-button.play {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAWhJREFUSA1j+P///0cgBoHjQGzCQCsAtgJB/AMy5wCxGNXtQ9iBwvoA5BUCMQvVLEQxHpNzDSjkRhXLMM3GKrIeKKpEkYVYjcUu+AMo3ALE3GRZiN1MvKKPgbIRJFuG10j8koeA0gZEW4jfLIKyf4EqpgOxMEELCRpFnIJ3QGU5QMyM00LizCFa1SWgSkeslhFtBGkKVwGVy6FYSJp+klR/A6quB2JOkIWMIK0oNlOf8xBoZDE9LAI7nYn6HsBq4l96WHQEaLUpAyiOaASeAM2NgvuPBpaACt82IEYtfKls0UagecpwXyAzqGTRdaA57sjmYrAptAjUsCkGYlYMg9EFyLQI1IiZB8Ti6Obh5JNh0QmgHlOcBuKSIMGi50C18UDMiMssvOJEWPQLqKYbiHnxGkRIkoBF24DyaoTMIEoeh0W3geI+RBlArCI0iz4D+RVAzEasfqLVAQ19AcSg5LoYiKWI1kiiQgCMBLnEEcfDSgAAAABJRU5ErkJggg==');
}

.wx-video .wx-video-bar > .wx-video-controls > .wx-video-button.pause {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAFlJREFUSA3tksEKACAIQ7X//5zq98wOgQayum8QaGweHhMzG/6OujzKAymn+0LMqivu1XznWmX8/echTIyMyAgTwA72iIwwAexgj8gIE8CO3aMRbDPMaEy5BRGaKcZv8YxRAAAAAElFTkSuQmCC');
}

.wx-video .wx-video-bar > .wx-video-controls > .wx-video-progress {
  height: 2px;
  margin: 21px 12px;
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
  -webkit-flex-grow: 2;
  flex-grow: 2;
}

.wx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-ball {
  width: 16px;
  height: 16px;
  padding: 14px;
  position: absolute;
  top: -21px;
}

.wx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-ball > .wx-video-inner {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 50%;
}

.wx-video .wx-video-bar > .wx-video-controls > .wx-video-progress > .wx-video-inner {
  width: 0;
  height: 100%;
  background-color: #ffffff;
}

.wx-video .wx-video-bar > .wx-video-controls > .wx-video-time {
  height: 14.5px;
  line-height: 14.5px;
  margin-top: 15px;
  margin-bottom: 14.5px;
  font-size: 12px;
  color: #cbcbcb;
}

.wx-video .wx-video-bar > .wx-video-danmu-btn {
  white-space: nowrap;
  line-height: 1;
  padding: 2px 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
  margin: 0 8.5px;
}

.wx-video .wx-video-bar > .wx-video-danmu-btn.active {
  border-color: #48c23d;
  color: #48c23d;
}

.wx-video .wx-video-bar > .wx-video-fullscreen {
  width: 17px;
  height: 17px;
  /*margin: 13.5px 16px 13.5px 17px;*/
  margin: 0 8.5px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAQRJREFUWAnt1d0NwiAQB/CmS7hHX5zFxLF0Ah2hE/lg7BT4PyMJUj6Oyt299BIioZT7ARYG59wLpTXmoXOMGO/QecxtwyWW4o42AupGALkFdX1MkHxE3Q7jIbQPqNthQogpJoZkMLRlsn/gFMQEk4OoY0oQVUwNoobhQFQwgMxUKFkt0C8+Zy61d8SeR5iHWCLOwF/MCb8Tp//ex3QFsE1HlCfKFUX2OijNFMnPKD7k76YcBoL402Zh8B77+MjlXrVvwfglXA32b0MrRgxCE2nBiEJaMOIQLkYFwsGoQWoYVUgJow4pYD4Weq4ayBqfwDYQmnUK0301kITujuawu65/l2B5A4z3Qe+Ut7EBAAAAAElFTkSuQmCC');
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.wx-video .wx-video-danmu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-bottom: 44px;
}

.wx-video .wx-video-danmu > .wx-video-danmu-item {
  line-height: 1;
  position: absolute;
  color: #ffffff;
  white-space: nowrap;
  left: 100%;
  transition: 3s linear;
}
</style>
