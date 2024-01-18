import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { styles } from './style'
import ExerciseCurrentInfo from './ExerciseCurrentInfo'
import ExerciseCurrentInteraction from './ExerciseCurrentInteraction'
import { useDispatch, useSelector } from 'react-redux'
import { createStoredSetWithinExercise, getOpenPefrormances } from '../../res/helpers/secureStore'
import { onPerformanceChanged, onPerformanceFieldInFlowChanged, onPerformanceFlowsSetAdded, onPerformanceLoaded, onPerformanceSetAdded, onPreviousPerformanceChanged } from '../../redux/actions/exerciseActions'
import Spinner from '../../components/Spinner'
import AppContext from '../../../AppContext'
import { translateValue } from '../../res/helpers/converter'


export default function ExerciseCurrent() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    const isPerformanceReady = useSelector(state => state.exerciseReducer.isPerformanceReady)
    const exercise = useSelector(state => state.exerciseReducer.exercise)
    const service = useContext(AppContext)
    const dispatch = useDispatch()

    useEffect(() => {
        const getOpenPerformanceIfExist = async (id) => {
            // when we change exercise
            // we load data again
            // and show spinner to a champion
            dispatch(onPerformanceLoaded(false))
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
                const previouPerformanceID = exercise.records.previous.id || false
                if (previouPerformanceID) {
                    const previousPerformance = await service.getPerformance(previouPerformanceID)
                    dispatch(onPreviousPerformanceChanged(previousPerformance))
                } else {
                    dispatch(onPreviousPerformanceChanged({}))
                }
            }
            // Whenever we ready to display smth. to user!
            // ~ isPerformanceReady
            dispatch(onPerformanceLoaded(true))
        }

        getOpenPerformanceIfExist(exercise.id)

    }, [exercise])

    const addNewSetHandler = async (
        exerciseID, 
        rowsCount, 
        performanceType,
        selfWeight,
        weightedUnit,
        performanceMeasureUnit
        ) => {
        const initialSet = {
            visible: true,
            rows: []
        }
        let weight = ''
        if (performanceType === 'self') {
            weight = translateValue(selfWeight, weightedUnit, performanceMeasureUnit)
        }
        for (let i = 0; i < rowsCount; i++) {
            initialSet.rows.push({ 
                weight: weight, 
                reps: '', 
                isLethal: false, 
                tonnage: 0 
            })
        }
        // update Redux
        dispatch(onPerformanceSetAdded(initialSet))
        // init default tonnage values
        dispatch(onPerformanceFlowsSetAdded())
        // put it into store
        await createStoredSetWithinExercise(exerciseID, initialSet)   
    }

    if (!isPerformanceReady) {
        return <Spinner size={150}/>
    }

    if (performance.exerciseID === exercise.id 
        && typeof(performance.exerciseID) !== 'undefined'
        && typeof(exercise.id) !== 'undefined') {
        return <ExerciseCurrentInteraction addNewSetFunc={addNewSetHandler}/>
    }

    return (
        <ExerciseCurrentInfo addNewSetFunc={addNewSetHandler}/>
    )
}