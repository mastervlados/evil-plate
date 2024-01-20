import { StyleSheet } from 'react-native'
import { agressive, base, itemMono, itemSelf, itemStereo, maintain, positive, relaxing, textCommon, textHint, textValidationFailing } from './generalStyles/theme'

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
    littleTextCommon: {
        color: textCommon,
        fontSize: 12,
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
        fontSize: 12,
        fontWeight: '300',
        fontFamily: 'roboto-light',
    },
    textInfo: {
        color: itemSelf,
        fontSize: 12,
        fontWeight: '300',
        fontFamily: 'roboto-light',
    },
    timerDigitsDefault: {
        color: maintain,
        fontSize: 48,
        fontWeight: '100',
        fontFamily: 'roboto-thin',
    },
    timerDigitsActive: {
        color: textValidationFailing,
        fontSize: 48,
        fontWeight: '100',
        fontFamily: 'roboto-thin',
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
    extraTextCommon: {
        color: textCommon,
        fontSize: 14,
        fontWeight: '900',
        fontFamily: 'roboto-black',
    },
    indicatorTextUnderWater: {
        color: itemMono,
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
        textTransform: 'uppercase',
    },
    indicatorTextMaintain: {
        color: maintain,
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
        textTransform: 'uppercase',
    },
    indicatorTextGrowUp: {
        color: positive,
        fontSize: 10,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
        textTransform: 'uppercase',
    },
})