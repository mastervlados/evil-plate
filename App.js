import React from 'react'
import { Provider } from 'react-redux'
import store from './src/redux'
import AppService from './src/services/AppService'
import AppContext from './AppContext'
import AppManagement from './src/components/AppManagement'

export default function App() {

  const appService = new AppService()

  return (
    <Provider store={store}>
      <AppContext.Provider value={appService}>
        <AppManagement/>
      </AppContext.Provider>
    </Provider>
  )
}
