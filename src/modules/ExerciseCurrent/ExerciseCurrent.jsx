import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './style'
import ExerciseCurrentInfo from './ExerciseCurrentInfo'
import ExerciseCurrentInteraction from './ExerciseCurrentInteraction'
import { useDispatch, useSelector } from 'react-redux'
import { getOpenPefrormances } from '../../res/helpers/secureStore'
import { onPerformanceChanged, onPerformanceFieldInFlowChanged, onPerformanceLoaded, onPreviousPerformanceChanged } from '../../redux/actions/exerciseActions'
import Spinner from '../../components/Spinner'


export default function ExerciseCurrent() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    const isPerformanceReady = useSelector(state => state.exerciseReducer.isPerformanceReady)
    const exercise = useSelector(state => state.exerciseReducer.exercise)
    const dispatch = useDispatch()

    useEffect(() => {
        const getOpenPerformanceIfExist = async (id) => {
            const storedOpenPerformances = await getOpenPefrormances()
            const currentPerformance = storedOpenPerformances.find((perf) => perf.exerciseID === id)
            if (typeof(currentPerformance) !== 'undefined') {
                // console.log(currentPerformance)
                dispatch(onPerformanceChanged(currentPerformance))
                // Init tonnage in flows
                currentPerformance.workload.sets.map((set, setIndex) => {
                    // Init zero as value for each set
                    // depend on rowsCount
                    set.rows.map((row, rowIndex) => {
                        if (!set.visible) {
                            dispatch(onPerformanceFieldInFlowChanged(setIndex, rowIndex))
                        } else if (row.weight !== '' && row.reps !== '') {
                            dispatch(onPerformanceFieldInFlowChanged(setIndex, rowIndex, Number(row.weight) * Number(row.reps)))
                        } else {
                            dispatch(onPerformanceFieldInFlowChanged(setIndex, rowIndex))
                        }
                    })
                })
                // Also loading previous performance
                // ...
                // const previousPerformance = {}
                // dispatch(onPreviousPerformanceChanged(previousPerformance))
            }
            // Whenever we ready to display smth. to user!
            // ~ isPerformanceReady
            dispatch(onPerformanceLoaded(true))
        }

        getOpenPerformanceIfExist(exercise.id)

    }, [])

    if (!isPerformanceReady) {
        return <Spinner size={150}/>
    }

    if (performance.exerciseID === exercise.id 
        && typeof(performance.exerciseID) !== 'undefined'
        && typeof(exercise.id) !== 'undefined') {
        return <ExerciseCurrentInteraction/>
    }

    return (
        <ExerciseCurrentInfo/>
    )
}