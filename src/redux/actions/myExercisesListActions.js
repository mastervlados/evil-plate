import { GET_EXERCISES_LIST } from "../constants"

const getExercisesList = () => {
    return {
        type: GET_EXERCISES_LIST,
    }
}

export {
    getExercisesList,
}