import Vue from 'vue'
import * as R from 'ramda'

import { initialState } from './state'

export const setNotes = (state, notes) => {
  state.notes = notes
}

export const addNote = (state, note) => {
  state.notes.unshift(note)
}

export const removeNote = (state, note) => {
  const index = R.findIndex(n => n.id === note.id, state.notes)
  if (index !== -1) {
    state.notes.splice(index, 1)
  }
}

export const updateNote = (state, note) => {
  const index = R.findIndex(n => n.id === note.id, state.notes)
  Vue.set(state.notes, index, note)
}

export const loadCache = (state, cachedState) => {
  const s = initialState()
  Object.keys(s).forEach(key => {
    if (key !== 'extension' && !R.isNil(cachedState[key])) {
      state[key] = cachedState[key]
    }
  })
}

export const setExtension = (state, extension) => {
  extension.id = extension.id.toString()
  state.extension = extension
}
