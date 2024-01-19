import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import { getOpenPefrormances } from '../../res/helpers/secureStore'

export default function ExerciseProgress() {
    const [openPerformances, setOpenPerformances] = useState()
    
    useEffect(() => {
        const getStoredOpenPerformances = async () => {
            const array = await getOpenPefrormances();
            setOpenPerformances(array)
            for (let i = 0; i < array.length; i++) {
                console.log(i, '\n', array[i])
            }
        }
        getStoredOpenPerformances()
    }, [])
    return (
        <View>
            <Text>ExerciseProgress</Text>
        </View>
    )
}