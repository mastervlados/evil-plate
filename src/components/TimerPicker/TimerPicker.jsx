import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './style'
import TabsPannel from '../TabsPannel'
import SmartBlock from '../../UI/SmartBlock'
import { AppFormStyles } from '../../styles'
import AppLocalizationContext from '../../../AppLocalizationContext'

export default function TimerPicker({ currentValue, setValueFunc }) {

  const i18n = useContext(AppLocalizationContext)

  const tabsProps = {
    defaultTabStyles: AppFormStyles.styles.formDefaultViewBox,
    activeTabStyles: AppFormStyles.styles.formActiveViewBox,
    defaultTextStyles: {...AppFormStyles.styles.formDefaultHeader, textAlign: 'center'},
    activeTextStyles: {...AppFormStyles.styles.formActiveHeader, textAlign: 'center'},
  }

  const timerTabsTopRow = [
    { id: 0, name: 60, },
    { id: 1, name: 90, },
    { id: 2, name: 120, },
  ]

  const timerTabsMiddleRow = [
    { id: 0, name: 150, },
    { id: 1, name: 180, },
    { id: 2, name: 210, },
  ]

  const timerTabsBottomRow = [
    { id: 0, name: 240, },
    { id: 1, name: 270, },
    { id: 2, name: 300, },
  ]

  return (
    <View style={styles.container}>
      {/* top */}
      <TabsPannel
        {...tabsProps}
        listOfTabs={timerTabsTopRow}
        activeTab={currentValue}
        setActiveTabFunc={setValueFunc}
        ownStyles={styles.tabsRow}
      >
        <SmartBlock 
            blockText={i18n.t('tpc0001')}
            ownBoxStyles={{...styles.commonBox, ...styles.topLeftBox}}
        />
        <SmartBlock 
            blockText={i18n.t('tpc0002')}
            ownBoxStyles={{...styles.commonBox}}
        />
        <SmartBlock 
            blockText={i18n.t('tpc0003')}
            ownBoxStyles={{...styles.commonBox, ...styles.topRightBox}}
        />
      </TabsPannel>
      {/* middle */}
      <TabsPannel
        {...tabsProps}
        listOfTabs={timerTabsMiddleRow}
        activeTab={currentValue}
        setActiveTabFunc={setValueFunc}
        ownStyles={styles.tabsRow}
      >
        <SmartBlock 
            blockText={i18n.t('tpc0004')}
            ownBoxStyles={{...styles.commonBox}}
        />
        <SmartBlock 
            blockText={i18n.t('tpc0005')}
            ownBoxStyles={{...styles.commonBox}}
        />
        <SmartBlock 
            blockText={i18n.t('tpc0006')}
            ownBoxStyles={{...styles.commonBox}}
        />
      </TabsPannel>
      {/* bottom */}
      <TabsPannel
        {...tabsProps}
        listOfTabs={timerTabsBottomRow}
        activeTab={currentValue}
        setActiveTabFunc={setValueFunc}
        ownStyles={styles.tabsRow}
      >
        <SmartBlock 
            blockText={i18n.t('tpc0007')}
            ownBoxStyles={{...styles.commonBox, ...styles.bottomLeftBox}}
        />
        <SmartBlock 
            blockText={i18n.t('tpc0008')}
            ownBoxStyles={{...styles.commonBox}}
        />
        <SmartBlock 
            blockText={i18n.t('tpc0009')}
            ownBoxStyles={{...styles.commonBox, ...styles.bottomRightBox}}
        />
      </TabsPannel>
    </View>
  )
}