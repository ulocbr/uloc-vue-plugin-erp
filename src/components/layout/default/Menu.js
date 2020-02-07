export default {
  name: 'ErpMenu',
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
  created () {},
  beforeDestroy () {
  },
  watch: {},
  methods: {},
  render (h) {
    return h('div', {
      staticClass: 'u-erp-menu',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      this.$slots.default
    ])
  }
}
