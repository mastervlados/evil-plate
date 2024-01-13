import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './style'
import { useDispatch, useSelector } from 'react-redux'
import InputBox from '../../UI/InputBox'
import { onPerformanceSetRowFieldChanged } from '../../redux/actions/exerciseActions'
import { updateStoredSetRowFieldWithinExercise } from '../../res/helpers/secureStore'
import { Theme } from '../../styles'
import CheckBox from '../../UI/CheckBox'
import SkullSvg from '../../res/svgs/SkullSvg'
import { checkForInteger, checkForReal } from '../../res/helpers/validation'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { endingFor } from '../../res/helpers/endings'


export default function SetItem({ exerciseID, setIndex, rowIndex, row }) {

    const locale = useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)
    // !important
    // if we change app unit
    // via settings screen
    // it keeps its own value
    const performanceUnit = useSelector(state => state.exerciseReducer.performance.measureUnit)

    const [weight, setWeight] = useState(row.weight)
    const [reps, setReps] = useState(row.reps)
    const dispatch = useDispatch()

    const defaultPlaceholderForWeight = endingFor(10, performanceUnit, locale)

    return (
        <View key={`${setIndex}-${rowIndex}`} style={styles.rowContentItem}>
            <InputBox
                setInputMode={'numeric'}
                activeStyles={styles.inputActiveStyles}
                defaultStyles={styles.inputDefaultStyles}
                updateValueFunc={(text) => checkForReal(text, setWeight)}
                onBlurFunc={async () => {
                    const args = [setIndex, rowIndex, 'weight', weight]
                    dispatch(onPerformanceSetRowFieldChanged(...args))
                    updateStoredSetRowFieldWithinExercise(exerciseID, ...args)
                }}
                currentValue={weight}
                placeholder={defaultPlaceholderForWeight}
                placeholderColor={Theme.levelOne}
            />
            <InputBox
                setInputMode={'numeric'}
                activeStyles={styles.inputActiveStyles}
                defaultStyles={styles.inputDefaultStyles}
                updateValueFunc={(text) => checkForInteger(text, setReps)}
                onBlurFunc={async () => {
                    const args = [setIndex, rowIndex, 'reps', reps]
                    dispatch(onPerformanceSetRowFieldChanged(...args))
                    updateStoredSetRowFieldWithinExercise(exerciseID, ...args)
                }}
                currentValue={reps}
                placeholder={i18n.t('es0015').toLowerCase()}
                placeholderColor={Theme.levelOne}
            />
            <CheckBox
                valueFunc={async () => {
                    const args = [setIndex, rowIndex, 'isLethal']
                    dispatch(onPerformanceSetRowFieldChanged(...args))
                    updateStoredSetRowFieldWithinExercise(exerciseID, ...args)
                }}
                isChecked={row.isLethal}
                checkedStyles={styles.checkboxActiveStyles}
                defaultStyles={styles.checkboxDefaultStyles}
                iconSvg={<SkullSvg/>}
                iconSize={38}
                iconDefaultColor={Theme.levelOne}
                iconCheckedColor={Theme.textCommon}
                previousCheckedColor={Theme.relaxing}
            />
        </View>
    )
}