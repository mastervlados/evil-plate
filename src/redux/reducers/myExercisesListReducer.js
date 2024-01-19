import { ON_ADD_EXERCISE, ON_EXERCISES_LIST_ITEM_UPDATED, ON_EXERCISES_LIST_LOADED, PUT_NAVIGATION } from "../constants"

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
        case ON_EXERCISES_LIST_ITEM_UPDATED:
            const index = state.exercises.findIndex(e => e.id === action.id)
            return {
                ...state,
                exercises: [
                    ...state.exercises.slice(0, index),
                    action.payload,
                    ...state.exercises.slice(index + 1),
                ]
            }
        default:
            return state
    }
}

export default myExercisesListReducer