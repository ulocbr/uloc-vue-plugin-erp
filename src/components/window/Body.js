export default {
  name: 'WindowContentBody',
  props: {
  },
  components: {},
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    return h('div', {staticClass: 'erp-w-content-body', class: this.computedClass},
      this.$slots.default
    )
  }
}
