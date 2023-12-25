import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import AppNavigation from './src/navigation'
import { Theme } from './src/styles'
import { Provider } from 'react-redux'
import store from './src/redux'
import DummyAppService from './src/services/DummyAppService'
import AppContext from './AppContext'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const appService = new DummyAppService()

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'roboto-light': require('./src/res/fonts/roboto/Roboto-Light.ttf'),
          'roboto-regular': require('./src/res/fonts/roboto/Roboto-Regular.ttf'),
          'roboto-medium': require('./src/res/fonts/roboto/Roboto-Medium.ttf'),
          'roboto-bold': require('./src/res/fonts/roboto/Roboto-Bold.ttf'),
          'roboto-black': require('./src/res/fonts/roboto/Roboto-Black.ttf')
        });
      } catch (e) {
        console.warn(e) // ! important
      } finally {
        setAppIsReady(true)
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null
  }

  return (
    <Provider store={store}>
      <AppContext.Provider value={appService}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View 
            style={{ flex: 1, backgroundColor: Theme.base }} 
            onLayout={onLayoutRootView}
          >
            <StatusBar style="light" />
            <AppNavigation />
          </View>
        </TouchableWithoutFeedback>
      </AppContext.Provider>
    </Provider>
  )
}
