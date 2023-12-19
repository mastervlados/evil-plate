import { View, Text } from 'react-native'
import React from 'react'
import { TouchableHighlight } from 'react-native'

export default function LazyButton({buttonStyles, textStyles, text, onPressFunc}) {
  return (
    <TouchableHighlight onPress={onPressFunc ? onPressFunc : null}>
        <View style={{
            ...buttonStyles,
            height: 50,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        }}>
            <Text style={textStyles}>{text}</Text>
        </View>
    </TouchableHighlight>
  )
}