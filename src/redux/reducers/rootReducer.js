import { combineReducers } from 'redux'
import myExercisesListReducer from './myExercisesListReducer'
import myExercisesFormReducer from './myExercisesFormReducer'
import appSettingsReducer from './appSettingsReducer'

export default combineReducers({
    appSettingsReducer,
    myExercisesListReducer,
    myExercisesFormReducer,
})