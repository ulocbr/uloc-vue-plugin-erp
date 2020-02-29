import {UResizeObservable, debounce} from 'uloc-vue'

export default {
  name: 'ErpSelectTable',
  props: {
    columns: Array
  },
  components: {},
  mounted () {
    this.$nextTick(() => {
      if (this.columns) {
        let thead = this.$refs.thead
        let clone = thead.cloneNode(true)
        // let clone = document.createElement('div')
        // clone.classList.add('thead-helper-header')
        // clone.appendChild(thead)
        /* this.$refs.thead.childNodes.forEach((node, index) => {
          console.log(node, node.offsetWidth, node.style.width)
          clone[index].style.width = node.style.width
        }) */
        let table = document.createElement('table')
        table.classList.add('table-helper-header')
        clone.classList.add('thead-helper-header')
        table.appendChild(clone)
        this.$el.prepend(table)
        this.$fakeThead = clone
      }
    })
  },
  computed: {
    computedClass () {
      return {}
    }
  },
  methods: {
    adjustPosition () {
      this.$nextTick(() => {
        if (!this.$fakeThead) {
          return
        }
        let tr = this.$el.querySelector('.erp-select-list-item')
        tr.childNodes.forEach((node, index) => {
          this.$fakeThead.childNodes.forEach((cnode, cindex) => {
            if (cindex === index) {
              cnode.style.minWidth = node.offsetWidth + 'px'
            }
          })
        })
      })
    }
  },
  render (h) {
    let columns = []
    if (Array.isArray(this.columns)) {
      columns.push(
        this.columns.map((item) => {
          return h('th', item.label)
        })
      )
    } else {
      columns.push(this.columns)
    }
    return h('div', {ref: 'tableContainer', staticClass: 'erp-select-table', class: this.computedClass}, [
      h('table', [
        this.columns && h('thead', {ref: 'thead', staticClass: 'erp-select-thead'}, columns),
        h('tbody', [
          h(UResizeObservable, {
            on: {resize: debounce(() => { this.adjustPosition() }, 1)}
          }),
          this.$slots.default
        ])
      ])
    ])
  }
}
