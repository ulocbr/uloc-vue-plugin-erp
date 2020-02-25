import {UIcon} from 'uloc-vue'

export default {
  name: 'EBtnTableOptions',
  props: {
    status: String
  },
  components: {},
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    let props = this.$props
    props['noCaps'] = true
    return h('a', {staticClass: 'erp-btn-table-options', class: this.computedClass}, [
      h(UIcon, {
        props: {
          name: 'chevron-down',
          type: 'fa',
          iconStyle: 'regular'
        }
      }),
      this.$slots.default
    ])
  }
}
