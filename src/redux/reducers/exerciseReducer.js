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

    const updateValue = (setID, rowID, mode, payload = -1) => {
        // mode:
        // 1 - isLethal
        // 2 - weight
        // 3 - reps
        const previousRow = state.performance.workload.sets[setID].rows[rowID]
        const previousSet = state.performance.workload.sets[setID]

        const newRow = {
            ...previousRow,
        }
        switch (mode) {
            case 1:
                newRow.isLethal = !previousRow.isLethal
                break
            case 2:
                newRow.weight = payload
                break
            case 3:
                newRow.reps = payload
                break
        }
        return {
            ...previousSet,
            rows: [
                ...previousSet.rows.slice(0, action.rowID),
                newRow,
                ...previousSet.rows.slice(action.rowID + 1),
            ]
            
        }
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
        case ON_PERFORMANCE_SET_DELETED:
            return {
                ...state,
                performance: {
                    ...state.performance,
                    workload: {
                        ...state.performance.workload,
                        sets: [
                            ...state.performance.workload.sets.slice(0, action.id),
                            ...state.performance.workload.sets.slice(action.id + 1),
                        ]
                    }
                }
            }
        case ON_PERFORMANCE_DATA_CHANGED:
            return {
                ...state,
                performance: {
                    ...state.performance,
                    workload: action.payload,
                },
            }
        case ON_PERFORMANCE_ROW_CHECKBOX_CHANGED:
            return {
                ...state,
                performance: {
                    ...state.performance,
                    workload: {
                        ...state.performance.workload,
                        sets: [
                            ...state.performance.workload.sets.slice(0, action.setID),
                            updateValue(action.setID, action.rowID, 1),
                            ...state.performance.workload.sets.slice(action.setID + 1)
                        ]
                    },
                },
            }
            case ON_PERFORMANCE_ROW_WEIGHT_CHANGED:
                return {
                    ...state,
                    performance: {
                        ...state.performance,
                        workload: {
                            ...state.performance.workload,
                            sets: [
                                ...state.performance.workload.sets.slice(0, action.setID),
                                updateValue(action.setID, action.rowID, 2, action.payload),
                                ...state.performance.workload.sets.slice(action.setID + 1)
                            ]
                        },
                    },
                }
            case ON_PERFORMANCE_ROW_REPS_CHANGED:
                return {
                    ...state,
                    performance: {
                        ...state.performance,
                        workload: {
                            ...state.performance.workload,
                            sets: [
                                ...state.performance.workload.sets.slice(0, action.setID),
                                updateValue(action.setID, action.rowID, 3, action.payload),
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