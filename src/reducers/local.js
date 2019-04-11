import { 
  GET_INDEX_IMG_SUCCESS,
  GET_INDEX_IMG_FAILURE
} from 'actions/types'

import img from 'assets/images/shanghai.jpg'

const initialState = {
  indexImg: img
}

export default function(state = initialState, action) {
  switch(action.type){
    case GET_INDEX_IMG_SUCCESS:
      return Object.assign({}, initialState, { indexImg: action.indexImg})
    case GET_INDEX_IMG_FAILURE:
    default: 
      return state
  }
}