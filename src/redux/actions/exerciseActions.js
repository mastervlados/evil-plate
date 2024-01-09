import { 
    ON_EXERCISE_CHANGED, 
    ON_PERFORMANCE_CHANGED, 
    ON_PERFORMANCE_DATA_CHANGED, 
    ON_PERFORMANCE_ROW_CHECKBOX_CHANGED, 
    ON_PERFORMANCE_ROW_REPS_CHANGED, 
    ON_PERFORMANCE_ROW_WEIGHT_CHANGED, 
    ON_PERFORMANCE_SET_ADDED,
    ON_PERFORMANCE_SET_DELETED
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

const onPerformanceSetDeleted = (index) => {
    return {
        type: ON_PERFORMANCE_SET_DELETED,
        id: index,
    }
}

const onPerformanceDataChanged = (data) => {
    return {
        type: ON_PERFORMANCE_DATA_CHANGED,
        payload: data,
    }
}

const onPerformanceRowCheckboxChanged = (setID, rowID) => {
    return {
        type: ON_PERFORMANCE_ROW_CHECKBOX_CHANGED,
        setID: setID,
        rowID: rowID,
    }
}

const onPerformanceRowWeightChanged = (setID, rowID, value) => {
    return {
        type: ON_PERFORMANCE_ROW_WEIGHT_CHANGED,
        setID: setID,
        rowID: rowID,
        payload: value,
    }
}

const onPerformanceRowRepsChanged = (setID, rowID, value) => {
    return {
        type: ON_PERFORMANCE_ROW_REPS_CHANGED,
        setID: setID,
        rowID: rowID,
        payload: value,
    }
}

export {
    onExerciseChanged,
    onPerformanceChanged,
    onPerformanceSetAdded,
    onPerformanceSetDeleted,
    onPerformanceDataChanged,
    onPerformanceRowCheckboxChanged,
    onPerformanceRowWeightChanged,
    onPerformanceRowRepsChanged,
}