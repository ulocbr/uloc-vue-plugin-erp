import {event} from 'uloc-vue'

export default {
  name: 'ErpCheckbox',
  mixins: [],
  props: {
    value: {required: true},
    checkId: String,
    disable: Boolean,
    readonly: Boolean
  },
  data () {
    return {
      model: this.value
    }
  },
  watch: {
    value (v) {
      this.model = v
    }
  },
  computed: {},
  methods: {
    toggle (evt, blur = true) {
      if (this.disable || this.readonly) {
        return
      }
      evt && event.stopAndPrevent(evt)
      blur && this.$el.blur()

      let val = this.value
      val = !val

      this.$emit('input', val)
      this.$nextTick(() => {
        if (JSON.stringify(val) !== JSON.stringify(this.value)) {
          this.$emit('change', val)
        }
      })
    },
    __handleKeyDown (e) {
      if ([13, 32].includes(event.getEventKey(e))) {
        this.toggle(e, false)
      }
    }
  },
  mounted () {
  },

  render (h) {
    return h('div', {
      staticClass: 'erp-checkbox',
      attrs: { tabindex: 0 },
      on: {
        click: this.toggle,
        focus: () => { this.$emit('focus') },
        blur: () => { this.$emit('blur') },
        keydown: this.__handleKeyDown
      }
    }, [
      h('input', {
        staticClass: 'erp-checkbox-input',
        attrs: {type: 'checkbox'},
        on: {change: this.toggle},
        domProps: {
          checked: this.model,
          id: this.checkId
        }
      }),
      h('span', {staticClass: 'erp-checkbox-fake'}),
      h('span', {staticClass: 'erp-checkbox-mark'})
    ])
  }
}
