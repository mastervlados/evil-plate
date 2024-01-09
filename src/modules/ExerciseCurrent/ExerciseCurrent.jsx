import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './style'
import ExerciseCurrentInfo from './ExerciseCurrentInfo'
import ExerciseCurrentInteraction from './ExerciseCurrentInteraction'
import { useDispatch, useSelector } from 'react-redux'
import { getOpenPefrormances } from '../../res/helpers/secureStore'
import { onPerformanceChanged } from '../../redux/actions/exerciseActions'

export default function ExerciseCurrent() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    const exercise = useSelector(state => state.exerciseReducer.exercise)
    const dispatch = useDispatch()

    useEffect(() => {
        const getOpenPerformanceIfExist = async (id) => {
            const storedOpenPerformances = await getOpenPefrormances()
            const currentPerformance = storedOpenPerformances.find((perf) => perf.exerciseID === id)
            if (typeof(currentPerformance) !== 'undefined') {
                // console.log(currentPerformance)
                dispatch(onPerformanceChanged(currentPerformance))
            }
        }

        getOpenPerformanceIfExist(exercise.id)
    }, [exercise])

    if (performance.exerciseID === exercise.id 
        && typeof(performance.exerciseID) !== 'undefined'
        && typeof(exercise.id) !== 'undefined') {
        return <ExerciseCurrentInteraction/>
    }

    return (
        <ExerciseCurrentInfo/>
    )
}