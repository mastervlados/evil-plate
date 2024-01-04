import { View } from 'react-native'
import React, { cloneElement } from 'react'
import { TouchableOpacity } from 'react-native'

export default function PrimaryButton({ 
    styles, 
    vheight,
    vwidth,
    brRadiusSize, 
    onPressFunc,
    iconSvg,
    iconSize,
    iconColor,
}) {
  const IconSvg = cloneElement(iconSvg, { size: iconSize, fill: iconColor })
  return (
      <TouchableOpacity onPress={onPressFunc ? onPressFunc : null}>
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