import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 20,
        backgroundColor: Theme.crimson,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})