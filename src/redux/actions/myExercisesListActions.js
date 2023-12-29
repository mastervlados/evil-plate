import { ON_ADD_EXERCISE, ON_EXERCISES_LIST_LOADED, PUT_NAVIGATION } from "../constants"

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

export {
    onExercisesListLoaded,
    onAddExercise,
}