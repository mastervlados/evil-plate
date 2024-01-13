import { 
    ON_EXERCISE_CHANGED, 
    ON_PERFORMANCE_CHANGED, 
    ON_PERFORMANCE_SET_ADDED,
    ON_PERFORMANCE_SET_FIELD_CHANGED,
    ON_PERFORMANCE_SET_ROW_FIELD_CHANGED
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

const onPerformanceSetAdded = (set) => {
    return {
        type: ON_PERFORMANCE_SET_ADDED,
        payload: set,
    }
}

const onPerformanceSetFieldChanged = (setID, field, value) => {
    return {
        type: ON_PERFORMANCE_SET_FIELD_CHANGED,
        setID: setID,
        field: field,
        payload: value,
    }
}

const onPerformanceSetRowFieldChanged = (setID, rowID, field, value) => {
    return {
        type: ON_PERFORMANCE_SET_ROW_FIELD_CHANGED,
        setID: setID,
        rowID: rowID,
        field: field,
        payload: value,
    }
}

export {
    onExerciseChanged,
    onPerformanceChanged,
    onPerformanceSetAdded,
    onPerformanceSetFieldChanged,
    onPerformanceSetRowFieldChanged,
}