const checkExerciseName = (exerciseName, messageLocale = 'en') => {
    // 1. Length >= 4 <Gakk>
    // 2. Length < 55
    const exerciseNameLength = exerciseName.length
    if (exerciseNameLength < 4) {
        return {
            status: false,
            message: messageLocale === 'ru' ? 
            'Слишком короткое название упражнения.' : 
            'Too short label for your exercise.',
        }
    } else if (exerciseNameLength >= 54) {
        return {
            status: false,
            message: messageLocale === 'ru' ?
            'Слишком длинное название упражнения!' :
            'Too many words to describe it!',
        }
    }
    return {
        status: true,
    }
}

function checkForReal(term, callback) {
    const regexp = /(^[1-9]$)|(^[1-9]\d+\.?$)|(^[1-9]\d+\.\d+$)|(^$)/
    // console.log('validation: ', term, 'result: ', regexp.test(term))
    if (regexp.test(term)) { 
        callback(term) 
    }
}

function checkForInteger(term, callback) {
    const regexp = /(^[1-9]$)|(^[1-9]\d+$)|(^$)/
    // console.log('validation: ', term, 'result: ', regexp.test(term))
    if (regexp.test(term)) { 
        callback(term) 
    }
}

export {
    checkExerciseName,
    checkForReal,
    checkForInteger,
}

