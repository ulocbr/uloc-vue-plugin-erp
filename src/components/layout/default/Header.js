export default {
  name: 'ErpHeader',
  provide () {
    return {
      header: this
    }
  },
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
    return h('div', {
      staticClass: 'u-erp-header',
      'class': this.computedClass,
      style: this.computedStyle
    }, this.$slots.default)
  }
}
