import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import TabsPannel from '../TabsPannel'
import SmartBlock from '../../UI/SmartBlock'
import { AppFormStyles } from '../../styles'

export default function ColorPicker({ currentValue, setValueFunc }) {

  const firstCheckCurrentValue = (value) => {
    switch (value) {
      case 'color-one':
        return 0
      case 'color-two':
        return 1
      case 'color-three':
        return 2
      default:
        return -1
    }
  }

  const secondCheckCurrentValue = (value) => {
    switch (value) {
      case 'color-four':
        return 0
      case 'color-five':
        return 1
      case 'color-six':
        return 2
      default:
        return -1
    }
  }

  const thirdCheckCurrentValue = (value) => {
    switch (value) {
      case 'color-seven':
        return 0
      case 'color-eight':
        return 1
      case 'color-nine':
        return 2
      default:
        return -1
    }
  }

  const [firstValue, setFirstValue] = useState(firstCheckCurrentValue(currentValue))
  const [secondValue, setSecondValue] = useState(secondCheckCurrentValue(currentValue))
  const [thirdValue, setThirdValue] = useState(thirdCheckCurrentValue(currentValue))



  const tabsProps = {
    defaultTabStyles: styles.defaultStyles,
    activeTabStyles: styles.activeStyles,
  }
  const firstValueController = (index) => {
    setFirstValue(index)
    setSecondValue(-1)
    setThirdValue(-1)
    switch (index) {
        case 0:
            setValueFunc('color-one')
            break
        case 1:
            setValueFunc('color-two')
            break
        case 2:
            setValueFunc('color-three')
            break
    }
  }
  const secondValueController = (index) => {
    setFirstValue(-1)
    setSecondValue(index)
    setThirdValue(-1)
    switch (index) {
        case 0:
            setValueFunc('color-four')
            break
        case 1:
            setValueFunc('color-five')
            break
        case 2:
            setValueFunc('color-six')
            break
    }
  }
  const thirdValueController = (index) => {
    setFirstValue(-1)
    setSecondValue(-1)
    setThirdValue(index)
    switch (index) {
        case 0:
            setValueFunc('color-seven')
            break
        case 1:
            setValueFunc('color-eight')
            break
        case 2:
            setValueFunc('color-nine')
            break
    }
  }
  return (
    <View style={styles.container}>
      {/* top */}
      <TabsPannel
        {...tabsProps}
        activeTabIndex={firstValue}
        ownStyles={styles.tabsRow}
        customValueFunc={firstValueController}
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
        activeTabIndex={secondValue}
        ownStyles={styles.tabsRow}
        customValueFunc={secondValueController}
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
        activeTabIndex={thirdValue}
        ownStyles={styles.tabsRow}
        customValueFunc={thirdValueController}
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