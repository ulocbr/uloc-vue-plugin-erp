import EWindowTable from '../table/EWindowTable'
import ETr from '../table/ETr'
import ETd from '../table/ETd'
import ErpInput from '../form/input.js'
import ErpSField from '../form/SimpleField'
import WindowFooter from '../window/Footer.js'
import {event, UBtn, UProgress, debounce} from 'uloc-vue'

export default {
  name: 'WindowSearch',
  props: {
    tableClass: {
      default: 'col-grow h-full'
    },
    columns: {
      type: Array,
      required: true,
      validator: v => v.every(o => 'label' in o && 'value' in o)
    },
    searchLabel: {
      default: 'Pesquisar:'
    },
    shortkeySearch: {
      default: 'F2'
    },
    progressColor: {
      default: 'primary'
    },
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      search: null,
      loading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      data: []
    }
  },
  components: {},
  computed: {
    computedClass () {
      return {}
    },
    pagesNumber () {
      return Math.max(
        1,
        Math.ceil(this.serverPagination.rowsNumber / this.serverPagination.rowsPerPage)
      )
    },
    isFirstPage () {
      return this.serverPagination.page === 1
    },
    isLastPage () {
      if (this.pagesNumber === 1) {
        return true
      }
      return this.serverPagination.page >= this.pagesNumber
    }
  },
  watch: {
    'serverPagination.page' (v) {
      console.log('Change page')
      this.$nextTick(() => {
        this.load()
      })
    },
    search (v) {
      this.$nextTick(() => {
        this.load()
      })
    }
  },
  methods: {
    prevPage () {
      const {page} = this.serverPagination
      if (page > 1) {
        // this.setPagination({page: page - 1})
        this.serverPagination.page = page - 1
      }
    },
    nextPage () {
      const {page} = this.serverPagination
      // this.setPagination({page: page + 1})
      this.serverPagination.page = page + 1
    },
    load: debounce(function () {
      this.loading = true

      let filters = []
      filters.push({page: this.serverPagination.page})

      this.fetchData(this.search || '', filters, (data, pagination) => {
        this.data = data
        if (pagination.page) {
          this.serverPagination.page = pagination.page
        }
        if (pagination.rowsNumber) {
          this.serverPagination.rowsNumber = pagination.rowsNumber
        } else {
          this.serverPagination.rowsNumber = data.length
        }
        if (pagination.rowsPerPage) {
          this.serverPagination.rowsPerPage = pagination.rowsPerPage
        }
        this.loading = false
      })
    }, 300)
  },
  mounted () {
    this.load()
  },
  render (h) {
    let child = []
    if (this.loading) {
      child.push(h('tr', {staticClass: 'u-table-progress animate-fade'}, [
        h('td', {staticClass: 'pos-rlt', attrs: {colspan: '100%'}}, [
          h(UProgress, {
            props: {
              color: this.progressColor,
              indeterminate: true,
              height: '2px'
            }
          })
        ])
      ]))
    }
    return h('div', {staticClass: 'erp-w-search erp-w-content', class: this.computedClass},
      [
        h('div', {staticClass: 'erp-w-search-input erp-w-content-header wrapper'}, [
          h(ErpSField, {
            props: {
              view: 'lr',
              label: this.searchLabel,
              helper: 'Digite para pesquisar no cadastro',
              helperPosition: 'lb'
            }
          }, [
            h(ErpInput, {
              props: {
                autofocus: true,
                value: this.search,
                shortkey: this.shortkeySearch,
                size: '2'
              },
              on: {
                input: (v) => {
                  this.search = v
                }
              }
            })
          ])
        ]),
        h(EWindowTable, {
          staticClass: this.tableClass,
          props: {columns: this.columns.map(c => c.label)}
        }, child.concat(this.data.map((data) => {
          return h(ETr, {staticClass: ''}, this.columns.map((c) => {
            return h(ETd, {staticClass: ''}, data[c.value])
          }))
        }))),
        h(WindowFooter, {staticClass: 'wrapper'}, [
          h('div', {staticClass: 'flex items-center'}, [
            h(ErpInput, {
              style: 'width: 30px',
              props: {
                value: this.serverPagination.page,
                align: 'center',
                type: 'number'
              },
              on: {
                input: (v) => {
                  // this.serverPagination.page = v
                }
              },
              nativeOn: {
                keyup: (e) => {
                  const key = event.getEventKey(e)

                  switch (key) {
                    case 8: // backspace
                    case 9: // TAB key
                      break
                    default:
                      let page = Number(e.target.value)
                      if (isNaN(page) || page <= 0 || page > this.pagesNumber) {
                        event.stopAndPrevent(e)
                        return
                      }
                      this.$nextTick(() => {
                        this.serverPagination.page = page
                      })
                      break
                  }
                }
              }
            }), h('span', {staticClass: 'm-l-xs'}, 'de ' + this.pagesNumber),
            h('div', {staticClass: 'm-l-xs'}, [
              h(UBtn, {
                class: {'text-primary': !this.isFirstPage},
                props: {
                  flat: true,
                  icon: 'chevron_left',
                  disable: this.isFirstPage,
                  dense: true
                },
                on: {
                  click: () => !this.isFirstPage && this.prevPage()
                }
              }),
              h(UBtn, {
                class: {'text-primary': !this.isLastPage},
                props: {
                  flat: true,
                  icon: 'chevron_right',
                  disable: this.isLastPage,
                  dense: true
                },
                on: {
                  click: () => !this.isLastPage && this.nextPage()
                }
              })
            ])
          ])
        ])
      ]
    )
  }
}
