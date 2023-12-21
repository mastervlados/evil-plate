import { Text } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../../UI/InputBox'
import { styles } from './style'
import { AppFormStyles, AppTextStyles } from '../../styles'

export default function ExerciseNameInput({exerceseName, setExerciseName}) {
  
  const reg = new RegExp('(^$)|(^[0-9a-zA-Zа-яА-Я\s]+$)')

  return (
    <>
        <InputBox
            defaultStyles={AppFormStyles.styles.formDefaultTextInput}
            activeStyles={AppFormStyles.styles.formActiveTextInput}
            ownStyles={styles.textInput}
            currentValue={exerceseName}
            updateValueFunc={setExerciseName}
        />
        {reg.test(exerceseName) ? null : <Text style={{...AppTextStyles.styles.textValidationFailing, ...styles.textValidationPosition}}>Only letters and numbers are allowed.</Text>}
    </>
   
  )
}