import Vue from 'vue'
import Vuex from 'vuex'
import * as R from 'ramda'
import Cookies from 'js-cookie'

import rc from '../api/ringcentral'
import router from '../router'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import { initialState } from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: initialState,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})

const rcRequest = rc.request.bind(rc)
rc.request = async (config) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log(new Date() + '\n' + JSON.stringify(config, null, 2))
    }
    const result = await rcRequest(config)
    return result
  } catch (e) {
    if (e.response && R.any(error => R.test(/\btoken\b/i, error.message), e.response.data.errors || [])) {
      try {
        await rc.refresh() // access token expired, try to refresh it
      } catch (e) {
        if (e.response && R.any(error => R.test(/\btoken\b/i, error.message), e.response.data.errors)) {
          rc.token(undefined) // refresh token expired, then token is useless
        }
        throw e
      }
      return rcRequest(config)
    }
    throw e
  }
}

let inited = false
rc.on('tokenChanged', async token => {
  if (R.isNil(token)) { // logout
    Cookies.remove('RINGCENTRAL_TOKEN')
    window.location.reload(false) // re-init all things
  } else {
    Cookies.set('RINGCENTRAL_TOKEN', token, { expires: 7 })
    setTimeout(() => {
      if (router.currentRoute.name === 'login' || router.currentRoute.name === null) {
        router.push({ name: 'root' })
      }
    }, 1000) // wait for vue-router to be ready
    if (!inited) {
      inited = true
      await store.dispatch('init', store.subscribe.bind(store))
    }
  }
})

router.afterEach((to, from) => {
  // for guests, the only available page is the login page
  if (to.name !== 'login' && R.isNil(rc.token())) {
    router.push({ name: 'login' })
  }
  // for users, the only unavailable page is the login page
  if (to.name === 'login' && !R.isNil(rc.token())) {
    router.push({ name: 'root' })
  }
})

rc.token(Cookies.getJSON('RINGCENTRAL_TOKEN'))

export default store
