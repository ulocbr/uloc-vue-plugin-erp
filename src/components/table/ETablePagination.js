import {UPagination, UBtn} from 'uloc-vue'
import ErpInput from '../form/input'

export default {
  name: 'ETablePagination',
  props: {
    value: {required: true},
    maxPages: {
      default: 3
    },
    min: {
      default: 1
    },
    max: {
      default: 10
    },
    color: {
      default: 'grey-7'
    }
  },
  data () {
    return {
      gotoPage: null
    }
  },
  methods: {
    input (v) {
      this.$emit('input', v)
      this.$emit('goto', v)
    },
    goto (v) {
      this.gotoPage = v
      this.$emit('goto', v)
    }
  },
  components: {},
  computed: {
    computedClass () {
      return {}
    }
  },
  render (h) {
    return h('div', {staticClass: 'erp-w-table-pagination', class: this.computedClass},
      [
        h(UPagination, {
          props: {
            value: this.value,
            maxPages: this.maxPages,
            min: this.min,
            max: this.max,
            directionLinks: true,
            size: 'sm',
            color: this.color
          },
          on: {
            input: this.input
          }
        }),
        h('div', {staticClass: 'e-p-input'}, [
          h(ErpInput, {
            props: {
              value: this.gotoPage,
              simpleBorder: true,
              type: 'number'
            },
            on: {
              input: this.goto
            }
          }),
          h(UBtn, {
            props: {
              flat: true,
              dense: true,
              label: 'Ir',
              noCaps: true,
              size: 'sm'
            }
          })
        ]),
        this.$slots.default
      ]
    )
  }
}
