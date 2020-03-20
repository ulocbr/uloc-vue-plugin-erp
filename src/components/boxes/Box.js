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
      let css = []
      if (this.labelClass) {
        css.push(this.labelClass)
      }
      return css
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
