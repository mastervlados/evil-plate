import { 
    ON_EXERCISE_CHANGED, 
    ON_PERFORMANCE_CHANGED,  
    ON_PERFORMANCE_SET_ADDED,
    ON_PERFORMANCE_SET_FIELD_CHANGED,
    ON_PERFORMANCE_SET_ROW_FIELD_CHANGED
} from "../constants"

const initialState = {
    exercise: {},
    performance: {},
}

const testState = {
    exercise: {
        id: 16,
        title: 'Test exercise for back so long title behavior',
        type: 'mono',
        breakDuration: 210,
        colorNumber: 'color-four',
        records: {
            leaderboard: {

            },
            previous: {
                isExist: true,
                id: 13,
                measureUnit: 'kg',
                date: '2024-01-04T15:00:44.534Z',
                headers: [
                    {
                        header: 'es0007',
                        data: [
                            {
                                content: 'weight',
                                prefix: null,
                                weight: 75,
                                reps: 7,
                                lethal: true, 
                            }
                        ],
                    },
                    {
                        header: 'es0008',
                        data: [
                            {
                                content: 'tonnage',
                                prefix: null,
                                tonnage: 1570,
                                sets: 5,
                            }
                        ],
                    }
                ]
            },
        },
        created: '2023-01-04T15:00:44.534Z'
    },
    performance: {},
}

const exerciseReducer = (state = testState, action) => {

    function updateRowValue(setID, rowID, field, payload) {

        const previousRow = state.performance.workload.sets[setID].rows[rowID]
        const previousSet = state.performance.workload.sets[setID]

        const newRow = {
            ...previousRow,
        }

        if (payload) {
            newRow[field] = payload
        } else {
            newRow[field] = !previousRow[field]
        }
        
        return {
            ...previousSet,
            rows: [
                ...previousSet.rows.slice(0, rowID),
                newRow,
                ...previousSet.rows.slice(rowID + 1),
            ]
            
        }
    }

    function updateSetValue(setID, field, payload) {

        const previousSet = state.performance.workload.sets[setID]

        const newSet = {
            ...previousSet,
        }

        if (payload) {
            newSet[field] = payload
        } else {
            newSet[field] = !previousSet[field]
        }
        
        return newSet
    }

    switch (action.type) {
        case ON_EXERCISE_CHANGED:
            return {
                ...state,
                exercise: action.payload,
            }
        case ON_PERFORMANCE_CHANGED:
            return {
                ...state,
                performance: action.payload,
            }
        case ON_PERFORMANCE_SET_ADDED:
            return {
                ...state,
                performance: {
                    ...state.performance,
                    workload: {
                        ...state.performance.workload,
                        sets: [
                            ...state.performance.workload.sets,
                            action.payload,
                        ]
                    }
                }
            }
            case ON_PERFORMANCE_SET_FIELD_CHANGED:
                console.log(state.performance.workload.sets)
                return {
                    ...state,
                    performance: {
                        ...state.performance,
                        workload: {
                            ...state.performance.workload,
                            sets: [
                                ...state.performance.workload.sets.slice(0, action.setID),
                                updateSetValue(
                                    action.setID, 
                                    action.field, 
                                    action.payload
                                ),
                                ...state.performance.workload.sets.slice(action.setID + 1)
                            ]
                        }
                    }
                }
            case ON_PERFORMANCE_SET_ROW_FIELD_CHANGED:
                return {
                    ...state,
                    performance: {
                        ...state.performance,
                        workload: {
                            ...state.performance.workload,
                            sets: [
                                ...state.performance.workload.sets.slice(0, action.setID),
                                updateRowValue(
                                    action.setID, 
                                    action.rowID, 
                                    action.field, 
                                    action.payload
                                ),
                                ...state.performance.workload.sets.slice(action.setID + 1)
                            ]
                        },
                    },
                }
        default:
            return state
    }
}

export default exerciseReducer