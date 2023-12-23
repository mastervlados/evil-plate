export default class DummyAppService {

    _sleep(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    getExercisesList = async () => {
        await this._sleep(10)
        return [
                {key: 1, title: '1 Exercise with a barbell for example', type: 'mono'},
                {key: 2, title: '2 Exercise with dumbbells for example', type: 'stereo'},
                {key: 3, title: 'Exercise with self body weight', type: 'self'},
                {key: 4, title: 'Exercise with a barbell for example', type: 'mono'},
                {key: 5, title: 'Exercise with dumbbells for example', type: 'stereo'},
                {key: 6, title: 'Exercise with self body weight', type: 'self'},
                {key: 7, title: 'Exercise with a barbell for example', type: 'mono'},
                {key: 8, title: 'Exercise with dumbbells for example', type: 'stereo'},
                {key: 9, title: 'Exercise with self body weight', type: 'self'},
                {key: 10, title: 'Exercise with a barbell for example', type: 'mono'},
                {key: 11, title: 'Exercise with dumbbells for example', type: 'stereo'},
                {key: 12, title: 'Exercise with self body weight', type: 'self'},
                {key: 13, title: 'Exercise with a barbell for example', type: 'mono'},
                {key: 14, title: 'Exercise with dumbbells for example', type: 'stereo'},
                {key: 15, title: 'Exercise with self body weight', type: 'self'},
                {key: 16, title: '-2 Exercise with a barbell for example', type: 'mono'},
                {key: 18, title: '-1 Exercise with self body weight (last)', type: 'self'},
              ]
    }
}