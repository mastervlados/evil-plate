import { View } from 'react-native'
import React, { cloneElement } from 'react'
import { TouchableOpacity } from 'react-native'

export default function RoundedButton({ 
    styles, 
    size, 
    onPressFunc,
    iconSvg,
    iconSize,
    iconColor,
}) {
  const IconSvg = cloneElement(iconSvg, { size: iconSize, fill: iconColor })
  return (
      <TouchableOpacity 
        onPress={onPressFunc ? onPressFunc : null}
        style={{ width: size, height: size, borderRadius: size }}
      >
          <View style={{
              ...styles,
              width: size, 
              height: size,  
              borderRadius: size,
          }}>
              { IconSvg }
          </View>
      </TouchableOpacity>
  )
}