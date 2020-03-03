export default {
  name: 'EWindowTable',
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
    return h('div', {staticClass: 'erp-w-table', class: this.computedClass}, [
      h('table', [
        h('thead', [
          this.columns.map((item) => {
            return h('th', item)
          })
        ]),
        h('tbody', this.$slots.default)
      ]), this.$slots.footer || void (0)
    ])
  }
}
