import Vue from 'vue'

import store from './store'
import router from './router'

import './index.css'

const app = new Vue({
  router,
  store
})
app.$mount('#app')
