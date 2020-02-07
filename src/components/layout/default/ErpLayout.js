export default {
  name: 'ErpLayout',
  props: {},
  data () {
    return {}
  },
  computed: {
    computedClass () {
      return {}
    },
    computedStyle () {
      const
        css = {}

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
      staticClass: 'u-erp-layout',
      'class': this.computedClass,
      style: this.computedStyle
    }, this.$slots.default)
  }
}
