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

async function getOpenPefrormances() {
    return await JSON.parse(await getValueFor('storedOpenPerformances'));
}

async function saveOpenPerformances(obj) {
    await saveValueAs('storedOpenPerformances', JSON.stringify(obj));
}

async function createStoredPerformance(obj) {
    // Get all previous open performances    
    const openPerformances = await getOpenPefrormances();

    if ((openPerformances.filter((perf) => perf.exerciseID === obj.exerciseID).length) === 0) {
        // means that we haven't created 
        // or opened performances with 
        // current exercise ID
        // **************
        // add new one
        openPerformances.push(obj)
        // put it into store
        await saveOpenPerformances(openPerformances);
        // success
        return true
    }
    return false
}

async function deleteStoredPerformanceByExerciseID(id) {

    const openPerformances = await getOpenPefrormances();

    const index = openPerformances.findIndex(perf => perf.exerciseID === id)

    openPerformances.splice(index, 1)
    
    await saveOpenPerformances(openPerformances);
}

export {
    saveValueAs,
    getValueFor,
    getOpenPefrormances,
    saveOpenPerformances,
    createStoredPerformance,
    deleteStoredPerformanceByExerciseID,
}