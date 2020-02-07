export default {
  name: 'MenuModuleComponent',
  props: {
    label: {
      type: String
    },
    items: {
      type: Array
    },
    right: {
      type: Boolean,
      default: false
    },
    hideLabel: {
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
        'u-erp-menu-right': this.right
      }
    },
    computedStyle () {
      const css = {}
      return css
    }
  },
  created () {
  },
  beforeDestroy () {
  },
  watch: {},
  methods: {},
  render (h) {
    let components = []
    if (Array.isArray(this.items) && this.items.length > 0) {
      this.items.forEach((item) => {
        // TODO: Validate item
        components.push(h('li', [
          h('a', [
            h('i', {staticClass: 'i-menu-m ' + item.icon}),
            h('span', item.name)
          ])
        ]))
      })
    }
    return h('div', {
      staticClass: 'u-erp-module-menu-component',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      this.label && !this.hideLabel ? h('div', {staticClass: 'lbl'}, this.label) : null,
      h('div', {staticClass: 'u-erp-module-menu-items'}, components)
    ])
  }
}
