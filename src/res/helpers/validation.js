const checkExerciseName = (exerciseName) => {
    // 1. Length >= 4 <Gakk>
    // 2. Length < 55
    const exerciseNameLength = exerciseName.length
    if (exerciseNameLength < 4) {
        return {
            status: false,
            message: 'Too short label for your exercise.',
        }
    } else if (exerciseNameLength >= 55) {
        return {
            status: false,
            message: 'Too many words to describe it!',
        }
    }
    return {
        status: true,
    }
}

export {
    checkExerciseName,
}

