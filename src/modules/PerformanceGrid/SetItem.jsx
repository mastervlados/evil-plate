import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './style'
import { useDispatch, useSelector } from 'react-redux'
import InputBox from '../../UI/InputBox'
import { onPerformanceFieldInFlowChanged, onPerformanceSetRowFieldChanged } from '../../redux/actions/exerciseActions'
import { updateStoredSetRowFieldWithinExercise } from '../../res/helpers/secureStore'
import { Theme } from '../../styles'
import CheckBox from '../../UI/CheckBox'
import SkullSvg from '../../res/svgs/SkullSvg'
import { checkForInteger, checkForReal } from '../../res/helpers/validation'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { endingFor } from '../../res/helpers/endings'
import { translateValue } from '../../res/helpers/converter'


export default function SetItem({ exerciseID, setIndex, rowIndex, row, position }) {

    const locale = useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)
    const previousSets = useSelector(state => state.exerciseReducer.previousPerformance.workload.sets)
    // !important
    // if we change app unit
    // via settings screen
    // it keeps its own value
    const performanceUnit = useSelector(state => state.exerciseReducer.performance.measureUnit)
    const previousPerformanceUnit = useSelector(state => state.exerciseReducer.previousPerformance.measureUnit)
    const applyPreviousUnits = previousPerformanceUnit ? previousPerformanceUnit : performanceUnit

    const [weight, setWeight] = useState(row.weight)
    const [reps, setReps] = useState(row.reps)
    const dispatch = useDispatch()
// console.log(rowIndex, setIndex)
    const updateRowTonnage = () => {
        try {
            const args = [setIndex, rowIndex]
            if (weight !== '' && reps !== '') {
                const rowTonnage = Number(weight) * Number(reps)
                dispatch(onPerformanceSetRowFieldChanged(...args, rowTonnage))
                dispatch(onPerformanceFieldInFlowChanged(...args, rowTonnage))
            } else {
                dispatch(onPerformanceSetRowFieldChanged(...args))
                dispatch(onPerformanceFieldInFlowChanged(...args))
            }
        } catch (e) {
            console.warn(e)
        }
    }

    const definePlaceholder = (field, whenever, isBool = false) => {
        try {
            const value = previousSets[position - 1].rows[rowIndex][field]
            if (isBool) {
                return value
            } else if (field === 'weight') {
                return translateValue(value, applyPreviousUnits, performanceUnit) + ''
            }
            return value + ''
        } catch (e) {

        }
        return whenever
    }
    
    const weightPlaceholder = definePlaceholder('weight', endingFor(10, performanceUnit, locale))
    const repsPlaceholder = definePlaceholder('reps', i18n.t('es0015').toLowerCase())
    const isLethalWasChecked = definePlaceholder('isLethal', false, true)

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
                    updateRowTonnage()
                    updateStoredSetRowFieldWithinExercise(exerciseID, ...args)
                }}
                currentValue={weight}
                placeholder={weightPlaceholder}
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
                    updateRowTonnage()
                    updateStoredSetRowFieldWithinExercise(exerciseID, ...args)
                }}
                currentValue={reps}
                placeholder={repsPlaceholder}
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
                previousWasChecked={isLethalWasChecked}
                iconDefaultColor={Theme.levelOne}
                iconCheckedColor={Theme.textCommon}
                previousCheckedColor={Theme.relaxing}
            />
        </View>
    )
}