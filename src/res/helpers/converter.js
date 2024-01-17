const cutFloatPartOfNumber = (float) => {
    const regexp = /\./
    if (regexp.test(float)) {
        for (let i = float.length - 1; i >= 0; i--) {
            if (float[i] == 0) {
                float = float.substring(0, i)
            } else if (float[i] == '.') {
                float = float.substring(0, i)
                break
            } else {
                break
            }
        }
    }
    return float
}
const kgsToPounds = (kilograms) => {
    const lbs = (kilograms * 2.2046).toFixed(2)
    return cutFloatPartOfNumber(lbs)
}

const lbsToKilograms = (pounds) => {
    const kgs = (pounds / 2.2046).toFixed(2)
    return cutFloatPartOfNumber(kgs)
}

const translateValue = (value, storedUnits, appUnits) => {
    if (appUnits !== storedUnits) {
        if (appUnits === 'lb') {
            return kgsToPounds(value)
        }
        return lbsToKilograms(value)
    }
    return value
}

export {
    cutFloatPartOfNumber,
    kgsToPounds,
    lbsToKilograms,
    translateValue,
}