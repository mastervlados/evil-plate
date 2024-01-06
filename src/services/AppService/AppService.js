import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
// import { Asset } from 'expo-asset'
export default class AppService {

    target = 'evil-plate.db'
    database

    async _sleep(seconds) {
        return await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    _transformExercise(oneExerciseObj) {
        const item = {
            id: oneExerciseObj.id,
            title: oneExerciseObj.exr_name,
            type: oneExerciseObj.exr_global_type,
            breakDuration: oneExerciseObj.exr_global_break_duration,
            colorNumber: oneExerciseObj.exr_color_number,
            records: JSON.parse(oneExerciseObj.exr_best_results),
            created: oneExerciseObj.exr_created
        }
        return item
    }
    
    async initDatabase() {
        const dirInfo = await (await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists;
        if (!dirInfo) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }
        // await FileSystem.downloadAsync(
        //     Asset.fromModule(require('../../../assets/db/evil-plate.db')).uri,
        //     FileSystem.documentDirectory + 'SQLite/' + this.target
        // )
        //     .then(({ uri }) => {
        //         console.log('Finished downloading to ', uri);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
        this.database = SQLite.openDatabase(this.target)
        this.database.transaction(tx => {
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS exercise 
                (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                exr_name VARCHAR(60) NULL DEFAULT NULL,
                exr_color_number VARCHAR(20) NULL DEFAULT NULL,
                exr_global_type VARCHAR(20) NULL DEFAULT NULL,
                exr_global_break_duration INT NULL DEFAULT NULL,
                exr_best_results JSON NULL DEFAULT NULL,
                exr_created DATETIME NULL DEFAULT CURRENT_TIMESTAMP
                );
            `, null,
            null,
            (txObj, error) => console.warn(error))});
        this.database.transaction(tx => {
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS performance 
                (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                exr_id INTEGER,
                per_type VARCHAR(20) NULL DEFAULT NULL,
                per_break_duration INT NULL DEFAULT NULL,
                per_measure_unit VARCHAR(10) NULL DEFAULT NULL,
                per_work_load JSON NULL DEFAULT NULL,
                per_created DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                is_finished TINYINT NULL DEFAULT NULL,
                FOREIGN KEY (exr_id) REFERENCES exercise (id)
                );
            `, null,
            null,
            (txObj, error) => console.warn(error))});
    }

    async getExercises() {

        await this.initDatabase();

        const exercises = await new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM exercise`,
                    null,
                    function(_, { rows }) {
                        resolve(rows._array);
                    },
                    function(_, error) {
                        reject(error.message);
                    }
                )
            })
        });

        const formatedExercises = await exercises.map((exercise) => this._transformExercise(exercise));

        await this._sleep(3);
        
        return await formatedExercises.reverse();
    }

    async createExercise({ title, type, breakDuration, colorNumber }) {

        await this.initDatabase();

        const records = {
            leaderboard: {
                isExist: false,
            },
            previous: {
                isExist: false,
            }
        }

        const createExerciseAndGetInsertedId = await new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO exercise (exr_name, exr_color_number, exr_global_type, exr_global_break_duration, exr_best_results)
                    VALUES (?, ?, ?, ?, ?)`,
                    [title, colorNumber, type, breakDuration, JSON.stringify(records)],
                    function(_, { insertId }) {
                        resolve(insertId);
                    },
                    function(_, error) {
                        reject(error.message);
                    }
                )
            })
        });

        const getNewExercise = await new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM exercise WHERE id = ?`,
                    [createExerciseAndGetInsertedId],
                    function(_, result) {
                        resolve(result.rows._array[0]);
                    },
                    function(_, error) {
                        reject(error.message);
                    }
                )
            })
        });

        return await this._transformExercise(getNewExercise);
    }
}