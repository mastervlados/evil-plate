import { ON_ADD_EXERCISE, ON_EXERCISES_LIST_LOADED, PUT_NAVIGATION } from "../constants"

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
        case ON_ADD_EXERCISE:
            return {
                ...state,
                exercises: [
                    action.payload,
                    ...state.exercises,
                ]
            }
        default:
            return state
    }
}

export default myExercisesListReducer