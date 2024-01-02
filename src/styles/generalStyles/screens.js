import { Dimensions, StyleSheet } from 'react-native'
import { base } from './theme'

export const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: base,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    appContainerWithoutVerticalCentred: {
        flex: 1,
        backgroundColor: base,
        alignItems: 'center', 
    },
    appBlock: {
        width: '100%',
    },
    appContainerWithLeftAndRightPaddings: {
        flex: 1,
        width: Dimensions.get('window').width - 40,
    },
    appEmtyCentredContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center', 
        justifyContent: 'center',
    }
})