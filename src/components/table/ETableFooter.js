export default {
  name: 'ETableFooter',
  props: {
    height: {
      type: Number,
      default: 32
    }
  },
  components: {},
  mounted () {
    this.$parent.$el.append(this.$el)
  },
  computed: {
    computedClass () {
      return {}
    },
    computedStyle () {
      return {
        height: `${this.height}px`
      }
    }
  },
  render (h) {
    return h('div', {staticClass: 'e-w-table-footer', class: this.computedClass, style: this.computedStyle},
      this.$slots.default
    )
  }
}
