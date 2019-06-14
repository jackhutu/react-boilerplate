import { combineReducers } from 'redux'
import { 
  GET_IMG_SUCCESS,
  GET_IMG_FAILURE,
  GET_IMG_REQUEST
} from 'actions/types'
import img from 'assets/images/shanghai.jpg'


function indexImg(state = {
  loading: false,
  value: ''
}, action) {
  switch(action.type){
    case GET_IMG_REQUEST:
      return {
        ...state,
        loading:true,
      }
    case GET_IMG_SUCCESS:
      return {
        ...state,
        loading:false,
        value: action.img.data || img
      }
    case GET_IMG_FAILURE:
      return {
        ...state,
        loading:false,
        value: img
      }
    default: 
      return state
  }
}

export default combineReducers({
  indexImg,
})