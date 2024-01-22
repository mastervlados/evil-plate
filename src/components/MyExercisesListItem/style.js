import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginBottom: 10, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    itemBox: {
        width: (Dimensions.get('window').width - 40 - 20) / 2,
        height: 64,
        borderRadius: 3,
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        backgroundColor: Theme.levelOne,
        overflow: 'hidden',
    },
    itemInvisible: {
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundColor: 'transperent',
    }
})