import {UField, UIcon, UTooltip} from 'uloc-vue'

export default {
  name: 'ErpSField',
  mixins: [UField],
  props: {
    view: {
      type: String,
      default: 'tl',
      validator: v => /^(t|l)(l|r)$/.test(v.toLowerCase())
    },
    labelWidth: {
      type: String,
      default: null
    },
    helperPosition: {
      type: String,
      default: 'lt',
      validator: v => /^(l|r)(t|b)$/.test(v.toLowerCase())
    },
    noLabel: Boolean,
    wrap: Boolean,
    iconHelp: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    layout () {
      const layout = this.view.toLowerCase().split('')
      return {
        position: layout[0],
        align: layout[1]
      }
    },
    classes () {
      const cls = [{
        'erp-field-align-left': this.layout.align === 'l',
        'erp-field-align-right': this.layout.align === 'r',
        'erp-field-layout-top': this.layout.position === 't',
        'erp-field-layout-left': this.layout.position === 'l'
      }]

      return cls
    },
    helperClasses () {
      const cls = [{
        'pos-left-top': this.helperPosition === 'lt',
        'pos-left-bottom': this.helperPosition === 'lb',
        'pos-right-top': this.helperPosition === 'rt',
        'pos-right-bottom': this.helperPosition === 'rb'
      }]

      return cls
    }
  },
  methods: {},
  render (h) {
    let labelStyle = []
    if (this.labelWidth) {
      labelStyle.push({'width': this.labelWidth})
    }
    return h('div', {
      staticClass: 'erp-s-field',
      'class': this.classes
    }, [
      this.$slots.label || h('div', {
        staticClass: 'erp-s-field-label',
        class: {'no-label': this.noLabel, 'label-wrap': this.wrap},
        style: labelStyle
      }, [
        this.label,
        this.iconHelp ? h(UIcon, {
          staticClass: 'm-l-xs',
          props: {
            name: 'question-circle',
            color: 'primary',
            type: 'fa',
            iconStyle: 'solid'
          }
        }, [
          h(UTooltip, {
            props: {
              offset: [5, 5]
            }
          }, this.iconHelp)
        ]) : null,
        this.required ? h('span', {staticClass: 'm-l-xs required'}, '*') : null,
        this.$slots.labelContent
      ]),
      h('div', {
        staticClass: 'erp-s-field-content'
      }, [this.helper ? h('span', {
        staticClass: 'erp-s-field-helper',
        'class': this.helperClasses
      }, this.helper) : null].concat(this.$slots.default))
    ])
  }
}
