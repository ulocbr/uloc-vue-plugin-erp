export default {
  name: 'MenuModule',
  inject: {
    erpheader: {
      default () {
        console.error('ModuleMenu needs to be child of ModuleHeader')
      }
    }
  },
  props: {
    toggled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      toggledMenuModule: false
    }
  },
  computed: {
    computedClass () {
      return {
        'toggled': this.toggledMenuModule
      }
    },
    computedStyle () {
      const css = {}
      return css
    }
  },
  created () {
    if (this.erpheader) {
      this.erpheader.modulemenu = this
    }
  },
  beforeDestroy () {
  },
  watch: {
    toggled (v) {
      this.toggledMenuModule = v
    },
    toggledMenuModule (v) {
      let icon = this.$refs.toggleIcon
      if (v) {
        document.body.append(icon)
      } else {
        this.$el.append(icon)
      }
    }
  },
  methods: {
    __toggleMenuModule (v) {
      if (typeof v !== 'boolean') {
        v = !this.toggledMenuModule
      }
      document.body.classList.remove('u-erp-layout-menu-toggled')
      this.toggledMenuModule = v
      if (this.toggledMenuModule) {
        document.body.classList.add('u-erp-layout-menu-toggled')
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'u-erp-module-menu',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      this.$slots.default,
      h('div', {
        ref: 'toggleIcon',
        staticClass: 'u-erp-module-toggle',
        class: {'toggled': this.toggledMenuModule},
        on: {click: this.__toggleMenuModule}
      }, [
        h('a', [
          h('img', {attrs: {src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAMAAAAhxq8pAAAAb1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeXl4AAAAAAAAWFhYrKyshISFlZWVmZmZgYGBhYWFeXl5XV1dZWVlNTU1cXFwrKysAAABjY2NaWlpdXV1QUFBSUlIyMjI0NDQkJCQdHR0AAACVUHsGAAAAJXRSTlMABQMPCSAcEw0rui8nN0c+8uzRx8Kbdm9uJBawl5SGglI7MSwaIpgUUgAAAIdJREFUGNOVj8cOgzAQBbPFZV1wQie9/f83BgUsmSNzedJoDruH3SDM4NYBj6Mhhk1mL7er08YWMdjTK0g6qrOFwr0lJh8Li9x8pKrrysdGGcYl7Ht5Oi+u8veHJljk1HazC8F1bVJmlTQNEtRXqyGGXCIbrbQh+g9jvpzIMgBbIobyR8yzix/UGwXDeqV2eAAAAABJRU5ErkJggg=='}})
        ])
      ])
    ])
  }
}
