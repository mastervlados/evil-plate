const ruLabes = {
    '0':['подходов','повторений'],
    '1':['подход','повторение'],
    '2':['подхода','повторения'],
    '3':['подхода','повторения'],
    '4':['подхода','повторения'],
    '5':['подходов','повторений'],
    '6':['подходов','повторений'],
    '7':['подходов','повторений'],
    '8':['подходов','повторений'],
    '9':['подходов','повторений'],
}

const endingFor = (number, endingFor, locale = 'en') => {

    const lastDigit = number % 10

    switch (endingFor) {
        case 'sets':
            if (locale === 'ru') return ruLabes[lastDigit][0]
            return number === 1 ? 'set' : 'sets'
        case 'reps':
            if (locale === 'ru') return ruLabes[lastDigit][1]
            return number === 1 ? 'repetition' : 'reps'
        case 'kg':
            if (locale === 'ru') return 'кг.'
            return number === 1 ? 'kg' : 'kgs'
        case 'lb':
            if (locale === 'ru') return 'ф.'
            return 'lbs'
        default:
            return null
    }
}

// 8 -> 8 повторений | reps
// 1 -> повторение | repetition
// 5 -> подходов | sets
// 1 -> подход | set

function formatString(str) {
    let args = [].slice.call(arguments, 1), i = 0;
    return str.replace(/%s/g, () => args[i++])
}

export {
    endingFor,
    formatString,
}