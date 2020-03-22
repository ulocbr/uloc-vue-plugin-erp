export default {
  name: 'ErpMenu',
  inject: {
    erpheader: {
      default () {
        console.error('ModuleMenu needs to be child of ModuleHeader')
      }
    }
  },
  provide () {
    return {
      erpheader: this.erpheader,
      menu: this
    }
  },
  props: {},
  data () {
    return {
      activeMenu: null
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
    if (this.erpheader) {
      this.erpheader.menu = this
    }
  },
  beforeDestroy () {
  },
  watch: {},
  methods: {
    setActiveMenu (id) {
      this.activeMenu = id
      this.$emit('setActiveMenu', id)
    },
    click () {
      this.erpheader && this.erpheader.modulemenu && this.erpheader.modulemenu.toggledMenuModule && this.erpheader.modulemenu.__toggleMenuModule(false)
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'u-erp-menu',
      'class': this.computedClass,
      style: this.computedStyle,
      on: {
        click: this.click
      }
    }, [
      this.$slots.default
    ])
  }
}
