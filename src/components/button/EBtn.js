import {UBtn, USpinner, UIcon} from 'uloc-vue'

export default {
  name: 'EBtn',
  mixins: [UBtn],
  props: {
    noCaps: {
      type: Boolean,
      default: true
    },
    md: {
      type: Boolean,
      default: true
    }
  },
  components: {UBtn, USpinner, UIcon},
  computed: {
    aditionalClasses () {
      let css = []
      if (this.md) {
        css.push('erp-btn-size-md')
      }
      return ' ' + css.join(' ')
    }
  }, /*
  render (h) {
    let props = this.$props
    // props['noCaps'] = true
    return h(UBtn, {staticClass: 'erp-btn', class: this.computedClass, props: props})
  } */
  render (h) {
    return h(this.isLink ? 'a' : 'button', {
      staticClass: 'erp-btn u-btn inline relative-position u-btn-item no-select' + this.aditionalClasses,
      'class': this.classes,
      style: this.style,
      attrs: this.attrs,
      on: this.events
    }, [
      this.$uloc.platform.is.desktop
        ? h('div', {staticClass: 'u-focus-helper'})
        : null,
      this.loading && this.hasPercentage
        ? h('div', {
          staticClass: 'u-btn-progress absolute-full',
          'class': {'u-btn-dark-progress': this.darkPercentage},
          style: {width: this.width}
        })
        : null,

      h('div', {
        staticClass: 'u-btn-inner row col items-center',
        'class': this.innerClasses
      },
      this.loading
        ? [this.$slots.loading || h(USpinner)]
        : [
          this.icon
            ? h(UIcon, {
              'class': {'on-left': this.label && this.isRectangle},
              props: {name: this.icon, color: this.iconColor, type: this.iconType, iconStyle: this.iconStyle}
            })
            : null,

          this.label && this.isRectangle ? h('div', [this.label]) : null,

          this.$slots.default,

          this.iconRight && this.isRectangle
            ? h(UIcon, {
              staticClass: 'on-right',
              props: {
                name: this.iconRight,
                color: this.iconRightColor,
                type: this.iconRightType,
                iconStyle: this.iconRightStyle
              }
            })
            : null
        ]
      )
    ])
  }
}
