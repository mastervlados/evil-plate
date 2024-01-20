// export default function enUSLanguage(stringID) {
//     switch (stringID) {
//         case '1000':
//             return 'My Exercises'
//         default:
//             return ''
//     }
// }

const alerts = {
	// 1 - My Exercises Form
	alert1001: 'Are you sure about closing this form?',
	alert1002: 'Yes',
	alert1003: 'No',
	// 2 - Exercise Current Interaction
	alert2001: 'Do you really want to cancel current progress?',
	alert2002: 'Yes',
	alert2003: 'No',
	// 3 - Timer Panel
	// -- Validation failing
	alert3001: 'Each weight and reps both fields have to be with a value.',
	alert3002: 'Got it!',
	// -- Accept finish
	alert3101: 'You are going to finish this exercise and save new results.',
	alert3102: 'Create',
	alert3103: 'Back',
}

const myExercisesFormScreen = {
	mefs0001: 'Exercises with your own weight. The program suggests you to type your current weight before you start. It will use it automatically for each set in the weight column.',
	mefs0002: 'Single arm dumbbell row as an example exercise. In this exercise, you pull one dumbbell and change hands. You might pull more weight with your main arm and less with your weak one.',
	mefs0003: 'This is the most common option.\nFor example, you have a barbell or smth. else and you can manage the weight. Type information about weight and repetitions for each set.',
	mefs0004: 'Choose the appropriate mode:',
	mefs0005: 'Type a name for this exercise below:',
	mefs0006: '(you can change it later in the settings)',
	mefs0007: 'What about your timer between sest?',
	mefs0008: 'The last step is to pick a color:',
	mefs0009: 'Create',
	mefs0010: 'My exercise is called ..',
	mefs0011: 'Save changes',
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
	ass0003: 'These units used for keeping your entry weight values. You can change the system if you need it. App will convert your previous values. It helps to understand the weight you should continue training.',
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
	// InputSelfWeightModal
	es0017: 'Done!',
	es0018: 'Type your current weight:',
	es0019: 'You\'re about doing an exercise with self weight. You have to weigh yourself and type results before you continue..',
}

const en = {
    str0001: 'My Exercises',
    str0002: 'Settings',
	...alerts,
	...myExercisesFormScreen,
	...timerPickerComponent,
	...appSettingsScreen,
	...exerciseScreen,
} 

export default en
