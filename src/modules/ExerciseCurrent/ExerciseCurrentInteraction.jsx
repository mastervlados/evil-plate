import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { CancelSvg } from '../../res/svgs'
import { Theme } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { onPerformanceChanged } from '../../redux/actions/exerciseActions'
import { deleteStoredOpenPerformanceByExerciseID } from '../../res/helpers/secureStore'


export default function ExerciseCurrentInteraction() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    useSelector(state => state.appSettingsReducer.language)
    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {

        const closeCurrentPerformance = () => {

            const closeCurrentPerformance = async () => {
                // means:
                // 1. update stored opened performances
                await deleteStoredOpenPerformanceByExerciseID(performance.exerciseID)
                // 2. set emty object as the default
                // for 'performance'
                dispatch(onPerformanceChanged({}))
            }

            Alert.alert(
                'this is top',
                'this is bottom',
                [
                    {
                        text: 'Yes',
                        onPress: () => {
                            closeCurrentPerformance()
                        },
                    },
                    {
                        text: 'No',
                    }
                ]
            )
        }

        navigation.setOptions({headerRight: () => (
            <View style={styles.headerButtonPosition}>
                <TouchableOpacity onPress={closeCurrentPerformance}>
                    <CancelSvg size={42} fill={Theme.textCommon}/>
                </TouchableOpacity>
            </View>
        )})
    }, [])

    return (
        <View>
            <Text>ExerciseCurrentInteraction</Text>
        </View>
    )
}