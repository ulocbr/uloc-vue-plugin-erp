import {UBtn} from 'uloc-vue'

export default {
  name: 'EBtn',
  props: {
    label: {
      type: String
    },
    size: String,
    md: Boolean
  },
  components: {UBtn},
  computed: {
    computedClass () {
      return {
        'erp-btn-size-md': this.md
      }
    }
  },
  render (h) {
    let props = this.$props
    props['noCaps'] = true
    return h(UBtn, {staticClass: 'erp-btn', class: this.computedClass, props: props})
  }
}
