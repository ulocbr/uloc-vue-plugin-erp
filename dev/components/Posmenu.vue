<template>
  <div class="posmenu-default" :class="{openedMenuModule: erplayout.erpheader.modulemenu.toggledMenuModule}">
    <div @click="toggleMenuModule" class="left-modulos">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
        <path id="chevron-square-down" d="M13.393,32H1.607A1.608,1.608,0,0,0,0,33.607V45.393A1.608,1.608,0,0,0,1.607,47H13.393A1.608,1.608,0,0,0,15,45.393V33.607A1.608,1.608,0,0,0,13.393,32Zm.536,13.393a.537.537,0,0,1-.536.536H1.607a.537.537,0,0,1-.536-.536V33.607a.537.537,0,0,1,.536-.536H13.393a.537.537,0,0,1,.536.536ZM7.215,42.165l-3.85-3.854a.4.4,0,0,1,0-.569L3.6,37.5a.4.4,0,0,1,.569,0L7.5,40.839l3.331-3.331a.4.4,0,0,1,.569,0l.238.238a.4.4,0,0,1,0,.569l-3.85,3.854A.416.416,0,0,1,7.215,42.165Z" transform="translate(0 -32)" fill="#7f949e"/>
      </svg> Módulos
    </div>
    <div class="right-rest">
      <label for="smart-search" class="smart-search">
        <input id="smart-search" type="text" placeholder="Pesquisa inteligente" />
        <i class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
            <path id="search" d="M11.917,11.287,8.894,8.264a.278.278,0,0,0-.2-.082H8.453a4.826,4.826,0,1,0-.272.274v.239a.288.288,0,0,0,.082.2l3.023,3.023a.281.281,0,0,0,.4,0l.232-.232A.281.281,0,0,0,11.917,11.287ZM4.875,9A4.125,4.125,0,1,1,9,4.875,4.122,4.122,0,0,1,4.875,9Z" fill="#969696"/>
          </svg>
        </i>
      </label>
      <div class="menu-diviser"></div>
      <div class="posmenu-icons">
        <ErpPosMenuIcon name="tasks" icon-type="fa" icon-style="light" notify="1" tooltip="Tarefas" />
        <ErpPosMenuIcon name="calendar-alt" icon-type="fa" icon-style="light" notify="2" tooltip="Compromissos" />
        <ErpPosMenuIcon name="bell" icon-type="fa" icon-style="light" tooltip="Notificações" />
        <profile-menu :user="{id: 1, name: 'Tiago Felipe', image: 'https://static.tiagofelipe.com/photo.jpg'}" />
      </div>
    </div>
  </div>
</template>

<script>
import ErpPosMenuIcon from '../../src/components/layout/default/PosMenuIcon'
import ProfileMenu from './ProfileMenu'
export default {
  name: 'Posmenu',
  components: {ProfileMenu, ErpPosMenuIcon},
  inject: {
    erplayout: {
      default () {
        console.error('Main needs to be child of ErpLayout')
      }
    }
  },
  data () {
    return {
      menuDock: this.erplayout.erpheader.modulemenu.toggledMenuModule
    }
  },
  methods: {
    toggleMenuModule () {
      this.menuDock = !this.menuDock
      this.erplayout.erpheader.setMenuModuleToggle(this.menuDock)
    }
  }
}
</script>
