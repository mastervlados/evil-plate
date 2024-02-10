import { 
    ON_SETTINGS_HINT_EXERCISES_FORM_CHANGED,
    ON_SETTINGS_LANGUAGE_CHANGED, 
    ON_SETTINGS_ONBOARDING_VISIBLE_CHANGED, 
    ON_SETTINGS_UNITS_CHANGED, 
} from "../constants"

const initialState = {
    // Language:
    // get this value 
    // from device first 
    // from user settings second
    language: 'en',
    // Measure units:
    // kg - kgs - kilograms
    // lb - lbs - pounds
    unitsFromSettings: 'kg', 
    // Hint above each field
    // which champion can edit later
    // on MyExercisesForm, default true
    showHintInMyExercisesForm: true,
    // Onboarding
    showOnboardingScreen: false,
}

const appSettingsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ON_SETTINGS_LANGUAGE_CHANGED:
            return {
                ...state,
                language: action.payload,
            }
        case ON_SETTINGS_UNITS_CHANGED:
            return {
                ...state,
                unitsFromSettings: action.payload,
            }
        case ON_SETTINGS_HINT_EXERCISES_FORM_CHANGED:
            return {
                ...state,
                showHintInMyExercisesForm: action.payload,
            }
        case ON_SETTINGS_ONBOARDING_VISIBLE_CHANGED:
            return {
                ...state,
                showOnboardingScreen: action.payload,
            }
        default:
            return state
    }
}

export default appSettingsReducer