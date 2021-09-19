export default {
  name: 'ErpPosMenu',
  inject: {
    erplayout: {
      default () {
        console.error('PosMenu needs to be child of ErpLayout')
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
    if (this.erplayout) {
      this.erplayout.posmenu = this
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
