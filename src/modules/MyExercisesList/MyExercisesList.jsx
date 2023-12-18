import { View, FlatList } from 'react-native'
import React, { useState } from 'react'
import RoundedButton from '../../UI/RoundedButton'
import { Buttons, Theme } from '../../styles'
import { AddSvg } from '../../res/svgs'
import { styles } from './style'
import MyExercisesListItem from '../../components/MyExercisesListItem/MyExercisesListItem'

export default function MyExercisesList() {
  const [exercises, setExercises] = useState([
    {key: 1, title: 'Exercise with a barbell for example', type: 'mono'},
    {key: 2, title: 'Exercise with dumbbells for example', type: 'stereo'},
    {key: 3, title: 'Exercise with self body weight', type: 'self'},
    {key: 4, title: 'Exercise with a barbell for example', type: 'mono'},
    {key: 5, title: 'Exercise with dumbbells for example', type: 'stereo'},
    {key: 6, title: 'Exercise with self body weight', type: 'self'},
    {key: 7, title: 'Exercise with a barbell for example', type: 'mono'},
    {key: 8, title: 'Exercise with dumbbells for example', type: 'stereo'},
    {key: 9, title: 'Exercise with self body weight', type: 'self'},
    {key: 10, title: 'Exercise with a barbell for example', type: 'mono'},
    {key: 11, title: 'Exercise with dumbbells for example', type: 'stereo'},
    {key: 12, title: 'Exercise with self body weight', type: 'self'},
    {key: 13, title: 'Exercise with a barbell for example', type: 'mono'},
    {key: 14, title: 'Exercise with dumbbells for example', type: 'stereo'},
    {key: 15, title: 'Exercise with self body weight', type: 'self'},
    {key: 16, title: 'Exercise with a barbell for example', type: 'mono'},
    {key: 17, title: 'Exercise with dumbbells for example', type: 'stereo'},
    {key: 18, title: 'Exercise with self body weight (last)', type: 'self'},
  ])
  return (
    <View style={{ flex: 1 }}>
      <RoundedButton 
        styles={{...Buttons.styles.success, ...styles.buttonPosition}} 
        size={56}
      >
        <AddSvg size={16} fill={Theme.base}/>
      </RoundedButton>
      <View style={styles.flatListPosition}>
        <FlatList 
          data={exercises}
          renderItem={({ item }) => <MyExercisesListItem {...item}/>}
          style={{flex: 1, flexDirection: 'row'}}
        />
      </View>
    </View>
  )
}