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
	alert1101: 'Exercise <%s> will be deleted.',
	alert1102: 'Delete',
	alert1103: 'Cancel',
	alert1201: 'It means that all associated data will be deleted and you can\'t restore them.\n\nDo you really want to delete <%s>?',
	alert1202: 'Still delete',
	alert1203: 'Abandon',
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
	// 4 - Performance Grid
	alert4001: 'Do you really want to delete the set at position %s?',
	alert4002: 'Delete',
	alert4003: 'Cancel',
	// 5 - AppManagement
	alert5001: 'Pick your unit system',
	alert5002: 'How do you measure weight?',
	// 6 - InputSelfWeightModal
	alert6001: 'To complete this form you have to type your current self weight.',
	alert6002: 'Got it!',
	// 7 - onboarding
	alert7000: 'Do you want to skip this step completely?',
	alert7001: 'You also can see app’s features when the app starts up again.',
	alert7002: 'Go back later',
	alert7003: 'Finish',
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
	mefs0012: 'Delete <%s>',
}

const onboarding = {
	onbo0011: 'Welcome!',
	onbo0012: 'In your hands the program – training diary. Write your sport results when you complete an exercise in a gym. It helps you to be confident that you have properly loaded muscles for their growth!',
	onbo0021: 'Then and Now!',
	onbo0022: 'When you start doing an exercise again – its previous results will be compare with the current. It makes a difference and helps you to complete tonnage with 110%. There is the indicator you should oversee. Be brave and achieve a new record!',
	onbo0031: 'Associate!',
	onbo0032: 'You can choose a color when you adding a new exercise. Exercises with one color can be filtered out. As an example, you can separate exercises by a training day…',
	onbo0041: 'In fact, it’s easy!',
	onbo0042: 'You should be familiar with existing record keeping modes. Read more about those when you create your first exercise. Each mode has its own special feature that is better suited in one situation or another.',
	onbo0051: 'Everything is ready to use!',
	onbo0052: 'There are results in the exercise screen, which you can see any time. Use the timer to manage the rest time between sets. This is a good moment to fill your diary!',
	onbo1001: 'Let’s Start!',
	onbo1002: 'Skip',
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
	str0003: 'Free Timer',
	...alerts,
	...onboarding,
	...myExercisesFormScreen,
	...timerPickerComponent,
	...appSettingsScreen,
	...exerciseScreen,
} 

export default en
