import { ON_EXERCISES_FORM_VISIBLE_CHANGED } from "../constants"

const initialState = {
    isExercisesFormOpened: true,
}

const myExercisesFormReducer = (state = initialState, action) => {

    switch (action.type) {
        case ON_EXERCISES_FORM_VISIBLE_CHANGED:
            return {
                ...state,
                isExercisesFormOpened: action.payload,
            }
        default:
            return state
    }
}

export default myExercisesFormReducer