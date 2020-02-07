export default {
  name: 'MenuAlerts',
  props: {
    alerts: {
      type: Number,
      default: 0
    }
  },
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
      staticClass: 'u-erp-menu-alerts',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      h('i', this.alerts),
      h('span', 'Avisos importantes')
    ])
  }
}
