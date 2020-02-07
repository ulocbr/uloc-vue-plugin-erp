export default {
  name: 'ErpMenuItem',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    computedClass () {
      return {
        'selected': this.active
      }
    },
    computedStyle () {
      const
        css = {}

      return css
    }
  },
  created () {
  },
  beforeDestroy () {
  },
  watch: {},
  methods: {
    __onClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    return h('li', {
      staticClass: '',
      'class': this.computedClass,
      style: this.computedStyle
    }, [h('a', {
      on: {click: this.__onClick}
    }, this.$slots.default)])
  }
}
