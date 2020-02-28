import FrameMixin from './mixins/input-frame.js'
import ParentFieldMixin from 'uloc-vue/src/mixins/parent-field.js'
import {UIcon} from 'uloc-vue'

export default {
  name: 'ErpInputFrame',
  mixins: [FrameMixin, ParentFieldMixin],
  props: {
    topAddons: Boolean,
    focused: Boolean,
    length: Number,
    focusable: Boolean,
    additionalLength: Boolean,
    size: [String, Number],
    simpleBorder: Boolean
  },
  computed: {
    hasStackLabel () {
      return typeof this.stackLabel === 'string' && this.stackLabel.length > 0
    },
    hasLabel () {
      return this.hasStackLabel || (typeof this.floatLabel === 'string' && this.floatLabel.length > 0)
    },
    label () {
      return this.hasStackLabel ? this.stackLabel : this.floatLabel
    },
    addonClass () {
      return {
        'erp-if-addon-visible': !this.hasLabel || this.labelIsAbove,
        'self-start': this.topAddons
      }
    },
    classes () {
      const cls = [{
        'erp-if-has-label': this.label,
        'erp-if-focused': this.focused,
        'erp-if-error': this.hasError,
        'erp-if-warning': this.hasWarning,
        'erp-if-disabled': this.disable,
        'erp-if-focusable': this.focusable && !this.disable,
        'erp-if-inverted': this.isInverted,
        'erp-if-inverted-light': this.isInvertedLight,
        'erp-if-light-color': this.lightColor,
        'erp-if-dark': this.dark,
        'erp-if-hide-underline': !this.isInverted && this.hideUnderline,
        'erp-if-s-b': this.simpleBorder
      }]

      const color = this.hasError ? 'negative' : (this.hasWarning ? 'warning' : this.color)

      if (this.size) {
        cls.push(`erp-if-size-${this.size}`)
      }

      if (this.isInverted) {
        cls.push(`bg-${color}`)
        cls.push(`text-${this.isInvertedLight ? 'black' : 'white'}`)
      } else if (color) {
        cls.push(`text-${color}`)
      }

      return cls
    }
  },
  methods: {
    __onClick (e) {
      this.$emit('click', e)
    },
    __onMouseDown (e) {
      this.$nextTick(() => this.$emit('focus', e))
    },
    __additionalHidden (item, hasError, hasWarning, length) {
      if (item.condition !== void 0) {
        return item.condition === false
      }
      return (
        (item.content !== void 0 && !item.content === (length > 0)) ||
        (item.error !== void 0 && !item.error === hasError) ||
        (item.warning !== void 0 && !item.warning === hasWarning)
      )
    },
    __baHandler (evt, item) {
      if (!item.allowPropagation) {
        evt.stopPropagation()
      }
      if (item.handler) {
        item.handler(evt)
      }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'erp-if row no-wrap items-end relative-position',
      'class': this.classes,
      attrs: {tabindex: this.focusable && !this.disable ? 0 : -1},
      on: {click: this.__onClick}
    }, [
      (this.before && this.before.map(item => {
        return h(UIcon, {
          key: `b${item.icon}`,
          staticClass: 'erp-if-control erp-if-control-before',
          'class': {
            hidden: this.__additionalHidden(item, this.hasError, this.hasWarning, this.length)
          },
          props: {
            name: item.icon
          },
          nativeOn: {
            mousedown: this.__onMouseDown,
            touchstart: this.__onMouseDown,
            click: e => {
              this.__baHandler(e, item)
            }
          }
        })
      })) || void 0,

      h('div', {
        staticClass: 'ei-inner col row no-wrap relative-position'
      }, [
        (this.hasLabel && h('div', {
          staticClass: 'erp-if-label ellipsis full-width absolute self-start',
          'class': {'erp-if-label-above': this.labelIsAbove},
          domProps: {
            innerHTML: this.label
          }
        })) || void 0,

        (this.prefix && h('span', {
          staticClass: 'erp-if-addon erp-if-addon-left',
          'class': this.addonClass,
          domProps: {
            innerHTML: this.prefix
          }
        })) || void 0
      ].concat(this.$slots.default).concat([
        (this.suffix && h('span', {
          staticClass: 'erp-if-addon erp-if-addon-right',
          'class': this.addonClass,
          domProps: {
            innerHTML: this.suffix
          }
        })) || void 0
      ])),

      (this.after && this.after.map(item => {
        return h(UIcon, {
          key: `a${item.icon}`,
          staticClass: 'erp-if-control',
          'class': {
            hidden: this.__additionalHidden(item, this.hasError, this.hasWarning, this.length)
          },
          props: {
            name: item.icon
          },
          nativeOn: {
            mousedown: this.__onMouseDown,
            touchstart: this.__onMouseDown,
            click: e => {
              this.__baHandler(e, item)
            }
          }
        })
      })) || void 0
    ].concat(this.$slots.after))
  }
}
