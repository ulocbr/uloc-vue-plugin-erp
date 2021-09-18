import {UIcon, UTooltip} from 'uloc-vue'

export default {
  name: 'ErpPosMenuIcon',
  inject: {
    posmenu: {
      default () {
        console.error('ModuleMenu needs to be child of ModuleHeader')
      }
    }
  },
  props: {
    name: String,
    iconType: String,
    iconStyle: String,
    notify: {
      type: String,
      required: false
    },
    notifyClass: {
      type: String,
      required: false,
      default: 'notify-default'
    },
    tooltip: String
  },
  data () {
    return {
      activeMenu: null
    }
  },
  computed: {
    computedClass () {
      return {}
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
    return h('div', {
      staticClass: 'u-erp-posmenu-icon',
      'class': this.computedClass,
      style: this.computedStyle,
      on: {
        click: this.click
      }
    }, [
      h(UIcon, {
        props: {
          name: this.name,
          type: this.iconType,
          iconStyle: this.iconStyle
        }
      }), [
        this.notify && h('div', {
          staticClass: 'u-erp-posmenu-icon-notify',
          'class': this.notifyClass
        }, this.notify),
        this.tooltip && h(UTooltip, {
          staticClass: 'u-erp-posmenu-tooltip',
          props: {
            anchor: 'bottom middle',
            self: 'top middle',
            offset: [10, 10]
          },
          delay: 0
        }, this.tooltip)
      ]
    ])
  }
}
