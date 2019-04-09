import { 
  GET_INDEX_IMG_SUCCESS,
  GET_INDEX_IMG_FAILURE
} from 'actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import img from 'assets/images/shanghai.jpg'

export default createReducer(fromJS({
  indexImg:'',
}), {
  [GET_INDEX_IMG_SUCCESS]: (state, {json}) => state.set('indexImg',json.img),
  [GET_INDEX_IMG_FAILURE]: (state, {json}) => state.set('indexImg',img)
})