import { View, Text } from 'react-native'
import React from 'react'
import MyExercisesList from '../modules/MyExercisesList'
import { Theme } from '../styles'
import MyExercisesForm from '../modules/MyExercisesForm'

export default function MyExercisesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Theme.base, alignItems: 'center', justifyContent: 'center' }}>
      <MyExercisesForm />
      <MyExercisesList />
    </View>
  )
}