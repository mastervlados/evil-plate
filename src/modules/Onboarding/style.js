import { Dimensions, StyleSheet, StatusBar } from 'react-native'
import { Theme } from '../../styles'


// const slideDescriptionHeight = (Dimensions.get('window').height / 3) - 48 - (16 * 2)
const footerHeight = 48 + (16 * 2)
const slideDescriptionHeight = (Dimensions.get('window').height / 3) - footerHeight
const imageContainerHeight = Dimensions.get('window').height - slideDescriptionHeight - footerHeight - StatusBar.currentHeight
const titlePadding = slideDescriptionHeight < 135 ? 8 : 16


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.levelOne,
        alignItems: 'center',
    },
    slideContainer: {
        flex: 1,
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
        height: footerHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    imageContainer: {
        position: 'relative',
        height: imageContainerHeight,
        width: Dimensions.get('window').width,
        overflow: 'hidden',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    image: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        // height: 2340 * (Dimensions.get('window').width / 1080),
        zIndex: 666,
    },
    slideDescription: {
        height: slideDescriptionHeight,
        width: Dimensions.get('window').width,
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