import { View, Text } from 'react-native'
import React from 'react'
import MyExercisesList from '../modules/MyExercisesList'
import { Theme } from '../styles'

export default function MyExercisesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Theme.base }}>
      <MyExercisesList />
    </View>
  )
}