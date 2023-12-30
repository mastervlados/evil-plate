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

export {
    checkExerciseName,
}

