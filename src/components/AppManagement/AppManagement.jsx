import { View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
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
import { onSettingsHintExercisesFormChanged, onSettingsLanguageChanged, onSettingsLocalizationsLoaded, onSettingsUnitsChanged } from '../../redux/actions/appSettingsActions'
import { deleteValueFor, getValueFor, saveValueAs } from '../../res/helpers/secureStore'
import InputSelfWeightModal from '../InputSelfWeightModal'
import MyExercisesForm from '../../modules/MyExercisesForm'


export default function AppManagement() {
    // 1) We have acess to Redux
    // 2) We can decide about localization and put it to Redux
    // 3) We can prepare db and put it to Redux
    const [appIsReady, setAppIsReady] = useState(false)
    const service = useContext(AppContext)
    const i18n = useContext(AppLocalizationContext)
    const dispatch = useDispatch()
    const target = useSelector(state => state.appSettingsReducer)
    // *****************************
    // **** Localization Target ****
    // *****************************
    useEffect(() => {
      async function setupLanguage() {
        const localeFromStore = await getValueFor('storedLanguage')
        if (localeFromStore !== -1) {
          // try to get value 
          // from user settings..
          if (localeFromStore !== target.language) {
            dispatch(onSettingsLanguageChanged(localeFromStore))
            i18n.locale = localeFromStore
          }
        } else if (getLocales()[0].languageCode === 'ru') {
          if (target.language !== 'ru') {
            dispatch(onSettingsLanguageChanged('ru'))
            i18n.locale = 'ru'
          }
        } else {
          if (target.language !== 'en') {
            dispatch(onSettingsLanguageChanged('en'))
            i18n.locale = 'en'
          }
        }
      }
      async function setupUnitSystem() {
        const unitSystemFromStore = await getValueFor('storedUnitSystem')
        // await deleteValueFor('storedUnitSystem')
        if (unitSystemFromStore != -1) {
          if (target.unitsFromSettings !== unitSystemFromStore) {
            dispatch(onSettingsUnitsChanged(unitSystemFromStore))
          }
        } else if (unitSystemFromStore === -1 
          && getLocales()[0].languageCode !== 'ru') {
          // we have to ask a champion about
          // which one unit system should apply
          Alert.alert(
            i18n.t('alert5001'),
            i18n.t('alert5002'),
            [
                {
                    text: i18n.t('ass0004'),
                    onPress: async () => {
                      // Kilograms (kgs)
                      if (target.unitsFromSettings !== 'kg') {
                        dispatch(onSettingsUnitsChanged('kg'))
                      }
                      await saveValueAs('storedUnitSystem', 'kg')
                    },
                },
                {
                  text: i18n.t('ass0005'),
                  onPress: async () => {
                     // Pounds (lbs)
                     if (target.unitsFromSettings !== 'lb') {
                      dispatch(onSettingsUnitsChanged('lb'))
                    }
                    await saveValueAs('storedUnitSystem', 'lb')
                  },
                }
            ]
        )
        }
      }
      setupLanguage();
      setupUnitSystem();
    }, [])

    useEffect(() => {
      async function prepare() {
        try {
          await Font.loadAsync({
            'roboto-thin': require('../../res/fonts/roboto/Roboto-Thin.ttf'),
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
          // **********************
          // **** Hints places ****
          // **********************
          if (await getValueFor('storedShowHintInMyExercisesForm') !== -1) {
            dispatch(onSettingsHintExercisesFormChanged(false))
          }
        } catch (e) {
            // console.warn(e) // ! important
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
                <StatusBar style="light"/>
                <InputSelfWeightModal/>
                <MyExercisesForm/>
                <AppNavigation />
            </View>
        </TouchableWithoutFeedback>
    )
}

