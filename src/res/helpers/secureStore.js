import react from 'react'
import * as SecureStore from 'expo-secure-store'

async function saveValueAs(key, value) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    }
    return -1
}

async function deleteStoredOpenPerformanceByExerciseID(exerciseID) {

    const openPerformances = await JSON.parse(await getValueFor('storedOpenPerformances'))

    const index = openPerformances.findIndex(perf => perf.exerciseID === exerciseID)

    openPerformances.splice(index, 1)
    
    await saveValueAs('storedOpenPerformances', JSON.stringify(openPerformances))
}

export {
    saveValueAs,
    getValueFor,
    deleteStoredOpenPerformanceByExerciseID,
}