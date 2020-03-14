export default {
  name: 'ErpBox',
  props: {
    label: String
  },
  components: {},
  mounted () {
  },
  computed: {
    computedClass () {
      return {}
    }
  },
  methods: {},
  render (h) {
    return h('div', {staticClass: 'erp-box', class: this.computedClass},
      [
        h('div', {staticClass: 'erp-box-label'}, this.label),
        this.$slots.default]
    )
  }
}
