import {getEventKey, stopAndPrevent} from 'uloc-vue/src/utils/event.js'
// import { normalizeToInterval } from 'uloc-vue/src/utils/format.js'

export default {
  data: () => ({
    keyboardIndex: 0,
    keyboardMoveDirection: false,
    keyboardMoveTimer: false
  }),
  watch: {
    keyboardIndex (val) {
      if (this.$refs.popover && this.$refs.popover.showing && this.keyboardMoveDirection && val > -1) {
        this.$nextTick(() => {
          if (!this.$refs.popover) {
            return
          }
          const selected = this.$refs.popover.$el.querySelector('.select-highlight')
          if (typeof selected.dataIndex === 'number') {
            if (selected.dataIndex <= 0) {
              // Verifica se existe thead
              let thead = this.$refs.popover.$el.querySelector('.erp-select-thead:not(.thead-helper-header)')
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
      const key = getEventKey(e)

      switch (key) {
        case 38: // UP key
          this.__keyboardMoveCursor(-1, e)
          break
        case 40: // DOWN key
          this.__keyboardMoveCursor(1, e)
          break
        case 13: // ENTER key
        case 32: // SPACE key
          if (this.$refs.popover.showing) {
            stopAndPrevent(e)
            this.__keyboardSetCurrentSelection()
            return
          }
          break
        case 9: // TAB key
          this.hide()
          break
      }

      this.__keyboardCustomKeyHandle(key, e)
    },
    __keyboardMoveCursor (offset, e) {
      stopAndPrevent(e)

      if (this.$refs.popover.showing) {
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
        return
      }

      this.__keyboardShowTrigger()
    }
  }
}
