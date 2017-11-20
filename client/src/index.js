import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import './css/pollster.css'

import TemplateContainer from './components/TemplateContainer'
import configureStore from './store'

const Store = configureStore()

const renderApp = (Component) => {
  render(
    <Provider store={Store}>
      <Component />
    </Provider>,
    document.querySelector('#react-app'),
  )
}

renderApp(TemplateContainer)
