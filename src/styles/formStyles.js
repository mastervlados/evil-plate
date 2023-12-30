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
    formMediumText: {
        color: relaxing,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'roboto-medium',
    },
    formDefaultHeader: {
        color: relaxing,
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'roboto-bold',
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
    formActiveHeader: {
        color: agressive,
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'roboto-bold',
    },
    formDefaultTextInput: {
        backgroundColor: base,
        borderWidth: 2,
        borderColor: relaxing,
        color: relaxing,
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'roboto-medium',
    },
    formActiveTextInput: {
        backgroundColor: base,
        borderWidth: 2,
        borderColor: agressive,
        color: agressive,
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'roboto-medium',
    },
})