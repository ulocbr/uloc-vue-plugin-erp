<script>
import menu from '../sample-data/menu'
import wtableData from '../sample-data/window-table-data'
import tableData from '../sample-data/table-data'
import EBtn from '../../src/components/button/EBtn.js'
import EWindowTable from '../../src/components/table/EWindowTable'
import ETr from '../../src/components/table/ETr'
import ETd from '../../src/components/table/ETd'
import ETableFooter from '../../src/components/table/ETableFooter'
import ETableFooterResult from '../../src/components/table/ETableFooterResult'
import EBtnCircleStatus from '../../src/components/button/EBtnCircleStatus'
import {UTable} from 'uloc-vue'
import EBtnTableOptions from '../../src/components/button/EBtnTableOption'

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
      menuManually: null,
      table: {
        busca: '',
        serverData: [],
        serverPagination: {
          page: 1,
          rowsNumber: 10, // specifying this determines pagination is server-side
          rowsPerPage: 20
        },
        columns: [
          {name: 'codigo', label: 'Código', field: 'codigo', align: 'left', sortable: true},
          {
            name: 'comitente',
            required: true,
            label: 'Comitente',
            align: 'left',
            field: 'comitente',
            sortable: true
          },
          {
            name: 'descricao',
            required: true,
            label: 'Descrição',
            align: 'left',
            field: 'descricao',
            sortable: true
          },
          {
            name: 'placa',
            required: true,
            label: 'Placa',
            align: 'left',
            field: 'placa',
            sortable: true
          },
          {
            name: 'localizacao',
            required: true,
            label: 'Localização',
            align: 'left',
            field: 'localizacao',
            sortable: true
          },
          {
            name: 'status',
            required: true,
            label: 'Situação',
            align: 'left',
            field: 'status',
            sortable: false
          },
          {
            name: 'options',
            required: true,
            label: '',
            field: 'options',
            sortable: false
          }
        ],
        filter: '',
        selected: [],
        loading: false
      }
    }
  },
  computed: {
    menu () {
      return menu
    },
    wtableData () {
      return wtableData
    },
    tableData () {
      return tableData
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.menuManually = this.erplayout.erpheader.menu.activeMenu
      this.request({
        pagination: this.table.serverPagination,
        filter: this.table.busca
      })
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
  methods: {
    request ({pagination, filter}) {
      this.table.loading = true

      window.setTimeout(() => {
        this.table.serverPagination = pagination
        this.table.serverPagination.rowsNumber = 100
        this.table.serverData = tableData
        this.table.loading = false
      }, 2000)
    },
    openWindow () {
      console.log('click window test...')
      let window = 'windowTest'
      !this.$uloc.window.get(window) && this.$uloc.window.new({
        wid: window,
        title: 'Criar Leilão',
        width: '904',
        height: '600',
        minHeight: '500',
        backdrop: false,
        clickOutside: false,
        windowClass: 'erp-window',
        contentClass: 'overflow-hidden',
        props: {}
      }, () => import('../components/WindowTest.vue'))
        .then((wid) => {
          console.log(wid)
        }) // return wid
    },
    openWindowWithTabs () {
      console.log('click window test...')
      let window = 'windowTestTabs'
      !this.$uloc.window.get(window) && this.$uloc.window.new({
        wid: window,
        title: 'Novo Bem',
        width: '1000',
        height: '800',
        minHeight: '500',
        backdrop: false,
        clickOutside: false,
        windowClass: 'erp-window',
        contentClass: 'overflow-hidden',
        props: {}
      }, () => import('../components/WindowTestTabs.vue'))
        .then((wid) => {
          console.log(wid)
        }) // return wid
    }
  },
  components: {
    EBtnTableOptions,
    EBtnCircleStatus,
    ETableFooterResult,
    ETableFooter,
    ETd,
    ETr,
    EWindowTable,
    EBtn,
    UTable
  }
}
</script>

<template>
  <div class="wrapper-md">
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
            <e-td>{{ data.codigo }}</e-td>
            <e-td>{{ data.data }}</e-td>
            <e-td>{{ data.origem }}</e-td>
            <e-td>{{ data.destino }}</e-td>
            <e-td>{{ data.reboquista }}</e-td>
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
      <u-table
        ref="table"
        color="primary"
        :data="table.serverData"
        :columns="table.columns"
        :filter="table.busca"
        row-key="id"
        :pagination.sync="table.serverPagination"
        @request="request"
        selection="multiple"
        :selected.sync="table.selected"
        :loading="table.loading"
        class="erp-table"
        :rows-per-page-options="[20, 50, 100]"
      >
        <!--<template slot="top-right" slot-scope="props">
        </template>-->
        <u-tr slot="header" slot-scope="props">
          <u-th auto-width>
            <u-checkbox
              v-model="props.selected"
              :indeterminate="props.partialSelected"
              size="sm"
            />
          </u-th>
          <u-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </u-th>
        </u-tr>

        <u-tr class="cursor-pointer" slot="body" slot-scope="props"
              :props="props">
          <u-td auto-width>
            <u-checkbox color="primary" v-model="props.selected" size="xs" />
          </u-td>
          <u-td key="codigo" :props="props">
            {{props.row.codigo}}
          </u-td>
          <u-td key="comitente" :props="props">
            {{props.row.comitente}}
          </u-td>
          <u-td key="descricao" :props="props">
            {{props.row.descricao}}
          </u-td>
          <u-td key="placa" :props="props">
            {{props.row.placa}}
          </u-td>
          <u-td key="localizacao" :props="props">
            {{props.row.localizacao}}
          </u-td>
          <u-td class="text-uppercase" key="status" :props="props">
            <span style="color: #AE8B00" v-if="props.row.status === 1">Em estoque</span>
            <div v-if="props.row.status === 2" class="text-success flex items-center"><i
              class="erp-icon success-circle min m-r-sm"></i> Vendido
            </div>
          </u-td>
          <u-td class="text-center" key="options" :props="props">
            <!--<u-icon name="chevron-down" type="fa" icon-style="regular" />-->
            <!--<u-btn icon-type="fa" icon="chevron-down" icon-style="regular" size="xs" flat />-->
            <e-btn-table-options />
          </u-td>
        </u-tr>
      </u-table>
    </div>

    <br><br>
    Window:
    <div class="m-t">
      <e-btn md label="Abrir janela" @click="openWindow"></e-btn>
      <e-btn md label="Abrir janela com Tabs" @click="openWindowWithTabs"></e-btn>
    </div>

    <br><br>
    Btn Circle Status:
    <div class="m-t">
      <e-btn-circle-status class="positive m-r-xs" />
      <e-btn-circle-status class="negative m-r-xs" />
      <e-btn-circle-status class="warning m-r-xs" />
      <e-btn-circle-status class="blue m-r-xs" />
      <e-btn-circle-status class="grey m-r-xs" />
      <e-btn-circle-status class="black m-r-xs" />
      <e-btn-circle-status class="purple m-r-xs" />
    </div>
  </div>
</template>
