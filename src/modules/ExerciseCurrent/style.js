import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

export const styles = StyleSheet.create({
    infoMiddleBox: {
        height: 90,
        width: Dimensions.get('window').width,
        backgroundColor: Theme.levelOne,
        paddingTop: 18,
        alignItems: 'center',
    },
    infoButtonAddPerformancePosition: {
        paddingVertical: 38,
    },
    infoMiddleBoxTextPosition: {
        width: 230,
        marginBottom: 6,
        textAlign: 'center',
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
    }
})