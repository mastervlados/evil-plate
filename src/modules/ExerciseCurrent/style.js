import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    infoButtonAddPerformancePosition: {
        paddingVertical: 38,
    },
    infoFooterBox: {
        marginVertical: 20,
        justifyContent: 'space-between',
        // backgroundColor: 'orange'
    },
    infoPreviousContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoTextHeaderPosition: {
        marginBottom: 7,
    },
    infoTextResultsPosition: {
        marginLeft: 30,
        marginBottom: 7,
    },
    infoInfoButtonPosition: {
        alignItems: 'baseline',
    },
    headerButtonPosition: {
        marginRight: 12,
    },
    interactionHeaderContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    interactionTableHeadersContainer: {
        // borderWidth: 3,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    interactionTableBox: {
        backgroundColor: Theme.levelOne,
        width: 96,
        height: 40,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    interactionTableLeftBox: {
        backgroundColor: Theme.levelOne,
        width: 76,
        height: 40,
        paddingLeft: 20,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    interactionTableRightBox: {
        backgroundColor: Theme.levelOne,
        width: 74,
        height: 40,
        paddingRight: 20,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowBox: {
        // borderWidth: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    rowControl: {
        // borderWidth: 3,
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // 40 - left and right paddings ~ 20px each
        // 56 - control box size
        // ((Dimensions.get('window').width - 76 - 74 - (96 * 2)) / 3)
        width: Dimensions.get('window').width - 40 - 56 - ((Dimensions.get('window').width - 76 - 74 - (96 * 2)) / 3),
        // borderWidth: 1,
    },
    setBox: {
        position: 'relative',
        backgroundColor: Theme.levelOne,
        width: 56,
        height: 40,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    setFuncArea: {
        position: 'absolute',
        width: 12,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.crimson,
        height: '100%',
        left: 0,
    },
    inputDefaultStyles: {
        width: 96,
        height: 40,
        borderWidth: 2,
        borderRadius: 3,
        textAlign: 'center',
        borderColor: Theme.levelOne,
        color: Theme.textCommon,
        fontSize: 14,
        fontWeight: '900',
        fontFamily: 'roboto-black',
    },
    inputActiveStyles: {
        width: 96,
        height: 40,
        borderWidth: 2,
        borderRadius: 3,
        textAlign: 'center',
        borderColor: Theme.positive,
        color: Theme.positive,
        fontSize: 14,
        fontWeight: '900',
        fontFamily: 'roboto-black',
    },
    checkboxDefaultStyles: {
        width: 56,
        height: 40,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: Theme.levelOne,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActiveStyles: {
        width: 56,
        height: 40,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: Theme.textCommon,
        alignItems: 'center',
        justifyContent: 'center',
    },
})