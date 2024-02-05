import { 
    ON_ADD_EXERCISE, 
    ON_EXERCISES_LIST_COLOR_FILTER_CHANGED, 
    ON_EXERCISES_LIST_COLOR_FILTER_LOADED, 
    ON_EXERCISES_LIST_COLOR_FILTER_RESET, 
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

const onExercisesListColorFilterReset = () => {
    return {
        type: ON_EXERCISES_LIST_COLOR_FILTER_RESET,
    }
}

const onExercisesListColorFilterChanged = (colorNumber) => {
    return {
        type: ON_EXERCISES_LIST_COLOR_FILTER_CHANGED,
        payload: colorNumber,
    }
}

const onExercisesListColorFilterLoaded = (data) => {
    return {
        type: ON_EXERCISES_LIST_COLOR_FILTER_LOADED,
        payload: data,
    }
}

export {
    onExercisesListLoaded,
    onAddExercise,
    onExercisesListItemUpdated,
    onExercisesListColorFilterReset,
    onExercisesListColorFilterChanged,
    onExercisesListColorFilterLoaded,
}