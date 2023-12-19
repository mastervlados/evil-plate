import { StyleSheet } from 'react-native'
import { itemSelf, textCommon, textValidationFailing } from './generalStyles/theme'

export const styles = StyleSheet.create({
    textCommon: {
        color: textCommon,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
    textHeader: {
        color: textCommon,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
    },
    textValidationFailing: {
        color: textValidationFailing,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
    textDescription: {
        color: textCommon,
        fontSize: 14,
        fontWeight: '300',
        fontFamily: 'roboto-light',
    },
    textInfo: {
        color: itemSelf,
        fontSize: 13,
        fontWeight: '300',
        fontFamily: 'roboto-light',
    },
})