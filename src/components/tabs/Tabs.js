export default {
  name: 'ErpTabs',
  props: {
    tabs: Array,
    active: String
  },
  components: {},
  mounted () {
    this.updateActive()
    this.$on('tabClick', this.change)
  },
  computed: {
    computedClass () {
      return {}
    }
  },
  methods: {
    updateActive () {
      this.meActive = this.active
      let childs = this.$children
      childs.forEach((c) => {
        c.disable()
        if (c.name === this.active) {
          c.enable()
        }
      })
    },
    change ({event, tab}) {
      this.$emit('change', {event, tab})
    }
  },
  watch: {
    active () {
      this.updateActive()
    }
  },
  render (h) {
    return h('div', {staticClass: 'erp-tabs', class: this.computedClass},
      this.$slots.default
    )
  }
}
