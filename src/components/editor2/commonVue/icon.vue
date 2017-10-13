<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 23
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes () {
      var types = ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear']
      if (types.indexOf(this.type) !== -1) {
        return 'wx-icon wx-icon-' + this.type
      }
      return 'wx-icon'
    },
    styles () {
      return 'font-size: ' + this.size + 'px;' + 'color: ' + this.color
    }
  }
}
</script>

<style>
.wx-icon {
    display: inline-block;
    font-size: 0;
}

.wx-icon[hidden] {
    display: none;
}

.wx-icon {
    font: normal normal normal 14px/1 "weui";
}

[class^="wx-icon-"]:before,
[class*=" wx-icon-"]:before {
    margin: 0;
}

.wx-icon-success {
    color: #09BB07;
}

.wx-icon-success:before {
    content: "\EA06";
}

.wx-icon-info {
    color: #10AEFF;
}

.wx-icon-info:before {
    content: "\EA03";
}

.wx-icon-warn {
    color: #F76260;
}

.wx-icon-warn:before {
    content: "\EA0B";
}

.wx-icon-waiting {
    color: #10AEFF;
}

.wx-icon-waiting:before {
    content: "\EA09";
}

.wx-icon-safe_success {
    color: #09BB07;
}

.wx-icon-safe_success:before {
    content: "\EA04";
}

.wx-icon-safe_warn {
    color: #FFBE00;
}

.wx-icon-safe_warn:before {
    content: "\EA05";
}

.wx-icon-success_circle {
    color: #09BB07;
}

.wx-icon-success_circle:before {
    content: "\EA07";
}

.wx-icon-success_no_circle {
    color: #09BB07;
}

.wx-icon-success_no_circle:before {
    content: "\EA08";
}

.wx-icon-waiting_circle {
    color: #10AEFF;
}

.wx-icon-waiting_circle:before {
    content: "\EA0A";
}

.wx-icon-circle {
    color: #C9C9C9;
}

.wx-icon-circle:before {
    content: "\EA01";
}

.wx-icon-download {
    color: #09BB07;
}

.wx-icon-download:before {
    content: "\EA02";
}

.wx-icon-info_circle {
    color: #09BB07;
}

.wx-icon-info_circle:before {
    content: "\EA0C";
}

.wx-icon-cancel {
    color: #F43530;
}

.wx-icon-cancel:before {
    content: "\EA0D";
}

.wx-icon-search {
    color: #B2B2B2;
}

.wx-icon-search:before {
    content: "\EA0E";
}

.wx-icon-clear {
    color: #B2B2B2;
}

.wx-icon-clear:before {
    content: "\EA0F";
}

[class^="wx-icon-"]:before,
[class*=" wx-icon-"]:before {
    box-sizing: border-box;
}
</style>
