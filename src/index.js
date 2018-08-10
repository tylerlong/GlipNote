import Vue from 'vue'
import iView from 'iview'

import store from './store'
import router from './router'

import 'iview/dist/styles/iview.css'
import './index.css'

Vue.use(iView)

const app = new Vue({
  router,
  store
})
app.$mount('#app')
