import * as R from 'ramda'
import localforage from 'localforage'

import rc from '../api/ringcentral'

export const init = async ({ dispatch, commit, state }, subscribe) => {
  await dispatch('fetchExtension')
  const cachedState = await localforage.getItem(`glip-note.${state.extension.id}`)
  if (!R.isNil(cachedState)) {
    commit('loadCache', cachedState)
  }
  subscribe((_, state) => {
    if (!R.isNil(state.extension)) {
      localforage.setItem(`glip-note.${state.extension.id}`, state)
    }
  })
  await dispatch('fetchNotes')
}

export const fetchExtension = async ({ commit }) => {
  const r = await rc.get('/restapi/v1.0/account/~/extension/~')
  commit('setExtension', r.data)
}

export const fetchNotes = async ({ commit }) => {
  const r = await rc.get('/restapi/v1.0/glip/notes')
  commit('setNotes', r.data.records)
}
