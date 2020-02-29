export default {
  name: 'ErpSelectContainer',
  mixins: [],
  props: {
    description: String
  },
  computed: {},
  methods: {},
  mounted () {},
  render (h) {
    return h('div', {staticClass: 'erp-select-container'}, [
      // h('div', {ref: 'desc', staticClass: 'erp-select-desc hide'}, this.description),
      h('div', {ref: 'body', staticClass: 'erp-select-body'}, this.$slots.default)
    ])
  }
}
