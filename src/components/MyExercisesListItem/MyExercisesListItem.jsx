import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'
import { AppTextStyles, Theme } from '../../styles'
import { TouchableHighlight } from 'react-native'

export default function MyExercisesListItem({ title, type, colorNumber }) {
  
  let boxStyles = styles.itemBox

  const getBorderColorByNumber = (colorNumber) => {
    switch (colorNumber) {
      case 1:
        return Theme.itemFirst
      case 2:
        return Theme.itemSecond
      case 3:
        return Theme.itemThird
      case 4:
        return Theme.itemFourth
      case 5:
        return Theme.itemFifth
      case 6:
        return Theme.itemSixth
      case 7:
        return Theme.itemSeventh
      case 8:
        return Theme.itemEight
      case 9:
        return Theme.itemNinth
    }
  }

  switch (type) {
    case 'stereo':
      boxStyles = {...boxStyles, borderColor: getBorderColorByNumber(colorNumber)}
      break
    case 'self':
      boxStyles = {...boxStyles, borderColor: getBorderColorByNumber(colorNumber)}
      break
    case 'mono':
      boxStyles = {...boxStyles, borderColor: getBorderColorByNumber(colorNumber)}
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