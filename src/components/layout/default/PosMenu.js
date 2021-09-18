export default {
  name: 'ErpPosMenu',
  inject: {
    erpheader: {
      default () {
        console.error('ModuleMenu needs to be child of ModuleHeader')
      }
    }
  },
  provide () {
    return {
      posmenu: this
    }
  },
  props: {
    user: {required: true}
  },
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
      this.erpheader.posmenu = this
    }
  },
  beforeDestroy () {
  },
  watch: {},
  methods: {
  },
  render (h) {
    return h('div', {
      staticClass: 'u-erp-posmenu',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      this.$slots.default
    ])
  }
}
