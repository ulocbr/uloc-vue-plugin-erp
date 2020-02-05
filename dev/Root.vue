<script>
import 'uloc-vue/dist/fonts.css'
import 'uloc-vue/dist/uloc.styl'
import 'assets/styl/app.styl'
import ErpHeader from '../src/components/layout/default/Main'

export default {
  name: 'AppRoot',
  components: {ErpHeader},
  computed: {},
  mounted () {
    console.log(this.$uloc)
  }
}
</script>

<template>
  <div id="uloc-app">
    <u-layout>
      <u-page-container>
        <ErpHeader/>
        <router-view />
      </u-page-container>
    </u-layout>
  </div>
</template>

<style src="./assets/style.styl" lang="stylus"></style>
