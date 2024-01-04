import { StyleSheet } from 'react-native'
import { agressive, base, itemMono, itemSelf, itemStereo, positive, textCommon, textHint, textValidationFailing } from './generalStyles/theme'

export const styles = StyleSheet.create({
    textCommon: {
        color: textCommon,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
    textCommonAlternate: {
        color: itemMono,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
    textAgressive: {
        color: agressive,
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
    textHeaderAlternate: {
        color: itemStereo,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
    },
    textPositiveBold: {
        color: positive,
        fontSize: 14,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
    },
    textPositiveBlack: {
        color: positive,
        fontSize: 14,
        fontWeight: '900',
        fontFamily: 'roboto-black',
    },
    textValidationFailing: {
        color: textValidationFailing,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'roboto-regular',
    },
    textHint: {
        color: textHint,
        fontSize: 13,
        fontWeight: '300',
        fontFamily: 'roboto-light',
    },
    textInfo: {
        color: itemSelf,
        fontSize: 12,
        fontWeight: '300',
        fontFamily: 'roboto-light',
    },
    switcherTextDefault: {
        color: base,
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
    },
    switcherTextActive: {
        color: base,
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
    },
})