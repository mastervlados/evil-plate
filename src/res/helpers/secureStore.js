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

export {
    saveValueAs,
    getValueFor,
}