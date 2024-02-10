import { Dimensions, StyleSheet } from 'react-native'
import { 
    agressive, 
    crimson, 
    itemMono, 
    itemSelf, 
    levelOne, 
    maintain, 
    positive, 
    relaxing, 
    textValidationFailing 
} from './generalStyles/theme'

export const styles = StyleSheet.create({
    success: {
        backgroundColor: positive,
        // elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    successOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: positive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: agressive,
        // elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: agressive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    warning: {
        backgroundColor: maintain,
        // elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    danger: {
        backgroundColor: textValidationFailing,
        // elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        backgroundColor: relaxing,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: relaxing,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoOutlineDisable: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: itemMono,
        alignItems: 'center',
        justifyContent: 'center',
    },
    crimsonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: crimson,
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