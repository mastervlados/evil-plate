import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import { useDispatch } from 'react-redux'
import InputBox from '../../UI/InputBox'
import { onPerformanceRowCheckboxChanged, onPerformanceRowRepsChanged, onPerformanceRowWeightChanged } from '../../redux/actions/exerciseActions'
import { updateStoredSetRowFieldWithinExercise } from '../../res/helpers/secureStore'
import { Theme } from '../../styles'
import CheckBox from '../../UI/CheckBox'
import SkullSvg from '../../res/svgs/SkullSvg'


export default function SetItem({ exerciseID, setIndex, rowIndex, row }) {

    const [weight, setWeight] = useState(row.weight)
    const [reps, setReps] = useState(row.reps)
    const dispatch = useDispatch()

    return (
        <View key={`${setIndex}-${rowIndex}`} style={styles.rowContentItem}>
            <InputBox
                setInputMode={'numeric'}
                activeStyles={styles.inputActiveStyles}
                defaultStyles={styles.inputDefaultStyles}
                updateValueFunc={setWeight}
                onBlurFunc={async () => {
                    dispatch(onPerformanceRowWeightChanged(setIndex, rowIndex, weight))
                    updateStoredSetRowFieldWithinExercise(exerciseID, setIndex, rowIndex, 'weight', weight)
                }}
                currentValue={weight}
                placeholder={'weight'}
                placeholderColor={Theme.levelOne}
            />
            <InputBox
                setInputMode={'numeric'}
                activeStyles={styles.inputActiveStyles}
                defaultStyles={styles.inputDefaultStyles}
                updateValueFunc={setReps}
                onBlurFunc={async () => {
                    dispatch(onPerformanceRowRepsChanged(setIndex, rowIndex, reps))
                    updateStoredSetRowFieldWithinExercise(exerciseID, setIndex, rowIndex, 'reps', reps)
                }}
                currentValue={reps}
                placeholder={'reps'}
                placeholderColor={Theme.levelOne}
            />
            <CheckBox
                valueFunc={async () => {
                    dispatch(onPerformanceRowCheckboxChanged(setIndex, rowIndex))
                    updateStoredSetRowFieldWithinExercise(exerciseID, setIndex, rowIndex, 'isLethal')
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