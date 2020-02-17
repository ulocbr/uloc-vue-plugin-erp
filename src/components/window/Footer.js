export default {
  name: 'WindowContentFooter',
  props: {
  },
  components: {},
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    return h('div', {staticClass: 'erp-w-content-footer', class: this.computedClass},
      this.$slots.default
    )
  }
}
