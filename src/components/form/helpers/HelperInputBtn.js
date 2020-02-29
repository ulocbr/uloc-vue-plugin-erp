export default {
  name: 'HelperInputBtn',
  props: {
  },
  components: {},
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    return h('div', {staticClass: 'row', class: this.computedClass}, [
      h('div', {
        staticClass: 'col'
      }, this.$slots.input),
      h('div', {
        staticClass: 'm-l-xs flex flex-center no-wrap'
      }, this.$slots.default)
    ])
  }
}
