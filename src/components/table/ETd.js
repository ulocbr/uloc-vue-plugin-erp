export default {
  name: 'ETd',
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
    return h('td', {staticClass: 'erp-w-table-td', class: this.computedClass},
      this.$slots.default
    )
  }
}
