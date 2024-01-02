import { View } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './style'
import { AppContainers } from '../../styles'
import TabsPannel from '../../components/TabsPannel'
import SmartBlock from '../../UI/SmartBlock'
import AppLocalizationContext from '../../../AppLocalizationContext'
import ExerciseProgress from '../../modules/ExerciseProgress'
import ExercisePrevious from '../../modules/ExercisePrevious'
import ExerciseCurrent from '../../modules/ExerciseCurrent'

export default function ExerciseScreen({ navigation, route }) {
  
  const i18n = useContext(AppLocalizationContext)
  const [activeTabName, setActiveTabName] = useState('current')
  
  tabs = [
    { id: 0, name: 'previous'},
    { id: 1, name: 'current'},
    { id: 2, name: 'progress'},
  ]

  let activeModule;

  switch (activeTabName) {
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
      onLayout={() => navigation.setOptions({ title: route.params ?  route.params.title : 'Exercise' })}
    >
      <TabsPannel 
          listOfTabs={tabs}
          activeTab={activeTabName}
          setActiveTabFunc={setActiveTabName}
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