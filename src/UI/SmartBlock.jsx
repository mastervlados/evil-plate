import { View, Text } from 'react-native'
import React, { cloneElement } from 'react'

export default function SmartBlock({ 
    iconSvg,
    iconSize,
    iconColor,
    boxStyles,
    ownBoxStyles,
    blockText,
    blockTextStyles,
}) {
  const IconSvg = iconSvg ? cloneElement(iconSvg, { size: iconSize, fill: iconColor }) : null
  return (
    <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center',
            ...boxStyles,
            ...ownBoxStyles,
        }}>
      { IconSvg }
      {blockText ? <Text style={blockTextStyles}>{blockText}</Text> : null}
    </View>
  )
}