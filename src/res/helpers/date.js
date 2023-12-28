const monthsObj = {
    '1':['января','January'],
    '2':['февраля','February'],
    '3':['марта','March'],
    '4':['апреля','April'],
    '5':['мая','May'],
    '6':['июня','June'],
    '7':['июля','July'],
    '8':['августа','August'],
    '9':['сентября','September'],
    '10':['октября','October'],
    '11':['ноября','November'],
    '12':['декабря','December'],
}

const enPostfixForDayObj = {
    '0': 'th',
    '1': 'st',
    '2': 'nd',
    '3': 'rd',
    '4': 'th',
    '5': 'th',
    '6': 'th',
    '7': 'th',
    '8': 'th',
    '9': 'th',
}

const formatDate = (date, localization) => {
    
    const converted = new Date(date)
    const months = converted.getMonth() + 1
    const days = converted.getDate()
    const year = converted.getFullYear()
    let result = ''

    switch (localization) {
        case 'ru':
            result = `${days} ${monthsObj[months][0]} ${year}`
            break
        default:
            result = `${monthsObj[months][1]} ${days + '' + enPostfixForDayObj[days % 10]}, ${year}`
            break
    }
    return result
}

export {
    formatDate,
}