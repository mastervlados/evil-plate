export default function language(languageCode) {
    switch (languageCode) {
        case '1049':
            // Русский (Россия)
            return 'Русский'
        case '1033':
            // Английский (США)
            return 'English'
        default:
            return ''
    }
}