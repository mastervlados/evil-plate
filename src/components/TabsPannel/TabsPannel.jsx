import { View, Text, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'

export default function TabsPannel({ children, isVertical = false, defaultTabStyles, activeTabStyles }) {
  
  const [activeTab, setActiveTab] = useState(children.length)

  let containerStyles = styles.horizontalContainer

  if (isVertical) {
    containerStyles = styles.verticalContainer
  }

  const tabs = children.map((child, index) => {
    return (
      <TouchableHighlight key={index} onPress={() => setActiveTab(index)}>
        <Text>{index}</Text>
      </TouchableHighlight>
    )
  })
  return (
    <View style={containerStyles}>
      {tabs}
    </View>
  )
}