import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react'
import { styles } from './style'
import SetItem from './SetItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppTextStyles, Theme } from '../../styles'
import { CancelSvg } from '../../res/svgs'
import { formatString } from '../../res/helpers/endings'
import { updateStoredSetFieldWithinExercise } from '../../res/helpers/secureStore'
import { onPerformanceSetFieldChanged } from '../../redux/actions/exerciseActions'


export default function PerformanceGrid({ exerciseID }) {

    const sets = useSelector(state => state.exerciseReducer.performance.workload.sets)

    // check for data to avoid the error
    if (!sets) { return }

    const dispatch = useDispatch()
    let sequence = 0

    const rows = sets.map((set, setIndex) => {

        // Skip this row if it's not visible
        if (!set.visible) { return }
        // Number in current sequence
        // We create a local variable
        // within mapping array
        // to keep right value for each
        // set and alert!
        sequence += 1
        const position = sequence
        // Mapping rows
        const items = set.rows.map((row, rowIndex) => {
            return (
                // Return one row
                <SetItem
                    key={`item-${setIndex}-${rowIndex}`}
                    exerciseID={exerciseID}
                    setIndex={setIndex}
                    rowIndex={rowIndex}
                    row={row}
                    position={position}
                />
            )
        })

        // Function to delete a row with alert
        const deleteSetHandler = () => {
            
            const deleteSet = async () => {
                // means:
                // 1. update Redux without deleted item
                dispatch(onPerformanceSetFieldChanged(setIndex, 'visible'))
                // 2. update stored data
                await updateStoredSetFieldWithinExercise(exerciseID, setIndex, 'visible')
            }

            Alert.alert(
                formatString('this is the %s set', position),
                'this is bottom',
                [
                    {
                        text: 'Delete',
                        onPress: () => {
                            deleteSet()
                        },
                    },
                    {
                        text: 'Cancel',
                    }
                ]
            )
        }
        // Return one set
        return (
            <View key={`main-${setIndex}`} style={styles.rowBox}>
                <View style={styles.rowControl}>
                    <TouchableWithoutFeedback onPress={deleteSetHandler}>
                        <View style={styles.setBox}>
                            <View style={styles.setFuncArea}>
                                <CancelSvg size={10} fill={Theme.textCommon}/>
                            </View>
                            <Text style={AppTextStyles.styles.extraTextCommon}>
                                { position }
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.rowContent}>
                   { items }
                </View>
            </View>
        )
    })

    return rows
}