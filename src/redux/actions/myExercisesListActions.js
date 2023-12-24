import { ON_EXERCISES_LIST_LOADED } from "../constants"

const onExercisesListLoaded = (exercises) => {
    return {
        type: ON_EXERCISES_LIST_LOADED,
        payload: exercises,
    }
}

export {
    onExercisesListLoaded,
}