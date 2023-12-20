import { View, Text, TouchableHighlight } from 'react-native'
import React, { cloneElement, useState } from 'react'
import { styles } from './style'

export default function TabsPannel({ 
  children, 
  activeTabIndex = -1,
  isVertical = false, 
  defaultTabStyles, 
  activeTabStyles,
  defaultTextStyles,
  activeTextStyles,
  defaultIconSize,
  activeIconSize = defaultIconSize,
  defaultIconColor,
  activeIconColor,
}) {
  
  const [activeTab, setActiveTab] = useState(activeTabIndex)

  let containerStyles = styles.horizontalContainer

  if (isVertical) {
    containerStyles = styles.verticalContainer
  }

  const tabs = children.map((child, index) => {
    
    let Tab = null
    if (activeTab === index) {
      Tab = cloneElement(child, { 
        iconSize: activeIconSize,
        iconColor: activeIconColor,
        boxStyles: activeTabStyles,
        blockTextStyles: activeTextStyles,
       })
    } else {
      Tab = cloneElement(child, {
        iconSize: defaultIconSize,
        iconColor: defaultIconColor,
        boxStyles: defaultTabStyles,
        blockTextStyles: defaultTextStyles,
       })
    }

    return (
      <TouchableHighlight 
        key={index} 
        onPress={() => setActiveTab(index)}
        underlayColor={'transperent'}
      >
        {Tab}
      </TouchableHighlight>
    )
  })
  return (
    <View style={containerStyles}>
      {tabs}
    </View>
  )
}