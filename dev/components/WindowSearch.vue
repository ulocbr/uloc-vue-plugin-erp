<template>
  <div class="col-grow flex justify-between h-full bg-white">
    <window-search @selected="selected" :fetch-data="fetchData" :columns="[
    {label: 'ID', value: 'id'},
    {label: 'Descrição do bem', value: 'descricao'},
    {label: 'Tipo', value: 'tipo'}
  ]">
    </window-search>
  </div>
</template>

<script>
import WindowSearch from '../../src/components/search/WindowSearch'

export default {
  components: {WindowSearch},
  props: {
    fetchData: Function
  },
  data () {
    return {
      window: this.$root.wid
    }
  },
  methods: {
    selected (val) {
      this.$uloc.window.emit(this.window, 'selected', val)
      this.$uloc.window.close(this.window)
    }
  }
}
</script>
