import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { styles } from './style'
import ExerciseCurrentInfo from './ExerciseCurrentInfo'
import ExerciseCurrentInteraction from './ExerciseCurrentInteraction'
import { useDispatch, useSelector } from 'react-redux'
import { addSetToStoredPerformance, createStoredSetWithinExercise, getOpenPefrormances, getOpenPerformance } from '../../res/helpers/secureStore'
import { onPerformanceChanged, onPerformanceFieldInFlowChanged, onPerformanceFlowsSetAdded, onPerformanceLoaded, onPerformanceSetAdded, onPreviousPerformanceChanged } from '../../redux/actions/exerciseActions'
import Spinner from '../../components/Spinner'
import AppContext from '../../../AppContext'
import { translateValue } from '../../res/helpers/converter'
import InputSelfWeightModal from '../../components/InputSelfWeightModal'
import MyExercisesForm from '../MyExercisesForm'


export default function ExerciseCurrent() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    const isPerformanceReady = useSelector(state => state.exerciseReducer.isPerformanceReady)
    const exercise = useSelector(state => state.exerciseReducer.exercise)
    const service = useContext(AppContext)
    const dispatch = useDispatch()
    // console.log(exercise)
    useEffect(() => {
        const getOpenPerformanceIfExist = async () => {
            // when we change exercise
            // we load data again
            // and show spinner to a champion
            dispatch(onPerformanceLoaded(false))
            // Load current performance from stored performances
            const currentPerformance = await getOpenPerformance(exercise.id)
            // != instead of !== 'cause it might be a string value..
            if (currentPerformance != -1) {
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
            } else {
                // We havent open one
                // should set as default 
                // for current performance
                dispatch(onPerformanceChanged({}))
            }
            // Also loading previous performance
            // ...
            if (exercise.records.previous.isExist) {
                const previousPerformance = await service.getPerformance(exercise.records.previous.id)
                dispatch(onPreviousPerformanceChanged(previousPerformance))
            } else {
                dispatch(onPreviousPerformanceChanged({}))
            }
            // Whenever we ready to display smth. to user!
            // ~ isPerformanceReady
            dispatch(onPerformanceLoaded(true))
        }

        getOpenPerformanceIfExist()

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
        await addSetToStoredPerformance(exerciseID, initialSet)   
    }

    if (!isPerformanceReady) {
        return <Spinner animation={'rotate'}/>
    }

    if (performance.exerciseID === exercise.id 
        && typeof(performance.exerciseID) !== 'undefined'
        && typeof(exercise.id) !== 'undefined') {
        return <ExerciseCurrentInteraction addNewSetFunc={addNewSetHandler}/>
    }

    return (
        <React.Fragment>
            <InputSelfWeightModal/>
            <MyExercisesForm/>
            <ExerciseCurrentInfo addNewSetFunc={addNewSetHandler}/>
        </React.Fragment> 
    )
}