export default {
  name: 'ETr',
  props: {},
  components: {},
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    return h('tr', {staticClass: '', class: this.computedClass},
      this.$slots.default
    )
  }
}
