import { View } from 'react-native'
import React, { cloneElement } from 'react'
import { TouchableOpacity } from 'react-native'
import { Theme } from '../styles'

export default function PrimaryButton({ 
    styles, 
    vheight,
    vwidth,
    brRadiusSize, 
    onPressFunc,
    iconSvg,
    iconSize,
    iconColor,
    isDisable = false,
    disableStyles,
}) {
  const IconSvg = cloneElement(iconSvg, { size: iconSize, fill: isDisable ? Theme.itemMono : iconColor })

  if (isDisable) {
    return (
        <View style={{
            ...disableStyles,
            width: vwidth, 
            height: vheight,  
            borderRadius: brRadiusSize,
        }}>
            { IconSvg }
        </View>
    )
  }

  return (
      <TouchableOpacity 
        onPress={onPressFunc ? onPressFunc : null} 
        style={{width: vwidth}}
      >
          <View style={{
              ...styles,
              width: vwidth, 
              height: vheight,  
              borderRadius: brRadiusSize,
          }}>
              { IconSvg }
          </View>
      </TouchableOpacity>
  )
}