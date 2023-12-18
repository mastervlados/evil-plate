import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'
import { AppTextStyles } from '../../styles'

export default function MyExercisesListItem({ title, type }) {
  
  let boxStyles = styles.itemBox

  switch (type) {
    case 'stereo':
      boxStyles = {...boxStyles, ...styles.itemStereo}
      break
    case 'self':
      boxStyles = {...boxStyles, ...styles.itemSelf}
      break
    default:
      boxStyles = {...boxStyles, ...styles.itemMono}
      break
  }

  return (
    <View style={boxStyles}>
      <Text style={AppTextStyles.styles.textCommon}>{title}</Text>
    </View>
  )
}