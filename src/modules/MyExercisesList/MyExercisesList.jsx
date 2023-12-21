import { View, FlatList } from 'react-native'
import React, { useState } from 'react'
import RoundedButton from '../../UI/RoundedButton'
import { Buttons, Theme } from '../../styles'
import { AddSvg } from '../../res/svgs'
import { styles } from './style'
import MyExercisesListItem from '../../components/MyExercisesListItem'

export default function MyExercisesList() {
  const [exercises, setExercises] = useState([
    {key: 1, title: '1 Exercise with a barbell for example', type: 'mono'},
    {key: 2, title: '2 Exercise with dumbbells for example', type: 'stereo'},
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
    {key: 16, title: '-2 Exercise with a barbell for example', type: 'mono'},
    {key: 18, title: '-1 Exercise with self body weight (last)', type: 'self'},
  ])

  
  const formatData = (data, numColumns) => {
    const formatedData = data
    let formatedDataLength = data.length
    let isCorrect = false

    while (!isCorrect) {
      if (formatedDataLength % numColumns === 0) {
        isCorrect = true
      } else {
        formatedData.push({ 
          key: `blank-${formatedDataLength}`,
          type: 'empty',
        })
        formatedDataLength += 1
      }
    }
    return formatedData
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{width: 360, alignItems: 'center'}}>
        <View style={styles.buttonPosition}>
          <RoundedButton 
            styles={Buttons.styles.success} 
            size={56}
            onPressFunc={() => console.log('pressed from the screen')}
            iconSvg={<AddSvg/>}
            iconSize={16}
            iconColor={Theme.base}
          />
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.flatListPosition}>
          <FlatList 
            data={formatData(exercises, 2)}
            style={{flex: 1}}
            numColumns={2}
            renderItem={({ item }) => <MyExercisesListItem {...item}/>}
          />
        </View>
      </View>
    </View>
  )
}