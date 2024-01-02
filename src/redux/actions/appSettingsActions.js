import { 
    ON_SETTINGS_HINT_EXERCISES_FORM_CHANGED,
    ON_SETTINGS_LANGUAGE_CHANGED, 
    ON_SETTINGS_UNITS_CHANGED, 
} from "../constants"


const onSettingsLanguageChanged = (language) => {
    return {
        type: ON_SETTINGS_LANGUAGE_CHANGED,
        payload: language,
    }
}

const onSettingsUnitsChanged = (units) => {
    return {
        type: ON_SETTINGS_UNITS_CHANGED,
        payload: units,
    }
}

const onSettingsHintExercisesFormChanged = (isVisible) => {
    return {
        type: ON_SETTINGS_HINT_EXERCISES_FORM_CHANGED,
        payload: isVisible,
    }
}

export {
    onSettingsLanguageChanged,
    onSettingsUnitsChanged,
    onSettingsHintExercisesFormChanged,
}