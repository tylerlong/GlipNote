import * as R from 'ramda'

export const getNotes = state => () => {
  return R.reverse(state.notes)
}
