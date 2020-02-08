export default {
  name: 'ErpHeader',
  inject: {
    layout: {
      default () {
        console.error('ErpHeader needs to be child of ULayout')
      }
    },
    erplayout: {
      default () {
        console.error('ErpHeader needs to be child of ErpLayout')
      }
    }
  },
  provide () {
    return {
      layout: this.layout,
      erplayout: this.erplayout,
      erpheader: this
    }
  },
  props: {},
  data () {
    return {
      menu: null,
      modulemenu: null
    }
  },
  computed: {
    computedClass () {
      return {}
    },
    computedStyle () {
      const css = {}
      return css
    }
  },
  created () {
    if (this.erplayout) {
      this.erplayout.erpheader = this
    }
  },
  beforeDestroy () {
  },
  watch: {},
  methods: {
    getActualMenu () {
      return this.menu.getActiveMenu()
    },
    setMenuModuleToggle (v) {
      this.modulemenu && this.modulemenu.__toggleMenuModule(v)
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'u-erp-header',
      'class': this.computedClass,
      style: this.computedStyle
    }, this.$slots.default)
  }
}
