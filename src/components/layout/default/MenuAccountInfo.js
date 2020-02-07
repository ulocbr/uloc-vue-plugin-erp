export default {
  name: 'MenuAccountInfo',
  props: {
    userImage: {
      type: String
    }
  },
  data () {
    return {}
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
      staticClass: 'u-erp-account-info',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      h('div', {staticClass: 'u-erp-account-img'}, [
        h('a', [
          h('img', {attrs: {src: this.userImage}})
        ])
      ]),
      h('div', {staticClass: 'u-erp-account-logout'}, [
        h('a', 'Sair')
      ])
    ])
  }
}
