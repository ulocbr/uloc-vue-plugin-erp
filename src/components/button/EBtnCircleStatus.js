export default {
  name: 'EBtnCircleStatus',
  props: {
    status: String
  },
  components: {},
  computed: {
    computedClass () {
      return {
      }
    }
  },
  render (h) {
    let props = this.$props
    props['noCaps'] = true
    return h('span', {staticClass: 'erp-btn-circle-status ' + this.status, class: this.computedClass, props: props})
  }
}
