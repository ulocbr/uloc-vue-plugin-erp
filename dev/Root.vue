<script>
import 'uloc-vue/dist/fonts.css'
import 'uloc-vue/dist/uloc.styl'
import 'assets/styl/app.styl'
import 'assets/styl/icons.styl'
import ErpLayoutBase from '../src/components/layout/ErpLayoutBase'
import menu from './sample-data/menu'

export default {
  name: 'AppRoot',
  components: {
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
      <ErpLayoutBase :menu-data="menu" :user="{id: 1, name: 'Tiago Felipe', image: 'https://static.tiagofelipe.com/photo.jpg'}">
        <router-view />
      </ErpLayoutBase>
    </u-layout>
  </div>
</template>

<style src="./assets/style.styl" lang="stylus"></style>
