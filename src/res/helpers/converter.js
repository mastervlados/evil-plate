const kgsToPounds = (kilograms) => {
    return (kilograms * 2.2046).toFixed(2)
}

const lbsToKilograms = (pounds) => {
    return (pounds / 2.2046).toFixed()
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
    kgsToPounds,
    lbsToKilograms,
    translateValue,
}