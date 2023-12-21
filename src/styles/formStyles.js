import { StyleSheet } from 'react-native'
import { agressive, base, relaxing } from './generalStyles/theme'

export const styles = StyleSheet.create({
    formDefaultViewBox: {
        borderWidth: 2,
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
        borderWidth: 2,
        borderColor: agressive,
        backgroundColor: base,
    },
    formActiveText: {
        color: agressive,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
    formDefaultTextInput: {
        backgroundColor: base,
        borderWidth: 2,
        borderColor: relaxing,
        color: relaxing,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
    formActiveTextInput: {
        backgroundColor: base,
        borderWidth: 2,
        borderColor: agressive,
        color: agressive,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
})