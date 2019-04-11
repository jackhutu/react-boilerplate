import { 
  GET_INDEX_IMG_SUCCESS,
  GET_INDEX_IMG_FAILURE
} from 'actions/types'

import img from 'assets/images/shanghai.jpg'


export default function indexImg(state = img, action) {
  switch(action.type){
    case GET_INDEX_IMG_SUCCESS:
      return action.indexImg
    case GET_INDEX_IMG_FAILURE:
    default: 
      return state
  }
}