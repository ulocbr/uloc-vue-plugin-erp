import EWindowTable from '../table/EWindowTable'
import ETr from '../table/ETr'
import ETd from '../table/ETd'
import ErpInput from '../form/input.js'
import ErpSField from '../form/SimpleField'
import WindowFooter from '../window/Footer.js'
import {event, UBtn, UProgress, debounce} from 'uloc-vue'
import SelectKeyboard from '../form/mixins/select-keyboard.js'

export default {
  name: 'WindowSearch',
  mixins: [SelectKeyboard],
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
      model: null,
      serverPagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      data: [],
      keyboardIndex: 0,
      keyboardMoveDirection: false,
      keyboardMoveTimer: false
    }
  },
  components: {},
  computed: {
    visibleOptions () {
      return this.data
    },
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
    },
    keyboardMaxIndex () {
      return this.visibleOptions.length - 1
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
    },
    keyboardIndex (val) {
      if (this.keyboardMoveDirection && val > -1) {
        this.$nextTick(() => {
          const selected = this.$el.querySelector('.select-highlight')
          if (typeof selected.dataIndex === 'number') {
            if (selected.dataIndex <= 0) {
              // Verifica se existe thead
              let thead = this.$el.querySelector('.erp-select-thead:not(.thead-helper-header)')
              if (thead && thead.scrollIntoView) {
                if (thead.scrollIntoViewIfNeeded) {
                  return thead.scrollIntoViewIfNeeded(false)
                }
                thead.scrollIntoView(this.keyboardMoveDirection < 0)
              }
              return
            }
          }
          if (selected && selected.scrollIntoView) {
            if (selected.scrollIntoViewIfNeeded) {
              return selected.scrollIntoViewIfNeeded(false)
            }
            selected.scrollIntoView(this.keyboardMoveDirection < 0)
          }
        })
      }
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

      let filters = {}
      filters.page = this.serverPagination.page

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
    }, 300),
    __keyboardCalcIndex () {
      this.keyboardIndex = -1
      const sel = [this.model]
      this.$nextTick(() => {
        const index = sel === void 0 ? -1 : Math.max(-1, this.visibleOptions.findIndex((opt, index) => sel.includes(index)))
        if (index > -1) {
          this.keyboardMoveDirection = true
          setTimeout(() => {
            this.keyboardMoveDirection = false
          }, 1)
          this.__keyboardShow(index)
        }
      })
    },
    __keyboardCustomKeyHandle (key, e) {
      switch (key) {
        case 13: // ENTER key
        // case 32: // SPACE key
          console.log('Select item')
          break
      }
    },
    __keyboardShowTrigger () {
      // this.show()
      console.log('Show Trigger')
    },
    __keyboardSetSelection (index) {
      const opt = this.visibleOptions[index]

      this.__singleSelect(opt)
    },
    __keyboardIsSelectableIndex (index) {
      return index > -1 && index < this.visibleOptions.length && !this.visibleOptions[index].disable
    },
    __mouseEnterHandler (e, index) {
      if (!this.keyboardMoveDirection) {
        this.keyboardIndex = index
      }
    },
    __keyboardShow (index = 0) {
      if (this.keyboardIndex !== index) {
        this.keyboardIndex = index
      }
    },
    __keyboardSetCurrentSelection (navigation) {
      if (this.keyboardIndex >= 0 && this.keyboardIndex <= this.keyboardMaxIndex) {
        this.__keyboardSetSelection(this.keyboardIndex, navigation)
      }
    },
    __keyboardHandleKey (e) {
      const key = event.getEventKey(e)

      console.log('KEY')

      switch (key) {
        case 38: // UP key
          this.__keyboardMoveCursor(-1, e)
          break
        case 40: // DOWN key
          this.__keyboardMoveCursor(1, e)
          break
        case 13: // ENTER key
        // case 32: // SPACE key
          event.stopAndPrevent(e)
          this.__keyboardSetCurrentSelection()
          break
        case 9: // TAB key
          this.hide()
          break
      }

      this.__keyboardCustomKeyHandle(key, e)
    },
    __keyboardMoveCursor (offset, e) {
      event.stopAndPrevent(e)

      clearTimeout(this.keyboardMoveTimer)
      let
        index = this.keyboardIndex // ,
      // valid = this.__keyboardIsSelectableIndex || (() => true)

      /* do {
        index = normalizeToInterval(
          index + offset,
          -1,
          this.keyboardMaxIndex
        )
      }
      while (index !== this.keyboardIndex && !valid(index)) */
      // Removi as linhas acima para desativar o loop infinito utilizando as seteas cima e baixo do teclado.
      index = index === -1 ? 0 : (index + offset)
      if (index > this.keyboardMaxIndex) {
        index = this.keyboardMaxIndex
      } else if (index === -1) {
        index = 0
      } else {
      }

      this.keyboardMoveDirection = index > this.keyboardIndex ? 1 : -1
      this.keyboardMoveTimer = setTimeout(() => {
        this.keyboardMoveDirection = false
      }, 500)
      this.keyboardIndex = index
    },
    __singleSelect (val, disable) {
      if (disable) {
        return
      }
      this.$emit('selected', val)
      // this.__emit(val)
    }
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
    return h('div',
      {
        staticClass: 'erp-w-search erp-w-content',
        class: this.computedClass,
        on: {
          keydown: this.__keyboardHandleKey
        }
      },
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
        }, child.concat(this.data.map((data, index) => {
          return h(ETr, {
            key: index,
            'class': [
              data.disable ? 'text-faded' : 'cursor-pointer',
              index === this.keyboardIndex ? 'select-highlight' : '',
              index === this.model ? 'item-selected' : '',
              data.className || ''
            ],
            domProps: {
              dataIndex: index
            },
            nativeOn: {
              '!click': () => {
                const action = this.multiple ? '__toggleMultiple' : '__singleSelect'
                this[action](data)
              },
              mouseenter: e => {
                !data.disable && this.__mouseEnterHandler(e, index)
              }
            },
            staticClass: 'erp-select-list-item'
          }, this.columns.map((c) => {
            return h(ETd, {staticClass: ''}, [typeof c.value === 'function' ? c.value(data) : (typeof data[c.value] === 'object' ? JSON.stringify(data[c.value]) : data[c.value])])
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
