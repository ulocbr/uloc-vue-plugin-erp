<script>
import 'uloc-vue/dist/fonts.css'
import 'uloc-vue/dist/uloc.styl'
import 'assets/styl/app.styl'
import 'assets/styl/icons.styl'
import ErpLayoutBase from '../src/components/layout/ErpLayoutBase'
import menu from './sample-data/menu'
import Posmenu from './components/Posmenu'

export default {
  name: 'AppRoot',
  components: {
    Posmenu,
    ErpLayoutBase
  },
  data () {
    return {
    }
  },
  computed: {
    menu () {
      return menu
    }
  },
  mounted () {
    console.log(this.$uloc)
  },
  methods: {
  }
}
</script>

<template>
  <div id="uloc-app">
    <u-layout>
      <ErpLayoutBase ref="erplayout"  :menu-data="menu" :default-active-menu="menu[0].id" :user="{id: 1, name: 'Tiago Felipe', image: 'https://static.tiagofelipe.com/photo.jpg'}">
        <template v-slot:posmenu>
          <posmenu />
        </template>
        <router-view />
      </ErpLayoutBase>
    </u-layout>
  </div>
</template>

<style src="./assets/style.styl" lang="stylus"></style>
