import { 
    ON_ADD_EXERCISE, 
    ON_EXERCISES_LIST_COLOR_FILTER_CHANGED, 
    ON_EXERCISES_LIST_COLOR_FILTER_LOADED, 
    ON_EXERCISES_LIST_COLOR_FILTER_RESET, 
    ON_EXERCISES_LIST_ITEM_DELETED, 
    ON_EXERCISES_LIST_ITEM_UPDATED, 
    ON_EXERCISES_LIST_LOADED 
} from "../constants"

const initialState = {
    exercises: [],
    areExercisesLoaded: false,
    colorFilter: [],
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
        case ON_EXERCISES_LIST_ITEM_DELETED:
            const deletedIndex = state.exercises.findIndex(e => e.id === action.deletedID)
            return {
                ...state,
                exercises: [
                    ...state.exercises.slice(0, deletedIndex),
                    ...state.exercises.slice(deletedIndex + 1),
                ]
            }
        case ON_EXERCISES_LIST_COLOR_FILTER_RESET:
            return {
                ...state,
                colorFilter: [],
            }
        case ON_EXERCISES_LIST_COLOR_FILTER_LOADED:
            return {
                ...state,
                colorFilter: action.payload,
            }
        case ON_EXERCISES_LIST_COLOR_FILTER_CHANGED:
            // 1. If color number not in the filter array -> add
            // 2. If color number is exist inside the array -> remove
            const colorIndex = state.colorFilter.indexOf(action.payload)
            if (colorIndex === -1) {
                // to add
                return {
                    ...state,
                    colorFilter: [
                        ...state.colorFilter,
                        action.payload,
                    ]
                }
            } 
            // to remove
            return {
                ...state,
                colorFilter: [
                    ...state.colorFilter.slice(0, colorIndex),
                    ...state.colorFilter.slice(colorIndex + 1),
                ]
            }
        default:
            return state
    }
}

export default myExercisesListReducer