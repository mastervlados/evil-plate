import { View, Text, TouchableHighlight } from 'react-native'
import React, { cloneElement, useState } from 'react'
import { styles } from './style'

export default function TabsPannel({ 
  children,
  listOfTabs,
  activeTab, // hint: @name field!
  setActiveTabFunc,
  isVertical = false, 
  defaultTabStyles, 
  activeTabStyles,
  defaultTextStyles,
  activeTextStyles,
  defaultIconSize,
  activeIconSize = defaultIconSize,
  defaultIconColor,
  activeIconColor,
  ownStyles,
}) {

  let containerStyles = styles.horizontalContainer

  if (isVertical) {
    containerStyles = styles.verticalContainer
  }

  const tabs = children.map((child, index) => {
    
    let Tab = null
    const checked = listOfTabs.find((tab) => tab.name === activeTab)
    if ((typeof(checked) === 'undefined' ? -1 : checked.id) === index) {
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
        onPress={() => setActiveTabFunc(listOfTabs.find((tab) => tab.id === index).name)}
        underlayColor={'transperent'}
      >
        {Tab}
      </TouchableHighlight>
    )
  })
  return (
    <View style={{...containerStyles, ...ownStyles}}>
      {tabs}
    </View>
  )
}