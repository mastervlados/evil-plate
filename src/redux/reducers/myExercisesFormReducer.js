import { 
    ON_EXERCISES_FORM_COLOR_CHANGED,
    ON_EXERCISES_FORM_MESSAGE_VISIBLE_CHANGED,
    ON_EXERCISES_FORM_MODE_CHANGED, 
    ON_EXERCISES_FORM_NAME_CHANGED, 
    ON_EXERCISES_FORM_OWN_MODE_CHANGED, 
    ON_EXERCISES_FORM_TIMER_CHANGED, 
    ON_EXERCISES_FORM_VISIBLE_CHANGED,
} from "../constants"

const initialState = {
    isExercisesFormOpened: false,
    isMessageVisible: false,
    currentMode: 'create',
    interactions: {
        exerciseName: '',
        pickedMode: 'mono',
        pickedTimer: 180,
        pickedColor: 'color-five',
    }
}

const myExercisesFormReducer = (state = initialState, action) => {

    switch (action.type) {
        case ON_EXERCISES_FORM_VISIBLE_CHANGED:
            return {
                ...state,
                isExercisesFormOpened: action.payload,
            }
        case ON_EXERCISES_FORM_NAME_CHANGED:
            return {
                ...state,
                interactions: {
                    ...state.interactions,
                    exerciseName: action.payload,
                }
            }
        case ON_EXERCISES_FORM_MODE_CHANGED:
            return {
                ...state,
                interactions: {
                    ...state.interactions,
                    pickedMode: action.payload,
                }
            }
        case ON_EXERCISES_FORM_TIMER_CHANGED:
            return {
                ...state,
                interactions: {
                    ...state.interactions,
                    pickedTimer: action.payload,
                }
            }
        case ON_EXERCISES_FORM_COLOR_CHANGED:
            return {
                ...state,
                interactions: {
                    ...state.interactions,
                    pickedColor: action.payload,
                }
            }
        case ON_EXERCISES_FORM_MESSAGE_VISIBLE_CHANGED:
            return {
                ...state,
                isMessageVisible: action.payload,
            }
        case ON_EXERCISES_FORM_OWN_MODE_CHANGED:
            return {
                ...state,
                currentMode: action.payload,
            }  
        default:
            return state
    }
}

export default myExercisesFormReducer