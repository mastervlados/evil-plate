export default class DummyAppService {

    exercises = [
        { id: 1, title: '1 Exercise with a barbell for example', type: 'mono', colorNumber: 5 },
        { id: 2, title: '2 Exercise with dumbbells for example', type: 'stereo', colorNumber: 1 },
        { id: 3, title: 'Exercise with self body weight', type: 'self', colorNumber: 5 },
        { id: 4, title: 'Exercise with a barbell for example', type: 'mono', colorNumber: 2 },
        { id: 5, title: 'Exercise with dumbbells for example', type: 'stereo', colorNumber: 3 },
        { id: 6, title: 'Exercise with self body weight', type: 'self', colorNumber: 5 },
        { id: 7, title: 'Exercise with a barbell for example', type: 'mono', colorNumber: 4 },
        { id: 8, title: 'Exercise with dumbbells for example', type: 'stereo', colorNumber: 6 },
        { id: 9, title: 'Exercise with self body weight', type: 'self', colorNumber: 5 },
        { id: 10, title: 'Exercise with a barbell for example', type: 'mono', colorNumber: 7 },
        { id: 11, title: 'Exercise with dumbbells for example', type: 'stereo', colorNumber: 8 },
        { id: 12, title: 'Exercise with self body weight', type: 'self', colorNumber: 9 },
        { id: 13, title: 'Exercise with a barbell for example', type: 'mono', colorNumber: 5 },
        { id: 14, title: 'Exercise with dumbbells for example', type: 'stereo', colorNumber: 5 },
        { id: 15, title: 'Exercise with self body weight', type: 'self', colorNumber: 5 },
        { id: 16, title: '-2 Exercise with a barbell for example', type: 'mono', colorNumber: 5 },
        { id: 18, title: '-1 Exercise with self body weight (last)', type: 'self', colorNumber: 5 },
      ]

    _sleep(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    getExercisesList = async () => {
        // await this._sleep(10)
        return this.exercises
    }
}