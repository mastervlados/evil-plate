import { 

} from "../constants"

const initialState = {
    exercise: null,
}

const testState = {
    exercise: {
        id: 16,
        title: 'Test exercise for back',
        type: 'mono',
        breakDuration: 210,
        colorNumber: 'color-four',
        // measureUnit: 'kg', ?
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
    }
}

const exerciseReducer = (state = testState, action) => {

    switch (action.type) {
        
        default:
            return state
    }
}

export default exerciseReducer