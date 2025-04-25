import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { ThemeProvider } from '@mui/material/styles'

import store from './state/store'
import routing from './routing'
import theme from './theme'

import './static/styles/index.scss'

import './i18n'

const Routing = () => useRoutes(routing)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </LocalizationProvider>,
)
