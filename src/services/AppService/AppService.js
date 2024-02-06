import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system'
// import { Asset } from 'expo-asset'
export default class AppService {

    target = 'evil-plate.db'
    database

    async sleep(seconds) {
        return await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    _transformExercise(oneExerciseObj) {
        const exercise = {
            id: oneExerciseObj.id,
            title: oneExerciseObj.exr_name,
            type: oneExerciseObj.exr_global_type,
            breakDuration: oneExerciseObj.exr_global_break_duration,
            colorNumber: oneExerciseObj.exr_color_number,
            rowsCount: oneExerciseObj.exr_global_rows_count,
            records: JSON.parse(oneExerciseObj.exr_best_results),
            created: oneExerciseObj.exr_created
        }
        return exercise
    }

    _transformPerformance(onePerformanceObj) {
        const performance = {
            id: onePerformanceObj.id,
            exerciseID: onePerformanceObj.exr_id,
            type: onePerformanceObj.per_type,
            breakDuration: onePerformanceObj.per_break_duration,
            measureUnit: onePerformanceObj.per_measure_unit,
            workload: JSON.parse(onePerformanceObj.per_work_load),
            created: onePerformanceObj.per_created
        }
        return performance
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
                exr_global_rows_count INT NULL DEFAULT NULL,
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

        await this.sleep(3);
        
        return await formatedExercises.reverse();
    }

    async createExercise({ title, type, breakDuration, colorNumber, rowsCount }) {

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
                    `INSERT INTO exercise (exr_name, exr_color_number, exr_global_type, exr_global_break_duration, exr_global_rows_count, exr_best_results)
                    VALUES (?, ?, ?, ?, ?, ?)`,
                    [title, colorNumber, type, breakDuration, rowsCount, JSON.stringify(records)],
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

    async createPerformance({ 
        exerciseID, 
        type, 
        breakDuration, 
        measureUnit,
        workload, 
    }) {
        await this.initDatabase();
        const createPerformanceAndGetInsertedId = await new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO performance (exr_id, per_type, per_break_duration, per_measure_unit, per_work_load)
                    VALUES (?, ?, ?, ?, ?)`,
                    [exerciseID, type, breakDuration, measureUnit, JSON.stringify(workload)],
                    function(_, { insertId }) {
                        resolve(insertId);
                    },
                    function(_, error) {
                        reject(error.message);
                    }
                )
            });
        });
        
        return await createPerformanceAndGetInsertedId
    }

    async getPerformance(id) {
        await this.initDatabase();
        const performance = await new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM performance WHERE id = ?`,
                    [id],
                    function(_, result) {
                        resolve(result.rows._array[0]);
                    },
                    function(_, error) {
                        reject(error.message);
                    }
                )
            })
        });

        return await this._transformPerformance(performance);
    }

    async getExercise(id) {
        await this.initDatabase();
        const exercise = await new Promise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    `SELECT * FROM exercise WHERE id = ?`,
                    [id],
                    function(_, result) {
                        resolve(result.rows._array[0]);
                    },
                    function(_, error) {
                        reject(error.message);
                    }
                )
            })
        });

        return await this._transformExercise(exercise);
    }

    async updateJSONinTable(table, id, data) {
        await this.initDatabase();
        const JSONinTables = {
            ['exercise']: 'exr_best_results',
            ['performance']: 'per_work_load',
        }
        const field = JSONinTables[table]
        this.database.transaction(tx => {
            tx.executeSql(
                `UPDATE ${table}
                SET ${field} = ?
                WHERE ${table+'.id'} = ?`,
                [JSON.stringify(data), id],
                function(_, result) {
                    // console.log(result);
                },
                function(_, error) {
                    console.error(error.message);
                }
            )
        });
    }

    async updateExercise(id, { title, type, breakDuration, colorNumber, rowsCount }) {
        await this.initDatabase();
        this.database.transaction(tx => {
            tx.executeSql(
                `UPDATE exercise
                SET exr_name = ?,
                    exr_global_type = ?,
                    exr_global_break_duration = ?,
                    exr_color_number = ?,
                    exr_global_rows_count = ?
                WHERE id = ?`,
                [title, type, breakDuration, colorNumber, rowsCount, id],
                function(_, result) {
                    // console.log(result);
                },
                function(_, error) {
                    console.error(error.message);
                }
            )
        });
    }

    async deleteExerciseCascade(id) {
        await this.initDatabase();
        this.database.transaction(tx => {
            tx.executeSql(
                `DELETE FROM performance
                WHERE exr_id = ?`,
                [id],
                function(_, result) {
                    // console.log('performance: ', result);
                },
                function(_, error) {
                    console.error('performance: ', error.message);
                }
            )
            tx.executeSql(
                `DELETE FROM exercise
                WHERE id = ?`,
                [id],
                function(_, result) {
                    // console.log('exercise: ', result);
                },
                function(_, error) {
                    console.error('exercise: ', error.message);
                }
            )
        });
    }
}