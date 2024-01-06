import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'
import ExerciseCurrentInfo from './ExerciseCurrentInfo'
import ExerciseCurrentInteraction from './ExerciseCurrentInteraction'
import { useSelector } from 'react-redux'

export default function ExerciseCurrent() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    const exercise = useSelector(state => state.exerciseReducer.exercise)

    if (performance.exerciseID === exercise.id 
        && typeof(performance.exerciseID) !== 'undefined'
        && typeof(exercise.id) !== 'undefined') {
        return <ExerciseCurrentInteraction/>
    }

    return (
        <ExerciseCurrentInfo/>
    )
}