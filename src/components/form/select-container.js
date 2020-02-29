export default {
  name: 'ErpSelectContainer',
  mixins: [],
  props: {
    description: String
  },
  computed: {},
  methods: {},
  render (h) {
    return h('div', {staticClass: 'erp-select-container'}, [
      h('div', {staticClass: 'erp-select-desc'}, this.description),
      this.$slots.default
    ])
  }
}
