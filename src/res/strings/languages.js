// export default function language(languageCode) {
//     switch (languageCode) {
//         case '1049':
//             // Русский (Россия)
//             return 'Русский'
//         case '1033':
//             // Английский (США)
//             return 'English'
//         default:
//             return ''
//     }
// }
import en from './localizations/en-US'
import ru from './localizations/ru-RU'

const languages = {
    en, ru,    
}

export default languages