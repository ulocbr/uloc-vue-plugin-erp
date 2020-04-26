import {debounce, UResizeObservable} from 'uloc-vue'

export default {
  name: 'EWindowTable',
  props: {
    columns: Array,
    fixed: {
      type: Boolean,
      default: false
    },
    pagination: { // draft
      type: Object,
      default: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.fixed) {
        let thead = this.$refs.thead
        let clone = thead.cloneNode(true)
        let table = document.createElement('table')
        table.appendChild(clone)
        this.$refs.theader.prepend(table)
        this.$fakeThead = clone
        // thead.classList.add('hide')
        this.$refs.table.style.marginTop = '-' + thead.offsetHeight + 'px'
        window.setTimeout(() => {
          this.$refs.table.style.marginTop = '-' + thead.offsetHeight + 'px'
        }, 10)
      }
    })
  },
  methods: {
    adjustPosition () {
      this.$nextTick(() => {
        if (!this.$fakeThead) {
          return
        }
        this.$refs.table.style.marginTop = '-' + this.$refs.thead.offsetHeight + 'px'
        let tr = this.$el.querySelector('tbody tr')
        if (tr.childNodes.length !== this.$fakeThead.querySelector('tr').childNodes.length) {
          return
        }
        tr.childNodes.forEach((node, index) => {
          this.$fakeThead.querySelector('tr').childNodes.forEach((cnode, cindex) => {
            if (cindex === index) {
              cnode.style.width = node.offsetWidth + 'px'
              cnode.style.minWidth = node.offsetWidth + 'px'
              cnode.style.maxWidth = node.offsetWidth + 'px'
            }
          })
        })
      })
    }
  },
  components: {},
  computed: {
    computedClass () {
      let css = []
      this.fixed && css.push('erp-w-table-fixed')
      return css
    }
  },
  render (h) {
    let getTable = () => {
      return h('table', {ref: 'table'}, [
        h('thead', {ref: 'thead', staticClass: 'erp-select-thead'}, [
          h('tr', {ref: 'headTr', staticClass: 'erp-select-thead-tr'}, [
            this.columns.map((item) => {
              return h('th', typeof item === 'object' ? item.label : item)
            })
          ])
        ]),
        h('tbody', this.$slots.default)
      ])
    }

    let getTableFixed = () => {
      return [
        h('div', {ref: 'theader', staticClass: 'erp-w-table-header'}, [
          h(UResizeObservable, {
            on: {
              resize: debounce(() => {
                this.adjustPosition()
              }, 1)
            }
          })
        ]),
        h('div', {staticClass: 'erp-w-table-content'}, [
          h('div', {staticClass: 'erp-w-table-ctable'}, [getTable()])
        ])
      ]
    }

    let getPagination = () => {
      if (!this.pagination) {
        return void (0)
      }
      return h('div', {staticClass: 'erp-w-pagination'}) // TODO: draft. Currently use ErpWTablePagination
    }

    let table
    if (this.fixed) {
      table = getTableFixed()
    } else {
      table = [getTable()]
    }
    return h('div', {staticClass: 'erp-w-table', class: this.computedClass}, table.concat([
      this.$slots.footer || void (0), getPagination()
    ]))
  }
}
