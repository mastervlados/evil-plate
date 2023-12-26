import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { styles } from './style'
import AppNavigation from '../../navigation'


export default function AppManagement() {
    // 1) We have acess to Redux
    // 2) We can decide about localization and put it to Redux
    // 3) We can prepare db and put it to Redux
    const [appIsReady, setAppIsReady] = useState(false)
  
    useEffect(() => {
      async function prepare() {
        try {
          await Font.loadAsync({
            'roboto-light': require('../../res/fonts/roboto/Roboto-Regular.ttf'),
            'roboto-regular': require('../../res/fonts/roboto/Roboto-Regular.ttf'),
            'roboto-medium': require('../../res/fonts/roboto/Roboto-Medium.ttf'),
            'roboto-bold': require('../../res/fonts/roboto/Roboto-Bold.ttf'),
            'roboto-black': require('../../res/fonts/roboto/Roboto-Black.ttf')
          });
        } catch (e) {
            console.warn(e) // ! important
        } finally {
            setAppIsReady(true)
        }
      };
  
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
            <View style={styles.container} onLayout={onLayoutRootView}>
                <StatusBar style="light" />
                <AppNavigation />
            </View>
        </TouchableWithoutFeedback>
    )
}

