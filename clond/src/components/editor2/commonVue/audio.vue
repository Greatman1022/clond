<template>
  <div class="wx-audio">
    <audio
      ref="audio"
      :loop="loop"
      :src="src"
      @timeupdate="timeupdate"
      @ended="ended"
      style="display:none"></audio>
    <div class="wx-audio-default">
      <div class="wx-audio-left" :style="posterStyle">
        <div class="wx-audio-button" :class="status" @click.stop="play"></div>
      </div>
      <div class="wx-audio-right">
        <div class="wx-audio-time">{{currentTime}}</div>
        <div class="wx-audio-info">
          <div class="wx-audio-name">{{name}}</div>
          <div class="wx-audio-author">{{author}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    loop: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: false // 经测试，小程序默认是false
    },
    author: {
      type: String,
      default: '未知作者'
    },
    name: {
      type: String,
      default: '未知歌曲'
    },
    poster: String
  },
  data () {
    return {
      status: 'play',
      currentTime: '00:00'
    }
  },
  computed: {
    posterStyle () {
      return this.poster ? 'background-image: url(' + this.poster + ')' : ''
    }
  },
  methods: {
    play () {
      let audio = this.$refs.audio
      if (audio.paused) {
        this.$refs.audio.play()
        this.status = 'pause'
      } else {
        this.$refs.audio.pause()
        this.status = 'play'
      }
    },
    timeupdate () {
      this.currentTime = this._formatTime(this.$refs.audio.currentTime)
    },
    ended () {
      this.status = 'play'
    },
    _formatTime (time) {
      if (time === Infinity) return '00:00'
      time = parseInt(time)
      let t = Math.floor(time / 3600)
      let n = Math.floor((time - 3600 * t) / 60)
      let i = time - 3600 * t - 60 * n
      return t === 0 ? (n >= 10 ? n : '0' + n) + ':' + (i >= 10 ? i : '0' + i) : (t >= 10 ? t : '0' + t) + ':' + (n >= 10 ? n : '0' + n) + ':' + (i >= 10 ? i : '0' + i)
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (!this.controls) {
        this.$el.style.display = 'none'
        this.play()
      }
    })
  }
}
</script>

<style>
.wx-audio {
    display: inline-block;
    line-height: 0;
}

.wx-audio[hidden] {
    display: none;
}

.wx-audio > .wx-audio-default {
    max-width: 100%;
    min-width: 302px;
    height: 65px;
    background: #fcfcfc;
    border: 1px solid #e0e0e0;
    border-radius: 2.5px;
    display: inline-block;
    overflow: hidden;
}

.wx-audio > .wx-audio-default > .wx-audio-left {
    width: 65px;
    height: 65px;
    float: left;
    background-color: #e6e6e6;
    background-size: 100% 100%;
    background-position: 50% 50%;
}

.wx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button {
    width: 24px;
    height: 24px;
    margin: 20.5px;
    background-size: cover;
}

.wx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button.play {
    background-image: url('data:image/png;base64,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');
}

.wx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button.pause {
    background-image: url('data:image/png;base64,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');
}

.wx-audio > .wx-audio-default > .wx-audio-right {
    box-sizing: border-box;
    height: 65px;
    margin-left: 65px;
    padding: 11px 16.5px 13.5px 15px;
    overflow: hidden;
}

.wx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info {
    margin-right: 70px;
    overflow: hidden;
}

.wx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info > .wx-audio-name {
    height: 22.5px;
    line-height: 22.5px;
    margin-bottom: 3.5px;
    font-size: 14px;
    color: #353535;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.wx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info > .wx-audio-author {
    height: 14.5px;
    line-height: 14.5px;
    font-size: 12px;
    color: #888888;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.wx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-time {
    margin-top: 3.5px;
    height: 16.5px;
    font-size: 12px;
    color: #888888;
    float: right;
}
</style>
