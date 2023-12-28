import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { styles } from './style'
import AppNavigation from '../../navigation'
import AppContext from '../../../AppContext'
import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'


export default function AppManagement() {
    // 1) We have acess to Redux
    // 2) We can decide about localization and put it to Redux
    // 3) We can prepare db and put it to Redux
    const [appIsReady, setAppIsReady] = useState(false)
    const service = useContext(AppContext)

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
          console.log(await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'SQLite'))
        } catch (e) {
            console.warn(e) // ! important
        } finally {
            setAppIsReady(true)
        }
      };
      
      prepare();

    // const db = SQLite.openDatabase('evil-plate.db');
    // db.transaction(tx => {
    //   tx.executeSql(`
    //     CREATE TABLE IF NOT EXISTS exercise 
    //     (
    //       id INT AUTO_INCREMENT,
    //       exr_name VARCHAR(60) NULL DEFAULT NULL,
    //       exr_color_number VARCHAR(20) NULL DEFAULT NULL,
    //       exr_global_type VARCHAR(20) NULL DEFAULT NULL,
    //       exr_global_break_duration INT NULL DEFAULT NULL,
    //       exr_global_measure_unit VARCHAR(10) NULL DEFAULT NULL,
    //       exr_best_results JSON NULL DEFAULT NULL,
    //       exr_created DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    //       PRIMARY KEY (id)
    //     )
    //   `, null,
    //   (txObj, result) => console.log(result),
    //   (txObj, error) => console.warn(error))
    //   tx.executeSql(`
    //     CREATE TABLE IF NOT EXISTS performance 
    //     (
    //       id INT AUTO_INCREMENT,
    //       exr_id INT,
    //       per_type VARCHAR(20) NULL DEFAULT NULL,
    //       per_break_duration INT NULL DEFAULT NULL,
    //       per_measure_unit VARCHAR(10) NULL DEFAULT NULL,
    //       per_work_load JSON NULL DEFAULT NULL,
    //       per_created DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    //       is_finished TINYINT NULL DEFAULT NULL,
    //       exercise_id INT NOT NULL,
    //       PRIMARY KEY (id),
    //       FOREIGN KEY (exr_id) REFERENCES exercise (id)
    //     );
    //   `, null,
    //   (txObj, result) => console.log(result),
    //   (txObj, error) => console.warn(error))
    // })
    // console.warn('')

    // db.transaction(tx => {
    //   tx.executeSql('SELECT * FROM exercise', null,
    //   (txObj, result) => console.log(result),
    //   (txObj, error) => console.warn(error)
    //   )
    // })

    // db.transaction(tx => {
    //   tx.executeSql('SELECT * FROM performance', null,
    //   (txObj, result) => console.log(result),
    //   (txObj, error) => console.warn(error)
    //   )
    // })
    
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

