import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        backgroundColor: Theme.crimson,
        flexDirection: 'row',
    },
    box: {
        width: Dimensions.get('window').width / 2,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    }
})