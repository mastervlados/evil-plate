import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: Dimensions.get('window').width - 100,
        borderRadius: 20,
        // marginLeft: 'auto',
        // marginRight: 'auto',
    },
    textValidationPosition: {
        marginTop: 5,
        marginLeft: 13,
    }
})