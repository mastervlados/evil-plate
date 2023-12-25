import { Text } from 'react-native'
import React, { useRef } from 'react'
import InputBox from '../../UI/InputBox'
import { styles } from './style'
import { AppFormStyles, AppTextStyles } from '../../styles'
import * as Animatable from 'react-native-animatable'
import { checkExerciseName } from '../../res/helpers/validation'

export default function ExerciseNameInput({ currentValue, setValueFunc, showMessage }) {
 
  return (
    <>
        <InputBox
            defaultStyles={AppFormStyles.styles.formDefaultTextInput}
            activeStyles={AppFormStyles.styles.formActiveTextInput}
            ownStyles={styles.textInput}
            currentValue={currentValue}
            updateValueFunc={setValueFunc}
            placeholder={'My exercise is called ..'}
        />
        { showMessage && !checkExerciseName(currentValue ? currentValue : '').status ? (
          <Animatable.View animation='fadeInLeft' duration={500}>
            <Text style={{...AppTextStyles.styles.textValidationFailing, ...styles.textValidationPosition}}>{checkExerciseName(currentValue).message}</Text>
          </Animatable.View>
        ) : null }
        
    </>
   
  )
}