import { StyleSheet } from 'react-native'
import { agressive, base, relaxing } from './generalStyles/theme'

export const styles = StyleSheet.create({
    formDefaultViewBox: {
        borderWidth: 1,
        borderColor: base,
        backgroundColor: base,
    },
    formDefaultText: {
        color: relaxing,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
    formActiveViewBox: {
        borderWidth: 1,
        borderColor: agressive,
        backgroundColor: base,
    },
    formActiveText: {
        color: agressive,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
})