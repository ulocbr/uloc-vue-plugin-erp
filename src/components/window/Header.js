export default {
  name: 'WindowContentHeader',
  props: {
  },
  components: {},
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    return h('div', {staticClass: 'erp-w-content-header', class: this.computedClass},
      this.$slots.default
    )
  }
}
