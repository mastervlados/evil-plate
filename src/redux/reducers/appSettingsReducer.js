import { 
    ON_SETTINGS_LANGUAGE_CHANGED, 
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
        default:
            return state
    }
}

export default appSettingsReducer