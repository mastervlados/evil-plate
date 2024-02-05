import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

const spaceBetween = 6
// 15 left and right margins
// 55 button container
const boxWidth = ~~((Dimensions.get('window').width - (15 * 2) - 55)) // :: 330
const blockWidth = ~~((boxWidth - (spaceBetween * 5)) / 5)
// 56 ~ button size
// 15 ~ button top margin
// 5 ~ button bottom margin
// 76
// x2 padding like 6!
const blockHeight = ~~((56 + 15 + 5 - (spaceBetween * 2)) / 2) // 76

export const styles = StyleSheet.create({
    buttonPosition: {
        // borderWidth: 1,
        borderTopRightRadius: 40,
        backgroundColor: Theme.base,
        width: 55,
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 0,
        left: 5,
        zIndex: 999,
    },
    container: {
        position: 'absolute',
        top: 15,
        left: 15,
        right: 15,
        bottom: 0,
        backgroundColor: Theme.levelOne,
        borderRadius: 5,
    },
    dropBox: {
        // borderWidth: 1,
        position: 'absolute',
        right: 0,
        top: 0,
        width: boxWidth,
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    dropBoxRow: {
        borderColor: 'red',
        // borderWidth: 1,
        width: boxWidth,
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    filterBox: {  
        width: blockWidth,
        height: blockHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterDefault: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Theme.base,
        opacity: 0.5,
    },
    filterActive: {
        borderWidth: 1,
        borderRadius: blockHeight,
        borderColor: Theme.base,
        opacity: 1,
    }
})