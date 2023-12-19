import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'
import { AppTextStyles } from '../../styles'
import { TouchableHighlight } from 'react-native'

export default function MyExercisesListItem({ title, type }) {
  
  let boxStyles = styles.itemBox

  switch (type) {
    case 'stereo':
      boxStyles = {...boxStyles, ...styles.itemStereo}
      break
    case 'self':
      boxStyles = {...boxStyles, ...styles.itemSelf}
      break
    case 'mono':
      boxStyles = {...boxStyles, ...styles.itemMono}
      break
    default:
      boxStyles = {...boxStyles, ...styles.itemInvisible}
      break
  }

  if (type === 'empty') {
    return (
      <View style={styles.container}>
        <View style={boxStyles}></View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={() => console.log({type})}>
        <View style={boxStyles}>
          <Text style={AppTextStyles.styles.textCommon}>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}