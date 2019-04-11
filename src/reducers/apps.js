import { GET_APPS_SUCCESS,GET_APPS_FAILURE } from 'actions/types'

const initialState = []

export default function todos(state = initialState, action) {
  switch (action.type) {
    case GET_APPS_FAILURE:
      return state

    case GET_APPS_SUCCESS:
      return action.json.data
    default:
      return state
  }
}
