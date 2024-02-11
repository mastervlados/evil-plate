import { Dimensions, StyleSheet } from 'react-native'
import { Theme } from '../../styles'

const footerHeight = (Dimensions.get('window').height / 3) - 48 - (16 * 2)
const titlePadding = footerHeight < 135 ? 8 : 16

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.levelOne,
        alignItems: 'center',
    },
    paginatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
    },
    paginatorDot: {
        height: 8,
        borderRadius: 8,
        backgroundColor: Theme.positive,
        borderWidth: 1.5,
        borderColor: Theme.base,
        marginHorizontal: 3,
    },
    paginationContainer: {
        flexDirection: 'row',
        gap: 24,
    },
    footerContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    imageContainer: {
        position: 'relative',
        height: Dimensions.get('window').height / 1.5,
        width: Dimensions.get('window').width,
        overflow: 'hidden',
    },
    image: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 2340 * (Dimensions.get('window').width / 1080),
        zIndex: 666,
    },
    slideDescription: {
        width: Dimensions.get('window').width,
        height: footerHeight,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20,
        paddingTop: titlePadding,
        backgroundColor: Theme.levelOne,
        borderTopWidth: 5,
        borderColor: Theme.crimson,
        zIndex: 777,
    },
    textTitle: {
        color: Theme.positive,
        fontSize: 20,
        fontWeight: '900',
        fontFamily: 'roboto-black',
        marginBottom: titlePadding,
    },
    textDescription: {
        color: Theme.textCommon,
        fontSize: 12,
        fontWeight: '300',
        fontFamily: 'roboto-light',
        opacity: 0.9,
    }
})