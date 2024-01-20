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
        alignItems: 'flex-start',
    },
    body: {
        // flex: 1,
        // borderWidth: 4,
        // position: 'relative',
        paddingLeft: 0,
        paddingTop: 0,
    },
    insideBodyContainer: {
        // paddingRight: 10,
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
        // paddingHorizontal: 10,
        paddingRight: 10,
    },
    headerRight: {
        // flex: 1,
        // borderWidth: 3,
        justifyContent: 'center',
        marginTop: 10,
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
        marginLeft: 0,
        marginVertical: 10,
    },
    textHeaderInScrollPosition: {
        marginLeft: 0,
    },
    textDescriptionPosition: {
        marginTop: 'auto',
        marginBottom: 10,
        width: '95%',
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerBottomTab: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
})