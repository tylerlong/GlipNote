import * as R from 'ramda'
import localforage from 'localforage'
import multipartMixedParser from 'multipart-mixed-parser'

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
  let r = await rc.get('/restapi/v1.0/glip/notes')
  r = await rc.get(`/restapi/v1.0/glip/notes/${r.data.records.map(item => item.id).join(',')}`)
  const notes = multipartMixedParser.parse(r.data).slice(1).filter(p => 'id' in p)
  commit('setNotes', notes)
}
