import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    workloadHeadersContainer: {
        // borderWidth: 3,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    workloadHeadersBox: {
        backgroundColor: Theme.levelOne,
        width: 96,
        height: 40,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    workloadHeadersLeftBox: {
        backgroundColor: Theme.levelOne,
        width: 76,
        height: 40,
        paddingLeft: 20,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    workloadHeadersRightBox: {
        backgroundColor: Theme.levelOne,
        width: 74,
        height: 40,
        paddingRight: 20,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
})