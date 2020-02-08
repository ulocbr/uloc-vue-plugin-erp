<script>
import 'uloc-vue/dist/fonts.css'
import 'uloc-vue/dist/uloc.styl'
import 'assets/styl/app.styl'
import 'assets/styl/icons.styl'
import ErpLayout from '../src/components/layout/default/ErpLayout'
import ErpHeader from '../src/components/layout/default/Header'
import ErpMenu from '../src/components/layout/default/Menu'
import ErpMenuItem from '../src/components/layout/default/MenuItem'
import ErpMenuItems from '../src/components/layout/default/MenuItems'
import MenuAlerts from '../src/components/layout/default/MenuAlerts'
import MenuAccountInfo from '../src/components/layout/default/MenuAccountInfo'
import MenuModule from '../src/components/layout/default/MenuModule'
import MenuModuleComponent from '../src/components/layout/default/MenuModuleComponent'
import menu from './sample-data/menu'
import ErpLayoutContainer from '../src/components/layout/default/LayoutContainer'

export default {
  name: 'AppRoot',
  components: {
    ErpLayoutContainer,
    MenuModuleComponent,
    MenuModule,
    MenuAccountInfo,
    MenuAlerts,
    ErpMenuItems,
    ErpMenuItem,
    ErpMenu,
    ErpHeader,
    ErpLayout
  },
  data () {
    return {
      activeMenu: menu[0]
    }
  },
  computed: {
    menuComponents () {
      return menu
    }
  },
  mounted () {
    console.log(this.$uloc)
  },
  methods: {
    clickMenu (e, menu) {
      console.log(e, menu)
      this.activeMenu = menu
    }
  }
}
</script>

<template>
  <div id="uloc-app">
    <u-layout>
      <ErpLayout>
        <ErpHeader>
          <ErpMenu>
            <ErpMenuItems>
              <ErpMenuItem @click="clickMenu($event, menu)"
                           v-for="menu in menuComponents"
                           :key="menu.menuName"
                           :active="menu === activeMenu"
              >
                {{ menu.menuName }}
              </ErpMenuItem>
            </ErpMenuItems>
            <MenuAlerts :alerts="2" />
            <MenuAccountInfo user-image="https://static.tiagofelipe.com/photo.jpg" />
          </ErpMenu>
          <MenuModule>
            <MenuModuleComponent
              v-for="c in activeMenu.components"
              :right="c.right"
              :hide-label="c.hideLabel"
              :label="c.component"
              :key="c.component"
              :items="c.features"
            />
          </MenuModule>
        </ErpHeader>
        <ErpLayoutContainer>
          <router-view />
        </ErpLayoutContainer>
      </ErpLayout>
    </u-layout>
  </div>
</template>

<style src="./assets/style.styl" lang="stylus"></style>
