import { combineReducers } from 'redux'
import myExercisesListReducer from './myExercisesListReducer'
import myExercisesFormReducer from './myExercisesFormReducer'

export default combineReducers({
    myExercisesListReducer,
    myExercisesFormReducer,
})