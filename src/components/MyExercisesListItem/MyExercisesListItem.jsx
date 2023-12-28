import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'
import { AppTextStyles, Theme } from '../../styles'
import { TouchableHighlight } from 'react-native'

export default function MyExercisesListItem({ id, title, type, colorNumber }) {
  
  let boxStyles = styles.itemBox

  const getBorderColorByNumber = (colorNumber) => {
    switch (colorNumber) {
      case 'color-one':
        return Theme.itemFirst
      case 'color-two':
        return Theme.itemSecond
      case 'color-three':
        return Theme.itemThird
      case 'color-four':
        return Theme.itemFourth
      case 'color-five':
        return Theme.itemFifth
      case 'color-six':
        return Theme.itemSixth
      case 'color-seven':
        return Theme.itemSeventh
      case 'color-eight':
        return Theme.itemEight
      case 'color-nine':
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
      <TouchableHighlight onPress={() => console.log(id)}>
        <View style={boxStyles}>
          <Text style={AppTextStyles.styles.textCommon}>{title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}