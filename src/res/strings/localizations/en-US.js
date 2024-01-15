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

const exerciseScreen = {
	es0001: 'PREVIOUS',
	es0002: 'CURRENT',
	es0003: 'PROGRESS',
	es0004: 'You did the exercise\nlast time:',
	es0005: 'You haven\'t done this exercise yet',
	es0006: 'There are no previous results..',
	es0007: 'Max weight:',
	es0008: 'Tonnage:',
	es1009: 'Max number of reps:',
	es1010: 'Weak:',
	es1011: 'Strong:',
	// TonnageIndicatorBar
	es0009: 'Total',
	es0010: 'Under water',
	es0011: 'Maintain',
	es0012: 'Grow!',
	// TableHeaders
	es0013: 'Sets',
	es0014: 'Weight',
	es0015: 'Reps',
	es0016: 'Failure',
}

const en = {
    str0001: 'My Exercises',
    str0002: 'Settings',
	...myExercisesFormScreen,
	...timerPickerComponent,
	...appSettingsScreen,
	...exerciseScreen,
} 

export default en
