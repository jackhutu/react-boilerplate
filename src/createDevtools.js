import React from 'react'
import { render } from 'react-dom'
import DevTools from 'components/DevTools'

export default function createDevTools(store) {
  if(__DEVTOOLS__ && !window.__REDUX_DEVTOOLS_EXTENSION__){
    setTimeout(() => render(
      <DevTools store={store} />,
      window.document.body.appendChild(document.createElement('div'))
    ), 10)
  }
}
