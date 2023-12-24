import { ON_EXERCISES_LIST_LOADED } from "../constants"

const initialState = {
    exercises: [],
    areExercisesLoaded: false,
}

const myExercisesListReducer = (state = initialState, action) => {

    switch (action.type) {
        case ON_EXERCISES_LIST_LOADED:
            return {
                ...state,
                exercises: action.payload,
                areExercisesLoaded: true,
            }
        default:
            return state
    }
}

export default myExercisesListReducer