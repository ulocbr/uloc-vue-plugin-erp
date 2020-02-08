export default {
  name: 'ErpLayoutContainer',
  inject: {
    layout: {
      default () {
        console.error('ErpLayoutContainer needs to be child of ULayout')
      }
    },
    erplayout: {
      default () {
        console.error('ErpLayoutContainer needs to be child of ErpLayout')
      }
    }
  },
  provide () {
    return {
      layout: this.layout,
      erplayout: this.erplayout,
      erpcontainer: this
    }
  },
  props: {},
  data () {
    return {
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
    console.log(this.erplayout.erpheader)
  },
  beforeDestroy () {
  },
  watch: {},
  methods: {},
  render (h) {
    return h('div', {
      staticClass: 'u-erp-layout-container',
      'class': this.computedClass,
      style: this.computedStyle
    }, this.$slots.default)
  }
}
