export default {
  name: 'ErpSelectTr',
  props: {
    cfg: [Object, Array, String],
    slotReplace: Boolean,
    active: Boolean
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
