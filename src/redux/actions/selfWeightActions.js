import { ON_WEIGHTED_FIELD_CHANGED } from "../constants"

const onWeightedFieldChanged = (field, value) => {
    return {
        type: ON_WEIGHTED_FIELD_CHANGED,
        field: field,
        payload: value,
    }
}

export {
    onWeightedFieldChanged,
}