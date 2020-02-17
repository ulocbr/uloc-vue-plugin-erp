<template>
  <window-content>
    <window-content-header>...</window-content-header>
    <erp-tabs @change="changeTab" :active="tabActive">
      <erp-tab-item name="basico">Básico</erp-tab-item>
      <erp-tab-item name="avaliacao">Avaliação</erp-tab-item>
      <erp-tab-item name="imagens">Imagens/Arquivos</erp-tab-item>
      <erp-tab-item name="obs">Observações</erp-tab-item>
      <erp-tab-item name="remocoes">Remoções</erp-tab-item>
      <erp-tab-item name="estada">Estada</erp-tab-item>
      <erp-tab-item name="leiloes">Leilões e Lances</erp-tab-item>
    </erp-tabs>
    <window-content-body tabs>
      ...
    </window-content-body>
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
import ErpTabs from '../../src/components/tabs/Tabs'
import ErpTabItem from '../../src/components/tabs/TabItem'

export default {
  data () {
    return {
      tabActive: 'imagens'
    }
  },
  methods: {
    changeTab ({tab}) {
      console.log(tab)
      this.tabActive = tab
    }
  },
  components: {ErpTabItem, ErpTabs, WindowContentFooter, WindowContentBody, WindowContentHeader, WindowContent}
}
</script>
