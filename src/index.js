import React from 'react'
import { render } from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import {Provider} from 'react-redux'
import configureStore, { history } from './store/configureStore'
import createDevTools from './createDevtools'
import routes from './routes'
import 'assets/styles/index.css'

const store = configureStore()
createDevTools(store)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)