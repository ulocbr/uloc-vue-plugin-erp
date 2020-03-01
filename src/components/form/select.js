import Input from './input'
import ErpInputFrame from './ErpInputFrame.js'
import SelectKeyboard from './mixins/select-keyboard'
import ErpSelectContainer from './select-container'
import ErpSelectTable from './select-table'
import ErpSelectTr from './select-tr'
import ETd from '../table/ETd'
import {UPopover, USpinner} from 'uloc-vue'

function defaultFilterFn (terms, obj) {
  return obj.label.toLowerCase().indexOf(terms) > -1
}

export default {
  name: 'ErpSelect',
  mixins: [Input, SelectKeyboard],
  props: {
    options: {
      type: Array,
      required: true,
      validator: v => v.every(o => 'label' in o && 'value' in o)
    },
    columns: Array,
    value: {required: true},
    multiple: Boolean,
    simple: Boolean
  },
  data () {
    return {}
  },
  watch: {
    '$refs.popover.showing' (v) {
      console.log('Mostrou', v)
      v && this.$refs.table.adjustPosition()
    }
  },
  computed: {
    optModel () {
      if (this.multiple) {
        return this.model.length > 0
          ? this.options.map(opt => this.model.includes(opt.value))
          : this.options.map(opt => false)
      }
    },
    visibleOptions () {
      let opts = this.options.map((opt, index) => Object.assign({}, opt, {index}))
      if (this.filter && this.terms.length) {
        const lowerTerms = this.terms.toLowerCase()
        opts = opts.filter(opt => this.filterFn(lowerTerms, opt))
      }
      return opts
    },
    keyboardMaxIndex () {
      return this.visibleOptions.length - 1
    },
    filterFn () {
      return typeof this.filter === 'boolean'
        ? defaultFilterFn
        : this.filter
    },
    actualValue () {
      if (this.displayValue) {
        return this.displayValue
      }
      if (!this.multiple) {
        const opt = this.options.find(opt => opt.value === this.model)
        return opt ? opt.label : ''
      }

      const opt = this.selectedOptions.map(opt => opt.label)
      return opt.length ? opt.join(', ') : ''
    },
    computedClearValue () {
      return this.clearValue || (this.multiple ? [] : null)
    },
    selectedOptions () {
      if (this.multiple) {
        return this.length > 0
          ? this.options.filter(opt => this.model.includes(opt.value))
          : []
      }
    },
    length () {
      return this.multiple
        ? this.model.length
        : ([null, undefined, ''].includes(this.model) ? 0 : 1)
    },
    additionalLength () {
      return this.displayValue && this.displayValue.length > 0
    }
  },
  methods: {
    __onClick (e) {
      this.focus()
      this.$emit('click', e)
      if (!this.simple) {
        // Open options
        this.togglePopup()
      }
    },
    togglePopup () {
      this.$refs.popover && this[this.$refs.popover.showing ? 'hide' : 'show']()
    },
    show () {
      this.__keyboardCalcIndex()
      this.$refs.table.adjustPosition()
      window.setTimeout(() => {
        this.$refs.table.adjustPosition()
      }, 1)
      if (this.$refs.popover) {
        return this.$refs.popover.show()
      }
    },
    hide () {
      return this.$refs.popover ? this.$refs.popover.hide() : Promise.resolve()
    },
    reposition () {
      const popover = this.$refs.popover
      if (popover && popover.showing) {
        this.$nextTick(() => popover && popover.reposition())
      }
    },

    __keyboardCalcIndex () {
      this.keyboardIndex = -1
      const sel = this.multiple ? this.selectedOptions.map(o => o.value) : [this.model]
      this.$nextTick(() => {
        const index = sel === void 0 ? -1 : Math.max(-1, this.visibleOptions.findIndex(opt => sel.includes(opt.value)))
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
        case 32: // SPACE key
          if (!this.$refs.popover.showing) {
            this.show()
          }
          break
      }
    },
    __keyboardShowTrigger () {
      this.show()
    },
    __keyboardSetSelection (index) {
      const opt = this.visibleOptions[index]

      if (this.multiple) {
        this.__toggleMultiple(opt.value, opt.disable)
      } else {
        this.__singleSelect(opt.value, opt.disable)
      }
    },
    __keyboardIsSelectableIndex (index) {
      return index > -1 && index < this.visibleOptions.length && !this.visibleOptions[index].disable
    },
    __mouseEnterHandler (e, index) {
      if (!this.keyboardMoveDirection) {
        this.keyboardIndex = index
      }
    },
    __onFocus () {
      if (this.disable || this.focused) {
        return
      }
      this.focused = true
      this.$emit('focus')
    },
    __onShow () {
      if (this.disable) {
        return
      }
      this.__onFocus()
      if (this.filter && this.$refs.filter) {
        this.$refs.filter.focus()
      }
    },
    __onBlur (e) {
      if (!this.focused) {
        return
      }
      setTimeout(() => {
        const el = document.activeElement
        if (
          !this.$refs.popover ||
          !this.$refs.popover.showing ||
          (el !== document.body && !this.$refs.popover.$el.contains(el))
        ) {
          this.__onClose()
          this.hide()
        }
      }, 1)
    },
    __onClose (keepFocus) {
      this.$nextTick(() => {
        if (JSON.stringify(this.model) !== JSON.stringify(this.value)) {
          this.$emit('change', this.model)
        }
      })
      this.terms = ''
      if (!this.focused) {
        return
      }
      if (keepFocus) {
        this.$refs.input && this.$refs.input.$el && this.$refs.input.$el.focus()
        return
      }
      this.focused = false
      this.$emit('blur')
    },
    __singleSelect (val, disable) {
      if (disable) {
        return
      }
      this.__emit(val)
      this.hide()
    },
    __toggleMultiple (value, disable) {
      if (disable) {
        return
      }
      const
        model = this.model,
        index = model.indexOf(value)

      if (index > -1) {
        this.$emit('remove', {index, value: model.splice(index, 1)})
      } else {
        this.$emit('add', {index: model.length, value})
        model.push(value)
      }

      this.$emit('input', model)
    },
    __emit (value) {
      this.$emit('input', value)
      this.$nextTick(() => {
        if (JSON.stringify(value) !== JSON.stringify(this.value)) {
          this.$emit('change', value)
        }
      })
    },
    __setModel (val, forceUpdate) {
      this.model = val || (this.multiple ? [] : null)
      this.$emit('input', this.model)
      if (forceUpdate || !this.$refs.popover || !this.$refs.popover.showing) {
        this.__onClose(forceUpdate)
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },

  render (h) {
    return h(ErpInputFrame,
      {
        staticClass: 'erp-input erp-select',
        class: {
          'erp-select-advanced': !this.simple
        },
        props: {
          prefix: this.prefix,
          suffix: this.suffix,
          stackLabel: this.stackLabel,
          floatLabel: this.floatLabel,
          error: this.error,
          warning: this.warning,
          disable: this.disable,
          readonly: this.readonly,
          inverted: this.inverted,
          invertedLight: this.invertedLight,
          dark: this.dark,
          hideUnderline: this.hideUnderline,
          before: this.before,
          after: this.after,
          color: this.color,
          noParentField: this.noParentField,
          focused: this.focused,
          length: this.autofilled + this.length,
          topAddons: this.isTextarea,
          size: this.size,
          simpleBorder: this.simpleBorder
        },
        nativeOn: {
          click: this.__onClick,
          focus: this.__onFocus,
          keydown: this.simple ? () => {} : this.__keyboardHandleKey
        }
      }, [
        h('div', {staticClass: 'erp-if-select'}),
        this.simple ? h('select',
          {
            ref: 'input',
            staticClass: 'erp-simple-select',
            on: {
              input: this.__set,
              focus: this.__onFocus,
              blur: this.__onInputBlur,
              keydown: this.simple ? () => {} : this.__onKeydown,
              keyup: this.simple ? () => {} : this.__onKeyup
              // animationstart: this.__onAnimationStart
            }
          }, this.options.map(opt => {
            return h('option', {
              domProps: {
                value: opt.value,
                'selected': opt.value === this.value
              }
            }, opt.label)
          }))
          : [
            h('input', {
              ref: 'input',
              staticClass: 'erp-select-input col',
              attrs: {
                readonly: true
              },
              domProps: {
                placeholder: this.placeholder,
                value: this.fakeInputValue
              },
              on: {
                input: this.__set,
                focus: this.__onFocus,
                blur: this.__onInputBlur,
                keydown: this.__onKeydown,
                keyup: this.__onKeyup
                // animationstart: this.__onAnimationStart
              }
            }, null),
            h(UPopover, {
              ref: 'popover',
              staticClass: 'erp-select-popup',
              'class': this.dark ? 'bg-dark' : null,
              props: {
                fit: true,
                disable: !this.editable,
                anchorClick: false
              },
              on: {
                show: this.__onShow,
                hide: () => {
                  this.__onClose(true)
                }
              },
              nativeOn: {
                keydown: this.__keyboardHandleKey
              }
            }, [h(ErpSelectContainer, {
            }, [h(ErpSelectTable, {
              ref: 'table',
              props: {
                columns: this.columns
              },
              staticClass: 'erp-select-list'
            }, this.visibleOptions.map((opt, index) => {
              return h(ErpSelectTr, {
                key: index,
                'class': [
                  opt.disable ? 'text-faded' : 'cursor-pointer',
                  index === this.keyboardIndex ? 'select-highlight' : '',
                  opt.className || ''
                ],
                domProps: {
                  dataIndex: index,
                  dataValue: opt.value
                },
                props: {
                  cfg: opt,
                  slotReplace: true,
                  active: this.multiple ? void 0 : this.value === opt.value
                },
                nativeOn: {
                  '!click': () => {
                    const action = this.multiple ? '__toggleMultiple' : '__singleSelect'
                    this[action](opt.value, opt.disable)
                  },
                  mouseenter: e => {
                    !opt.disable && this.__mouseEnterHandler(e, index)
                  }
                },
                staticClass: 'erp-select-list-item'
              }, [
                !this.columns ? h(ETd, opt.label) : this.columns.map((column) => {
                  if (typeof opt[column.value] === 'undefined') {
                    console.error(`Column ${column.value} not exits in option value`)
                  }
                  return h(ETd, opt[column.value])
                })
              ])
            }))])])
          ],
        (this.isLoading && h(USpinner, {
          slot: 'after',
          staticClass: 'erp-if-control',
          props: {size: '11px'}
        })) || void 0
      ].concat([h('div', {staticClass: 'erp-select-line-helper'}), this.$slots.default]))
  }
}
