import { StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.levelOne,
    },
    header: {
        flexDirection: 'row'
    },
    body: {
        flex: 1,
        borderWidth: 3,
    },
    footer: {
        // borderWidth: 3,
    },
    headerLeft: {
        flex: 1,
        // borderWidth: 3,
    },
    headerRight: {
        // flex: 1,
        // borderWidth: 3,
        justifyContent: 'center',
    },
    headerTextContainer: {
        marginHorizontal: 30,
    },
    buttonPosition: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonTextStyles: {
        color: Theme.base,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'roboto-bold',
    },
    textHeaderPosition: {
        width: 200,
        marginLeft: 20,
        marginVertical: 10,
    },
    textHeaderInScrollPosition: {
        marginLeft: 50,
    },
    textInfoPosition: {
        marginLeft: 30,
        marginBottom: 10,
    },
    headerTab: {
          width: 70,
          height: 60,
    },
    headerTopTab: {
        borderTopLeftRadius: 20
    },
    headerBottomTab: {
        borderBottomLeftRadius: 20
    }
})