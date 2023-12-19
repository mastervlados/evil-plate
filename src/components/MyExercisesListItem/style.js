import { StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        margin: 3, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    itemBox: {
        width: 165,
        height: 64,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        backgroundColor: Theme.levelOne,
    },
    itemMono: {
        borderColor: Theme.itemMono,
    },
    itemStereo: {
        borderColor: Theme.itemStereo,
    },
    itemSelf: {
        borderColor: Theme.itemSelf,
    },
    itemInvisible: {
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundColor: 'transperent',
    }
})