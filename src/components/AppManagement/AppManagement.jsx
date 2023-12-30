import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { styles } from './style'
import AppNavigation from '../../navigation'
import AppContext from '../../../AppContext'
import AppLocalizationContext from '../../../AppLocalizationContext'
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'
import languages from '../../res/strings/languages'
import { useDispatch, useSelector } from 'react-redux'
import { onSettingsLanguageChanged, onSettingsLocalizationsLoaded } from '../../redux/actions/appSettingsActions'


export default function AppManagement() {
    // 1) We have acess to Redux
    // 2) We can decide about localization and put it to Redux
    // 3) We can prepare db and put it to Redux
    const [appIsReady, setAppIsReady] = useState(false)
    const service = useContext(AppContext)
    const dispatch = useDispatch()
    const [localization, setLocalization] = useState(null)
    // *****************************
    // **** Localization Target ****
    // *****************************
    if (10 > 20) {
      // try to get value 
      // from user settings..
    } else if (getLocales()[0].languageCode === 'ru') {
      dispatch(onSettingsLanguageChanged('ru'))
    } else {
      dispatch(onSettingsLanguageChanged('en'))
    }

    const target = useSelector(state => state.appSettingsReducer.language)

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
          // await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/evil-plate.db')
          // await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/evil-plate.db-wal')
          // await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/evil-plate.db-shm')
          await service.initDatabase();
          // console.log(await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'SQLite'))
          // ******************************
          // **** Localization Context ****
          // ******************************
          const i18n = new I18n(languages)
          i18n.locale = target
          i18n.enableFallback = true
          setLocalization(i18n)
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
                <AppLocalizationContext.Provider value={localization}>
                  <AppNavigation />
                </AppLocalizationContext.Provider>
            </View>
        </TouchableWithoutFeedback>
    )
}

