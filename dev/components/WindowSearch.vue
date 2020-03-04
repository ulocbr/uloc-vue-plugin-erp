<template>
  <div class="col-grow flex justify-between h-full bg-white">
    <window-search :fetch-data="fetchData" :columns="[
    {label: 'ID', value: 'id'},
    {label: 'Descrição do bem', value: 'descricao'}
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
  }
}
</script>
