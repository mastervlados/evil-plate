import { ON_WEIGHTED_FIELD_CHANGED } from "../constants"

const initialState = {
   isWeighted: false,
   weightedUnit: '',
   selfWeight: '',
   showModal: false,
}

const selfWeightReducer = (state = initialState, action) => {

    switch (action.type) {
        case ON_WEIGHTED_FIELD_CHANGED:
            return {
                ...state,
                [action.field]: action.payload,
            }
        default:
            return state
    }
}

export default selfWeightReducer