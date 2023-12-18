import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import AppNavigation from './src/navigation'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}} onLayout={onLayoutRootView}>
        <StatusBar style="light" />
        <AppNavigation />
      </View>
    </TouchableWithoutFeedback>
  )
}
