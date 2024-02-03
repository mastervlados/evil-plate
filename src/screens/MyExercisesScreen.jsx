import { View, Text } from 'react-native'
import React from 'react'
import MyExercisesList from '../modules/MyExercisesList'
import { styles } from '../styles/generalStyles/screens'


export default function MyExercisesScreen() {
  return (
    <View style={styles.appContainer}>
      <MyExercisesList />
    </View>
  )
}