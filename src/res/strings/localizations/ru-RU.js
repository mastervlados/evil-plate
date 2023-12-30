// export default function ruRULanguage(stringID) {
//     switch (stringID) {
//         case '1000':
//             return 'Мои Упражнения'
//         default:
//             return ''
//     }
// }

const myExercisesFormScreen = {
	mefs0001: 'self',
	mefs0002: 'stereo',
	mefs0003: 'mono',
	mefs0004: '1. Выберите подходящий режим:',
	mefs0005: '2. Напишите название упражнения:',
	mefs0006: '(можно будет поменять значение в настройках)',
	mefs0007: '3. Сколько времени будет длиться отдых между подходами?',
	mefs0008: '4. Осталось выбрать цвет рамки:',
	mefs0009: 'Создать',
	mefs0010: 'Мое упражнение называется ..',
}

const ru = {
    str0001: 'Мои Упражнения',
    str0002: 'Настройки',
	...myExercisesFormScreen,
}

export default ru
