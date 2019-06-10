import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import apps from './apps'
import local from './local'
import cart from './cart'
import products from './products'

const rootReducer = (history) => combineReducers({
  form: formReducer,
  local,
  apps,
  cart,
  products,
  router: connectRouter(history)
})

export default rootReducer

