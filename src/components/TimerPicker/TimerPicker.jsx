import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import TabsPannel from '../TabsPannel'
import SmartBlock from '../../UI/SmartBlock'
import { AppFormStyles } from '../../styles'

export default function TimerPicker({ setValueFunc }) {
  const [firstValue, setFirstValue] = useState(-1)
  const [secondValue, setSecondValue] = useState(1)
  const [thirdValue, setThirdValue] = useState(-1)

  const tabsProps = {
    defaultTabStyles: AppFormStyles.styles.formDefaultViewBox,
    activeTabStyles: AppFormStyles.styles.formActiveViewBox,
    defaultTextStyles: AppFormStyles.styles.formDefaultHeader,
    activeTextStyles: AppFormStyles.styles.formActiveHeader,
  }
  const firstValueController = (index) => {
    setFirstValue(index)
    setSecondValue(-1)
    setThirdValue(-1)
    switch (index) {
        case 0:
            setValueFunc(60)
            break
        case 1:
            setValueFunc(90)
            break
        case 2:
            setValueFunc(120)
            break
    }
  }
  const secondValueController = (index) => {
    setFirstValue(-1)
    setSecondValue(index)
    setThirdValue(-1)
    switch (index) {
        case 0:
            setValueFunc(150)
            break
        case 1:
            setValueFunc(180)
            break
        case 2:
            setValueFunc(210)
            break
    }
  }
  const thirdValueController = (index) => {
    setFirstValue(-1)
    setSecondValue(-1)
    setThirdValue(index)
    switch (index) {
        case 0:
            setValueFunc(240)
            break
        case 1:
            setValueFunc(270)
            break
        case 2:
            setValueFunc(300)
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
            blockText={'1 мин'}
            ownBoxStyles={{...styles.commonBox, ...styles.topLeftBox}}
        />
        <SmartBlock 
            blockText={'1 мин\n30 сек'}
            ownBoxStyles={{...styles.commonBox}}
        />
        <SmartBlock 
            blockText={'2 мин'}
            ownBoxStyles={{...styles.commonBox, ...styles.topRightBox}}
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
            blockText={'2 мин\n30 сек'}
            ownBoxStyles={{...styles.commonBox}}
        />
        <SmartBlock 
            blockText={'3 мин'}
            ownBoxStyles={{...styles.commonBox}}
        />
        <SmartBlock 
            blockText={'3 мин\n30 сек'}
            ownBoxStyles={{...styles.commonBox}}
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
            blockText={'4 мин'}
            ownBoxStyles={{...styles.commonBox, ...styles.bottomLeftBox}}
        />
        <SmartBlock 
            blockText={'4 мин\n30 сек'}
            ownBoxStyles={{...styles.commonBox}}
        />
        <SmartBlock 
            blockText={'5 мин'}
            ownBoxStyles={{...styles.commonBox, ...styles.bottomRightBox}}
        />
      </TabsPannel>
    </View>
  )
}