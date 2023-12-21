import { StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        width: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        // borderWidth: 3,
    },
    tabsRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    commonBox: {
        width: 80,
        height: 40,
    },
    topLeftBox: {
        borderTopLeftRadius: 20,
    },
    topRightBox: {
        borderTopRightRadius: 20,
    },
    bottomLeftBox: {
        borderBottomLeftRadius: 20,
    },
    bottomRightBox: {
        borderBottomRightRadius: 20,
    },
})