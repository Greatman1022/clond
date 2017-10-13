export default {
  onlyPrice (val) {
    let minus = val.charAt(0)
    val = val.replace(/[^\d\\.]/g, '')
    val = val.replace(/^\./g, '')
    val = val.replace(/\.{2,}/g, '.')
    val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    if (minus === '-') {
      val = '-' + val
    }
    return val
  },

  onlyNum (val) {
    val = val.replace(/[^\d.]/g, '')
    return val
  },
  checkPhone (phone) {
    return !(/^1[34578]\d{9}$/.test(phone))
  },

  formatDate (d, fmt) {
    let _d = new Date(d)
    let o = {
      'M+': _d.getMonth() + 1,
      'd+': _d.getDate(),
      'h+': _d.getHours(),
      'm+': _d.getMinutes(),
      's+': _d.getSeconds(),
      'q+': Math.floor((_d.getMonth() + 3) / 3),
      'S': _d.getMilliseconds()
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (_d.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
