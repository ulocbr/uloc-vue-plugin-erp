export default {
  name: 'WindowContent',
  props: {
  },
  components: {},
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    return h('div', {staticClass: 'erp-w-content', class: this.computedClass},
      this.$slots.default
    )
  }
}
