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
        h('thead', {staticClass: 'erp-select-thead'}, [
          this.columns.map((item) => {
            return h('th', typeof item === 'object' ? item.label : item)
          })
        ]),
        h('tbody', this.$slots.default)
      ]), this.$slots.footer || void (0)
    ])
  }
}
