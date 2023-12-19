import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function RoundedButton({ children, styles, size, onPressFunc }) {
  return (
    <TouchableOpacity onPress={onPressFunc ? onPressFunc : null}>
        <View style={{
            ...styles,
            width: size, 
            height: size,  
            borderRadius: size,
        }}>
            {children}
        </View>
    </TouchableOpacity>
  )
}