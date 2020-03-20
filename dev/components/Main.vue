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
import ErpInput from '../../src/components/form/input'
import ErpSField from '../../src/components/form/SimpleField'
import HelperInputBtn from '../../src/components/form/helpers/HelperInputBtn'
import ErpSelect from '../../src/components/form/select'
import ErpLabel from '../../src/components/form/ErpLabel'
import ErpBox from '../../src/components/boxes/Box'
import ErpCheckbox from '../../src/components/form/checkbox'

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
      },
      forms: {
        input1: 'teste',
        select1: 2,
        select2: null,
        selectMultiple: [],
        select2Options: [
          {label: 'Aplicativo iOS', value: 1, desc: 'Mobile iOS compatible test'},
          {label: 'Aplicativo Android', value: 2, desc: 'Android 8.2'},
          {label: 'Desktop', value: 3, desc: 'Ubuntu 19 lts'},
          {label: 'Híbrido', value: 4, desc: 'All platforms'},
          {label: 'Windows', value: 5, desc: 'Windows 10 Professional'},
          {label: 'Linux', value: 6, desc: 'Ubuntu or Centos'},
          {label: 'MacOS', value: 7, desc: 'Last version', color: 'positive', class: 'font-bold'},
          {label: 'MicroTik', value: 8, desc: 'n/d'},
          {label: 'N/d', value: 9, desc: 'Other choices'}
        ],
        select2Columns: [
          {label: 'Descrição', value: 'label'},
          {label: 'Detalhes', value: 'desc'}
        ],
        date1: null,
        windowSearch: null,
        checkbox: false
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
    },
    openWindowSearch () {
      console.log('click window search test...')
      let window = 'windowSearch'
      !this.$uloc.window.get(window) && this.$uloc.window.new({
        wid: window,
        title: 'Buscar Bem',
        width: '800',
        height: '600',
        minHeight: '500',
        backdrop: true,
        clickOutside: false,
        windowClass: 'erp-window',
        contentClass: 'overflow-hidden bg-white',
        props: {
          fetchData: (terms, filters, done) => {
            console.log('Buscando dados: ', terms, filters, done)
            setTimeout(() => {
              let response = {
                totalRows: 100,
                totalPages: 5,
                data: [
                  {id: 1, descricao: 'Bem 01', tipo: {id: 1, nome: 'Tiago'}},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 3, descricao: 'Bem 03'},
                  {id: 4, descricao: 'Bem 04'},
                  {id: 5, descricao: 'Bem 05'},
                  {id: 6, descricao: 'Bem 06'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'},
                  {id: 2, descricao: 'Bem 02'}
                ]
              }

              let filter = function (terms, {field, list}) {
                const token = terms.toLowerCase()
                return list.filter(item => ('' + item[field]).toLowerCase().includes(token))
              }

              let filteredData = filter(terms, {field: 'descricao', list: response.data})

              done(filteredData, {
                page: filters.page,
                rowsNumber: filteredData.length, // response.totalRows,
                rowsPerPage: 20
              })
            }, 1000)
          }
        }
      }, () => import('../components/WindowSearch.vue'))
        .then((wid) => {
          this.$uloc.window.listen(wid, {
            selected: (wid, val) => {
              console.log('Selecionado com sucesso: ', val)
              this.forms.windowSearch = val
            }
          })
          console.log(wid)
        }) // return wid
    }
  },
  components: {
    ErpCheckbox,
    ErpBox,
    ErpLabel,
    ErpSelect,
    HelperInputBtn,
    ErpSField,
    ErpInput,
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
          <e-table-footer slot="footer" class="flex flex-center">
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

    <br><br>
    Forms:
    <div class="m-t wrapper" style="background-color: #F4F5F8">
      <!--<div class="bg-white b wrapper-sm m-b-md">
        {{ forms.input1 }}
      </div>-->
      <p>Inputs</p>

      <p><small>Default</small></p>
      <div style="width: 200px">
        <erp-input v-model="forms.input1" />
      </div>

      <p class="m-t"><small>Simple Border</small></p>
      <div style="width: 200px">
        <erp-input simple-border v-model="forms.input1" />
      </div>

      <p class="m-t"><small>Field</small></p>
      <div class="row">
        <div class="col m-r">
          <erp-s-field
            label="Label Top Left"
          >
            <!--<div class="row">
              <div class="col"><erp-input v-model="forms.input1" /></div>
              <div class="m-l-xs flex flex-center no-wrap"><a><i class="erp-icon search min"></i> </a></div>
            </div>-->
            <helper-input-btn>
              <erp-input slot="input" v-model="forms.input1" />
              <a><i class="erp-icon search min"></i> </a>
            </helper-input-btn>
          </erp-s-field>
        </div>

        <div class="col m-r">
          <erp-s-field
            view="tr"
            label="Label Top Right"
          >
            <erp-input v-model="forms.input1" />
          </erp-s-field>
        </div>
      </div>

      <div class="row m-t-lg">
        <div class="col m-r">
          <erp-s-field
            view="ll"
            label="Label Left"
            helper="Some helper"
            no-label
          >
            <erp-input v-model="forms.input1" />
          </erp-s-field>
        </div>

        <div class="col">
          <erp-s-field
            label-width="100px"
            view="lr"
            label="Label Left AR"
            helper="Some helper"
            helper-position="rb"
          >
            <erp-input v-model="forms.input1" />
          </erp-s-field>
        </div>
      </div>

      <p class="m-t"><small>Colors</small></p>
      <div class="m-r" style="width: 200px; display: inline-block">
        <div>Error</div>
        <div>
          <erp-input error v-model="forms.input1" />
        </div>
      </div>
      <div class="m-r" style="width: 200px; display: inline-block">
        <div>Warnning</div>
        <div>
          <erp-input warning v-model="forms.input1" :loading="true" />
        </div>
      </div>

      <p class="m-t"><small>Icon</small></p>
      <div style="width: 200px">
        <erp-input :before="[{icon: 'mail', handler () {}}]" suffix="@gmail.com" v-model="forms.input1" />
      </div>

      <p class="m-t"><small>Placeholder</small></p>
      <div style="width: 200px">
        <erp-input placeholder="Buscar" :before="[{icon: 'mail', handler () {}}]" suffix="@gmail.com"
                   v-model="forms.input1" />
      </div>

      <p class="m-t"><small>Sizes</small></p>
      <div class="m-r" style="width: 200px; display: inline-block">
        <div>Size 1 (Default)</div>
        <div>
          <erp-input v-model="forms.input1" />
        </div>
      </div>
      <div class="m-r" style="width: 200px; display: inline-block">
        <div>Size 2</div>
        <div>
          <erp-input size="2" v-model="forms.input1" />
        </div>
      </div>

      <p class="m-t"><small>Shortkey</small></p>
      <div class="m-r" style="width: 200px; display: inline-block">
        <div>Size 1 (Default)</div>
        <div>
          <erp-input shortkey="F3" v-model="forms.input1" />
        </div>
      </div>
      <div class="m-r" style="width: 200px; display: inline-block">
        <div>Size 2</div>
        <div>
          <erp-input :shortkey="['Ctrl','F3']" size="2" v-model="forms.input1" />
        </div>
      </div>

      <p class="m-t"><small>Disabled</small></p>
      <div style="width: 200px">
        <erp-input disable v-model="forms.input1" />
      </div>

      <hr>

      <p class="m-t"><small>Simple Select</small></p>
      <div style="width: 200px">
        <erp-select simple :options="[{label: 'Option 1', value: 1}, {label: 'Option 2', value: 2}]"
                    v-model="forms.select1" />
        {{forms.select1}}
      </div>
      <a @click="forms.select1 = 2">test</a>

      <p class="m-t"><small>Advanced Select</small></p>
      <div class="m-r" style="width: 200px; display: inline-block">
        <erp-select placeholder="Selecione" limit-height :options="forms.select2Options" :columns="forms.select2Columns"
                    v-model="forms.select2" loading />
        {{forms.select2}}
      </div>
      <div class="m-r" style="width: 200px; display: inline-block">
        <erp-select size="2" :options="forms.select2Options" v-model="forms.select2" />
        {{forms.select2}}
      </div>

      <p class="m-t"><small>Multiple Select</small></p>
      <div class="m-r" style="width: 200px; display: inline-block">
        <erp-select multiple placeholder="Selecione" :options="forms.select2Options" :columns="forms.select2Columns"
                    v-model="forms.selectMultiple" />
        {{forms.selectMultiple}}
      </div>

      <p class="m-t"><small>Multiple Select Slot Item</small></p>
      <div class="m-r" style="width: 200px; display: inline-block">
        <erp-select multiple placeholder="Selecione" :options="forms.select2Options" :columns="forms.select2Columns"
                    v-model="forms.selectMultiple">
          <template v-slot:itemLabel="prop">
            <span v-if="prop.columnIndex === 0">
              {{prop}}
            </span>
            <span v-else>
              {{prop.label}}
            </span>
          </template>
        </erp-select>
        {{forms.selectMultiple}}
      </div>

      <p class="m-t"><small>Window Search</small></p>
      <div class="m-r" style="width: 200px; display: inline-block">
        {{forms.windowSearch}}
        <e-btn md label="Buscar bem" @click="openWindowSearch"></e-btn>
      </div>

      <p class="m-t"><small>Label</small></p>
      <div class="m-r" style="width: 400px; display: inline-block">
        <erp-label label="Label title" label-view="tl">
          Algo aqui...
        </erp-label>
      </div>

      <div style="height: 100px"></div>

      <p class="m-t"><small>Boxes</small></p>
      <div class="m-r" style="width: 216px; display: inline-block">
        <erp-box label="Imagem / Foto principal">
          <div>...</div>
        </erp-box>
      </div>

      <p class="m-t"><small>Checkbox</small></p>
      <div class="m-r" style="width: 216px; display: inline-block">
        <erp-checkbox v-model="forms.checkbox">Teste</erp-checkbox>
      </div>

      <input />

    </div>
  </div>
</template>
