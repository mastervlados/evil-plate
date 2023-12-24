import { ON_EXERCISES_FORM_VISIBLE_CHANGED } from "../constants"

const onExercisesFormVisibleChanged = (isVisible) => {
    return {
        type: ON_EXERCISES_FORM_VISIBLE_CHANGED,
        payload: isVisible,
    }
}

export {
    onExercisesFormVisibleChanged,
}