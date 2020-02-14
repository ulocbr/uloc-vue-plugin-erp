export default {
  name: 'ETableFooterResult',
  props: {
  },
  components: {},
  mounted () {
  },
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    return h('div', {staticClass: 'e-w-table-footer-result', class: this.computedClass},
      this.$slots.default
    )
  }
}
