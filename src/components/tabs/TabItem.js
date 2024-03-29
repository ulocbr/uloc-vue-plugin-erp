export default {
  name: 'ErpTabItem',
  props: {
    name: {
      type: String,
      required: true
    },
    active: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      meActive: this.active
    }
  },
  components: {},
  computed: {
    computedClass () {
      return {
        'active': this.meActive,
        'disabled': this.disabled,
      }
    }
  },
  methods: {
    enable () {
      this.meActive = true
    },
    disable () {
      this.meActive = false
    },
    click (e) {
      !this.disabled && this.$parent.$emit('tabClick', {event: e, tab: this.name})
    }
  },
  render (h) {
    return h('a',
      {
        staticClass: 'erp-tabs-item u-hoverable',
        class: this.computedClass,
        on: {
          click: this.click
        }
      },
      [
        h('div', {class: {'u-focus-helper': !this.meActive}}),
        this.$slots.default
      ]
    )
  }
}
