import { createStore,compose,applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import {persistState} from 'redux-devtools'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'api/promiseMiddleware'
import DevTools from 'components/DevTools'
import rootReducer from 'reducers'
import { createBrowserHistory } from 'history'

export const sagaMiddleware = createSagaMiddleware()
export const history = createBrowserHistory()
export default function configureStore(initialState) {

  const middleware = [ sagaMiddleware, promiseMiddleware, routerMiddleware(history) ]
  if(__DEVLOGGER__){
    middleware.push(createLogger())
  }
  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : __DEVTOOLS__?DevTools.instrument():f => f,
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )

  const store = finalCreateStore(createStore)(rootReducer(history), initialState)

  // Hot reloading
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer(history))
    })
  }

  return store
}
