import { 
    ON_ADD_EXERCISE, 
    ON_EXERCISES_LIST_ITEM_UPDATED, 
    ON_EXERCISES_LIST_LOADED
 } from "../constants"


const onExercisesListLoaded = (exercises) => {
    return {
        type: ON_EXERCISES_LIST_LOADED,
        payload: exercises,
    }
}

const onAddExercise = (exercise) => {
    return {
        type: ON_ADD_EXERCISE,
        payload: exercise,
    }
}

const onExercisesListItemUpdated = (exerciseID, obj) => {
    return {
        type: ON_EXERCISES_LIST_ITEM_UPDATED,
        id: exerciseID,
        payload: obj,
    }
}

export {
    onExercisesListLoaded,
    onAddExercise,
    onExercisesListItemUpdated,
}