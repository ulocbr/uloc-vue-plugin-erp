export default {
  name: 'ETr',
  props: {
    columns: Array
  },
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
