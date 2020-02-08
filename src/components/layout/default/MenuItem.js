export default {
  name: 'ErpMenuItem',
  props: {
    id: {
      type: String,
      required: true
    },
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
      this.$parent.menu.setActiveMenu(this.id)
      this.$emit('click', {event: e, id: this.id})
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
