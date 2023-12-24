import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import TabsPannel from '../TabsPannel'
import SmartBlock from '../../UI/SmartBlock'

export default function ColorPicker({ currentValue, setValueFunc }) {

  const tabsProps = {
    defaultTabStyles: styles.defaultStyles,
    activeTabStyles: styles.activeStyles,
  }

  const colorTabsTopRow = [
    { id: 0, name: 'color-one', },
    { id: 1, name: 'color-two', },
    { id: 2, name: 'color-three', },
  ]

  const colorTabsMiddleRow = [
    { id: 0, name: 'color-four', },
    { id: 1, name: 'color-five', },
    { id: 2, name: 'color-six', },
  ]

  const colorTabsBottomRow = [
    { id: 0, name: 'color-seven', },
    { id: 1, name: 'color-eight', },
    { id: 2, name: 'color-nine', },
  ]
 
  return (
    <View style={styles.container}>
      {/* top */}
      <TabsPannel
        {...tabsProps}
        listOfTabs={colorTabsTopRow}
        activeTab={currentValue}
        setActiveTabFunc={setValueFunc}
        ownStyles={styles.tabsRow}
      >
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemFirst}}
        />
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemSecond}}
        />
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemThird}}
        />
      </TabsPannel>
      {/* middle */}
      <TabsPannel
        {...tabsProps}
        listOfTabs={colorTabsMiddleRow}
        activeTab={currentValue}
        setActiveTabFunc={setValueFunc}
        ownStyles={styles.tabsRow}
      >
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemFourth}}
        />
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemFifth}}
        />
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemSixth}}
        />
      </TabsPannel>
      {/* bottom */}
      <TabsPannel
        {...tabsProps}
        listOfTabs={colorTabsBottomRow}
        activeTab={currentValue}
        setActiveTabFunc={setValueFunc}
        ownStyles={styles.tabsRow}
      >
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemSeventh}}
        />
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemEight}}
        />
        <SmartBlock 
            ownBoxStyles={{...styles.commonBox, ...styles.itemNinth}}
        />
      </TabsPannel>
    </View>
  )
}