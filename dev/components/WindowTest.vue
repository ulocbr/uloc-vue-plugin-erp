<template>
  <window-content>
    <window-content-header>...</window-content-header>
    <window-content-body>...</window-content-body>
    <window-content-footer class="text-right">
      <div class="inline-block window-actions">
        <u-btn label="Cancelar" icon="chevron-left" icon-type="fa" icon-style="light" flat no-caps @click="$uloc.window.close($root.wid)" />
        <u-btn label="Salvar (F2)" icon="save" icon-type="fa" icon-style="light" flat no-caps />
      </div>
    </window-content-footer>
  </window-content>
</template>

<script>
import WindowContent from '../../src/components/window/Content'
import WindowContentHeader from '../../src/components/window/Header'
import WindowContentBody from '../../src/components/window/Body'
import WindowContentFooter from '../../src/components/window/Footer'

export default {
  components: {WindowContentFooter, WindowContentBody, WindowContentHeader, WindowContent}
}
</script>
