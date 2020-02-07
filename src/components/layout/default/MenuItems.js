export default {
  name: 'ErpMenuItems',
  props: {},
  data () {
    return {}
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
  },
  beforeDestroy () {
  },
  watch: {},
  methods: {},
  render (h) {
    return h('ul', {
      staticClass: 'u-erp-menu-items',
      'class': this.computedClass,
      style: this.computedStyle
    }, this.$slots.default)
  }
}
