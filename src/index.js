import React from 'react'
import { render } from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { ConnectedRouter } from 'connected-react-router'
import {Provider} from 'react-redux'
import configureStore, { history, sagaMiddleware } from './store/configureStore'
import createDevTools from './createDevtools'
import routes from './routes'
import 'assets/styles/index.less'
import rootSaga from './sagas'

const store = configureStore()
createDevTools(store)
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)