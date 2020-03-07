export default {
  name: 'ErpLabel',
  props: {
    label: {required: false},
    labelView: {
      type: String,
      default: 'tl',
      validator: v => /^(t|b)(l|r)$/.test(v.toLowerCase())
    }
  },
  computed: {
    layout () {
      const layout = this.labelView.toLowerCase().split('')
      return {
        position: layout[0],
        align: layout[1]
      }
    },
    classes () {
      const cls = [{
        'erp-label-align-left': this.layout.align === 'l',
        'erp-label-align-right': this.layout.align === 'r',
        'erp-label-layout-top': this.layout.position === 't',
        'erp-label-layout-bottom': this.layout.position === 'b'
      }]

      return cls
    }
  },
  render (h) {
    return h('label', {
      staticClass: 'erp-label',
      class: this.classes
    }, [this.label && h('div', {staticClass: 'label-title'}, this.label)].concat(this.$slots.default))
  }
}
