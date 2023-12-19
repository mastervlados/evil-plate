import { StyleSheet } from 'react-native'
import { itemSelf, positive } from './generalStyles/theme'

export const styles = StyleSheet.create({
    success: {
        backgroundColor: positive,
        // elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formOutline: {
        borderWidth: 1,
        borderStyle: 'dotted',
        borderColor: itemSelf,
        alignItems: 'center',
        justifyContent: 'center',
    }
})