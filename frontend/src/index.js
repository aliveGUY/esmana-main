import { Provider } from 'react-redux'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { ThemeProvider } from '@mui/material/styles'

import store from './state/store'
import routing from './routing'
import theme from './theme'

import './static/styles/index.scss'

import './i18n'

const Routing = () => useRoutes(routing)
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </LocalizationProvider>
  </GoogleOAuthProvider>,
)
