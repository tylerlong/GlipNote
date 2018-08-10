import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../components/App.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/glip/', name: 'root', component: App },
  { path: '/login/', name: 'login', component: Login }
]
const router = new VueRouter({ routes })

export default router
