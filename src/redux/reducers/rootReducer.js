import { combineReducers } from 'redux'
import myExercisesListReducer from './myExercisesListReducer'
import myExercisesFormReducer from './myExercisesFormReducer'
import appSettingsReducer from './appSettingsReducer'
import exerciseReducer from './exerciseReducer'
import selfWeightReducer from './selfWeightReducer'

export default combineReducers({
    appSettingsReducer,
    myExercisesListReducer,
    myExercisesFormReducer,
    exerciseReducer,
    selfWeightReducer,
})