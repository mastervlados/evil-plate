import { View, Text } from 'react-native'
import React from 'react'

export default function ExerciseScreen({ navigation, route }) {
  
  return (
    <View onLayout={() => navigation.setOptions({ title: route.params.title })}>
      <Text>ExerciseScreen</Text>
    </View>
  )
}