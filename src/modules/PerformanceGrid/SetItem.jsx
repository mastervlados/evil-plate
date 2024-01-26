import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { useDispatch, useSelector } from 'react-redux'
import InputBox from '../../UI/InputBox'
import { onPerformanceFieldInFlowChanged, onPerformanceSetRowFieldChanged } from '../../redux/actions/exerciseActions'
import { updateFieldInSetRowWithinStoredPerformance, updateFieldInStoredOpenPerformance, updateStoredSetRowFieldWithinExercise } from '../../res/helpers/secureStore'
import { Theme } from '../../styles'
import CheckBox from '../../UI/CheckBox'
import SkullSvg from '../../res/svgs/SkullSvg'
import { checkForInteger, checkForReal, completeRealNumber } from '../../res/helpers/validation'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { endingFor } from '../../res/helpers/endings'
import { translateValue } from '../../res/helpers/converter'
import { RedoSvg } from '../../res/svgs'
import { onWeightedFieldChanged } from '../../redux/actions/selfWeightActions'


export default function SetItem({ exerciseID, setIndex, rowIndex, row, position }) {

    const locale = useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)
    const dispatch = useDispatch()
    const previousPerformance = useSelector(state => state.exerciseReducer.previousPerformance)
    // !important
    // if we change app unit
    // via settings screen
    // it keeps its own value
    const performance = useSelector(state => state.exerciseReducer.performance)
    // check for previous units
    // might be different and
    // we should verify it before
    const applyPreviousUnits = previousPerformance.measureUnit || performance.measureUnit
    const [isButtonPressed, setButtonPressed] = useState(false)
    const [weight, setWeight] = useState(row.weight)
    const [reps, setReps] = useState(row.reps)
    if (!('workload' in performance)) { return }
    
    useEffect(() => {
        if (performance.type === 'self') {
            if (weight != row.weight) {
                setWeight(row.weight)
            }
        }
    }, [performance])

    useEffect(() => {
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
            // console.log('Effect!')
        } catch (e) {
            console.warn(e)
        }
    }, [weight, reps])
   
    // console.log(rowIndex, setIndex)
    // const updateRowTonnage = () => {
    //     try {
    //         const args = [setIndex, rowIndex]
    //         if (weight !== '' && reps !== '') {
    //             const rowTonnage = Number(weight) * Number(reps)
    //             dispatch(onPerformanceSetRowFieldChanged(...args, rowTonnage))
    //             dispatch(onPerformanceFieldInFlowChanged(...args, rowTonnage))
    //         } else {
    //             dispatch(onPerformanceSetRowFieldChanged(...args))
    //             dispatch(onPerformanceFieldInFlowChanged(...args))
    //         }
    //     } catch (e) {
    //         console.warn(e)
    //     }
    // }

    const definePlaceholder = (field, whenever, isBool = false) => {
        try {
            const value = previousPerformance.workload.sets[position - 1].rows[rowIndex][field]
            if (isBool) {
                return value
            } else if (field === 'weight') {
                return translateValue(value, applyPreviousUnits, performance.measureUnit) + ''
            }
            return value + ''
        } catch (e) {

        }
        return whenever
    }
    
    const weightPlaceholder = definePlaceholder('weight', endingFor(10, performance.measureUnit, locale))
    const repsPlaceholder = definePlaceholder('reps', i18n.t('es0015').toLowerCase())
    const isLethalWasChecked = definePlaceholder('isLethal', false, true)

    function updateSelfWeightHandler() {
        if (!isButtonPressed) {
            setButtonPressed(true)
            // 1. Show self-weight modal with current value
            dispatch(onWeightedFieldChanged('showModal', true))
            // make button pressable
            setButtonPressed(false)
        }
    }

    return (
        <View key={`${setIndex}-${rowIndex}`} style={styles.rowContentItem}>
            {performance.type === 'self' 
            ? (
                <TouchableWithoutFeedback onPress={updateSelfWeightHandler}>
                    <View style={styles.selfWeightBox}>
                    <View style={styles.setFuncArea}>
                        <RedoSvg size={10} fill={Theme.textCommon}/>
                    </View>
                    <InputBox
                        setInputMode={'numeric'}
                        activeStyles={styles.inputActiveStyles}
                        defaultStyles={styles.inputDisableStyles}
                        updateValueFunc={(text) => checkForReal(text, setWeight)}
                        onBlurFunc={async () => {
                            completeRealNumber(weight, setWeight)
                            const args = [setIndex, rowIndex, 'weight', weight]
                            dispatch(onPerformanceSetRowFieldChanged(...args))
                            // updateRowTonnage()
                            updateFieldInSetRowWithinStoredPerformance(exerciseID, ...args)
                        }}
                        currentValue={weight}
                        placeholder={weightPlaceholder}
                        placeholderColor={Theme.levelOne}
                        disabled={true}
                    />
                    </View>
                </TouchableWithoutFeedback>
            ) 
            : (
                <InputBox
                    setInputMode={'numeric'}
                    activeStyles={styles.inputActiveStyles}
                    defaultStyles={styles.inputDefaultStyles}
                    updateValueFunc={(text) => checkForReal(text, setWeight)}
                    onBlurFunc={async () => {
                        completeRealNumber(weight, setWeight)
                        const args = [setIndex, rowIndex, 'weight', weight]
                        dispatch(onPerformanceSetRowFieldChanged(...args))
                        // updateRowTonnage()
                        updateFieldInSetRowWithinStoredPerformance(exerciseID, ...args)
                    }}
                    currentValue={weight}
                    placeholder={weightPlaceholder}
                    placeholderColor={Theme.levelOne}
                    disabled={false}
                />
            )
            }
            <InputBox
                setInputMode={'numeric'}
                activeStyles={styles.inputActiveStyles}
                defaultStyles={styles.inputDefaultStyles}
                updateValueFunc={(text) => checkForInteger(text, setReps)}
                onBlurFunc={async () => {
                    const args = [setIndex, rowIndex, 'reps', reps]
                    dispatch(onPerformanceSetRowFieldChanged(...args))
                    // updateRowTonnage()
                    updateFieldInSetRowWithinStoredPerformance(exerciseID, ...args)
                }}
                currentValue={reps}
                placeholder={repsPlaceholder}
                placeholderColor={Theme.levelOne}
            />
            <CheckBox
                valueFunc={async () => {
                    const args = [setIndex, rowIndex, 'isLethal']
                    dispatch(onPerformanceSetRowFieldChanged(...args))
                    updateFieldInSetRowWithinStoredPerformance(exerciseID, ...args)
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