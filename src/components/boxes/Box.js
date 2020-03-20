export default {
  name: 'ErpBox',
  props: {
    label: String,
    labelClass: String
  },
  components: {},
  mounted () {
  },
  computed: {
    computedClass () {
      return {}
    },
    computedLabelClass () {
      return [...this.labelClass]
    }
  },
  methods: {},
  render (h) {
    return h('div', {staticClass: 'erp-box', class: this.computedClass},
      [
        h('div', {staticClass: 'erp-box-label', class: this.computedLabelClass}, this.label),
        this.$slots.default]
    )
  }
}
