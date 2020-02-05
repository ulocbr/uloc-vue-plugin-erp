import './polyfills'
import Globals from './globals.js'
// import Http from './lib/http'

export const Plugin = Globals

export default function (Vue, opts = {}) {
  if (this.installed) {
    return
  }
  this.installed = true

  const cfg = opts.config || {}

  // Update config of plugin
  for (var _cfg in cfg) {
    if (typeof Plugin.config[_cfg] !== 'undefined') {
      Plugin.config[_cfg] = cfg[_cfg]
    }
  }

  // required plugins
  // XXX.install(Plugin)

  opts.components && Object.keys(opts.components).forEach(key => {
    const c = opts.components[key]
    if (c.name !== undefined && (c.render !== void 0 || c.mixins !== void 0)) {
      Vue.component(c.name, c)
    }
  })

  opts.directives && Object.keys(opts.directives).forEach(key => {
    const d = opts.directives[key]
    if (d.name !== undefined && d.unbind !== void 0) {
      Vue.directive(d.name, d)
    }
  })

  if (opts.plugins) {
    const param = {Plugin, Vue, cfg}
    Object.keys(opts.plugins).forEach(key => {
      const p = opts.plugins[key]
      if (typeof p.install === 'function') {
        p.install(param)
      }
    })
  }

  // This plugin is able to work without uloc-vue
  if (Vue.prototype.$uloc) {
    Vue.prototype.$uloc.erp = Plugin
  } else {
    Vue.prototype.$erp = Plugin
  }
}
