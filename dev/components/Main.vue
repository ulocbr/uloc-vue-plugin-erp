<script>
import menu from '../sample-data/menu'
import wtableData from '../sample-data/window-table-data'
import EBtn from '../../src/components/button/EBtn.js'
import EWindowTable from '../../src/components/table/EWindowTable'
import ETr from '../../src/components/table/ETr'
import ETd from '../../src/components/table/ETd'
import ETableFooter from '../../src/components/table/ETableFooter'
import ETableFooterResult from '../../src/components/table/ETableFooterResult'
import EBtnCircleStatus from '../../src/components/button/EBtnCircleStatus'

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
  components: {EBtnCircleStatus, ETableFooterResult, ETableFooter, ETd, ETr, EWindowTable, EBtn}
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
    <div class="wrapper bg-white flex justify-between" style="height: 200px">
      <div class="m-t col-grow flex justify-between h-full" style="max-width: 900px; margin: auto">
        <e-window-table class="col-grow h-full"
                        :columns="['Cod. Remoção', 'Data', 'Origem', 'Destino', 'Reboquista', 'Status', 'Opções']"
        >
          <e-tr v-for="data in wtableData" :key="data.id">
            <e-td>{{data.codigo}}</e-td>
            <e-td>{{data.data}}</e-td>
            <e-td>{{data.origem}}</e-td>
            <e-td>{{data.destino}}</e-td>
            <e-td>{{data.reboquista}}</e-td>
            <e-td>
              <div class="flex items-center">
                <e-btn-circle-status class="bg-blue-10 m-r-xs" />
                Ativo
              </div>
            </e-td>
            <e-td><a><i class="erp-icon search min"></i> </a></e-td>
          </e-tr>
          <e-table-footer class="flex flex-center">
            <e-table-footer-result class="m-r text-right">Total de remoções = 1</e-table-footer-result>
            <e-table-footer-result class="m-r text-right">Total de remoções = 1</e-table-footer-result>
            <e-table-footer-result class="text-right">Total de remoções = 1</e-table-footer-result>
          </e-table-footer>
        </e-window-table>
      </div>
    </div>

    <br><br>
    <div class="m-b">List Table:</div>
    <div class="wrapper justify-between" style="height: 200px">
    </div>
  </div>
</template>
