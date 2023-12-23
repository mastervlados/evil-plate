import { GET_EXERCISES_LIST } from "../constants"

const initialState = {
    exercises: [],
    areExercisesLoaded: false,
}

const myExercisesListReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_EXERCISES_LIST:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default myExercisesListReducer