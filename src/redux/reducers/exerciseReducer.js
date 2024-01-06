import { 
    ON_EXERCISE_CHANGED, 
    ON_PERFORMANCE_CHANGED, 
    ON_PERFORMANCE_DATA_CHANGED 
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
        case ON_PERFORMANCE_DATA_CHANGED:
            return {
                ...state,
                performance: {
                    ...state.performance,
                    workload: action.payload,
                },
            }
        default:
            return state
    }
}

export default exerciseReducer