<script>
import menu from '../sample-data/menu'

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
  components: {}
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
  </div>
</template>
