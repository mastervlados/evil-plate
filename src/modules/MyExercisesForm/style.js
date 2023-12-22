import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: Dimensions.get('window').height - 20,
        backgroundColor: Theme.levelOne,
    },
    header: {
        // flex: 1,
        flexDirection: 'row',
    },
    body: {
        // flex: 1,
        // borderWidth: 4,
        position: 'relative',
        paddingLeft: 10,
        paddingTop: 30,
    },
    insideBodyContainer: {
        paddingRight: 10,
        // borderWidth: 5,
    },
    footer: {
        // display: 'none',
        // borderWidth: 3,
        marginTop: 5,
    },
    headerLeft: {
        flex: 1,
        // borderWidth: 3,
        paddingHorizontal: 10,
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
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 15,
        paddingTop: 15,
        paddingBottom: 5,
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
        marginLeft: 30,
    },
    textDescriptionPosition: {
        marginTop: 'auto',
        marginBottom: 10,
        width: '90%',
    },
    textInfoPosition: {
        marginLeft: 20,
        marginBottom: 10,
    },
    headerTab: {
          width: 60,
          height: 50,
    },
    headerTopTab: {
        borderTopLeftRadius: 20
    },
    headerBottomTab: {
        borderBottomLeftRadius: 20
    },
})