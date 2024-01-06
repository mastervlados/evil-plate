import { 
    ON_EXERCISE_CHANGED, 
    ON_PERFORMANCE_CHANGED, 
    ON_PERFORMANCE_DATA_CHANGED 
} from "../constants"


const onExerciseChanged = (data) => {
    return {
        type: ON_EXERCISE_CHANGED,
        payload: data,
    }
}

const onPerformanceChanged = (data) => {
    return {
        type: ON_PERFORMANCE_CHANGED,
        payload: data,
    }
}

const onPerformanceDataChanged = (data) => {
    return {
        type: ON_PERFORMANCE_DATA_CHANGED,
        payload: data,
    }
}

export {
    onExerciseChanged,
    onPerformanceChanged,
    onPerformanceDataChanged,
}