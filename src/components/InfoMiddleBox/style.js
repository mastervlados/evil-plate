import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        height: 90, 
        width: Dimensions.get('window').width,
        backgroundColor: Theme.levelOne,
        paddingTop: 18,
        alignItems: 'center',
    },
    emptyBox: {
        justifyContent: 'center',
        paddingTop: 0,
    },
    textPosition: {
        width: 230,
        marginBottom: 3,
        textAlign: 'center',
    },
})