// export default function enUSLanguage(stringID) {
//     switch (stringID) {
//         case '1000':
//             return 'My Exercises'
//         default:
//             return ''
//     }
// }

const myExercisesFormScreen = {
	mefs0001: 'Exercises with your own weight. The program suggests you to type your current weight before you start. It will use it automatically for each set in the weight column.',
	mefs0002: 'Single arm dumbbell row as an example exercise. In this exercise, you pull one dumbbell and change hands. You might pull more weight with your main arm and less with your weak one.',
	mefs0003: 'This is the most common option.\nFor example, you have a barbell or smth. else and you can manage the weight. Type information about weight and repetitions for each set.',
	mefs0004: '1. Choose the appropriate mode:',
	mefs0005: '2. Type a name for this exercise below:',
	mefs0006: '(you can change it later in the settings)',
	mefs0007: '3. What about your timer between sest?',
	mefs0008: '4. The last step is to pick a color:',
	mefs0009: 'Create',
	mefs0010: 'My exercise is called ..',
}

const timerPickerComponent = {
	tpc0001: '1 min',
	tpc0002: '1 min\n30 sec',
	tpc0003: '2 min',
	tpc0004: '2 min\n30 sec',
	tpc0005: '3 min',
	tpc0006: '3 min\n30 sec',
	tpc0007: '4 min',
	tpc0008: '4 min\n30 sec',
	tpc0009: '5 min',
}

const appSettingsScreen = {
	ass0001: 'Choose app language:',
	ass0002: 'Pick your units system:',
	ass0003: 'notes...',
	ass0004: 'Kilograms (kgs)',
	ass0005: 'Pounds (lbs)',
}

const en = {
    str0001: 'My Exercises',
    str0002: 'Settings',
	...myExercisesFormScreen,
	...timerPickerComponent,
	...appSettingsScreen,
} 

export default en
