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

const initialState = {
    activeTab: 'current',
    isPerformanceReady: false,
    exercise: {},
    performance: {},
    previousPerformance: {},
}

const testState = {
    activeTab: 'current',
    exercise: {
        id: 16,
        title: 'Test exercise for back so long title behavior',
        type: 'mono',
        breakDuration: 210,
        colorNumber: 'color-four',
        rowsCount: 2,
        records: {
            leaderboard: {
                isExist: true,
                headers: [
                    {
                        header: 'es0007',
                        data: [
                            {
                                content: 'weight',
                                prefix: null,
                                weight: 55,
                                reps: 7,
                                lethal: true, 
                            },
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
                            },
                            {
                                content: 'tonnage',
                                prefix: null,
                                tonnage: 300,
                                sets: 5,
                            },
                        ],
                    }
                ]
            },
            previous: {
                isExist: true,
                id: 75,
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
    isPerformanceReady: false,
    performance: {},
    previousPerformance: {
        exerciseID: 16,
        type: 'stereo',
        breakDuration: 180,
        measureUnit: 'kg',
        workload: {
            rowsCount: 2, 
            flows: [
                { tonnage: 850 },
                { tonnage: 900 },
            ],
            sets: [
                {
                    visible: true,
                    rows: [
                        { weight: 20, reps: 10, isLethal: false, tonnage: 200 },
                        { weight: 20, reps: 10, isLethal: false, tonnage: 200 },
                    ], 
            
                },
                {
                    visible: true,
                    rows: [
                        { weight: 30, reps: 10, isLethal: false, tonnage: 300 },
                        { weight: 32.5, reps: 10, isLethal: false, tonnage: 325 },
                    ], 
            
                },
                {
                    visible: true,
                    rows: [
                        { weight: 35, reps: 10, isLethal: true, tonnage: 350 },
                        { weight: 37.5, reps: 10, isLethal: false, tonnage: 375 },
                    ], 
            
                },
                {
                    visible: true,
                    rows: [
                        { weight: 25, reps: 10, isLethal: true, tonnage: 250 },
                        { weight: 27.5, reps: 10, isLethal: false, tonnage: 275 },
                    ], 
            
                },
            ], 
        }
        
    }
}

const exerciseReducer = (state = initialState, action) => {

    function updateRowValue(setID, rowID, field, payload) {

        const previousRow = state.performance.workload.sets[setID].rows[rowID]
        const previousSet = state.performance.workload.sets[setID]

        const newRow = {
            ...previousRow,
            [field] : typeof(payload) !== 'undefined' ? payload : !previousRow[field]
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
            [field] : typeof(payload) !== 'undefined' ? payload : !previousSet[field]
        }
        
        return newSet
    }

    function updateTonnageValueInFlow(setID, rowID, payload) {

        const previousFlow = state.performance.workload.flows[rowID]

        const newFlow = {
            ...previousFlow,
            tonnage: [
                ...previousFlow.tonnage.slice(0, setID),
                typeof(payload) !== 'undefined' ? Number(payload) : 0,
                ...previousFlow.tonnage.slice(setID + 1),
            ]
        }
        
        return newFlow
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
        case ON_PREVIOUS_PERFORMANCE_CHANGED:
            return {
                ...state,
                previousPerformance: action.payload,
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
                // console.log(state.performance.workload.sets)
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
            case ON_PERFORMANCE_FIELD_IN_FLOW_CHANGED:
                return {
                    ...state,
                    performance: {
                        ...state.performance,
                        workload: {
                            ...state.performance.workload,
                            flows: [
                                ...state.performance.workload.flows.slice(0, action.rowID),
                                updateTonnageValueInFlow(
                                    action.setID, 
                                    action.rowID,
                                    action.payload
                                ),
                                ...state.performance.workload.flows.slice(action.rowID + 1)
                            ]
                        },
                    },
                }
            case ON_PERFORMANCE_FLOWS_SET_ADDED:
                return {
                    ...state,
                    performance: {
                        ...state.performance,
                        workload: {
                            ...state.performance.workload,
                            flows: state.performance.workload.flows.map((flow) => {
                                return {
                                    ...flow,
                                    tonnage: [
                                        ...flow.tonnage,
                                        0
                                    ]
                                }
                            })
                        },
                    },
                }
            case ON_PERFORMANCE_LOADED:
                return {
                    ...state,
                    isPerformanceReady: action.payload,
                }
            case ON_ACTIVE_TAB_CHANGED:
                return {
                    ...state,
                    activeTab: action.payload,
                }
            case ON_EXERCISE_META_CHANGED:
                return {
                    ...state,
                    exercise: {
                        ...state.exercise,
                        records: action.payload,
                    }
                } 
        default:
            return state
    }
}

export default exerciseReducer