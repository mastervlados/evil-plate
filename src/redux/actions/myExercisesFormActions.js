import { 
    ON_EXERCISES_FORM_COLOR_CHANGED,
    ON_EXERCISES_FORM_MESSAGE_VISIBLE_CHANGED,
    ON_EXERCISES_FORM_MODE_CHANGED, 
    ON_EXERCISES_FORM_NAME_CHANGED, 
    ON_EXERCISES_FORM_OWN_MODE_CHANGED, 
    ON_EXERCISES_FORM_TIMER_CHANGED, 
    ON_EXERCISES_FORM_VISIBLE_CHANGED,
} from "../constants"

const onExercisesFormVisibleChanged = (isVisible) => {
    return {
        type: ON_EXERCISES_FORM_VISIBLE_CHANGED,
        payload: isVisible,
    }
}

const onExercisesFormNameChanged = (title) => {
    return {
        type: ON_EXERCISES_FORM_NAME_CHANGED,
        payload: title,
    }
}

const onExercisesFormModeChanged = (type) => {
    return {
        type: ON_EXERCISES_FORM_MODE_CHANGED,
        payload: type,
    }
}

const onExercisesFormTimerChanged = (timer) => {
    return {
        type: ON_EXERCISES_FORM_TIMER_CHANGED,
        payload: timer,
    }
}

const onExercisesFormColorChanged = (colorNumber) => {
    return {
        type: ON_EXERCISES_FORM_COLOR_CHANGED,
        payload: colorNumber,
    }
}

const onExercisesFormMessageVisibleChanged = (isVisible) => {
    return {
        type: ON_EXERCISES_FORM_MESSAGE_VISIBLE_CHANGED,
        payload: isVisible,
    }
}

const onExercisesFormOwnModeChanged = (mode) => {
    return {
        type: ON_EXERCISES_FORM_OWN_MODE_CHANGED,
        payload: mode,
    }
}

export {
    onExercisesFormVisibleChanged,
    onExercisesFormNameChanged,
    onExercisesFormModeChanged,
    onExercisesFormTimerChanged,
    onExercisesFormColorChanged,
    onExercisesFormMessageVisibleChanged,
    onExercisesFormOwnModeChanged,
}


