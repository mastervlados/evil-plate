import { Text } from 'react-native'
import React, { useRef } from 'react'
import InputBox from '../../UI/InputBox'
import { styles } from './style'
import { AppFormStyles, AppTextStyles, Theme } from '../../styles'
import * as Animatable from 'react-native-animatable'
import { checkExerciseName } from '../../res/helpers/validation'

export default function ExerciseNameInput({ currentValue, setValueFunc, showMessage, messageLocale, placeholderText }) {
 
  return (
    <>
        <InputBox
            defaultStyles={AppFormStyles.styles.formDefaultTextInput}
            activeStyles={AppFormStyles.styles.formActiveTextInput}
            ownStyles={styles.textInput}
            currentValue={currentValue}
            updateValueFunc={setValueFunc}
            placeholder={placeholderText}
            placeholderColor={Theme.relaxing}
        />
        { showMessage && !checkExerciseName(currentValue).status ? (
          <Animatable.View animation='fadeInLeft' duration={500}>
            <Text style={{...AppTextStyles.styles.textValidationFailing, ...styles.textValidationPosition}}>{checkExerciseName(currentValue, messageLocale).message}</Text>
          </Animatable.View>
        ) : null }
        
    </>
   
  )
}