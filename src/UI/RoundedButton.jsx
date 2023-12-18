import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function RoundedButton({ children, styles, size, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
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