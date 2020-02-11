<script>
import menu from '../sample-data/menu'
import wtableData from '../sample-data/window-table-data'
import EBtn from '../../src/components/button/EBtn.js'
import EWindowTable from '../../src/components/table/EWindowTable'
import ETr from '../../src/components/table/ETr'
import ETd from '../../src/components/table/ETd'

export default {
  inject: {
    erplayout: {
      default () {
        console.error('Main needs to be child of ErpLayout')
      }
    }
  },
  data () {
    return {
      menuDock: false,
      menuManually: null
    }
  },
  computed: {
    menu () {
      return menu
    },
    wtableData () {
      return wtableData
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.menuManually = this.erplayout.erpheader.menu.activeMenu
    })
  },
  destroyed () {
  },
  watch: {
    menuDock (v) {
      this.erplayout.erpheader.setMenuModuleToggle(v)
    },
    menuManually (v) {
      this.erplayout.erpheader.menu.setActiveMenu(v)
    }
  },
  methods: {},
  components: {ETd, ETr, EWindowTable, EBtn}
}
</script>

<template>
  <div class="wrapper">
    Tests:
    <div class="m-t">
      <u-btn color="primary" @click="menuDock = !menuDock">Dock Components Menu: {{ menuDock ? 'ON' : 'OFF' }}</u-btn>
    </div>
    <div class="m-t">
      <u-field label="Manually move cursor to chosen menu">
        <u-select
          v-model="menuManually"
          :options="menu.map((m) => { return {label: m.menuName, value: m.id} })"
        >
        </u-select>
      </u-field>
    </div>

    <br><br>
    Btn:
    <div class="m-t">
      <e-btn md label="Registrar solicitação"></e-btn>
    </div>

    <br><br>
    <div class="m-b">Window Table:</div>
    <div class="m-t" style="max-width: 900px; margin: auto">
      <e-window-table
        :columns="['Cod. Remoção', 'Data', 'Origem', 'Destino', 'Reboquista', 'Status', 'Opções']"
      >
        <e-tr v-for="data in wtableData" :key="data.id">
          <e-td>{{data.codigo}}</e-td>
          <e-td>{{data.data}}</e-td>
          <e-td>{{data.origem}}</e-td>
          <e-td>{{data.destino}}</e-td>
          <e-td>{{data.reboquista}}</e-td>
          <e-td>Ativo</e-td>
        </e-tr>
      </e-window-table>
    </div>
  </div>
</template>
