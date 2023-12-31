import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './src/redux'
import AppService from './src/services/AppService'
import AppContext from './AppContext'
import AppLocalizationContext from './AppLocalizationContext'
import AppManagement from './src/components/AppManagement'
import { I18n } from 'i18n-js'
import languages from './src/res/strings/languages'

export default function App() {

  const appService = new AppService()

  const i18n = new I18n(languages)
  i18n.locale = 'en' // Default
  i18n.enableFallback = true

  return (
    <Provider store={store}>
      <AppContext.Provider value={appService}>
        <AppLocalizationContext.Provider value={i18n}>
          <AppManagement/>
        </AppLocalizationContext.Provider>
      </AppContext.Provider>
    </Provider>
  )
}
