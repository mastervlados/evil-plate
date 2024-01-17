import { 
    ON_ACTIVE_TAB_CHANGED,
    ON_EXERCISE_CHANGED, 
    ON_EXERCISE_META_CHANGED, 
    ON_PERFORMANCE_CHANGED, 
    ON_PERFORMANCE_FIELD_IN_FLOW_CHANGED, 
    ON_PERFORMANCE_FLOWS_SET_ADDED, 
    ON_PERFORMANCE_LOADED, 
    ON_PERFORMANCE_SET_ADDED,
    ON_PERFORMANCE_SET_FIELD_CHANGED,
    ON_PERFORMANCE_SET_ROW_FIELD_CHANGED,
    ON_PREVIOUS_PERFORMANCE_CHANGED
} from "../constants"


const onExerciseChanged = (data) => {
    return {
        type: ON_EXERCISE_CHANGED,
        payload: data,
    }
}

const onExerciseMetaChanged = (data) => {
    return {
        type: ON_EXERCISE_META_CHANGED,
        payload: data,
    }
}

const onActiveTabChanged = (activeTab) => {
    return {
        type: ON_ACTIVE_TAB_CHANGED,
        payload: activeTab,
    }
}

const onPerformanceChanged = (data) => {
    return {
        type: ON_PERFORMANCE_CHANGED,
        payload: data,
    }
}

const onPreviousPerformanceChanged = (data) => {
    return {
        type: ON_PREVIOUS_PERFORMANCE_CHANGED,
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

const onPerformanceFieldInFlowChanged = (setID, rowID, value) => {
    return {
        type: ON_PERFORMANCE_FIELD_IN_FLOW_CHANGED,
        setID: setID,
        rowID: rowID,
        payload: value,
    }
}

const onPerformanceFlowsSetAdded = () => {
    return {
        type: ON_PERFORMANCE_FLOWS_SET_ADDED,
    }
}

const onPerformanceLoaded = (isReady) => {
    return {
        type: ON_PERFORMANCE_LOADED,
        payload: isReady,
    }
}

export {
    onExerciseChanged,
    onPerformanceChanged,
    onPreviousPerformanceChanged,
    onPerformanceSetAdded,
    onPerformanceSetFieldChanged,
    onPerformanceSetRowFieldChanged,
    onPerformanceFieldInFlowChanged,
    onPerformanceFlowsSetAdded,
    onPerformanceLoaded,
    onExerciseMetaChanged,
    onActiveTabChanged,
}