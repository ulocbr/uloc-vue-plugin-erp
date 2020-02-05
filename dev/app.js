import Vue from 'vue'
import App from './Root.vue'

import {createRouter} from './router'

// this imports everything from Uloc
import Uloc, * as UlocAll from 'uloc-vue'
// import store from './store'
// import { menu } from './components/routes'
import {createIcons} from './icons'

import Plugin from 'src'

Vue.use(Uloc, {
  components: UlocAll,
  directives: UlocAll,
  plugins: UlocAll,
  config: {}
})

const router = createRouter()

Vue.use(Plugin, {
  router: router
})

console.log('Plugin: ', Plugin) //

createIcons()

export function createApp () {
  const app = {
    router,
    // store,
    render: h => h(App)
  }

  return {
    app: new Vue(app),
    router
  }
}
