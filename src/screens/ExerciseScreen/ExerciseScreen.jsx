import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { AppContainers } from '../../styles'
import TabsPannel from '../../components/TabsPannel'
import SmartBlock from '../../UI/SmartBlock'
import AppLocalizationContext from '../../../AppLocalizationContext'
import ExerciseProgress from '../../modules/ExerciseProgress'
import ExercisePrevious from '../../modules/ExercisePrevious'
import ExerciseCurrent from '../../modules/ExerciseCurrent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { onActiveTabChanged } from '../../redux/actions/exerciseActions'


export default function ExerciseScreen() {
  
  const exercise = useSelector(state => state.exerciseReducer.exercise)
  const navigation = useNavigation()
  const i18n = useContext(AppLocalizationContext)
  const activeTab = useSelector(state => state.exerciseReducer.activeTab)
  const dispatch = useDispatch()

  useEffect(() => {
    navigation.setOptions({ title: exercise.title })
  }, []) // ! componentDidMount behavior (once)

  tabs = [
    { id: 0, name: 'previous'},
    { id: 1, name: 'current'},
    { id: 2, name: 'progress'},
  ]

  let activeModule;

  switch (activeTab) {
    case 'previous':
      activeModule = <ExercisePrevious/>
      break
    case 'current':
      activeModule = <ExerciseCurrent/>
      break
    case 'progress':
      activeModule = <ExerciseProgress/>
      break
  }

  return (
    <View 
      style={AppContainers.styles.appContainerWithoutVerticalCentred}
    >
      <TabsPannel 
          listOfTabs={tabs}
          activeTab={activeTab}
          setActiveTabFunc={(tabName) => dispatch(onActiveTabChanged(tabName))}
          defaultTabStyles={styles.defaultTab}
          activeTabStyles={{ ...styles.defaultTab, ...styles.activeTab }}
          defaultTextStyles={styles.defaultTabText}
          activeTextStyles={styles.activeTabText}
      >
          <SmartBlock 
            blockText={i18n.t('es0001')}  
          />
          <SmartBlock 
            blockText={i18n.t('es0002')}
          />
          <SmartBlock 
            blockText={i18n.t('es0003')} 
          />
      </TabsPannel>
      { activeModule }
    </View>
  )
}