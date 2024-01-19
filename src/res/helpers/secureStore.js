import react from 'react'
import * as SecureStore from 'expo-secure-store'

// const _findStoredOpenPerformanceIndex = (storedData, id) => {
//     return storedData.findIndex(perf => perf.exerciseID === id)
// }

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

async function deleteValueFor(key) {
    await SecureStore.deleteItemAsync(key)
}

async function getOpenPerformance(exerciseID) {
    return await JSON.parse(await getValueFor(`storedOpenPerformance-${exerciseID}`))
}

async function saveOpenPerformance(exerciseID, obj) {
    try {
        await saveValueAs(`storedOpenPerformance-${exerciseID}`, JSON.stringify(obj))
        return true
    } catch (e) {
        return false
    }
}

async function deleteStoredPerformance(exerciseID) {
    await deleteValueFor(`storedOpenPerformance-${exerciseID}`)
}

async function addSetToStoredPerformance(exerciseID, set) {
    const performance = await getOpenPerformance(exerciseID);
    performance.workload.sets.push(set)
    await saveOpenPerformance(exerciseID, performance)
}

async function updateFieldInSetWithinStoredPerformance(
    exerciseID, 
    setID,
    field, 
    payload
) {
    const performance = await getOpenPerformance(exerciseID);
    // console.log('before', performance.workload.sets[setID])
    try {
        if (typeof(payload) !== 'undefined') {
            performance.workload.sets[setID][field] = payload
        } else {
            const invert = !performance.workload.sets[setID][field]
            performance.workload.sets[setID][field] = invert
        }
        // console.log('after', performance.workload.sets[setID])
    } catch (e) {
        // console.log(e)
    } finally {
        await saveOpenPerformance(exerciseID, performance);
    }
}

async function updateFieldInSetRowWithinStoredPerformance(
    exerciseID, 
    setID, 
    rowID, 
    field, 
    payload
) {
    const performance = await getOpenPerformance(exerciseID);
    // console.log('before', performance.workload.sets[setID].rows[rowID])
    try {
        if (typeof(payload) !== 'undefined') {
            performance.workload.sets[setID].rows[rowID][field] = payload
        } else {
            const invert = !performance.workload.sets[setID].rows[rowID][field]
            performance.workload.sets[setID].rows[rowID][field] = invert
        }
        // console.log('after', performance.workload.sets[setID].rows[rowID])
    } catch (e) {
        // console.log(e)
    } finally {
        await saveOpenPerformance(exerciseID, performance);
    }
}

// async function getOpenPefrormances() {
//     return await JSON.parse(await getValueFor('storedOpenPerformances'));
// }

// async function saveOpenPerformances(obj) {
//     await saveValueAs('storedOpenPerformances', JSON.stringify(obj));
// }

// async function createStoredPerformance(obj) {
//     // Get all previous open performances    
//     const openPerformances = await getOpenPefrormances();

//     if ((openPerformances.filter((perf) => perf.exerciseID === obj.exerciseID).length) === 0) {
//         // means that we haven't created 
//         // our opened performances with 
//         // current exercise ID
//         // **************
//         // add new one
//         openPerformances.push(obj)
//         // put it into store
//         await saveOpenPerformances(openPerformances);
//         // success
//         return true
//     }
//     return false
// }

// async function deleteStoredPerformanceByExerciseID(exerciseID) {

//     const openPerformances = await getOpenPefrormances();

//     const index = _findStoredOpenPerformanceIndex(openPerformances, exerciseID)

//     try {
//         openPerformances.splice(index, 1)
//     } catch (e) {
//         // console.log(e)
//     } finally {
//         await saveOpenPerformances(openPerformances);
//     }
// }

// async function createStoredSetWithinExercise(exerciseID, data) {
//     const openPerformances = await getOpenPefrormances();
//     const index = _findStoredOpenPerformanceIndex(openPerformances, exerciseID)

//     try {
//         openPerformances[index].workload.sets.push(data)
//     } catch (e) {
//         // console.log(e)
//     } finally {
//         await saveOpenPerformances(openPerformances);
//     }
// }

// async function deleteStoredSetWithinExercise(exerciseID, setID) {

//     const openPerformances = await getOpenPefrormances();

//     const index = _findStoredOpenPerformanceIndex(openPerformances, exerciseID)

//     try {
//         openPerformances[index].workload.sets.splice(setID, 1)
//     } catch (e) {
//         // console.log(e)
//     } finally {
//         await saveOpenPerformances(openPerformances);
//     }
    
// }

// async function updateStoredSetFieldWithinExercise(
//     exerciseID, 
//     setID,
//     field, 
//     payload
// ) {
//     const openPerformances = await getOpenPefrormances();

//     const index = _findStoredOpenPerformanceIndex(openPerformances, exerciseID)

//     try {
//         if (typeof(payload) !== 'undefined') {
//             openPerformances[index].workload.sets[setID][field] = payload
//         } else {
//             const invert = !openPerformances[index].workload.sets[setID][field]
//             openPerformances[index].workload.sets[setID][field] = invert
//         }
//     } catch (e) {
//         // console.log(e)
//     } finally {
//         await saveOpenPerformances(openPerformances);
//     }
// }

// async function updateStoredSetRowFieldWithinExercise(
//     exerciseID, 
//     setID, 
//     rowID, 
//     field, 
//     payload
// ) {
//     const openPerformances = await getOpenPefrormances();

//     const index = _findStoredOpenPerformanceIndex(openPerformances, exerciseID)

//     try {
//         if (typeof(payload) !== 'undefined') {
//             openPerformances[index].workload.sets[setID].rows[rowID][field] = payload
//         } else {
//             const invert = !openPerformances[index].workload.sets[setID].rows[rowID][field]
//             openPerformances[index].workload.sets[setID].rows[rowID][field] = invert
//         }
//     } catch (e) {
//         // console.log(e)
//     } finally {
//         await saveOpenPerformances(openPerformances);
//     }
// }

export {
    saveValueAs,
    getValueFor,
    deleteValueFor,
    getOpenPerformance,
    saveOpenPerformance,
    deleteStoredPerformance,
    addSetToStoredPerformance,
    updateFieldInSetWithinStoredPerformance,
    updateFieldInSetRowWithinStoredPerformance,
    // getOpenPefrormances,
    // saveOpenPerformances,
    // createStoredPerformance,
    // deleteStoredPerformanceByExerciseID,
    // deleteStoredSetWithinExercise,
    // createStoredSetWithinExercise,
    // updateStoredSetFieldWithinExercise,
    // updateStoredSetRowFieldWithinExercise,
}