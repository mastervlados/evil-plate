import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react'
import { styles } from './style'
import SetItem from './SetItem'
import { useDispatch, useSelector } from 'react-redux'
import { AppTextStyles, Theme } from '../../styles'
import { CancelSvg } from '../../res/svgs'
import { formatString } from '../../res/helpers/endings'
import { deleteStoredSetWithinExercise } from '../../res/helpers/secureStore'
import { onPerformanceSetDeleted } from '../../redux/actions/exerciseActions'


export default function PerformanceGrid({ exerciseID }) {

    const sets = useSelector(state => state.exerciseReducer.performance.workload.sets)
    const dispatch = useDispatch()

    const rows = sets.map((set, setIndex) => {

        const items = set.rows.map((row, rowIndex) => {
            return (
                // Return one row
                <SetItem
                    key={`item-${setIndex}-${rowIndex}`}
                    exerciseID={exerciseID}
                    setIndex={setIndex}
                    rowIndex={rowIndex}
                    row={row}
                />
            )
        })

        // Function to delete a row with alert
        const deleteSetHandler = () => {

            const deleteSet = async () => {
                // means:
                // 1. store data
                await deleteStoredSetWithinExercise(exerciseID, setIndex)
                // 2. update state without deleted item
                dispatch(onPerformanceSetDeleted(setIndex))
            }

            Alert.alert(
                formatString('this is the %s set', setIndex + 1),
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
                                { setIndex + 1 }
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