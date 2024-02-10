import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.levelOne,
        alignItems: 'center',
        paddingVertical: 10,
    },
    paginatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
    },
    paginatorDot: {
        height: 8,
        borderRadius: 8,
        backgroundColor: Theme.positive,
        borderWidth: 1.5,
        borderColor: Theme.base,
        marginHorizontal: 3,
    },
    paginationContainer: {
        flexDirection: 'row',
        gap: 24,
    },
    footerContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})