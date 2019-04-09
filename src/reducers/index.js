import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import apps from './apps'
import showmsg from './showmsg'
import local from './local'

const rootReducer = combineReducers({
  local,
  apps,
  showmsg,
  router: routerReducer,
  form: formReducer
})

export default rootReducer
