export default {
  name: 'WindowContentBody',
  props: {
    tabs: Boolean
  },
  components: {},
  computed: {
    computedClass () {
      return {
        'with-tabs': this.tabs
      }
    }
  },
  render (h) {
    return h('div', {staticClass: 'erp-w-content-body', class: this.computedClass},
      this.$slots.default
    )
  }
}
