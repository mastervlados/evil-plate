import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: Dimensions.get('window').height - 20,
        backgroundColor: Theme.levelOne,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPosition: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 10,
    },
    buttonTextStyles: {
        color: Theme.base,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
    },
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 5,
    },
})