import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

routes.push({path: '/*', component: () => import('../components/Error404.vue')})

Vue.use(VueRouter)

export function createRouter () {
  return new VueRouter({
    // mode: 'history',
    routes
  })
}
