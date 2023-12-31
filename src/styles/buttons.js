import { Dimensions, StyleSheet } from 'react-native'
import { itemSelf, levelOne, positive, relaxing } from './generalStyles/theme'

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
    },
    switcherBox: {
        width: (Dimensions.get('window').width - 40) / 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 2,
    },
    switcherDefaultBox: {
        borderColor: levelOne,
        backgroundColor: levelOne,
    },
    switcherActiveBox: {
        borderColor: relaxing,
        backgroundColor: relaxing,
    },
    switcherLeft: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    switcherRight: {
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    }
})