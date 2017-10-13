function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

let eventExt = {
  $dispatch (componentName, eventName, params) {
    let parent = this.$parent || this.$root
    let name = parent.$options.name

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = parent.$options.name
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  },
  $broadcast (componentName, eventName, params) {
    broadcast.call(this, componentName, eventName, params)
  }
}

const install = function (Vue) {
  Object.keys(eventExt).forEach((key) => {
    Object.defineProperty(Vue.prototype, key, {
      get: function () {
        return eventExt[key]
      }
    })
  })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(eventExt, { install: install, installed: false })   // eslint-disable-line no-undef
